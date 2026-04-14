# Homepage Editorial Systems Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage into an editorial-tech portfolio that feels materially different from the current site while preserving the existing project content, routes, and resume/contact flows.

**Architecture:** Keep the homepage data-driven through `content.js` and `app.js`, but replace the current homepage contract with a new editorial hero, selected-work index, sharpened profile section, and feature-style project blocks. Treat `index.html` as a new shell for the homepage and `styles.css` as a homepage-scoped redesign layer; project detail pages stay functional and visually unchanged in this pass.

**Tech Stack:** Static HTML, ES modules, CSS, `node:test`

---

## File Map

- Modify: `C:\Users\19612\Desktop\job\Personal_website\content.js`
  Responsibility: Replace the current homepage copy shape so hero, profile, and project metadata match the new editorial systems design.
- Modify: `C:\Users\19612\Desktop\job\Personal_website\app.js`
  Responsibility: Replace homepage render helpers and mount logic so the new shell receives hero summary, selected-work index items, hero meta strip, profile principles, and feature-style project markup.
- Modify: `C:\Users\19612\Desktop\job\Personal_website\index.html`
  Responsibility: Replace the current homepage shell with the editorial hero, selected-work index, meta strip, profile layout, and updated section framing.
- Modify: `C:\Users\19612\Desktop\job\Personal_website\styles.css`
  Responsibility: Remove the current homepage's card-heavy command-surface styling and replace it with the editorial systems palette, typography, spacing, and responsive layout.
- Modify: `C:\Users\19612\Desktop\job\Personal_website\tests\web\test_app.js`
  Responsibility: Lock the homepage contract, render helper output, shell hooks, and CSS selector expectations before implementation.

## Task 1: Reshape Homepage Data And Render Helpers

**Files:**
- Modify: `C:\Users\19612\Desktop\job\Personal_website\tests\web\test_app.js`
- Modify: `C:\Users\19612\Desktop\job\Personal_website\content.js`
- Modify: `C:\Users\19612\Desktop\job\Personal_website\app.js`

- [ ] **Step 1: Write the failing tests for the editorial homepage contract**

Add or replace the homepage assertions in `tests/web/test_app.js` with this contract:

```js
test('portfolio content exposes editorial systems homepage fields', () => {
  assert.equal(
    portfolioContent.profile.headline,
    'Software engineer for workflow systems, product tooling, and applied backend work',
  );
  assert.equal(
    portfolioContent.profile.summary,
    'I turn messy operational workflows into software that feels clear to use, reliable to maintain, and credible in real engineering settings.',
  );
  assert.deepEqual(portfolioContent.profile.metaStrip, [
    'Hamilton, Ontario',
    'M.Eng, McMaster University',
    'Full-Stack + Backend',
    'Open to internships',
  ]);
  assert.deepEqual(
    portfolioContent.about.principles.map((item) => item.title),
    [
      'Structure the interface around the real workflow',
      'Treat reliability as product work',
      'Make complex systems readable',
    ],
  );
  assert.equal(portfolioContent.projects[0].domain, 'Workflow Software');
  assert.match(portfolioContent.projects[0].result, /schema upgrades/i);
  assert.equal(portfolioContent.projects[1].domain, 'Robotics Interface');
  assert.match(portfolioContent.projects[2].result, /0\.83 accuracy/i);
});

test('render helpers output the editorial work index, meta strip, principles, and project features', () => {
  const workIndexMarkup = renderHeroWorkIndex(portfolioContent.projects);
  const metaMarkup = renderMetaStrip(portfolioContent.profile.metaStrip);
  const principleMarkup = renderPrinciples(portfolioContent.about.principles);
  const projectMarkup = renderProjectCards(portfolioContent.projects);

  assert.match(workIndexMarkup, /class="hero-work-item"/);
  assert.match(workIndexMarkup, /class="hero-work-number">01</);
  assert.match(workIndexMarkup, /Workflow Software/);
  assert.match(workIndexMarkup, /Robotics Interface/);
  assert.match(metaMarkup, /class="hero-meta-item"/);
  assert.match(metaMarkup, /Hamilton, Ontario/);
  assert.match(principleMarkup, /class="principle-item"/);
  assert.match(principleMarkup, /Treat reliability as product work/);
  assert.match(projectMarkup, /class="project-feature"/);
  assert.match(projectMarkup, /class="project-number"/);
  assert.match(projectMarkup, /class="project-domain"/);
  assert.match(projectMarkup, /class="project-result"/);
  assert.match(projectMarkup, /class="project-link-label"/);
});

test('renderPortfolio mounts the editorial homepage fields', () => {
  const mockDocument = createMockDocument();
  renderPortfolio(portfolioContent, mockDocument);

  assert.equal(
    mockDocument.getElementById('hero-summary').textContent,
    'I turn messy operational workflows into software that feels clear to use, reliable to maintain, and credible in real engineering settings.',
  );
  assert.match(
    mockDocument.getElementById('hero-work-list').innerHTML,
    /Industrial Process Modeling Platform/,
  );
  assert.match(
    mockDocument.getElementById('hero-meta-strip').innerHTML,
    /Open to internships/,
  );
  assert.match(
    mockDocument.getElementById('about-principles').innerHTML,
    /Make complex systems readable/,
  );
});
```

