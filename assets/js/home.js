import { renderHomePage } from './sections.js';
import { initHomeInteractions } from './interactions.js';
import { initHeroGlobe } from './hero-globe.js';

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('home-mount');
  if (mount) mount.innerHTML = renderHomePage();
  initHomeInteractions();
  initHeroGlobe();
});
