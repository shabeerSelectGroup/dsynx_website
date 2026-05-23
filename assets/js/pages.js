/**
 * DSYNZ — Inner page bootstrapping
 */
import { PAGE_HEROES } from './brand.js';
import { renderPageHero, renderCaseStudyItems } from './sections.js';
import { renderCTA, renderServiceCard, SERVICES } from './components.js';
import { initFAQ, initProcessStory } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.documentElement.dataset.page;
  if (!page || page === 'home') return;

  const heroSlot = document.getElementById('page-hero');
  const heroData = PAGE_HEROES[page];
  if (heroSlot && heroData) heroSlot.innerHTML = renderPageHero(heroData);

  const cta = document.getElementById('site-cta');
  if (!cta) return;

  if (page === 'services') {
    const grid = document.getElementById('all-services');
    if (grid) {
      grid.innerHTML = `<div class="services-track" role="list">${SERVICES.map((s, i) => renderServiceCard(s, i)).join('')}</div>`;
    }
    cta.innerHTML = renderCTA();
  } else if (page === 'projects') {
    const grid = document.getElementById('projects-grid');
    if (grid) {
      grid.innerHTML = renderCaseStudyItems();
      grid.setAttribute('role', 'list');
    }
    cta.innerHTML = renderCTA({
      title: 'Ready to build something purposeful?',
      subtitle: 'Share where you are today. We will help you clarify the path forward.',
    });
  } else if (page === 'process') {
    initProcessStory();
    cta.innerHTML = renderCTA({ secondaryLabel: 'Explore What We Do', secondaryHref: 'services.html' });
  } else if (page === 'about') {
    cta.innerHTML = renderCTA({ title: 'Know more about DSYNZ', primaryLabel: 'Start with Clarity' });
  } else {
    cta.innerHTML = renderCTA();
  }

  initFAQ();
});
