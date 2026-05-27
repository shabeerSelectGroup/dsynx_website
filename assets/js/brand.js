/**
 * DSYNZ brand system — positioning, copy, and structured content
 */
export const BRAND_PHONES = [
  { display: '+91 89431 30949', tel: '+918943130949' },
  { display: '+91 79073 80188', tel: '+917907380188' },
];

export const BRAND_ASSETS = {
  logoLight: 'assets/favicon/dsynz-logo-black.png',
  logoDark: 'assets/favicon/dsynz-logo-white.png',
  faviconIco: 'assets/favicon/favicon.ico',
  appleTouchIcon: 'assets/favicon/apple-touch-icon.png',
};

export const FAVICON_HEAD = `
  <link rel="icon" href="assets/favicon/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png" />
  <link rel="manifest" href="assets/favicon/site.webmanifest" />
`;

export const BRAND = {
  name: 'DSYNZ',
  tagline: 'We design unbeatable businesses.',
  eyebrow: 'STRATEGY • TECHNOLOGY • GROWTH',
  heroSupporting:
    'From clarity to growth, we design technology that helps businesses become unbeatable.',
  heroDescriptorLead: 'DSYNZ is a strategy-led technology partner for growing businesses.',
  heroDescriptorBody:
    'We help ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.',
  descriptor: 'Strategy-led technology partner for growing businesses.',
  coreMessage:
    'DSYNZ helps ambitious people and businesses clarify ideas, design purposeful digital products, and build technology that creates real business value.',
  credibility: 'Established in 2011. Designing purposeful digital solutions for 15+ years.',
  email: 'hello@dsynz.com',
  phones: BRAND_PHONES,
  phone: BRAND_PHONES[0].display,
  baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://dsynz.com',
};

export const PILLARS = [
  { label: 'Purposeful digital products', desc: 'Built around real business goals.' },
  { label: 'Strategy before execution', desc: 'We understand before we build.' },
  { label: 'Growth-focused solutions', desc: 'Designed to create long-term value.' },
];

export const PROBLEM_CARDS = [
  {
    icon: 'eye',
    title: 'Built without clarity',
    text: 'Many digital projects begin with features instead of business goals.',
  },
  {
    icon: 'link-slash',
    title: 'Disconnected from growth',
    text: 'Technology should support revenue, efficiency, customer experience, and long-term value.',
  },
  {
    icon: 'squares',
    title: 'Too complex to use',
    text: 'Good systems should make work simpler, not harder.',
  },
];

export const HOME_SERVICES = [
  {
    icon: 'chart',
    title: 'Business Strategy & Consulting',
    desc: 'We help you understand where your business is, where it can go, and how technology can support that journey.',
  },
  {
    icon: 'layers',
    title: 'Product & Service Conceptualization',
    desc: 'We turn ideas, challenges, and opportunities into clear product, service, platform, or system concepts.',
  },
  {
    icon: 'code',
    title: 'Web Application Development',
    desc: 'We build custom web applications, portals, dashboards, SaaS platforms, and workflow systems.',
  },
  {
    icon: 'mobile',
    title: 'Mobile App Development',
    desc: 'We create mobile apps designed around users, business goals, and real-world use.',
  },
  {
    icon: 'globe',
    title: 'Website Design & Development',
    desc: 'We build websites that communicate clearly, represent your value, and support business growth.',
  },
];

export const GROWTH_LOOP_STEPS = [
  {
    phase: '01',
    icon: 'search',
    title: 'Assess',
    headline: 'Assess',
    body: 'We understand the business, current position, goals, users, challenges, and opportunities.',
    deliverables: [],
  },
  {
    phase: '02',
    icon: 'layers',
    title: 'Blueprint',
    headline: 'Blueprint',
    body: 'We convert clarity into a practical strategy, structure, roadmap, features, and execution plan.',
    deliverables: [],
  },
  {
    phase: '03',
    icon: 'code',
    title: 'Create',
    headline: 'Create',
    body: 'We design and build the product, platform, website, system, or digital solution.',
    deliverables: [],
  },
  {
    phase: '04',
    icon: 'rocket',
    title: 'Deploy',
    headline: 'Deploy',
    body: 'We launch carefully and make sure the solution works in the real business environment.',
    deliverables: [],
  },
  {
    phase: '05',
    icon: 'clipboard',
    title: 'Evaluate',
    headline: 'Evaluate',
    body: 'We review performance, usability, adoption, feedback, and business impact.',
    deliverables: [],
  },
  {
    phase: '06',
    icon: 'wrench',
    title: 'Fix',
    headline: 'Fix',
    body: 'We refine, simplify, correct, optimize, and improve what needs attention.',
    deliverables: [],
  },
  {
    phase: '07',
    icon: 'arrow-up',
    title: 'Grow',
    headline: 'Grow',
    body: 'We help the solution evolve, scale, and create long-term business value.',
    deliverables: [],
  },
];

