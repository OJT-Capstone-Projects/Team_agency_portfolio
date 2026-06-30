/**
 * Team Agency Portfolio
 * File: js/header-hero.js
 *
 * Covers:
 *  1. Theme Toggle (light / dark)
 *  2. Hamburger / Mobile Navigation
 *  3. Active Navigation Link (scroll-spy)
 *  4. Header Scroll Shadow
 *  5. Animated Stats Counter (About section)
 *
 * CPR syllabus JavaScript only — no frameworks, no libraries.
 */

(function () {
  "use strict";

  /* ── 1. DOM References ─────────────────────────────────── */
  var body         = document.body;
  var header       = document.getElementById("main-header");
  var themeBtn     = document.getElementById("theme-toggle");
  var themeIcon    = document.getElementById("theme-icon");
  var hamburger    = document.getElementById("hamburger");
  var mainNav      = document.getElementById("main-nav");
  var navLinks     = document.querySelectorAll(".nav-link");
  var statNumbers  = document.querySelectorAll(".stat-number");
  var sections     = document.querySelectorAll("section[id]");

  /* ── 2. Theme Toggle ───────────────────────────────────── */

  /**
   * Read saved preference from localStorage.
   * Fall back to "light" if nothing is stored.
   */
  function getSavedTheme() {
    var saved = localStorage.getItem("ta-theme");
    return saved === "dark" ? "dark" : "light";
  }

  /**
   * Apply a theme to the document body and update the icon.
   * @param {string} theme - "light" or "dark"
   */
  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      themeIcon.textContent = "🌙";
      themeBtn.setAttribute("aria-label", "Switch to light theme");
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      themeIcon.textContent = "☀️";
      themeBtn.setAttribute("aria-label", "Switch to dark theme");
    }
    localStorage.setItem("ta-theme", theme);
  }

  /** Toggle between light and dark. */
  function toggleTheme() {
    var current = body.classList.contains("dark-theme") ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* Initialise theme on load */
  applyTheme(getSavedTheme());

  themeBtn.addEventListener("click", toggleTheme);

  /* ── 3. Hamburger / Mobile Nav ─────────────────────────── */

  /**
   * Open or close the mobile navigation drawer.
   * @param {boolean} forceClose - if true, always close regardless of state
   */
  function toggleNav(forceClose) {
    var isOpen = mainNav.classList.contains("open");

    if (forceClose || isOpen) {
      mainNav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    } else {
      mainNav.classList.add("open");
      hamburger.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
    }
  }

  hamburger.addEventListener("click", function () {
    toggleNav(false);
  });

  /* Close nav when a link is clicked (mobile) */
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
      toggleNav(true);
    });
  }

  /* Close nav on outside click */
  document.addEventListener("click", function (event) {
    var clickedInsideNav    = mainNav.contains(event.target);
    var clickedHamburger    = hamburger.contains(event.target);

    if (!clickedInsideNav && !clickedHamburger) {
      toggleNav(true);
    }
  });

  /* Close nav on Escape key */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      toggleNav(true);
    }
  });

  /* ── 4. Header Scroll Shadow ───────────────────────────── */
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    updateActiveLink();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── 5. Active Navigation Link (Scroll-Spy) ────────────── */

  /**
   * Determine which section is currently in view and mark the
   * corresponding nav link as active.
   */
  function updateActiveLink() {
    var scrollPos = window.scrollY + 100; // offset for fixed header

    var currentId = "";

    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute("id");
      }
    }

    for (var n = 0; n < navLinks.length; n++) {
      var link = navLinks[n];
      var href = link.getAttribute("href");

      if (href === "#" + currentId) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    }
  }

  /* ── 6. Stats Counter (About Section) ─────────────────── */

  /**
   * Animate a single counter element from 0 to its target value.
   * Uses requestAnimationFrame for smooth animation (60 fps).
   * @param {Element} el  - the span element to animate
   * @param {number}  end - the target number
   */
  function animateCounter(el, end) {
    var start     = 0;
    var duration  = 1800; // ms
    var startTime = null;

    function step(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      var progress = timestamp - startTime;
      var ratio    = Math.min(progress / duration, 1);

      /* Ease-out cubic */
      var eased = 1 - Math.pow(1 - ratio, 3);

      el.textContent = Math.floor(eased * end);

      if (ratio < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Use IntersectionObserver to trigger stat counters only once,
   * when the stats block scrolls into view.
   * Falls back gracefully if IntersectionObserver is not supported.
   */
  function initStatsCounter() {
    if (!statNumbers.length) { return; }

    if (!("IntersectionObserver" in window)) {
      /* Fallback: show final values immediately */
      for (var f = 0; f < statNumbers.length; f++) {
        var target = parseInt(statNumbers[f].getAttribute("data-target"), 10);
        statNumbers[f].textContent = target;
      }
      return;
    }

    var triggered = false;

    var observer = new IntersectionObserver(function (entries) {
      if (triggered) { return; }

      for (var e = 0; e < entries.length; e++) {
        if (entries[e].isIntersecting) {
          triggered = true;

          for (var n = 0; n < statNumbers.length; n++) {
            var target = parseInt(statNumbers[n].getAttribute("data-target"), 10);
            animateCounter(statNumbers[n], target);
          }

          observer.disconnect();
          break;
        }
      }
    }, { threshold: 0.3 });

    /* Observe the parent container of the first stat item */
    var statsContainer = statNumbers[0].closest(".about-stats");
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  }

  initStatsCounter();

  /* ── 7. Smooth Scroll polyfill for anchor links ─────────── */
  /**
   * Provides smooth scrolling for browsers that do not support
   * scroll-behavior: smooth in CSS (e.g. older Safari).
   */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');

    for (var a = 0; a < anchors.length; a++) {
      anchors[a].addEventListener("click", function (event) {
        var targetId = this.getAttribute("href").slice(1);
        var target   = document.getElementById(targetId);

        if (target) {
          event.preventDefault();
          var targetTop = target.getBoundingClientRect().top + window.scrollY - 68;

          window.scrollTo({
            top:      targetTop,
            behavior: "smooth"
          });
        }
      });
    }
  }

  initSmoothScroll();

  /* ── 8. Initial call to set correct active link on load ─── */
  updateActiveLink();

})();
