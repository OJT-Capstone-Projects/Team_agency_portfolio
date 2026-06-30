/**
 * Team Agency Portfolio
 * File: js/contact-footer.js
 *
 * Covers:
 *  1. Theme Toggle  — light / dark with localStorage persistence
 *  2. Contact Form  — rendered dynamically via createElement()
 *  3. Form Validation — with try / catch / finally + Error object
 *  4. Footer        — rendered dynamically via createElement()
 *
 * CPR syllabus JavaScript only — no frameworks, no libraries.
 */

(function () {
  "use strict";

  /* =========================================================
     DATA
     ========================================================= */

  /** Quick navigation links rendered in the footer. */
  var quickLinks = [
    { label: "Home",     href: "#home"     },
    { label: "About",    href: "#about"    },
    { label: "Team",     href: "#team"     },
    { label: "Skills",   href: "#skills"   },
    { label: "Projects", href: "#projects" },
    { label: "Contact",  href: "#contact"  }
  ];

  /** GitHub profile links for each team member. */
  var githubLinks = [
    { name: "Abhishek Yadav",  url: "https://github.com/abhishekydvtech65"    },
    { name: "Sumit Tiwari",    url: "https://github.com/sumittiwari1302"       },
    { name: "Rudraabhishek",   url: "https://github.com/rudraabhishek-collab"  },
    { name: "Khushi Shah",     url: "https://github.com/shahkhushi0307"        }
  ];

  /* =========================================================
     1. THEME TOGGLE
        Theme is fully managed by header-hero.js.
        This file reads the current theme only when needed —
        no duplicate listeners, no double-toggle.
     ========================================================= */

  /* =========================================================
     2. FORM VALIDATION HELPERS
     ========================================================= */

  /**
   * Test whether a string is a valid email address.
   * @param {string} value
   * @returns {boolean}
   */
  function isValidEmail(value) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value.trim());
  }

  /**
   * Show an inline error message below a field.
   * @param {HTMLElement} group    - the .form-group wrapper
   * @param {HTMLElement} input    - the input or textarea element
   * @param {string}      message  - error text to display
   */
  function showFieldError(group, input, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
    input.setAttribute("aria-invalid", "true");

    var errorEl = group.querySelector(".form-error-msg");
    if (errorEl) {
      errorEl.querySelector(".error-text").textContent = message;
      errorEl.classList.add("visible");
      errorEl.setAttribute("role", "alert");
    }
  }

  /**
   * Clear the error state from a single field.
   * @param {HTMLElement} group
   * @param {HTMLElement} input
   */
  function clearFieldError(group, input) {
    input.classList.remove("input-error");
    input.setAttribute("aria-invalid", "false");

    var errorEl = group.querySelector(".form-error-msg");
    if (errorEl) {
      errorEl.classList.remove("visible");
      errorEl.removeAttribute("role");
    }
  }

  /**
   * Mark a field as successfully validated (green border).
   * @param {HTMLElement} input
   */
  function markFieldSuccess(input) {
    input.classList.add("input-success");
    input.classList.remove("input-error");
  }

  /**
   * Validate all form fields.
   * Uses try / catch / finally and the Error object.
   *
   * @param {Object} fields - { nameInput, emailInput, subjectInput, messageInput }
   * @param {Object} groups - matching .form-group wrappers for each field
   * @returns {boolean}  true = valid, false = has errors
   */
  function validateForm(fields, groups) {
    var isValid = true;

    try {
      /* ── Name ── */
      if (fields.nameInput.value.trim() === "") {
        throw new Error("name-empty");
      }
      clearFieldError(groups.nameGroup, fields.nameInput);
      markFieldSuccess(fields.nameInput);

    } catch (err) {
      isValid = false;
      if (err.message === "name-empty") {
        showFieldError(groups.nameGroup, fields.nameInput, "Name is required.");
      }
    } finally {
      /* Always runs — no cleanup needed here but satisfies the requirement */
    }

    try {
      /* ── Email ── */
      var emailVal = fields.emailInput.value.trim();

      if (emailVal === "") {
        throw new Error("email-empty");
      }
      if (!isValidEmail(emailVal)) {
        throw new Error("email-invalid");
      }
      clearFieldError(groups.emailGroup, fields.emailInput);
      markFieldSuccess(fields.emailInput);

    } catch (err) {
      isValid = false;
      if (err.message === "email-empty") {
        showFieldError(groups.emailGroup, fields.emailInput, "Email address is required.");
      } else if (err.message === "email-invalid") {
        showFieldError(groups.emailGroup, fields.emailInput, "Please enter a valid email address.");
      }
    } finally {
      /* Always runs */
    }

    try {
      /* ── Subject ── */
      if (fields.subjectInput.value.trim() === "") {
        throw new Error("subject-empty");
      }
      clearFieldError(groups.subjectGroup, fields.subjectInput);
      markFieldSuccess(fields.subjectInput);

    } catch (err) {
      isValid = false;
      if (err.message === "subject-empty") {
        showFieldError(groups.subjectGroup, fields.subjectInput, "Subject is required.");
      }
    } finally {
      /* Always runs */
    }

    try {
      /* ── Message ── */
      if (fields.messageInput.value.trim() === "") {
        throw new Error("message-empty");
      }
      clearFieldError(groups.messageGroup, fields.messageInput);
      markFieldSuccess(fields.messageInput);

    } catch (err) {
      isValid = false;
      if (err.message === "message-empty") {
        showFieldError(groups.messageGroup, fields.messageInput, "Message cannot be empty.");
      }
    } finally {
      /* Always runs */
    }

    return isValid;
  }

  /* =========================================================
     3. CONTACT FORM BUILDER
        All elements created with createElement() / appendChild().
     ========================================================= */

  /**
   * Helper: create a form group containing a label, input/textarea,
   * and an error message slot.
   *
   * @param {Object} cfg
   * @param {string}  cfg.id          - id attribute for the input
   * @param {string}  cfg.label       - visible label text
   * @param {string}  cfg.type        - "text" | "email" | "textarea"
   * @param {string}  cfg.placeholder - placeholder text
   * @param {boolean} cfg.required    - whether to add required-mark
   * @returns {Object} { group, input }  — the wrapper div and the field element
   */
  function createFormGroup(cfg) {
    var group = document.createElement("div");
    group.classList.add("form-group");

    /* Label */
    var label = document.createElement("label");
    label.classList.add("form-label");
    label.setAttribute("for", cfg.id);
    label.textContent = cfg.label;

    if (cfg.required) {
      var mark = document.createElement("span");
      mark.classList.add("required-mark");
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "*";
      label.appendChild(mark);
    }

    /* Input or Textarea */
    var input;
    if (cfg.type === "textarea") {
      input = document.createElement("textarea");
      input.classList.add("form-textarea");
      input.setAttribute("rows", "5");
      input.setAttribute("maxlength", "1000");
    } else {
      input = document.createElement("input");
      input.classList.add("form-input");
      input.setAttribute("type", cfg.type);
    }

    input.setAttribute("id", cfg.id);
    input.setAttribute("name", cfg.id);
    input.setAttribute("placeholder", cfg.placeholder);
    input.setAttribute("aria-required", cfg.required ? "true" : "false");
    input.setAttribute("aria-invalid", "false");
    input.setAttribute("autocomplete", cfg.id === "email" ? "email" : "off");

    /* Error message slot */
    var errorMsg = document.createElement("span");
    errorMsg.classList.add("form-error-msg");
    errorMsg.setAttribute("aria-live", "polite");

    var errorIcon = document.createElement("span");
    errorIcon.classList.add("form-error-icon");
    errorIcon.setAttribute("aria-hidden", "true");
    errorIcon.textContent = "⚠";

    var errorText = document.createElement("span");
    errorText.classList.add("error-text");

    errorMsg.appendChild(errorIcon);
    errorMsg.appendChild(errorText);

    group.appendChild(label);
    group.appendChild(input);
    group.appendChild(errorMsg);

    return { group: group, input: input };
  }

  /**
   * Build and return the entire <form> element.
   * @returns {HTMLElement}
   */
  function buildContactForm() {
    var form = document.createElement("form");
    form.id = "contact-form";
    form.classList.add("contact-form");
    form.setAttribute("novalidate", "");
    form.setAttribute("aria-label", "Contact form");

    /* ── Row 1: Name + Email ── */
    var row1 = document.createElement("div");
    row1.classList.add("form-row");

    var namePair    = createFormGroup({ id: "name",    label: "Full Name",      type: "text",     placeholder: "e.g. Alex Johnson",         required: true  });
    var emailPair   = createFormGroup({ id: "email",   label: "Email Address",  type: "email",    placeholder: "e.g. alex@example.com",      required: true  });

    row1.appendChild(namePair.group);
    row1.appendChild(emailPair.group);
    form.appendChild(row1);

    /* ── Subject field ── */
    var subjectPair = createFormGroup({ id: "subject", label: "Subject",        type: "text",     placeholder: "What is this about?",        required: true  });
    form.appendChild(subjectPair.group);

    /* ── Message field ── */
    var messagePair = createFormGroup({ id: "message", label: "Message",        type: "textarea", placeholder: "Write your message here…",   required: true  });

    /* Character counter for message */
    var charCounter = document.createElement("span");
    charCounter.classList.add("form-char-counter");
    charCounter.setAttribute("aria-live", "polite");
    charCounter.setAttribute("aria-atomic", "true");
    charCounter.textContent = "0 / 1000";
    messagePair.group.appendChild(charCounter);

    /* Live character count update */
    messagePair.input.addEventListener("input", function () {
      var len = messagePair.input.value.length;
      charCounter.textContent = len + " / 1000";

      charCounter.classList.remove("near-limit", "at-limit");
      if (len >= 1000) {
        charCounter.classList.add("at-limit");
      } else if (len >= 850) {
        charCounter.classList.add("near-limit");
      }
    });

    form.appendChild(messagePair.group);

    /* ── Status message area (success / error) ── */
    var statusDiv = document.createElement("div");
    statusDiv.id = "form-status";
    statusDiv.classList.add("form-status");
    statusDiv.setAttribute("aria-live", "assertive");
    statusDiv.setAttribute("aria-atomic", "true");

    var statusIcon = document.createElement("span");
    statusIcon.classList.add("form-status-icon");
    statusIcon.setAttribute("aria-hidden", "true");

    var statusText = document.createElement("span");
    statusText.classList.add("form-status-text");

    statusDiv.appendChild(statusIcon);
    statusDiv.appendChild(statusText);
    form.appendChild(statusDiv);

    /* ── Submit button ── */
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.classList.add("form-submit-btn");
    submitBtn.setAttribute("aria-label", "Send message");

    var spinner = document.createElement("span");
    spinner.classList.add("btn-spinner");
    spinner.setAttribute("aria-hidden", "true");

    var btnLabel = document.createElement("span");
    btnLabel.classList.add("btn-label");
    btnLabel.textContent = "Send Message ✉";

    submitBtn.appendChild(spinner);
    submitBtn.appendChild(btnLabel);
    form.appendChild(submitBtn);

    /* ── Real-time clear on input (remove errors as user types) ── */
    var allInputs = [namePair.input, emailPair.input, subjectPair.input, messagePair.input];
    var allGroups = [namePair.group, emailPair.group, subjectPair.group, messagePair.group];

    for (var i = 0; i < allInputs.length; i++) {
      (function (inp, grp) {
        inp.addEventListener("input", function () {
          clearFieldError(grp, inp);
          inp.classList.remove("input-success");
        });
      }(allInputs[i], allGroups[i]));
    }

    /* ── Form submission handler ── */
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var fields = {
        nameInput:    namePair.input,
        emailInput:   emailPair.input,
        subjectInput: subjectPair.input,
        messageInput: messagePair.input
      };

      var groups = {
        nameGroup:    namePair.group,
        emailGroup:   emailPair.group,
        subjectGroup: subjectPair.group,
        messageGroup: messagePair.group
      };

      /* Hide any existing status */
      statusDiv.classList.remove("visible", "form-status-success", "form-status-error");

      var valid = validateForm(fields, groups);

      if (!valid) {
        /* Focus the first invalid field for accessibility */
        var firstError = form.querySelector(".input-error");
        if (firstError) { firstError.focus(); }
        return;
      }

      /* Simulate async submission */
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      btnLabel.textContent = "Sending…";

      /* setTimeout simulates a network request (CPR-safe async pattern) */
      setTimeout(function () {
        try {
          /* Simulate a successful response */
          var response = { ok: true };

          if (!response.ok) {
            throw new Error("server-error");
          }

          /* Success */
          statusIcon.textContent = "✅";
          statusText.textContent =
            "Thank you! Your message has been sent. We'll get back to you within 24 hours.";
          statusDiv.classList.add("visible", "form-status-success");

          /* Reset form */
          form.reset();
          charCounter.textContent = "0 / 1000";
          charCounter.classList.remove("near-limit", "at-limit");

          for (var r = 0; r < allInputs.length; r++) {
            allInputs[r].classList.remove("input-success", "input-error");
            allInputs[r].setAttribute("aria-invalid", "false");
          }

        } catch (err) {
          /* Error state */
          statusIcon.textContent = "❌";
          statusText.textContent =
            "Something went wrong. Please try again or email us directly at hello@teamagency.com.";
          statusDiv.classList.add("visible", "form-status-error");

        } finally {
          /* Always restore the button */
          submitBtn.disabled = false;
          submitBtn.classList.remove("loading");
          btnLabel.textContent = "Send Message ✉";
          statusDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 1400);
    });

    return form;
  }

  /**
   * Build the GitHub SVG icon element (reused in footer).
   * @returns {SVGElement}
   */
  function createGithubSvg(cssClass) {
    var svg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    if (cssClass) { svg.classList.add(cssClass); }

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

  /**
   * Build and inject the full Contact section into the DOM.
   * Replaces #contact-section-mount placeholder.
   */
  function renderContactSection() {
    var placeholder = document.getElementById("contact-section-mount");
    if (!placeholder) { return; }

    /* ── Section wrapper ── */
    var section = document.createElement("section");
    section.id = "contact";
    section.classList.add("contact-section");
    section.setAttribute("aria-labelledby", "contact-heading");

    var inner = document.createElement("div");
    inner.classList.add("contact-inner");

    /* Section header */
    var header = document.createElement("div");
    header.classList.add("section-header");
    header.innerHTML =
      '<p class="section-label">Get In Touch</p>' +
      '<h2 class="section-title" id="contact-heading">Contact Us</h2>' +
      '<p class="section-subtitle">Have a project in mind? Drop us a line — we\'d love to hear from you.</p>';

    inner.appendChild(header);

    /* ── Two-column layout ── */
    var layout = document.createElement("div");
    layout.classList.add("contact-layout");

    /* Info panel */
    var infoPanel = document.createElement("div");
    infoPanel.classList.add("contact-info");

    var infoIntro = document.createElement("div");
    infoIntro.classList.add("contact-info-intro");

    var infoHeading = document.createElement("h3");
    infoHeading.classList.add("contact-info-heading");
    infoHeading.textContent = "Let's build something great together";

    var infoText = document.createElement("p");
    infoText.classList.add("contact-info-text");
    infoText.textContent =
      "We're a passionate team ready to take on your next digital challenge. " +
      "Whether it's a new project, a collaboration, or just a hello — reach out.";

    infoIntro.appendChild(infoHeading);
    infoIntro.appendChild(infoText);
    infoPanel.appendChild(infoIntro);

    /* Contact detail items */
    var detailsData = [
      { icon: "📧", label: "Email",    value: "hello@teamagency.com"  },
      { icon: "📍", label: "Location", value: "Remote — Worldwide"    },
      { icon: "⏰", label: "Response", value: "Within 24 hours"       }
    ];

    var detailsList = document.createElement("ul");
    detailsList.classList.add("contact-details");

    detailsData.forEach(function (detail) {
      var li = document.createElement("li");
      li.classList.add("contact-detail-item");

      var iconEl = document.createElement("div");
      iconEl.classList.add("contact-detail-icon");
      iconEl.setAttribute("aria-hidden", "true");
      iconEl.textContent = detail.icon;

      var textWrap = document.createElement("div");

      var labelEl = document.createElement("p");
      labelEl.classList.add("contact-detail-label");
      labelEl.textContent = detail.label;

      var valueEl = document.createElement("p");
      valueEl.classList.add("contact-detail-value");
      valueEl.textContent = detail.value;

      textWrap.appendChild(labelEl);
      textWrap.appendChild(valueEl);

      li.appendChild(iconEl);
      li.appendChild(textWrap);
      detailsList.appendChild(li);
    });

    infoPanel.appendChild(detailsList);
    layout.appendChild(infoPanel);

    /* Form panel */
    var formWrapper = document.createElement("div");
    formWrapper.classList.add("contact-form-wrapper");

    var form = buildContactForm();
    formWrapper.appendChild(form);
    layout.appendChild(formWrapper);

    inner.appendChild(layout);
    section.appendChild(inner);

    placeholder.parentNode.replaceChild(section, placeholder);
  }

  /* =========================================================
     4. FOOTER BUILDER
     ========================================================= */

  /**
   * Build and inject the <footer> element into the DOM.
   * Replaces #footer-mount placeholder.
   */
  function renderFooter() {
    var placeholder = document.getElementById("footer-mount");
    if (!placeholder) { return; }

    var footer = document.createElement("footer");
    footer.classList.add("site-footer");
    footer.setAttribute("aria-label", "Site footer");

    var inner = document.createElement("div");
    inner.classList.add("footer-inner");

    /* ── Footer Grid ── */
    var grid = document.createElement("div");
    grid.classList.add("footer-grid");

    /* ── Brand Column ── */
    var brandCol = document.createElement("div");
    brandCol.classList.add("footer-brand");

    /* Logo row */
    var logoRow = document.createElement("div");
    logoRow.classList.add("footer-logo-row");

    /* Re-use the same SVG logo as the header */
    var logoSvgNS = "http://www.w3.org/2000/svg";
    var logoSvg   = document.createElementNS(logoSvgNS, "svg");
    logoSvg.setAttribute("width", "36");
    logoSvg.setAttribute("height", "36");
    logoSvg.setAttribute("viewBox", "0 0 40 40");
    logoSvg.setAttribute("fill", "none");
    logoSvg.setAttribute("aria-hidden", "true");

    var logoRect = document.createElementNS(logoSvgNS, "rect");
    logoRect.setAttribute("width", "40");
    logoRect.setAttribute("height", "40");
    logoRect.setAttribute("rx", "8");
    logoRect.setAttribute("fill", "#2A5298");

    var logoPath = document.createElementNS(logoSvgNS, "path");
    logoPath.setAttribute("d", "M8 12h24M8 20h16M8 28h20");
    logoPath.setAttribute("stroke", "#ffffff");
    logoPath.setAttribute("stroke-width", "3");
    logoPath.setAttribute("stroke-linecap", "round");

    var logoCircle = document.createElementNS(logoSvgNS, "circle");
    logoCircle.setAttribute("cx", "30");
    logoCircle.setAttribute("cy", "26");
    logoCircle.setAttribute("r", "5");
    logoCircle.setAttribute("fill", "#5B8FF9");

    logoSvg.appendChild(logoRect);
    logoSvg.appendChild(logoPath);
    logoSvg.appendChild(logoCircle);

    var agencyName = document.createElement("span");
    agencyName.classList.add("footer-agency-name");
    agencyName.textContent = "Team Agency";

    logoRow.appendChild(logoSvg);
    logoRow.appendChild(agencyName);

    /* Tagline */
    var tagline = document.createElement("p");
    tagline.classList.add("footer-tagline");
    tagline.textContent =
      "A passionate team of designers and developers crafting digital experiences " +
      "that inspire and convert.";

    /* Social / GitHub icon links */
    var socialList = document.createElement("ul");
    socialList.classList.add("footer-social-links");
    socialList.setAttribute("aria-label", "Social links");

    var socialItems = [
      { href: "https://github.com/OJT-Capstone-Projects", label: "GitHub Organisation", icon: null, useGithubSvg: true },
      { href: "mailto:hello@teamagency.com", label: "Email us", icon: "📧", useGithubSvg: false }
    ];

    socialItems.forEach(function (item) {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.classList.add("footer-social-link");
      a.setAttribute("href", item.href);
      a.setAttribute("target", item.href.startsWith("http") ? "_blank" : "_self");
      a.setAttribute("rel", "noopener noreferrer");
      a.setAttribute("aria-label", item.label);

      if (item.useGithubSvg) {
        a.appendChild(createGithubSvg("footer-gh-icon"));
      } else {
        a.setAttribute("aria-hidden", "false");
        a.textContent = item.icon;
      }

      li.appendChild(a);
      socialList.appendChild(li);
    });

    brandCol.appendChild(logoRow);
    brandCol.appendChild(tagline);
    brandCol.appendChild(socialList);
    grid.appendChild(brandCol);

    /* ── Quick Links Column ── */
    var quickLinksCol = document.createElement("nav");
    quickLinksCol.setAttribute("aria-label", "Footer navigation");

    var qlHeading = document.createElement("h3");
    qlHeading.classList.add("footer-col-heading");
    qlHeading.textContent = "Quick Links";
    quickLinksCol.appendChild(qlHeading);

    var qlList = document.createElement("ul");
    qlList.classList.add("footer-nav-list");

    quickLinks.forEach(function (link) {
      var li  = document.createElement("li");
      var a   = document.createElement("a");
      a.classList.add("footer-nav-link");
      a.setAttribute("href", link.href);
      a.textContent = link.label;
      li.appendChild(a);
      qlList.appendChild(li);
    });

    quickLinksCol.appendChild(qlList);
    grid.appendChild(quickLinksCol);

    /* ── GitHub Links Column ── */
    var githubCol = document.createElement("div");

    var ghHeading = document.createElement("h3");
    ghHeading.classList.add("footer-col-heading");
    ghHeading.textContent = "Team on GitHub";
    githubCol.appendChild(ghHeading);

    var ghList = document.createElement("ul");
    ghList.classList.add("footer-github-list");
    ghList.setAttribute("aria-label", "Team GitHub profiles");

    githubLinks.forEach(function (member) {
      var li = document.createElement("li");
      li.classList.add("footer-github-item");

      var a = document.createElement("a");
      a.classList.add("footer-github-item-link");
      a.setAttribute("href", member.url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      a.setAttribute("aria-label", member.name + " on GitHub");

      a.appendChild(createGithubSvg("footer-gh-icon"));

      var nameSpan = document.createElement("span");
      nameSpan.textContent = member.name;
      a.appendChild(nameSpan);

      li.appendChild(a);
      ghList.appendChild(li);
    });

    githubCol.appendChild(ghList);
    grid.appendChild(githubCol);

    inner.appendChild(grid);

    /* ── Footer Bottom Bar ── */
    var bottomBar = document.createElement("div");
    bottomBar.classList.add("footer-bottom");

    var year = new Date().getFullYear();
    var copyright = document.createElement("p");
    copyright.classList.add("footer-copyright");
    copyright.innerHTML =
      "&copy; " + year + " <strong>Team Agency</strong>. All rights reserved. " +
      "Built with HTML, CSS &amp; JavaScript.";

    var bottomLinks = document.createElement("ul");
    bottomLinks.classList.add("footer-bottom-links");
    bottomLinks.setAttribute("aria-label", "Legal links");

    var legalItems = [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use",   href: "#" }
    ];

    legalItems.forEach(function (item) {
      var li = document.createElement("li");
      var a  = document.createElement("a");
      a.classList.add("footer-bottom-link");
      a.setAttribute("href", item.href);
      a.textContent = item.label;
      li.appendChild(a);
      bottomLinks.appendChild(li);
    });

    bottomBar.appendChild(copyright);
    bottomBar.appendChild(bottomLinks);
    inner.appendChild(bottomBar);

    footer.appendChild(inner);
    placeholder.parentNode.replaceChild(footer, placeholder);
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    renderContactSection();
    renderFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
