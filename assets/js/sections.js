/**
 * DSYNZ — Modular page sections (home + shared blocks)
 */
import { BRAND, PILLARS, PROCESS_STEPS, TECH_STACK, CLIENT_MARKS } from './brand.js';
import {
  svgIcon,
  SERVICES,
  CASE_STUDIES,
  ENGAGEMENT_MODELS,
  FAQ_ITEMS,
} from './components.js';

const HERO_SERVICES = SERVICES.slice(0, 6);

export function renderParticles() {
  return Array.from({ length: 18 }, (_, i) => `<span class="particle" style="--i:${i}" aria-hidden="true"></span>`).join('');
}

export function renderScrollIndicator() {
  return `
    <a href="#manifesto" class="scroll-indicator" aria-label="Scroll to explore">
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
      <p class="eyebrow">Capability</p>
      <h3 class="heading-section mt-4 text-[var(--color-text)]">${service.title}</h3>
      <p class="mt-5 text-lead text-muted max-w-lg">${service.desc}</p>
      <ul class="mt-8 flex flex-wrap gap-2" aria-label="Outcomes">
        <li class="tag-pill">Strategy-led</li>
        <li class="tag-pill">Enterprise-ready</li>
        <li class="tag-pill">Measurable ROI</li>
      </ul>
      <a href="services.html" class="btn-primary btn-magnetic mt-10" data-magnetic>Explore ${service.title}</a>
    </div>
  `;
}

export function renderHomeHero() {
  return `
    <section class="hero-cinematic" aria-labelledby="hero-heading" data-section data-parallax-root>
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
            <p class="brand-pill" data-hero-line><span>${BRAND.name}</span> Strategic Technology Partner</p>
            <h1 id="hero-heading" class="hero-headline" data-hero-line>
              <span class="hero-line">We engineer</span>
              <span class="hero-line hero-line-accent">digital dominance.</span>
            </h1>
            <p class="hero-subline" data-hero-line>${BRAND.descriptor}</p>
            <div class="hero-actions" data-hero-line>
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start a strategic engagement</a>
              <a href="projects.html" class="btn-secondary btn-magnetic" data-magnetic>View transformations</a>
            </div>
            <div class="hero-metrics-inline" aria-label="Key metrics">
              <div class="hero-metric-pill"><span class="hero-metric-dot" aria-hidden="true"></span> Systems operational</div>
              <div class="hero-metric-pill"><span class="font-display text-brand">98%</span> client retention</div>
            </div>
          </div>
          <aside class="hero-aside" aria-hidden="true">
            <div class="hero-architecture" data-hero-visual>
              <div class="hero-arch-layer hero-arch-layer-1"></div>
              <div class="hero-arch-layer hero-arch-layer-2"></div>
              <div class="hero-arch-core">
                <span class="hero-arch-label">Platform status</span>
                <span class="hero-arch-value">Operational</span>
                <div class="hero-arch-bar"><span style="width:82%"></span></div>
              </div>
              <div class="hero-arch-stat">
                <span class="font-display text-brand">98%</span>
                <span class="hero-arch-stat-label">Retention</span>
              </div>
            </div>
          </aside>
        </div>
        <div class="hero-pillars">
          ${PILLARS.map(
            (p) => `
            <div class="hero-pillar">
              <p class="hero-pillar-label">${p.label}</p>
              <p class="hero-pillar-desc">${p.desc}</p>
            </div>`
          ).join('')}
        </div>
        ${renderScrollIndicator()}
      </div>
    </section>
  `;
}

