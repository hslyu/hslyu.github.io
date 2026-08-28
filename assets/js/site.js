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

    years.forEach((year) => {
      const link = toc.querySelector(`a[href="#${year.id}"]`);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.replaceState(null, "", link.hash);
        year.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    initializeSidebarHighlight(
      toc,
      years.map((year) => ({ hash: `#${year.id}`, target: year }))
    );
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
      .map((heading) => ({ hash: `#${heading.id}`, target: heading.nextElementSibling?.querySelector(".misc-project-card, .misc-demo-card") }))
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
  };

  const prepareDemoVideo = (video) => {
    if (video.dataset.poster) {
      video.poster = video.dataset.poster;
      delete video.dataset.poster;
    }
    if (video.dataset.src) {
      video.src = video.dataset.src;
      delete video.dataset.src;
      video.preload = "metadata";
      video.load();
    }
  };

  const waitForDemoMetadata = (video) => {
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) return Promise.resolve();

    return new Promise((resolve) => {
      let timeout;
      const finish = () => {
        window.clearTimeout(timeout);
        video.removeEventListener("loadedmetadata", finish);
        video.removeEventListener("error", finish);
        resolve();
      };

      video.addEventListener("loadedmetadata", finish, { once: true });
      video.addEventListener("error", finish, { once: true });
      timeout = window.setTimeout(finish, 5000);
    });
  };

  const initializeDemoLoading = async () => {
    const groups = [...document.querySelectorAll(".misc-demo-group")];

    for (const group of groups) {
      const videos = [...group.querySelectorAll("video")];
      videos.forEach(prepareDemoVideo);
      await Promise.all(videos.map(waitForDemoMetadata));

      if ("requestIdleCallback" in window) await new Promise((resolve) => window.requestIdleCallback(resolve, { timeout: 500 }));
    }
  };

  const initializeLocalDemoPlayers = () => {
    document.querySelectorAll(".misc-demo-local-player").forEach((player) => {
      const video = player.querySelector("video");
      const playButton = player.querySelector(".misc-demo-local-play");
      if (!video || !playButton) return;

      playButton.addEventListener("click", () => {
        prepareDemoVideo(video);
        video.play();
      });
      video.addEventListener("play", () => player.classList.add("is-playing"));
      video.addEventListener("pause", () => player.classList.remove("is-playing"));
      video.addEventListener("ended", () => player.classList.remove("is-playing"));
    });
  };

  const initialize = () => {
    initializePublications();
    initializeExperiences();
    initializeMiscellaneous();
    initializeDemoLoading();
    initializeLocalDemoPlayers();
  };

  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