Update the imports so the test file expects these helpers from `app.js`:

```js
import {
  getResumeState,
  registerPortfolioBoot,
  renderHeroWorkIndex,
  renderMetaStrip,
  renderNavigation,
  renderPrinciples,
  renderProjectCards,
  renderPortfolio,
} from '../../app.js';
```

- [ ] **Step 2: Run the test suite and verify the new homepage contract fails**

Run:

```bash
node --test tests/web/test_app.js
```

Expected: FAIL because `profile.summary`, `profile.metaStrip`, `about.principles`, `renderHeroWorkIndex`, and `renderMetaStrip` do not exist yet, and `createMockDocument()` does not include the new homepage IDs.

- [ ] **Step 3: Implement the new data contract and render helpers**

Update `content.js` so the homepage content shape matches the new editorial systems layout. Add `domain` and `result` to each existing project object in place; do not remove the current `title`, `subtitle`, `summary`, `bullets`, `stack`, `image`, or `detailSections` fields:

```js
export const portfolioContent = {
  profile: {
    name: 'Tianyu Zhang',
    availability: 'Open to software engineering internship opportunities',
    headline: 'Software engineer for workflow systems, product tooling, and applied backend work',
    summary:
      'I turn messy operational workflows into software that feels clear to use, reliable to maintain, and credible in real engineering settings.',
    metaStrip: [
      'Hamilton, Ontario',
      'M.Eng, McMaster University',
      'Full-Stack + Backend',
      'Open to internships',
    ],
  },
  about: {
    paragraphs: [
      'I work best on products where the interface and the system design have to support each other: workflow tools, internal platforms, and data-heavy software that people actually use to make decisions.',
      'My recent projects sit at the intersection of frontend clarity, backend reliability, and practical delivery. I care about making complex tools easier to trust, easier to understand, and easier to extend.',
    ],
    principles: [
      {
        title: 'Structure the interface around the real workflow',
        description: 'Build the experience around how people actually move through the task, not around internal implementation details.',
      },
      {
        title: 'Treat reliability as product work',
        description: 'Safer saves, compatibility layers, and stable data handling matter because they change whether people can trust the tool.',
      },
      {
        title: 'Make complex systems readable',
        description: 'Use naming, hierarchy, and reduction so technical software still feels understandable under real use.',
      },
    ],
  },
  projects: [
    {
      slug: 'process-platform',
      domain: 'Workflow Software',
      result: 'Safer saves, schema upgrades, and reusable subnetworks for a capstone process tool.',
    },
    {
      slug: 'robot-car',
      domain: 'Robotics Interface',
      result: 'Browser control, live telemetry, and vision-assisted driving feedback in one loop.',
    },
    {
      slug: 'analytics-dashboard',
      domain: 'Applied Analytics',
      result: 'Interpretable retail insights with 0.83 accuracy and dashboard-ready KPI views.',
    },
  ],
};
```

Update `app.js` to render the new homepage pieces:

```js
export function renderHeroWorkIndex(projects) {
  return projects
    .map(
      (project, index) => `
        <li class="hero-work-item">
          <span class="hero-work-number">${String(index + 1).padStart(2, '0')}</span>
          <div class="hero-work-copy">
            <p class="hero-work-domain">${project.domain}</p>
            <h3>${project.title}</h3>
            <p class="hero-work-result">${project.result}</p>
          </div>
        </li>
      `,
    )
    .join('');
}

export function renderMetaStrip(items) {
  return items.map((item) => `<li class="hero-meta-item">${item}</li>`).join('');
}

export function renderPrinciples(items) {
  return items
    .map(
      (item, index) => `
        <li class="principle-item">
          <span class="principle-number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </li>
      `,
    )
    .join('');
}

export function renderProjectCards(projects) {
  const fallbackImageSrc = 'assets/placeholders/portfolio-placeholder.svg';

  return projects
    .map((project, index) => {
      const detailHref = getProjectPageHref(project);
      const projectNumber = String(index + 1).padStart(2, '0');

      return `
        <a class="project-feature" href="${detailHref}">
          <div class="project-feature-copy">
            <div class="project-feature-head">
              <span class="project-number">${projectNumber}</span>
              <p class="project-domain">${project.domain}</p>
            </div>
            <h3>${project.title}</h3>
            <p class="project-result">${project.result}</p>
            <p class="project-summary">${project.summary}</p>
            <ul class="project-bullets">
              ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <ul class="tag-list">
              ${project.stack.map((tag) => `<li>${tag}</li>`).join('')}
            </ul>
            <span class="project-link-label">Open project</span>
          </div>
          <figure class="project-feature-media">
            <img
              src="${project.image.src || fallbackImageSrc}"
              alt="${project.image.alt}"
              onerror="this.onerror=null;this.src='${fallbackImageSrc}';"
            />
          </figure>
        </a>
      `;
    })
    .join('');
}
```

