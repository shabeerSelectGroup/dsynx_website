/**
 * DSYNZ — Modular page sections (home + shared blocks)
 */
import {
  BRAND,
  CTAS,
  HERO_HIGHLIGHTS,
  PROBLEM_CARDS,
  HOME_SERVICES,
  GROWTH_LOOP_STEPS,
  AUDIENCE_TAGS,
  WHY_DSYNZ_CARDS,
  IMPACT_QUESTIONS,
  WORK_PREVIEW_CARDS,
} from './brand.js';
import { svgIcon } from './components.js';

export function renderParticles() {
  return Array.from({ length: 18 }, (_, i) => `<span class="particle" style="--i:${i}" aria-hidden="true"></span>`).join('');
}

export function renderScrollIndicator() {
  return `
    <a href="#problem" class="scroll-indicator" aria-label="Scroll to explore">
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

function renderContentCard({ title, text }, index = 0) {
  return `
    <article class="content-card reveal" data-stagger="${index}">
      <h3 class="content-card-title">${title}</h3>
      <p class="content-card-text">${text}</p>
    </article>
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
            <p class="brand-pill" data-hero-line><span>${BRAND.eyebrow}</span></p>
            <h1 id="hero-heading" class="hero-headline" data-hero-line>
              <span class="hero-line">From clarity to growth,</span>
              <span class="hero-line hero-line-accent">we design technology that helps businesses become unbeatable.</span>
            </h1>
            <p class="hero-subline" data-hero-line>${BRAND.descriptor} We help ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.</p>
            <div class="hero-actions" data-hero-line>
              <a href="${CTAS.primary.href}" class="btn-primary btn-magnetic" data-magnetic>${CTAS.primary.label}</a>
              <a href="${CTAS.secondary.href}" class="btn-secondary btn-magnetic" data-magnetic>${CTAS.secondary.label}</a>
            </div>
            <p class="hero-credibility" data-hero-line>Established in ${BRAND.established}. Designing purposeful digital solutions for ${BRAND.experience} years.</p>
          </div>
          <aside class="hero-aside" aria-hidden="true">
            <div class="hero-highlight-panel" data-hero-visual>
              <div class="hero-highlight-stack">
                ${HERO_HIGHLIGHTS.map(
                  (h, i) => `
                  <div class="hero-highlight-card" style="--i:${i}">
                    <p class="hero-highlight-label">${h.label}</p>
                    <p class="hero-highlight-desc">${h.desc}</p>
                  </div>`
                ).join('')}
              </div>
            </div>
          </aside>
        </div>
        <div class="hero-pillars">
          ${HERO_HIGHLIGHTS.map(
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
            <p class="text-editorial">Websites, apps, platforms, and systems often fail because they are built without clarity.</p>
            <p class="text-editorial text-muted">The result is wasted money, confused teams, poor adoption, and digital tools that do not support growth.</p>
            <p class="text-editorial">At DSYNZ, we start before development. We understand the business, define the problem, and design technology with purpose.</p>
          </div>
        </div>
        <div class="content-card-grid mt-20" role="list">
          ${PROBLEM_CARDS.map((card, i) => `<div role="listitem">${renderContentCard(card, i)}</div>`).join('')}
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
            <p class="eyebrow">Our approach</p>
            <h2 id="positioning-heading" class="heading-section mt-5 text-balance">Not just design. Not just development. Purposeful creation.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-8 reveal">
            <p class="text-editorial">DSYNZ may sound like "designs," but for us, design means more than visuals.</p>
            <p class="text-editorial text-muted">It means creating with purpose. It means shaping ideas, products, services, systems, and digital experiences that help businesses become stronger.</p>
            <p class="text-editorial">We combine business clarity, product thinking, design, and technology to build solutions that are practical, scalable, and growth-focused.</p>
            <p class="highlight-line reveal">We do not just build what is requested. We help you understand what should be built, why it matters, and how it can create value.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderWhatWeDo() {
  return `
    <section class="section-editorial section-services" aria-labelledby="services-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 items-end gap-y-8 reveal">
          <div class="col-12 lg:col-7">
            <p class="eyebrow">What we do</p>
            <h2 id="services-heading" class="heading-section mt-5 text-balance">Digital products and solutions built for business growth.</h2>
          </div>
          <p class="col-12 lg:col-5 text-lead text-muted lg:text-right lg:ml-auto max-w-md">We help growing businesses move from unclear ideas and disconnected systems to purposeful technology that supports real progress.</p>
        </div>
        <div class="services-track mt-16" role="list" aria-label="Services">
          ${HOME_SERVICES.map((s, i) => `
            <article class="service-card" data-stagger="${i}" role="listitem">
              <div class="service-card-body">
                <div class="service-icon">${svgIcon(s.icon, 'h-5 w-5')}</div>
                <h3 class="service-card-title">${s.title}</h3>
                <p class="service-card-desc">${s.desc}</p>
              </div>
              <a href="services.html" class="service-card-link">Learn more</a>
            </article>`).join('')}
        </div>
        <div class="mt-12 text-center reveal">
          <a href="services.html" class="btn-ghost">View all services</a>
        </div>
      </div>
    </section>
  `;
}

function renderGrowthLoopPanels() {
  return GROWTH_LOOP_STEPS.map(
    (step, i) => `
    <article class="process-panel ${i === 0 ? 'is-active' : ''}" data-process-panel="${i}" id="growth-panel-${i}" ${i === 0 ? '' : 'hidden'}>
      <p class="font-mono text-sm text-brand">${step.phase}</p>
      <h3 class="heading-section mt-4 text-[var(--color-text)]">${step.title}</h3>
      <p class="mt-6 text-lead text-muted">${step.body}</p>
    </article>`
  ).join('');
}

function renderGrowthLoopNav() {
  return GROWTH_LOOP_STEPS.map(
    (step, i) => `
    <button type="button" class="process-nav-item ${i === 0 ? 'is-active' : ''}" data-process-nav="${i}">
      <span class="process-nav-phase">${step.phase}</span>
      <span class="process-nav-title">${step.title}</span>
    </button>`
  ).join('');
}

export function renderGrowthLoop() {
  return `
    <section class="section-process" aria-labelledby="growth-loop-heading" data-section data-process-story>
      <div class="container-wide">
        <div class="grid-12 reveal">
          <div class="col-12 lg:col-6">
            <p class="eyebrow">How we work</p>
            <h2 id="growth-loop-heading" class="heading-section mt-5">Our process does not end at launch.</h2>
            <p class="mt-6 text-lead text-muted max-w-xl">We follow a strategy-led growth loop designed to clarify, create, launch, improve, and scale purposeful digital solutions.</p>
          </div>
        </div>
        <div class="process-story mt-16 grid-12">
          <div class="col-12 lg:col-4">
            <div class="process-story-pin">
              <nav class="process-nav" aria-label="Growth loop steps">${renderGrowthLoopNav()}</nav>
              <div class="process-progress" aria-hidden="true"><span class="process-progress-bar" data-process-progress></span></div>
            </div>
          </div>
          <div class="col-12 lg:col-7 lg:col-start-6">
            <div class="process-panels" data-process-panels>${renderGrowthLoopPanels()}</div>
          </div>
        </div>
        <p class="growth-loop-closing mt-16 text-center font-mono text-sm uppercase tracking-[0.2em] text-brand reveal">Assess → Blueprint → Create → Deploy → Evaluate → Fix → Grow</p>
      </div>
    </section>
  `;
}

export function renderWhoWeHelp() {
  return `
    <section class="section-editorial" aria-labelledby="audience-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split items-end">
          <div class="col-12 lg:col-5 reveal">
            <p class="eyebrow">Who we help</p>
            <h2 id="audience-heading" class="heading-section mt-5 text-balance">Built for ambitious businesses ready to grow.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-editorial">DSYNZ works with SMBs, startups, family businesses, service companies, and eCommerce brands that want to use technology with more clarity and confidence.</p>
            <p class="text-editorial text-muted">We are industry-flexible, but growth-focused. The right client is not defined only by size or sector. It is defined by ambition.</p>
            <p class="highlight-line">We work best with clients who want more than average digital work.</p>
          </div>
        </div>
        <div class="audience-tags mt-16 reveal" role="list" aria-label="Industries and business types">
          ${AUDIENCE_TAGS.map((tag) => `<span class="tag-pill" role="listitem">${tag}</span>`).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderWhyDsynz() {
  return `
    <section class="section-editorial bg-elevated" aria-labelledby="why-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <p class="eyebrow">Why DSYNZ</p>
          <h2 id="why-heading" class="heading-section mt-5 text-balance">We stand against average digital work.</h2>
          <p class="mt-6 text-lead text-muted">Technology should not be built for the sake of building. Every solution should have a reason, a purpose, and a path to growth.</p>
        </div>
        <div class="content-card-grid content-card-grid-5 mt-16" role="list">
          ${WHY_DSYNZ_CARDS.map((card, i) => `<div role="listitem">${renderContentCard(card, i)}</div>`).join('')}
        </div>
      </div>
    </section>
  `;
}

export function renderImpactFilter() {
  return `
    <section class="section-editorial" aria-labelledby="impact-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 lg:sticky lg:top-32 lg:self-start reveal">
            <p class="eyebrow">Impact filter</p>
            <h2 id="impact-heading" class="heading-section mt-5 text-balance">Before we build, we ask better questions.</h2>
            <p class="mt-6 text-lead text-muted">Every DSYNZ project is judged by its ability to create meaningful business impact.</p>
            <p class="highlight-line mt-10">If the answer is not clear, we go back to clarity.</p>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7">
            <ol class="impact-questions reveal" aria-label="Project impact questions">
              ${IMPACT_QUESTIONS.map(
                (q, i) => `
                <li class="impact-question" data-stagger="${i}">
                  <span class="impact-question-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
                  <span class="impact-question-text">${q}</span>
                </li>`
              ).join('')}
            </ol>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderWorkPreview() {
  return `
    <section class="section-editorial bg-elevated" aria-labelledby="work-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 items-end gap-y-8 reveal">
          <div class="col-12 lg:col-7">
            <p class="eyebrow">Selected work</p>
            <h2 id="work-heading" class="heading-section mt-5 text-balance">Built with clarity. Delivered with purpose.</h2>
            <p class="mt-6 text-lead text-muted max-w-2xl">Our work spans websites, platforms, portals, business systems, product concepts, and digital solutions for growing businesses.</p>
          </div>
          <div class="col-12 lg:col-5 lg:flex lg:justify-end">
            <div class="credibility-card reveal">
              <p class="credibility-card-value">${BRAND.experience} years</p>
              <p class="credibility-card-text">Designing and delivering digital solutions since ${BRAND.established}.</p>
            </div>
          </div>
        </div>
        <div class="content-card-grid mt-16" role="list">
          ${WORK_PREVIEW_CARDS.map(
            (card, i) => `
            <article class="content-card content-card-icon reveal" data-stagger="${i}" role="listitem">
              <div class="content-card-icon-wrap">${svgIcon(card.icon, 'h-6 w-6')}</div>
              <h3 class="content-card-title">${card.title}</h3>
              <p class="content-card-text">${card.text}</p>
            </article>`
          ).join('')}
        </div>
        <div class="mt-12 text-center reveal">
          <a href="${CTAS.work.href}" class="btn-primary btn-magnetic" data-magnetic>${CTAS.work.label}</a>
        </div>
      </div>
    </section>
  `;
}

export function renderAboutPreview() {
  return `
    <section class="section-editorial" aria-labelledby="about-preview-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split items-center">
          <div class="col-12 lg:col-6 reveal">
            <p class="eyebrow">About DSYNZ</p>
            <h2 id="about-preview-heading" class="heading-section mt-5 text-balance">Built on ${BRAND.experience} years of digital solutions experience.</h2>
          </div>
          <div class="col-12 lg:col-5 lg:col-start-8 space-y-6 reveal">
            <p class="text-editorial">Established in ${BRAND.established}, DSYNZ has evolved from a design and development company into a strategy-led technology partner for growing businesses.</p>
            <p class="text-editorial text-muted">Today, we help ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.</p>
            <p class="text-editorial">Our strength comes from combining business thinking, product clarity, creative problem-solving, and reliable technology execution.</p>
            <a href="${CTAS.about.href}" class="btn-secondary btn-magnetic inline-flex" data-magnetic>${CTAS.about.label}</a>
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
            <a href="${CTAS.primary.href}" class="btn-primary btn-magnetic text-center" data-magnetic>${CTAS.primary.label}</a>
            <a href="${CTAS.talk.href}" class="btn-secondary btn-magnetic text-center" data-magnetic>${CTAS.talk.label}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

/** Legacy export for projects page — simplified work categories */
export function renderCaseStudyItems() {
  return WORK_PREVIEW_CARDS.map(
    (card, i) => `
    <article class="case-enterprise group" data-stagger="${i}" role="listitem">
      <a href="projects.html" class="case-enterprise-link">
        <div class="case-enterprise-media">
          <div class="case-enterprise-bg" aria-hidden="true"></div>
          <div class="case-enterprise-overlay">
            <span class="case-enterprise-industry">${card.title}</span>
          </div>
        </div>
        <div class="case-enterprise-body">
          <h3 class="case-enterprise-title">${card.title}</h3>
          <p class="mt-3 text-muted">${card.text}</p>
        </div>
      </a>
    </article>`
  ).join('');
}

/** Process page — full growth loop */
export function renderProcessStory() {
  return renderGrowthLoop();
}

export function renderHomePage() {
  return [
    renderHomeHero(),
    renderProblemSection(),
    renderPositioningSection(),
    renderWhatWeDo(),
    renderGrowthLoop(),
    renderWhoWeHelp(),
    renderWhyDsynz(),
    renderImpactFilter(),
    renderWorkPreview(),
    renderAboutPreview(),
    renderCTAMega(),
  ].join('\n');
}
