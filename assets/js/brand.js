/**
 * DSYNZ brand system — positioning, copy, and structured content
 */
export const BRAND = {
  name: 'DSYNZ',
  tagline: 'We design unbeatable businesses.',
  descriptor:
    'Strategic technology and design partner for organizations scaling, modernizing, and dominating digitally.',
  email: 'hello@dsynz.com',
  phone: '+1 (555) 000-0000',
  baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://dsynz.com',
};

export const PILLARS = [
  { label: 'Intelligence', desc: 'Systems thinking before software.' },
  { label: 'Precision', desc: 'Architecture measured in decades.' },
  { label: 'Innovation', desc: 'AI-native, outcome-led delivery.' },
  { label: 'Growth', desc: 'Technology that compounds revenue.' },
];

export const PROCESS_STEPS = [
  {
    phase: '01',
    title: 'Discover',
    headline: 'Map the opportunity with executive clarity',
    body: 'Stakeholder immersion, technical audit, competitive landscape, and success metrics defined before capital is committed.',
    deliverables: ['Opportunity thesis', 'Technical risk map', 'ROI model'],
  },
  {
    phase: '02',
    title: 'Design',
    headline: 'Architect experiences and systems that scale',
    body: 'UX systems, platform architecture, and validated prototypes — de-risked for enterprise governance and speed.',
    deliverables: ['Experience architecture', 'Platform blueprint', 'Validated prototype'],
  },
  {
    phase: '03',
    title: 'Build',
    headline: 'Engineer with senior accountability',
    body: 'Iterative delivery with continuous visibility — security, observability, and quality gates embedded from sprint one.',
    deliverables: ['Production codebase', 'CI/CD pipeline', 'Security baseline'],
  },
  {
    phase: '04',
    title: 'Scale',
    headline: 'Launch, optimize, and evolve with data',
    body: 'Operational excellence, performance tuning, and roadmap evolution aligned to board-level outcomes.',
    deliverables: ['Launch playbook', 'Performance SLAs', 'Growth roadmap'],
  },
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'Core' },
  { name: 'React', category: 'Interface' },
  { name: 'Node.js', category: 'Platform' },
  { name: 'Python', category: 'AI / Data' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'GCP', category: 'Cloud' },
  { name: 'Kubernetes', category: 'Infra' },
  { name: 'OpenAI', category: 'Intelligence' },
  { name: 'PostgreSQL', category: 'Data' },
  { name: 'Figma', category: 'Design' },
  { name: 'Terraform', category: 'Infra' },
  { name: 'Datadog', category: 'Ops' },
];

export const CLIENT_MARKS = [
  'NOVAPAY', 'HELIX', 'AXIOM', 'MERIDIAN', 'VANTIS', 'ORBITAL', 'PRISM', 'NEXUS',
];

export const PAGE_HEROES = {
  services: {
    eyebrow: 'Capabilities',
    title: 'Strategic technology, engineered for dominance',
    lead: 'From platform architecture to AI-native products — one elite partner accountable for clarity, craft, and scale.',
  },
  projects: {
    eyebrow: 'Case studies',
    title: 'Transformations that redefine categories',
    lead: 'Enterprise outcomes documented with precision — before, after, and the systems that made it possible.',
  },
  process: {
    eyebrow: 'Methodology',
    title: 'A process built for certainty at scale',
    lead: 'Four phases. Zero ambiguity. Executive visibility from first workshop through global rollout.',
  },
  about: {
    eyebrow: 'DSYNZ',
    title: 'We architect digital advantage',
    lead: 'A strategic technology studio for leaders who think in decades — not quarters.',
  },
  contact: {
    eyebrow: 'Engage',
    title: 'Begin your next chapter',
    lead: 'Tell us where you are. We will design the technology path to where you must be.',
  },
  careers: {
    eyebrow: 'Careers',
    title: 'Build what markets remember',
    lead: 'Join senior strategists, designers, and engineers shaping category-defining platforms.',
  },
  blog: {
    eyebrow: 'Insights',
    title: 'Intelligence for growth leaders',
    lead: 'Strategy, systems, and design — perspectives from the DSYNZ studio.',
  },
};
