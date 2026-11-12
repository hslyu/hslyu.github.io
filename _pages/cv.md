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
{% include portfolio/sidebar.liquid items="experience|Experience,education|Education,awards-honors|Awards & Honors,academic-services|Academic Services,talks|Talks" active="experience" link_class="node-name--H2" %}
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
    {% include portfolio/date-column.liquid label=job.years location=job.location %}
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ job.title }}</h6>
      <h6 class="affiliation-text ml-1 ml-md-4"><span class="experience-institution">{% include portfolio/branded-text.liquid text=job.organization brands=experience.affiliation_brands %}{% if job.unit %}, {{ job.unit }}{% endif %}</span></h6>
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
    {% include portfolio/date-column.liquid label=education.years location=education.location %}
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ education.degree }}</h6>
      <h6 class="education-details affiliation-text ml-1 ml-md-4">
        {{ education.field }}, <span class="education-institution">{% include portfolio/branded-text.liquid text=education.school brands=experience.affiliation_brands %}</span>{% if education.adviser %}. Advised by {{ education.adviser }}.{% endif %}
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
    {% include portfolio/date-column.liquid label=award.year %}
    <div class="col-xs-10 col-sm-10 col-md-10 mt-2 mt-md-0 cv-entry-copy">
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ award.title }}</h6>
      <h6 class="affiliation-text ml-1 ml-md-4">{% include portfolio/branded-text.liquid text=award.organization brands=experience.affiliation_brands %}</h6>
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
    {% include portfolio/date-column.liquid label=venue.years %}
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
    {% include portfolio/date-column.liquid label=item.years %}
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
