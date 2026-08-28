---
layout: page
permalink: /demos/
title: demos
nav: true
nav_order: 3
---

{% assign demo_groups = site.data.portfolio.miscellaneous.demo_groups %}

<div class="demos-content-marker" hidden></div>

<div class="cv demos-page">
{% for group in demo_groups %}
{% assign demo_group_index = forloop.index0 %}
<div class="card{% unless forloop.first %} mt-3{% endunless %} p-3 misc-demo-card misc-demo-group">
<h2 class="misc-demo-group-title">{{ group.title }}</h2>
<div class="misc-demo-group-grid">
{% for demo in group.videos %}
{% assign is_local_page = false %}
{% if demo.page %}
{% assign demo_url = demo.page | relative_url %}
{% assign is_local_page = true %}
{% else %}
{% assign embed_target = demo.embed | split: '/embed/' | last %}
{% assign video_id = embed_target | split: '?' | first %}
{% if demo.embed contains 'videoseries' %}
{% assign playlist_id = demo.embed | split: 'list=' | last %}
{% assign demo_url = 'https://www.youtube.com/playlist?list=' | append: playlist_id %}
{% else %}
{% assign demo_url = 'https://www.youtube.com/watch?v=' | append: video_id %}
{% endif %}
{% endif %}
<article class="misc-demo-item">
  <h3 class="misc-demo-title"><a href="{{ demo_url }}"{% unless is_local_page %} target="_blank" rel="noopener noreferrer"{% endunless %}>{{ demo.title }}{% if is_local_page %}<span class="misc-demo-click-hint">(Click to view)</span>{% endif %}</a></h3>
  <div class="misc-demo-video">
    {% if is_local_page %}
    <a class="misc-demo-thumbnail" href="{{ demo_url }}" aria-label="Open {{ demo.title }} demo">
      <img src="{{ demo.thumbnail | relative_url }}" alt="">
    </a>
    {% elsif demo.embed contains 'videoseries' %}
    <a class="misc-demo-thumbnail misc-demo-playlist" href="{{ demo_url }}" target="_blank" rel="noopener noreferrer" aria-label="Open {{ demo.title }} playlist on YouTube">
      <span class="misc-demo-play">▶</span>
      <span class="misc-demo-playlist-label">Open playlist on YouTube</span>
    </a>
    {% else %}
    <div class="misc-demo-local-player">
      {% assign local_video_url = '/assets/videos/' | append: video_id | append: '.mp4' | relative_url %}
      {% assign poster_url = 'https://i.ytimg.com/vi/' | append: video_id | append: '/hqdefault.jpg' %}
      <video class="misc-demo-local-video"{% if demo_group_index == 0 %} src="{{ local_video_url }}" poster="{{ poster_url }}" preload="metadata"{% else %} data-src="{{ local_video_url }}" data-poster="{{ poster_url }}" preload="none"{% endif %} controls playsinline></video>
      <button class="misc-demo-local-play" type="button" aria-label="Play {{ demo.title }} locally">▶</button>
    </div>
    {% endif %}
  </div>
</article>
{% endfor %}
</div>
</div>
{% endfor %}
</div>
