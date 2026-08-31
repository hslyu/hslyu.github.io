---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

{% capture publications_markup %}{% bibliography --query @*[website_hidden != true] %}{% endcapture %}
{% assign publications_markup = publications_markup | replace: '<ol class="bibliography">', '<ol class="bibliography" style="list-style: none;">' %}
{% assign publications_markup = publications_markup | replace: 'loading="eager"', 'loading="lazy"' %}
{% assign publications_markup = publications_markup | replace: 'Best Paper Award', '<span class="paper-award">Best Paper Award</span>' %}
{% capture secure_entry_marker %}id="secure_multihop"{% endcapture %}
{% assign secure_entry_head = publications_markup | split: secure_entry_marker | first %}
{% assign secure_entry_tail = publications_markup | split: secure_entry_marker | last %}
{% assign secure_entry_tail = secure_entry_tail | replace_first: '; <span class="paper-award">Best Paper Award</span>', '</div><div class="periodical"><span class="paper-award">Best Paper Award</span>' %}
{% capture publications_markup %}{{ secure_entry_head }}{{ secure_entry_marker }}{{ secure_entry_tail }}{% endcapture %}
{% assign venue_specs = 'joint_optimization|IEEE Trans. Commun.,dcfnet|IEEE Trans. Wireless Commun.,active_starris|IEEE Internet Things J.,unveiling_hidden|IEEE Trans. Neural Netw. Learn. Syst.,noniterative_aerial|IEEE Trans. Wireless Commun.,secure_connection|IEEE ICTC,accuracy_delay|GLOBECOMW,faithful_fast|ICMLW,maneuver_balloon|IEEE ICTC,privacy_uav|IEEE Access,autonomous_sem|IEEE IROS' | split: ',' %}
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

{% assign arxiv_entry_keys = 'lucid,scenebaker,end_to_end,secure_multihop,deeper_understanding,fed_zoe,jang2024rethinkingmodelinversionattacks,replace_perturb' | split: ',' %}
{% for entry_key in arxiv_entry_keys %}
{% capture entry_marker %}id="{{ entry_key }}"{% endcapture %}
{% assign entry_head = publications_markup | split: entry_marker | first %}
{% assign entry_tail = publications_markup | split: entry_marker | last %}
{% assign entry_periodical_parts = entry_tail | split: '<div class="periodical">' %}
{% assign venue_markup = entry_periodical_parts[1] | split: '</div>' | first %}
{% capture original_venue %}<div class="periodical">{{ venue_markup }}</div>{% endcapture %}
{% assign entry_tail = entry_tail | replace_first: original_venue, '' %}
{% capture publications_markup %}{{ entry_head }}{{ entry_marker }}{{ entry_tail }}{% endcapture %}
{% endfor %}

{% assign accepted_entry_tail = publications_markup | split: 'id="joint_optimization"' | last %}
{% assign accepted_periodical_parts = accepted_entry_tail | split: '<div class="periodical">' %}
{% assign accepted_venue_markup = accepted_periodical_parts[1] | split: '</div>' | first %}
{% assign accepted_note_markup = accepted_periodical_parts[2] | split: '</div>' | first %}
{% capture original_accepted_venue %}<div class="periodical">{{ accepted_venue_markup }}</div>{% endcapture %}
{% capture accepted_venue %}<div class="periodical">{{ accepted_venue_markup }} (Accepted)</div>{% endcapture %}
{% capture original_accepted_note %}<div class="periodical">{{ accepted_note_markup }}</div>{% endcapture %}
{% assign publications_markup = publications_markup | replace_first: original_accepted_venue, accepted_venue | replace_first: original_accepted_note, '' %}

{% assign title_break_specs = 'joint_optimization:62,dcfnet:64,end_to_end:63,active_starris:59,secure_multihop:39,unveiling_hidden:60,noniterative_aerial:59,secure_connection:58,accuracy_delay:42,fed_zoe:64,replace_perturb:50,privacy_uav:46' | split: ',' %}
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

{% assign title_link_keys = 'joint_optimization,dcfnet,active_starris,unveiling_hidden,noniterative_aerial,secure_connection,accuracy_delay,maneuver_balloon,privacy_uav,autonomous_sem' | split: ',' %}
{% assign title_link_keys = title_link_keys | concat: arxiv_entry_keys %}
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
{% assign has_before_2023 = false %}
{% for publication_section in publication_sections offset: 1 %}
{% assign publication_year = publication_section | split: '</h2>' | first | strip %}
{% assign publication_year_number = publication_year | plus: 0 %}
{% if publication_year_number > 2023 %}

<div class="toc-list-item{% if forloop.first %} is-active-li{% endif %}"><a class="toc-link{% if forloop.first %} is-active-link{% endif %}" href="#{{ publication_year }}">{{ publication_year }}</a></div>
{% elsif has_before_2023 == false %}
{% assign has_before_2023 = true %}
<div class="toc-list-item"><a class="toc-link" href="#before-2023">Before 2023</a></div>
{% endif %}
{% endfor %}
{% endcapture %}

<div class="row publications-layout">
<div class="col-sm-3">
<nav id="toc-sidebar" class="sticky-top toc toc-sidebar" aria-label="Table of contents">
<div class="toc-list">{{ publication_year_links }}</div>
</nav>
</div>

<div class="col-sm-9">
<div class="publications-content-marker" hidden></div>

<div class="publications">

{% assign before_2023_entries = '' %}
{% for publication_section in publication_sections offset: 1 %}
{% assign publication_section_parts = publication_section | split: '</h2>' %}
{% assign publication_year = publication_section_parts | first | strip %}
{% assign publication_entries = publication_section_parts | slice: 1, 999 | join: '</h2>' %}

{% assign publication_year_number = publication_year | plus: 0 %}
{% if publication_year_number > 2023 %}

<section class="publication-year-group" aria-labelledby="{{ publication_year }}">
  <h2 class="bibliography" id="{{ publication_year }}" data-toc-skip>{{ publication_year }}</h2>
  {{ publication_entries }}
</section>
{% else %}
{% assign before_2023_entries = before_2023_entries | append: publication_entries %}
{% endif %}
{% endfor %}

{% if before_2023_entries != '' %}

<section class="publication-year-group" aria-labelledby="before-2023">
  <h2 class="bibliography" id="before-2023" data-toc-skip>Before 2023</h2>
  {{ before_2023_entries }}
</section>
{% endif %}

</div>
</div>
</div>
