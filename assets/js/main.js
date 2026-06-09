/**
 * DSYNZ Core � theme, navigation, loader, smooth interactions
 */
import {
  renderNavbar,
  renderFooter,
  renderPageLoader,
} from './components.js';
import { initDefaultSchema, getWebPageSchema, injectSchema } from './seo.js';

const THEME_KEY = 'dsynz-theme';

export function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const isDark = stored !== 'light';
  document.documentElement.classList.toggle('dark', isDark);
  return isDark;
}

export function toggleTheme() {
  const isDark = !document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  return isDark;
}

function initNavScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 32);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (window.__dsynzLenis?.scrollTo) {
        window.__dsynzLenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initCursorDot() {
  const dot = document.getElementById('cursor-dot');
  if (!dot || window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = () => {
    cx = lerp(cx, tx, 0.18);
    cy = lerp(cy, ty, 0.18);
    dot.style.left = `${cx}px`;
    dot.style.top = `${cy}px`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  document.addEventListener(
    'mousemove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.classList.add('is-active');
    },
    { passive: true }
  );
  document.addEventListener('mouseleave', () => dot.classList.remove('is-active'));
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

function initActiveNavState() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const desktopInactive = ['text-[var(--color-text-muted)]', 'hover:text-[var(--color-text)]'];
  const mobileInactive = ['text-[var(--color-text)]', 'hover:bg-brand/5'];
  const desktopActive = 'text-brand';
  const mobileActive = ['bg-brand/10', 'text-brand'];

  document.querySelectorAll('#site-nav .nav-link').forEach((link) => {
    const active = link.getAttribute('href') === current || (current === '' && link.getAttribute('href') === 'index.html');
    link.classList.toggle(desktopActive, active);
    desktopInactive.forEach((cls) => link.classList.toggle(cls, !active));
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('#mobile-menu a:not(.btn-primary)').forEach((link) => {
    const active = link.getAttribute('href') === current || (current === '' && link.getAttribute('href') === 'index.html');
    mobileActive.forEach((cls) => link.classList.toggle(cls, active));
    mobileInactive.forEach((cls) => link.classList.toggle(cls, !active));
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function initThemeToggle() {
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
}

function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  const hide = () => loader.classList.add('is-hidden');
  if (document.readyState === 'complete') {
    requestAnimationFrame(() => setTimeout(hide, 400));
  } else {
    window.addEventListener('load', () => setTimeout(hide, 500));
  }
}

function initLazyImages() {
  if (!('loading' in HTMLImageElement.prototype)) return;
  document.querySelectorAll('img[data-src]').forEach((img) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.src = el.dataset.src;
            el.removeAttribute('data-src');
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(img);
  });
}

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let visible = false;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = () => {
    currentX = lerp(currentX, targetX, 0.12);
    currentY = lerp(currentY, targetY, 0.12);
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  document.addEventListener(
    'mousemove',
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        glow.classList.add('is-active');
        currentX = targetX;
        currentY = targetY;
        visible = true;
      }
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('is-active');
    visible = false;
  });
}

function mountLayout() {
  const navSlot = document.getElementById('site-nav');
  const footerSlot = document.getElementById('site-footer');
  const loaderSlot = document.getElementById('site-loader');

  if (loaderSlot && !loaderSlot.innerHTML.trim()) loaderSlot.innerHTML = renderPageLoader();
  if (navSlot && !navSlot.innerHTML.trim()) navSlot.innerHTML = renderNavbar();
  if (footerSlot && !footerSlot.innerHTML.trim()) footerSlot.innerHTML = renderFooter();
}

export function initApp(options = {}) {
  if (window.__dsynzInitialized) return;
  window.__dsynzInitialized = true;

  initTheme();
  mountLayout();
  initNavScroll();
  initActiveNavState();
  initMobileMenu();
  initThemeToggle();
  initPageLoader();
  initLazyImages();
  initCursorGlow();
  initCursorDot();
  initAnchorScroll();

  const pageType = options.pageType || 'home';
  const hasInlineSchema = document.head.querySelector('script[type="application/ld+json"]');
  if (hasInlineSchema) {
    return;
  }

  if (options.schema) {
    injectSchema(options.schema);
  } else if (options.pageTitle && options.pageDescription && options.pageUrl) {
    injectSchema([
      getWebPageSchema({
        title: options.pageTitle,
        description: options.pageDescription,
        url: options.pageUrl,
      }),
    ]);
    initDefaultSchema(pageType);
  } else {
    initDefaultSchema(pageType);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const page = root.dataset.page || 'home';
  initApp({
    pageType: page,
    pageTitle: root.dataset.pageTitle,
    pageDescription: root.dataset.pageDescription,
    pageUrl: root.dataset.pageUrl,
  });
});