/** @deprecated Use GROWTH_LOOP_STEPS — kept for process page until updated */
export const PROCESS_STEPS = GROWTH_LOOP_STEPS;

export const AUDIENCE_TAGS = [
  'Startups',
  'SMBs',
  'Family Businesses',
  'Service Companies',
  'eCommerce',
  'Travel',
  'Healthcare & Wellness',
  'Education',
  'Food & Hospitality',
  'Retail',
  'B2B Services',
];

export const WHY_DSYNZ_CARDS = [
  {
    title: 'No development without strategy',
    text: 'We understand the business before we build the solution.',
  },
  {
    title: 'No apps without purpose',
    text: 'A digital product should solve a real problem and create real value.',
  },
  {
    title: 'No confusing tech process',
    text: 'Clients should feel clear, supported, and respected from start to finish.',
  },
  {
    title: 'No rushed, cheap execution',
    text: 'Shortcuts often become expensive later. We focus on quality and long-term value.',
  },
  {
    title: 'No complexity without purpose',
    text: 'Simple, useful, scalable solutions are better than overloaded systems.',
  },
];

export const IMPACT_QUESTIONS = [
  'Will it help revenue or growth?',
  'Will it create long-term value?',
  'Will it solve a real business problem?',
  'Will it be easy to use?',
  'Will it scale as the business grows?',
];

export const WORK_PREVIEW = [
  {
    title: 'Custom Platforms',
    desc: 'SaaS products, portals, dashboards, and workflow systems built around business needs.',
  },
  {
    title: 'Business Websites',
    desc: 'Websites designed to communicate value, improve credibility, and support growth.',
  },
  {
    title: 'Digital Systems',
    desc: 'Automation, integrations, reporting tools, and internal systems that improve operations.',
  },
  {
    title: 'Product Concepts',
    desc: 'Turning ideas into structured, practical, and buildable digital products.',
  },
];

export const SERVICES_CORE = [
  {
    icon: 'chart',
    title: 'Business Strategy & Consulting',
    text: 'We help you make better technology decisions by first understanding your business, goals, challenges, and growth opportunities.',
    goodFor: [
      'Business owners planning digital growth',
      'Companies unsure what to build next',
      'Teams with disconnected tools or unclear systems',
      'Founders who need strategic direction before development',
    ],
    outcomes: [
      'Business and technology clarity',
      'Opportunity mapping',
      'Digital roadmap',
      'Solution direction',
      'Better decision-making before investment',
    ],
  },
  {
    icon: 'layers',
    title: 'Product & Service Conceptualization',
    text: 'We turn ideas, problems, and opportunities into clear product, service, platform, or system concepts.',
    goodFor: [
      'Startup ideas',
      'New digital products',
      'Internal business tools',
      'SaaS concepts',
      'Service redesign',
      'MVP planning',
    ],
    outcomes: [
      'Product concept',
      'Feature structure',
      'User journey direction',
      'MVP scope',
      'Functional roadmap',
      'Build-ready clarity',
    ],
  },
  {
    icon: 'code',
    title: 'Web Application Development',
    text: 'We build custom web applications, portals, dashboards, SaaS platforms, and workflow systems designed around real business needs.',
    goodFor: [
      'Business portals',
      'SaaS products',
      'Admin dashboards',
      'Customer portals',
      'Internal workflow tools',
      'Booking and management systems',
    ],
    outcomes: [
      'Custom web application',
      'Admin panel',
      'User management',
      'Dashboard and reporting',
      'Workflow automation',
      'Scalable architecture',
    ],
  },
  {
    icon: 'mobile',
    title: 'Mobile App Development',
    text: 'We create mobile apps that are built around users, business goals, and practical real-world use.',
    goodFor: [
      'Customer-facing apps',
      'Team or operations apps',
      'Booking apps',
      'Service apps',
      'Marketplace ideas',
      'MVP mobile products',
    ],
    outcomes: [
      'Mobile app concept',
      'UI/UX direction',
      'App development',
      'API integration',
      'Testing and deployment',
      'Ongoing improvement plan',
    ],
  },
  {
    icon: 'globe',
    title: 'Website Design & Development',
    text: 'We build websites that communicate clearly, represent your value, and support business growth.',
    goodFor: [
      'Company websites',
      'Brand revamps',
      'Service business websites',
      'Startup websites',
      'Product websites',
      'Conversion-focused landing pages',
    ],
    outcomes: [
      'Website strategy',
      'Content structure',
      'UI direction',
      'Responsive development',
      'Performance-focused build',
      'Launch-ready website',
    ],
  },
];

