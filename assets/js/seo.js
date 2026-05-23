/**
 * DSYNZ SEO Helper — structured data & meta utilities
 */

const DSYNZ_ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DSYNZ',
  url: 'https://dsynz.com',
  logo: 'https://dsynz.com/assets/favicon/favicon.svg',
  slogan: 'We design unbeatable businesses.',
  description:
    'DSYNZ helps ambitious businesses clarify ideas, design purposeful digital products, and build technology solutions that create real business growth.',
  sameAs: [
    'https://linkedin.com/company/dsynz',
    'https://twitter.com/dsynz',
    'https://github.com/dsynz',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@dsynz.com',
    availableLanguage: ['English'],
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Software Development',
    'Artificial Intelligence',
    'UI/UX Design',
    'Digital Transformation',
    'Cloud Computing',
  ],
};

const DSYNZ_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DSYNZ',
  url: 'https://dsynz.com',
  description: DSYNZ_ORG.description,
  publisher: { '@type': 'Organization', name: 'DSYNZ' },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://dsynz.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Inject JSON-LD script into document head
 * @param {object|object[]} data
 */
export function injectSchema(data) {
  const payload = Array.isArray(data) ? data : [data];
  payload.forEach((item) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

/**
 * Page-specific schema builders
 */
export function getOrganizationSchema() {
  return DSYNZ_ORG;
}

export function getWebsiteSchema() {
  return DSYNZ_WEBSITE;
}

export function getWebPageSchema({ title, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: { '@type': 'WebSite', name: 'DSYNZ', url: 'https://dsynz.com' },
    publisher: { '@type': 'Organization', name: 'DSYNZ' },
  };
}

export function getServiceSchema(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DSYNZ',
    url: 'https://dsynz.com/services.html',
    description: DSYNZ_ORG.description,
    serviceType: services,
    provider: DSYNZ_ORG,
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getArticleSchema({ title, description, url, datePublished, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    image,
    author: { '@type': 'Organization', name: 'DSYNZ' },
    publisher: {
      '@type': 'Organization',
      name: 'DSYNZ',
      logo: { '@type': 'ImageObject', url: DSYNZ_ORG.logo },
    },
  };
}

export function getJobPostingSchema(job) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType || 'FULL_TIME',
    hiringOrganization: DSYNZ_ORG,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: job.country || 'US',
      },
    },
  };
}

export function initDefaultSchema(pageType = 'home') {
  const schemas = [getOrganizationSchema(), getWebsiteSchema()];
  if (pageType === 'home') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'DSYNZ Technology Services',
      provider: DSYNZ_ORG,
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Technology Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Solutions' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Transformation' } },
        ],
      },
    });
  }
  injectSchema(schemas);
}
