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
    const [{ initHeroGlobe }, { initWireframeIcons }, { initWorkVisual }, { initLaunchRocket3D }] = await Promise.all([
      import('./hero-globe.js'),
      import('./wireframe-icons.js'),
      import('./work-visual.js'),
      import('./launch-rocket-3d.js'),
    ]);
    initHeroGlobe();
    initWireframeIcons();
    initWorkVisual();
    initLaunchRocket3D();
    const { ScrollTrigger } = await import('../vendor/gsap/ScrollTrigger.js');
    ScrollTrigger.refresh();
  });
});
