/**
 * Team Agency Portfolio
 * File: js/team-skills.js
 *
 * Renders:
 *  1. Team Members Section  — 4 cards (profile, name, role, skills, GitHub)
 *  2. Skills Section        — 6 skill cards with animated progress bars
 *
 * CPR syllabus JavaScript only:
 *  createElement(), appendChild(), innerHTML, innerText,
 *  forEach(), map()
 */

(function () {
  "use strict";

  /* =========================================================
     DATA
     ========================================================= */

  /** @type {Array<{name: string, role: string, avatar: string, skills: string[], github: string}>} */
  var teamMembers = [
    {
      name:   "Abhishek Yadav",
      role:   "Full Stack Developer",
      avatar: "👨‍💻",
      skills: ["HTML", "CSS", "JavaScript", "GitHub"],
      github: "https://github.com/OJT-Capstone-Projects"
    },
    {
      name:   "Sumit Tiwari",
      role:   "Frontend Developer",
      avatar: "👨‍🔬",
      skills: ["JavaScript", "API Integration", "CSS", "Problem Solving"],
      github: "https://github.com/OJT-Capstone-Projects"
    },
    {
      name:   "Rudra",
      role:   "UI Developer",
      avatar: "👨‍🎨",
      skills: ["HTML", "CSS", "JavaScript", "Drag & Drop API"],
      github: "https://github.com/OJT-Capstone-Projects"
    },
    {
      name:   "Khushi Shah",
      role:   "Frontend Engineer",
      avatar: "👩‍💼",
      skills: ["HTML", "CSS", "JavaScript", "localStorage"],
      github: "https://github.com/OJT-Capstone-Projects"
    }
  ];

  /** @type {Array<{name: string, icon: string, iconClass: string, description: string, level: number}>} */
  var skillsData = [
    {
      name:        "HTML",
      icon:        "🌐",
      iconClass:   "skill-icon-html",
      description: "Semantic markup, accessibility-first structure, and standards-compliant web documents.",
      level:       92
    },
    {
      name:        "CSS",
      icon:        "🎨",
      iconClass:   "skill-icon-css",
      description: "Responsive layouts with Flexbox & Grid, animations, and cross-browser styling.",
      level:       88
    },
    {
      name:        "JavaScript",
      icon:        "⚡",
      iconClass:   "skill-icon-js",
      description: "Vanilla JS DOM manipulation, async patterns, and clean CPR-syllabus programming.",
      level:       85
    },
    {
      name:        "GitHub",
      icon:        "🐙",
      iconClass:   "skill-icon-github",
      description: "Version control, branching strategies, pull requests, and collaborative workflows.",
      level:       90
    },
    {
      name:        "API Integration",
      icon:        "🔌",
      iconClass:   "skill-icon-api",
      description: "Fetching and consuming RESTful APIs, handling JSON data, and error management.",
      level:       80
    },
    {
      name:        "Problem Solving",
      icon:        "🧩",
      iconClass:   "skill-icon-ps",
      description: "Breaking down complex challenges, debugging systematically, and optimising solutions.",
      level:       95
    }
  ];

  /* =========================================================
     HELPERS
     ========================================================= */

  /**
   * Build the inline GitHub SVG icon as an SVGElement.
   * Avoids external image dependencies.
   * @returns {SVGElement}
   */
  function createGithubIcon() {
    var svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("team-github-icon");

    path.setAttribute(
      "d",
      "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 " +
      "11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416" +
      "-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083" +
      "-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 " +
      "1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334" +
      "-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117" +
      "-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 " +
      "2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 " +
      "2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624" +
      "-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576" +
      "C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
    );

    svg.appendChild(path);
    return svg;
  }

  /* =========================================================
     TEAM SECTION RENDERER
     ========================================================= */

  /**
   * Build one team member card element.
   * Uses createElement(), appendChild(), innerHTML, innerText.
   * @param {Object} member
   * @returns {HTMLElement}
   */
  function createTeamCard(member) {

    /* Outer card */
    var card = document.createElement("article");
    card.classList.add("team-card");
    card.setAttribute("aria-label", member.name + ", " + member.role);

    /* ── Image wrapper ── */
    var imgWrapper = document.createElement("div");
    imgWrapper.classList.add("team-card-image-wrapper");

    var placeholder = document.createElement("div");
    placeholder.classList.add("team-card-avatar-placeholder");
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", member.name + " avatar");
    placeholder.innerText = member.avatar;

    imgWrapper.appendChild(placeholder);
    card.appendChild(imgWrapper);

    /* ── Card body ── */
    var body = document.createElement("div");
    body.classList.add("team-card-body");

    /* Name */
    var nameEl = document.createElement("h3");
    nameEl.classList.add("team-card-name");
    nameEl.innerText = member.name;

    /* Role */
    var roleEl = document.createElement("p");
    roleEl.classList.add("team-card-role");
    roleEl.innerText = member.role;

    /* Skills list — uses map() to build the items, forEach() to append */
    var skillsList = document.createElement("ul");
    skillsList.classList.add("team-card-skills");
    skillsList.setAttribute("aria-label", member.name + "'s skills");

    var skillItems = member.skills.map(function (skill) {
      var li   = document.createElement("li");
      var span = document.createElement("span");
      span.classList.add("team-skill-tag");
      span.innerText = skill;
      li.appendChild(span);
      return li;
    });

    skillItems.forEach(function (item) {
      skillsList.appendChild(item);
    });

    body.appendChild(nameEl);
    body.appendChild(roleEl);
    body.appendChild(skillsList);
    card.appendChild(body);

    /* ── Card footer — GitHub link ── */
    var footer = document.createElement("div");
    footer.classList.add("team-card-footer");

    var githubLink = document.createElement("a");
    githubLink.classList.add("team-github-link");
    githubLink.setAttribute("href", member.github);
    githubLink.setAttribute("target", "_blank");
    githubLink.setAttribute("rel", "noopener noreferrer");
    githubLink.setAttribute("aria-label", "View " + member.name + " on GitHub");

    githubLink.appendChild(createGithubIcon());

    var githubText = document.createElement("span");
    githubText.innerText = "GitHub Profile";
    githubLink.appendChild(githubText);

    footer.appendChild(githubLink);
    card.appendChild(footer);

    return card;
  }

  /**
   * Inject the entire Team Members section into the DOM.
   * Inserts before the skills section placeholder.
   */
  function renderTeamSection() {
    var placeholder = document.getElementById("team-section-mount");
    if (!placeholder) { return; }

    /* Section wrapper */
    var section = document.createElement("section");
    section.id = "team";
    section.classList.add("team-section");
    section.setAttribute("aria-labelledby", "team-heading");

    /* Inner container */
    var inner = document.createElement("div");
    inner.classList.add("team-inner");

    /* Section header */
    var header = document.createElement("div");
    header.classList.add("section-header");
    header.innerHTML =
      '<p class="section-label">Meet The Crew</p>' +
      '<h2 class="section-title" id="team-heading">Our Team Members</h2>' +
      '<p class="section-subtitle">A talented group united by curiosity, craft, and a love of clean code.</p>';

    inner.appendChild(header);

    /* Grid */
    var grid = document.createElement("div");
    grid.classList.add("team-grid");

    /* Render each card — forEach on teamMembers array */
    teamMembers.forEach(function (member) {
      var card = createTeamCard(member);
      grid.appendChild(card);
    });

    inner.appendChild(grid);
    section.appendChild(inner);

    /* Replace mount point */
    placeholder.parentNode.replaceChild(section, placeholder);
  }

  /* =========================================================
     SKILLS SECTION RENDERER
     ========================================================= */

  /**
   * Build one skill card element.
   * @param {Object} skill
   * @returns {HTMLElement}
   */
  function createSkillCard(skill) {

    var card = document.createElement("article");
    card.classList.add("skill-card");
    card.setAttribute("aria-label", skill.name + " skill");

    /* Icon */
    var iconWrapper = document.createElement("div");
    iconWrapper.classList.add("skill-icon-wrapper", skill.iconClass);
    iconWrapper.setAttribute("aria-hidden", "true");
    iconWrapper.innerText = skill.icon;

    /* Name */
    var nameEl = document.createElement("h3");
    nameEl.classList.add("skill-name");
    nameEl.innerText = skill.name;

    /* Description */
    var descEl = document.createElement("p");
    descEl.classList.add("skill-description");
    descEl.innerText = skill.description;

    /* Progress bar track */
    var track = document.createElement("div");
    track.classList.add("skill-level-track");
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-valuenow", skill.level);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-label", skill.name + " proficiency " + skill.level + "%");

    var fill = document.createElement("div");
    fill.classList.add("skill-level-fill");
    /* Store the target width as a data attribute; JS will animate it */
    fill.setAttribute("data-width", skill.level + "%");

    track.appendChild(fill);

    /* Level label */
    var label = document.createElement("span");
    label.classList.add("skill-level-label");
    label.setAttribute("aria-hidden", "true");
    label.innerText = skill.level + "%";

    card.appendChild(iconWrapper);
    card.appendChild(nameEl);
    card.appendChild(descEl);
    card.appendChild(track);
    card.appendChild(label);

    return card;
  }

  /**
   * Inject the entire Skills section into the DOM.
   */
  function renderSkillsSection() {
    var placeholder = document.getElementById("skills-section-mount");
    if (!placeholder) { return; }

    var section = document.createElement("section");
    section.id = "skills";
    section.classList.add("skills-section");
    section.setAttribute("aria-labelledby", "skills-heading");

    var inner = document.createElement("div");
    inner.classList.add("skills-inner");

    /* Section header */
    var header = document.createElement("div");
    header.classList.add("section-header");
    header.innerHTML =
      '<p class="section-label">What We Know</p>' +
      '<h2 class="section-title" id="skills-heading">Our Skills</h2>' +
      '<p class="section-subtitle">The core technologies and competencies that power every project we deliver.</p>';

    inner.appendChild(header);

    /* Grid — map() creates the cards, forEach() appends them */
    var grid = document.createElement("div");
    grid.classList.add("skills-grid");

    var cards = skillsData.map(function (skill) {
      return createSkillCard(skill);
    });

    cards.forEach(function (card) {
      grid.appendChild(card);
    });

    inner.appendChild(grid);
    section.appendChild(inner);

    placeholder.parentNode.replaceChild(section, placeholder);
  }

  /* =========================================================
     SKILL BAR ANIMATION
     Uses IntersectionObserver so bars animate when scrolled in.
     ========================================================= */

  /**
   * Animate the skill level fill bars when the skills section
   * enters the viewport.
   */
  function initSkillBarAnimation() {
    var fills = document.querySelectorAll(".skill-level-fill");
    if (!fills.length) { return; }

    /* Apply the target width directly via the element's style so CSS
       transition runs from 0 → target on the .animated class trigger.   */
    fills.forEach(function (fill) {
      fill.style.width = fill.getAttribute("data-width");
      /* Reset to 0 so the transition plays on scroll-in */
      fill.style.width = "0";
    });

    if (!("IntersectionObserver" in window)) {
      /* Fallback: show final values immediately */
      fills.forEach(function (fill) {
        fill.style.width = fill.getAttribute("data-width");
      });
      return;
    }

    var triggered = false;

    var observer = new IntersectionObserver(function (entries) {
      if (triggered) { return; }

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          triggered = true;

          fills.forEach(function (fill) {
            fill.style.width = fill.getAttribute("data-width");
          });

          var skillCards = document.querySelectorAll(".skill-card");
          skillCards.forEach(function (card) {
            card.classList.add("animated");
          });

          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    var skillsSection = document.getElementById("skills");
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }

  /* =========================================================
     INIT — run after DOM is ready
     ========================================================= */
  function init() {
    renderTeamSection();
    renderSkillsSection();
    initSkillBarAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
