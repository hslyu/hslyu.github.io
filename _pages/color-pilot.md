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

<script>
  document.querySelectorAll('.color-pilot-swatch').forEach((swatch) => {
    swatch.addEventListener('click', async () => {
      const color = swatch.dataset.color;

      try {
        await navigator.clipboard.writeText(color);
      } catch {
        const input = document.createElement('textarea');
        input.value = color;
        document.body.append(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }

      const label = swatch.querySelector('span');
      const originalLabel = label.textContent;
      label.textContent = 'Copied';
      setTimeout(() => (label.textContent = originalLabel), 1200);
    });
  });
</script>

<style>
  .color-pilot-intro {
    color: var(--global-text-color-light);
    margin-bottom: 1.5rem;
  }

  .color-pilot-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  }

  .color-pilot-card {
    background: var(--global-card-bg-color);
    border: 1px solid var(--global-divider-color);
    border-radius: 0.45rem;
    overflow: hidden;
  }

  .color-pilot-swatch {
    align-items: flex-end;
    background: var(--candidate);
    border: 0;
    color: inherit;
    cursor: pointer;
    display: flex;
    height: 4.5rem;
    justify-content: flex-end;
    padding: 0.55rem 0.65rem;
    width: 100%;
  }

  .color-pilot-swatch:focus-visible {
    outline: 3px solid var(--global-theme-color);
    outline-offset: -3px;
  }

  .color-pilot-swatch span {
    color: #fff;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .color-pilot-card-body {
    padding: 0.7rem 0.8rem 0.8rem;
  }

  .color-pilot-name {
    font-weight: 700;
    line-height: 1.3;
  }

  .color-pilot-card code {
    color: var(--candidate);
    font-size: 0.82rem;
  }

  .color-pilot-sample {
    align-items: center;
    display: flex;
    font-size: 0.79rem;
    gap: 0.45rem;
    margin-top: 0.7rem;
  }

  .color-pilot-sample a {
    color: var(--candidate);
    font-weight: 600;
  }

  .color-pilot-sample span {
    border-left: 1px solid var(--global-divider-color);
    color: var(--global-text-color-light);
    padding-left: 0.45rem;
  }

  .color-pilot-sample strong {
    background: var(--candidate);
    border-radius: 0.2rem;
    color: #fff;
    font-size: 0.7rem;
    padding: 0.1rem 0.3rem;
  }
</style>
