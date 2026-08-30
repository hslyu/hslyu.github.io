---
layout: page
permalink: /color-pilot/
title: color pilot
nav: false
---

<div class="color-pilot">
  <p class="color-pilot-intro">Choose a number to test it as the site’s main accent color. #29 Ocean is used in light mode; #15 Amber is used in dark mode.</p>

  <div class="color-pilot-grid">
    {% for candidate in site.data.color_palette %}
      <article class="color-pilot-card" style="--candidate: {{ candidate.hex }}">
        <button class="color-pilot-swatch" type="button" data-color="{{ candidate.hex }}" aria-label="Copy {{ candidate.hex }} to clipboard"><span>#{{ forloop.index | prepend: "0" | slice: -2, 2 }}</span></button>
        <div class="color-pilot-card-body">
          <div class="color-pilot-name">{{ candidate.name }}</div>
          <code>{{ candidate.hex }}</code>
          <div class="color-pilot-sample"><a href="#">Sample link</a><span>Research</span><strong>2026</strong></div>
        </div>
      </article>
    {% endfor %}
  </div>
</div>
