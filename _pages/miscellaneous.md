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

<h2 id="projects" hidden>Key projects</h2>

<div class="cv">
<div class="card p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Key projects</h3>
<div>
<ul class="card-text font-weight-light list-group list-group-flush misc-project-list">
{% for project in miscellaneous.projects %}
{% assign project_date = project.period | replace: '–', ' - ' %}
{% assign ministry_abbr = project.ministry | split: '(' | last | remove: ')' %}
{% assign agency_abbr = project.agency | split: '(' | last | remove: ')' %}

<li class="list-group-item">
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

<h2 id="miscellaneous-projects" hidden>Miscellaneous projects</h2>

<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Miscellaneous projects</h3>
<div>
<ul class="card-text font-weight-light list-group list-group-flush misc-project-list">
{% for project in miscellaneous.miscellaneous_projects %}
{% assign project_date = project.period | replace: '–', ' - ' %}
{% assign ministry_abbr = project.ministry | split: '(' | last | remove: ')' %}
{% assign agency_abbr = project.agency | split: '(' | last | remove: ')' %}

<li class="list-group-item">
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
<h2 id="domestic-papers" class="misc-section-title font-weight-medium">Domestic papers</h2>
<div class="misc-publications">
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for paper in miscellaneous.domestic_papers %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ paper.abbr }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ paper.title }}</h6>
      <div class="misc-publication-authors ml-1 ml-md-4">{{ paper.authors }}</div>
      <div class="misc-publication-meta ml-1 ml-md-4"><em>{{ paper.venue }}</em>, {{ paper.date }}{% if paper.note %}; {{ paper.note }}{% endif %}</div>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>
</section>

<section class="misc-publications-section">
<h2 id="intellectual-properties" class="misc-section-title font-weight-medium">Intellectual properties</h2>
<div class="misc-publications">
<h3 class="misc-subtitle" data-toc-skip>Patents</h3>
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for patent in miscellaneous.patents %}
{% assign patent_status = 'Filed' %}
{% if patent.status contains 'registered' %}{% assign patent_status = 'Granted' %}{% endif %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ patent_status }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ patent.title }}</h6>
      <div class="misc-publication-authors ml-1 ml-md-4">{{ patent.inventors }}</div>
      <div class="misc-publication-meta ml-1 ml-md-4">{{ patent.jurisdiction }} {{ patent.application }}{% if patent.registration %} · {{ patent.jurisdiction }} {{ patent.registration }}{% endif %}</div>
    </div>
  </div>
</li>
{% endfor %}
</ul>

<h3 class="misc-subtitle" data-toc-skip>Software registrations</h3>
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for software in miscellaneous.software %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">Software</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0">
      <h6 class="title ml-1 ml-md-4">{{ software.title }}</h6>
      <div class="misc-publication-authors ml-1 ml-md-4">{{ software.author }}</div>
      <div class="misc-publication-meta ml-1 ml-md-4">{{ software.registration }}</div>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>
</section>
