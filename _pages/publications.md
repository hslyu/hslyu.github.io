---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

{% capture publications_markup %}{% bibliography %}{% endcapture %}
{% assign publications_markup = publications_markup | replace: 'Best Paper Award', '<span class="paper-award">Best Paper Award</span>' %}
{% assign venue_specs = 'joint_optimization|IEEE Trans. Commun.,dcfnet|IEEE Trans. Wireless Commun.,active_starris|IEEE Internet Things J.,unveiling_hidden|IEEE Trans. Neural Netw. Learn. Syst.,noniterative_aerial|IEEE Trans. Wireless Commun.,secure_connection|IEEE ICTC,accuracy_delay|GLOBECOMW,faithful_fast|ICMLW,maneuver_balloon|IEEE ICTC,multiagent_coverage|IEEE ICTC,privacy_uav|IEEE Access,robust_autofocus|MMA,autonomous_sem|IEEE IROS' | split: ',' %}
{% for venue_spec in venue_specs %}
{% assign venue_parts = venue_spec | split: '|' %}
{% assign entry_key = venue_parts[0] %}
{% assign venue_abbreviation = venue_parts[1] %}
{% capture entry_marker %}id="{{ entry_key }}"{% endcapture %}
{% assign entry_tail = publications_markup | split: entry_marker | last %}
{% assign entry_periodical_parts = entry_tail | split: '<div class="periodical">' %}
{% assign venue_markup = entry_periodical_parts[1] | split: '</div>' | first %}
{% assign full_venue_parts = venue_markup | split: '<em>' %}
{% assign full_venue = full_venue_parts[1] | split: '</em>' | first %}
{% capture original_venue %}<em>{{ full_venue }}</em>{% endcapture %}
{% capture abbreviated_venue %}<em>{{ venue_abbreviation }}<span class="sr-only"> {{ full_venue }}</span></em>{% endcapture %}
{% assign publications_markup = publications_markup | replace_first: original_venue, abbreviated_venue %}
{% endfor %}

{% assign arxiv_entry_keys = 'end_to_end,secure_multihop,deeper_understanding,fed_zoe,replace_perturb' | split: ',' %}
{% for entry_key in arxiv_entry_keys %}
{% capture entry_marker %}id="{{ entry_key }}"{% endcapture %}
{% assign entry_tail = publications_markup | split: entry_marker | last %}
{% assign entry_periodical_parts = entry_tail | split: '<div class="periodical">' %}
{% assign venue_markup = entry_periodical_parts[1] | split: '</div>' | first %}
{% capture original_venue %}<div class="periodical">{{ venue_markup }}</div>{% endcapture %}
{% assign publications_markup = publications_markup | replace_first: original_venue, '' %}
{% endfor %}

{% assign accepted_entry_tail = publications_markup | split: 'id="joint_optimization"' | last %}
{% assign accepted_periodical_parts = accepted_entry_tail | split: '<div class="periodical">' %}
{% assign accepted_venue_markup = accepted_periodical_parts[1] | split: '</div>' | first %}
{% assign accepted_note_markup = accepted_periodical_parts[2] | split: '</div>' | first %}
{% capture original_accepted_venue %}<div class="periodical">{{ accepted_venue_markup }}</div>{% endcapture %}
{% capture accepted_venue %}<div class="periodical">{{ accepted_venue_markup }} (Accepted)</div>{% endcapture %}
{% capture original_accepted_note %}<div class="periodical">{{ accepted_note_markup }}</div>{% endcapture %}
{% assign publications_markup = publications_markup | replace_first: original_accepted_venue, accepted_venue | replace_first: original_accepted_note, '' %}

