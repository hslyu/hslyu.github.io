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

<h3 class="misc-subtitle" data-toc-skip>Patents</h3>

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

<h3 class="misc-subtitle" data-toc-skip>Software registrations</h3>

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

<h2 id="projects" hidden>Projects</h2>

<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Projects</h3>
<div>
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
</div>
</div>

<script>
  window.addEventListener('load', () => {
    const titleLineLength = 65;
    const prepositions = new Set(
      'aboard about above across after against along amid among and around as at before behind below beneath beside besides between beyond by concerning considering despite down during except following for from in inside into like near of off on onto opposite outside over past regarding round since through throughout till to toward towards under underneath unlike until up upon versus via with within without'.split(
        ' '
      )
    );

    const wrapTitle = (title) => {
      const segment = title.trim();
      if (segment.length <= titleLineLength) return [segment];

      const words = [...segment.matchAll(/\S+/g)];
      let breakAt = -1;

      for (let index = words.length - 1; index > 0; index -= 1) {
        const prefixLength = words[index].index - 1;
        if (prefixLength > titleLineLength) continue;

        const word = words[index][0].toLowerCase().replace(/[^a-z]/g, '');
        if (prepositions.has(word)) {
          breakAt = words[index].index;
          break;
        }
      }

      if (breakAt < 0) {
        breakAt = segment.lastIndexOf(' ', titleLineLength);
        if (breakAt < 1) breakAt = titleLineLength;
      }

      return [...wrapTitle(segment.slice(0, breakAt)), ...wrapTitle(segment.slice(breakAt))];
    };

    document.querySelectorAll('.misc-record-title').forEach((titleElement) => {
      const lines = wrapTitle(titleElement.textContent);
      if (lines.length === 1) return;

      titleElement.replaceChildren(
        ...lines.flatMap((line, index) => (index === 0 ? [document.createTextNode(line)] : [document.createElement('br'), document.createTextNode(` ${line}`)]))
      );
    });

    const projectTargets = {
      '#projects': document.querySelector('#projects + .cv .misc-project-card'),
      '#miscellaneous-projects': document.querySelector('#miscellaneous-projects + .cv .misc-project-card'),
    };

    document.querySelectorAll('#toc-sidebar a').forEach((link) => {
      const target = projectTargets[new URL(link.href).hash];
      if (!target) return;

      link.addEventListener(
        'click',
        (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.history.replaceState(null, '', link.hash);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        true
      );
    });
  });
</script>

<h2 id="miscellaneous-projects" hidden>Miscellaneous projects</h2>

<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
<h3 class="card-title font-weight-medium" data-toc-skip>Miscellaneous projects</h3>
<div>
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
</div>
</div>