Update `renderPortfolio()` and the mock document helpers to mount the new IDs:

```js
setNodeText(doc, 'hero-summary', content.profile.summary);
setNodeHTML(doc, 'hero-work-list', renderHeroWorkIndex(content.projects));
setNodeHTML(doc, 'hero-meta-strip', renderMetaStrip(content.profile.metaStrip));
setNodeHTML(doc, 'about-principles', renderPrinciples(content.about.principles));
```

```js
const ids = [
  'site-name',
  'nav-list',
  'hero-availability',
  'hero-name',
  'hero-headline',
  'hero-summary',
  'hero-work-list',
  'hero-meta-strip',
  'about-copy',
  'about-principles',
  'project-grid',
  'resume-button',
  'resume-card-button',
  'resume-helper',
  'contact-list',
  'footer-note',
];
```

- [ ] **Step 4: Run the full homepage test suite and verify the new data/render contract passes**

Run:

```bash
node --test tests/web/test_app.js
```

Expected: PASS for the new content-contract, render-helper, and `renderPortfolio()` tests. If any old assertions still reference `heroPanel`, `about.stats`, `project-card`, or `project-command`, update them now before moving on.

- [ ] **Step 5: Commit the data and render-helper contract**

Run:

```bash
git add tests/web/test_app.js content.js app.js
git commit -m "feat: reshape homepage editorial content contract"
```

## Task 2: Rebuild The Homepage Shell Around Editorial Sections

**Files:**
- Modify: `C:\Users\19612\Desktop\job\Personal_website\tests\web\test_app.js`
- Modify: `C:\Users\19612\Desktop\job\Personal_website\index.html`

- [ ] **Step 1: Write the failing shell test for the editorial homepage structure**

Replace the homepage-shell assertions in `tests/web/test_app.js` with this set:

```js
test('index shell defines the editorial hero, work index, and profile hooks', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

  assert.match(html, /family=Newsreader:opsz,wght@6\.\.72,400;6\.\.72,500;6\.\.72,600/);
  assert.match(html, /family=IBM\+Plex\+Sans:wght@400;500;600;700/);
  assert.match(html, /family=IBM\+Plex\+Mono:wght@400;500;600/);
  assert.match(html, /class="hero-intro-block"/);
  assert.match(html, /id="hero-summary"/);
  assert.match(html, /id="hero-work-list"/);
  assert.match(html, /id="hero-meta-strip"/);
  assert.match(html, /id="about-principles"/);
  assert.match(html, /<div class="project-list" id="project-grid"><\/div>/);
  assert.doesNotMatch(html, /hero-panel/);
});
```

- [ ] **Step 2: Run the shell test and verify it fails**

Run:

```bash
node --test tests/web/test_app.js
```

Expected: FAIL because `index.html` still uses the IBM Plex Sans + JetBrains Mono command-surface shell with `hero-panel`, `hero-intro`, and no editorial work-index or meta-strip hooks.

- [ ] **Step 3: Replace `index.html` with the editorial homepage shell**

Update the homepage shell to this structure:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap"
  rel="stylesheet"
/>

