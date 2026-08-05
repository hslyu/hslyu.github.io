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
    <div class="misc-record-title misc-patent-title">{{ patent.title }}</div>
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

<h2 id="projects" hidden>Key projects</h2>

<div class="cv">
<div class="card mt-3 p-3 misc-project-card">
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
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ project.title }}</h6>
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

<script>
  window.addEventListener('load', () => {
    const titleLineLength = 65;
    const prepositions = new Set(
      'aboard about above across after against along amid among and around as at before behind below beneath beside besides between beyond by concerning considering despite down during except following for from in inside into like near of off on onto opposite outside over past regarding round since through throughout till to toward towards under underneath unlike until up upon versus via with within without'.split(
        ' '
      )
    );

    const wrapTitle = (title, lineLength) => {
      const segment = title.trim();
      if (segment.length <= lineLength) return [segment];

      const words = [...segment.matchAll(/\S+/g)];
      let breakAt = -1;

      for (let index = words.length - 1; index > 0; index -= 1) {
        const prefixLength = words[index].index - 1;
        if (prefixLength > lineLength) continue;

        const word = words[index][0].toLowerCase().replace(/[^a-z]/g, '');
        if (prepositions.has(word)) {
          breakAt = words[index].index;
          break;
        }
      }

      if (breakAt < 0) {
        breakAt = segment.lastIndexOf(' ', lineLength);
        if (breakAt < 1) breakAt = lineLength;
      }

      return [...wrapTitle(segment.slice(0, breakAt), lineLength), ...wrapTitle(segment.slice(breakAt), lineLength)];
    };

    const renderWrappedTitle = (titleElement, lineLength) => {
      const lines = wrapTitle(titleElement.textContent, lineLength);
      if (lines.length === 1) return;

      titleElement.replaceChildren(
        ...lines.flatMap((line, index) => (index === 0 ? [document.createTextNode(line)] : [document.createElement('br'), document.createTextNode(` ${line}`)]))
      );
    };

    document.querySelectorAll('.misc-record-title:not(.misc-patent-title)').forEach((titleElement) => renderWrappedTitle(titleElement, titleLineLength));
    document.querySelectorAll('.misc-patent-title').forEach((titleElement) => renderWrappedTitle(titleElement, 90));

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

    const toc = document.querySelector('#toc-sidebar');
    const recordGroups = [...document.querySelectorAll('.misc-records, .misc-project-list')];
    const records = recordGroups.flatMap((group) => [...group.querySelectorAll(':scope > .misc-record, :scope > .list-group-item')]);
    const yearsForRecord = (record) => {
      const years = [...record.textContent.matchAll(/\b(?:19|20)\d{2}\b/g)].map((match) => Number(match[0]));
      if (years.length < 2) return years;

      const [firstYear, lastYear] = [Math.min(...years), Math.max(...years)];
      return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);
    };
    const recordYears = new Map(records.map((record) => [record, yearsForRecord(record)]));
    const years = [...new Set([...recordYears.values()].flat())].sort((firstYear, secondYear) => secondYear - firstYear);

    if (toc && years.length) {
      const yearList = document.createElement('ul');
      yearList.className = 'toc-list misc-year-filter';

      const setYearFilter = (year) => {
        recordYears.forEach((recordYearList, record) => {
          record.hidden = year !== null && !recordYearList.includes(year);
        });

        recordGroups.forEach((group) => {
          const hasVisibleRecords = [...group.children].some((record) => !record.hidden);
          group.hidden = !hasVisibleRecords;
          group.closest('.misc-project-card')?.toggleAttribute('hidden', !hasVisibleRecords);
          group.previousElementSibling?.toggleAttribute('hidden', !hasVisibleRecords);
        });

        const intellectualProperties = document.querySelector('#intellectual-properties');
        if (intellectualProperties) {
          intellectualProperties.hidden = [...document.querySelectorAll('.misc-records')].slice(1).every((group) => group.hidden);
        }

        yearList.querySelectorAll('.toc-link').forEach((link) => link.classList.toggle('is-active-link', link.dataset.year === String(year)));
      };

      [null, ...years].forEach((year) => {
        const item = document.createElement('li');
        item.className = 'toc-list-item';

        const link = document.createElement('a');
        link.className = 'toc-link';
        link.href = '#';
        link.dataset.year = String(year);
        link.textContent = year ?? 'All';
        link.addEventListener('click', (event) => {
          event.preventDefault();
          setYearFilter(year);
        });

        item.appendChild(link);
        yearList.appendChild(item);
      });

      toc.appendChild(yearList);
      setYearFilter(null);
    }
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
      <h6 class="title font-weight-bold ml-1 ml-md-4">{{ project.title }}</h6>
      <h6 class="ml-1 ml-md-4" style="font-size: 0.95rem; font-style: italic">{{ ministry_abbr }}, {{ agency_abbr }}, {{ project.acknowledge }}</h6>
    </div>
  </div>
</li>

{% endfor %}

</ul>
</div>
</div>
</div>