export const SERVICES_SECONDARY = [
  {
    icon: 'palette',
    title: 'UI/UX Design',
    text: 'User flows, interfaces, wireframes, and experiences designed for clarity and ease of use.',
  },
  {
    icon: 'cart',
    title: 'eCommerce Development',
    text: 'Online stores and commerce experiences built to communicate trust, simplify buying, and support growth.',
  },
  {
    icon: 'brand',
    title: 'Branding & Identity',
    text: 'Visual identity, brand direction, and digital brand systems that help businesses present themselves with confidence.',
  },
  {
    icon: 'sparkle',
    title: 'AI Chatbot & Integration',
    text: 'Practical AI integrations and chatbot experiences that improve guidance, support, search, or customer interaction.',
  },
  {
    icon: 'zap',
    title: 'Business Automation',
    text: 'Automation ideas and systems that reduce manual work and improve operational efficiency.',
  },
  {
    icon: 'wrench',
    title: 'Maintenance & Support',
    text: 'Ongoing support to keep websites, applications, and systems stable, updated, and reliable.',
  },
  {
    icon: 'cloud',
    title: 'Hosting & Server Management',
    text: 'Hosting, deployment, and server support for stable and secure digital delivery.',
  },
  {
    icon: 'chart',
    title: 'Data Dashboards & Reporting',
    text: 'Dashboards and reporting tools that help businesses understand activity, performance, and decision points.',
  },
];

export const SERVICES_BUILD_ITEMS = [
  {
    icon: 'layers',
    title: 'Custom SaaS Products',
    text: 'Digital platforms designed to serve users, manage workflows, and grow as products.',
  },
  {
    icon: 'squares',
    title: 'Business Portals',
    text: 'Customer, partner, team, or admin portals that centralize important business activity.',
  },
  {
    icon: 'refresh',
    title: 'Digital Transformation Projects',
    text: 'Technology-led improvements that help businesses modernize operations, service delivery, or customer experience.',
  },
  {
    icon: 'brand',
    title: 'Brand + Website Revamps',
    text: 'Sharper positioning, clearer structure, and modern websites that better reflect business value.',
  },
  {
    icon: 'mobile',
    title: 'Mobile Apps',
    text: 'Apps designed for customers, teams, operations, booking, service delivery, or product experiences.',
  },
  {
    icon: 'globe',
    title: 'Company Websites',
    text: 'Professional websites that build trust, explain value, and support enquiries or sales.',
  },
  {
    icon: 'clipboard',
    title: 'Internal Workflow Tools',
    text: 'Custom tools that reduce manual work, organize processes, and improve team efficiency.',
  },
  {
    icon: 'calendar',
    title: 'Booking Platforms',
    text: 'Systems for appointments, rentals, travel, services, rooms, seats, events, or resource management.',
  },
  {
    icon: 'rocket',
    title: 'MVPs for Founders',
    text: 'Focused first versions of digital products that help founders test, launch, and learn.',
  },
  {
    icon: 'sparkle',
    title: 'AI-Enabled Tools & Chatbots',
    text: 'Practical AI layers that improve guidance, support, recommendations, search, or internal workflows.',
  },
  {
    icon: 'cart',
    title: 'eCommerce Stores',
    text: 'Online commerce experiences designed for usability, trust, and growth.',
  },
  {
    icon: 'zap',
    title: 'Automation Systems',
    text: 'Smart process improvements that reduce repetitive work and improve consistency.',
  },
];

