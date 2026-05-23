/**
 * DSYNZ — Insights page (blog.html)
 */
import { BRAND } from './brand.js';
import { svgIcon } from './components.js';
import {
  INSIGHT_CATEGORIES,
  INSIGHT_FEATURED,
  INSIGHT_ARTICLES,
  INSIGHT_POV_ITEMS,
} from './insights-content.js';

function renderFeaturedCard(item, index) {
  return `
    <article
      class="insight-featured-card reveal"
      data-stagger="${index}"
      data-insight-featured
      data-insight-topic="${item.topic}"
      role="listitem"
    >
      <p class="insight-card-meta">
        <span class="insight-card-category">${item.category}</span>
        <span class="insight-card-label">${item.label}</span>
      </p>
      <h3 class="insight-card-title">
        <a href="#insight-${item.slug}" class="insight-card-link">${item.title}</a>
      </h3>
      <p class="insight-card-excerpt">${item.excerpt}</p>
      <div class="insight-card-foot">
        <span class="insight-card-time">${item.readTime}</span>
        <a href="#insight-${item.slug}" class="insight-card-cta">Read insight</a>
      </div>
    </article>
  `;
}

function renderArticlePreview(article, index) {
  const body = article.paragraphs.map((p) => `<p>${p}</p>`).join('');
  return `
    <article
      id="insight-${article.slug}"
      class="insight-article-preview reveal"
      data-stagger="${index % 2}"
      data-insight-article
      data-insight-topic="${article.topic}"
      tabindex="-1"
    >
      <header class="insight-article-head">
        <p class="insight-card-category">${article.category}</p>
        <h3 class="insight-article-title">${article.title}</h3>
      </header>
      <div class="insight-article-body text-muted">${body}</div>
      <p class="insight-article-closing">${article.closing}</p>
      <a href="#insights-featured" class="insight-article-back">Back to featured insights</a>
    </article>
  `;
}

