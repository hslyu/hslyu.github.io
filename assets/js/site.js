(() => {
  const initializeSidebarHighlight = (toc, sections) => {
    if (!toc) return;

    const linksByHash = new Map([...toc.querySelectorAll(".toc-link")].map((link) => [new URL(link.href).hash, link]));
    const entries = sections.map(({ hash, target }) => ({ target, link: linksByHash.get(hash) })).filter((entry) => entry.link);
    if (!entries.length) return;

    let activeEntry = entries.find((entry) => entry.link.classList.contains("is-active-link")) || entries[0];
    const activate = (entry) => {
      if (entry === activeEntry) return;

      activeEntry.link.classList.remove("is-active-link");
      activeEntry.link.parentElement.classList.remove("is-active-li");
      entry.link.classList.add("is-active-link");
      entry.link.parentElement.classList.add("is-active-li");
      activeEntry = entry;
    };

    let selectedEntry = null;
    entries.forEach((entry) => {
      entry.link.addEventListener("click", () => {
        selectedEntry = entry;
        activate(entry);
      });
    });
    const resumeScrollTracking = () => (selectedEntry = null);
    window.addEventListener("wheel", resumeScrollTracking, { passive: true });
    window.addEventListener("touchstart", resumeScrollTracking, { passive: true });
    window.addEventListener("pointerdown", resumeScrollTracking, { passive: true });
    window.addEventListener("keydown", resumeScrollTracking);

    const hashEntry = entries.find((entry) => new URL(entry.link.href).hash === window.location.hash);
    if (hashEntry) activate(hashEntry);

    window.addEventListener(
      "scroll",
      () => {
        if (selectedEntry) {
          activate(selectedEntry);
          return;
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
          activate(entries.at(-1));
          return;
        }

        const nextEntry = entries.reduce((current, entry) => (entry.target.getBoundingClientRect().top <= 120 ? entry : current), entries[0]);
        activate(nextEntry);
      },
      { passive: true }
    );
  };

  const initializePublications = () => {
    if (!document.querySelector(".publications-content-marker")) return;

    const toc = document.querySelector("#toc-sidebar");
    const years = [...document.querySelectorAll(".publications h2.bibliography")];
    if (!toc || !years.length) return;

    const publicationYears = years.map((year) => {
      const link = toc.querySelector(`a[href="#${year.id}"]`);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.replaceState(null, "", link.hash);
        year.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      return { year: Number.parseInt(year.id, 10), heading: year, list: year.nextElementSibling, item: link.parentElement };
    });
    initializeSidebarHighlight(
      toc,
      years.map((year) => ({ hash: `#${year.id}`, target: year }))
    );
    const fromInput = toc.querySelector('.publication-year-filter input[aria-label="Filter from year"]');
    const toInput = toc.querySelector('.publication-year-filter input[aria-label="Filter to year"]');

    const setYearFilter = () => {
      const fromYear = Number.parseInt(fromInput.value, 10) || 0;
      const toYear = Number.parseInt(toInput.value, 10) || 9999;
      const [firstYear, lastYear] = [Math.min(fromYear, toYear), Math.max(fromYear, toYear)];

      publicationYears.forEach((entry) => {
        const hidden = entry.year < firstYear || entry.year > lastYear;
        entry.heading.parentElement.hidden = hidden;
        entry.item.hidden = hidden;
      });
    };

    fromInput.addEventListener("input", setYearFilter);
    toInput.addEventListener("input", setYearFilter);
  };

  const initializeExperiences = () => {
    if (!document.querySelector(".experience-content-marker")) return;

    const headings = [...document.querySelectorAll("article .cv > h2[id]")];
    const sections = headings.map((heading) => ({ hash: `#${heading.id}`, target: heading.nextElementSibling })).filter(({ target }) => target);
    const sectionTargets = Object.fromEntries(sections.map(({ hash, target }) => [hash, target]));

    document.querySelectorAll("#toc-sidebar a").forEach((link) => {
      const target = sectionTargets[new URL(link.href).hash];
      if (!target) return;

      link.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          window.history.replaceState(null, "", link.hash);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        true
      );
    });
    initializeSidebarHighlight(document.querySelector("#toc-sidebar"), sections);
  };

  const initializeMiscellaneous = () => {
    if (!document.querySelector(".miscellaneous-content-marker")) return;

    const headings = [...document.querySelectorAll("article h2[id]")];
    const sections = headings
      .map((heading) => ({ hash: `#${heading.id}`, target: heading.nextElementSibling?.querySelector(".misc-project-card") }))
      .filter(({ target }) => target);
    const sectionTargets = Object.fromEntries(sections.map(({ hash, target }) => [hash, target]));

    document.querySelectorAll("#toc-sidebar a").forEach((link) => {
      const target = sectionTargets[new URL(link.href).hash];
      if (!target) return;

      link.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          window.history.replaceState(null, "", link.hash);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        true
      );
    });
    initializeSidebarHighlight(document.querySelector("#toc-sidebar"), sections);

    const toc = document.querySelector("#toc-sidebar");
    const recordGroups = [...document.querySelectorAll(".misc-publication-list, .misc-project-list")];
    const records = recordGroups.flatMap((group) => [...group.querySelectorAll(":scope > li")]);
    const recordYearRanges = new Map(
      records.map((record) => [
        record,
        record.dataset.yearFrom && record.dataset.yearTo ? [Number(record.dataset.yearFrom), Number(record.dataset.yearTo)] : null,
      ])
    );
    const fromInput = toc?.querySelector('.misc-year-filter input[aria-label="Filter from year"]');
    const toInput = toc?.querySelector('.misc-year-filter input[aria-label="Filter to year"]');

    if (!fromInput || !toInput || !records.length) return;

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
  };

  const initialize = () => {
    initializePublications();
    initializeExperiences();
    initializeMiscellaneous();
  };

  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
