/**
 * Team Agency Portfolio
 * File: js/projects.js
 *
 * Renders the Projects Showcase section dynamically.
 *
 * CPR syllabus JavaScript used:
 *  createElement(), appendChild(), querySelector(),
 *  querySelectorAll(), forEach(), map(), filter()
 *
 * NO frameworks · NO libraries · NO CSS variables
 */

(function () {
  "use strict";

  /* =========================================================
     DATA — Project definitions
     ========================================================= */

  /** @type {Array} */
  var projects = [
    {
      id:          "kanban-board",
      name:        "Kanban Task Board",
      description: "Trello-style drag-and-drop board with To Do, In Progress, and Done columns. Tasks are created, edited, moved, and deleted entirely in the browser with localStorage persistence.",
      tech:        ["HTML", "CSS", "JavaScript", "Drag & Drop API", "localStorage"],
      emoji:       "📋",
      imgClass:    "project-img-kanban",
      accent:      "#7c3aed",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/Kanban--Task-board/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Kanban--Task-board"
    },
    {
      id:          "live-news-feed",
      name:        "Live News Feed",
      description: "The Bulletin Times — a newspaper-style platform delivering the latest headlines from trusted sources across India and the world, powered by a public news REST API.",
      tech:        ["HTML", "CSS", "JavaScript", "Fetch API", "REST API"],
      emoji:       "📰",
      imgClass:    "project-img-news",
      accent:      "#db2777",
      category:    "api",
      liveUrl:     "https://ojt-capstone-projects.github.io/Live-News-Feed/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Live-News-Feed"
    },
    {
      id:          "github-explorer",
      name:        "GitHub Developer Explorer",
      description: "Search any GitHub username and instantly view public repositories, follower count, language statistics, and full profile details pulled live from the GitHub REST API.",
      tech:        ["HTML", "CSS", "JavaScript", "GitHub API", "Fetch API"],
      emoji:       "🐙",
      imgClass:    "project-img-github",
      accent:      "#0f172a",
      category:    "api",
      liveUrl:     "https://ojt-capstone-projects.github.io/Github-developer-explorer/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Github-developer-explorer"
    },
    {
      id:          "quiz-app",
      name:        "Interactive Quiz App",
      description: "Quiz Master — full-screen MCQ app with subject selection, countdown timer, instant answer feedback, score tracking, and a light/dark theme switcher. Pure vanilla JavaScript.",
      tech:        ["HTML", "CSS", "JavaScript", "DOM API", "Timer API"],
      emoji:       "🧠",
      imgClass:    "project-img-quiz",
      accent:      "#1d4ed8",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/Interactive-quiz-app/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Interactive-quiz-app"
    },
    {
      id:          "expense-tracker",
      name:        "Expense Tracker",
      description: "Personal finance manager to track income and expenses. Features real-time balance, transaction ledger, spending breakdown, and full localStorage persistence across sessions.",
      tech:        ["HTML", "CSS", "JavaScript", "localStorage", "DOM API"],
      emoji:       "💰",
      imgClass:    "project-img-expense",
      accent:      "#059669",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/expense-tracker/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/expense-tracker"
    },
    {
      id:          "team-agency-portfolio",
      name:        "Team Agency Portfolio",
      description: "This very site — a multi-section agency portfolio featuring dark/light theme, scroll-spy nav, animated counters, dynamic JS rendering, and a validated contact form.",
      tech:        ["HTML", "CSS", "JavaScript", "DOM API", "localStorage"],
      emoji:       "🚀",
      imgClass:    "project-img-portfolio",
      accent:      "#2A5298",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/Team-Agency-Portfolio/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Team-Agency-Portfolio"
    }
  ];

  /* =========================================================
     FILTER CONFIGURATION
     ========================================================= */

  var filters = [
    { label: "All Projects", value: "all"        },
    { label: "JavaScript",   value: "javascript" },
    { label: "API Projects", value: "api"        }
  ];

  var activeFilter = "all";

  /* =========================================================
     HELPERS
     ========================================================= */

  /** Inline GitHub SVG icon. */
  function createGithubSvg() {
    var svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.setAttribute("aria-hidden", "true");
    svg.style.fill       = "currentColor";
    svg.style.flexShrink = "0";
    path.setAttribute(
      "d",
      "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387" +
      ".6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033" +
      "-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729" +
      ".083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 " +
      "1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467" +
      "-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-" +
      ".535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 " +
      "0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-" +
      "1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 " +
      "1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 " +
      "1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 " +
      "17.3 24 12c0-6.627-5.373-12-12-12z"
    );
    svg.appendChild(path);
    return svg;
  }

  /** Inline external-link SVG icon. */
  function createLinkSvg() {
    var svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "13");
    svg.setAttribute("height", "13");
    svg.setAttribute("aria-hidden", "true");
    svg.style.fill       = "currentColor";
    svg.style.flexShrink = "0";
    path.setAttribute(
      "d",
      "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6" +
      "M10 14L21 3"
    );
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  /* =========================================================
     PREVIEW IMAGE BUILDER
     Uses a screenshot service to get a real thumbnail of the
     live site. Falls back to a styled card if the image errors.
     ========================================================= */

  /**
   * Build the visual preview area for a project card.
   * Tries to load a screenshot from microlink.io (free, no key needed).
   * Falls back to the styled emoji card on error.
   * @param {Object} project
   * @returns {HTMLElement}
   */
  function createProjectPreview(project) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("project-card-image-wrapper");

    /* ── Screenshot image ── */
    var img = document.createElement("img");
    img.classList.add("project-screenshot");
    img.setAttribute("alt", project.name + " live preview screenshot");
    img.setAttribute("loading", "lazy");
    img.setAttribute("decoding", "async");

    /* microlink.io screenshot API — free, no API key required */
    var screenshotUrl =
      "https://api.microlink.io/?url=" +
      encodeURIComponent(project.liveUrl) +
      "&screenshot=true&meta=false&embed=screenshot.url";
    img.setAttribute("src", screenshotUrl);

    /* ── Fallback card (always in DOM, hidden behind image) ── */
    var fallback = document.createElement("div");
    fallback.classList.add("project-card-fallback", project.imgClass);
    fallback.setAttribute("aria-hidden", "true");

    var fallbackEmoji = document.createElement("span");
    fallbackEmoji.classList.add("project-fallback-emoji");
    fallbackEmoji.innerText = project.emoji;

    var fallbackName = document.createElement("span");
    fallbackName.classList.add("project-fallback-name");
    fallbackName.innerText = project.name;

    fallback.appendChild(fallbackEmoji);
    fallback.appendChild(fallbackName);

    /* Show/hide logic */
    img.addEventListener("load", function () {
      img.classList.add("screenshot-loaded");
      fallback.classList.add("screenshot-ready");
    });
    img.addEventListener("error", function () {
      img.style.display = "none";
      fallback.classList.add("fallback-visible");
    });

    /* ── Accent bar at the bottom of the preview ── */
    var accentBar = document.createElement("div");
    accentBar.classList.add("project-accent-bar");
    accentBar.style.backgroundColor = project.accent;

    /* ── Hover overlay with "View Live" CTA ── */
    var overlay = document.createElement("div");
    overlay.classList.add("project-preview-overlay");
    overlay.setAttribute("aria-hidden", "true");

    var overlayBtn = document.createElement("span");
    overlayBtn.classList.add("project-overlay-btn");
    overlayBtn.innerText = "View Live ↗";

    overlay.appendChild(overlayBtn);

    wrapper.appendChild(img);
    wrapper.appendChild(fallback);
    wrapper.appendChild(accentBar);
    wrapper.appendChild(overlay);

    return wrapper;
  }

  /* =========================================================
     CARD BUILDER
     ========================================================= */

  /**
   * Build and return a single project card <article>.
   * Uses: createElement(), appendChild(), innerText, innerHTML
   * @param {Object} project
   * @returns {HTMLElement}
   */
  function createProjectCard(project) {

    var card = document.createElement("article");
    card.classList.add("project-card");
    card.setAttribute("aria-label", project.name);
    card.setAttribute("data-category", project.category);

    /* Preview image area */
    var preview = createProjectPreview(project);
    card.appendChild(preview);

    /* Card body */
    var body = document.createElement("div");
    body.classList.add("project-card-body");

    /* Category badge */
    var badge = document.createElement("span");
    badge.classList.add("project-category-badge");
    badge.innerText = project.category === "api" ? "API Project" : "JavaScript";

    /* Project name */
    var nameEl = document.createElement("h3");
    nameEl.classList.add("project-card-name");
    nameEl.innerText = project.name;

    /* Description */
    var descEl = document.createElement("p");
    descEl.classList.add("project-card-description");
    descEl.innerText = project.description;

    /* Tech tags — map() + forEach() */
    var techList = document.createElement("ul");
    techList.classList.add("project-tech-list");
    techList.setAttribute("aria-label", "Technologies used");

    var tagItems = project.tech.map(function (techName) {
      var li   = document.createElement("li");
      var span = document.createElement("span");
      span.classList.add("project-tech-tag");
      span.innerText = techName;
      li.appendChild(span);
      return li;
    });
    tagItems.forEach(function (item) { techList.appendChild(item); });

    body.appendChild(badge);
    body.appendChild(nameEl);
    body.appendChild(descEl);
    body.appendChild(techList);
    card.appendChild(body);

    /* Card footer — action buttons */
    var footer = document.createElement("div");
    footer.classList.add("project-card-footer");

    /* View Live button */
    var viewBtn = document.createElement("a");
    viewBtn.classList.add("project-btn", "project-btn-view");
    viewBtn.setAttribute("href", project.liveUrl);
    viewBtn.setAttribute("target", "_blank");
    viewBtn.setAttribute("rel", "noopener noreferrer");
    viewBtn.setAttribute("aria-label", "Open live demo of " + project.name);
    viewBtn.appendChild(createLinkSvg());
    var viewText = document.createElement("span");
    viewText.innerText = "View Live";
    viewBtn.appendChild(viewText);

    /* GitHub button */
    var githubBtn = document.createElement("a");
    githubBtn.classList.add("project-btn", "project-btn-github");
    githubBtn.setAttribute("href", project.githubUrl);
    githubBtn.setAttribute("target", "_blank");
    githubBtn.setAttribute("rel", "noopener noreferrer");
    githubBtn.setAttribute("aria-label", "View source of " + project.name + " on GitHub");
    githubBtn.appendChild(createGithubSvg());
    var ghText = document.createElement("span");
    ghText.innerText = "Source Code";
    githubBtn.appendChild(ghText);

    footer.appendChild(viewBtn);
    footer.appendChild(githubBtn);
    card.appendChild(footer);

    return card;
  }

  /* =========================================================
     FILTER BAR
     ========================================================= */

  function createFilterBar(onFilterChange) {
    var bar = document.createElement("div");
    bar.classList.add("projects-filter-bar");
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Filter projects by category");

    filters.forEach(function (filter) {
      var btn = document.createElement("button");
      btn.classList.add("filter-btn");
      btn.setAttribute("type", "button");
      btn.setAttribute("data-filter", filter.value);
      btn.innerText = filter.label;

      if (filter.value === activeFilter) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.setAttribute("aria-pressed", "false");
      }

      btn.addEventListener("click", function () {
        onFilterChange(filter.value);
      });

      bar.appendChild(btn);
    });

    return bar;
  }

  /* =========================================================
     GRID RENDERER
     Uses: filter(), map(), forEach()
     ========================================================= */

  function renderGrid(grid, filterBarEl, filterValue) {
    grid.innerHTML = "";

    var visible = projects.filter(function (p) {
      return filterValue === "all" || p.category === filterValue;
    });

    /* Sync filter button states */
    var btns = filterBarEl.querySelectorAll(".filter-btn");
    btns.forEach(function (btn) {
      var isActive = btn.getAttribute("data-filter") === filterValue;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (visible.length === 0) {
      var empty = document.createElement("div");
      empty.classList.add("projects-empty");
      empty.innerHTML = '<span class="projects-empty-icon" aria-hidden="true">🔍</span>' +
                        '<p class="projects-empty-text">No projects match this filter.</p>';
      grid.appendChild(empty);
      return;
    }

    var cards = visible.map(function (p) { return createProjectCard(p); });
    cards.forEach(function (card) { grid.appendChild(card); });
  }

  /* =========================================================
     SECTION BUILDER
     ========================================================= */

  function renderProjectsSection() {
    var placeholder = document.getElementById("projects-section-mount");
    if (!placeholder) { return; }

    var section = document.createElement("section");
    section.id = "projects";
    section.classList.add("projects-section");
    section.setAttribute("aria-labelledby", "projects-heading");

    var inner = document.createElement("div");
    inner.classList.add("projects-inner");

    /* Header */
    var header = document.createElement("div");
    header.classList.add("section-header");
    header.innerHTML =
      '<p class="section-label">What We\'ve Built</p>' +
      '<h2 class="section-title" id="projects-heading">Projects Showcase</h2>' +
      '<p class="section-subtitle">Six real projects built with vanilla HTML, CSS &amp; JavaScript — click any card to see it live.</p>';
    inner.appendChild(header);

    /* Grid */
    var grid = document.createElement("div");
    grid.classList.add("projects-grid");
    grid.setAttribute("role", "list");

    /* Filter bar */
    var filterBar = createFilterBar(function (val) {
      activeFilter = val;
      renderGrid(grid, filterBar, val);
    });

    inner.appendChild(filterBar);
    inner.appendChild(grid);
    section.appendChild(inner);

    placeholder.parentNode.replaceChild(section, placeholder);

    renderGrid(grid, filterBar, activeFilter);
  }

  /* =========================================================
     SCROLL-IN ANIMATION
     ========================================================= */

  function initScrollAnimation() {
    if (!("IntersectionObserver" in window)) { return; }

    var projectsSection = document.querySelector(".projects-section");
    if (!projectsSection) { return; }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cards = projectsSection.querySelectorAll(".project-card");
          cards.forEach(function (card, index) {
            card.style.animationDelay = (index * 0.08) + "s";
            card.style.animationPlayState = "running";
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.08 });

    observer.observe(projectsSection);
  }

  /* =========================================================
     INIT
     ========================================================= */

  function init() {
    renderProjectsSection();
    initScrollAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
