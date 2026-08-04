---
layout: page
permalink: /miscellaneous/
title: miscellaneous
nav: true
nav_order: 3
toc:
  sidebar: left
---

{% assign miscellaneous = site.data.portfolio.miscellaneous %}

<div class="miscellaneous-content-marker" hidden></div>

## Domestic papers

{% for paper in miscellaneous.domestic_papers %}

{{ forloop.index }}. {{ paper.authors }}, “{{ paper.title }},” _{{ paper.venue }}_, {{ paper.date }}.{% if paper.note %} {{ paper.note }}.{% endif %}

{% endfor %}

## Intellectual properties

<h3 data-toc-skip>Patents</h3>

{% for patent in miscellaneous.patents %}

{{ forloop.index }}. {{ patent.inventors }}, “{{ patent.title }},” {{ patent.jurisdiction }} {{ patent.application }} ({{ patent.status | downcase }}){% if patent.registration %}; registered as {{ patent.jurisdiction }} {{ patent.registration }}{% endif %}.

{% endfor %}

<h3 data-toc-skip>Software registrations</h3>

{% for software in miscellaneous.software %}

{{ forloop.index }}. {{ software.author }}, “{{ software.title }},” {{ software.registration }}.

{% endfor %}

## Projects

{% for project in miscellaneous.projects %}

<h3 data-toc-skip>{{ project.title }}</h3>

{% if project.period %}{{ project.period }}<br>
{% endif %}{{ project.funding }}

{% if project.links %}
{% for link in project.links %}
[{{ link.label }}]({{ link.url }}){% unless forloop.last %} · {% endunless %}
{% endfor %}
{% endif %}

{% endfor %}

## Miscellaneous projects

{% for project in miscellaneous.miscellaneous_projects %}

- **{{ project.title }}**{% if project.period %} · {{ project.period }}{% endif %}<br>
  {{ project.funding }}

{% endfor %}

## Academic service

{% for service in site.data.portfolio.experience.reviewer %}

- {{ service }}

{% endfor %}

## Community contribution

{% for contribution in site.data.portfolio.experience.other_service.localization %}

- {{ contribution }}

{% endfor %}

{% for talk in site.data.portfolio.experience.other_service.talks %}

- _{{ talk }}_

{% endfor %}
