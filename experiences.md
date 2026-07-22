---
layout: page
hide-header: true
---

## Professional experience

<div class="career-timeline">
{% for item in site.data.experience.professional %}<article><time>{{ item.period }}</time><div><h3>{{ item.title }}</h3><p class="institution institution--{{ item.brand }}">{{ item.organization }}</p></div></article>{% endfor %}
</div>

## Education

<div class="career-timeline">
{% for item in site.data.experience.education %}<article><time>{{ item.period }}</time><div><h3>{{ item.degree }}</h3><p><span class="institution institution--{{ item.brand }}">{{ item.school }}</span>{% if item.details %} · {{ item.details }}{% endif %}</p></div></article>{% endfor %}
</div>

## Honors and awards

<div class="award-cards">
{% for item in site.data.experience.awards %}<article{% if item.card_class %} class="{{ item.card_class }}"{% endif %}><span>{{ item.year }}</span><h3>{{ item.title }}</h3><p class="institution institution--{{ item.brand }}">{{ item.organization }}</p></article>{% endfor %}
</div>

## Academic service

<p class="subsection-label"><strong>Reviewer</strong></p>

{% for item in site.data.experience.reviewer %}- {{ item }}
{% endfor %}

<p class="subsection-label"><strong>Open-source localization</strong></p>

- QGroundControl Korean localization — 2nd highest contributor, 2018–2021
- PX4 User Guide Korean localization, 2018–2021

<p class="subsection-label"><strong>Talks</strong></p>

- “The Role of Aerial Networks in 6G Wireless,” KICS Summer Conference, June 2025