export const SERVICES_ENGAGEMENT = [
  {
    title: 'Custom Consulting + Development',
    text: 'For businesses that need a deeper, business-specific digital solution.',
    bestFor:
      'SaaS platforms, business portals, workflow systems, digital transformation projects, and complex web or mobile applications.',
  },
  {
    title: 'Fixed-Scope Projects',
    text: 'For clearly defined projects with specific deliverables, timelines, and outcomes.',
    bestFor:
      'Websites, app builds, eCommerce projects, dashboards, landing pages, and defined platform modules.',
  },
  {
    title: 'Strategy & Audit Sessions',
    text: 'For businesses that need clarity before investing in development.',
    bestFor: 'Digital direction, product planning, technology audits, MVP scoping, and roadmap creation.',
  },
  {
    title: 'Selective Growth Support',
    text: 'For clients who need continued improvement, support, optimization, or technical guidance after launch.',
    bestFor:
      'Website care, product iteration, UX improvement, automation enhancements, and ongoing technical support.',
  },
];

export const SERVICES_GOOD_FIT = [
  'SMBs ready to improve or scale',
  'Startups building new products',
  'Family businesses modernizing operations',
  'Service companies improving customer experience',
  'eCommerce businesses planning better digital systems',
  'Founders who need clarity before building',
  'Growing businesses with disconnected tools or outdated systems',
];

export const SERVICES_NOT_FIT = [
  'Projects with no clarity and no realistic budget',
  'Rushed work with unrealistic timelines',
  'Development without strategy',
  'Low-margin outsourcing work',
  'Maintenance-only work for poor-quality systems',
];

export const SERVICES_GROWTH_PREVIEW = [
  { title: 'Assess', text: 'Understand the business and opportunity.' },
  { title: 'Blueprint', text: 'Plan the right solution.' },
  { title: 'Create', text: 'Design and build with purpose.' },
  { title: 'Deploy', text: 'Launch carefully.' },
  { title: 'Evaluate', text: 'Review real-world performance.' },
  { title: 'Fix', text: 'Improve what needs attention.' },
  { title: 'Grow', text: 'Scale value over time.' },
];

export const PAGE_HEROES = {
  services: {
    eyebrow: 'What We Do',
    title: 'Strategy-led digital products, platforms, and systems.',
    lead: 'DSYNZ helps growing businesses turn ideas, challenges, and opportunities into purposeful technology. We combine business clarity, product thinking, design, and development to create solutions that support real growth.',
  },
  work: {
    eyebrow: 'Work',
    title: 'Purposeful solutions built for real business needs.',
    lead: 'Our work spans websites, platforms, portals, business systems, product concepts, and digital solutions created to help businesses grow with clarity, confidence, and purpose.',
  },
  process: {
    eyebrow: 'How We Work',
    title: 'From clarity to growth, we build with purpose.',
    lead: 'Every successful digital solution starts before design and development. At DSYNZ, we first understand the business, define the right direction, and then create technology that is practical, scalable, and built for growth.',
  },
  about: {
    eyebrow: 'About DSYNZ',
    title: 'We design purposeful technology for businesses that want to grow stronger.',
    lead: 'DSYNZ is a strategy-led technology partner for growing businesses. We help ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.',
  },
  contact: {
    eyebrow: 'Contact DSYNZ',
    title: 'Start with clarity.',
    lead: 'Tell us what you are trying to build, fix, improve, or grow. We will help you understand the right next step before you invest in the wrong solution.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Build purposeful digital solutions',
    lead: 'Join strategists, designers, and engineers who help growing businesses use technology with clarity and confidence.',
  },
  blog: {
    eyebrow: 'Insights',
    title: 'Ideas for building purposeful technology.',
    lead: 'Thoughts, frameworks, and practical perspectives for ambitious businesses that want to use technology with clarity, purpose, and growth in mind.',
  },
};
