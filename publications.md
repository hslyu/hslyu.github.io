---
layout: page
hide-header: true
numbered-lists: true
---

## Selected publications

<div class="publication-timeline">
{% for group in site.data.publications %}{% for item in group[1] %}{% if item.featured %}{% assign record = site.data.bibtex[item.bibtex_key] %}{% capture author_link %}<a class="publication-author" href="{{ item.link }}">Hyeonsu Lyu</a>{% endcapture %}{% assign linked_authors = item.authors | replace: "Hyeonsu Lyu", author_link %}
<article><div class="publication-main"><img src="/assets/img/thumb.png" alt="Publication illustration"><div><h3>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</h3><p class="venue"><em>{{ item.venue }}</em> · {{ item.year }}</p><p>{% if item.link %}{{ linked_authors }}{% else %}{{ item.authors }}{% endif %}.</p>{% if item.note or record.verified %}<p class="publication-actions">{% if item.note %}{{ item.note }}{% endif %}{% if record.verified %}{% if item.note %} · {% endif %}<button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</p>{% endif %}</div></div></article>
{% endif %}{% endfor %}{% endfor %}
</div>

## Preprints

<ul class="compact-publications">
{% for item in site.data.publications.preprints %}{% assign record = site.data.bibtex[item.bibtex_key] %}{% capture author_link %}<a class="publication-author" href="{{ item.link }}">Hyeonsu Lyu</a>{% endcapture %}{% assign linked_authors = item.authors | replace: "Hyeonsu Lyu", author_link %}<li><strong>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</strong><br><span>{% if item.link %}{{ linked_authors }}{% else %}{{ item.authors }}{% endif %} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></li>{% endfor %}
</ul>

## Peer-reviewed journal and conference publications

### Journal articles

<ol class="compact-publications">
{% for item in site.data.publications.journals %}{% assign record = site.data.bibtex[item.bibtex_key] %}{% capture author_link %}<a class="publication-author" href="{{ item.link }}">Hyeonsu Lyu</a>{% endcapture %}{% assign linked_authors = item.authors | replace: "Hyeonsu Lyu", author_link %}<li><strong>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</strong><br><span>{% if item.link %}{{ linked_authors }}{% else %}{{ item.authors }}{% endif %} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></li>{% endfor %}
</ol>

### Conference proceedings

<ol class="compact-publications">
{% for item in site.data.publications.conferences %}{% assign record = site.data.bibtex[item.bibtex_key] %}{% capture author_link %}<a class="publication-author" href="{{ item.link }}">Hyeonsu Lyu</a>{% endcapture %}{% assign linked_authors = item.authors | replace: "Hyeonsu Lyu", author_link %}<li><strong>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</strong><br><span>{% if item.link %}{{ linked_authors }}{% else %}{{ item.authors }}{% endif %} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></li>{% endfor %}
</ol>

<script>
document.addEventListener('click', function (event) {
  var button = event.target.closest('.bibtex-copy');
  if (!button) return;
  var bibtex = button.dataset.bibtex;
  var copied = function () { button.textContent = 'Copied'; setTimeout(function () { button.textContent = 'BibTeX'; }, 1600); };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(bibtex).then(copied);
    return;
  }
  var area = document.createElement('textarea');
  area.value = bibtex;
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
  copied();
});
</script>
