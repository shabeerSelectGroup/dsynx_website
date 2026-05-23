/**
 * DSYNZ — Insights page content (blog.html)
 */

export const INSIGHT_CATEGORIES = [
  {
    id: 'clarity',
    title: 'Business Clarity',
    text: 'How to think clearly before investing in digital solutions.',
    icon: 'eye',
  },
  {
    id: 'strategy',
    title: 'Technology Strategy',
    text: 'How growing businesses can make better technology decisions.',
    icon: 'chart',
  },
  {
    id: 'products',
    title: 'Digital Products',
    text: 'Ideas on SaaS, MVPs, platforms, apps, and product planning.',
    icon: 'layers',
  },
  {
    id: 'websites',
    title: 'Websites & Digital Presence',
    text: 'How websites can communicate better, build trust, and support growth.',
    icon: 'globe',
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    text: 'Practical ways to use AI and automation without unnecessary complexity.',
    icon: 'sparkle',
  },
  {
    id: 'growth',
    title: 'Growth Systems',
    text: 'How digital tools, workflows, and systems can support long-term business growth.',
    icon: 'refresh',
  },
];

export const INSIGHT_FEATURED = [
  {
    slug: 'business-clarity-before-technology',
    category: 'Strategy',
    topic: 'clarity',
    title: 'Why business clarity should come before technology',
    excerpt:
      'Many businesses rush into websites, apps, platforms, or automation before they understand the real problem. The result is often wasted effort and tools that do not support growth. Before investing in technology, businesses need to clarify what they do, where they want to go, what is slowing them down, and what kind of solution will create the best impact.',
    readTime: '3 min read',
    label: 'Latest Insight',
  },
  {
    slug: 'ai-when-problem-is-clear',
    category: 'AI & Automation',
    topic: 'ai',
    title: 'AI is useful only when the business problem is clear',
    excerpt:
      'AI can improve support, search, recommendations, workflows, and decision-making. But adding AI without a clear purpose can create more confusion than value. Growing businesses should begin with simple questions: What are we trying to improve? What information does the system need? How will users benefit? The right AI solution starts with clarity, not hype.',
    readTime: '4 min read',
    label: 'Latest Insight',
  },
  {
    slug: 'mvp-test-value-not-features',
    category: 'Digital Products',
    topic: 'products',
    title: 'An MVP should test value, not just features',
    excerpt:
      'A minimum viable product is not a smaller version of a dream product. It is a focused way to test whether an idea solves a real problem for real users. The best MVPs are built around clear assumptions, essential features, simple user flows, and a path to learning. For founders, clarity is more valuable than complexity.',
    readTime: '4 min read',
    label: 'Latest Insight',
  },
  {
    slug: 'website-more-than-look-good',
    category: 'Websites',
    topic: 'websites',
    title: 'A website should do more than look good',
    excerpt:
      'A modern website should communicate value, build trust, guide users, and support business growth. Visual design matters, but it is not enough. Structure, messaging, usability, speed, credibility, and clear calls to action all shape how well a website performs. Good website design starts with understanding the business behind it.',
    readTime: '3 min read',
    label: 'Latest Insight',
  },
];

export const INSIGHT_ARTICLES = [
  {
    slug: 'business-clarity-before-technology',
    category: 'Strategy',
    topic: 'clarity',
    title: 'Why business clarity should come before technology',
    paragraphs: [
      'Many digital projects fail because they start with the wrong question.',
      'The question is usually: “What should we build?”',
      'But the better question is: “What are we trying to improve?”',
      'A website, app, platform, or automation system is only useful when it supports a clear business goal. Without clarity, teams often end up building features that look good in a proposal but do not create real value in daily business.',
      'Business clarity helps define the problem, the users, the desired outcome, and the right level of investment. It also prevents unnecessary complexity.',
      'Before building, businesses should ask: What is the real problem? Who is affected by it? What should improve after the solution is launched? How will we know if it worked?',
      'At DSYNZ, this is why we start with understanding the business before designing the solution.',
    ],
    closing: 'Technology becomes more powerful when the business direction is clear.',
  },
  {
    slug: 'ai-when-problem-is-clear',
    category: 'AI & Automation',
    topic: 'ai',
    title: 'AI is useful only when the business problem is clear',
    paragraphs: [
      'AI is becoming part of almost every business conversation. Many companies want AI chatbots, smart search, automated support, recommendation systems, or internal assistants.',
      'But AI should not be added only because it feels modern.',
      'The best AI use cases start with a clear business problem. For example, customers may be struggling to find the right service. Teams may be repeating the same manual tasks. Decision-makers may need quicker access to useful information. Support teams may need better ways to guide users.',
      'Once the problem is clear, AI can be designed around the right data, right workflow, and right user experience.',
      'Without clarity, AI becomes a layer of complexity. With clarity, it becomes a practical tool for better guidance, efficiency, and growth.',
    ],
    closing: 'AI should simplify the business, not complicate it.',
  },
  {
    slug: 'mvp-test-value-not-features',
    category: 'Digital Products',
    topic: 'products',
    title: 'An MVP should test value, not just features',
    paragraphs: [
      'Many founders think an MVP is simply a smaller version of the final product. That approach often leads to bloated first versions, delayed launches, and unclear learning.',
      'A good MVP is not about building less randomly. It is about building the right first version.',
      'The purpose of an MVP is to test whether the product creates value for a specific group of users. That means the first version should focus on the core problem, essential user journey, and the minimum features needed to learn something useful.',
      'Before building an MVP, founders should define: Who is this for? What problem does it solve? What is the most important action the user must complete? What must we learn from the first version? What can wait?',
      'A focused MVP creates clarity. A bloated MVP creates confusion.',
    ],
    closing: 'The best MVPs are not feature-heavy. They are learning-focused.',
  },
  {
    slug: 'website-more-than-look-good',
    category: 'Websites',
    topic: 'websites',
    title: 'A website should do more than look good',
    paragraphs: [
      'A beautiful website can still fail.',
      'If visitors do not understand what the business does, why it matters, who it serves, and what action to take next, the design is not doing its job.',
      'A strong website should combine clear messaging, useful structure, trustworthy visuals, fast performance, and simple user journeys. It should help visitors move from interest to understanding, and from understanding to action.',
      'For growing businesses, a website is not just a digital brochure. It is a business communication system.',
      'It should answer: What do you offer? Who is it for? Why should someone trust you? What problem do you solve? What should the visitor do next?',
      'Good design is not decoration. It is clarity made visible.',
    ],
    closing: 'A website should not only represent the business. It should help the business grow.',
  },
];

export const INSIGHT_POV_ITEMS = [
  'Business clarity before technology',
  'Strategy before execution',
  'Practical innovation over hype',
  'Simple solutions over unnecessary complexity',
  'Long-term value over short-term launch excitement',
  'Growth-focused systems over disconnected tools',
];
