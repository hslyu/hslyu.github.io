---
layout: page
permalink: /miscellaneous/
title: miscellaneous
nav: true
nav_order: 4
---

{% assign miscellaneous = site.data.portfolio.miscellaneous %}
{% assign own_name = site.data.portfolio.site.name | escape %}
{% capture own_name_markup %}<span class="misc-author-highlight">{{ own_name }}</span>{% endcapture %}

<div class="row miscellaneous-layout">
<div class="col-sm-3">
{% include portfolio/sidebar.liquid items="projects|Key projects,miscellaneous-projects|Miscellaneous projects,domestic-papers|Domestic papers,intellectual-properties|Intellectual properties" link_class="node-name--H2" %}
</div>

<div class="col-sm-9">
<div class="miscellaneous-content-marker" hidden></div>

{% include portfolio/project-card.liquid id="projects" title="Key projects" projects=miscellaneous.projects first=true %}

{% include portfolio/project-card.liquid id="miscellaneous-projects" title="Miscellaneous projects" projects=miscellaneous.miscellaneous_projects %}

<section class="misc-publications-section">
<h2 id="domestic-papers" data-toc-skip hidden>Domestic papers</h2>
<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Domestic papers</h3>
<div class="misc-publications">
<ul class="card-text font-weight-light list-group list-group-flush misc-publication-list">
{% for paper in miscellaneous.domestic_papers %}
{% assign authors_markup = paper.authors | escape | replace: own_name, own_name_markup %}
<li class="list-group-item">
  <div class="row">
    {% include portfolio/date-column.liquid label=paper.abbr %}
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
<li class="list-group-item"{% if patent_year == empty %} hidden{% endif %}>
  <div class="row">
    {% include portfolio/date-column.liquid label=patent_status %}
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
{% assign author_markup = software.author | escape | replace: own_name, own_name_markup %}
<li class="list-group-item">
  <div class="row">
    {% include portfolio/date-column.liquid label="Software" %}
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
