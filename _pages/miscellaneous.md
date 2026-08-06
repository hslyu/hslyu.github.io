---
layout: page
permalink: /miscellaneous/
title: miscellaneous
nav: true
nav_order: 3
---

{% assign miscellaneous = site.data.portfolio.miscellaneous %}
{% assign own_name = site.data.portfolio.site.name | escape %}
{% capture own_name_markup %}<span class="misc-author-highlight">{{ own_name }}</span>{% endcapture %}

<div class="row miscellaneous-layout">
<div class="col-sm-3">
<nav id="toc-sidebar" class="sticky-top toc toc-sidebar" aria-label="Table of contents">
<ul class="toc-list">
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#projects">Key projects</a></li>
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#miscellaneous-projects">Miscellaneous projects</a></li>
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#domestic-papers">Domestic papers</a></li>
  <li class="toc-list-item is-active-li"><a class="toc-link node-name--H2 is-active-link" href="#intellectual-properties">Intellectual properties</a></li>
</ul>
<div class="misc-year-filter">
  <input type="number" min="0" max="9999" placeholder="2017" aria-label="Filter from year">
  –
  <input type="number" min="0" max="9999" placeholder="2026" aria-label="Filter to year">
</div>
</nav>
</div>

<div class="col-sm-9">
<div class="miscellaneous-content-marker" hidden></div>

<h2 id="projects" data-toc-skip hidden>Key projects</h2>

<div class="cv">
<div class="card p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Key projects</h3>
<div>
<ul class="card-text font-weight-light list-group list-group-flush misc-project-list">
{% for project in miscellaneous.projects %}
{% assign project_date = project.period | replace: '–', ' - ' %}
{% assign project_year_from = project.period | slice: 0, 4 %}
{% assign project_year_to = project.period | slice: -4, 4 %}
{% assign ministry_abbr = project.ministry | split: '(' | last | remove: ')' %}
{% assign agency_abbr = project.agency | split: '(' | last | remove: ')' %}

<li class="list-group-item" data-year-from="{{ project_year_from }}" data-year-to="{{ project_year_to }}">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv">
        <tbody>
          <tr>
            <td>{% if project.period %}<span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ project_date }}</span>{% endif %}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ project.title }}</h6>
      <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ ministry_abbr }}, {{ agency_abbr }}, {{ project.acknowledge }}</h6>
      {% if project.links %}
        <div class="misc-project-links ml-1 ml-md-4">
          {% for link in project.links %}
            <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>{% unless forloop.last %} · {% endunless %}
          {% endfor %}
        </div>
      {% endif %}
    </div>
  </div>
</li>

{% endfor %}

</ul>
</div>
</div>
</div>

<h2 id="miscellaneous-projects" data-toc-skip hidden>Miscellaneous projects</h2>

<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Miscellaneous projects</h3>
<div>
<ul class="card-text font-weight-light list-group list-group-flush misc-project-list">
{% for project in miscellaneous.miscellaneous_projects %}
{% assign project_date = project.period | replace: '–', ' - ' %}
{% assign project_year_from = project.period | slice: 0, 4 %}
{% assign project_year_to = project.period | slice: -4, 4 %}
{% assign ministry_abbr = project.ministry | split: '(' | last | remove: ')' %}
{% assign agency_abbr = project.agency | split: '(' | last | remove: ')' %}

<li class="list-group-item" data-year-from="{{ project_year_from }}" data-year-to="{{ project_year_to }}">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv">
        <tbody>
          <tr>
            <td>{% if project.period %}<span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ project_date }}</span>{% endif %}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ project.title }}</h6>
      <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ ministry_abbr }}, {{ agency_abbr }}, {{ project.acknowledge }}</h6>
    </div>
  </div>
</li>

{% endfor %}

</ul>
</div>
</div>
</div>

<section class="misc-publications-section">
<h2 id="domestic-papers" data-toc-skip hidden>Domestic papers</h2>
<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Domestic papers</h3>
<div class="misc-publications">
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for paper in miscellaneous.domestic_papers %}
{% assign paper_year = paper.date | slice: -4, 4 %}
{% assign authors_markup = paper.authors | escape | replace: own_name, own_name_markup %}
<li class="list-group-item" data-year-from="{{ paper_year }}" data-year-to="{{ paper_year }}">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ paper.abbr }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ paper.title }}</h6>
      <div class="author ml-1 ml-md-4">{{ authors_markup }}</div>
      <div class="periodical ml-1 ml-md-4"><em>{{ paper.venue }}</em>, {{ paper.date }}{% if paper.note %}; {{ paper.note }}{% endif %}</div>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>
</div>
</div>
</section>

<section class="misc-publications-section">
<h2 id="intellectual-properties" data-toc-skip hidden>Intellectual properties</h2>
<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Intellectual properties</h3>
<div class="misc-publications">
<h3 class="misc-subtitle" data-toc-skip>Patents</h3>
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for patent in miscellaneous.patents %}
{% assign patent_status = 'Filed' %}
{% if patent.status contains 'registered' %}{% assign patent_status = 'Granted' %}{% endif %}
{% assign patent_application_parts = patent.application | split: '-' %}
{% assign patent_year = patent_application_parts[1] | slice: 0, 4 %}
{% assign inventors_markup = patent.inventors | escape | replace: own_name, own_name_markup %}
<li class="list-group-item"{% if patent_year != empty %} data-year-from="{{ patent_year }}" data-year-to="{{ patent_year }}"{% else %} hidden{% endif %}>
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ patent_status }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ patent.title }}</h6>
      <div class="author ml-1 ml-md-4">{{ inventors_markup }}</div>
      <div class="periodical ml-1 ml-md-4">{{ patent.jurisdiction }} {{ patent.application }}{% if patent.registration %} · {{ patent.jurisdiction }} {{ patent.registration }}{% endif %}</div>
    </div>
  </div>
</li>
{% endfor %}
</ul>

<h3 class="misc-subtitle" data-toc-skip>Software registrations</h3>
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for software in miscellaneous.software %}
{% assign software_registration_parts = software.registration | split: '-' %}
{% assign software_year = software_registration_parts[1] | slice: 0, 4 %}
{% assign author_markup = software.author | escape | replace: own_name, own_name_markup %}
<li class="list-group-item" data-year-from="{{ software_year }}" data-year-to="{{ software_year }}">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">Software</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ software.title }}</h6>
      <div class="author ml-1 ml-md-4">{{ author_markup }}</div>
      <div class="periodical ml-1 ml-md-4">{{ software.registration }}</div>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>
</div>
</div>
</section>
</div>
</div>