{% assign title_break_specs = 'joint_optimization:62,dcfnet:64,end_to_end:63,active_starris:59,secure_multihop:25,unveiling_hidden:60,noniterative_aerial:59,secure_connection:58,accuracy_delay:42,deeper_understanding:45,fed_zoe:64,replace_perturb:50,multiagent_coverage:62,privacy_uav:46,robust_autofocus:53' | split: ',' %}
{% for title_break_spec in title_break_specs %}
{% assign title_break_parts = title_break_spec | split: ':' %}
{% assign entry_key = title_break_parts[0] %}
{% assign break_at = title_break_parts[1] | plus: 0 %}
{% capture entry_marker %}id="{{ entry_key }}"{% endcapture %}
{% assign entry_tail = publications_markup | split: entry_marker | last %}
{% assign entry_title_parts = entry_tail | split: '<div class="title">' %}
{% assign entry_title_section = entry_title_parts[1] %}
{% assign entry_title = entry_title_section | split: '</div>' | first %}
{% assign first_title_line = entry_title | slice: 0, break_at | strip %}
{% assign second_title_line = entry_title | slice: break_at, 999 | strip %}
{% capture original_title %}<div class="title">{{ entry_title }}</div>{% endcapture %}
{% capture wrapped_title %}<div class="title">{{ first_title_line }}<br> {{ second_title_line }}</div>{% endcapture %}
{% assign publications_markup = publications_markup | replace_first: original_title, wrapped_title %}
{% endfor %}

{% assign title_link_keys = 'joint_optimization,dcfnet,end_to_end,active_starris,secure_multihop,unveiling_hidden,noniterative_aerial,secure_connection,accuracy_delay,deeper_understanding,fed_zoe,replace_perturb,maneuver_balloon,multiagent_coverage,privacy_uav,robust_autofocus,autonomous_sem' | split: ',' %}
{% for entry_key in title_link_keys %}
{% capture entry_marker %}id="{{ entry_key }}"{% endcapture %}
{% assign entry_tail = publications_markup | split: entry_marker | last %}
{% assign entry_title_parts = entry_tail | split: '<div class="title">' %}
{% assign entry_title = entry_title_parts[1] | split: '</div>' | first %}
{% assign entry_link_parts = entry_tail | split: '<div class="links">' %}
{% assign entry_link_markup = entry_link_parts[1] | split: '</div>' | first %}
{% assign entry_link_href = entry_link_markup | split: 'href="' | last | split: '"' | first %}
{% capture original_title %}<div class="title">{{ entry_title }}</div>{% endcapture %}
{% capture linked_title %}<div class="title"><a href="{{ entry_link_href }}" target="_blank" rel="external nofollow noopener">{{ entry_title }}</a></div>{% endcapture %}
{% capture original_links %}<div class="links">{{ entry_link_markup }}</div>{% endcapture %}
{% assign publications_markup = publications_markup | replace_first: original_title, linked_title | replace_first: original_links, '' %}
{% endfor %}

{% assign publication_sections = publications_markup | split: '<h2 class="bibliography">' %}
{% capture publication_year_links %}
{% for publication_section in publication_sections offset: 1 %}
{% assign publication_year = publication_section | split: '</h2>' | first | strip %}
{% if forloop.first %}{% assign publication_max_year = publication_year %}{% endif %}
{% assign publication_min_year = publication_year %}

<li class="toc-list-item{% if forloop.first %} is-active-li{% endif %}"><a class="toc-link{% if forloop.first %} is-active-link{% endif %}" href="#{{ publication_year }}">{{ publication_year }}</a></li>
{% endfor %}
{% endcapture %}

<div class="row publications-layout">
<div class="col-sm-3">
<nav id="toc-sidebar" class="sticky-top toc toc-sidebar" aria-label="Table of contents">
<ul class="toc-list">{{ publication_year_links }}</ul>
<div class="publication-filters">
  <div class="publication-year-filter">
    <input type="number" min="0" max="9999" placeholder="{{ publication_min_year }}" aria-label="Filter from year">
    –
    <input type="number" min="0" max="9999" placeholder="{{ publication_max_year }}" aria-label="Filter to year">
  </div>
  <div class="publication-search">
    <input autocomplete="off" class="search bibsearch-form-input" id="bibsearch" placeholder="Type to filter" spellcheck="false">
  </div>
</div>
</nav>
</div>

<div class="col-sm-9">
<div class="publications-content-marker" hidden></div>

<script src="/assets/js/bibsearch.js" type="module"></script>

<div class="publications is-ready">

{% for publication_section in publication_sections offset: 1 %}
{% assign publication_section_parts = publication_section | split: '</h2>' %}
{% assign publication_year = publication_section_parts | first | strip %}
{% assign publication_entries = publication_section_parts | slice: 1, 999 | join: '</h2>' %}

<section class="publication-year-group" aria-labelledby="{{ publication_year }}">
  <h2 class="bibliography" id="{{ publication_year }}" data-toc-skip>{{ publication_year }}</h2>
  {{ publication_entries }}
</section>
{% endfor %}

</div>
</div>
</div>
