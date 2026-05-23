/**
 * DSYNZ — Work page (projects.html)
 */
import { BRAND } from './brand.js';
import { svgIcon } from './components.js';
import {
  WORK_CATEGORIES,
  WORK_CASE_CARDS,
  WORK_FORMAT_CARDS,
  WORK_PROOF_CARDS,
  WORK_FILTERS,
  WORK_DIFFERENCE_CARDS,
  WORK_GROWTH_LOOP,
} from './work-content.js';

function renderServiceTags(services) {
  return `<ul class="work-case-services">${services.map((s) => `<li>${s}</li>`).join('')}</ul>`;
}

function renderCaseScreenshots(card) {
  const images = [
    ...(card.screenshot ? [card.screenshot] : []),
    ...(Array.isArray(card.screenshots) ? card.screenshots.filter(Boolean) : []),
  ];

  if (images.length) {
    return images
      .map(
        (src, i) =>
          `<img src="${src}" alt="${card.title} — screenshot ${i + 1}" class="work-case-screenshot-img" loading="lazy" decoding="async" />`
      )
      .join('');
  }

  return `
    <div class="work-case-screenshot-mock" aria-hidden="true">
      <div class="work-case-screenshot-frame work-case-screenshot-frame--main"></div>
      <div class="work-case-screenshot-frame work-case-screenshot-frame--sub"></div>
    </div>
    <p class="work-case-screenshot-caption">Project screenshots</p>
  `;
}

function renderCaseCard(card, index) {
  const tags = card.tags.join(' ');
  return `
    <article
      class="work-case-card reveal"
      data-stagger="${index % 2}"
      data-work-case-card
      data-work-tags="${tags}"
      role="listitem"
    >
      <div class="work-case-layout">
        <div class="work-case-body">
          <p class="work-case-type">${card.projectType}</p>
          <h3 class="work-case-title">${card.title}</h3>
          <dl class="work-case-details">
            <div class="work-case-detail">
              <dt>Challenge</dt>
              <dd>${card.challenge}</dd>
            </div>
            <div class="work-case-detail">
              <dt>What we created</dt>
              <dd>${card.created}</dd>
            </div>
            <div class="work-case-detail work-case-detail--value">
              <dt>Business value</dt>
              <dd>${card.value}</dd>
            </div>
          </dl>
          <div class="work-case-services-wrap">
            <p class="work-case-services-label">Services</p>
            ${renderServiceTags(card.services)}
          </div>
        </div>
        <aside
          class="work-case-media work-case-media--${card.visual}"
          data-work-screenshots
          aria-label="${card.title} project screenshots"
        >
          <div class="work-case-media-inner">
            ${renderCaseScreenshots(card)}
          </div>
        </aside>
      </div>
    </article>
  `;
}

