import { initHomeInteractions } from './interactions.js';

function scheduleVisualEnhancements(run) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 50);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initHomeInteractions();

  scheduleVisualEnhancements(async () => {
    const run = async (loader, init) => {
      try {
        const mod = await loader();
        init(mod);
      } catch (err) {
        console.warn('[DSYNZ] Visual module failed to load', err);
      }
    };

    await Promise.all([
      run(() => import('./hero-globe.js'), (m) => m.initHeroGlobe()),
      run(() => import('./wireframe-icons.js'), (m) => m.initWireframeIcons()),
      run(() => import('./work-visual.js'), (m) => m.initWorkVisual()),
      run(() => import('./launch-rocket-3d.js'), (m) => m.initLaunchRocket3D()),
    ]);

    try {
      const { ScrollTrigger } = await import('../vendor/gsap/ScrollTrigger.js');
      ScrollTrigger.refresh();
    } catch (err) {
      console.warn('[DSYNZ] ScrollTrigger refresh skipped', err);
    }
  });
});
