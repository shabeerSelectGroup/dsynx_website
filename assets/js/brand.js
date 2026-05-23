/**
 * DSYNZ brand system — positioning, copy, and structured content
 */
export const BRAND = {
  name: 'DSYNZ',
  tagline: 'We design unbeatable businesses.',
  eyebrow: 'STRATEGY • TECHNOLOGY • GROWTH',
  descriptor: 'Strategy-led technology partner for growing businesses.',
  email: 'hello@dsynz.com',
  phone: '+1 (555) 000-0000',
  baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://dsynz.com',
  established: '2011',
  experience: '15+',
};

export const CTAS = {
  primary: { label: 'Start with Clarity', href: 'contact.html' },
  secondary: { label: 'Explore What We Do', href: 'services.html' },
  work: { label: 'View our work', href: 'projects.html' },
  about: { label: 'Know more about DSYNZ', href: 'about.html' },
  talk: { label: 'Talk to DSYNZ', href: 'contact.html' },
};

export const HERO_HIGHLIGHTS = [
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
    icon: 'globe',
    title: 'Web Application Development',
    desc: 'We build custom web applications, portals, dashboards, SaaS platforms, and workflow systems.',
  },
  {
    icon: 'mobile',
    title: 'Mobile App Development',
    desc: 'We create mobile apps designed around users, business goals, and real-world use.',
  },
  {
    icon: 'palette',
    title: 'Website Design & Development',
    desc: 'We build websites that communicate clearly, represent your value, and support business growth.',
  },
];

export const GROWTH_LOOP_STEPS = [
  {
    phase: '01',
    title: 'Assess',
    body: 'We understand the business, current position, goals, users, challenges, and opportunities.',
  },
  {
    phase: '02',
    title: 'Blueprint',
    body: 'We convert clarity into a practical strategy, structure, roadmap, features, and execution plan.',
  },
  {
    phase: '03',
    title: 'Create',
    body: 'We design and build the product, platform, website, system, or digital solution.',
  },
  {
    phase: '04',
    title: 'Deploy',
    body: 'We launch carefully and make sure the solution works in the real business environment.',
  },
  {
    phase: '05',
    title: 'Evaluate',
    body: 'We review performance, usability, adoption, feedback, and business impact.',
  },
  {
    phase: '06',
    title: 'Fix',
    body: 'We refine, simplify, correct, optimize, and improve what needs attention.',
  },
  {
    phase: '07',
    title: 'Grow',
    body: 'We help the solution evolve, scale, and create long-term business value.',
  },
];

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

export const WORK_PREVIEW_CARDS = [
  {
    icon: 'layers',
    title: 'Custom Platforms',
    text: 'SaaS products, portals, dashboards, and workflow systems built around business needs.',
  },
  {
    icon: 'globe',
    title: 'Business Websites',
    text: 'Websites designed to communicate value, improve credibility, and support growth.',
  },
  {
    icon: 'zap',
    title: 'Digital Systems',
    text: 'Automation, integrations, reporting tools, and internal systems that improve operations.',
  },
  {
    icon: 'sparkle',
    title: 'Product Concepts',
    text: 'Turning ideas into structured, practical, and buildable digital products.',
  },
];

/** @deprecated Use GROWTH_LOOP_STEPS on homepage; kept for process page compatibility */
export const PROCESS_STEPS = GROWTH_LOOP_STEPS.slice(0, 4).map((step, i) => ({
  ...step,
  phase: String(i + 1).padStart(2, '0'),
  headline: step.title,
  deliverables: [],
}));

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
    lead: 'Established in 2011, DSYNZ helps ambitious people and companies clarify ideas, design purposeful digital products, and build systems that create real business value.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Start with clarity',
    lead: 'Whether you are improving an existing business, launching a new product, or rethinking your digital systems, we would like to hear from you.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Build purposeful digital solutions',
    lead: 'Join a team that combines business thinking, product clarity, and reliable technology execution.',
  },
  blog: {
    eyebrow: 'Insights',
    title: 'Clarity, technology, and growth',
    lead: 'Practical perspectives on strategy, product design, and building technology that creates business value.',
  },
};
