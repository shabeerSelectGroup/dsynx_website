#!/usr/bin/env python3
"""Generate static blog article HTML pages from insights content."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "blog"

ARTICLES = [
    {
        "slug": "business-clarity-before-technology",
        "category": "Strategy",
        "title": "Why business clarity should come before technology",
        "description": "Many digital projects fail because they start with the wrong question. Learn why business clarity should come before websites, apps, platforms, or automation.",
        "datePublished": "2025-03-12",
        "paragraphs": [
            "Many digital projects fail because they start with the wrong question.",
            "The question is usually: “What should we build?”",
            "But the better question is: “What are we trying to improve?”",
            "A website, app, platform, or automation system is only useful when it supports a clear business goal. Without clarity, teams often end up building features that look good in a proposal but do not create real value in daily business.",
            "Business clarity helps define the problem, the users, the desired outcome, and the right level of investment. It also prevents unnecessary complexity.",
            "Before building, businesses should ask: What is the real problem? Who is affected by it? What should improve after the solution is launched? How will we know if it worked?",
            "At DSYNZ, this is why we start with understanding the business before designing the solution.",
        ],
        "closing": "Technology becomes more powerful when the business direction is clear.",
    },
    {
        "slug": "ai-when-problem-is-clear",
        "category": "AI & Automation",
        "title": "AI is useful only when the business problem is clear",
        "description": "AI can improve support, search, and workflows—but only when the business problem is clear. Practical guidance for growing businesses.",
        "datePublished": "2025-03-18",
        "paragraphs": [
            "AI is becoming part of almost every business conversation. Many companies want AI chatbots, smart search, automated support, recommendation systems, or internal assistants.",
            "But AI should not be added only because it feels modern.",
            "The best AI use cases start with a clear business problem. For example, customers may be struggling to find the right service. Teams may be repeating the same manual tasks. Decision-makers may need quicker access to useful information. Support teams may need better ways to guide users.",
            "Once the problem is clear, AI can be designed around the right data, right workflow, and right user experience.",
            "Without clarity, AI becomes a layer of complexity. With clarity, it becomes a practical tool for better guidance, efficiency, and growth.",
        ],
        "closing": "AI should simplify the business, not complicate it.",
    },
    {
        "slug": "mvp-test-value-not-features",
        "category": "Digital Products",
        "title": "An MVP should test value, not just features",
        "description": "A minimum viable product should test whether an idea creates value—not just ship a smaller feature list. A practical MVP framework for founders.",
        "datePublished": "2025-04-02",
        "paragraphs": [
            "Many founders think an MVP is simply a smaller version of the final product. That approach often leads to bloated first versions, delayed launches, and unclear learning.",
            "A good MVP is not about building less randomly. It is about building the right first version.",
            "The purpose of an MVP is to test whether the product creates value for a specific group of users. That means the first version should focus on the core problem, essential user journey, and the minimum features needed to learn something useful.",
            "Before building an MVP, founders should define: Who is this for? What problem does it solve? What is the most important action the user must complete? What must we learn from the first version? What can wait?",
            "A focused MVP creates clarity. A bloated MVP creates confusion.",
        ],
        "closing": "The best MVPs are not feature-heavy. They are learning-focused.",
    },
    {
        "slug": "website-more-than-look-good",
        "category": "Websites",
        "title": "A website should do more than look good",
        "description": "A beautiful website can still fail. Learn what a growth-focused website must communicate and how to design for clarity and action.",
        "datePublished": "2025-04-15",
        "paragraphs": [
            "A beautiful website can still fail.",
            "If visitors do not understand what the business does, why it matters, who it serves, and what action to take next, the design is not doing its job.",
            "A strong website should combine clear messaging, useful structure, trustworthy visuals, fast performance, and simple user journeys. It should help visitors move from interest to understanding, and from understanding to action.",
            "For growing businesses, a website is not just a digital brochure. It is a business communication system.",
            "It should answer: What do you offer? Who is it for? Why should someone trust you? What problem do you solve? What should the visitor do next?",
            "Good design is not decoration. It is clarity made visible.",
        ],
        "closing": "A website should not only represent the business. It should help the business grow.",
    },
]

OG_IMAGE = "https://dsynz.com/assets/images/og-default.jpg"


def load_shell():
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    nav_m = re.search(r'<div id="site-nav">(.*?)</div>\s*<main', index, re.DOTALL)
    footer_m = re.search(r'<div id="site-footer">(.*?)</div>\s*<script', index, re.DOTALL)
    loader_m = re.search(r'<div id="site-loader">(.*?)</div>\s*<div id="site-nav">', index, re.DOTALL)
    if not nav_m or not footer_m or not loader_m:
        raise RuntimeError("Could not extract layout shell from index.html")
    return loader_m.group(1), nav_m.group(1), footer_m.group(1)


def prefix_paths(html: str) -> str:
    html = html.replace('href="assets/', 'href="../assets/')
    html = html.replace('src="assets/', 'src="../assets/')
    html = html.replace('href="index.html"', 'href="../index.html"')
    html = html.replace('href="services.html"', 'href="../services.html"')
    html = html.replace('href="process.html"', 'href="../process.html"')
    html = html.replace('href="projects.html"', 'href="../projects.html"')
    html = html.replace('href="about.html"', 'href="../about.html"')
    html = html.replace('href="blog.html"', 'href="../blog.html"')
    html = html.replace('href="contact.html"', 'href="../contact.html"')
    html = html.replace('href="careers.html"', 'href="../careers.html"')
    html = html.replace('href="sitemap.xml"', 'href="../sitemap.xml"')
    return html


def article_schema(article: dict) -> str:
    payload = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article["title"],
        "description": article["description"],
        "url": f"https://dsynz.com/blog/{article['slug']}.html",
        "datePublished": article["datePublished"],
        "image": OG_IMAGE,
        "author": {"@type": "Organization", "name": "DSYNZ"},
        "publisher": {
            "@type": "Organization",
            "name": "DSYNZ",
            "logo": {
                "@type": "ImageObject",
                "url": "https://dsynz.com/assets/favicon/android-chrome-512x512.png",
            },
        },
    }
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://dsynz.com/"},
            {"@type": "ListItem", "position": 2, "name": "Insights", "item": "https://dsynz.com/blog.html"},
            {
                "@type": "ListItem",
                "position": 3,
                "name": article["title"],
                "item": f"https://dsynz.com/blog/{article['slug']}.html",
            },
        ],
    }
    scripts = [
        f'<script type="application/ld+json">{json.dumps(payload, separators=(",", ":"))}</script>',
        f'<script type="application/ld+json">{json.dumps(breadcrumb, separators=(",", ":"))}</script>',
    ]
    return "\n".join(scripts)


def render_article(article: dict, loader: str, nav: str, footer: str) -> str:
    url = f"https://dsynz.com/blog/{article['slug']}.html"
    title = f"{article['title']} | DSYNZ Insights"
    body = "\n".join(f"          <p>{p}</p>" for p in article["paragraphs"])
    schema = article_schema(article)

    return f"""<!DOCTYPE html>
