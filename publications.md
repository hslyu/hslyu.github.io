---
layout: page
hide-header: true
numbered-lists: true
---

## Selected publications

<div class="publication-timeline">
{% for group in site.data.publications %}{% for item in group[1] %}{% if item.featured %}{% assign record = site.data.bibtex[item.bibtex_key] %}
<article><div class="publication-main">{% if item.link %}<a class="publication-image-link" href="{{ item.link }}"><img src="/assets/img/thumb.png" alt="Publication illustration"></a>{% else %}<img src="/assets/img/thumb.png" alt="Publication illustration">{% endif %}<div><h3>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</h3><p class="venue"><em>{{ item.venue }}</em> · {{ item.year }}</p><p>{% include formatted-authors.html authors=item.authors link=item.link %}.</p>{% if item.note or record.verified %}<p class="publication-actions">{% if item.note %}{{ item.note }}{% endif %}{% if record.verified %}{% if item.note %} · {% endif %}<button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</p>{% endif %}</div></div></article>
{% endif %}{% endfor %}{% endfor %}
</div>

## Preprints

<ul class="compact-publications">
{% for item in site.data.publications.preprints %}{% assign record = site.data.bibtex[item.bibtex_key] %}<li><div class="publication-list-content"><strong>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</strong><span class="publication-authors">{% include formatted-authors.html authors=item.authors link=item.link %}</span><span class="publication-citation"><em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></div></li>{% endfor %}
</ul>

## Peer-reviewed journal and conference publications

### Journal articles

<ol class="compact-publications">
{% for item in site.data.publications.journals %}{% assign record = site.data.bibtex[item.bibtex_key] %}<li><div class="publication-list-content"><strong>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</strong><span class="publication-authors">{% include formatted-authors.html authors=item.authors link=item.link %}</span><span class="publication-citation"><em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></div></li>{% endfor %}
</ol>

### Conference proceedings

<ol class="compact-publications">
{% for item in site.data.publications.conferences %}{% assign record = site.data.bibtex[item.bibtex_key] %}<li><div class="publication-list-content"><strong>{% if item.link %}<a href="{{ item.link }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</strong><span class="publication-authors">{% include formatted-authors.html authors=item.authors link=item.link %}</span><span class="publication-citation"><em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></div></li>{% endfor %}
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