export function renderManifesto() {
  return `
    <section id="manifesto" class="section-editorial" aria-labelledby="manifesto-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 lg:sticky lg:top-32 lg:self-start reveal">
            <p class="eyebrow">Position</p>
            <h2 id="manifesto-heading" class="heading-section mt-5 max-w-2xl text-balance">Not a vendor.<br />A strategic force multiplier.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-10 reveal">
            <p class="text-editorial">DSYNZ exists where boardroom strategy meets world-class execution — helping ambitious organizations modernize, scale, and win in markets defined by software.</p>
            <p class="text-editorial text-muted">We are architects of clarity: aligning product, engineering, design, and intelligence into one accountable motion. The result is technology that compounds — never fragments.</p>
            <div class="flex flex-wrap gap-3 pt-4">
              <a href="about.html" class="btn-ghost">Our philosophy</a>
              <a href="process.html" class="btn-secondary btn-magnetic" data-magnetic>See methodology</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderTrustStrip() {
  const marks = [...CLIENT_MARKS, ...CLIENT_MARKS]
    .map((m) => `<span class="logo-item">${m}</span>`)
    .join('');
  return `
    <div class="trust-strip" role="region" aria-label="Trusted by leading organizations">
      <div class="trust-strip-inner">
        <p class="trust-strip-label">Trusted by teams building category leaders</p>
        <div class="logo-marquee-wrap"><div class="logo-marquee">${marks}</div></div>
      </div>
      <div class="container-wide trust-metrics" aria-label="Impact metrics">
        <div class="trust-metric reveal"><p class="stat-value" data-stat="120" data-suffix="+">120+</p><p class="stat-label">Deliveries</p></div>
        <div class="trust-metric reveal"><p class="stat-value" data-stat="98" data-suffix="%">98%</p><p class="stat-label">Retention</p></div>
        <div class="trust-metric reveal"><p class="stat-value" data-stat="240" data-suffix="M+">240M+</p><p class="stat-label">Transactions enabled</p></div>
        <div class="trust-metric reveal"><p class="stat-value" data-stat="15" data-suffix="+">15+</p><p class="stat-label">Industries</p></div>
      </div>
    </div>
  `;
}

export function renderServiceExperience() {
  const first = HERO_SERVICES[0];
  return `
    <section class="section-editorial section-services" aria-labelledby="services-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 items-end gap-y-8 reveal">
          <div class="col-12 lg:col-7">
            <p class="eyebrow">Strategic services</p>
            <h2 id="services-heading" class="heading-section mt-5 text-balance">Capabilities engineered for market leadership</h2>
          </div>
          <p class="col-12 lg:col-5 text-lead text-muted lg:text-right lg:ml-auto max-w-md">Interactive exploration of how we design, build, and scale technology that wins.</p>
        </div>
        <div class="service-stage mt-20 reveal" data-service-stage>
          <div class="service-stage-nav" role="tablist" aria-label="Service capabilities">
            ${HERO_SERVICES.map((s, i) => renderServiceStageItem(s, i, i === 0)).join('')}
          </div>
          <div class="service-stage-detail" data-service-panel role="tabpanel">
            ${renderServiceStagePanel(first)}
          </div>
        </div>
        <div class="services-track mt-16" role="list" aria-label="All capabilities">
          ${HERO_SERVICES.map((s, i) => `
            <article class="service-card" data-stagger="${i}" role="listitem">
              <div class="service-card-body">
                <div class="service-icon">${svgIcon(s.icon, 'h-5 w-5')}</div>
                <h3 class="service-card-title">${s.title}</h3>
                <p class="service-card-desc">${s.desc}</p>
              </div>
              <a href="services.html" class="service-card-link">Explore capabilities</a>
            </article>`).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderProcessStory() {
  const panels = PROCESS_STEPS.map(
    (step, i) => `
    <article class="process-panel ${i === 0 ? 'is-active' : ''}" data-process-panel="${i}" id="process-panel-${i}" ${i === 0 ? '' : 'hidden'}>
      <p class="font-mono text-sm text-brand">${step.phase}</p>
      <h3 class="heading-section mt-4 text-[var(--color-text)]">${step.headline}</h3>
      <p class="mt-6 text-lead text-muted">${step.body}</p>
      <ul class="mt-8 space-y-2">
        ${step.deliverables.map((d) => `<li class="tag-pill">${d}</li>`).join('')}
      </ul>
    </article>`
  ).join('');

  const nav = PROCESS_STEPS.map(
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
            <p class="eyebrow">Methodology</p>
            <h2 id="process-heading" class="heading-section mt-5">Scroll through certainty</h2>
            <p class="mt-6 text-muted max-w-sm">A cinematic delivery framework — transparent, executive-ready, and built for enterprise governance.</p>
          </div>
        </div>
        <div class="process-story mt-16 grid-12">
          <div class="col-12 lg:col-4">
            <div class="process-story-pin">
              <nav class="process-nav" aria-label="Process phases">${nav}</nav>
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
  return CASE_STUDIES.map((p, i) => {
    const featured = p.featured ? 'is-featured' : '';
    return `
    <article class="case-enterprise ${featured} group" data-stagger="${i}" role="listitem">
      <a href="projects.html" class="case-enterprise-link">
        <div class="case-enterprise-media">
          <div class="case-enterprise-bg" aria-hidden="true"></div>
          <div class="case-enterprise-overlay">
            <span class="case-enterprise-industry">${p.industry}</span>
            <div class="case-enterprise-metric">
              <span class="case-metric">${p.metric}</span>
              <span class="text-[10px] uppercase tracking-widest text-white/70">${p.metricLabel}</span>
            </div>
          </div>
        </div>
        <div class="case-enterprise-body">
          <h3 class="case-enterprise-title">${p.title}</h3>
          <p class="mt-3 text-muted">${p.desc}</p>
          <div class="case-transform mt-6">
            <div><span class="case-transform-label">Before</span><p>${p.before}</p></div>
            <div class="case-transform-arrow" aria-hidden="true">→</div>
            <div class="is-after"><span class="case-transform-label">After</span><p>${p.after}</p></div>
          </div>
        </div>
      </a>
    </article>`;
  }).join('');
}

export function renderCaseStudyGrid() {
  return `<div class="case-grid" role="list">${renderCaseStudyItems()}</div>`;
}

export function renderCaseStudies() {
  return `
    <section class="section-editorial" aria-labelledby="cases-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 items-end reveal">
          <div class="col-12 lg:col-6">
            <p class="eyebrow">Case studies</p>
            <h2 id="cases-heading" class="heading-section mt-5">Enterprise transformations</h2>
          </div>
          <a href="projects.html" class="col-12 lg:col-6 lg:text-right btn-ghost justify-end">All case studies</a>
        </div>
        <div class="mt-20 case-grid" id="case-studies-grid" role="list">${renderCaseStudyItems()}</div>
      </div>
    </section>
  `;
}

export function renderTechMatrix() {
  return `
    <section class="section-tech" aria-labelledby="tech-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split items-end reveal">
          <div class="col-12 lg:col-5">
            <p class="eyebrow">Technology</p>
            <h2 id="tech-heading" class="heading-section mt-5">Battle-tested ecosystem</h2>
            <p class="mt-6 text-muted">Chosen for reliability at scale — not trends.</p>
          </div>
        </div>
        <div class="tech-matrix mt-16 reveal" data-tech-matrix role="list" aria-label="Technology stack">
          ${TECH_STACK.map(
            (t, i) => `
            <div class="tech-cell" data-stagger="${i}" role="listitem">
              <span class="tech-cell-cat">${t.category}</span>
              <span class="tech-cell-name">${t.name}</span>
            </div>`
          ).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderTestimonialsEditorial() {
  return `
    <section class="section-editorial section-testimonials" aria-labelledby="testimonials-heading" data-section>
      <div class="container-wide">
        <p class="eyebrow reveal">Client intelligence</p>
        <h2 id="testimonials-heading" class="heading-section mt-5 max-w-4xl reveal">Voices from leaders who demand elite execution</h2>
        <div class="testimonial-editorial mt-20 reveal">
          <blockquote class="testimonial-editorial-main">
            <span class="testimonial-mark" aria-hidden="true">"</span>
            <p class="testimonial-editorial-quote">DSYNZ translated our product vision into infrastructure our enterprise clients adopt. The strategic rigor matched the engineering — rare in this industry.</p>
            <footer class="testimonial-editorial-footer">
              <cite class="not-italic font-semibold text-lg">Sarah Chen</cite>
              <p class="text-sm text-muted">CEO, NovaPay</p>
            </footer>
          </blockquote>
          <div class="testimonial-editorial-aside">
            <blockquote class="testimonial-aside-card reveal">
              <p>"Our AI initiative ROI exceeded projections in Q2. They design for outcomes."</p>
              <footer class="mt-6 text-sm"><cite class="not-italic font-semibold">Marcus Reid</cite> · CTO, Axiom Labs</footer>
            </blockquote>
            <blockquote class="testimonial-aside-card reveal">
              <p>"Premium in every interaction — from discovery to global launch."</p>
              <footer class="mt-6 text-sm"><cite class="not-italic font-semibold">Elena Vasquez</cite> · VP Product, Helix Health</footer>
            </blockquote>
            <div class="testimonial-stat-card reveal">
              <p class="font-display text-5xl text-brand">98%</p>
              <p class="mt-2 font-medium text-[var(--color-text)]">Multi-year retention</p>
              <p class="text-sm text-muted mt-1">Across strategic partnerships since 2018.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderEngagementSection() {
  return `
    <section class="section-editorial bg-elevated" aria-labelledby="engagement-heading" data-section>
      <div class="container-wide">
        <div class="text-center max-w-2xl mx-auto reveal">
          <p class="eyebrow">Engagement</p>
          <h2 id="engagement-heading" class="heading-section mt-5">How elite partnerships begin</h2>
        </div>
        <div id="engagement-grid" class="mt-16 grid-12 gap-6">
          ${ENGAGEMENT_MODELS.map((m, i) => `<div class="col-12 md:col-4">${renderEngagementCardInline(m, i)}</div>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderEngagementCardInline(model, index) {
  return `
    <article class="engagement-card ${model.featured ? 'is-featured' : ''}" data-stagger="${index}">
      ${model.featured ? '<span class="engagement-badge">Recommended</span>' : ''}
      <p class="eyebrow">${model.featured ? 'Most selected' : 'Model'}</p>
      <h3 class="mt-4 text-2xl font-semibold">${model.name}</h3>
      <p class="mt-2 font-display text-xl text-brand">${model.price}</p>
      <p class="mt-4 text-sm text-muted">${model.desc}</p>
      <ul class="mt-8 space-y-3 border-t border-[var(--color-border)] pt-8 text-sm text-muted">
        ${model.features.map((f) => `<li class="flex gap-2"><span class="text-brand">—</span>${f}</li>`).join('')}
      </ul>
      <a href="contact.html" class="btn-secondary btn-magnetic mt-10 w-full" data-magnetic>Discuss model</a>
    </article>
  `;
}

export function renderFAQSection() {
  return `
    <section class="section-editorial" aria-labelledby="faq-heading" data-section>
      <div class="container-narrow">
        <div class="grid-12">
          <div class="col-12 lg:col-4 lg:sticky lg:top-32 reveal">
            <p class="eyebrow">FAQ</p>
            <h2 id="faq-heading" class="heading-section mt-5">Executive questions</h2>
            <a href="contact.html" class="btn-primary btn-magnetic mt-8" data-magnetic>Speak with DSYNZ</a>
          </div>
          <div class="col-12 lg:col-8" id="faq-list" role="list">
            ${FAQ_ITEMS.map(
              (item, i) => `
              <div class="faq-item reveal" data-faq-item>
                <button type="button" class="faq-trigger" aria-expanded="false" aria-controls="faq-${i}" id="faq-btn-${i}">
                  <span>${item.q}</span>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                </button>
                <div class="faq-panel" id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}">
                  <div class="faq-panel-inner"><p>${item.a}</p></div>
                </div>
              </div>`
            ).join('')}
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
            <p class="eyebrow">The next move</p>
            <h2 id="cta-mega-heading" class="cta-mega-headline mt-6 text-balance">Your market will not wait.<br /><span class="text-gradient">Neither should you.</span></h2>
            <p class="text-lead mt-8 max-w-xl text-muted">Partner with DSYNZ to architect technology that scales, modernizes, and defines your category.</p>
          </div>
          <div class="col-12 lg:col-4 flex flex-col gap-4 lg:items-stretch reveal">
            <a href="contact.html" class="btn-primary btn-magnetic text-center" data-magnetic>Begin strategic engagement</a>
            <a href="process.html" class="btn-secondary btn-magnetic text-center" data-magnetic>Review methodology</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderHomePage() {
  return [
    renderHomeHero(),
    renderManifesto(),
    renderTrustStrip(),
    renderServiceExperience(),
    renderProcessStory(),
    renderCaseStudies(),
    renderTechMatrix(),
    renderTestimonialsEditorial(),
    renderEngagementSection(),
    renderFAQSection(),
    renderCTAMega(),
  ].join('\n');
}
