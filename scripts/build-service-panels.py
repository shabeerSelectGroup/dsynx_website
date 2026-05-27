#!/usr/bin/env python3
"""Build HTML for all home service stage panels."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SERVICES = [
    {
        "icon": "chart",
        "path": 'd="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"',
        "title": "Business Strategy &amp; Consulting",
        "desc": "We help you understand where your business is, where it can go, and how technology can support that journey.",
    },
    {
        "icon": "layers",
        "path": 'd="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"',
        "title": "Product &amp; Service Conceptualization",
        "desc": "We turn ideas, challenges, and opportunities into clear product, service, platform, or system concepts.",
    },
    {
        "icon": "code",
        "path": 'd="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"',
        "title": "Web Application Development",
        "desc": "We build custom web applications, portals, dashboards, SaaS platforms, and workflow systems.",
    },
    {
        "icon": "mobile",
        "path": 'd="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"',
        "title": "Mobile App Development",
        "desc": "We create mobile apps designed around users, business goals, and real-world use.",
    },
    {
        "icon": "globe",
        "path": 'd="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-8.842 4.582m16.684 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m16.684 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"',
        "title": "Website Design &amp; Development",
        "desc": "We build websites that communicate clearly, represent your value, and support business growth.",
    },
]


def panel_html(service: dict, index: int) -> str:
    active = " is-active" if index == 0 else ""
    hidden = "" if index == 0 else " hidden"
    return f"""
    <div class="service-stage-panel-inner{active}" data-service-panel="{index}" role="tabpanel" id="service-panel-{index}"{hidden}>
      <div class="service-stage-visual" aria-hidden="true">
        <div class="service-stage-ring"></div>
        <div class="service-stage-glyph"><svg class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" {service['path']}/></svg></div>
        <div class="service-stage-grid"></div>
      </div>
      <p class="eyebrow">What we do</p>
      <h3 class="heading-section mt-4 text-[var(--color-text)]">{service['title']}</h3>
      <p class="mt-5 text-lead text-muted max-w-lg">{service['desc']}</p>
      <ul class="mt-8 flex flex-wrap gap-2" aria-label="Approach">
        <li class="tag-pill">Strategy-led</li>
        <li class="tag-pill">Growth-focused</li>
        <li class="tag-pill">Practical</li>
      </ul>
      <a href="services.html" class="btn-primary btn-magnetic mt-10" data-magnetic>View all services</a>
    </div>"""


def main():
    panels = "".join(panel_html(s, i) for i, s in enumerate(SERVICES))
    print(panels)


if __name__ == "__main__":
    main()
