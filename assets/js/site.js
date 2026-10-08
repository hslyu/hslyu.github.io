(() => {
  const palettePath = "/assets/data/color-palette.json";
  const mobilePreviewMode = new URLSearchParams(window.location.search).get("mobile-preview");
  const useAdjustedMobileDesign = mobilePreviewMode !== "current";

  if (useAdjustedMobileDesign) document.documentElement.classList.add("mobile-preview-adjusted");

  const initializeMobilePreview = () => {
    if (useAdjustedMobileDesign && window.matchMedia("(max-width: 575px)").matches && !document.querySelector("#toc-sidebar .is-active-link")) {
      const firstLink = document.querySelector("#toc-sidebar .toc-link");
      firstLink?.classList.add("is-active-link");
      firstLink?.parentElement.classList.add("is-active-li");
    }

    if (useAdjustedMobileDesign && window.matchMedia("(max-width: 575px)").matches) {
      document.querySelectorAll(".publications .abbr figure picture").forEach((picture) => {
        const figureImage = picture.querySelector("img");
        if (!figureImage || picture.closest("a")) return;
        const link = document.createElement("a");
        const title = picture.closest(".row")?.querySelector(".title")?.textContent.trim();
        link.className = "mobile-preview-figure-link";
        link.href = figureImage.src;
        link.target = "_blank";
        link.rel = "noopener";
        link.title = "Open full-size figure";
        link.setAttribute("aria-label", `Open full-size figure${title ? `: ${title}` : ""}`);
        picture.before(link);
        link.append(picture);
      });
    }

    if (!["current", "adjusted"].includes(mobilePreviewMode)) return;

    document.querySelectorAll("a[href]").forEach((link) => {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || link.getAttribute("href").startsWith("#")) return;
      if (!/^\/(?:$|experiences\/|publications\/|demos\/|miscellaneous\/)/.test(url.pathname)) return;
      url.searchParams.set("mobile-preview", mobilePreviewMode);
      link.href = url.href;
    });
  };

  const initializeMobileReview = () => {
    const review = document.querySelector("[data-mobile-review]");
    if (!review) return;

    document.documentElement.classList.add("mobile-preview-adjusted");

    const frame = review.querySelector("iframe");
    const stage = review.querySelector(".mobile-review-stage");
    const pageButtons = [...review.querySelectorAll("[data-review-page]")];
    const widthSelect = review.querySelector("#mobile-review-width");
    const openLink = review.querySelector(".mobile-review-open");
    const status = review.querySelector(".mobile-review-status");
    let currentPath = pageButtons.find((button) => button.getAttribute("aria-pressed") === "true").dataset.reviewPage;

    const selectedMode = () => review.querySelector('input[name="mobile-review-version"]:checked').value;
    const updateNotes = () => {
      review.querySelectorAll("[data-review-path]").forEach((section) => (section.hidden = section.dataset.reviewPath !== currentPath));
      pageButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.reviewPage === currentPath)));
    };
    const updateStatus = () => {
      status.textContent = `${selectedMode() === "adjusted" ? "적용안" : "이전"} · ${Math.round(frame.getBoundingClientRect().width)}px`;
    };
    const loadPreview = () => {
      const url = new URL(currentPath, window.location.origin);
      url.searchParams.set("mobile-preview", selectedMode());
      url.searchParams.set("preview-rev", "5");
      openLink.href = url.href;
      frame.src = url.href;
      status.textContent = "화면을 불러오는 중…";
      updateNotes();
    };

    pageButtons.forEach((button) =>
      button.addEventListener("click", () => {
        currentPath = button.dataset.reviewPage;
        loadPreview();
      })
    );
    review.querySelectorAll('input[name="mobile-review-version"]').forEach((input) => input.addEventListener("change", loadPreview));
    widthSelect.addEventListener("change", () => stage.style.setProperty("--preview-width", `${widthSelect.value}px`));
    frame.addEventListener("load", () => {
      const url = new URL(frame.contentWindow.location.href);
      currentPath = url.pathname;
      openLink.href = url.href;
      updateNotes();
      updateStatus();
    });
    new ResizeObserver(updateStatus).observe(frame);
    updateNotes();
  };

  const initializeMobilePreviewHeader = () => {
    const navbar = document.querySelector("#navbar");
    if (!navbar) return;

    const profileTitle = document.querySelector(".post-header:has(+ article > .profile) .post-title");
    if (profileTitle && !navbar.querySelector(".navbar-brand")) {
      const brand = document.createElement("a");
      brand.className = "navbar-brand title font-weight-lighter mobile-preview-home-brand";
      brand.href = mobilePreviewMode === "adjusted" ? "/?mobile-preview=adjusted" : "/";
      brand.append(...[...profileTitle.childNodes].map((node) => node.cloneNode(true)));
      navbar.querySelector(".container").prepend(brand);
    }

    const updateHeight = () =>
      document.documentElement.style.setProperty("--mobile-preview-header-height", `${navbar.getBoundingClientRect().height}px`);
    new ResizeObserver(updateHeight).observe(navbar);
    updateHeight();

    const navScroller = navbar.querySelector(".navbar-collapse-main");
    const navContainer = navbar.querySelector(".container");
    const createScrollButton = (direction, label, symbol) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `mobile-nav-scroll-button mobile-nav-scroll-button--${direction}`;
      button.setAttribute("aria-label", label);
      button.textContent = symbol;
      button.hidden = true;
      button.addEventListener("click", () =>
        navScroller.scrollBy({
          left: (direction === "right" ? 1 : -1) * navScroller.clientWidth * 0.7,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
      );
      navContainer.append(button);
      return button;
    };
    const previousButton = createScrollButton("left", "Show previous tabs", "‹");
    const nextButton = createScrollButton("right", "Show next tabs", "›");
    const mobileViewport = window.matchMedia("(max-width: 575px)");
    const updateScrollHints = () => {
      const canScroll = mobileViewport.matches && navScroller.scrollWidth > navScroller.clientWidth + 1;
      previousButton.hidden = !canScroll || navScroller.scrollLeft <= 4;
      nextButton.hidden = !canScroll || navScroller.scrollLeft >= navScroller.scrollWidth - navScroller.clientWidth - 4;
    };
    const revealActiveTab = () => {
      if (!mobileViewport.matches) {
        updateScrollHints();
        return;
      }
      const activeTab = navScroller.querySelector(".nav-item.active > .nav-link");
      if (activeTab) {
        const scrollerBounds = navScroller.getBoundingClientRect();
        const activeBounds = activeTab.getBoundingClientRect();
        if (activeBounds.left < scrollerBounds.left + 24 || activeBounds.right > scrollerBounds.right - 24) {
          navScroller.scrollLeft += activeBounds.left - scrollerBounds.left - (navScroller.clientWidth - activeBounds.width) / 2;
        }
      }
      updateScrollHints();
    };
    navScroller.addEventListener("scroll", updateScrollHints, { passive: true });
    window.addEventListener("resize", updateScrollHints, { passive: true });
    mobileViewport.addEventListener("change", revealActiveTab);
    window.requestAnimationFrame(revealActiveTab);
    document.fonts?.ready.then(revealActiveTab);
  };

  const isValidAccent = (accent) => accent && typeof accent.name === "string" && /^#[0-9a-f]{6}$/i.test(accent.hex);

  const applyAccent = (accent) => {
    [document.documentElement, document.body].forEach((element) => {
      element.style.setProperty("--global-hover-color", accent.hex);
      element.style.setProperty("--global-theme-color", accent.hex);
    });
    document.documentElement.classList.add("random-accent-active");
  };

  const initializeRandomAccent = () => {
    const themeToggle = document.querySelector("#light-toggle");
    const container = themeToggle?.closest(".toggle-container");
    if (!container || container.querySelector("#random-color-toggle")) return;

    const button = document.createElement("button");
    const wheel = document.createElement("span");
    button.id = "random-color-toggle";
    button.type = "button";
    button.title = "Choose a random accent color";
    button.setAttribute("aria-label", button.title);
    wheel.className = "random-color-wheel";
    wheel.setAttribute("aria-hidden", "true");
    button.append(wheel);
    container.insertBefore(button, themeToggle);

    const updateButtonLabel = (accent) => {
      const label = `Accent color: ${accent.name} (${accent.hex}). Choose another random accent color`;
      button.title = label;
      button.setAttribute("aria-label", label);
      button.style.setProperty("--selected-accent", accent.hex);
    };

    let currentAccent = null;

    const paletteRequest = window
      .fetch(palettePath)
      .then((response) => {
        if (!response.ok) throw new Error(`Palette request failed: ${response.status}`);
        return response.json();
      })
      .then((palette) => palette.filter(isValidAccent));

    button.addEventListener("click", async () => {
      try {
        const palette = await paletteRequest;
        if (!palette.length) return;

        const currentHex = currentAccent?.hex;
        const choices = palette.length > 1 ? palette.filter(({ hex }) => hex.toLowerCase() !== currentHex?.toLowerCase()) : palette;
        const accent = choices[Math.floor(Math.random() * choices.length)];
        applyAccent(accent);
        currentAccent = accent;
        updateButtonLabel(accent);
        button.classList.remove("is-spinning");
        window.requestAnimationFrame(() => button.classList.add("is-spinning"));
      } catch {
        button.title = "Accent colors are temporarily unavailable";
      }
    });

    button.addEventListener("animationend", () => button.classList.remove("is-spinning"));
  };

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

        const previewHeaderHeight = window.matchMedia("(max-width: 575px)").matches
          ? document.querySelector("#navbar").getBoundingClientRect().height
          : 96;
        const nextEntry = entries.reduce(
          (current, entry) => (entry.target.getBoundingClientRect().top <= previewHeaderHeight + 24 ? entry : current),
          entries[0]
        );
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
      if (!link) return;

      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.history.replaceState(null, "", window.location.pathname + window.location.search + link.hash);
        year.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    initializeSidebarHighlight(
      toc,
      years.map((year) => ({ hash: `#${year.id}`, target: year }))
    );
  };

  const initializeSectionNavigation = (markerSelector, headingSelector, resolveTarget) => {
    if (!document.querySelector(markerSelector)) return;

    const toc = document.querySelector("#toc-sidebar");
    if (!toc) return;

    const sections = [...document.querySelectorAll(headingSelector)]
      .map((heading) => ({ hash: `#${heading.id}`, target: resolveTarget(heading) }))
      .filter(({ target }) => target);
    const sectionTargets = Object.fromEntries(sections.map(({ hash, target }) => [hash, target]));

    toc.querySelectorAll("a").forEach((link) => {
      const target = sectionTargets[new URL(link.href).hash];
      if (!target) return;

      link.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          window.history.replaceState(null, "", window.location.pathname + window.location.search + link.hash);
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        true
      );
    });
    initializeSidebarHighlight(toc, sections);
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
    initializeMobilePreview();
    initializeMobileReview();
    initializeRandomAccent();
    initializeMobilePreviewHeader();
    initializePublications();
    initializeSectionNavigation(".experience-content-marker", "article .cv > h2[id]", (heading) => heading.nextElementSibling);
    initializeSectionNavigation(".miscellaneous-content-marker", "article h2[id]", (heading) =>
      heading.nextElementSibling?.querySelector(".misc-project-card, .misc-demo-card")
    );
    initializeDemoLoading();
    initializeLocalDemoPlayers();
  };

  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
