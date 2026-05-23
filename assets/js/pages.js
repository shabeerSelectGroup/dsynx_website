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
    cta.innerHTML = renderCTA({ title: 'Architect your next advantage.', primaryLabel: 'Book discovery' });
  } else if (page === 'projects') {
    const grid = document.getElementById('projects-grid');
    if (grid) {
      grid.innerHTML = renderCaseStudyItems();
      grid.setAttribute('role', 'list');
    }
    cta.innerHTML = renderCTA({
      title: 'Your transformation starts with a conversation.',
      subtitle: 'Share the challenge. We will define what elite execution looks like for your organization.',
    });
  } else if (page === 'process') {
    initProcessStory();
    cta.innerHTML = renderCTA({ secondaryLabel: 'View capabilities', secondaryHref: 'services.html' });
  } else if (page === 'about') {
    cta.innerHTML = renderCTA({ title: 'Partner with a team that shares your standard.', primaryLabel: 'Work with us' });
  } else {
    cta.innerHTML = renderCTA();
  }

  initFAQ();
});
