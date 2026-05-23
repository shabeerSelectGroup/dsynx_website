/**
 * DSYNZ brand system — positioning, copy, and structured content
 */
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
  phone: '+1 (555) 000-0000',
  baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://dsynz.com',
};

export const PILLARS = [
  { label: 'Purposeful digital products', desc: 'Built around real business goals.' },
  { label: 'Strategy before execution', desc: 'We understand before we build.' },
  { label: 'Growth-focused solutions', desc: 'Designed to create long-term value.' },
];

export const PROBLEM_CARDS = [
  {
    title: 'Built without clarity',
    text: 'Many digital projects begin with features instead of business goals.',
  },
  {
    title: 'Disconnected from growth',
    text: 'Technology should support revenue, efficiency, customer experience, and long-term value.',
  },
  {
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

export const PAGE_HEROES = {
  services: {
    eyebrow: 'What We Do',
    title: 'Digital products and solutions built for business growth',
    lead: 'We help growing businesses move from unclear ideas and disconnected systems to purposeful technology that supports real progress.',
  },
  projects: {
    eyebrow: 'Work',
    title: 'Built with clarity. Delivered with purpose.',
    lead: 'Our work spans websites, platforms, portals, business systems, product concepts, and digital solutions for growing businesses.',
  },
  process: {
    eyebrow: 'How We Work',
    title: 'Our process does not end at launch',
    lead: 'We follow a strategy-led growth loop designed to clarify, create, launch, improve, and scale purposeful digital solutions.',
  },
  about: {
    eyebrow: 'About',
    title: 'Built on 15+ years of digital solutions experience',
    lead: 'Established in 2011, DSYNZ has evolved into a strategy-led technology partner for growing businesses.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Ready to build something purposeful?',
    lead: 'Whether you are improving an existing business, launching a new product, or rethinking your digital systems, DSYNZ can help you start with clarity.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Build purposeful digital solutions',
    lead: 'Join strategists, designers, and engineers who help growing businesses use technology with clarity and confidence.',
  },
  blog: {
    eyebrow: 'Insights',
    title: 'Strategy, technology, and growth',
    lead: 'Practical perspectives on clarity, purposeful products, and technology that creates real business value.',
  },
};
