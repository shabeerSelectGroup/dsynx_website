/**
 * DSYNZ — Work page content (projects.html)
 */

export const WORK_CATEGORIES = [
  {
    id: 'platforms',
    title: 'Custom Platforms',
    text: 'SaaS products, business portals, dashboards, and workflow systems built around specific business needs.',
    icon: 'layers',
  },
  {
    id: 'websites',
    title: 'Business Websites',
    text: 'Professional websites designed to communicate value, improve credibility, and support enquiries or sales.',
    icon: 'globe',
  },
  {
    id: 'brand-revamps',
    title: 'Brand + Website Revamps',
    text: 'Sharper positioning, clearer structure, and modern digital presence for growing businesses.',
    icon: 'brand',
  },
  {
    id: 'systems',
    title: 'Digital Systems',
    text: 'Automation, integrations, reporting tools, and internal systems that improve operations.',
    icon: 'zap',
  },
  {
    id: 'product-concepts',
    title: 'Product Concepts',
    text: 'Turning ideas into structured, practical, and buildable digital product directions.',
    icon: 'rocket',
  },
  {
    id: 'ecommerce',
    title: 'eCommerce',
    text: 'Online commerce experiences designed for usability, trust, and business growth.',
    icon: 'chart',
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    text: 'Mobile experiences built around users, business goals, and real-world use.',
    icon: 'mobile',
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    text: 'Practical AI layers, chatbots, and automation ideas that simplify work or improve customer interaction.',
    icon: 'sparkle',
  },
];

export const WORK_CASE_CARDS = [
  {
    id: 'saas-direction',
    projectType: 'Custom SaaS Product',
    title: 'From idea to scalable product direction',
    challenge:
      'The business needed to turn an idea into a clear, structured, and buildable digital product.',
    created:
      'Product concept, feature structure, user flows, technical direction, and development roadmap.',
    value: 'The idea became clearer, easier to plan, and ready for structured execution.',
    services: [
      'Product & Service Conceptualization',
      'Web Application Development',
      'Business Strategy & Consulting',
    ],
    tags: ['platforms', 'product-concepts'],
    visual: 'violet',
    screenshot: null,
    screenshots: [],
  },
  {
    id: 'business-portal',
    projectType: 'Business Portal',
    title: 'A centralized system for better business control',
    challenge:
      'The business needed a more organized way to manage users, records, processes, or service activity.',
    created:
      'A custom portal with admin controls, user access, dashboards, workflow features, and reporting structure.',
    value: 'Important business activity became easier to manage, track, and improve.',
    services: ['Web Application Development', 'Business Automation', 'Data Dashboards & Reporting'],
    tags: ['platforms', 'automation'],
    visual: 'indigo',
    screenshot: null,
    screenshots: [],
  },
  {
    id: 'brand-revamp',
    projectType: 'Brand + Website Revamp',
    title: 'A clearer digital presence for a growing business',
    challenge:
      'The existing website did not communicate the value, credibility, or direction of the business clearly.',
    created:
      'Improved website structure, clearer messaging, modern UI direction, responsive development, and launch support.',
    value:
      'The business gained a stronger digital presence and clearer communication with potential customers.',
    services: ['Website Design & Development', 'Branding & Identity', 'Business Strategy & Consulting'],
    tags: ['websites', 'brand-revamps'],
    visual: 'plum',
    screenshot: null,
    screenshots: [],
  },
  {
    id: 'workflow-tool',
    projectType: 'Internal Workflow Tool',
    title: 'Reducing manual work through purposeful systems',
    challenge: 'The business was depending on manual processes, repeated tasks, or disconnected tools.',
    created:
      'A custom workflow tool designed to organize activity, reduce repetition, and improve visibility.',
    value: 'The team gained a simpler and more reliable way to manage daily work.',
    services: ['Web Application Development', 'Business Automation', 'Data Dashboards & Reporting'],
    tags: ['automation', 'platforms'],
    visual: 'deep',
    screenshot: null,
    screenshots: [],
  },
  {
    id: 'mobile-experience',
    projectType: 'Mobile App',
    title: 'A mobile experience built around real users',
    challenge:
      'The business needed a mobile-first experience for customers, teams, services, bookings, or operations.',
    created:
      'Mobile app structure, user experience direction, app development, API integration, testing, and deployment support.',
    value: 'The business gained a more accessible and practical digital channel for users.',
    services: ['Mobile App Development', 'UI/UX Design', 'Web Application Development'],
    tags: ['mobile-apps'],
    visual: 'violet',
    screenshot: null,
    screenshots: [],
  },
  {
    id: 'ai-tool',
    projectType: 'AI-Enabled Tool',
    title: 'Practical AI to improve guidance and interaction',
    challenge:
      'The business needed a smarter way to guide users, answer questions, recommend options, or simplify interaction.',
    created:
      'AI chatbot or integration concept, guided conversation flow, data source planning, and implementation direction.',
    value:
      'Users gained faster guidance while the business improved support, discovery, or interaction.',
    services: ['AI Chatbot & Integration', 'Product & Service Conceptualization', 'Web Application Development'],
    tags: ['ai', 'product-concepts'],
    visual: 'indigo',
    screenshot: null,
    screenshots: [],
  },
];

/** Set `screenshot` to a single image path, or add paths to `screenshots[]` per card. */

export const WORK_FORMAT_CARDS = [
  {
    title: 'Challenge',
    text: 'What was unclear, inefficient, outdated, disconnected, or limiting growth?',
    icon: 'eye',
  },
  {
    title: 'Solution',
    text: 'What did we design, build, improve, or conceptualize to solve the problem?',
    icon: 'wrench',
  },
  {
    title: 'Value',
    text: 'How did the solution support clarity, usability, operations, credibility, revenue, or growth?',
    icon: 'chart',
  },
];

export const WORK_PROOF_CARDS = [
  {
    title: '15+ years',
    text: 'Designing and delivering digital solutions since 2011.',
  },
  {
    title: 'Strategy-led',
    text: 'We understand the business before we build the solution.',
  },
  {
    title: 'Purposeful',
    text: 'Every project should solve a real problem or create real value.',
  },
  {
    title: 'Growth-focused',
    text: 'We build for long-term usefulness, not only launch day.',
  },
];

export const WORK_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'websites', label: 'Websites' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
  { id: 'brand-revamps', label: 'Brand Revamps' },
  { id: 'automation', label: 'Automation' },
  { id: 'ai', label: 'AI' },
  { id: 'ecommerce', label: 'eCommerce' },
  { id: 'product-concepts', label: 'Product Concepts' },
];

export const WORK_DIFFERENCE_CARDS = [
  {
    title: 'No development without strategy',
    text: 'We understand the business before we decide what should be built.',
  },
  {
    title: 'No apps without purpose',
    text: 'A digital product should be useful, usable, and valuable.',
  },
  {
    title: 'No confusing tech process',
    text: 'Clients should feel clear, supported, and respected throughout the journey.',
  },
  {
    title: 'No complexity without purpose',
    text: 'Simple, scalable, useful solutions are better than overloaded systems.',
  },
  {
    title: 'No launch without learning',
    text: 'The work does not end at launch. We evaluate, fix, and grow.',
  },
];

export const WORK_GROWTH_LOOP =
  'Assess → Blueprint → Create → Deploy → Evaluate → Fix → Grow';
