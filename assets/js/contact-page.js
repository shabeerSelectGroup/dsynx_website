/**
 * DSYNZ — Contact page (contact.html)
 */
import { BRAND } from './brand.js';
import {
  CONTACT_DETAILS,
  CONTACT_LOOKING_FOR,
  CONTACT_DESCRIBES,
  CONTACT_STAGES,
  CONTACT_BUDGETS,
  CONTACT_TIMELINES,
  CONTACT_NEXT_STEPS,
  CONTACT_REASONS,
  CONTACT_GOOD_FIT,
  CONTACT_NOT_FIT,
  CONTACT_FAQ,
} from './contact-content.js';

function renderSelectOptions(options, placeholder) {
  return `<option value="">${placeholder}</option>${options.map((o) => `<option value="${o}">${o}</option>`).join('')}`;
}

export function renderContactForm() {
  return `
    <form id="contact-form" class="contact-form space-y-5" novalidate aria-label="Contact enquiry form">
      <div class="contact-form-grid">
        <div class="contact-field">
          <label for="contact-full-name" class="label-field">Full Name <span class="text-brand" aria-hidden="true">*</span></label>
          <input type="text" id="contact-full-name" name="fullName" required autocomplete="name" class="input-field" />
        </div>
        <div class="contact-field">
          <label for="contact-company" class="label-field">Company / Organization</label>
          <input type="text" id="contact-company" name="company" autocomplete="organization" class="input-field" />
        </div>
        <div class="contact-field">
          <label for="contact-email" class="label-field">Email Address <span class="text-brand" aria-hidden="true">*</span></label>
          <input type="email" id="contact-email" name="email" required autocomplete="email" class="input-field" />
        </div>
        <div class="contact-field">
          <label for="contact-phone" class="label-field">Phone / WhatsApp</label>
          <input type="text" id="contact-phone" name="phone" autocomplete="tel" class="input-field" inputmode="tel" />
        </div>
      </div>
      <div class="contact-field">
        <label for="contact-looking-for" class="label-field">What are you looking for? <span class="text-brand" aria-hidden="true">*</span></label>
        <select id="contact-looking-for" name="lookingFor" required class="input-field">
          ${renderSelectOptions(CONTACT_LOOKING_FOR, 'Select an option')}
        </select>
      </div>
      <div class="contact-form-grid contact-form-grid--triple">
        <div class="contact-field">
          <label for="contact-describes" class="label-field">What best describes you?</label>
          <select id="contact-describes" name="describesYou" class="input-field">
            ${renderSelectOptions(CONTACT_DESCRIBES, 'Optional')}
          </select>
        </div>
        <div class="contact-field">
          <label for="contact-stage" class="label-field">Project stage</label>
          <select id="contact-stage" name="projectStage" class="input-field">
            ${renderSelectOptions(CONTACT_STAGES, 'Optional')}
          </select>
        </div>
        <div class="contact-field">
          <label for="contact-budget" class="label-field">Estimated budget range</label>
          <select id="contact-budget" name="budget" class="input-field">
            ${renderSelectOptions(CONTACT_BUDGETS, 'Optional')}
          </select>
        </div>
      </div>
      <div class="contact-field">
        <label for="contact-timeline" class="label-field">Preferred timeline</label>
        <select id="contact-timeline" name="timeline" class="input-field">
          ${renderSelectOptions(CONTACT_TIMELINES, 'Optional')}
        </select>
      </div>
      <div class="contact-field">
        <label for="contact-message" class="label-field">Message <span class="text-brand" aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" rows="6" required class="input-field resize-y min-h-[9rem]" placeholder="Tell us what you are trying to build, fix, improve, or grow."></textarea>
      </div>
      <p class="contact-form-consent text-xs leading-relaxed text-muted">
        By submitting this form, you agree to be contacted by DSYNZ regarding your enquiry.
      </p>
      <button type="submit" class="btn-primary w-full sm:w-auto btn-magnetic" data-magnetic>Submit Enquiry</button>
      <p id="contact-form-status" class="text-sm text-muted" role="status" aria-live="polite"></p>
    </form>
  `;
}

