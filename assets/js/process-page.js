/**
 * DSYNZ — How We Work page (process.html)
 */
import { BRAND, IMPACT_QUESTIONS } from './brand.js';
import {
  PROCESS_GROWTH_LOOP,
  PROCESS_START_CARDS,
  PROCESS_PRINCIPLES,
  PROCESS_EXPECTATIONS,
  PROCESS_ENGAGE,
  PROCESS_GOOD_FIT,
  PROCESS_NOT_FIT,
  PROCESS_LOOP_RIBBON,
} from './process-content.js';
import { svgIcon } from './components.js';

function renderBulletList(items) {
  return `<ul class="process-detail-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function renderStepIcon(icon) {
  return `<span class="process-step-icon" aria-hidden="true">${svgIcon(icon, 'process-step-icon-svg')}</span>`;
}

function renderGrowthStepCard(step, index) {
  return `
    <article
      id="process-step-${index}"
      class="process-step-card reveal"
      data-stagger="${index % 4}"
      data-process-step="${index}"
      role="listitem"
    >
      <div class="process-step-card-head">
        ${renderStepIcon(step.icon)}
        <div class="process-step-card-titles">
          <h3 class="process-step-card-title">${step.title}</h3>
          <p class="process-step-card-subtitle">${step.subtitle}</p>
        </div>
      </div>
      <div class="process-step-card-details">
        <div class="process-step-detail-block process-step-overview">
          <h4 class="process-step-detail-label">Overview</h4>
          <p class="process-step-card-body">${step.content}</p>
        </div>
        <div class="process-step-detail-block">
          <h4 class="process-step-detail-label">What happens here</h4>
          ${renderBulletList(step.activities)}
        </div>
        <div class="process-step-detail-block process-step-outcome">
          <h4 class="process-step-detail-label">Outcome</h4>
          <p>${step.outcome}</p>
        </div>
      </div>
    </article>
  `;
}

export function renderProcessHero() {
  return `
    <section class="page-hero page-hero-process" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 page-hero-grid items-center">
          <div class="col-12 lg:col-7">
            <p class="eyebrow reveal">How We Work</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">From clarity to growth, we build with purpose.</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">Every successful digital solution starts before design and development. At DSYNZ, we first understand the business, define the right direction, and then create technology that is practical, scalable, and built for growth.</p>
            <div class="page-hero-actions mt-10 flex flex-wrap gap-4 reveal">
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
              <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
            </div>
            <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted reveal">${BRAND.credibility}</p>
          </div>
          <aside class="col-12 lg:col-5 hero-visual-col page-hero-visual-col" aria-hidden="true">
            <div class="hero-globe-wrap process-word-cloud-wrap" data-process-word-cloud-wrap data-hero-visual>
              <div class="hero-globe process-word-cloud" data-process-word-cloud></div>
              <div class="hero-globe-glow" aria-hidden="true"></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

export function renderProcessPage() {
  const stepCards = PROCESS_GROWTH_LOOP.map(renderGrowthStepCard).join('');
  const startCards = PROCESS_START_CARDS.map(
    (card, i) => `
    <article class="process-mini-card reveal" data-stagger="${i}" role="listitem">
      <h3 class="process-mini-card-title">${card.title}</h3>
      <p class="process-mini-card-text">${card.text}</p>
    </article>`
  ).join('');
  const principles = PROCESS_PRINCIPLES.map(
    (item, i) => `
    <article class="process-principle-card reveal" data-stagger="${i % 4}" role="listitem">
      <h3 class="process-principle-title">${item.title}</h3>
      <p class="process-principle-text">${item.text}</p>
    </article>`
  ).join('');
  const impactQuestions = IMPACT_QUESTIONS.map(
    (q, i) => `
    <li class="impact-question reveal" data-stagger="${i}">
      <span class="impact-question-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="impact-question-text">${q}</span>
    </li>`
  ).join('');
  const expectations = PROCESS_EXPECTATIONS.map(
    (card, i) => `
    <article class="process-expect-card reveal" data-stagger="${i % 3}" role="listitem">
      <h3 class="process-expect-title">${card.title}</h3>
      <p class="process-expect-text">${card.text}</p>
    </article>`
  ).join('');
  const engageCards = PROCESS_ENGAGE.map(
    (model, i) => `
    <article class="process-engage-card reveal" data-stagger="${i}" role="listitem">
      <h3 class="process-engage-title">${model.title}</h3>
      <p class="process-engage-text">${model.text}</p>
      <p class="process-engage-best"><span class="process-engage-best-label">Best for:</span> ${model.bestFor}</p>
    </article>`
  ).join('');
  return `
    <section class="section-editorial process-intro" aria-labelledby="process-intro-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="process-intro-heading" class="heading-section text-balance">We do not build first. We understand first.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">Many digital projects fail because they begin with execution instead of clarity.</p>
            <p class="text-lead">A website, app, platform, or system is only valuable when it solves the right problem and supports the right business goal.</p>
            <p class="text-lead text-muted">That is why our work starts with understanding what the client does, where they are now, what they want to become, and what is stopping them from getting there.</p>
            <p class="text-lead text-muted">Only then do we design, build, launch, improve, and grow.</p>
            <blockquote class="positioning-highlight">
              <p>Business clarity before technology. Strategy before execution. Growth before decoration.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="growth-loop" class="section-editorial bg-elevated process-growth-loop" aria-labelledby="growth-loop-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <p class="eyebrow">The DSYNZ Growth Loop</p>
          <h2 id="growth-loop-heading" class="heading-section mt-5 text-balance">A strategy-led process for creating purposeful technology that keeps improving after launch.</h2>
          <p class="mt-6 text-lead text-muted">Our process is not a straight line that ends when a project goes live. It is a growth loop. We assess, blueprint, create, deploy, evaluate, fix, and grow.</p>
          <p class="process-loop-flow reveal">${PROCESS_LOOP_RIBBON}</p>
        </div>
        <div class="process-loop-ribbon process-loop-ribbon--inline reveal" aria-hidden="true">
          ${PROCESS_GROWTH_LOOP.map(
            (step, i) =>
              `<button type="button" class="process-loop-ribbon-item${i === 0 ? ' is-active' : ''}" data-process-jump="${i}">${step.title}</button>`
          ).join('')}
        </div>
        <div class="process-step-cards reveal" role="list">${stepCards}</div>
      </div>
    </section>

    <section id="project-start" class="section-editorial" aria-labelledby="project-start-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="project-start-heading" class="heading-section text-balance">Every project starts with clarity.</h2>
          <p class="mt-6 text-lead text-muted">The starting point depends on the client, the requirement, and the complexity of the work. Some projects need a simple discovery process. Others need deeper strategy, analysis, and planning before development begins.</p>
          <p class="mt-6 text-lead">The goal is always the same: to understand what will create the best impact before we decide what to build.</p>
        </div>
        <div class="process-start-grid mt-14 reveal" role="list">${startCards}</div>
      </div>
    </section>

    <section id="principles" class="section-editorial bg-elevated" aria-labelledby="principles-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="principles-heading" class="heading-section text-balance">The principles behind our work.</h2>
          <p class="mt-6 text-lead text-muted">The DSYNZ approach is guided by practical principles that keep projects clear, useful, and growth-focused.</p>
        </div>
        <div class="process-principles-grid mt-14 reveal" role="list">${principles}</div>
      </div>
    </section>

    <section id="process-impact" class="section-editorial" aria-labelledby="process-impact-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="process-impact-heading" class="heading-section text-balance">Before we build, we ask better questions.</h2>
            <p class="mt-6 text-lead text-muted">Every DSYNZ project is judged by its ability to create meaningful business impact.</p>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 reveal">
            <ol class="impact-questions" role="list">${impactQuestions}</ol>
            <p class="positioning-highlight impact-filter-closing mt-14 text-lead">If the answer is not clear, we go back to clarity.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="expectations" class="section-editorial bg-elevated" aria-labelledby="expectations-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="expectations-heading" class="heading-section text-balance">What it feels like to work with DSYNZ.</h2>
          <p class="mt-6 text-lead text-muted">Clients should not feel lost inside a confusing technical process. Our work is structured, collaborative, and focused on progress.</p>
        </div>
        <div class="process-expect-grid mt-14 reveal" role="list">${expectations}</div>
      </div>
    </section>

    <section id="process-engage" class="section-editorial" aria-labelledby="process-engage-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="process-engage-heading" class="heading-section text-balance">Different projects need different levels of involvement.</h2>
          <p class="mt-6 text-lead text-muted">Some clients come to us with a clear requirement. Others come with an idea, a challenge, or a business goal that needs to be shaped first.</p>
          <p class="mt-6 text-lead">DSYNZ can support both.</p>
        </div>
        <div class="process-engage-grid mt-14 reveal" role="list">${engageCards}</div>
      </div>
    </section>

    <section id="process-fit" class="section-editorial bg-elevated" aria-labelledby="process-fit-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="process-fit-heading" class="heading-section text-balance">We work best when the goal is meaningful.</h2>
          <p class="mt-6 text-lead text-muted">DSYNZ is not built for every kind of project. We are best suited for clients who want thoughtful, purposeful, and growth-focused digital work.</p>
        </div>
        <div class="services-fit-grid mt-14 reveal">
          <div class="services-fit-col">
            <h3 class="services-fit-label">Good fit</h3>
            <ul class="services-fit-list services-fit-list--yes">${PROCESS_GOOD_FIT.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="services-fit-col">
            <h3 class="services-fit-label">Not the right fit</h3>
            <ul class="services-fit-list services-fit-list--no">${PROCESS_NOT_FIT.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    </section>

    <section id="process-services" class="section-editorial" aria-labelledby="process-services-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="process-services-heading" class="heading-section text-balance">One process. Many types of solutions.</h2>
          <p class="mt-6 text-lead text-muted">The DSYNZ Growth Loop applies across everything we create.</p>
          <p class="mt-6 text-lead">Whether we are working on a business website, custom web application, mobile app, SaaS platform, business portal, automation system, or product concept, the same principle applies: understand first, build with purpose, improve for growth.</p>
        </div>
        <a href="services.html" class="btn btn-primary btn-magnetic mt-10 inline-flex reveal" data-magnetic>Explore What We Do</a>
      </div>
    </section>
  `;
}

export function initProcessLoopNav() {
  const jumps = document.querySelectorAll('[data-process-jump]');
  const steps = document.querySelectorAll('[data-process-step]');
  if (!jumps.length || !steps.length) return;

  const setActive = (index) => {
    jumps.forEach((btn) => {
      btn.classList.toggle('is-active', parseInt(btn.dataset.processJump, 10) === index);
    });
    steps.forEach((step) => {
      step.classList.toggle('is-highlighted', parseInt(step.dataset.processStep, 10) === index);
    });
  };

  jumps.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.processJump, 10);
      const target = document.getElementById(`process-step-${index}`);
      if (!target) return;
      setActive(index);
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  if (typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActive(parseInt(visible.target.dataset.processStep, 10));
      }
    },
    { rootMargin: '-20% 0px -35% 0px', threshold: [0.2, 0.45, 0.7] }
  );

  steps.forEach((step) => observer.observe(step));
}
