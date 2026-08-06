(() => {
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
    const fromInput = toc.querySelector('.publication-year-filter input[aria-label="Filter from year"]');
    const toInput = toc.querySelector('.publication-year-filter input[aria-label="Filter to year"]');

    const setYearFilter = () => {
      const fromYear = Number.parseInt(fromInput.value, 10) || 0;
      const toYear = Number.parseInt(toInput.value, 10) || 9999;
      const [firstYear, lastYear] = [Math.min(fromYear, toYear), Math.max(fromYear, toYear)];

      publicationYears.forEach((entry) => {
        const hidden = entry.year < firstYear || entry.year > lastYear;
        entry.heading.hidden = hidden;
        entry.list.hidden = hidden;
        entry.item.hidden = hidden;
      });
    };

    fromInput.addEventListener("input", setYearFilter);
    toInput.addEventListener("input", setYearFilter);
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

    const sectionTargets = Object.fromEntries(
      [...document.querySelectorAll("article h2[id]")]
        .map((heading) => [`#${heading.id}`, heading.nextElementSibling?.querySelector(".misc-project-card")])
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
