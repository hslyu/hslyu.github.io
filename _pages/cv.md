---
layout: page
permalink: /experiences/
title: experiences
nav: true
nav_order: 1
---

{% assign experience = site.data.portfolio.experience %}

<div class="row experience-layout">
<div class="col-sm-3">
<nav id="toc-sidebar" class="sticky-top toc toc-sidebar" aria-label="Table of contents">
<ul class="toc-list">
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#experience">Experience</a></li>
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#education">Education</a></li>
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#awards-honors">Awards & Honors</a></li>
  <li class="toc-list-item"><a class="toc-link node-name--H2" href="#academic-services">Academic Services</a></li>
  <li class="toc-list-item is-active-li"><a class="toc-link node-name--H2 is-active-link" href="#talks">Talks</a></li>
</ul>
</nav>
</div>

<div class="col-sm-9">
<div class="experience-content-marker" hidden></div>

<div class="cv">
<h2 id="experience" data-toc-skip hidden>Experience</h2>
<div class="card p-3">
<h3 class="card-title font-weight-medium" data-toc-skip>Experience</h3>
<ul class="card-text font-weight-light list-group list-group-flush">
{% for job in experience.professional %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv">
        <tbody>
          <tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ job.years }}</span></td></tr>
          <tr><td><p class="location"><i class="fa-solid fa-location-dot iconlocation"></i> {{ job.location }}</p></td></tr>
        </tbody>
      </table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ job.title }}</h6>
      {% assign organization_markup = job.organization | escape %}
      {% for brand in experience.affiliation_brands %}
        {% assign brand_name = brand.name | escape %}
        {% capture brand_markup %}<span class="affiliation-brand-{{ brand.slug }}">{{ brand_name }}</span>{% endcapture %}
        {% assign organization_markup = organization_markup | replace: brand_name, brand_markup %}
      {% endfor %}
      <h6 class="affiliation-text ml-1 ml-md-4" style="font-size: 0.95rem">{{ organization_markup }}{% if job.unit %}, {{ job.unit }}{% endif %}</h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="education" data-toc-skip hidden>Education</h2>
<div class="card mt-3 p-3">
<h3 class="card-title font-weight-medium" data-toc-skip>Education</h3>
<ul class="card-text font-weight-light list-group list-group-flush">
{% for education in experience.education %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv">
        <tbody>
          <tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ education.years }}</span></td></tr>
          <tr><td><p class="location"><i class="fa-solid fa-location-dot iconlocation"></i> {{ education.location }}</p></td></tr>
        </tbody>
      </table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ education.degree }}</h6>
      {% assign school_markup = education.school | escape %}
      {% for brand in experience.affiliation_brands %}
        {% assign brand_name = brand.name | escape %}
        {% capture brand_markup %}<span class="affiliation-brand-{{ brand.slug }}">{{ brand_name }}</span>{% endcapture %}
        {% assign school_markup = school_markup | replace: brand_name, brand_markup %}
      {% endfor %}
      <h6 class="education-details affiliation-text ml-1 ml-md-4" style="font-size: 0.95rem">
        {{ education.field }}, {{ school_markup }}{% if education.adviser %}. Advised by {{ education.adviser }}.{% endif %}
      </h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="awards-honors" data-toc-skip hidden>Awards & Honors</h2>
<div class="card mt-3 p-3">
<h3 class="card-title font-weight-medium" data-toc-skip>Awards & Honors</h3>
<ul class="card-text font-weight-light list-group list-group-flush">
{% for award in experience.awards %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ award.year }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ award.title }}</h6>
      {% assign organization_markup = award.organization | escape %}
      {% for brand in experience.affiliation_brands %}
        {% assign brand_name = brand.name | escape %}
        {% capture brand_markup %}<span class="affiliation-brand-{{ brand.slug }}">{{ brand_name }}</span>{% endcapture %}
        {% assign organization_markup = organization_markup | replace: brand_name, brand_markup %}
      {% endfor %}
      <h6 class="affiliation-text ml-1 ml-md-4" style="font-size: 0.95rem">{{ organization_markup }}</h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="academic-services" data-toc-skip hidden>Academic Services</h2>
<div class="card mt-3 p-3">
<h3 class="card-title font-weight-medium" data-toc-skip>Academic Services</h3>
<h4 class="misc-subtitle">Reviewer</h4>
<ul class="card-text font-weight-light list-group list-group-flush academic-service-list">
{% for venue in experience.reviewer %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ venue.years }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title ml-1 ml-md-4">{{ venue.name }}</h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
<h4 class="misc-subtitle mt-3">Open Source & Localization</h4>
<ul class="card-text font-weight-light list-group list-group-flush academic-service-list">
{% for item in experience.other_service.localization %}
<li class="list-group-item">
  <div class="row">
    <div class="col-xs-2 col-sm-2 col-md-2 text-center date-column">
      <table class="table-cv"><tbody><tr><td><span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px">{{ item.years }}</span></td></tr></tbody></table>
    </div>
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title ml-1 ml-md-4">{{ item.title }}{% if item.contribution %}, {{ item.contribution }}{% endif %}</h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="talks" data-toc-skip hidden>Talks</h2>
<div class="card mt-3 p-3">
<h3 class="card-title font-weight-medium" data-toc-skip>Talks</h3>
{% for talk in experience.other_service.talks %}<ul class="card-text font-weight-light list-group list-group-flush"><li class="list-group-item">{{ talk }}</li></ul>{% endfor %}
</div>
</div>
</div>
</div>
