/**
 * DSYNZ — Interactive section behaviors
 */

export function initFAQ() {
  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      document.querySelectorAll('[data-faq-item].is-open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
}

export function initProcessStory() {
  const section = document.querySelector('[data-process-story]');
  if (!section) return;

  const navItems = section.querySelectorAll('[data-process-nav]');
  const panels = section.querySelectorAll('[data-process-panel]');
  const progressBar = section.querySelector('[data-process-progress]');
  if (!navItems.length || !panels.length) return;

  const setActive = (index) => {
    navItems.forEach((n) => n.classList.toggle('is-active', parseInt(n.dataset.processNav, 10) === index));
    panels.forEach((p) => {
      const active = parseInt(p.dataset.processPanel, 10) === index;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
    if (progressBar) {
      progressBar.style.width = `${((index + 1) / panels.length) * 100}%`;
    }
  };

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => setActive(parseInt(btn.dataset.processNav, 10)));
  });

  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(parseInt(entry.target.dataset.processPanel, 10));
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    panels.forEach((p) => observer.observe(p));
  }
}

export function initHomeInteractions() {
  initProcessStory();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.documentElement.dataset.page === 'process' && document.querySelector('[data-process-story]')) {
    initProcessStory();
  }
});
