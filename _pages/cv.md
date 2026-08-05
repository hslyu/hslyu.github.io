---
layout: cv
permalink: /experiences/
title: experiences
nav: true
nav_order: 1
cv_format: rendercv # options: rendercv, jsonresume
toc:
  sidebar: left
---

<script>
  window.addEventListener('load', () => {
    const awardsHeading = document.querySelector('#awards + .card .card-title');
    if (awardsHeading) awardsHeading.textContent = 'Awards & Honors';

    const awardsTocLink = document.querySelector('#toc-sidebar a[href="#awards"]');
    if (awardsTocLink) awardsTocLink.textContent = 'Awards & Honors';
  });
</script>