<html lang="en" class="dark" data-page="article" data-page-title="{title}" data-page-description="{article['description']}" data-page-url="{url}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{article['description']}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{article['title']}">
  <meta property="og:description" content="{article['description']}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{article['title']}">
  <meta name="twitter:description" content="{article['description']}">
  <link rel="icon" href="../assets/favicon/favicon.ico" sizes="48x48">
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/apple-touch-icon.png">
  <link rel="manifest" href="../assets/favicon/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="../assets/js/theme-init.js"></script>
  <link rel="stylesheet" href="../assets/css/main.css?v=3">
  <link rel="stylesheet" href="../assets/css/dsynz-elite.css?v=40">
  {schema}
</head>
<body class="dsynz-app dsynz-article-page">
  <div class="site-noise" aria-hidden="true"></div>
  <div id="site-loader">{loader}</div>
  <div id="site-nav">{prefix_paths(nav)}</div>
  <main id="main">
    <article class="section-editorial insight-article-page" itemscope itemtype="https://schema.org/Article">
      <div class="container-narrow section-padding">
        <nav class="article-breadcrumb text-sm text-muted mb-8" aria-label="Breadcrumb">
          <a href="../index.html" class="hover:text-brand">Home</a>
          <span aria-hidden="true"> / </span>
          <a href="../blog.html" class="hover:text-brand">Insights</a>
          <span aria-hidden="true"> / </span>
          <span class="text-[var(--color-text)]">{article['category']}</span>
        </nav>
        <p class="eyebrow">{article['category']}</p>
        <h1 class="heading-display mt-6 text-balance" itemprop="headline">{article['title']}</h1>
        <p class="mt-4 text-sm text-muted">
          <time datetime="{article['datePublished']}" itemprop="datePublished">{article['datePublished']}</time>
          · DSYNZ Insights
        </p>
        <div class="insight-article-body mt-10 space-y-6 text-lead text-muted" itemprop="articleBody">
{body}
          <p class="text-lead text-[var(--color-text)] font-medium">{article['closing']}</p>
        </div>
        <div class="mt-14 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-10">
          <a href="../blog.html" class="btn-secondary">All insights</a>
          <a href="../services.html" class="btn-secondary">Explore what we do</a>
          <a href="../contact.html" class="btn-primary btn-magnetic" data-magnetic>Start with Clarity</a>
        </div>
      </div>
    </article>
  </main>
  <div id="site-footer">{prefix_paths(footer)}</div>
  <script type="module" src="../assets/js/main.js"></script>
  <script type="module" src="../assets/js/animations.js" defer></script>
  <script type="module" src="../assets/js/forms.js" defer></script>
</body>
</html>
"""


def main():
    BLOG_DIR.mkdir(exist_ok=True)
    loader, nav, footer = load_shell()
    for article in ARTICLES:
        path = BLOG_DIR / f"{article['slug']}.html"
        path.write_text(render_article(article, loader, nav, footer), encoding="utf-8")
        print(f"Wrote {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
