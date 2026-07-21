---
layout: page
hide-header: true
---

## Selected publications

<div class="publication-timeline">
<article><div class="publication-main"><img src="/assets/img/thumb.png" alt="Publication illustration"><div><h3>Secure Multi-Hop Relaying in Large-Scale Space-Air-Ground-Sea Integrated Networks</h3><p class="venue"><em>IEEE Internet of Things Journal</em> · 2026</p><p>Hyeonho Noh, Hyeonsu Lyu, Hyun Jong Yang, and Kaushik Chowdhury.</p><a href="https://arxiv.org/abs/2505.00573">Paper</a> · Best Paper Award</div></div></article>
<article><div class="publication-main"><img src="/assets/img/thumb.png" alt="Publication illustration"><div><h3>Non-iterative Optimization of Trajectory and Radio Resource for Aerial Network</h3><p class="venue"><em>IEEE Transactions on Wireless Communications</em> · 2025</p><p>Hyeonsu Lyu, Jonggyu Jang, Harim Lee, and Hyun Jong Yang.</p><a href="https://ieeexplore.ieee.org/document/10791413">Paper</a> · Best Paper Award · US Patent</div></div></article>
<article><div class="publication-main"><img src="/assets/img/thumb.png" alt="Publication illustration"><div><h3>On the Secure Connection Probability of Multi-Hop Relaying in Multi-Layer Networks</h3><p class="venue"><em>IEEE ICT Convergence</em> · 2025</p><p>Hyeonsu Lyu, Yumin Kim, and Hyun Jong Yang.</p><a href="https://arxiv.org/abs/2602.07958">Paper</a></div></div></article>
</div>

## Preprints

<ul class="compact-publications">
{% for item in site.data.publications.preprints %}<li><strong>{{ item.title }}</strong><br><span>{{ item.authors }} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if item.link %} · <a href="{{ item.link }}">Paper</a>{% endif %}</span></li>{% endfor %}
</ul>

## Other international journals

<ul class="compact-publications">
{% for item in site.data.publications.journals %}<li><strong>{{ item.title }}</strong><br><span>{{ item.authors }} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if item.link %} · <a href="{{ item.link }}">Paper</a>{% endif %}</span></li>{% endfor %}
</ul>

## Domestic conferences, other venues &amp; patents

<ul class="compact-publications">
{% for item in site.data.publications.conferences %}<li><strong>{{ item.title }}</strong><br><span>{{ item.authors }} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if item.link %} · <a href="{{ item.link }}">Paper</a>{% endif %}</span></li>{% endfor %}
</ul>
