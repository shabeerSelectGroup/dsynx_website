import { renderHomePage } from './sections.js';
import { initHomeInteractions } from './interactions.js';
import { initHeroGlobe } from './hero-globe.js';
import { initWireframeIcons } from './wireframe-icons.js';
import { initWorkVisual } from './work-visual.js';

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('home-mount');
  if (mount) mount.innerHTML = renderHomePage();
  initHomeInteractions();
  initHeroGlobe();
  initWireframeIcons();
  initWorkVisual();
});