export function renderInsightsHero() {
  const topics = INSIGHT_CATEGORIES.slice(0, 4)
    .map((c) => `<span class="insight-hero-topic">${c.title}</span>`)
    .join('');

  return `
    <section class="page-hero page-hero-insights" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 page-hero-grid items-center">
          <div class="col-12 lg:col-7">
            <p class="eyebrow reveal">Insights</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">Ideas for building purposeful technology.</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">Thoughts, frameworks, and practical perspectives for ambitious businesses that want to use technology with clarity, purpose, and growth in mind.</p>
            <div class="page-hero-actions mt-10 flex flex-wrap gap-4 reveal">
              <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
              <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
            </div>
            <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted reveal">${BRAND.credibility}</p>
          </div>
          <aside class="col-12 lg:col-5 hero-visual-col page-hero-visual-col" aria-hidden="true">
            <div class="insight-hero-panel reveal" data-hero-visual>
              <p class="insight-hero-tagline">Think clearly. Build purposefully. Grow with intention.</p>
              <div class="insight-hero-topics">${topics}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

export function renderInsightsPage() {
  const featuredCards = INSIGHT_FEATURED.map(renderFeaturedCard).join('');
  const categoryCards = INSIGHT_CATEGORIES.map(
    (cat, i) => `
    <button type="button" class="insight-category-card reveal" data-stagger="${i % 4}" data-insight-filter="${cat.id}" role="listitem">
      <span class="insight-category-icon" aria-hidden="true">${svgIcon(cat.icon, 'insight-category-icon-svg')}</span>
      <span class="insight-category-title">${cat.title}</span>
      <span class="insight-category-text">${cat.text}</span>
    </button>`
  ).join('');
  const articles = INSIGHT_ARTICLES.map(renderArticlePreview).join('');
  const povList = INSIGHT_POV_ITEMS.map((item) => `<li>${item}</li>`).join('');

  return `
    <section class="section-editorial insights-intro" aria-labelledby="insights-intro-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="insights-intro-heading" class="heading-section text-balance">Better technology starts with better thinking.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 space-y-6 reveal">
            <p class="text-lead text-muted">Most digital problems do not begin with code, design, or tools. They begin with unclear goals, rushed decisions, disconnected systems, and weak planning.</p>
            <p class="text-lead">DSYNZ Insights is where we share practical ideas on business clarity, digital products, websites, apps, automation, AI, and growth-focused technology.</p>
            <p class="text-lead text-muted">These insights are written for founders, business owners, teams, and decision-makers who want to build better before they build bigger.</p>
            <blockquote class="positioning-highlight">
              <p>Think clearly. Build purposefully. Grow with intention.</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section id="insights-featured" class="section-editorial bg-elevated" aria-labelledby="insights-featured-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="insights-featured-heading" class="heading-section text-balance">Featured insights.</h2>
          <p class="mt-6 text-lead text-muted">Short, practical reads on how growing businesses can use technology more effectively.</p>
        </div>
        <p class="insight-filter-hint reveal mt-6 text-sm text-muted" data-insight-filter-hint aria-live="polite">Showing all featured insights.</p>
        <div class="insight-featured-grid mt-10 reveal" role="list">${featuredCards}</div>
      </div>
    </section>

    <section id="insights-topics" class="section-editorial" aria-labelledby="insights-topics-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="insights-topics-heading" class="heading-section text-balance">Explore by topic.</h2>
          <p class="mt-6 text-lead text-muted">Our insights focus on the areas where business, product thinking, design, and technology meet.</p>
        </div>
        <div class="insight-category-grid mt-14 reveal" role="list">
          <button type="button" class="insight-category-card insight-category-card--all is-active" data-insight-filter="all" role="listitem">
            <span class="insight-category-title">All topics</span>
            <span class="insight-category-text">View every insight on this page.</span>
          </button>
          ${categoryCards}
        </div>
      </div>
    </section>

    <section id="insights-articles" class="section-editorial bg-elevated" aria-labelledby="insights-articles-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="insights-articles-heading" class="heading-section text-balance">Latest thinking from DSYNZ.</h2>
          <p class="mt-6 text-lead text-muted">Each preview below can become a full article page as our insights library grows.</p>
        </div>
        <div class="insight-articles-stack mt-14 reveal">${articles}</div>
      </div>
    </section>

    <section id="insights-pov" class="section-editorial" aria-labelledby="insights-pov-heading" data-section>
      <div class="container-wide">
        <div class="grid-12 editorial-split">
          <div class="col-12 lg:col-5 reveal">
            <h2 id="insights-pov-heading" class="heading-section text-balance">Our point of view.</h2>
          </div>
          <div class="col-12 lg:col-6 lg:col-start-7 reveal">
            <p class="text-lead">We believe digital solutions should be built with purpose.</p>
            <p class="mt-6 text-lead text-muted">That means:</p>
            <ul class="insight-pov-list mt-4">${povList}</ul>
            <p class="positioning-highlight mt-10 text-lead">The future belongs to businesses that use technology with clarity, purpose, and discipline.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="insights-start" class="section-editorial bg-elevated" aria-labelledby="insights-start-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl mx-auto text-center reveal">
          <h2 id="insights-start-heading" class="heading-section text-balance">Not sure where to start?</h2>
          <p class="mt-6 text-lead text-muted">If you are planning a website, app, platform, automation system, or digital product, the first step is not always development. Sometimes the first step is clarity.</p>
          <p class="mt-6 text-lead">DSYNZ can help you understand what should be built, why it matters, and how it can create value.</p>
          <div class="mt-10 flex flex-wrap justify-center gap-4">
            <a href="contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
            <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
          </div>
        </div>
      </div>
    </section>

    <section id="insights-newsletter" class="section-editorial section-editorial-sm" aria-labelledby="insights-newsletter-heading" data-section>
      <div class="container-narrow text-center reveal">
        <h2 id="insights-newsletter-heading" class="heading-section text-balance">Get practical digital growth insights.</h2>
        <p class="mt-4 text-lead text-muted">Occasional thoughts on strategy, technology, digital products, AI, automation, and purposeful business growth.</p>
        <form id="insights-newsletter-form" class="newsletter-form insight-newsletter-form mx-auto max-w-md mt-8" novalidate aria-label="Newsletter signup">
          <div class="flex flex-col gap-3 sm:flex-row">
            <label for="insights-newsletter-email" class="sr-only">Email</label>
            <input type="email" id="insights-newsletter-email" name="email" required autocomplete="email" placeholder="Enter your email" class="input-field flex-1" aria-describedby="insights-newsletter-form-status" />
            <button type="submit" class="btn-primary">Subscribe</button>
          </div>
          <p id="insights-newsletter-form-status" class="mt-2 text-xs text-muted" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  `;
}

const TOPIC_MAP = {
  all: null,
  clarity: 'clarity',
  strategy: 'clarity',
  products: 'products',
  websites: 'websites',
  ai: 'ai',
  growth: null,
};

export function initInsightsFilters() {
  const filters = document.querySelectorAll('[data-insight-filter]');
  const featured = document.querySelectorAll('[data-insight-featured]');
  const articles = document.querySelectorAll('[data-insight-article]');
  const hint = document.querySelector('[data-insight-filter-hint]');
  if (!filters.length) return;

  const apply = (filterId) => {
    const topic =
      filterId === 'all' ? null : filterId === 'growth' ? '__none__' : TOPIC_MAP[filterId] ?? filterId;

    const matches = (el) => {
      if (topic === null) return true;
      if (topic === '__none__') return false;
      return el.dataset.insightTopic === topic;
    };

    featured.forEach((card) => {
      card.classList.toggle('is-filtered-out', !matches(card));
    });

    articles.forEach((block) => {
      block.classList.toggle('is-filtered-out', !matches(block));
    });

    if (hint) {
      if (!topic) {
        hint.textContent = 'Showing all featured insights.';
      } else {
        const label =
          document.querySelector(`[data-insight-filter="${filterId}"] .insight-category-title`)
            ?.textContent || filterId;
        const visible = [...featured].filter((c) => !c.classList.contains('is-filtered-out')).length;
        hint.textContent =
          visible > 0
            ? `Showing ${visible} featured insight${visible === 1 ? '' : 's'} for ${label}.`
            : `No featured insights for ${label}. Read the full previews below.`;
      }
    }
  };

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.insightFilter;
      filters.forEach((b) => b.classList.toggle('is-active', b === btn));
      apply(id);
      if (id !== 'all') {
        document.getElementById('insights-featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  apply('all');
}
