---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
toc:
  sidebar: left
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

<script>
  window.addEventListener('load', () => {
    const toc = document.querySelector('#toc-sidebar');
    const years = [...document.querySelectorAll('.publications h2.bibliography')];

    if (!toc || !years.length) return;

    const list = document.createElement('ul');
    list.className = 'toc-list';

    years.forEach((year) => {
      year.id = year.textContent.trim();

      const item = document.createElement('li');
      item.className = 'toc-list-item';

      const link = document.createElement('a');
      link.className = 'toc-link';
      link.href = `#${year.id}`;
      link.textContent = year.textContent.trim();
      link.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.replaceState(null, '', link.hash);
        year.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      item.appendChild(link);
      list.appendChild(item);
    });

    toc.replaceChildren(list);
    toc.addEventListener('dragstart', (event) => event.preventDefault());
  });
</script>
