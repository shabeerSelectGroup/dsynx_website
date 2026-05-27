/**
 * DSYNZ — Inner page enhancements
 */
import { initProcessLoopNav } from './process-page.js';
import { initWorkFilters } from './work-page.js';
import { initInsightsFilters } from './insights-page.js';
import { initFAQ } from './interactions.js';

function scheduleVisualEnhancements(run) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 50);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.documentElement.dataset.page;
  if (!page || page === 'home') return;

  initFAQ();

  if (page === 'services') {
    scheduleVisualEnhancements(async () => {
      const { initServicesHypercube } = await import('./services-hypercube.js');
      initServicesHypercube();
    });
  } else if (page === 'work') {
    scheduleVisualEnhancements(async () => {
      const { initWorkVisual } = await import('./work-visual.js');
      initWorkVisual();
    });
    initWorkFilters();
  } else if (page === 'process') {
    scheduleVisualEnhancements(async () => {
      const { initProcessWordCloud } = await import('./process-word-cloud.js');
      initProcessWordCloud();
    });
    initProcessLoopNav();
  } else if (page === 'blog') {
    initInsightsFilters();
  }
});