function renderContactFAQ() {
  return CONTACT_FAQ.map(
    (item, i) => `
    <div class="faq-item reveal" data-stagger="${i % 4}" data-faq-item>
      <button type="button" class="faq-trigger" aria-expanded="false" aria-controls="contact-faq-panel-${i}" id="contact-faq-trigger-${i}">
        <span>${item.q}</span>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
      </button>
      <div class="faq-panel" id="contact-faq-panel-${i}" role="region" aria-labelledby="contact-faq-trigger-${i}">
        <div class="faq-panel-inner"><p>${item.a}</p></div>
      </div>
    </div>`
  ).join('');
}

function renderContactDetails() {
  const phoneLinks = (CONTACT_DETAILS.phones || [])
    .map(
      (entry) =>
        `<a href="tel:${entry.tel}" class="contact-detail-value contact-detail-phone">${entry.display}</a>`
    )
    .join('');

  const phoneBlock =
    phoneLinks.length > 0
      ? `<div class="contact-detail-item">
        <span class="contact-detail-label">${CONTACT_DETAILS.phoneLabel}</span>
        <div class="contact-detail-phones">${phoneLinks}</div>
      </div>`
      : '';

  return `
    <div class="contact-details">
      <p class="contact-detail-item">
        <span class="contact-detail-label">Email</span>
        <a href="mailto:${CONTACT_DETAILS.email}" class="contact-detail-value">${CONTACT_DETAILS.email}</a>
      </p>
      ${phoneBlock}
      <p class="contact-detail-item">
        <span class="contact-detail-label">Location</span>
        <span class="contact-detail-value">${CONTACT_DETAILS.location}</span>
      </p>
      <p class="contact-detail-item">
        <span class="contact-detail-label">Serving</span>
        <span class="contact-detail-value">${CONTACT_DETAILS.serving}</span>
      </p>
      <p class="contact-detail-tagline font-mono text-xs uppercase tracking-[0.14em] text-muted">${CONTACT_DETAILS.tagline}</p>
    </div>
  `;
}

export function renderContactHero() {
  return `
    <section class="page-hero page-hero-contact" aria-labelledby="page-hero-title">
      <div class="page-hero-bg" aria-hidden="true">
        <div class="hero-mesh hero-mesh-animated"></div>
        <div class="section-grid-overlay"></div>
      </div>
      <div class="container-wide page-hero-inner">
        <div class="grid-12 page-hero-grid items-center">
          <div class="col-12 lg:col-8">
            <p class="eyebrow reveal">Contact DSYNZ</p>
            <h1 id="page-hero-title" class="heading-display mt-6 text-balance reveal">Start with clarity.</h1>
            <p class="text-lead mt-8 max-w-2xl text-muted reveal">Tell us what you are trying to build, fix, improve, or grow. We will help you understand the right next step before you invest in the wrong solution.</p>
            <div class="page-hero-actions mt-10 flex flex-wrap gap-4 reveal">
              <a href="#contact-form-section" class="btn-primary btn-magnetic" data-magnetic>Send an Enquiry</a>
              <a href="services.html" class="btn-secondary btn-magnetic" data-magnetic>Explore What We Do</a>
            </div>
            <p class="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted reveal">${BRAND.credibility}</p>
          </div>
          <aside class="col-12 lg:col-4 reveal" aria-hidden="true">
            <p class="contact-hero-highlight font-mono text-sm uppercase tracking-[0.2em] text-brand">Strategy • Technology • Growth</p>
          </aside>
        </div>
      </div>
    </section>
  `;
}

