# Internship Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page English internship portfolio website for GitHub Pages that introduces Tianyu Zhang, highlights three featured projects, and provides safe placeholder states for screenshots and resume assets.

**Architecture:** The site is a static HTML/CSS/JS application. Content lives in `content.js`, pure render helpers live in `app.js`, and `index.html` provides semantic containers that the script fills at runtime. Node's built-in test runner verifies the content model, render helpers, HTML shell wiring, and placeholder-safe behavior without adding external dependencies.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, SVG placeholder assets, Node built-in test runner (`node --test`), GitHub Pages

---

## Preconditions

- Work from the checked-out root of the `Personalwebsite` repository.
- If the current local folder is not connected to the GitHub repo yet, clone or attach the repo before starting Task 1 so commits land in the right place.

## File Map

- `index.html`
  Semantic page shell with section anchors, render targets, metadata, and module entrypoint.
- `styles.css`
  Theme variables, layout system, typography, responsive rules, hover states, disabled CTA styling, and focus states.
- `content.js`
  Centralized editable portfolio data for profile copy, navigation, projects, resume state, contact links, and footer note.
- `app.js`
  Pure helper functions for HTML generation plus the DOM mounting logic that fills the page from `content.js`.
- `tests/web/test_app.js`
  Node tests for content shape, resume fallback behavior, HTML shell structure, render helper output, DOM mounting, CSS presence, and placeholder assets.
- `assets/placeholders/hero-shape.svg`
  Decorative hero-side visual used until a custom portrait or illustration is available.
- `assets/placeholders/portfolio-placeholder.svg`
  Reusable project preview placeholder used until real screenshots are added.

### Task 1: Create the Content Model and Resume Fallback Helper

**Files:**
- Create: `content.js`
- Create: `app.js`
- Create: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { portfolioContent } from '../../content.js';
import { getResumeState } from '../../app.js';

test('portfolio content includes the fixed internship profile and three featured projects', () => {
  assert.equal(portfolioContent.profile.name, 'Tianyu Zhang');
  assert.equal(portfolioContent.navigation.length, 3);
  assert.equal(portfolioContent.projects.length, 3);
  assert.equal(portfolioContent.resume.available, false);
  assert.equal(portfolioContent.contact[0].href, 'mailto:zhant173@mcmaster.ca');
});

