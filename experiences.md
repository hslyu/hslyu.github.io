---
layout: page
hide-header: true
---

## Professional experience

<div class="career-timeline">
{% for item in site.data.experience.professional %}<article><time>{{ item.period }}</time><div><h3>{{ item.title }}</h3><p>{{ item.organization }}</p></div></article>{% endfor %}
</div>

## Education

<div class="career-timeline">
{% for item in site.data.experience.education %}<article><time>{{ item.period }}</time><div><h3>{{ item.degree }}</h3><p>{{ item.school }}{% if item.details %} · {{ item.details }}{% endif %}</p></div></article>{% endfor %}
</div>

## Honors and awards

<div class="award-cards">
{% for item in site.data.experience.awards %}<article><span>{{ item.year }}</span><h3>{{ item.title }}</h3><p>{{ item.organization }}</p></article>{% endfor %}
</div>

## Academic service

**Reviewer**

{% for item in site.data.experience.reviewer %}- {{ item }}
{% endfor %}

**Open-source localization**

- QGroundControl Korean localization — 2nd highest contributor, 2018–2021
- PX4 User Guide Korean localization, 2018–2021

**Talks**

- “The Role of Aerial Networks in 6G Wireless,” KICS Summer Conference, June 2025
