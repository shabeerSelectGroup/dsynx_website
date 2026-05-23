/**
 * DSYNZ — What We Do page (services.html)
 */
import {
  BRAND,
  IMPACT_QUESTIONS,
  SERVICES_CORE,
  SERVICES_SECONDARY,
  SERVICES_BUILD_ITEMS,
  SERVICES_ENGAGEMENT,
  SERVICES_GOOD_FIT,
  SERVICES_NOT_FIT,
  SERVICES_GROWTH_PREVIEW,
} from './brand.js';
import { svgIcon } from './components.js';

function renderDetailList(items) {
  return `<ul class="service-detail-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

export function renderServicesHero() {
  return `
    <section class="page-hero page-hero-services" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 page-hero-grid items-center">
          <div class="col-12 lg:col-7">
            <p class="eyebrow reveal">What We Do</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">Strategy-led digital products, platforms, and systems.</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">DSYNZ helps growing businesses turn ideas, challenges, and opportunities into purposeful technology. We combine business clarity, product thinking, design, and development to create solutions that support real growth.</p>
            <div class="page-hero-actions mt-10 flex flex-wrap gap-4 reveal">
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
              <a href="process.html" class="btn-secondary btn-magnetic" data-magnetic>See How We Work</a>
            </div>
            <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted reveal">${BRAND.credibility}</p>
          </div>
          <aside class="col-12 lg:col-5 hero-visual-col page-hero-visual-col" aria-hidden="true">
            <div class="hero-globe-wrap services-hypercube-wrap" data-services-hypercube-wrap data-hero-visual>
              <div class="hero-globe services-hypercube" data-services-hypercube></div>
              <div class="hero-globe-glow" aria-hidden="true"></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function renderCoreServiceCard(service, index) {
  return `
    <article class="core-service-card reveal" data-stagger="${index}" role="listitem">
      <div class="core-service-card-head">
        <span class="core-service-icon" aria-hidden="true">${svgIcon(service.icon, 'core-service-icon-svg')}</span>
        <h3 class="core-service-title">${service.title}</h3>
      </div>
      <p class="core-service-lead">${service.text}</p>
      <div class="core-service-details">
        <div class="core-service-detail-block">
          <h4 class="core-service-detail-label">Good for</h4>
          ${renderDetailList(service.goodFor)}
        </div>
        <div class="core-service-detail-block">
          <h4 class="core-service-detail-label">Deliverables / outcomes</h4>
          ${renderDetailList(service.outcomes)}
        </div>
      </div>
    </article>
  `;
}

export function renderServicesPage() {
  const coreCards = SERVICES_CORE.map(renderCoreServiceCard).join('');
  const secondaryCards = SERVICES_SECONDARY.map(
    (service, i) => `
    <article class="secondary-service-card reveal" data-stagger="${i}" role="listitem">
      <h3 class="secondary-service-title">${service.title}</h3>
      <p class="secondary-service-text">${service.text}</p>
    </article>`
  ).join('');
  const buildCards = SERVICES_BUILD_ITEMS.map(
    (item, i) => `
    <article class="build-item-card reveal" data-stagger="${i % 6}" role="listitem">
      <h3 class="build-item-title">${item.title}</h3>
      <p class="build-item-text">${item.text}</p>
    </article>`
  ).join('');
  const impactQuestions = IMPACT_QUESTIONS.map(
    (q, i) => `
    <li class="impact-question reveal" data-stagger="${i}">
      <span class="impact-question-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="impact-question-text">${q}</span>
    </li>`
  ).join('');
  const engagementCards = SERVICES_ENGAGEMENT.map(
    (model, i) => `
    <article class="services-engagement-card reveal" data-stagger="${i}" role="listitem">
      <h3 class="services-engagement-title">${model.title}</h3>
      <p class="services-engagement-text">${model.text}</p>
      <p class="services-engagement-best"><span class="services-engagement-best-label">Best for:</span> ${model.bestFor}</p>
    </article>`
  ).join('');
  const growthSteps = SERVICES_GROWTH_PREVIEW.map(
    (step, i) => `
    <li class="services-growth-step reveal" data-stagger="${i}">
      <span class="services-growth-step-num">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <h3 class="services-growth-step-title">${step.title}</h3>
        <p class="services-growth-step-text">${step.text}</p>
      </div>
    </li>`
  ).join('');

  return `
    <section class="section-editorial services-intro" aria-labelledby="services-intro-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="services-intro-heading" class="heading-section text-balance">We do not start with technology. We start with the business.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">A website, app, platform, or system is only useful when it is built around the right problem.</p>
            <p class="text-lead">That is why our work begins with clarity. We understand what the business does, where it wants to go, what is slowing it down, and what kind of solution can create the best impact.</p>
            <p class="text-lead text-muted">Then we design and build technology with purpose.</p>
            <blockquote class="positioning-highlight">
              <p>We help you understand what should be built, why it matters, and how it can create value.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="core-services" class="section-editorial bg-elevated" aria-labelledby="core-services-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="core-services-heading" class="heading-section text-balance">Core services built around clarity, creation, and growth.</h2>
          <p class="mt-6 text-lead text-muted">Our core services help businesses move from unclear ideas and disconnected systems to practical, scalable digital solutions.</p>
        </div>
        <div class="core-services-grid mt-16 reveal" role="list">${coreCards}</div>
      </div>
    </section>

    <section id="secondary-services" class="section-editorial" aria-labelledby="secondary-services-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="secondary-services-heading" class="heading-section text-balance">Supporting services that strengthen the solution.</h2>
          <p class="mt-6 text-lead text-muted">Some projects need more than one service. Depending on the requirement, DSYNZ can support the wider digital ecosystem around the core solution.</p>
        </div>
        <div class="secondary-services-grid mt-14 reveal" role="list">${secondaryCards}</div>
      </div>
    </section>

    <section id="what-we-build" class="section-editorial bg-elevated" aria-labelledby="what-we-build-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="what-we-build-heading" class="heading-section text-balance">What we can help you build.</h2>
          <p class="mt-6 text-lead text-muted">Our work can take different forms depending on the business problem, growth goal, and stage of the client.</p>
        </div>
        <div class="build-items-grid mt-14 reveal" role="list">${buildCards}</div>
      </div>
    </section>

    <section id="services-impact" class="section-editorial" aria-labelledby="services-impact-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="services-impact-heading" class="heading-section text-balance">Before we build, we ask better questions.</h2>
            <p class="mt-6 text-lead text-muted">Good technology starts with better questions. Every DSYNZ project is shaped by a simple impact filter.</p>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 reveal">
            <ol class="impact-questions" role="list">${impactQuestions}</ol>
            <p class="positioning-highlight impact-filter-closing mt-14 text-lead">If the answer is not clear, we go back to clarity.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="engagement-models" class="section-editorial bg-elevated" aria-labelledby="engagement-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="engagement-heading" class="heading-section text-balance">Ways to work with DSYNZ.</h2>
          <p class="mt-6 text-lead text-muted">Different businesses need different levels of support. We offer flexible engagement models based on the clarity, complexity, and ambition of the project.</p>
        </div>
        <div id="services-engagement-grid" class="services-engagement-grid mt-16 reveal" role="list">${engagementCards}</div>
      </div>
    </section>

    <section id="services-audience" class="section-editorial" aria-labelledby="services-audience-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="services-audience-heading" class="heading-section text-balance">Built for businesses that want more than average digital work.</h2>
          <p class="mt-6 text-lead text-muted">DSYNZ works best with ambitious businesses, founders, and teams who want technology to support real progress.</p>
        </div>
        <div class="services-fit-grid mt-14 reveal">
          <div class="services-fit-col">
            <h3 class="services-fit-label">We are a good fit for</h3>
            <ul class="services-fit-list services-fit-list--yes">${SERVICES_GOOD_FIT.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="services-fit-col">
            <h3 class="services-fit-label">We may not be the right fit for</h3>
            <ul class="services-fit-list services-fit-list--no">${SERVICES_NOT_FIT.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    </section>

    <section id="services-growth-loop" class="section-editorial bg-elevated" aria-labelledby="services-growth-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split items-start">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="services-growth-heading" class="heading-section text-balance">Our services are connected by one growth-focused process.</h2>
            <p class="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-brand">Assess → Blueprint → Create → Deploy → Evaluate → Fix → Grow</p>
            <p class="mt-6 text-lead text-muted">Whether we are building a website, platform, app, system, or product concept, our process is designed to move from clarity to creation and from launch to long-term growth.</p>
            <a href="process.html" class="btn-secondary btn-magnetic mt-10 inline-flex" data-magnetic>See How We Work</a>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 reveal">
            <ol class="services-growth-steps" role="list">${growthSteps}</ol>
          </div>
        </div>
      </div>
    </section>
  `;
}
