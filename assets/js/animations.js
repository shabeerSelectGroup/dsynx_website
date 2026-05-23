/**
 * DSYNZ Motion � Lenis, GSAP timelines, scroll storytelling
 */
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import Lenis from 'https://esm.sh/lenis@1.1.18';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;

export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  if (prefersReducedMotion) return null;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.15,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add('lenis', 'lenis-smooth');
  window.__dsynzLenis = lenis;
  return lenis;
}

function initRevealFallback() {
  document.querySelectorAll('.reveal').forEach((el) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
  });
}

function initMagneticButtons() {
  if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-magnetic], .btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.32,
        y: (e.clientY - rect.top - rect.height / 2) * 0.32,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.55)' });
    });
  });
}

function initCinematicHero() {
  const lines = document.querySelectorAll('.hero-copy [data-hero-line]');
  const headlineLines = document.querySelectorAll('.hero-line');
  const visual = document.querySelector('[data-hero-visual]');
  const pillars = document.querySelector('.hero-pillars');

  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

  if (headlineLines.length) {
    tl.from(headlineLines, { y: 48, opacity: 0, duration: 1, stagger: 0.12 });
  }

  tl.from(lines, { y: 28, opacity: 0, duration: 0.85, stagger: 0.1 }, '-=0.55');

  if (visual) {
    tl.from(visual, { y: 24, opacity: 0, duration: 1 }, '-=0.6');
  }

  if (pillars) {
    tl.from(pillars.children, { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.4');
  }

  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.1;
    gsap.to(el, {
      y: () => speed * 120,
      ease: 'none',
      scrollTrigger: { trigger: '.hero-cinematic', start: 'top top', end: 'bottom top', scrub: true },
    });
  });
}

function initScrollReveals() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  gsap.utils.toArray('.reveal').filter((el) => !el.closest('.hero-cinematic')).forEach((el) => {
    const delay = parseFloat(el.dataset.stagger || '0') * 0.07;
    gsap.fromTo(
      el,
      { y: 56, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.05,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }
    );
  });
}

function initStaggerGrids() {
  if (prefersReducedMotion) return;

  ['.services-track', '#engagement-grid', '.tech-matrix'].forEach((selector) => {
    const grid = document.querySelector(selector);
    if (!grid?.children.length) return;
    gsap.from(grid.children, {
      y: 48,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 85%' },
    });
  });

  document.querySelectorAll('.case-enterprise').forEach((card, i) => {
    gsap.from(card, {
      y: 64,
      opacity: 0,
      duration: 0.9,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%' },
    });
  });
}

function initStatCounters() {
  document.querySelectorAll('[data-stat]').forEach((stat) => {
    const target = parseInt(stat.dataset.stat, 10);
    const suffix = stat.dataset.suffix || '';
    const obj = { val: 0 };
    const update = () => {
      stat.textContent = Math.round(obj.val) + suffix;
    };
    if (prefersReducedMotion) {
      obj.val = target;
      update();
      return;
    }
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        obj.val = 0;
        update();
        gsap.to(obj, {
          val: target,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: update,
        });
      },
    });
  });
}

function initProcessPin() {
  /* Sticky CSS handles process nav; avoid GSAP pin layout conflicts */
}

function initSectionGlow() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('.section-glow').forEach((glow) => {
    gsap.from(glow, {
      opacity: 0,
      scale: 0.85,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: glow.parentElement, start: 'top 78%' },
    });
  });
}

function initTechCells() {
  document.querySelectorAll('.tech-cell').forEach((cell, i) => {
    if (prefersReducedMotion) return;
    gsap.from(cell, {
      opacity: 0,
      scale: 0.94,
      duration: 0.5,
      delay: (i % 6) * 0.05,
      ease: 'power2.out',
      scrollTrigger: { trigger: cell, start: 'top 92%' },
    });
  });
}

function initCTAMega() {
  const cta = document.querySelector('.cta-mega');
  if (!cta || prefersReducedMotion) return;
  gsap.from(cta.querySelectorAll('.reveal, .cta-mega-headline'), {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: cta, start: 'top 80%' },
  });
}

export function initAnimations() {
  initRevealFallback();
  initSmoothScroll();

  try {
    initCinematicHero();
    initScrollReveals();
    initStaggerGrids();
    initStatCounters();
    initProcessPin();
    initSectionGlow();
    initTechCells();
    initCTAMega();
    initMagneticButtons();
    ScrollTrigger.refresh();
  } catch (e) {
    console.warn('Motion fallback', e);
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => initAnimations());
});
