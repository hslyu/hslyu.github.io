---
layout: about
title: about
permalink: /
subtitle: Postdoctoral Researcher at <a href="https://sites.google.com/view/aislsnu/home">AiSLab</a>, Seoul National University

profile:
  align: right
  image: me_profile.png
  more_info: >
    <p class="profile-email">email: <span class="profile-email-address"><span>hs</span><code>dot</code><span>lyu</span><code>at</code><span>snu</span><code>dot</code><span>ac</span><code>dot</code><span>kr</span></span></p>

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

{{ site.data.portfolio.home.summary }}

{{ site.data.portfolio.home.mission }}

## Research interests

{% for interest in site.data.portfolio.home.research_interests %}

- {{ interest }}
  {% endfor %}
