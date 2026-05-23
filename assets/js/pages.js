/**
 * DSYNZ — Inner page bootstrapping
 */
import { PAGE_HEROES } from './brand.js';
import { renderPageHero } from './sections.js';
import { renderServicesHero, renderServicesPage } from './services-page.js';
import { initServicesHypercube } from './services-hypercube.js';
import { renderProcessHero, renderProcessPage, initProcessLoopNav } from './process-page.js';
import { initProcessWordCloud } from './process-word-cloud.js';
import { renderWorkHero, renderWorkPage, initWorkFilters } from './work-page.js';
import { initWorkVisual } from './work-visual.js';
import { renderAboutHero, renderAboutPage } from './about-page.js';
import { renderInsightsHero, renderInsightsPage, initInsightsFilters } from './insights-page.js';
import { renderContactHero, renderContactPage } from './contact-page.js';
import { renderCTA } from './components.js';
import { initFAQ } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.documentElement.dataset.page;
  if (!page || page === 'home') return;

  const heroSlot = document.getElementById('page-hero');
  const heroData = PAGE_HEROES[page];
  if (heroSlot && page === 'services') {
    heroSlot.innerHTML = renderServicesHero();
  } else if (heroSlot && page === 'process') {
    heroSlot.innerHTML = renderProcessHero();
  } else if (heroSlot && page === 'work') {
    heroSlot.innerHTML = renderWorkHero();
  } else if (heroSlot && page === 'about') {
    heroSlot.innerHTML = renderAboutHero();
  } else if (heroSlot && page === 'blog') {
    heroSlot.innerHTML = renderInsightsHero();
  } else if (heroSlot && page === 'contact') {
    heroSlot.innerHTML = renderContactHero();
  } else if (heroSlot && heroData) {
    heroSlot.innerHTML = renderPageHero(heroData);
  }

  const cta = document.getElementById('site-cta');
  if (!cta) return;

  if (page === 'services') {
    const mount = document.getElementById('services-mount');
    if (mount) mount.innerHTML = renderServicesPage();
    initServicesHypercube();
    cta.innerHTML = renderCTA({
      title: 'Not sure what you need? Start with clarity.',
      subtitle:
        'You may not need a website, app, platform, or automation immediately. You may first need to understand what will create the best impact. Tell us what you are trying to build, fix, improve, or grow. We will help you find the right next step.',
      primaryLabel: 'Start with Clarity',
      secondaryLabel: 'Talk to DSYNZ',
    });
  } else if (page === 'work') {
    const mount = document.getElementById('work-mount');
    if (mount) mount.innerHTML = renderWorkPage();
    initWorkVisual();
    initWorkFilters();
    cta.innerHTML = renderCTA({
      title: 'Have something meaningful to build?',
      subtitle:
        'Whether you are planning a new product, improving a website, creating a business portal, or rethinking your digital systems, DSYNZ can help you start with clarity.',
      primaryLabel: 'Start with Clarity',
      secondaryLabel: 'Talk to DSYNZ',
    });
  } else if (page === 'process') {
    const mount = document.getElementById('process-mount');
    if (mount) mount.innerHTML = renderProcessPage();
    initProcessWordCloud();
    initProcessLoopNav();
    cta.innerHTML = renderCTA({
      title: 'Ready to start with clarity?',
      subtitle:
        'Tell us what you are trying to build, fix, improve, or grow. We will help you understand the right next step before you invest in the wrong solution.',
      primaryLabel: 'Start with Clarity',
      secondaryLabel: 'Talk to DSYNZ',
    });
  } else if (page === 'about') {
    const mount = document.getElementById('about-mount');
    if (mount) mount.innerHTML = renderAboutPage();
    cta.innerHTML = renderCTA({
      title: 'Ready to build with clarity and purpose?',
      subtitle:
        'Whether you are improving an existing business, launching a new product, or rethinking your digital systems, DSYNZ can help you understand the right next step.',
      primaryLabel: 'Start with Clarity',
      secondaryLabel: 'Talk to DSYNZ',
    });
  } else if (page === 'blog') {
    const mount = document.getElementById('insights-mount');
    if (mount) mount.innerHTML = renderInsightsPage();
    initInsightsFilters();
    cta.innerHTML = renderCTA({
      title: 'Ready to build with better clarity?',
      subtitle:
        'Tell us what you are trying to build, fix, improve, or grow. We will help you understand the right next step before you invest in the wrong solution.',
      primaryLabel: 'Start with Clarity',
      secondaryLabel: 'Talk to DSYNZ',
    });
  } else if (page === 'contact') {
    const mount = document.getElementById('contact-mount');
    if (mount) mount.innerHTML = renderContactPage();
    cta.innerHTML = renderCTA({
      title: 'Ready to build with clarity and purpose?',
      subtitle:
        'Share what you are trying to build, fix, improve, or grow. We will help you understand the right direction.',
      primaryLabel: 'Submit Enquiry',
      primaryHref: '#contact-form-section',
      secondaryLabel: 'See How We Work',
      secondaryHref: 'process.html',
    });
  } else {
    cta.innerHTML = renderCTA();
  }

  initFAQ();
});
