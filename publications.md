---
layout: page
hide-header: true
numbered-lists: true
---

## Selected publications

<div class="publication-timeline">
{% for group in site.data.publications %}{% for item in group[1] %}{% if item.featured %}{% assign record = site.data.bibtex[item.bibtex_key] %}
<article><div class="publication-main"><img src="/assets/img/thumb.png" alt="Publication illustration"><div><h3>{{ item.title }}</h3><p class="venue"><em>{{ item.venue }}</em> · {{ item.year }}</p><p>{{ item.authors }}.</p><p class="publication-actions">{% if item.link %}<a href="{{ item.link }}">Paper</a>{% endif %}{% if item.note %}{% if item.link %} · {% endif %}{{ item.note }}{% endif %}{% if record.verified %}{% if item.link or item.note %} · {% endif %}<button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</p></div></div></article>
{% endif %}{% endfor %}{% endfor %}
</div>

## Preprints

<ul class="compact-publications">
{% for item in site.data.publications.preprints %}{% assign record = site.data.bibtex[item.bibtex_key] %}<li><strong>{{ item.title }}</strong><br><span>{{ item.authors }} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if item.link %} · <a href="{{ item.link }}">Paper</a>{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></li>{% endfor %}
</ul>

## Peer-reviewed journal and conference publications

### Journal articles

<ol class="compact-publications">
{% for item in site.data.publications.journals %}{% assign record = site.data.bibtex[item.bibtex_key] %}<li><strong>{{ item.title }}</strong><br><span>{{ item.authors }} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if item.link %} · <a href="{{ item.link }}">Paper</a>{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></li>{% endfor %}
</ol>

### Conference proceedings

<ol class="compact-publications">
{% for item in site.data.publications.conferences %}{% assign record = site.data.bibtex[item.bibtex_key] %}<li><strong>{{ item.title }}</strong><br><span>{{ item.authors }} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}{% if item.link %} · <a href="{{ item.link }}">Paper</a>{% endif %}{% if record.verified %} · <button class="bibtex-copy" type="button" data-bibtex="{{ record.value | escape }}">BibTeX</button>{% endif %}</span></li>{% endfor %}
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
