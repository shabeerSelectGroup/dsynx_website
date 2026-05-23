/**
 * DSYNZ — Modular page sections (home + shared blocks)
 */
import {
  BRAND,
  PILLARS,
  GROWTH_LOOP_STEPS,
  HOME_SERVICES,
  PROBLEM_CARDS,
  WHY_DSYNZ_CARDS,
  IMPACT_QUESTIONS,
  WORK_PREVIEW,
  AUDIENCE_TAGS,
} from './brand.js';
import { svgIcon } from './components.js';

function renderGrowthStepIcon(icon) {
  return `<span class="growth-step-icon" aria-hidden="true">${svgIcon(icon, 'growth-step-icon-svg')}</span>`;
}

const HERO_SERVICES = HOME_SERVICES;

function renderContentCards(cards) {
  return cards
    .map(
      (card, i) => `
      <article class="content-card reveal" data-stagger="${i}">
        <h3 class="content-card-title">${card.title}</h3>
        <p class="content-card-text">${card.text}</p>
      </article>`
    )
    .join('');
}

export function renderParticles() {
  return Array.from({ length: 18 }, (_, i) => `<span class="particle" style="--i:${i}" aria-hidden="true"></span>`).join('');
}

export function renderScrollIndicator(target = '#hero-bridge') {
  return `
    <a href="${target}" class="scroll-indicator" aria-label="Scroll to explore">
      <span class="scroll-indicator-text">Explore</span>
      <span class="scroll-indicator-line" aria-hidden="true"></span>
    </a>
  `;
}

