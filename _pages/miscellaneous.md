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

<div class="misc-records">
{% for paper in miscellaneous.domestic_papers %}

<article class="misc-record">
  <div class="misc-record-index">{{ forloop.index }}</div>
  <div>
    <div class="misc-record-title">{{ paper.title }}</div>
    <div class="misc-record-authors">{{ paper.authors }}</div>
    <div class="misc-record-meta">{{ paper.venue }} · {{ paper.date }}{% if paper.note %} · {{ paper.note }}{% endif %}</div>
  </div>
</article>

{% endfor %}

</div>

## Intellectual properties

<h3 data-toc-skip>Patents</h3>

<div class="misc-records">
{% for patent in miscellaneous.patents %}

<article class="misc-record">
  <div class="misc-record-index">{{ forloop.index }}</div>
  <div>
    <div class="misc-record-title">{{ patent.title }}</div>
    <div class="misc-record-authors">{{ patent.inventors }}</div>
    <div class="misc-record-meta">{{ patent.jurisdiction }} {{ patent.application }} · {{ patent.status }}{% if patent.registration %} · {{ patent.jurisdiction }} {{ patent.registration }}{% endif %}</div>
  </div>
</article>

{% endfor %}

</div>

<h3 data-toc-skip>Software registrations</h3>

<div class="misc-records">
{% for software in miscellaneous.software %}

<article class="misc-record">
  <div class="misc-record-index">{{ forloop.index }}</div>
  <div>
    <div class="misc-record-title">{{ software.title }}</div>
    <div class="misc-record-authors">{{ software.author }}</div>
    <div class="misc-record-meta">{{ software.registration }}</div>
  </div>
</article>

{% endfor %}

</div>

## Projects

<div class="card mt-3 p-3 misc-project-card">
<ul class="card-text font-weight-light list-group list-group-flush misc-project-list">
{% for project in miscellaneous.projects %}
{% assign project_date = project.period | replace: '–', ' - ' %}

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
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ project.title }}</h6>
      <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ project.funding }}</h6>
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

## Miscellaneous projects

<div class="card mt-3 p-3 misc-project-card">
<ul class="card-text font-weight-light list-group list-group-flush misc-project-list">
{% for project in miscellaneous.miscellaneous_projects %}
{% assign project_date = project.period | replace: '–', ' - ' %}

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
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ project.title }}</h6>
      <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ project.funding }}</h6>
    </div>
  </div>
</li>

{% endfor %}

</ul>
</div>