test('resume state returns a disabled CTA when no PDF is available', () => {
  const state = getResumeState(portfolioContent.resume);

  assert.equal(state.isDisabled, true);
  assert.equal(state.href, '#resume');
  assert.equal(state.label, 'Resume PDF coming soon');
  assert.match(state.helperText, /PDF version will be added/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`  
Expected: FAIL with `ERR_MODULE_NOT_FOUND` because `content.js` and `app.js` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

`content.js`

```js
export const portfolioContent = {
  profile: {
    name: 'Tianyu Zhang',
    headline: 'M.Eng Student in Systems and Technology',
    intro:
      'I build software that makes complex workflows faster, clearer, and easier to use. I am currently looking for internship opportunities in software engineering, backend development, and full-stack product work.',
    availability: 'Open to internship opportunities',
  },
  navigation: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ],
  about: {
    paragraphs: [
      'I am a Master of Engineering student at McMaster University with project experience across full-stack applications, data systems, and applied software for robotics workflows.',
      'My recent work focuses on performance-sensitive product improvements, practical system design, and building software that is useful in real operational settings.',
    ],
    stats: ['M.Eng Student', 'Full-Stack + Backend', 'Performance-Focused Projects'],
  },
  projects: [
    {
      slug: 'process-platform',
      kicker: 'Featured Project',
      title: 'Industrial Process Modeling Platform',
      summary:
        'Improved a research modeling platform by replacing slow full-model save flows with faster incremental updates and batched result handling.',
      bullets: [
        'Reduced save time from 40 seconds to 3 seconds.',
        'Reduced post-computation processing time from 30 seconds to 4 seconds.',
        'Contributed through a GitHub-based branch workflow with 50+ commits.',
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Industrial Process Modeling Platform project',
      },
    },
    {
      slug: 'robot-car',
      kicker: 'Featured Project',
      title: 'Vision-Assisted Arduino Robot Car',
      summary:
        'Built a browser-driven robotics workflow that combines teleoperation, telemetry, and host-side computer vision feedback.',
      bullets: [
        'Connected Angular controls, WebSocket messaging, and Arduino motion logic.',
        'Integrated ESP32-S3 camera streaming and a Python vision pipeline.',
        'Supported assisted driving with real-time detections and operator feedback.',
      ],
      stack: ['Angular', 'Python', 'WebSocket', 'Arduino UNO', 'ESP32-S3'],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Vision-Assisted Arduino Robot Car project',
      },
    },
    {
      slug: 'analytics-dashboard',
      kicker: 'Featured Project',
      title: 'Consumer Behaviour Analytics Dashboard',
      summary:
        'Turned shopping data into practical decision support with interpretable models and a Grafana dashboard.',
      bullets: [
        'Analyzed a 3,900-record retail dataset for targeting and inventory insights.',
        'Reached about 0.83 accuracy and 0.81 AUC on coupon-usage prediction.',
        'Presented KPI, sales, and regional trends through a multi-panel dashboard.',
      ],
      stack: ['Python', 'Logistic Regression', 'Random Forest', 'Grafana'],
      image: {
        src: 'assets/placeholders/portfolio-placeholder.svg',
        alt: 'Placeholder preview for the Consumer Behaviour Analytics Dashboard project',
      },
    },
  ],
  resume: {
    available: false,
    label: 'Download Resume',
    fallbackLabel: 'Resume PDF coming soon',
    helperText: 'A polished PDF version will be added before applications are shared.',
    path: 'assets/resume/Tianyu_Zhang_Resume.pdf',
  },
  contact: [
    {
      label: 'Email',
      value: 'zhant173@mcmaster.ca',
      href: 'mailto:zhant173@mcmaster.ca',
      available: true,
    },
    {
      label: 'GitHub',
      value: 'github.com/ConnorZTY001108',
      href: 'https://github.com/ConnorZTY001108',
      available: true,
    },
    {
      label: 'LinkedIn',
      value: 'LinkedIn will be added soon',
      href: '',
      available: false,
    },
  ],
  footer: {
    note: 'Built for internship applications and GitHub Pages.',
  },
};
```

`app.js`

```js
export function getResumeState(resume) {
  if (resume.available) {
    return {
      href: resume.path,
      label: resume.label,
      helperText: '',
      isDisabled: false,
    };
  }

  return {
    href: '#resume',
    label: resume.fallbackLabel,
    helperText: resume.helperText,
    isDisabled: true,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`  
Expected: PASS with 2 passing tests and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add content.js app.js tests/web/test_app.js
git commit -m "feat: add portfolio content model"
```

### Task 2: Create the Semantic HTML Shell

**Files:**
- Create: `index.html`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Update the import section at the top of `tests/web/test_app.js` and then add the new test below the existing ones:

```js
import fs from 'node:fs';
```

```js

test('index shell defines the required sections and the module entrypoint', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

  assert.ok(html.includes('id="about"'));
  assert.ok(html.includes('id="projects"'));
  assert.ok(html.includes('id="resume"'));
  assert.ok(html.includes('id="contact"'));
  assert.ok(html.includes('id="project-grid"'));
  assert.ok(html.includes('id="contact-list"'));
  assert.ok(html.includes('<script type="module" src="./app.js"></script>'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`  
Expected: FAIL with `ENOENT` for `index.html`.

- [ ] **Step 3: Write minimal implementation**

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tianyu Zhang | Internship Portfolio</title>
    <meta
      name="description"
      content="English internship portfolio for Tianyu Zhang, featuring software engineering, backend, and full-stack projects."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <header class="site-header" id="top">
      <div class="shell header-inner">
        <a class="brand" href="#top" id="site-name">Tianyu Zhang</a>
        <nav aria-label="Primary navigation">
          <ul class="nav-list" id="nav-list"></ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero shell" id="hero">
        <div class="hero-copy">
          <p class="eyebrow" id="hero-availability"></p>
          <h1 id="hero-name"></h1>
          <p class="hero-headline" id="hero-headline"></p>
          <p class="hero-intro" id="hero-intro"></p>
          <div class="hero-actions">
            <a class="button button-primary" href="#projects">View Projects</a>
            <a class="button button-secondary" id="resume-button" href="#resume">Download Resume</a>
          </div>
          <p class="resume-helper" id="resume-helper"></p>
        </div>

        <div class="hero-visual">
          <img
            class="hero-art"
            src="assets/placeholders/hero-shape.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section class="about shell" id="about">
        <div class="section-heading">
          <p class="eyebrow">About</p>
          <h2>Building practical software with clear engineering impact.</h2>
        </div>
        <div class="about-copy" id="about-copy"></div>
        <ul class="stat-list" id="about-stats"></ul>
      </section>

      <section class="projects shell" id="projects">
        <div class="section-heading">
          <p class="eyebrow">Featured Projects</p>
          <h2>Selected work across product engineering, data, and robotics.</h2>
        </div>
        <div class="project-grid" id="project-grid"></div>
      </section>

      <section class="resume shell" id="resume">
        <div class="resume-card">
          <p class="eyebrow">Resume</p>
          <h2>Request the full PDF version.</h2>
          <p id="resume-copy">
            The portfolio is live first. The final downloadable PDF resume will be attached next.
          </p>
          <a class="button button-primary" id="resume-card-button" href="#resume">Download Resume</a>
        </div>
      </section>

      <section class="contact shell" id="contact">
        <div class="section-heading">
          <p class="eyebrow">Contact</p>
          <h2>Get in touch for internship opportunities.</h2>
        </div>
        <div class="contact-list" id="contact-list"></div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="shell">
        <p id="footer-note"></p>
      </div>
    </footer>

    <script type="module" src="./app.js"></script>
  </body>
</html>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`  
Expected: PASS with 3 passing tests and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/web/test_app.js
git commit -m "feat: scaffold portfolio page shell"
```

### Task 3: Implement Pure Render Helpers for Navigation, Stats, Projects, and Contact Links

**Files:**
- Modify: `app.js`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Update the existing import from `../../app.js` and then add the new tests below the existing ones:

```js
import {
  renderNavigation,
  renderStatPills,
  renderProjectCards,
  renderContactLinks,
} from '../../app.js';
```

```js

test('render helpers output the expected navigation, stat pills, and project cards', () => {
  const navMarkup = renderNavigation(portfolioContent.navigation);
  const statMarkup = renderStatPills(portfolioContent.about.stats);
  const projectMarkup = renderProjectCards(portfolioContent.projects);

  assert.match(navMarkup, /href="#about"/);
  assert.match(statMarkup, /Performance-Focused Projects/);
  assert.match(projectMarkup, /Industrial Process Modeling Platform/);
  assert.match(projectMarkup, /40 seconds to 3 seconds/);
  assert.match(projectMarkup, /assets\/placeholders\/portfolio-placeholder\.svg/);
  assert.equal((projectMarkup.match(/class="project-card"/g) ?? []).length, 3);
});

test('contact rendering hides unavailable links', () => {
  const contactMarkup = renderContactLinks(portfolioContent.contact);

  assert.match(contactMarkup, /mailto:zhant173@mcmaster.ca/);
  assert.match(contactMarkup, /github\.com\/ConnorZTY001108/);
  assert.doesNotMatch(contactMarkup, /LinkedIn will be added soon/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`  
Expected: FAIL because the new render helper exports do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Replace `app.js` with:

```js
import { portfolioContent } from './content.js';

export function getResumeState(resume) {
  if (resume.available) {
    return {
      href: resume.path,
      label: resume.label,
      helperText: '',
      isDisabled: false,
    };
  }

  return {
    href: '#resume',
    label: resume.fallbackLabel,
    helperText: resume.helperText,
    isDisabled: true,
  };
}

export function renderNavigation(items) {
  return items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join('');
}

export function renderStatPills(stats) {
  return stats.map((item) => `<li class="stat-pill">${item}</li>`).join('');
}

export function renderProjectCards(projects) {
  return projects
    .map(
      (project) => `
        <article class="project-card">
          <figure class="project-media">
            <img src="${project.image.src}" alt="${project.image.alt}" />
          </figure>
          <div class="project-copy">
            <p class="eyebrow">${project.kicker}</p>
            <h3>${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
            <ul class="project-bullets">
              ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <ul class="tag-list">
              ${project.stack.map((tag) => `<li>${tag}</li>`).join('')}
            </ul>
          </div>
        </article>
      `,
    )
    .join('');
}

export function renderContactLinks(items) {
  return items
    .filter((item) => item.available)
    .map((item) => {
      const externalAttrs = item.href.startsWith('http')
        ? ' target="_blank" rel="noreferrer"'
        : '';

      return `
        <a class="contact-card" href="${item.href}"${externalAttrs}>
          <span class="contact-label">${item.label}</span>
          <span class="contact-value">${item.value}</span>
        </a>
      `;
    })
    .join('');
}

export { portfolioContent };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`  
Expected: PASS with 5 passing tests and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add app.js tests/web/test_app.js
git commit -m "feat: add portfolio render helpers"
```

### Task 4: Mount Content into the Page and Apply Safe CTA Behavior

**Files:**
- Modify: `app.js`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Update the existing import from `../../app.js`, then add these helpers and the new test below the existing ones:

```js
import { renderPortfolio } from '../../app.js';
```

```js
function createMockElement() {
  const classStore = new Set();

  return {
    textContent: '',
    innerHTML: '',
    href: '',
    attributes: {},
    classList: {
      add: (...names) => names.forEach((name) => classStore.add(name)),
      remove: (...names) => names.forEach((name) => classStore.delete(name)),
      contains: (name) => classStore.has(name),
    },
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    removeAttribute(name) {
      delete this.attributes[name];
    },
  };
}

function createMockDocument() {
  const ids = [
    'site-name',
    'nav-list',
    'hero-availability',
    'hero-name',
    'hero-headline',
    'hero-intro',
    'about-copy',
    'about-stats',
    'project-grid',
    'resume-button',
    'resume-card-button',
    'resume-helper',
    'contact-list',
    'footer-note',
  ];

  const nodes = new Map(ids.map((id) => [id, createMockElement()]));

  return {
    getElementById(id) {
      return nodes.get(id);
    },
  };
}

test('renderPortfolio mounts the content and disables resume CTAs safely', () => {
  const mockDocument = createMockDocument();
  renderPortfolio(portfolioContent, mockDocument);

  assert.equal(mockDocument.getElementById('site-name').textContent, 'Tianyu Zhang');
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /Projects/);
  assert.match(mockDocument.getElementById('about-copy').innerHTML, /Master of Engineering student/);
  assert.match(mockDocument.getElementById('project-grid').innerHTML, /Vision-Assisted Arduino Robot Car/);
  assert.equal(mockDocument.getElementById('resume-button').href, '#resume');
  assert.equal(mockDocument.getElementById('resume-button').attributes['aria-disabled'], 'true');
  assert.equal(mockDocument.getElementById('resume-card-button').attributes['aria-disabled'], 'true');
  assert.match(mockDocument.getElementById('contact-list').innerHTML, /mailto:zhant173@mcmaster.ca/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`  
Expected: FAIL because `renderPortfolio` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Update `app.js` to add the mount functions:

```js
import { portfolioContent } from './content.js';

export function getResumeState(resume) {
  if (resume.available) {
    return {
      href: resume.path,
      label: resume.label,
      helperText: '',
      isDisabled: false,
    };
  }

  return {
    href: '#resume',
    label: resume.fallbackLabel,
    helperText: resume.helperText,
    isDisabled: true,
  };
}

export function renderNavigation(items) {
  return items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join('');
}

export function renderStatPills(stats) {
  return stats.map((item) => `<li class="stat-pill">${item}</li>`).join('');
}

export function renderProjectCards(projects) {
  return projects
    .map(
      (project) => `
        <article class="project-card">
          <figure class="project-media">
            <img src="${project.image.src}" alt="${project.image.alt}" />
          </figure>
          <div class="project-copy">
            <p class="eyebrow">${project.kicker}</p>
            <h3>${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
            <ul class="project-bullets">
              ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <ul class="tag-list">
              ${project.stack.map((tag) => `<li>${tag}</li>`).join('')}
            </ul>
          </div>
        </article>
      `,
    )
    .join('');
}

export function renderContactLinks(items) {
  return items
    .filter((item) => item.available)
    .map((item) => {
      const externalAttrs = item.href.startsWith('http')
        ? ' target="_blank" rel="noreferrer"'
        : '';

      return `
        <a class="contact-card" href="${item.href}"${externalAttrs}>
          <span class="contact-label">${item.label}</span>
          <span class="contact-value">${item.value}</span>
        </a>
      `;
    })
    .join('');
}

function renderAboutParagraphs(paragraphs) {
  return paragraphs.map((text) => `<p>${text}</p>`).join('');
}

function applyResumeState(doc, resumeState) {
  const heroButton = doc.getElementById('resume-button');
  const cardButton = doc.getElementById('resume-card-button');
  const helper = doc.getElementById('resume-helper');

  [heroButton, cardButton].forEach((button) => {
    button.href = resumeState.href;
    button.textContent = resumeState.label;

    if (resumeState.isDisabled) {
      button.classList.add('is-disabled');
      button.setAttribute('aria-disabled', 'true');
    } else {
      button.classList.remove('is-disabled');
      button.removeAttribute('aria-disabled');
    }
  });

  helper.textContent = resumeState.helperText;
}

export function renderPortfolio(content = portfolioContent, doc = document) {
  doc.getElementById('site-name').textContent = content.profile.name;
  doc.getElementById('nav-list').innerHTML = renderNavigation(content.navigation);
  doc.getElementById('hero-availability').textContent = content.profile.availability;
  doc.getElementById('hero-name').textContent = content.profile.name;
  doc.getElementById('hero-headline').textContent = content.profile.headline;
  doc.getElementById('hero-intro').textContent = content.profile.intro;
  doc.getElementById('about-copy').innerHTML = renderAboutParagraphs(content.about.paragraphs);
  doc.getElementById('about-stats').innerHTML = renderStatPills(content.about.stats);
  doc.getElementById('project-grid').innerHTML = renderProjectCards(content.projects);
  doc.getElementById('contact-list').innerHTML = renderContactLinks(content.contact);
  doc.getElementById('footer-note').textContent = content.footer.note;

  applyResumeState(doc, getResumeState(content.resume));
}

export function bootPortfolio(doc = document) {
  renderPortfolio(portfolioContent, doc);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    bootPortfolio(document);
  });
}

export { portfolioContent };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`  
Expected: PASS with 6 passing tests and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add app.js tests/web/test_app.js
git commit -m "feat: mount portfolio content into the page"
```

### Task 5: Add the Visual System, Responsive Layout, and Placeholder Assets

**Files:**
- Create: `styles.css`
- Create: `assets/placeholders/hero-shape.svg`
- Create: `assets/placeholders/portfolio-placeholder.svg`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Append these tests to `tests/web/test_app.js`:

```js
test('styles include smooth scrolling, disabled CTA styling, and a mobile breakpoint', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /scroll-behavior:\s*smooth/);
  assert.match(css, /\.button\.is-disabled/);
  assert.match(css, /\.project-card:hover/);
  assert.match(css, /@media\s*\(max-width:\s*800px\)/);
});

test('placeholder SVG assets exist for the hero art and project previews', () => {
  assert.equal(
    fs.existsSync(new URL('../../assets/placeholders/hero-shape.svg', import.meta.url)),
    true,
  );
  assert.equal(
    fs.existsSync(new URL('../../assets/placeholders/portfolio-placeholder.svg', import.meta.url)),
    true,
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`  
Expected: FAIL because `styles.css` and the placeholder SVGs do not exist yet.

- [ ] **Step 3: Write minimal implementation**

`styles.css`

```css
:root {
  --bg: #f5efe5;
  --surface: rgba(255, 252, 247, 0.72);
  --surface-strong: #fffaf3;
  --text: #1e1c19;
  --muted: #5c564d;
  --line: rgba(30, 28, 25, 0.12);
  --accent: #b85c38;
  --accent-dark: #8f4428;
  --shadow: 0 24px 60px rgba(39, 27, 18, 0.08);
  --radius-lg: 28px;
  --radius-md: 18px;
  --radius-sm: 999px;
  --shell: min(1120px, calc(100vw - 40px));
}

html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(184, 92, 56, 0.14), transparent 28%),
    linear-gradient(180deg, #f7f1e7 0%, #efe5d7 100%);
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

.shell {
  width: var(--shell);
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: rgba(245, 239, 229, 0.74);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
}

.brand,
h1,
h2,
h3 {
  font-family: 'Fraunces', serif;
}

.nav-list,
.stat-list,
.tag-list,
.project-bullets {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-list {
  display: flex;
  gap: 24px;
}

.hero,
.about,
.projects,
.resume,
.contact {
  padding: 88px 0;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 36px;
  align-items: center;
  min-height: calc(100vh - 72px);
}

.eyebrow {
  margin: 0 0 14px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.hero h1 {
  margin: 0;
  font-size: clamp(3rem, 8vw, 5.8rem);
  line-height: 0.94;
}

.hero-headline {
  margin: 18px 0 12px;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--muted);
}

.hero-intro,
.about-copy p,
#resume-copy,
#footer-note {
  font-size: 1.02rem;
  line-height: 1.75;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  border: 1px solid transparent;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 18px 32px rgba(184, 92, 56, 0.22);
}

.button-primary:hover {
  background: var(--accent-dark);
}

.button-secondary {
  background: var(--surface-strong);
  border-color: var(--line);
}

.button.is-disabled {
  opacity: 0.58;
  pointer-events: none;
  box-shadow: none;
}

.resume-helper {
  min-height: 24px;
  margin-top: 12px;
  color: var(--muted);
}

.hero-visual,
.resume-card,
.contact-card,
.project-card {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.hero-visual {
  padding: 26px;
}

.hero-art {
  width: 100%;
  min-height: 420px;
  object-fit: cover;
  border-radius: calc(var(--radius-lg) - 8px);
}

.section-heading {
  max-width: 760px;
  margin-bottom: 28px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.about-copy {
  display: grid;
  gap: 16px;
  max-width: 760px;
}

.stat-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.stat-pill,
.tag-list li {
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: rgba(255, 250, 243, 0.86);
  border: 1px solid var(--line);
}

.project-grid {
  display: grid;
  gap: 24px;
}

.project-card {
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) 1.05fr;
  overflow: hidden;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 80px rgba(39, 27, 18, 0.12);
}

.project-media {
  margin: 0;
  min-height: 100%;
  background: linear-gradient(180deg, rgba(184, 92, 56, 0.16), rgba(30, 28, 25, 0.06));
}

.project-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-copy {
  padding: 28px;
}

.project-copy h3 {
  margin: 0 0 12px;
  font-size: 2rem;
}

.project-summary {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.7;
}

.project-bullets {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
  color: var(--text);
}

.project-bullets li {
  padding-left: 18px;
  position: relative;
  line-height: 1.65;
}

.project-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.resume-card {
  padding: 32px;
}

.contact-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.contact-card {
  padding: 24px;
  transition: transform 180ms ease;
}

.contact-card:hover {
  transform: translateY(-2px);
}

.contact-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.contact-value {
  display: block;
  margin-top: 10px;
  font-size: 1.05rem;
}

.site-footer {
  padding: 0 0 48px;
}

.button:focus-visible,
.contact-card:focus-visible,
.nav-list a:focus-visible {
  outline: 3px solid rgba(184, 92, 56, 0.35);
  outline-offset: 3px;
}

@media (max-width: 800px) {
  .header-inner {
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding: 14px 0;
  }

  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 48px;
  }

  .project-card {
    grid-template-columns: 1fr;
  }

  .project-copy,
  .resume-card {
    padding: 22px;
  }

  .hero,
  .about,
  .projects,
  .resume,
  .contact {
    padding: 64px 0;
  }
}
```

`assets/placeholders/hero-shape.svg`

```svg
<svg width="1200" height="1400" viewBox="0 0 1200 1400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="1400" rx="72" fill="#F7EFE4"/>
  <circle cx="300" cy="260" r="220" fill="#EAB596"/>
  <circle cx="920" cy="430" r="310" fill="#D97D52" fill-opacity="0.78"/>
  <path d="M144 980C144 835.854 260.854 719 405 719H875C973.307 719 1053 798.693 1053 897V1180C1053 1260.08 988.077 1325 908 1325H289C209.471 1325 144 1259.53 144 1180V980Z" fill="#FFF8F1"/>
  <path d="M250 1090C338.667 969.333 450.333 909 585 909C719.667 909 831.333 969.333 920 1090" stroke="#1E1C19" stroke-width="28" stroke-linecap="round"/>
  <circle cx="490" cy="1008" r="26" fill="#1E1C19"/>
  <circle cx="680" cy="1008" r="26" fill="#1E1C19"/>
  <path d="M358 777C418.667 680.333 495 632 587 632C679 632 755.333 680.333 816 777" stroke="#1E1C19" stroke-width="32" stroke-linecap="round"/>
</svg>
```

`assets/placeholders/portfolio-placeholder.svg`

```svg
<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1600" height="1000" rx="56" fill="#FFF8F1"/>
  <rect x="88" y="84" width="1424" height="832" rx="36" fill="#F3E5D7"/>
  <rect x="156" y="164" width="620" height="76" rx="18" fill="#D97D52" fill-opacity="0.24"/>
  <rect x="156" y="284" width="1010" height="28" rx="14" fill="#C4B3A4"/>
  <rect x="156" y="340" width="918" height="28" rx="14" fill="#C4B3A4"/>
  <rect x="156" y="396" width="1044" height="28" rx="14" fill="#C4B3A4"/>
  <rect x="156" y="500" width="508" height="272" rx="26" fill="#EAB596"/>
  <rect x="700" y="500" width="672" height="68" rx="18" fill="#FFFFFF"/>
  <rect x="700" y="602" width="612" height="24" rx="12" fill="#C4B3A4"/>
  <rect x="700" y="648" width="548" height="24" rx="12" fill="#C4B3A4"/>
  <rect x="700" y="694" width="632" height="24" rx="12" fill="#C4B3A4"/>
  <rect x="700" y="760" width="244" height="56" rx="28" fill="#B85C38"/>
</svg>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`  
Expected: PASS with 8 passing tests and exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add styles.css assets/placeholders/hero-shape.svg assets/placeholders/portfolio-placeholder.svg tests/web/test_app.js
git commit -m "feat: add portfolio styling and placeholders"
```

## Final Verification

- Run the automated checks:

```bash
node --test tests/web/test_app.js
```

Expected: all 8 tests pass with exit code `0`.

- Start a local static server from the repo root:

```bash
python -m http.server 8000
```

Expected: the site is available at `http://localhost:8000/`.

- Manual browser checks:
  - Confirm the header sticks and the section links jump to `About`, `Projects`, and `Contact`.
  - Confirm the hero copy introduces Tianyu as an internship candidate.
  - Confirm the page shows exactly three project cards with placeholder preview graphics.
  - Confirm both resume buttons are visibly disabled and do not lead to a broken file.
  - Confirm the LinkedIn card is hidden while email and GitHub remain visible.
  - Confirm the layout remains readable in a narrow mobile viewport.

## Spec Coverage Check

- Single-page GitHub Pages architecture: covered by Tasks 2 through 5.
- Centralized editable content: covered by Task 1.
- Hero, About, Projects, Resume CTA, Contact, and Footer sections: covered by Tasks 2 and 4.
- Safe placeholder behavior for screenshots and resume assets: covered by Tasks 1, 4, and 5.
- Balanced visual direction with responsive behavior: covered by Task 5.
- Automated validation and manual verification guidance: covered by every task plus the Final Verification section.
