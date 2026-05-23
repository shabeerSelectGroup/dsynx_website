/**
 * DSYNZ — About page (about.html)
 */
import { BRAND } from './brand.js';
import {
  ABOUT_DIFFERENCE_CARDS,
  ABOUT_VALUES,
  ABOUT_CULTURE_CARDS,
  ABOUT_STAND_AGAINST,
  ABOUT_CLIENT_TYPES,
  ABOUT_TIMELINE,
  ABOUT_GROWTH_LOOP,
} from './about-content.js';

function renderSimpleCards(items, cardClass, titleClass, textClass) {
  return items
    .map(
      (item, i) => `
    <article class="${cardClass} reveal" data-stagger="${i % 4}" role="listitem">
      <h3 class="${titleClass}">${item.title}</h3>
      <p class="${textClass}">${item.text}</p>
    </article>`
    )
    .join('');
}

export function renderAboutHero() {
  const timeline = ABOUT_TIMELINE.map(
    (step) => `
    <li class="about-timeline-step">
      <span class="about-timeline-year">${step.year}</span>
      <span class="about-timeline-label">${step.label}</span>
      <span class="about-timeline-detail">${step.detail}</span>
    </li>`
  ).join('');

  return `
    <section class="page-hero page-hero-about" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 page-hero-grid items-center">
          <div class="col-12 lg:col-7">
            <p class="eyebrow reveal">About DSYNZ</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">We design purposeful technology for businesses that want to grow stronger.</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">DSYNZ is a strategy-led technology partner for growing businesses. We help ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.</p>
            <div class="page-hero-actions mt-10 flex flex-wrap gap-4 reveal">
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
              <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
            </div>
            <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted reveal">${BRAND.credibility}</p>
          </div>
          <aside class="col-12 lg:col-5 hero-visual-col page-hero-visual-col" aria-hidden="true">
            <div class="about-hero-panel reveal" data-hero-visual>
              <p class="about-hero-highlight">We design unbeatable businesses.</p>
              <ol class="about-hero-timeline" aria-label="DSYNZ evolution">${timeline}</ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

export function renderAboutPage() {
  const differenceCards = renderSimpleCards(
    ABOUT_DIFFERENCE_CARDS,
    'about-diff-card',
    'about-diff-title',
    'about-diff-text'
  );
  const valueCards = ABOUT_VALUES.map(
    (value, i) => `
    <article class="about-value-card reveal" data-stagger="${i % 4}" role="listitem">
      <span class="about-value-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="about-value-title">${value.title}</h3>
      <p class="about-value-text">${value.text}</p>
    </article>`
  ).join('');
  const cultureCards = renderSimpleCards(
    ABOUT_CULTURE_CARDS,
    'about-culture-card',
    'about-culture-title',
    'about-culture-text'
  );
  const standCards = renderSimpleCards(
    ABOUT_STAND_AGAINST,
    'about-stand-card',
    'about-stand-title',
    'about-stand-text'
  );
  const clientList = ABOUT_CLIENT_TYPES.map((item) => `<li>${item}</li>`).join('');

  return `
    <section class="section-editorial about-who" aria-labelledby="about-who-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="about-who-heading" class="heading-section text-balance">Not just a design company. Not just a development company.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">DSYNZ may sound like “designs,” but for us, design means more than visuals.</p>
            <p class="text-lead">It means creating with purpose.</p>
            <p class="text-lead text-muted">It means shaping ideas, products, services, systems, and digital experiences that help businesses become stronger, clearer, and more competitive.</p>
            <p class="text-lead text-muted">Established in 2011, DSYNZ has evolved from a design and development company into a strategy-led technology partner for growing businesses.</p>
            <p class="text-lead">Today, we combine business understanding, product thinking, design, and technology to help clients build solutions that create long-term value.</p>
            <blockquote class="positioning-highlight">
              <p>We do not just build what is requested. We help clients understand what should be built, why it matters, and how it can create value.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="about-why" class="section-editorial bg-elevated" aria-labelledby="about-why-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="about-why-heading" class="heading-section text-balance">Why we exist.</h2>
          <p class="mt-6 text-lead text-muted">Many businesses have potential, but their technology does not match that potential.</p>
          <p class="mt-6 text-lead text-muted">They may have ideas, but no clear roadmap.</p>
          <p class="mt-6 text-lead text-muted">They may have websites, apps, or systems, but those tools may not support real growth.</p>
          <p class="mt-6 text-lead text-muted">They may be working with disconnected processes, unclear digital direction, or technology that creates more confusion than progress.</p>
          <p class="mt-6 text-lead">DSYNZ exists to help businesses move from “just getting by” to becoming sharper, stronger, future-ready, and difficult to beat in their market.</p>
          <blockquote class="positioning-highlight mt-10">
            <p>Businesses succeed when they use technology to plan, design, and build products, services, and systems that solve meaningful problems.</p>
          </blockquote>
        </div>
      </div>
    </section>

    <section id="about-mission" class="section-editorial" aria-labelledby="about-mission-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 gap-y-12 lg:gap-x-12">
          <div class="col-12 lg:col-6 reveal">
            <h2 id="about-mission-heading" class="heading-section text-balance">Our mission.</h2>
            <p class="about-statement mt-8 text-lead">Our mission is to help ambitious people and businesses grow by clarifying their ideas, designing purposeful solutions, and building technology that creates real value.</p>
          </div>
          <div class="col-12 lg:col-6 reveal">
            <p class="text-lead text-muted">We believe technology should not be built for the sake of building. It should support business clarity, better operations, stronger customer experience, and long-term growth.</p>
            <p class="mt-6 text-lead">Every solution should have a reason, a purpose, and a path to value.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about-vision" class="section-editorial bg-elevated" aria-labelledby="about-vision-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 gap-y-12 lg:gap-x-12">
          <div class="col-12 lg:col-6 reveal">
            <h2 id="about-vision-heading" class="heading-section text-balance">Our vision.</h2>
            <p class="about-statement mt-8 text-lead">To become an internationally respected and highly profitable digital product and solutions company known for designing purposeful technology that helps ambitious businesses grow, compete, and lead.</p>
          </div>
          <div class="col-12 lg:col-6 reveal">
            <p class="text-lead text-muted">We are building DSYNZ as a long-term brand with strong systems, reliable delivery, meaningful products, and a team that can create value beyond founder dependency.</p>
            <p class="mt-6 text-lead">Our goal is not to be another agency.</p>
            <p class="mt-6 text-lead text-muted">Our goal is to become a respected technology and growth partner for businesses that want to become unbeatable at what they do.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about-difference" class="section-editorial" aria-labelledby="about-difference-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="about-difference-heading" class="heading-section text-balance">Our difference is how we think before we build.</h2>
          <p class="mt-6 text-lead text-muted">Many companies can build a website, app, or system. The real difference is knowing what should be built and why.</p>
        </div>
        <div class="about-diff-grid mt-14 reveal" role="list">${differenceCards}</div>
      </div>
    </section>

    <section id="about-founder" class="section-editorial bg-elevated" aria-labelledby="about-founder-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="about-founder-heading" class="heading-section text-balance">Built on cross-industry business and product thinking.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">DSYNZ is shaped by founder-led thinking and more than two decades of experience across business, product development, marketing, digital systems, travel technology, consulting, and technology-led problem solving.</p>
            <p class="text-lead">This experience helps us look beyond surface-level requirements.</p>
            <p class="text-lead text-muted">We do not see a website as just a website.</p>
            <p class="text-lead text-muted">We do not see an app as just an app.</p>
            <p class="text-lead">We look at the business behind it, the users who will interact with it, and the value it should create.</p>
            <blockquote class="positioning-highlight">
              <p>The goal behind DSYNZ is simple: build a strong, respected, and highly profitable technology brand that helps clients use digital solutions with clarity, purpose, and growth in mind.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="about-values" class="section-editorial" aria-labelledby="about-values-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="about-values-heading" class="heading-section text-balance">The values that guide our work.</h2>
          <p class="mt-6 text-lead text-muted">Our values shape how we think, work, communicate, and build.</p>
        </div>
        <div class="about-values-grid mt-14 reveal" role="list">${valueCards}</div>
      </div>
    </section>

    <section id="about-culture" class="section-editorial bg-elevated" aria-labelledby="about-culture-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="about-culture-heading" class="heading-section text-balance">Small, skilled, and built for high-performance work.</h2>
          <p class="mt-6 text-lead text-muted">DSYNZ is being built as a focused team of curious problem-solvers, honest communicators, business-aware builders, and quality-focused creators.</p>
          <p class="mt-6 text-lead">We value people who understand that good technology is not only about code or visuals.</p>
          <p class="mt-6 text-lead text-muted">It is about solving the right problem in the right way.</p>
        </div>
        <div class="about-culture-grid mt-14 reveal" role="list">${cultureCards}</div>
      </div>
    </section>

    <section id="about-growth-loop" class="section-editorial" aria-labelledby="about-growth-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-wide relative z-10">
        <div class="max-w-3xl reveal">
          <h2 id="about-growth-heading" class="heading-section text-balance">Our way of working is built around growth.</h2>
          <p class="about-growth-flow mt-6 font-mono text-sm uppercase tracking-[0.16em] text-brand">${ABOUT_GROWTH_LOOP}</p>
          <p class="mt-6 text-lead text-muted">The DSYNZ Growth Loop reflects how we approach purposeful technology.</p>
          <p class="mt-6 text-lead">We assess the business, blueprint the right solution, create with purpose, deploy carefully, evaluate real-world performance, fix what needs improvement, and grow the solution over time.</p>
          <a href="process.html" class="btn-secondary btn-magnetic mt-10 inline-flex" data-magnetic>See How We Work</a>
        </div>
      </div>
    </section>

    <section id="about-stand" class="section-editorial bg-elevated" aria-labelledby="about-stand-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="about-stand-heading" class="heading-section text-balance">We stand against average digital work.</h2>
          <p class="mt-6 text-lead text-muted">We do not believe in technology that looks impressive but fails to solve real problems.</p>
        </div>
        <div class="about-stand-grid mt-14 reveal" role="list">${standCards}</div>
      </div>
    </section>

    <section id="about-clients" class="section-editorial" aria-labelledby="about-clients-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="about-clients-heading" class="heading-section text-balance">Built for ambitious businesses ready to grow.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 reveal">
            <p class="text-lead text-muted">DSYNZ works best with people and businesses who want more than average digital execution.</p>
            <p class="mt-6 text-lead font-semibold text-[var(--color-text)]">We work with:</p>
            <ul class="about-client-list mt-4">${clientList}</ul>
            <p class="mt-8 text-lead text-muted">We are industry-flexible, but growth-focused.</p>
            <p class="mt-6 text-lead">The right client is not defined only by size or sector. It is defined by ambition.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
