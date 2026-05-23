/**
 * DSYNZ Reusable UI Components
 * Injects shared navigation, footer, CTA, newsletter, and contact form blocks.
 */

import { BRAND } from './brand.js';

const SITE = {
  name: BRAND.name,
  tagline: BRAND.tagline,
  descriptor: BRAND.descriptor,
  email: BRAND.email,
  phone: BRAND.phone,
  baseUrl: BRAND.baseUrl,
};

const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'services.html', label: 'Services' },
  { href: 'projects.html', label: 'Projects' },
  { href: 'process.html', label: 'Process' },
  { href: 'about.html', label: 'About' },
  { href: 'blog.html', label: 'Insights' },
  { href: 'careers.html', label: 'Careers' },
  { href: 'contact.html', label: 'Contact' },
];

const SERVICES = [
  { icon: 'code', title: 'Custom Software', desc: 'Tailored systems built for scale, security, and long-term growth.' },
  { icon: 'globe', title: 'Web Applications', desc: 'High-performance web platforms with exceptional UX.' },
  { icon: 'mobile', title: 'Mobile Apps', desc: 'Native and cross-platform experiences users love.' },
  { icon: 'palette', title: 'UI/UX Design', desc: 'Interfaces that convert clarity into competitive advantage.' },
  { icon: 'sparkle', title: 'AI Solutions', desc: 'Intelligent automation and decision systems that deliver ROI.' },
  { icon: 'cloud', title: 'Cloud Solutions', desc: 'Resilient infrastructure designed for modern workloads.' },
  { icon: 'layers', title: 'SaaS Development', desc: 'Subscription products engineered for retention and scale.' },
  { icon: 'zap', title: 'Automation', desc: 'Workflow systems that eliminate friction across operations.' },
  { icon: 'chart', title: 'Growth Technology', desc: 'Data-driven tools that accelerate revenue and efficiency.' },
  { icon: 'refresh', title: 'Digital Transformation', desc: 'End-to-end modernization with measurable outcomes.' },
  { icon: 'brand', title: 'Branding & Identity', desc: 'Digital brands that signal trust and category leadership.' },
  { icon: 'search', title: 'SEO & Marketing', desc: 'Discoverability strategies aligned with business goals.' },
];

const ICONS = {
  code: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  globe: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-8.842 4.582m16.684 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m16.684 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  mobile: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>',
  palette: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-2.485-2.099-4.5-4.688-4.5a4.5 4.5 0 00-4.688 4.5 2.25 2.25 0 01-2.4 2.245 3 3 0 00-5.78-1.128 7.5 7.5 0 0114.058 0z"/>',
  sparkle: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>',
  cloud: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>',
  layers: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>',
  zap: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>',
  refresh: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/>',
  brand: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>',
  search: '<path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
};

function svgIcon(name, className = 'h-6 w-6') {
  const path = ICONS[name] || ICONS.code;
  return `<svg class="${className}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${path}</svg>`;
}

function isActive(href) {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path === href || (path === '' && href === 'index.html');
}

export function renderLogo(link = true) {
  const inner = `
    <span class="font-display text-xl tracking-tight text-[var(--color-text)]" aria-label="DSYNZ">DSYNZ</span>
  `;
  if (!link) return `<div class="flex flex-col gap-0.5">${inner}</div>`;
  return `<a href="index.html" class="group flex flex-col gap-0.5 focus:outline-none" aria-label="DSYNZ Home">${inner}</a>`;
}

