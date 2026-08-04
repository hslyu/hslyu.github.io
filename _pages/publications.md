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

<div class="publications-content-marker" hidden></div>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

<script>
  window.addEventListener('load', () => {
    document.querySelectorAll('.publications .periodical').forEach((note) => {
      if (note.textContent.trim() !== 'Accepted') return;

      const periodical = note.previousElementSibling;
      if (!periodical?.classList.contains('periodical')) return;

      periodical.append(' (Accepted)');
      note.remove();
    });

    document.querySelectorAll('.publications .links a[href*="doi.org"], .publications .links a[href*="arxiv.org"]').forEach((publicationLink) => {
      const entry = publicationLink.closest('.row');
      const title = entry?.querySelector('.title');

      if (!title) return;

      const titleLink = document.createElement('a');
      titleLink.href = publicationLink.href;
      titleLink.target = '_blank';
      titleLink.rel = 'external nofollow noopener';
      titleLink.textContent = title.textContent;
      title.replaceChildren(titleLink);
      publicationLink.remove();

      if (!entry.querySelector('.links > *')) entry.querySelector('.links')?.remove();
    });

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
