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
    const titleLineLength = 65;
    const prepositions = new Set(
      'aboard about above across after against along amid among and around as at before behind below beneath beside besides between beyond by concerning considering despite down during except following for from in inside into like near of off on onto opposite outside over past regarding round since through throughout till to toward towards under underneath unlike until up upon versus via with within without'.split(
        ' '
      )
    );

    const wrapTitle = (title) => {
      const segment = title.trim();
      if (segment.length <= titleLineLength) return [segment];

      const words = [...segment.matchAll(/\S+/g)];
      let breakAt = -1;

      for (let index = words.length - 1; index > 0; index -= 1) {
        const prefixLength = words[index].index - 1;
        if (prefixLength > titleLineLength) continue;

        const word = words[index][0].toLowerCase().replace(/[^a-z]/g, '');
        if (prepositions.has(word)) {
          breakAt = words[index].index;
          break;
        }
      }

      if (breakAt < 0) {
        breakAt = segment.lastIndexOf(' ', titleLineLength);
        if (breakAt < 1) breakAt = titleLineLength;
      }

      return [...wrapTitle(segment.slice(0, breakAt)), ...wrapTitle(segment.slice(breakAt))];
    };

    const renderWrappedTitle = (titleElement) => {
      const lines = wrapTitle(titleElement.textContent);
      if (lines.length === 1) return;

      const titleNodes = lines.flatMap((line, index) => {
        if (index === 0) return [document.createTextNode(line)];

        return [document.createElement('br'), document.createTextNode(` ${line}`)];
      });
      titleElement.replaceChildren(...titleNodes);
    };

    const highlightPaperAwards = (element) => {
      const textNodes = [];
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let textNode;

      while ((textNode = walker.nextNode())) {
        if (textNode.textContent.includes('Best Paper Award')) textNodes.push(textNode);
      }

      textNodes.forEach((node) => {
        const parts = node.textContent.split('Best Paper Award');
        const replacement = document.createDocumentFragment();

        parts.forEach((part, index) => {
          replacement.append(part);
          if (index < parts.length - 1) {
            const award = document.createElement('span');
            award.className = 'paper-award';
            award.textContent = 'Best Paper Award';
            replacement.append(award);
          }
        });
        node.replaceWith(replacement);
      });
    };

    document.querySelectorAll('.publications .periodical').forEach((note) => {
      if (note.textContent.trim() !== 'Accepted') return;

      const periodical = note.previousElementSibling;
      if (!periodical?.classList.contains('periodical')) return;

      periodical.append(' (Accepted)');
      note.remove();
    });

    document.querySelectorAll('.publications .periodical').forEach(highlightPaperAwards);

    const venueAbbreviations = {
      'IEEE Transactions on Communications': 'IEEE Trans. Commun.',
      'IEEE Transactions on Wireless Communications': 'IEEE Trans. Wireless Commun.',
      'IEEE Transactions on Neural Networks and Learning Systems': 'IEEE Trans. Neural Netw. Learn. Syst.',
      'IEEE Internet of Things Journal': 'IEEE Internet Things J.',
    };

    document.querySelectorAll('.publications .row').forEach((entry) => {
      const venue = entry.querySelector('.periodical em');
      if (!venue) return;

      const fullVenue = venue.textContent.trim();
      if (entry.querySelector('.abbr')?.textContent.trim() === 'arXiv') {
        venue.closest('.periodical')?.remove();
        return;
      }

      const abbreviation = venueAbbreviations[fullVenue] || entry.querySelector('.abbr')?.textContent.trim();
      if (!abbreviation) return;

      const searchableVenue = document.createElement('span');
      searchableVenue.className = 'sr-only';
      searchableVenue.textContent = ` ${fullVenue}`;
      venue.replaceChildren(abbreviation, searchableVenue);
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
      renderWrappedTitle(titleLink);
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