export function renderNavbar() {
  const links = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="nav-link text-sm font-medium transition-colors ${isActive(l.href) ? 'text-brand' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}" ${isActive(l.href) ? 'aria-current="page"' : ''}>${l.label}</a>`
  ).join('');

  const mobileLinks = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="block rounded-lg px-4 py-3 text-base font-medium ${isActive(l.href) ? 'bg-brand/10 text-brand' : 'text-[var(--color-text)] hover:bg-brand/5'}" ${isActive(l.href) ? 'aria-current="page"' : ''}>${l.label}</a>`
  ).join('');

  return `
    <a href="#main" class="skip-link">Skip to main content</a>
    <header id="site-header" class="site-header fixed top-0 left-0 right-0 z-[60] transition-all duration-500" role="banner">
      <nav class="nav-glass container-wide flex min-h-[var(--nav-height)] items-center justify-between gap-4 py-3 lg:gap-8 lg:py-0" aria-label="Primary navigation">
        <div class="flex items-center gap-3">
          <span class="nav-mark hidden lg:block" aria-hidden="true"></span>
          ${renderLogo()}
        </div>
        <div class="hidden items-center gap-9 lg:flex">${links}</div>
        <div class="flex items-center gap-3">
          <button type="button" id="theme-toggle" class="btn-ghost !px-3 !py-2" aria-label="Toggle dark mode">
            <svg class="h-5 w-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>
            <svg class="h-5 w-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
          </button>
          <a href="contact.html" class="btn-primary btn-magnetic hidden !py-2.5 !text-xs sm:inline-flex" data-magnetic>Start a project</a>
          <button type="button" id="mobile-menu-btn" class="btn-ghost !p-2 lg:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M3.75 9h16.5m-16.5 6.75h16.5"/></svg>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" class="nav-glass hidden border-t border-[var(--color-border)] lg:hidden" aria-hidden="true">
        <div class="container-wide space-y-1 py-4">${mobileLinks}
          <a href="contact.html" class="btn-primary mt-4 w-full">Start a project</a>
        </div>
      </div>
    </header>
  `;
}

