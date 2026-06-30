
Open `index.html` in your browser — no build step required.
# Team Agency Portfolio

A fully responsive, multi-section agency portfolio website built with **pure HTML, CSS, and JavaScript** — no frameworks, no libraries, no build tools.

🔗 **Live Site:** [ojt-capstone-projects.github.io/Team-Agency-Portfolio](https://ojt-capstone-projects.github.io/Team-Agency-Portfolio/)
📦 **Repository:** [github.com/OJT-Capstone-Projects/Team-Agency-Portfolio](https://github.com/OJT-Capstone-Projects/Team-Agency-Portfolio)

---

## 👥 Team Members

| Name | Role | GitHub |
|------|------|--------|
| Abhishek Yadav | Frontend Developer | [@abhishekydvtech65](https://github.com/abhishekydvtech65) |
| Sumit Tiwari | Frontend Developer | [@sumittiwari1302](https://github.com/sumittiwari1302) |
| Rudraabhishek | Aspiring AI Engineer | [@rudraabhishek-collab](https://github.com/rudraabhishek-collab) |
| Khushi Shah | Frontend Engineer | [@shahkhushi0307](https://github.com/shahkhushi0307) |

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Semantic structure & accessibility |
| CSS3 | Flexbox, Grid, animations — no variables |
| Vanilla JavaScript | DOM manipulation, CPR syllabus only |
| localStorage | Theme persistence |
| GitHub Pages | Deployment |

> ❌ No React · No Vue · No Angular · No Bootstrap · No Tailwind · No jQuery

---

## 📁 Project Structure

Team_agency_portfolio/ │ ├── index.html # Main HTML — all section mount points │ ├── css/ │ ├── header-hero.css # Header, Nav, Hero, About styles │ ├── team-skills.css # Team Members & Skills styles │ ├── projects.css # Projects Showcase styles │ └── contact-footer.css # Contact form & Footer styles │ ├── js/ │ ├── header-hero.js # Header, Nav, Hero, About, Theme toggle │ ├── team-skills.js # Team & Skills sections (dynamic render) │ ├── projects.js # Projects section (dynamic render) │ └── contact-footer.js # Contact form & Footer (dynamic render) │ └── assets/ ├── images/ └── icons/



---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/OJT-Capstone-Projects/Team-Agency-Portfolio.git

# Navigate into the project
cd Team-Agency-Portfolio

# Open in browser — no build step required
open index.html
📄 Sections
Section	Description	Status
Header	Fixed nav with hamburger menu & scroll-spy	✅ Done
Hero	Headline, CTA buttons, animated visual cards	✅ Done
About	Mission, Vision, animated stats counter	✅ Done
Team	4 member cards with initials avatar, bio, skills, GitHub	✅ Done
Skills	6 skill cards with animated progress bars	✅ Done
Projects	6 live project cards with screenshot previews & filters	✅ Done
Contact	Validated contact form with real-time error feedback	✅ Done
Footer	Quick links, Team GitHub links, copyright	✅ Done
🎨 Features
Dark / Light Theme — one-click toggle, persisted via localStorage
Mobile Responsive — works at 320px, 768px, and desktop
Scroll-Spy Navigation — active nav link updates on scroll
Dynamic Rendering — all sections built with createElement() / appendChild()
Animated Stats Counter — triggers on scroll via IntersectionObserver
Project Previews — live screenshot thumbnails via Microlink API with fallback cards
Contact Form Validation — try / catch / finally, inline errors, character counter
Skill Progress Bars — animate in when section enters the viewport
🗂️ Projects Showcased
Project	Live	Repo
Kanban Task Board	View Live	GitHub
Live News Feed	View Live	GitHub
GitHub Developer Explorer	View Live	GitHub
Interactive Quiz App	View Live	GitHub
Expense Tracker	View Live	GitHub
Team Agency Portfolio	View Live	GitHub
🧠 JavaScript Methods
createElement()       // Build every DOM element dynamically
appendChild()         // Attach elements to the DOM
innerHTML             // Inject section headers
innerText             // Set text content safely
forEach()             // Iterate over data arrays
map()                 // Transform arrays into DOM elements
filter()              // Filter projects by category
querySelector()       // Select single DOM elements
querySelectorAll()    // Select multiple DOM elements
localStorage          // Persist theme preference
IntersectionObserver  // Trigger animations on scroll
requestAnimationFrame // Smooth counter animation
try / catch / finally // Form validation error handling
🌐 Deployment
Deployed on GitHub Pages from the main branch.

To redeploy after changes:

git add .
git commit -m "your message"
git push origin main
GitHub Pages auto-rebuilds within ~60 seconds.

📝 License
This project was built as an OJT Capstone Project for educational purposes.
