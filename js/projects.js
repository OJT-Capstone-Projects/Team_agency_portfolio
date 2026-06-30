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

  /**
   * @typedef {Object} Project
   * @property {string}   id          - Unique kebab-case identifier
   * @property {string}   name        - Display name
   * @property {string}   description - Short description shown on card
   * @property {string[]} tech        - Technology tags
   * @property {string}   emoji       - Visual emoji used as project image
   * @property {string}   imgClass    - CSS class for image background gradient
   * @property {string}   category    - Used by filter tabs (matches filter key)
   * @property {string}   liveUrl     - "View Project" link target
   * @property {string}   githubUrl   - "GitHub Repository" link target
   */

  /** @type {Project[]} */
  var projects = [
    {
      id:          "quiz-app",
      name:        "Interactive Quiz App",
      description: "A dynamic quiz experience with multiple-choice questions, " +
                   "a live score tracker, and a timed countdown. Questions are " +
                   "loaded from a data array and the UI updates entirely without " +
                   "page reloads.",
      tech:        ["HTML", "CSS", "JavaScript", "DOM API"],
      emoji:       "🧠",
      imgClass:    "project-img-quiz",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/Interactive-quiz-app/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Interactive-quiz-app"
    },
    {
      id:          "expense-tracker",
      name:        "Expense Tracker",
      description: "Track income and expenses in real time. Entries are stored " +
                   "in localStorage, displayed in a scrollable ledger, and " +
                   "summarised with a live balance that updates on every change.",
      tech:        ["HTML", "CSS", "JavaScript", "localStorage"],
      emoji:       "💰",
      imgClass:    "project-img-expense",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/expense-tracker/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/expense-tracker"
    },
    {
      id:          "live-news-feed",
      name:        "Live News Feed",
      description: "Fetches the latest headlines from a public news API and " +
                   "renders them as filterable cards. Supports keyword search " +
                   "and category filtering with zero-reload article discovery.",
      tech:        ["HTML", "CSS", "JavaScript", "Fetch API", "REST"],
      emoji:       "📰",
      imgClass:    "project-img-news",
      category:    "api",
      liveUrl:     "https://ojt-capstone-projects.github.io/Live-News-Feed/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Live-News-Feed"
    },
    {
      id:          "github-explorer",
      name:        "GitHub Developer Explorer",
      description: "Search any GitHub username and instantly view their public " +
                   "repositories, follower count, and profile details — all " +
                   "pulled live from the GitHub REST API.",
      tech:        ["HTML", "CSS", "JavaScript", "GitHub API", "Fetch API"],
      emoji:       "🐙",
      imgClass:    "project-img-github",
      category:    "api",
      liveUrl:     "https://ojt-capstone-projects.github.io/Github-developer-explorer/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Github-developer-explorer"
    },
    {
      id:          "kanban-board",
      name:        "Kanban Task Board",
      description: "A drag-and-drop task management board with three columns: " +
                   "To Do, In Progress, and Done. Tasks are created, moved, and " +
                   "deleted in the browser with full localStorage persistence.",
      tech:        ["HTML", "CSS", "JavaScript", "Drag & Drop API", "localStorage"],
      emoji:       "📋",
      imgClass:    "project-img-kanban",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/Kanban--Task-board/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Kanban--Task-board"
    },
    {
      id:          "team-agency-portfolio",
      name:        "Team Agency Portfolio",
      description: "This very site — a multi-section agency portfolio built " +
                   "with vanilla HTML, CSS, and JavaScript. Features dark/light " +
                   "theme, scroll-spy navigation, animated counters, and fully " +
                   "dynamic section rendering.",
      tech:        ["HTML", "CSS", "JavaScript", "DOM API", "localStorage"],
      emoji:       "🚀",
      imgClass:    "project-img-kanban",
      category:    "javascript",
      liveUrl:     "https://ojt-capstone-projects.github.io/Team-Agency-Portfolio/",
      githubUrl:   "https://github.com/OJT-Capstone-Projects/Team-Agency-Portfolio"
    }
  ];

  /* =========================================================
     FILTER CONFIGURATION
     ========================================================= */

  /** @type {Array<{label: string, value: string}>} */
  var filters = [
    { label: "All Projects", value: "all"        },
    { label: "JavaScript",   value: "javascript" },
    { label: "API Projects", value: "api"        }
  ];

  /* Currently selected filter — starts at "all" */
  var activeFilter = "all";

  /* =========================================================
     HELPERS
     ========================================================= */

  /**
   * Build the GitHub SVG icon as an inline SVGElement.
   * @returns {SVGElement}
   */
  function createGithubSvg() {
    var svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.setAttribute("aria-hidden", "true");
    svg.style.fill        = "currentColor";
    svg.style.flexShrink  = "0";

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

  /* =========================================================
     CARD BUILDER
     ========================================================= */

  /**
   * Build and return a single project card <article> element.
   * Uses: createElement(), appendChild()
   * @param {Project} project
   * @returns {HTMLElement}
   */
  function createProjectCard(project) {

    /* ── Outer card ── */
    var card = document.createElement("article");
    card.classList.add("project-card");
    card.setAttribute("aria-label", project.name);
    card.setAttribute("data-category", project.category);

    /* ── Image wrapper ── */
    var imgWrapper = document.createElement("div");
    imgWrapper.classList.add("project-card-image-wrapper");

    var imgEl = document.createElement("div");
    imgEl.classList.add("project-card-image", project.imgClass);
    imgEl.setAttribute("role", "img");
    imgEl.setAttribute("aria-label", project.name + " project illustration");
    imgEl.innerText = project.emoji;

    imgWrapper.appendChild(imgEl);
    card.appendChild(imgWrapper);

    /* ── Card body ── */
    var body = document.createElement("div");
    body.classList.add("project-card-body");

    /* Project name */
    var nameEl = document.createElement("h3");
    nameEl.classList.add("project-card-name");
    nameEl.innerText = project.name;

    /* Description */
    var descEl = document.createElement("p");
    descEl.classList.add("project-card-description");
    descEl.innerText = project.description;

    /* Tech tags — map() builds tag elements, forEach() appends them */
    var techList = document.createElement("ul");
    techList.classList.add("project-tech-list");
    techList.setAttribute("aria-label", "Technologies used in " + project.name);

    var tagItems = project.tech.map(function (techName) {
      var li   = document.createElement("li");
      var span = document.createElement("span");
      span.classList.add("project-tech-tag");
      span.innerText = techName;
      li.appendChild(span);
      return li;
    });

    tagItems.forEach(function (tagItem) {
      techList.appendChild(tagItem);
    });

    body.appendChild(nameEl);
    body.appendChild(descEl);
    body.appendChild(techList);
    card.appendChild(body);

    /* ── Card footer — action buttons ── */
    var footer = document.createElement("div");
    footer.classList.add("project-card-footer");

    /* View Project button */
    var viewBtn = document.createElement("a");
    viewBtn.classList.add("project-btn", "project-btn-view");
    viewBtn.setAttribute("href", project.liveUrl);
    viewBtn.setAttribute("target", "_blank");
    viewBtn.setAttribute("rel", "noopener noreferrer");
    viewBtn.setAttribute("aria-label", "View live demo of " + project.name);

    var viewIcon = document.createElement("span");
    viewIcon.classList.add("project-btn-icon");
    viewIcon.setAttribute("aria-hidden", "true");
    viewIcon.innerText = "🔗";

    var viewText = document.createElement("span");
    viewText.innerText = "View Project";

    viewBtn.appendChild(viewIcon);
    viewBtn.appendChild(viewText);

    /* GitHub Repo button */
    var githubBtn = document.createElement("a");
    githubBtn.classList.add("project-btn", "project-btn-github");
    githubBtn.setAttribute("href", project.githubUrl);
    githubBtn.setAttribute("target", "_blank");
    githubBtn.setAttribute("rel", "noopener noreferrer");
    githubBtn.setAttribute("aria-label", "View " + project.name + " on GitHub");

    var githubIcon = createGithubSvg();

    var githubText = document.createElement("span");
    githubText.innerText = "GitHub";

    githubBtn.appendChild(githubIcon);
    githubBtn.appendChild(githubText);

    footer.appendChild(viewBtn);
    footer.appendChild(githubBtn);
    card.appendChild(footer);

    return card;
  }

  /* =========================================================
     FILTER BAR BUILDER
     ========================================================= */

  /**
   * Build the filter button bar.
   * Uses: createElement(), appendChild(), forEach()
   * @param {Function} onFilterChange - callback(filterValue: string)
   * @returns {HTMLElement}
   */
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
     ========================================================= */

  /**
   * Render the project grid, respecting the active filter.
   * Uses: filter() to select matching projects,
   *       map()    to create card elements,
   *       forEach() to append them.
   * @param {HTMLElement}  grid         - The grid container element
   * @param {HTMLElement}  filterBarEl  - The filter bar element (to sync button states)
   * @param {string}       filterValue  - "all" | "javascript" | "api"
   */
  function renderGrid(grid, filterBarEl, filterValue) {

    /* Clear previous content */
    grid.innerHTML = "";

    /* filter() selects matching projects */
    var visible = projects.filter(function (project) {
      if (filterValue === "all") { return true; }
      return project.category === filterValue;
    });

    /* Sync filter button aria-pressed states */
    var filterBtns = filterBarEl.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
      var isActive = btn.getAttribute("data-filter") === filterValue;
      if (isActive) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    /* Handle empty state */
    if (visible.length === 0) {
      var emptyEl  = document.createElement("div");
      emptyEl.classList.add("projects-empty");

      var emptyIcon = document.createElement("span");
      emptyIcon.classList.add("projects-empty-icon");
      emptyIcon.setAttribute("aria-hidden", "true");
      emptyIcon.innerText = "🔍";

      var emptyText = document.createElement("p");
      emptyText.classList.add("projects-empty-text");
      emptyText.innerText = "No projects found for this filter.";

      emptyEl.appendChild(emptyIcon);
      emptyEl.appendChild(emptyText);
      grid.appendChild(emptyEl);
      return;
    }

    /* map() builds card elements */
    var cards = visible.map(function (project) {
      return createProjectCard(project);
    });

    /* forEach() appends them to the grid */
    cards.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  /* =========================================================
     SECTION BUILDER
     ========================================================= */

  /**
   * Build and inject the entire Projects Showcase section.
   * Replaces the #projects-section-mount placeholder in the DOM.
   * Uses: querySelector(), querySelectorAll()
   */
  function renderProjectsSection() {
    var placeholder = document.getElementById("projects-section-mount");
    if (!placeholder) { return; }

    /* ── Section ── */
    var section = document.createElement("section");
    section.id = "projects";
    section.classList.add("projects-section");
    section.setAttribute("aria-labelledby", "projects-heading");

    /* ── Inner wrapper ── */
    var inner = document.createElement("div");
    inner.classList.add("projects-inner");

    /* ── Section header ── */
    var header = document.createElement("div");
    header.classList.add("section-header");

    var label = document.createElement("p");
    label.classList.add("section-label");
    label.innerText = "What We've Built";

    var title = document.createElement("h2");
    title.classList.add("section-title");
    title.id = "projects-heading";
    title.innerText = "Projects Showcase";

    var subtitle = document.createElement("p");
    subtitle.classList.add("section-subtitle");
    subtitle.innerText = "A curated collection of projects built with vanilla HTML, CSS, and JavaScript.";

    header.appendChild(label);
    header.appendChild(title);
    header.appendChild(subtitle);
    inner.appendChild(header);

    /* ── Grid container ── */
    var grid = document.createElement("div");
    grid.classList.add("projects-grid");
    grid.setAttribute("role", "list");
    grid.setAttribute("aria-label", "Project cards");

    /* ── Filter bar — receives a callback to re-render the grid ── */
    var filterBar = createFilterBar(function (filterValue) {
      activeFilter = filterValue;
      renderGrid(grid, filterBar, filterValue);
    });

    inner.appendChild(filterBar);
    inner.appendChild(grid);
    section.appendChild(inner);

    /* Replace mount placeholder */
    placeholder.parentNode.replaceChild(section, placeholder);

    /* Initial render with "all" filter */
    renderGrid(grid, filterBar, activeFilter);
  }

  /* =========================================================
     SCROLL-IN ANIMATION (IntersectionObserver)
     Triggers card entry animations as the section scrolls
     into view, using querySelectorAll() + forEach().
     ========================================================= */

  /**
   * Observe the projects section. When it enters the viewport,
   * add the .in-view class to trigger staggered card animations.
   */
  function initScrollAnimation() {
    if (!("IntersectionObserver" in window)) { return; }

    var projectsSection = document.querySelector(".projects-section");
    if (!projectsSection) { return; }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          /* Re-trigger card fade-in by refreshing animation */
          var cards = projectsSection.querySelectorAll(".project-card");
          cards.forEach(function (card, index) {
            card.style.animationDelay = (index * 0.07) + "s";
            card.style.animationPlayState = "running";
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

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