export function renderFooter() {
  const year = new Date().getFullYear();
  const serviceLinks = SERVICES.slice(0, 6)
    .map((s) => `<li><a href="services.html" class="text-sm text-[var(--color-text-muted)] transition-colors hover:text-brand">${s.title}</a></li>`)
    .join('');

  return `
    <footer class="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]" role="contentinfo">
      <div class="container-wide section-padding !pb-12">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-4">
            ${renderLogo(false)}
            <p class="mt-4 max-w-sm text-sm text-muted">${SITE.descriptor}</p>
            <p class="mt-2 font-display text-lg text-brand">${SITE.tagline}</p>
            ${renderNewsletter({ compact: true })}
          </div>
          <div class="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-6 lg:grid-cols-3">
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">Company</h3>
              <ul class="mt-4 space-y-3">
                <li><a href="about.html" class="text-sm text-muted hover:text-brand">About</a></li>
                <li><a href="process.html" class="text-sm text-muted hover:text-brand">Process</a></li>
                <li><a href="projects.html" class="text-sm text-muted hover:text-brand">Projects</a></li>
                <li><a href="careers.html" class="text-sm text-muted hover:text-brand">Careers</a></li>
                <li><a href="blog.html" class="text-sm text-muted hover:text-brand">Insights</a></li>
                <li><a href="contact.html" class="text-sm text-muted hover:text-brand">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">Services</h3>
              <ul class="mt-4 space-y-3">${serviceLinks}</ul>
            </div>
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">Connect</h3>
              <ul class="mt-4 space-y-3">
                <li><a href="mailto:${SITE.email}" class="text-sm text-muted hover:text-brand">${SITE.email}</a></li>
                <li><a href="tel:${SITE.phone.replace(/\s/g, '')}" class="text-sm text-muted hover:text-brand">${SITE.phone}</a></li>
              </ul>
              <div class="mt-6 flex gap-4">
                <a href="#" class="text-muted hover:text-brand" aria-label="LinkedIn"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                <a href="#" class="text-muted hover:text-brand" aria-label="Twitter"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#" class="text-muted hover:text-brand" aria-label="GitHub"><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs text-muted">&copy; ${year} DSYNZ. All rights reserved.</p>
          <div class="flex flex-wrap gap-6 text-xs text-muted">
            <a href="#" class="hover:text-brand">Privacy Policy</a>
            <a href="#" class="hover:text-brand">Terms of Service</a>
            <a href="sitemap.xml" class="hover:text-brand">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function renderCTA({
  title = 'Ready to build something unbeatable?',
  subtitle = 'Tell us where you are today. We will design the technology path to where you need to be.',
  primaryHref = 'contact.html',
  primaryLabel = 'Start a conversation',
  secondaryHref = 'process.html',
  secondaryLabel = 'See our process',
} = {}) {
  return `
    <section class="section-padding" aria-labelledby="cta-heading" data-section>
      <div class="section-glow" aria-hidden="true"></div>
      <div class="container-narrow relative z-10">
        <div class="cta-premium reveal" data-reveal>
          <div class="hero-mesh hero-mesh-animated" aria-hidden="true"></div>
          <div class="section-grid-overlay rounded-[2rem]" aria-hidden="true"></div>
          <div class="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div class="lg:col-span-8">
              <p class="eyebrow">Partner with DSYNZ</p>
              <h2 id="cta-heading" class="heading-section mt-4 text-balance text-[var(--color-text)]">${title}</h2>
              <p class="mt-5 max-w-xl text-lead text-muted">${subtitle}</p>
            </div>
            <div class="flex flex-col gap-4 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <a href="${primaryHref}" class="btn-primary btn-magnetic">${primaryLabel}</a>
              <a href="${secondaryHref}" class="btn-secondary btn-magnetic">${secondaryLabel}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderNewsletter({ compact = false } = {}) {
  const id = compact ? 'footer-newsletter' : 'newsletter-form';
  return `
    <form id="${id}" class="newsletter-form ${compact ? 'mt-6 max-w-sm' : 'mx-auto max-w-md'}" novalidate aria-label="Newsletter signup">
      ${compact ? '' : '<p class="eyebrow mb-2">Stay ahead</p>'}
      ${compact ? '<label for="footer-email" class="sr-only">Email</label>' : '<h3 class="text-lg font-semibold text-[var(--color-text)]">Insights for growth leaders</h3><p class="mt-2 text-sm text-muted">Strategy, technology, and design � delivered monthly.</p>'}
      <div class="mt-4 flex ${compact ? 'gap-2' : 'flex-col gap-3 sm:flex-row'}">
        <input type="email" id="${compact ? 'footer-email' : 'newsletter-email'}" name="email" required autocomplete="email" placeholder="you@company.com" class="input-field flex-1" aria-describedby="${id}-status" />
        <button type="submit" class="btn-primary ${compact ? '!px-4' : ''}">Subscribe</button>
      </div>
      <p id="${id}-status" class="mt-2 text-xs text-muted" role="status" aria-live="polite"></p>
    </form>
  `;
}

export function renderContactForm({ showTitle = true } = {}) {
  return `
    <form id="contact-form" class="space-y-6" novalidate aria-label="Contact form">
      ${showTitle ? '<div><p class="eyebrow">Contact</p><h2 class="heading-section mt-2 text-[var(--color-text)]">Start your next chapter</h2></div>' : ''}
      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label for="first-name" class="label-field">First name</label>
          <input type="text" id="first-name" name="firstName" required autocomplete="given-name" class="input-field" />
        </div>
        <div>
          <label for="last-name" class="label-field">Last name</label>
          <input type="text" id="last-name" name="lastName" required autocomplete="family-name" class="input-field" />
        </div>
      </div>
      <div>
        <label for="email" class="label-field">Work email</label>
        <input type="email" id="email" name="email" required autocomplete="email" class="input-field" />
      </div>
      <div>
        <label for="company" class="label-field">Company</label>
        <input type="text" id="company" name="company" autocomplete="organization" class="input-field" />
      </div>
      <div>
        <label for="service" class="label-field">How can we help?</label>
        <select id="service" name="service" class="input-field">
          <option value="">Select a service</option>
          ${SERVICES.map((s) => `<option value="${s.title}">${s.title}</option>`).join('')}
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label for="message" class="label-field">Project details</label>
        <textarea id="message" name="message" rows="5" required class="input-field resize-y" placeholder="Tell us about your goals, timeline, and challenges."></textarea>
      </div>
      <button type="submit" class="btn-primary w-full sm:w-auto">Send message</button>
      <p id="contact-form-status" class="text-sm text-muted" role="status" aria-live="polite"></p>
    </form>
  `;
}

export function renderServiceCard(service, index = 0) {
  return `
    <article class="service-card" data-stagger="${index}" role="listitem">
      <div class="service-card-body">
        <div class="service-icon">${svgIcon(service.icon, 'h-5 w-5')}</div>
        <h3 class="service-card-title">${service.title}</h3>
        <p class="service-card-desc">${service.desc}</p>
      </div>
      <a href="services.html" class="service-card-link">
        Explore capabilities
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
      </a>
    </article>
  `;
}

const CASE_STUDIES = [
  {
    slug: 'novapay',
    industry: 'Fintech',
    title: 'NovaPay — Unified payments platform',
    desc: 'Enterprise-grade payment infrastructure rebuilt for latency, compliance, and global scale.',
    metric: '62%',
    metricLabel: 'latency reduction',
    stack: ['TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
    before: 'Fragmented legacy rails',
    after: 'Unified real-time core',
    featured: true,
    span: 8,
  },
  {
    slug: 'helix',
    industry: 'Healthcare',
    title: 'Helix Health — Patient experience',
    desc: 'HIPAA-aligned portal serving 200k+ patients with measurable engagement lift.',
    metric: '3.2×',
    metricLabel: 'portal adoption',
    stack: ['React', 'React Native', 'GCP'],
    before: 'Siloed patient data',
    after: 'Connected care journey',
    featured: false,
    span: 4,
  },
  {
    slug: 'axiom',
    industry: 'AI / Enterprise',
    title: 'Axiom AI — Operations copilot',
    desc: 'Custom LLM workflows embedded in support ops with governance and observability.',
    metric: '40%',
    metricLabel: 'ticket automation',
    stack: ['Python', 'OpenAI', 'Kubernetes'],
    before: 'Manual triage queues',
    after: 'Intelligent resolution',
    featured: false,
    span: 4,
  },
];

const ENGAGEMENT_MODELS = [
  {
    name: 'Discovery Sprint',
    price: 'From $18k',
    desc: 'Two-week strategic immersion — opportunity map, technical audit, and prioritized roadmap.',
    features: ['Executive workshops', 'Architecture assessment', 'ROI modeling', 'Delivery blueprint'],
    featured: false,
  },
  {
    name: 'Strategic Partnership',
    price: 'Custom retainer',
    desc: 'Embedded senior team aligned to your product and engineering leadership — built for multi-year outcomes.',
    features: ['Dedicated squad', 'Quarterly strategy reviews', 'Continuous delivery', 'Executive reporting'],
    featured: true,
  },
  {
    name: 'Fixed Delivery',
    price: 'Scoped quote',
    desc: 'Defined scope, milestones, and acceptance criteria — ideal for platform builds and major releases.',
    features: ['Fixed timeline', 'Milestone billing', 'Quality gates', 'Knowledge transfer'],
    featured: false,
  },
];

const FAQ_ITEMS = [
  {
    q: 'How does DSYNZ differ from a typical development agency?',
    a: 'We lead with strategy and measurable business outcomes — not feature lists. Senior architects and designers stay on your account from discovery through scale, with full transparency at every phase.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We partner with growth-stage and enterprise teams in fintech, healthcare, SaaS, logistics, and retail — wherever technology is a competitive moat, not a cost center.',
  },
  {
    q: 'How do engagements typically begin?',
    a: 'Most partnerships start with a Discovery Sprint or executive briefing. We align on goals, constraints, and success metrics before proposing a delivery model that fits your timeline and governance needs.',
  },
  {
    q: 'Do you work with in-house engineering teams?',
    a: 'Yes. We integrate with existing squads — augmenting capability, establishing standards, and transferring knowledge so your team owns the platform long-term.',
  },
  {
    q: 'How do you ensure security and compliance?',
    a: 'Security is embedded in architecture reviews, CI/CD, and delivery practices — including HIPAA, SOC 2-aligned workflows, and enterprise access controls where required.',
  },
];

const CLIENT_LOGOS = [
  'NOVAPAY', 'HELIX', 'AXIOM', 'MERIDIAN', 'VANTIS', 'ORBITAL', 'PRISM', 'NEXUS',
];

export function renderCaseStudyCard(project, index = 0) {
  const col = project.featured ? 'lg:col-span-8' : 'lg:col-span-4';
  const thumbAspect = project.featured ? 'aspect-[21/9]' : 'aspect-[16/11]';
  return `
    <article class="case-card ${col} group" data-stagger="${index}">
      <a href="projects.html" class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-3xl">
        <div class="case-thumb ${thumbAspect}">
          <div class="case-thumb-bg" aria-hidden="true"></div>
          <div class="absolute inset-0 flex items-end justify-between p-6 md:p-8">
            <span class="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">${project.industry}</span>
            <div class="text-right">
              <p class="case-metric">${project.metric}</p>
              <p class="text-[10px] uppercase tracking-wider text-white/70">${project.metricLabel}</p>
            </div>
          </div>
        </div>
        <div class="p-6 md:p-8">
          <h3 class="text-xl font-semibold tracking-tight text-[var(--color-text)] transition-colors group-hover:text-brand md:text-2xl">${project.title}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted">${project.desc}</p>
          <div class="case-before-after mt-6" aria-label="Transformation">
            <span>${project.before}</span>
            <span class="is-after">${project.after}</span>
          </div>
          <div class="mt-6 flex flex-wrap gap-2" role="list" aria-label="Technology stack">
            ${project.stack.map((t) => `<span class="case-stack-tag" role="listitem">${t}</span>`).join('')}
          </div>
          <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            View case study
            <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
          </span>
        </div>
      </a>
    </article>
  `;
}

export function renderEngagementCard(model, index = 0) {
  return `
    <article class="engagement-card ${model.featured ? 'is-featured' : ''}" data-stagger="${index}">
      <div>
        <p class="eyebrow">${model.featured ? 'Most selected' : 'Engagement'}</p>
        <h3 class="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-text)]">${model.name}</h3>
        <p class="mt-2 font-display text-xl text-brand">${model.price}</p>
        <p class="mt-4 text-sm leading-relaxed text-muted">${model.desc}</p>
      </div>
      <ul class="mt-8 space-y-3 border-t border-[var(--color-border)] pt-8">
        ${model.features.map((f) => `<li class="flex items-start gap-3 text-sm text-muted"><svg class="mt-0.5 h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>${f}</li>`).join('')}
      </ul>
      <a href="contact.html" class="btn-secondary btn-magnetic mt-10 w-full">Discuss this model</a>
    </article>
  `;
}

export function renderFAQ() {
  return FAQ_ITEMS.map(
    (item, i) => `
    <div class="faq-item reveal" data-reveal data-faq-item>
      <button type="button" class="faq-trigger" aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
        <span>${item.q}</span>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
      </button>
      <div class="faq-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">
        <div class="faq-panel-inner"><p>${item.a}</p></div>
      </div>
    </div>`
  ).join('');
}

export function renderLogoMarquee() {
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS]
    .map((name) => `<span class="logo-item" aria-hidden="true">${name}</span>`)
    .join('');
  return `
    <div class="logo-marquee-wrap overflow-hidden border-y border-[var(--color-border)] py-10" aria-label="Organizations we partner with">
      <div class="logo-marquee">${items}</div>
    </div>
  `;
}

export function renderTestimonialGrid() {
  return `
    <div class="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
      <blockquote class="testimonial-featured reveal" data-reveal>
        <span class="testimonial-mark" aria-hidden="true">"</span>
        <p class="testimonial-quote mt-4">DSYNZ translated our product vision into a platform our enterprise clients actually adopt. The strategic rigor was as impressive as the engineering.</p>
        <footer class="mt-10 flex items-center gap-4 border-t border-[var(--color-border)] pt-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand/30 to-brand/5 font-display text-sm text-brand" aria-hidden="true">SC</div>
          <div>
            <cite class="not-italic font-semibold text-[var(--color-text)]">Sarah Chen</cite>
            <p class="text-xs text-muted">CEO, NovaPay</p>
          </div>
        </footer>
      </blockquote>
      <blockquote class="card-premium reveal flex flex-col justify-between" data-reveal data-stagger="1">
        <p class="text-[var(--color-text)] leading-relaxed">"They challenge assumptions and design for outcomes. Our AI initiative ROI exceeded projections in Q2."</p>
        <footer class="mt-8 flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-brand/15" aria-hidden="true"></div>
          <div><cite class="not-italic font-semibold text-sm">Marcus Reid</cite><p class="text-xs text-muted">CTO, Axiom Labs</p></div>
        </footer>
      </blockquote>
      <blockquote class="card-premium reveal flex flex-col justify-between" data-reveal data-stagger="2">
        <p class="text-[var(--color-text)] leading-relaxed">"Premium in every interaction � from discovery workshops to production launch."</p>
        <footer class="mt-8 flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-brand/15" aria-hidden="true"></div>
          <div><cite class="not-italic font-semibold text-sm">Elena Vasquez</cite><p class="text-xs text-muted">VP Product, Helix Health</p></div>
        </footer>
      </blockquote>
      <blockquote class="card-glass reveal lg:col-span-2 flex items-center gap-6 md:gap-10" data-reveal data-stagger="3">
        <p class="font-display text-4xl text-brand md:text-5xl" aria-hidden="true">98%</p>
        <div>
          <p class="text-lg font-medium text-[var(--color-text)]">Client retention across multi-year partnerships</p>
          <p class="mt-1 text-sm text-muted">Measured across strategic and delivery engagements since 2018.</p>
        </div>
      </blockquote>
    </div>
  `;
}

export function renderHeroVisual() {
  return `
    <div class="hero-visual perspective-1000" aria-hidden="true" data-hero-visual>
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-visual-inner">
        <div class="hero-grid-fine absolute inset-0"></div>
        <svg class="absolute inset-0 h-full w-full p-8" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="120" class="hero-line" stroke-dasharray="4 8" opacity="0.4"/>
          <circle cx="200" cy="200" r="80" class="hero-line" opacity="0.6"/>
          <path class="hero-line" d="M200 80 L200 320 M80 200 L320 200" opacity="0.25"/>
          <path class="hero-line" d="M130 130 L270 270 M270 130 L130 270" opacity="0.2"/>
          <circle cx="200" cy="120" r="6" fill="rgba(124,58,237,0.8)"/>
          <circle cx="280" cy="200" r="5" fill="rgba(159,103,255,0.7)"/>
          <circle cx="160" cy="260" r="5" fill="rgba(124,58,237,0.5)"/>
          <circle cx="200" cy="200" r="14" fill="rgba(124,58,237,0.25)" stroke="rgba(124,58,237,0.6)" stroke-width="1"/>
        </svg>
        <div class="absolute bottom-6 left-6 right-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/60 p-4 backdrop-blur-md">
          <div class="flex justify-between text-[10px] uppercase tracking-widest text-muted">
            <span>Systems</span><span class="text-brand">Operational</span>
          </div>
          <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
            <div class="h-full w-[78%] rounded-full bg-gradient-to-r from-brand to-brand-light"></div>
          </div>
        </div>
      </div>
      <div class="hero-float-badge hero-float-badge-1">
        <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
        Strategy aligned
      </div>
      <div class="hero-float-badge hero-float-badge-2">
        <span class="font-display text-brand">120+</span> deliveries
      </div>
    </div>
  `;
}

export function renderPageLoader() {
  return `
    <div id="page-loader" class="page-loader" aria-hidden="true">
      <div class="loader-elite">
        <span class="font-display text-4xl tracking-tight text-brand">D</span>
        <div class="loader-elite-bar" aria-hidden="true"><span></span></div>
        <span class="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">DSYNZ</span>
      </div>
    </div>
    <div class="cursor-glow" id="cursor-glow" aria-hidden="true"></div>
    <div class="cursor-dot" id="cursor-dot" aria-hidden="true"></div>
  `;
}

export {
  SITE,
  SERVICES,
  svgIcon,
  NAV_LINKS,
  CASE_STUDIES,
  ENGAGEMENT_MODELS,
  FAQ_ITEMS,
  CLIENT_LOGOS,
};