export function renderPageHero({ eyebrow, title, lead }) {
  return `
    <section class="page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 items-end">
          <div class="col-12 lg:col-8">
            <p class="eyebrow reveal">${eyebrow}</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">${title}</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">${lead}</p>
          </div>
          <div class="col-12 lg:col-4 lg:text-right reveal">
            <p class="font-mono text-xs uppercase tracking-[0.3em] text-muted">DSYNZ / ${eyebrow}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderServiceStageItem(service, index, active = false) {
  return `
    <button type="button" class="service-stage-item ${active ? 'is-active' : ''}" data-service-index="${index}" aria-expanded="${active}">
      <span class="service-stage-index">${String(index + 1).padStart(2, '0')}</span>
      <span class="service-stage-icon">${svgIcon(service.icon, 'h-5 w-5')}</span>
      <span class="service-stage-label">${service.title}</span>
    </button>
  `;
}

export function renderServiceStagePanel(service) {
  return `
    <div class="service-stage-panel-inner">
      <div class="service-stage-visual" aria-hidden="true">
        <div class="service-stage-ring"></div>
        <div class="service-stage-glyph">${svgIcon(service.icon, 'h-16 w-16')}</div>
        <div class="service-stage-grid"></div>
      </div>
      <p class="eyebrow">What we do</p>
      <h3 class="heading-section mt-4 text-[var(--color-text)]">${service.title}</h3>
      <p class="mt-5 text-lead text-muted max-w-lg">${service.desc}</p>
      <ul class="mt-8 flex flex-wrap gap-2" aria-label="Approach">
        <li class="tag-pill">Strategy-led</li>
        <li class="tag-pill">Growth-focused</li>
        <li class="tag-pill">Practical</li>
      </ul>
      <a href="services.html" class="btn-primary btn-magnetic mt-10" data-magnetic>View all services</a>
    </div>
  `;
}

export function renderHeroBridge() {
  return `
    <section id="hero-bridge" class="hero-bridge" aria-labelledby="hero-bridge-heading" data-section>
      <div class="container-wide hero-bridge-inner">
        <h2 id="hero-bridge-heading" class="hero-bridge-statement reveal">${BRAND.heroSupporting}</h2>
        <p class="hero-bridge-eyebrow reveal">${BRAND.eyebrow}</p>
        <div class="hero-bridge-pillars reveal" role="list" aria-label="How we work">
          ${PILLARS.map(
            (p) => `
            <div class="hero-bridge-pillar" role="listitem">
              <p class="hero-pillar-label">${p.label}</p>
              <p class="hero-pillar-desc">${p.desc}</p>
            </div>`
          ).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderHomeHero() {
  return `
    <section class="hero-cinematic hero-cinematic-balanced" aria-labelledby="hero-heading" data-section data-parallax-root>
      <div class="hero-cinematic-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated" data-parallax="0.15"></div>
        <div class="hero-grid" data-parallax="0.08"></div>
        <div class="hero-particles">${renderParticles()}</div>
        <div class="floating-accent floating-accent-1" data-parallax="0.25"></div>
        <div class="floating-accent floating-accent-2" data-parallax="0.18"></div>
      </div>
      <div class="container-wide hero-cinematic-content">
        <div class="hero-layout" data-hero-title>
          <div class="hero-copy">
            <p class="eyebrow hero-eyebrow" data-hero-line>${BRAND.eyebrow}</p>
            <h1 id="hero-heading" class="hero-headline" data-hero-line>
              <span class="hero-line">We design</span>
              <span class="hero-line hero-line-accent">unbeatable businesses.</span>
            </h1>
            <div class="hero-descriptor" data-hero-line>
              <p class="hero-descriptor-lead">${BRAND.heroDescriptorLead}</p>
              <p class="hero-descriptor-body">${BRAND.heroDescriptorBody}</p>
            </div>
            <div class="hero-actions" data-hero-line>
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
              <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
            </div>
            <p class="hero-credibility" data-hero-line>${BRAND.credibility}</p>
          </div>
          <aside class="hero-visual-col" aria-hidden="true">
            <div class="hero-globe-wrap" data-hero-visual>
              <div class="hero-globe" data-hero-globe></div>
              <div class="hero-globe-glow" aria-hidden="true"></div>
            </div>
          </aside>
        </div>
        ${renderScrollIndicator('#hero-bridge')}
      </div>
    </section>
  `;
}

export function renderProblemSection() {
  return `
    <section id="problem" class="section-editorial" aria-labelledby="problem-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 lg:sticky lg:top-32 lg:self-start reveal">
            <p class="eyebrow">The challenge</p>
            <h2 id="problem-heading" class="heading-section mt-5 max-w-2xl text-balance">Most businesses do not need more technology. They need better direction.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-8 reveal">
            <p class="text-lead text-muted">Websites, apps, platforms, and systems often fail because they are built without clarity.</p>
            <p class="text-lead text-muted">The result is wasted money, confused teams, poor adoption, and digital tools that do not support growth.</p>
            <p class="text-lead">At DSYNZ, we start before development. We understand the business, define the problem, and design technology with purpose.</p>
          </div>
        </div>
        <div class="content-cards mt-20 reveal" role="list">
          ${renderContentCards(PROBLEM_CARDS)}
        </div>
      </div>
    </section>
  `;
}

export function renderPositioningSection() {
  return `
    <section id="positioning" class="section-editorial bg-elevated" aria-labelledby="positioning-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <p class="eyebrow">Positioning</p>
            <h2 id="positioning-heading" class="heading-section mt-5 text-balance">Not just design. Not just development. Purposeful creation.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">DSYNZ may sound like “designs,” but for us, design means more than visuals.</p>
            <p class="text-lead text-muted">It means creating with purpose. It means shaping ideas, products, services, systems, and digital experiences that help businesses become stronger.</p>
            <p class="text-lead">We combine business clarity, product thinking, design, and technology to build solutions that are practical, scalable, and growth-focused.</p>
            <blockquote class="positioning-highlight mt-10">
              <p>We do not just build what is requested. We help you understand what should be built, why it matters, and how it can create value.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderServiceExperience() {
  const first = HERO_SERVICES[0];
  return `
    <section id="services" class="section-editorial section-services" aria-labelledby="services-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 items-end gap-y-8 reveal">
          <div class="col-12 lg:col-7">
            <p class="eyebrow">What we do</p>
            <h2 id="services-heading" class="heading-section mt-5 text-balance">Digital products and solutions built for business growth.</h2>
          </div>
          <p class="col-12 lg:col-5 text-lead text-muted lg:text-right lg:ml-auto max-w-md">We help growing businesses move from unclear ideas and disconnected systems to purposeful technology that supports real progress.</p>
        </div>
        <div class="service-stage mt-20 reveal" data-service-stage>
          <div class="service-stage-nav" role="tablist" aria-label="Services">
            ${HERO_SERVICES.map((s, i) => renderServiceStageItem(s, i, i === 0)).join('')}
          </div>
          <div class="service-stage-detail" data-service-panel role="tabpanel">
            ${renderServiceStagePanel(first)}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderGrowthLoop() {
  const steps = GROWTH_LOOP_STEPS.map(
    (step, i) => `
    <article class="growth-step reveal" data-stagger="${i}" role="listitem">
      <div class="growth-step-head">
        ${renderGrowthStepIcon(step.icon)}
        <span class="growth-step-phase">${step.phase}</span>
      </div>
      <h3 class="growth-step-title">${step.title}</h3>
      <p class="growth-step-body">${step.body}</p>
    </article>`
  ).join('');

  return `
    <section id="growth-loop" class="section-process" aria-labelledby="growth-loop-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 reveal">
          <div class="col-12 lg:col-8">
            <p class="eyebrow">How we work</p>
            <h2 id="growth-loop-heading" class="heading-section mt-5 text-balance">Our process does not end at launch.</h2>
            <p class="mt-6 text-lead text-muted max-w-2xl">We follow a strategy-led growth loop designed to clarify, create, launch, improve, and scale purposeful digital solutions.</p>
          </div>
        </div>
        <div class="growth-loop-grid mt-16 reveal" role="list">${steps}</div>
        <p class="growth-loop-closing mt-12 text-center font-mono text-sm uppercase tracking-[0.2em] text-brand reveal">Assess → Blueprint → Create → Deploy → Evaluate → Fix → Grow</p>
      </div>
    </section>
  `;
}

export function renderWhoWeHelp() {
  const tags = AUDIENCE_TAGS.map((tag) => `<li class="tag-pill">${tag}</li>`).join('');
  return `
    <section id="who-we-help" class="section-editorial" aria-labelledby="who-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <p class="eyebrow">Who we help</p>
            <h2 id="who-heading" class="heading-section mt-5 text-balance">Built for ambitious businesses ready to grow.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">DSYNZ works with SMBs, startups, family businesses, service companies, and eCommerce brands that want to use technology with more clarity and confidence.</p>
            <p class="text-lead">We are industry-flexible, but growth-focused. The right client is not defined only by size or sector. It is defined by ambition.</p>
            <blockquote class="positioning-highlight">
              <p>We work best with clients who want more than average digital work.</p>
            </blockquote>
          </div>
        </div>
        <ul class="audience-tags mt-16 flex flex-wrap gap-2 reveal" role="list" aria-label="Industries and business types">${tags}</ul>
      </div>
    </section>
  `;
}

export function renderWhyDsynz() {
  return `
    <section id="why-dsynz" class="section-editorial bg-elevated" aria-labelledby="why-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <p class="eyebrow">Why DSYNZ</p>
          <h2 id="why-heading" class="heading-section mt-5 text-balance">We stand against average digital work.</h2>
          <p class="mt-6 text-lead text-muted">Technology should not be built for the sake of building. Every solution should have a reason, a purpose, and a path to growth.</p>
        </div>
        <div class="content-cards content-cards-five mt-16 reveal" role="list">
          ${renderContentCards(WHY_DSYNZ_CARDS)}
        </div>
      </div>
    </section>
  `;
}

export function renderImpactFilter() {
  const questions = IMPACT_QUESTIONS.map(
    (q, i) => `
    <li class="impact-question reveal" data-stagger="${i}">
      <span class="impact-question-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="impact-question-text">${q}</span>
    </li>`
  ).join('');

  return `
    <section id="impact" class="section-editorial" aria-labelledby="impact-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <p class="eyebrow">Impact filter</p>
            <h2 id="impact-heading" class="heading-section mt-5 text-balance">Before we build, we ask better questions.</h2>
            <p class="mt-6 text-lead text-muted">Every DSYNZ project is judged by its ability to create meaningful business impact.</p>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 reveal">
            <ol class="impact-questions" role="list">${questions}</ol>
            <p class="positioning-highlight mt-10 text-lead">If the answer is not clear, we go back to clarity.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderWorkPreview() {
  const cards = WORK_PREVIEW.map(
    (item, i) => `
    <article class="work-preview-card reveal" data-stagger="${i}" role="listitem">
      <h3 class="work-preview-title">${item.title}</h3>
      <p class="work-preview-desc">${item.desc}</p>
    </article>`
  ).join('');

  return `
    <section id="work" class="section-editorial" aria-labelledby="work-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 items-end gap-y-8 reveal">
          <div class="col-12 lg:col-7">
            <p class="eyebrow">Work</p>
            <h2 id="work-heading" class="heading-section mt-5 text-balance">Built with clarity. Delivered with purpose.</h2>
            <p class="mt-6 text-lead text-muted max-w-2xl">Our work spans websites, platforms, portals, business systems, product concepts, and digital solutions for growing businesses.</p>
          </div>
          <div class="col-12 lg:col-5 flex lg:justify-end">
            <div class="credibility-card reveal">
              <p class="credibility-card-value">15+ years</p>
              <p class="credibility-card-text">Designing and delivering digital solutions since 2011.</p>
            </div>
          </div>
        </div>
        <div class="work-preview-grid mt-16 reveal" role="list">${cards}</div>
        <div class="mt-12 reveal">
          <a href="projects.html" class="btn-secondary btn-magnetic" data-magnetic>View our work</a>
        </div>
      </div>
    </section>
  `;
}

export function renderAboutPreview() {
  return `
    <section id="about-preview" class="section-editorial bg-elevated" aria-labelledby="about-preview-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split items-center">
          <div class="col-12 lg:col-5 reveal">
            <p class="eyebrow">About DSYNZ</p>
            <h2 id="about-preview-heading" class="heading-section mt-5 text-balance">Built on 15+ years of digital solutions experience.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">Established in 2011, DSYNZ has evolved from a design and development company into a strategy-led technology partner for growing businesses.</p>
            <p class="text-lead">Today, we help ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.</p>
            <p class="text-lead text-muted">Our strength comes from combining business thinking, product clarity, creative problem-solving, and reliable technology execution.</p>
            <a href="about.html" class="btn-ghost inline-flex">Know more about DSYNZ</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderCTAMega() {
  return `
    <section class="cta-mega" aria-labelledby="cta-mega-heading" data-section>
      <div class="cta-mega-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="floating-accent floating-accent-1"></div>
      </div>
      <div class="container-wide cta-mega-inner relative z-10">
        <div class="grid-12 items-end">
          <div class="col-12 lg:col-8 reveal">
            <p class="eyebrow">Get started</p>
            <h2 id="cta-mega-heading" class="cta-mega-headline mt-6 text-balance">Ready to build something purposeful?</h2>
            <p class="text-lead mt-8 max-w-xl text-muted">Whether you are improving an existing business, launching a new product, or rethinking your digital systems, DSYNZ can help you start with clarity and build for growth.</p>
          </div>
          <div class="col-12 lg:col-4 flex flex-col gap-4 lg:items-stretch reveal">
            <a href="contact.html" class="btn-primary btn-magnetic text-center" data-magnetic>Start with Clarity</a>
            <a href="contact.html" class="btn-secondary btn-magnetic text-center" data-magnetic>Talk to DSYNZ</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

/** Process page — scroll-linked phase navigator */
export function renderProcessStory() {
  const panels = GROWTH_LOOP_STEPS.map(
    (step, i) => `
    <article class="process-panel ${i === 0 ? 'is-active' : ''}" data-process-panel="${i}" id="process-panel-${i}" ${i === 0 ? '' : 'hidden'}>
      <p class="font-mono text-sm text-brand">${step.phase}</p>
      <h3 class="heading-section mt-4 text-[var(--color-text)]">${step.headline}</h3>
      <p class="mt-6 text-lead text-muted">${step.body}</p>
    </article>`
  ).join('');

  const nav = GROWTH_LOOP_STEPS.map(
    (step, i) => `
    <button type="button" class="process-nav-item ${i === 0 ? 'is-active' : ''}" data-process-nav="${i}">
      <span class="process-nav-phase">${step.phase}</span>
      <span class="process-nav-title">${step.title}</span>
    </button>`
  ).join('');

  return `
    <section class="section-process" aria-labelledby="process-heading" data-section data-process-story>
      <div class="container-wide">
        <div class="grid-12 reveal">
          <div class="col-12 lg:col-4">
            <p class="eyebrow">How we work</p>
            <h2 id="process-heading" class="heading-section mt-5">Strategy-led growth loop</h2>
            <p class="mt-6 text-muted max-w-sm">Assess → Blueprint → Create → Deploy → Evaluate → Fix → Grow</p>
          </div>
        </div>
        <div class="process-story mt-16 grid-12">
          <div class="col-12 lg:col-4">
            <div class="process-story-pin">
              <nav class="process-nav" aria-label="Growth loop phases">${nav}</nav>
              <div class="process-progress" aria-hidden="true"><span class="process-progress-bar" data-process-progress></span></div>
            </div>
          </div>
          <div class="col-12 lg:col-7 lg:col-start-6">
            <div class="process-panels" data-process-panels>${panels}</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderCaseStudyItems() {
  return WORK_PREVIEW.map(
    (p, i) => `
    <article class="work-preview-card case-enterprise group" data-stagger="${i}" role="listitem">
      <a href="projects.html" class="case-enterprise-link block h-full">
        <div class="case-enterprise-body">
          <h3 class="case-enterprise-title">${p.title}</h3>
          <p class="mt-3 text-muted">${p.desc}</p>
        </div>
      </a>
    </article>`
  ).join('');
}

export function renderCaseStudyGrid() {
  return `<div class="work-preview-grid" role="list">${renderCaseStudyItems()}</div>`;
}

export function renderCaseStudies() {
  return `
    <section class="section-editorial" aria-labelledby="cases-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 items-end reveal">
          <div class="col-12 lg:col-6">
            <p class="eyebrow">Work</p>
            <h2 id="cases-heading" class="heading-section mt-5">Built with clarity. Delivered with purpose.</h2>
          </div>
          <a href="projects.html" class="col-12 lg:col-6 lg:text-right btn-ghost justify-end">View our work</a>
        </div>
        <div class="mt-20 work-preview-grid" id="case-studies-grid" role="list">${renderCaseStudyItems()}</div>
      </div>
    </section>
  `;
}

export function renderHomePage() {
  return [
    renderHomeHero(),
    renderHeroBridge(),
    renderProblemSection(),
    renderPositioningSection(),
    renderServiceExperience(),
    renderGrowthLoop(),
    renderWhoWeHelp(),
    renderWhyDsynz(),
    renderImpactFilter(),
    renderWorkPreview(),
    renderAboutPreview(),
    renderCTAMega(),
  ].join('\n');
}
