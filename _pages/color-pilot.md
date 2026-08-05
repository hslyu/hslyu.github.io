---
layout: page
permalink: /color-pilot/
title: color pilot
nav: false
---

<div class="color-pilot">
  <p class="color-pilot-intro">Choose a number to test it as the site’s main accent color. #29 Ocean is used in light mode; #15 Amber is used in dark mode.</p>

{% assign candidates = "Violet|#B509AC,Amethyst|#7C3AED,Indigo|#4F46E5,Cobalt|#1D4ED8,Royal Blue|#2563EB,Current Azure|#0369A1,Cerulean|#0077B6,Petrol|#155E75,Teal|#0F766E,Emerald|#047857,Forest|#15803D,Moss|#4D7C0F,Olive|#3F6212,Gold|#A16207,Amber|#B45309,Burnt Orange|#C2410C,Red|#B91C1C,Crimson|#BE123C,Burgundy|#881337,Berry|#A21CAF,Plum|#7E22CE,Deep Purple|#5B21B6,Midnight Blue|#172554,Slate|#334155,Graphite|#3F3F46,Coffee|#78350F,Walnut|#6F3B20,Wine|#9D174D,Ocean|#075985,Evergreen|#166534" | split: "," %}

  <div class="color-pilot-grid">
    {% for candidate in candidates %}
      {% assign candidate_parts = candidate | split: "|" %}
      <article class="color-pilot-card" style="--candidate: {{ candidate_parts[1] }}">
        <button class="color-pilot-swatch" type="button" data-color="{{ candidate_parts[1] }}" aria-label="Copy {{ candidate_parts[1] }} to clipboard"><span>#{{ forloop.index | prepend: "0" | slice: -2, 2 }}</span></button>
        <div class="color-pilot-card-body">
          <div class="color-pilot-name">{{ candidate_parts[0] }}</div>
          <code>{{ candidate_parts[1] }}</code>
          <div class="color-pilot-sample"><a href="#">Sample link</a><span>Research</span><strong>2026</strong></div>
        </div>
      </article>
    {% endfor %}
  </div>
</div>