<body class="home-page">
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
      <div class="hero-intro-block">
        <p class="eyebrow" id="hero-availability"></p>
        <h1 id="hero-name"></h1>
        <p class="hero-headline" id="hero-headline"></p>
        <p class="hero-summary" id="hero-summary"></p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects">Selected Work</a>
          <a class="button button-secondary" id="resume-button" href="#resume">Download Resume</a>
        </div>
        <p class="resume-helper" id="resume-helper"></p>
      </div>

      <aside class="hero-work-index" aria-labelledby="hero-work-index-title">
        <p class="eyebrow">Selected Work</p>
        <h2 id="hero-work-index-title">Proof of work, up front.</h2>
        <ol class="hero-work-list" id="hero-work-list"></ol>
      </aside>

      <ul class="hero-meta-strip" id="hero-meta-strip"></ul>
    </section>

    <section class="about shell" id="about">
      <div class="section-heading">
        <p class="eyebrow">Profile</p>
        <h2>Engineering with product judgment, clear systems, and reliable delivery.</h2>
      </div>
      <div class="about-layout">
        <div class="about-copy" id="about-copy"></div>
        <ol class="about-principles" id="about-principles"></ol>
      </div>
    </section>

    <section class="projects shell" id="projects">
      <div class="section-heading">
        <p class="eyebrow">Selected Work</p>
        <h2>Featured systems, interfaces, and applied software work.</h2>
      </div>
      <div class="project-list" id="project-grid"></div>
    </section>

    <section class="resume shell" id="resume">
      <div class="resume-panel">
        <p class="eyebrow">Resume</p>
        <h2>Request the full PDF version.</h2>
        <p id="resume-copy">The portfolio is live first. The final downloadable PDF resume will be attached next.</p>
        <a class="button button-primary" id="resume-card-button" href="#resume">Download Resume</a>
      </div>
    </section>

    <section class="contact shell" id="contact">
      <div class="section-heading">
        <p class="eyebrow">Contact</p>
        <h2>Available for internship roles in software engineering, backend, and product systems work.</h2>
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
```

- [ ] **Step 4: Re-run the test suite and verify the new shell contract passes**

Run:

```bash
node --test tests/web/test_app.js
```

Expected: PASS for the HTML shell assertions. At this point the page will still look wrong because `styles.css` is still the old command-surface layer, but the DOM contract should be correct and stable.

- [ ] **Step 5: Commit the new homepage shell**

Run:

```bash
git add tests/web/test_app.js index.html
git commit -m "feat: rebuild homepage shell for editorial systems"
```

## Task 3: Replace The Homepage Visual System

**Files:**
- Modify: `C:\Users\19612\Desktop\job\Personal_website\tests\web\test_app.js`
- Modify: `C:\Users\19612\Desktop\job\Personal_website\styles.css`

- [ ] **Step 1: Write the failing CSS contract for the editorial systems homepage**

Replace the homepage CSS assertions in `tests/web/test_app.js` with this set:

```js
test('styles include the editorial homepage typography, layout, and responsive hooks', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /body\.home-page\s*{/);
  assert.match(css, /font-family:\s*'Newsreader', serif/);
  assert.match(css, /font-family:\s*'IBM Plex Sans', sans-serif/);
  assert.match(css, /font-family:\s*'IBM Plex Mono', monospace/);
  assert.match(css, /\.hero-intro-block\b/);
  assert.match(css, /\.hero-work-index\b/);
  assert.match(css, /\.hero-work-list\b/);
  assert.match(css, /\.hero-meta-strip\b/);
  assert.match(css, /\.about-layout\b/);
  assert.match(css, /\.about-principles\b/);
  assert.match(css, /\.principle-item\b/);
  assert.match(css, /\.project-list\b/);
  assert.match(css, /\.project-feature\b/);
  assert.match(css, /\.project-feature-media\b/);
  assert.match(css, /\.project-result\b/);
  assert.match(css, /\.project-link-label\b/);
  assert.match(css, /\.resume-panel\b/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*700px\)/);
  assert.doesNotMatch(css, /\.hero-panel\b/);
  assert.doesNotMatch(css, /\.project-command\b/);
});
```

- [ ] **Step 2: Run the test suite and verify the CSS contract fails**

Run:

```bash
node --test tests/web/test_app.js
```

Expected: FAIL because `styles.css` still defines `.hero-panel`, `.project-command`, rounded command-surface cards, and no editorial homepage selectors such as `.hero-work-index`, `.about-layout`, or `.project-feature`.

- [ ] **Step 3: Replace the homepage CSS with an editorial systems visual language**

Keep the detail-page rules, but replace the homepage-scoped CSS with selectors like these:

```css
body.home-page {
  --bg: #f4f1ea;
  --surface: #fbfaf7;
  --surface-strong: #ffffff;
  --text: #171717;
  --muted: #5e5a53;
  --line: rgba(23, 23, 23, 0.12);
  --accent: #1b5c52;
  --accent-soft: rgba(27, 92, 82, 0.12);
  --shadow: 0 18px 40px rgba(19, 24, 25, 0.08);
  font-family: 'IBM Plex Sans', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(27, 92, 82, 0.08), transparent 30%),
    linear-gradient(180deg, #f7f5f0 0%, #efece5 100%);
}

