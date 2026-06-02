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

export function initServiceStage() {
  const stage = document.querySelector('[data-service-stage]');
  if (!stage) return;

  const panels = stage.querySelectorAll('[data-service-panel]');
  const items = stage.querySelectorAll('[data-service-index]');
  if (!items.length || !panels.length) return;

  const showPanel = (index) => {
    panels.forEach((panel) => {
      const active = parseInt(panel.dataset.servicePanel, 10) === index;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    items.forEach((btn) => {
      const active = parseInt(btn.dataset.serviceIndex, 10) === index;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-expanded', String(active));
    });
  };

  items.forEach((btn) => {
    btn.addEventListener('click', () => showPanel(parseInt(btn.dataset.serviceIndex, 10)));
  });

  showPanel(0);
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

export function initPositioningTyping() {
  const hosts = document.querySelectorAll('[data-typing]');
  if (!hosts.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  hosts.forEach((host) => {
    const text = host.dataset.typing || '';
    const output = host.querySelector('[data-typing-output]');
    if (!text || !output) return;

    if (reducedMotion) {
      output.textContent = text;
      host.classList.add('is-complete');
      return;
    }

    output.textContent = '';

    let timerId = null;
    let active = false;

    const clearTimer = () => {
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
    };

    const schedule = (fn, delay) => {
      clearTimer();
      timerId = window.setTimeout(fn, delay);
    };

    const runLoop = () => {
      if (!active) return;

      let index = 0;
      host.classList.remove('is-complete');

      const typeForward = () => {
        if (!active) return;
        output.textContent = text.slice(0, index);
        if (index < text.length) {
          index += 1;
          schedule(typeForward, 62);
          return;
        }
        schedule(deleteBackward, 2000);
      };

      const deleteBackward = () => {
        if (!active) return;
        if (index > 0) {
          index -= 1;
          output.textContent = text.slice(0, index);
          schedule(deleteBackward, 36);
          return;
        }
        schedule(typeForward, 480);
      };

      typeForward();
    };

    const start = () => {
      if (active) return;
      active = true;
      runLoop();
    };

    const stop = () => {
      active = false;
      clearTimer();
      output.textContent = '';
      host.classList.remove('is-complete');
    };

    const section = host.closest('#positioning') || host;
    if (typeof IntersectionObserver === 'undefined') {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start();
          else stop();
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(section);
  });
}

export function initHomeInteractions() {
  initFAQ();
  initServiceStage();
  initProcessStory();
  initPositioningTyping();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.documentElement.dataset.page === 'process' && document.querySelector('[data-process-story]')) {
    initProcessStory();
  }
});