export function renderContactPage() {
  const steps = CONTACT_NEXT_STEPS.map(
    (step, i) => `
    <li class="contact-step reveal" data-stagger="${i}" role="listitem">
      <span class="contact-step-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <h3 class="contact-step-title">${step.title}</h3>
        <p class="contact-step-text">${step.text}</p>
      </div>
    </li>`
  ).join('');

  const reasons = CONTACT_REASONS.map(
    (card, i) => `
    <article class="contact-reason-card reveal" data-stagger="${i % 3}" role="listitem">
      <h3 class="contact-reason-title">${card.title}</h3>
      <p class="contact-reason-text">${card.text}</p>
    </article>`
  ).join('');

  return `
    <section class="section-editorial contact-intro" aria-labelledby="contact-intro-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="contact-intro-heading" class="heading-section text-balance">Not sure what you need? That is exactly where we can help.</h2>
          <p class="mt-6 text-lead text-muted">You may already know that you need a website, app, platform, automation system, or digital product.</p>
          <p class="mt-6 text-lead">Or you may only know that something in your business needs to improve.</p>
          <p class="mt-6 text-lead text-muted">Either way, the first step is clarity.</p>
          <p class="mt-6 text-lead text-muted">At DSYNZ, we begin by understanding your business, your goals, your current challenges, and the kind of digital solution that can create real value.</p>
          <blockquote class="positioning-highlight mt-8">
            <p>You do not need to have everything figured out before contacting us.</p>
          </blockquote>
        </div>
      </div>
    </section>

    <section id="contact-form-section" class="section-editorial bg-elevated contact-main" aria-labelledby="contact-form-heading" data-section>
      <div class="container-wide">
        <div class="contact-layout reveal">
          <div class="contact-layout-aside">
            <div class="contact-next-block">
              <h3 class="contact-subheading">What happens after you contact us?</h3>
              <p class="mt-3 text-sm text-muted">We keep the first step simple, practical, and focused on clarity.</p>
              <ol class="contact-steps mt-8" role="list">${steps}</ol>
            </div>
            <div class="contact-reach-block mt-12 lg:mt-14">
              <h3 class="contact-subheading">Reach DSYNZ.</h3>
              <p class="mt-3 text-sm text-muted">Prefer direct communication? Use the details below.</p>
              ${renderContactDetails()}
            </div>
          </div>
          <div class="contact-layout-form card-premium">
            <div class="contact-form-intro-desktop">
              <h2 id="contact-form-heading" class="heading-section text-balance">Tell us about your idea, challenge, or requirement.</h2>
              <p class="mt-4 text-lead text-muted">Share a few details and we will review the best starting point for your project.</p>
            </div>
            ${renderContactForm()}
          </div>
        </div>
      </div>
    </section>

    <section id="contact-reasons" class="section-editorial" aria-labelledby="contact-reasons-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="contact-reasons-heading" class="heading-section text-balance">Contact us if you want to...</h2>
        </div>
        <div class="contact-reasons-grid mt-14 reveal" role="list">${reasons}</div>
      </div>
    </section>

    <section id="contact-fit" class="section-editorial bg-elevated" aria-labelledby="contact-fit-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="contact-fit-heading" class="heading-section text-balance">We work best with clients who want more than average digital work.</h2>
          <p class="mt-6 text-lead text-muted">DSYNZ is a good fit if you want technology to support real business progress.</p>
        </div>
        <div class="services-fit-grid mt-14 reveal">
          <div class="services-fit-col">
            <h3 class="services-fit-label">Good fit</h3>
            <ul class="services-fit-list services-fit-list--yes">${CONTACT_GOOD_FIT.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="services-fit-col">
            <h3 class="services-fit-label">May not be the right fit</h3>
            <ul class="services-fit-list services-fit-list--no">${CONTACT_NOT_FIT.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    </section>

    <section id="contact-faq" class="section-editorial" aria-labelledby="contact-faq-heading" data-section>
      <div class="container-wide">
        <div class="max-w-3xl reveal">
          <h2 id="contact-faq-heading" class="heading-section text-balance">Common questions before we start.</h2>
        </div>
        <div class="contact-faq-list mt-12 reveal">${renderContactFAQ()}</div>
      </div>
    </section>
  `;
}