export function renderWorkHero() {
  return `
    <section class="page-hero page-hero-work" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 page-hero-grid items-center">
          <div class="col-12 lg:col-7">
            <p class="eyebrow reveal">Work</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">Purposeful solutions built for real business needs.</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">Our work spans websites, platforms, portals, business systems, product concepts, and digital solutions created to help businesses grow with clarity, confidence, and purpose.</p>
            <div class="page-hero-actions mt-10 flex flex-wrap gap-4 reveal">
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
              <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
            </div>
            <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted reveal">${BRAND.credibility}</p>
          </div>
          <aside class="col-12 lg:col-5 hero-visual-col page-hero-visual-col page-hero-work-visual-col" aria-hidden="true">
            <div class="hero-globe-wrap page-hero-work-visual-wrap" data-hero-visual>
              <div class="work-visual page-hero-work-visual" data-work-visual></div>
              <div class="hero-globe-glow" aria-hidden="true"></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

export function renderWorkPage() {
  const categoryCards = WORK_CATEGORIES.map(
    (cat, i) => `
    <article class="work-category-card reveal" data-stagger="${i % 4}" role="listitem">
      <span class="work-category-icon" aria-hidden="true">${svgIcon(cat.icon, 'work-category-icon-svg')}</span>
      <h3 class="work-category-title">${cat.title}</h3>
      <p class="work-category-text">${cat.text}</p>
    </article>`
  ).join('');

  const caseCards = WORK_CASE_CARDS.map(renderCaseCard).join('');

  const formatCards = WORK_FORMAT_CARDS.map(
    (card, i) => `
    <article class="work-format-card reveal" data-stagger="${i}" role="listitem">
      <span class="work-format-icon" aria-hidden="true">${svgIcon(card.icon, 'work-format-icon-svg')}</span>
      <h3 class="work-format-title">${card.title}</h3>
      <p class="work-format-text">${card.text}</p>
    </article>`
  ).join('');

  const proofCards = WORK_PROOF_CARDS.map(
    (card, i) => `
    <article class="work-proof-card reveal" data-stagger="${i}" role="listitem">
      <h3 class="work-proof-title">${card.title}</h3>
      <p class="work-proof-text">${card.text}</p>
    </article>`
  ).join('');

  const filterButtons = WORK_FILTERS.map(
    (f, i) =>
      `<button type="button" class="work-filter-btn${i === 0 ? ' is-active' : ''}" data-work-filter="${f.id}">${f.label}</button>`
  ).join('');

  const differenceCards = WORK_DIFFERENCE_CARDS.map(
    (card, i) => `
    <article class="work-difference-card reveal" data-stagger="${i % 3}" role="listitem">
      <h3 class="work-difference-title">${card.title}</h3>
      <p class="work-difference-text">${card.text}</p>
    </article>`
  ).join('');

  return `
    <section class="section-editorial work-intro" aria-labelledby="work-intro-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="work-intro-heading" class="heading-section text-balance">More than a portfolio. Proof of purposeful creation.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">At DSYNZ, work is not judged only by how it looks. It is judged by what it helps the business achieve.</p>
            <p class="text-lead">Every project should solve a real problem, improve clarity, support growth, or create long-term value.</p>
            <p class="text-lead text-muted">That is why we look at each project through strategy, product thinking, design, technology, and business impact.</p>
            <blockquote class="positioning-highlight">
              <p>We do not build digital assets just to launch them. We build them to create value.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="work-categories" class="section-editorial bg-elevated" aria-labelledby="work-categories-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-categories-heading" class="heading-section text-balance">Types of work we create.</h2>
          <p class="mt-6 text-lead text-muted">Our projects take different forms depending on the business problem, growth goal, and client stage.</p>
        </div>
        <div class="work-categories-grid mt-14 reveal" role="list">${categoryCards}</div>
      </div>
    </section>

    <section id="work-featured" class="section-editorial" aria-labelledby="work-featured-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-featured-heading" class="heading-section text-balance">Built with clarity. Delivered with purpose.</h2>
          <p class="mt-6 text-lead text-muted">Below are examples of the kinds of solutions DSYNZ builds and improves. These capability-based cards describe real work types — not fictional clients, metrics, or testimonials.</p>
        </div>
        <div class="work-case-grid mt-14 reveal" id="work-case-studies" role="list">${caseCards}</div>
        <p class="work-case-note mt-10 text-sm text-muted reveal">Each card represents a type of solution we deliver. Detailed case studies with named clients will be added as they become available for publication.</p>
      </div>
    </section>

    <section id="work-format" class="section-editorial bg-elevated" aria-labelledby="work-format-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-format-heading" class="heading-section text-balance">How we look at every project.</h2>
          <p class="mt-6 text-lead text-muted">We do not present work only as screenshots. We look at the business challenge, the solution created, and the value it can deliver.</p>
        </div>
        <div class="work-format-grid mt-14 reveal" role="list">${formatCards}</div>
      </div>
    </section>

    <section id="work-proof" class="section-editorial" aria-labelledby="work-proof-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-proof-heading" class="heading-section text-balance">15+ years of digital solution building.</h2>
          <p class="mt-6 text-lead text-muted">Established in 2011, DSYNZ has worked across websites, applications, platforms, digital systems, brand experiences, and product concepts.</p>
          <p class="mt-6 text-lead">Our work is shaped by practical business understanding, creative problem-solving, and reliable technology execution.</p>
        </div>
        <div class="work-proof-grid mt-14 reveal" role="list">${proofCards}</div>
      </div>
    </section>

    <section id="work-explore" class="section-editorial bg-elevated" aria-labelledby="work-explore-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-explore-heading" class="heading-section text-balance">Explore by solution type.</h2>
        </div>
        <div class="work-filter-bar reveal" role="toolbar" aria-label="Filter work by solution type">
          ${filterButtons}
        </div>
        <p class="work-filter-hint reveal text-sm text-muted mt-4" data-work-filter-hint aria-live="polite">
          Showing all solution examples above.
        </p>
        <div class="work-explore-empty reveal mt-12" data-work-explore-empty>
          <h3 class="work-explore-empty-title">Case studies are being prepared.</h3>
          <p class="work-explore-empty-text">We are currently organizing selected DSYNZ projects into detailed case studies. For now, explore the kinds of solutions we build above or contact us to discuss a relevant example.</p>
          <a href="contact.html" class="btn-primary btn-magnetic mt-8 inline-flex" data-magnetic>Talk to DSYNZ</a>
        </div>
      </div>
    </section>

    <section id="work-difference" class="section-editorial" aria-labelledby="work-difference-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-difference-heading" class="heading-section text-balance">We stand against average digital work.</h2>
          <p class="mt-6 text-lead text-muted">DSYNZ is built for clients who want more than surface-level execution. We do not believe in technology that looks impressive but fails to solve real problems.</p>
        </div>
        <div class="work-difference-grid mt-14 reveal" role="list">${differenceCards}</div>
      </div>
    </section>

    <section id="work-process-cta" class="section-editorial bg-elevated" aria-labelledby="work-process-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="work-process-heading" class="heading-section text-balance">Behind every strong project is a clear process.</h2>
          <p class="mt-6 text-lead text-muted">Our work follows the DSYNZ Growth Loop: ${WORK_GROWTH_LOOP}.</p>
          <p class="mt-6 text-lead">This process helps us move from business clarity to purposeful technology and from launch to long-term value.</p>
          <a href="process.html" class="btn-secondary btn-magnetic mt-10 inline-flex" data-magnetic>See How We Work</a>
        </div>
      </div>
    </section>
  `;
}

export function initWorkFilters() {
  const filters = document.querySelectorAll('[data-work-filter]');
  const cards = document.querySelectorAll('[data-work-case-card]');
  const hint = document.querySelector('[data-work-filter-hint]');
  const caseSection = document.getElementById('work-case-studies');
  if (!filters.length || !cards.length) return;

  const setActive = (id) => {
    filters.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.workFilter === id);
    });
  };

  const applyFilter = (id) => {
    let visible = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.workTags || '').split(/\s+/).filter(Boolean);
      const show = id === 'all' || tags.includes(id);
      card.classList.toggle('is-filtered-out', !show);
      if (show) visible += 1;
    });

    if (hint) {
      if (id === 'all') {
        hint.textContent = 'Showing all solution examples above.';
      } else if (visible === 0) {
        hint.textContent =
          'No examples match this filter yet. Explore all solution types above or contact us to discuss your requirement.';
      } else {
        const label = document.querySelector(`[data-work-filter="${id}"]`)?.textContent || id;
        hint.textContent = `Showing ${visible} example${visible === 1 ? '' : 's'} for ${label}.`;
      }
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.workFilter;
      setActive(id);
      applyFilter(id);
      caseSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  applyFilter('all');
}