body.home-page .brand,
body.home-page h1,
body.home-page h2,
body.home-page h3 {
  font-family: 'Newsreader', serif;
}

body.home-page .eyebrow,
body.home-page .hero-meta-item,
body.home-page .hero-work-number,
body.home-page .project-number,
body.home-page .project-domain,
body.home-page .contact-label {
  font-family: 'IBM Plex Mono', monospace;
}

body.home-page .hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  grid-template-areas:
    'intro index'
    'meta meta';
  gap: 36px 28px;
  min-height: auto;
  padding: 112px 0 72px;
}

body.home-page .hero-intro-block {
  grid-area: intro;
  max-width: 44rem;
}

body.home-page .hero-summary {
  max-width: 40rem;
  margin: 18px 0 0;
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--muted);
}

body.home-page .hero-work-index {
  grid-area: index;
  display: grid;
  gap: 18px;
  align-self: start;
  padding: 24px 0 0;
  border-top: 1px solid var(--line);
}

body.home-page .hero-work-list,
body.home-page .about-principles {
  display: grid;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

body.home-page .hero-work-item,
body.home-page .principle-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: start;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

body.home-page .hero-meta-strip {
  grid-area: meta;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 18px 0 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

body.home-page .about-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: 28px;
  align-items: start;
}

body.home-page .project-list {
  display: grid;
  gap: 36px;
}

body.home-page .project-feature {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
  gap: 24px;
  align-items: stretch;
  padding-top: 28px;
  border-top: 1px solid var(--line);
}

body.home-page .project-feature-copy {
  display: grid;
  gap: 16px;
}

body.home-page .project-feature-media {
  margin: 0;
  min-height: 320px;
  overflow: hidden;
  background: #ddd8cf;
}

body.home-page .project-feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

body.home-page .project-result {
  margin: 0;
  font-size: 1.04rem;
  line-height: 1.65;
  color: var(--text);
}

body.home-page .project-link-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--accent);
}

body.home-page .resume-panel,
body.home-page .contact-card {
  border-top: 1px solid var(--line);
  padding-top: 24px;
}

@media (max-width: 900px) {
  body.home-page .hero,
  body.home-page .about-layout,
  body.home-page .project-feature {
    grid-template-columns: 1fr;
    grid-template-areas: initial;
  }

  body.home-page .hero-meta-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  body.home-page .hero,
  .about,
  .projects,
  .resume,
  .contact {
    padding: 72px 0 56px;
  }

  body.home-page .hero-meta-strip {
    grid-template-columns: 1fr;
  }

  body.home-page .project-feature-media {
    min-height: 220px;
  }
}
```

When replacing the old homepage layer, delete the selectors that encode the command-surface look:

```css
body.home-page .hero-panel { }
body.home-page .hero-panel-list { }
body.home-page .project-card { }
body.home-page .project-command { }
```

- [ ] **Step 4: Run the full test suite and verify the redesign passes**

Run:

```bash
node --test tests/web/test_app.js
```

Expected: PASS for all homepage, detail-page, and gallery tests. The detail page tests should continue to pass because this task is homepage-scoped and does not change `project-detail.js` or the HTML detail shells.

- [ ] **Step 5: Commit the homepage visual redesign**

Run:

```bash
git add tests/web/test_app.js styles.css
git commit -m "feat: redesign homepage in editorial systems style"
```

## Verification Checklist

- Run the full automated suite:

```bash
node --test tests/web/test_app.js
```

Expected: `24` passing, `0` failing, or the updated total if the homepage tests were expanded.

- Serve the site locally from the repository root:

```bash
python -m http.server 4173
```

- Check desktop at `http://localhost:4173/index.html`:
  - the first screen feels editorial and materially different from the previous homepage
  - the selected-work index is visible in the first viewport
  - the first project block is visible with minimal scrolling
  - the page does not read like a terminal or dashboard

- Check tablet/mobile in browser responsive mode:
  - `1024px` width: hero columns collapse cleanly without awkward gaps
  - `768px` width: hero meta strip becomes readable and no project feature overflows horizontally
  - `390px` width: headline, selected-work index, and first project remain readable and visually intentional

- Click through all three project links from the homepage:
  - `projects/process-platform.html`
  - `projects/robot-car.html`
  - `projects/analytics-dashboard.html`

- Confirm resume and contact behavior still works:
  - disabled resume buttons still expose the fallback text
  - email opens `mailto:zhant173@mcmaster.ca`
  - GitHub and LinkedIn links still open in a new tab
