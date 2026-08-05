---
layout: page
permalink: /experiences/
title: experiences
nav: true
nav_order: 1
toc:
  sidebar: left
---

{% assign experience = site.data.portfolio.experience %}

<div class="experience-content-marker" hidden></div>

<div class="cv">
<h2 id="experience" hidden>Experience</h2>
<div class="card mt-3 p-3">
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
      <h6 class="affiliation-text ml-1 ml-md-4" style="font-size: 0.95rem">{{ job.organization }}{% if job.unit %}, {{ job.unit }}{% endif %}</h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="education" hidden>Education</h2>
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
      <h6 class="title font-weight-bold ml-1 ml-md-4">
        {{ education.degree }}, {{ education.field }}, <span class="affiliation-text">{{ education.school }}</span>
      </h6>
      {% if education.adviser %}
        <ul class="items"><li><span class="item">Advised by {{ education.adviser }}.</span></li></ul>
      {% endif %}
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="awards-honors" hidden>Awards & Honors</h2>
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
      <h6 class="affiliation-text ml-1 ml-md-4" style="font-size: 0.95rem">{{ award.organization }}</h6>
    </div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="academic-services" hidden>Academic Services</h2>
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
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 ml-1 ml-md-4">{{ venue.name }}</div>
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
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 ml-1 ml-md-4">{{ item.title }}{% if item.contribution %}, {{ item.contribution }}{% endif %}</div>
  </div>
</li>
{% endfor %}
</ul>
</div>

<h2 id="talks" hidden>Talks</h2>
<div class="card mt-3 p-3">
<h3 class="card-title font-weight-medium" data-toc-skip>Talks</h3>
{% for talk in experience.other_service.talks %}<ul class="card-text font-weight-light list-group list-group-flush"><li class="list-group-item">{{ talk }}</li></ul>{% endfor %}
</div>
</div>
