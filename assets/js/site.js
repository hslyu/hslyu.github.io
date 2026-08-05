(() => {
  const prepositions = new Set(
    "aboard about above across after against along amid among and around as at before behind below beneath beside besides between beyond by concerning considering despite down during except following for from in inside into like near of off on onto opposite outside over past regarding round since through throughout till to toward towards under underneath unlike until up upon versus via with within without".split(
      " "
    )
  );

  const wrapTitle = (title, lineLength) => {
    const segment = title.trim();
    if (segment.length <= lineLength) return [segment];

    const words = [...segment.matchAll(/\S+/g)];
    let breakAt = -1;

    for (let index = words.length - 1; index > 0; index -= 1) {
      const prefixLength = words[index].index - 1;
      if (prefixLength > lineLength) continue;

      const word = words[index][0].toLowerCase().replace(/[^a-z]/g, "");
      if (prepositions.has(word)) {
        breakAt = words[index].index;
        break;
      }
    }

    if (breakAt < 0) {
      breakAt = segment.lastIndexOf(" ", lineLength);
      if (breakAt < 1) breakAt = lineLength;
    }

    return [...wrapTitle(segment.slice(0, breakAt), lineLength), ...wrapTitle(segment.slice(breakAt), lineLength)];
  };

  const renderWrappedTitle = (titleElement, lineLength) => {
    const lines = wrapTitle(titleElement.textContent, lineLength);
    if (lines.length === 1) return;

    titleElement.replaceChildren(
      ...lines.flatMap((line, index) =>
        index === 0 ? [document.createTextNode(line)] : [document.createElement("br"), document.createTextNode(` ${line}`)]
      )
    );
  };

  const highlightPaperAwards = (element) => {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let textNode;

    while ((textNode = walker.nextNode())) {
      if (textNode.textContent.includes("Best Paper Award")) textNodes.push(textNode);
    }

    textNodes.forEach((node) => {
      const parts = node.textContent.split("Best Paper Award");
      const replacement = document.createDocumentFragment();

      parts.forEach((part, index) => {
        replacement.append(part);
        if (index < parts.length - 1) {
          const award = document.createElement("span");
          award.className = "paper-award";
          award.textContent = "Best Paper Award";
          replacement.append(award);
        }
      });
      node.replaceWith(replacement);
    });
  };

  const highlightOwnName = (element) => {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let textNode;

    while ((textNode = walker.nextNode())) {
      if (textNode.textContent.includes("Hyeonsu Lyu")) textNodes.push(textNode);
    }

    textNodes.forEach((node) => {
      const parts = node.textContent.split("Hyeonsu Lyu");
      const replacement = document.createDocumentFragment();

      parts.forEach((part, index) => {
        replacement.append(part);
        if (index < parts.length - 1) {
          const name = document.createElement("span");
          name.className = "misc-author-highlight";
          name.textContent = "Hyeonsu Lyu";
          replacement.append(name);
        }
      });
      node.replaceWith(replacement);
    });
  };

  const linkPublicationTitles = (wrapTitles = false) => {
    document.querySelectorAll('.publications .links a[href*="doi.org"], .publications .links a[href*="arxiv.org"]').forEach((publicationLink) => {
      const entry = publicationLink.closest(".row");
      const title = entry?.querySelector(".title");
      if (!title) return;

      const titleLink = document.createElement("a");
      titleLink.href = publicationLink.href;
      titleLink.target = "_blank";
      titleLink.rel = "external nofollow noopener";
      titleLink.textContent = title.textContent;
      if (wrapTitles) renderWrappedTitle(titleLink, 65);
      title.replaceChildren(titleLink);
      publicationLink.remove();

      if (!entry.querySelector(".links > *")) entry.querySelector(".links")?.remove();
    });
  };

  const renderAffiliationBrands = () => {
    const brands = [
      ["IEEE International Conference on ICT Convergence", "ieee-ictc"],
      ["IEEE Int. Conf. ICT Converg.", "ieee-ictc"],
      ["University of Texas at Austin", "ut-austin"],
      ["Seoul National University", "snu"],
      ["Bae & Jung Foundation", "bae-jung"],
      ["Samsung", "samsung"],
      ["POSTECH", "postech"],
      ["UNIST", "unist"],
      ["IITP", "iitp"],
      ["KICS", "kics"],
      ["KIPA", "kipa"],
      ["KAI", "kai"],
      ["KISTI", "kisti"],
    ];

    document.querySelectorAll(".affiliation-text").forEach((element) => {
      const textNodes = [];
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = walker.nextNode())) textNodes.push(textNode);

      textNodes.forEach((node) => {
        let fragments = [node.textContent];

        brands.forEach(([name, slug]) => {
          fragments = fragments.flatMap((fragment) => {
            if (typeof fragment !== "string" || !fragment.includes(name)) return [fragment];

            return fragment.split(name).flatMap((part, index, parts) => {
              if (index === parts.length - 1) return [part];

              const brand = document.createElement("span");
              brand.className = `affiliation-brand-${slug}`;
              brand.textContent = name;
              return [part, brand];
            });
          });
        });

        if (fragments.some((fragment) => typeof fragment !== "string")) node.replaceWith(...fragments);
      });
    });
  };

  const initializePublications = () => {
    if (!document.querySelector(".publications-content-marker")) return;

    document.querySelectorAll(".publications .periodical").forEach((note) => {
      if (note.textContent.trim() !== "Accepted") return;

      const periodical = note.previousElementSibling;
      if (!periodical?.classList.contains("periodical")) return;

      periodical.append(" (Accepted)");
      note.remove();
    });

    document.querySelectorAll(".publications .periodical").forEach(highlightPaperAwards);

    const venueAbbreviations = {
      "IEEE Transactions on Communications": "IEEE Trans. Commun.",
      "IEEE Transactions on Wireless Communications": "IEEE Trans. Wireless Commun.",
      "IEEE Transactions on Neural Networks and Learning Systems": "IEEE Trans. Neural Netw. Learn. Syst.",
      "IEEE Internet of Things Journal": "IEEE Internet Things J.",
    };

    document.querySelectorAll(".publications .row").forEach((entry) => {
      const venue = entry.querySelector(".periodical em");
      if (!venue) return;

      const fullVenue = venue.textContent.trim();
      if (entry.querySelector(".abbr")?.textContent.trim() === "arXiv") {
        venue.closest(".periodical")?.remove();
        return;
      }

      const abbreviation = venueAbbreviations[fullVenue] || entry.querySelector(".abbr")?.textContent.trim();
      if (!abbreviation) return;

      const searchableVenue = document.createElement("span");
      searchableVenue.className = "sr-only";
      searchableVenue.textContent = ` ${fullVenue}`;
      venue.replaceChildren(abbreviation, searchableVenue);
    });

    linkPublicationTitles(true);

    const toc = document.querySelector("#toc-sidebar");
    const years = [...document.querySelectorAll(".publications h2.bibliography")];
    if (!toc || !years.length) return;

    const list = document.createElement("ul");
    list.className = "toc-list";

    years.forEach((year) => {
      year.id = year.textContent.trim();

      const item = document.createElement("li");
      item.className = "toc-list-item";

      const link = document.createElement("a");
      link.className = "toc-link";
      link.href = `#${year.id}`;
      link.textContent = year.textContent.trim();
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.replaceState(null, "", link.hash);
        year.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      item.appendChild(link);
      list.appendChild(item);
    });

    toc.replaceChildren(list);
    toc.addEventListener("dragstart", (event) => event.preventDefault());
  };

  const initializeExperiences = () => {
    if (!document.querySelector(".experience-content-marker")) return;

    const sectionTargets = Object.fromEntries(
      [...document.querySelectorAll("article .cv > h2[id]")]
        .map((heading) => [`#${heading.id}`, heading.nextElementSibling])
        .filter(([, target]) => target)
    );

    document.querySelectorAll("#toc-sidebar a").forEach((link) => {
      const target = sectionTargets[new URL(link.href).hash];
      if (!target) return;

      link.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.history.replaceState(null, "", link.hash);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        true
      );
    });
  };

  const initializeMiscellaneous = () => {
    if (!document.querySelector(".miscellaneous-content-marker")) return;

    document.querySelectorAll(".misc-record-title:not(.misc-patent-title)").forEach((title) => renderWrappedTitle(title, 65));
    document.querySelectorAll(".misc-patent-title").forEach((title) => renderWrappedTitle(title, 80));
    document.querySelectorAll(".misc-record-meta").forEach(highlightPaperAwards);
    document.querySelectorAll(".misc-publication-list .author").forEach(highlightOwnName);

    const projectTargets = {
      "#projects": document.querySelector("#projects + .cv .misc-project-card"),
      "#miscellaneous-projects": document.querySelector("#miscellaneous-projects + .cv .misc-project-card"),
    };

    document.querySelectorAll("#toc-sidebar a").forEach((link) => {
      const target = projectTargets[new URL(link.href).hash];
      if (!target) return;

      link.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.history.replaceState(null, "", link.hash);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        true
      );
    });

    const toc = document.querySelector("#toc-sidebar");
    const sidebarColumn = toc?.parentElement;
    const positionSidebar = () => {
      if (!toc || !sidebarColumn) return;

      if (!window.matchMedia("(min-width: 576px)").matches) {
        ["position", "top", "left", "width", "maxHeight"].forEach((property) => toc.style.removeProperty(property));
        toc.style.removeProperty("overflow-y");
        return;
      }

      const columnStyle = window.getComputedStyle(sidebarColumn);
      const columnBounds = sidebarColumn.getBoundingClientRect();
      const leftPadding = Number.parseFloat(columnStyle.paddingLeft);
      const rightPadding = Number.parseFloat(columnStyle.paddingRight);
      toc.style.position = "fixed";
      toc.style.top = "6.5rem";
      toc.style.left = `${columnBounds.left + leftPadding}px`;
      toc.style.width = `${columnBounds.width - leftPadding - rightPadding}px`;
      toc.style.maxHeight = "calc(100vh - 6.5rem)";
      toc.style.setProperty("overflow-y", "auto", "important");
    };

    if (sidebarColumn) {
      new ResizeObserver(positionSidebar).observe(sidebarColumn);
      window.addEventListener("resize", positionSidebar);
      positionSidebar();
    }

    const recordGroups = [...document.querySelectorAll(".misc-publication-list, .misc-project-list")];
    const records = recordGroups.flatMap((group) => [...group.querySelectorAll(":scope > li")]);
    const recordYearRanges = new Map(
      records.map((record) => {
        const years = [...record.textContent.matchAll(/\b(?:19|20)\d{2}\b/g)].map((match) => Number(match[0]));
        return [record, years.length ? [Math.min(...years), Math.max(...years)] : null];
      })
    );

    if (!toc || !records.length) return;

    const yearFilter = document.createElement("div");
    yearFilter.className = "misc-year-filter";

    const fromInput = document.createElement("input");
    fromInput.type = "number";
    fromInput.min = "0";
    fromInput.max = "9999";
    fromInput.placeholder = "2017";
    fromInput.setAttribute("aria-label", "Filter from year");

    const toInput = document.createElement("input");
    toInput.type = "number";
    toInput.min = "0";
    toInput.max = "9999";
    toInput.placeholder = "2026";
    toInput.setAttribute("aria-label", "Filter to year");

    const setYearFilter = () => {
      const fromYear = Number.parseInt(fromInput.value, 10) || 0;
      const toYear = Number.parseInt(toInput.value, 10) || 9999;
      const [firstYear, lastYear] = [Math.min(fromYear, toYear), Math.max(fromYear, toYear)];

      recordYearRanges.forEach((range, record) => {
        record.hidden = !range || range[1] < firstYear || range[0] > lastYear;
      });

      recordGroups.forEach((group) => {
        const hasVisibleRecords = [...group.children].some((record) => !record.hidden);
        group.hidden = !hasVisibleRecords;
        group.closest(".misc-project-card")?.toggleAttribute("hidden", !hasVisibleRecords);
        group.previousElementSibling?.classList.contains("misc-subtitle") &&
          group.previousElementSibling.toggleAttribute("hidden", !hasVisibleRecords);
      });

      document.querySelectorAll(".misc-publications-section").forEach((section) => {
        section.hidden = !section.querySelector(".misc-publication-list:not([hidden])");
      });
    };

    fromInput.addEventListener("input", setYearFilter);
    toInput.addEventListener("input", setYearFilter);
    yearFilter.append(fromInput, document.createTextNode(" – "), toInput);
    toc.appendChild(yearFilter);
    setYearFilter();
  };

  const initializeColorPilot = () => {
    document.querySelectorAll(".color-pilot-swatch").forEach((swatch) => {
      swatch.addEventListener("click", async () => {
        const color = swatch.dataset.color;

        try {
          await navigator.clipboard.writeText(color);
        } catch {
          const input = document.createElement("textarea");
          input.value = color;
          document.body.append(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }

        const label = swatch.querySelector("span");
        const originalLabel = label.textContent;
        label.textContent = "Copied";
        setTimeout(() => (label.textContent = originalLabel), 1200);
      });
    });
  };

  const initialize = () => {
    if (!document.querySelector(".publications-content-marker")) linkPublicationTitles();
    renderAffiliationBrands();
    initializePublications();
    initializeExperiences();
    initializeMiscellaneous();
    initializeColorPilot();
  };

  if (document.readyState !== "complete") window.addEventListener("load", initialize, { once: true });
  else initialize();
})();
