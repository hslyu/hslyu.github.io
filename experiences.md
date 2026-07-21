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

## Open-source localization

I was one of the first contributors to translate QGroundControl completely into Korean. The localization has helped Korean children and beginners learn to fly drones in their native language. I was the second-highest contributor to QGroundControl localization from 2018 to 2021 and also contributed to the PX4 User Guide localization during that period.

Related coverage: [1](https://youtu.be/zAfdtokYn-M?t=3035), [2](https://youtu.be/SGRnWE7QFdA), [3](https://youtu.be/Rk40Sy200kM), [4](https://blog.naver.com/wrmmcssn9376/223718531085?trackingCode=blog_bloghome_searchlist).

## Talks

- “The Role of Aerial Networks in 6G Wireless,” KICS Summer Conference, June 2025
