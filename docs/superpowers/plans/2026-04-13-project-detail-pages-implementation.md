# Project Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three dedicated project detail pages that match the homepage style, keep the homepage concise, and remain safe when project content or screenshots are still sparse.

**Architecture:** The homepage stays on `index.html` and continues rendering from `content.js` through `app.js`. Each project detail page gets its own static HTML shell under `projects/`, while `project-detail.js` mounts shared detail-page markup from centralized project data. The existing Node test suite expands to verify homepage links, detail-page shells, detail rendering, fallback behavior, and shared styling.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, Node built-in test runner (`node --test`), GitHub Pages

---

## Preconditions

- Work from the repository root: `C:\Users\19612\Desktop\job\Personal_website`.
- Keep the unrelated untracked directory `assets/Industrial Process Modeling Platform/` out of scope for this feature. Do not stage it unless the user explicitly asks.
- Preserve the existing homepage behavior outside the project-card click target change.

## File Map

- `content.js`
  Extend the project data model so each project can drive both the homepage card and its detail page.
- `app.js`
  Keep homepage render helpers, but make each project card link to its dedicated page.
- `project-detail.js`
  New shared detail-page renderer, slug lookup helpers, empty-state handling, and boot registration.
- `index.html`
  No structural change required unless a test reveals a needed hook update.
- `projects/process-platform.html`
  Static detail-page shell for the process-platform project.
- `projects/robot-car.html`
  Static detail-page shell for the robot-car project.
- `projects/analytics-dashboard.html`
  Static detail-page shell for the analytics-dashboard project.
- `styles.css`
  Extend the shared visual system for clickable homepage cards and detail-page layout.
- `tests/web/test_app.js`
  Expand coverage for the detail-page data model, linked homepage cards, detail-page shells, detail-page rendering, and fallback states.

### Task 1: Extend the Project Content Model for Detail Pages

**Files:**
- Modify: `content.js`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Add this test below the existing portfolio content contract test in `tests/web/test_app.js`:

```js
test('project content includes detail-page metadata for all three featured projects', () => {
  assert.deepEqual(
    portfolioContent.projects.map((project) => project.href),
    [
      'projects/process-platform.html',
      'projects/robot-car.html',
      'projects/analytics-dashboard.html',
    ],
  );

  const processProject = portfolioContent.projects.find(
    (project) => project.slug === 'process-platform',
  );
  const robotProject = portfolioContent.projects.find((project) => project.slug === 'robot-car');
  const analyticsProject = portfolioContent.projects.find(
    (project) => project.slug === 'analytics-dashboard',
  );

  assert.equal(
    processProject.subtitle,
    'Performance improvements for a research process-modeling platform',
  );
  assert.equal(
    robotProject.subtitle,
    'Browser-based robotics control with computer vision assistance',
  );
  assert.equal(
    analyticsProject.subtitle,
    'Retail analytics dashboard for interpretable business insights',
  );

  assert.deepEqual(Object.keys(processProject.detailSections), [
    'overview',
    'challenge',
    'approach',
    'outcome',
  ]);
  assert.deepEqual(robotProject.gallery, []);
  assert.deepEqual(analyticsProject.gallery, []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`
Expected: FAIL because `href`, `subtitle`, `detailSections`, and `gallery` do not exist on the current project objects.

- [ ] **Step 3: Write minimal implementation**

Replace the `projects` array in `content.js` with this version:

```js
  projects: [
    {
      slug: 'process-platform',
      href: 'projects/process-platform.html',
      kicker: 'Featured Project',
      title: 'Industrial Process Modeling Platform',
      subtitle: 'Performance improvements for a research process-modeling platform',
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
      detailSections: {
        overview: '',
        challenge: '',
        approach: '',
        outcome: '',
      },
      gallery: [],
    },
    {
      slug: 'robot-car',
      href: 'projects/robot-car.html',
      kicker: 'Featured Project',
      title: 'Vision-Assisted Arduino Robot Car',
      subtitle: 'Browser-based robotics control with computer vision assistance',
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
      detailSections: {
        overview: '',
        challenge: '',
        approach: '',
        outcome: '',
      },
      gallery: [],
    },
    {
      slug: 'analytics-dashboard',
      href: 'projects/analytics-dashboard.html',
      kicker: 'Featured Project',
      title: 'Consumer Behaviour Analytics Dashboard',
      subtitle: 'Retail analytics dashboard for interpretable business insights',
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
      detailSections: {
        overview: '',
        challenge: '',
        approach: '',
        outcome: '',
      },
      gallery: [],
    },
  ],
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`
Expected: PASS with exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add content.js tests/web/test_app.js
git commit -m "feat: add detail-page project metadata"
```

### Task 2: Make Homepage Project Cards Link to Their Detail Pages

**Files:**
- Modify: `app.js`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Replace the existing project-markup assertions in `tests/web/test_app.js` with this version:

```js
test('render helpers output linked project cards for each detail page', () => {
  const navMarkup = renderNavigation(portfolioContent.navigation);
  const statMarkup = renderStatPills(portfolioContent.about.stats);
  const projectMarkup = renderProjectCards(portfolioContent.projects);

  assert.equal((navMarkup.match(/<li>/g) ?? []).length, portfolioContent.navigation.length);
  assert.match(
    navMarkup,
    /<li><a href="#about">About<\/a><\/li>.*<li><a href="#projects">Projects<\/a><\/li>.*<li><a href="#contact">Contact<\/a><\/li>/s,
  );
  assert.equal(
    (statMarkup.match(/class="stat-pill"/g) ?? []).length,
    portfolioContent.about.stats.length,
  );
  assert.match(statMarkup, /Performance-Focused Projects/);
  assert.match(projectMarkup, /class="project-card-link"/);
  assert.match(projectMarkup, /href="projects\/process-platform\.html"/);
  assert.match(projectMarkup, /href="projects\/robot-car\.html"/);
  assert.match(projectMarkup, /href="projects\/analytics-dashboard\.html"/);
  assert.match(projectMarkup, /Industrial Process Modeling Platform/);
  assert.match(projectMarkup, /Vision-Assisted Arduino Robot Car/);
  assert.match(projectMarkup, /Consumer Behaviour Analytics Dashboard/);
  assert.match(projectMarkup, /40 seconds to 3 seconds/);
  assert.match(projectMarkup, /assets\/placeholders\/portfolio-placeholder\.svg/);
  assert.equal((projectMarkup.match(/class="project-card-link"/g) ?? []).length, 3);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`
Expected: FAIL because `renderProjectCards()` still outputs plain `<article class="project-card">` blocks without link wrappers.

- [ ] **Step 3: Write minimal implementation**

In `app.js`, add this helper above `renderProjectCards()` and replace the function body:

```js
export function getProjectPageHref(project) {
  return project.href || `projects/${project.slug}.html`;
}

export function renderProjectCards(projects) {
  const fallbackImageSrc = 'assets/placeholders/portfolio-placeholder.svg';

  return projects
    .map(
      (project) => `
        <a class="project-card-link" href="${getProjectPageHref(project)}" aria-label="Open ${project.title} project details">
          <article class="project-card">
            <figure class="project-media">
              <img
                src="${project.image.src || fallbackImageSrc}"
                alt="${project.image.alt}"
                onerror="this.onerror=null;this.src='${fallbackImageSrc}';"
              />
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
        </a>
      `,
    )
    .join('');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`
Expected: PASS with exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add app.js tests/web/test_app.js
git commit -m "feat: link homepage cards to detail pages"
```

### Task 3: Create the Static Detail-Page Shells

**Files:**
- Create: `projects/process-platform.html`
- Create: `projects/robot-car.html`
- Create: `projects/analytics-dashboard.html`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Add this test near the existing HTML-shell assertions in `tests/web/test_app.js`:

```js
test('detail page shells exist for all three projects and declare their slug', () => {
  const detailPages = [
    ['process-platform', '../../projects/process-platform.html'],
    ['robot-car', '../../projects/robot-car.html'],
    ['analytics-dashboard', '../../projects/analytics-dashboard.html'],
  ];

  for (const [slug, file] of detailPages) {
    const html = fs.readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(html, new RegExp(`data-project-slug="${slug}"`));
    assert.match(html, /href="\.\.\/styles\.css"/);
    assert.match(html, /id="back-home-link"/);
    assert.match(html, /href="\.\.\/index\.html#projects"/);
    assert.match(html, /id="detail-title"/);
    assert.match(html, /id="detail-subtitle"/);
    assert.match(html, /id="detail-hero-tags"/);
    assert.match(html, /id="detail-overview-body"/);
    assert.match(html, /id="detail-challenge-body"/);
    assert.match(html, /id="detail-approach-body"/);
    assert.match(html, /id="detail-stack"/);
    assert.match(html, /id="detail-gallery"/);
    assert.match(html, /id="detail-outcome-body"/);
    assert.match(html, /src="\.\.\/project-detail\.js"/);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`
Expected: FAIL with `ENOENT` because the `projects/` HTML files do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `projects/process-platform.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Industrial Process Modeling Platform | Tianyu Zhang</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="detail-page" data-project-slug="process-platform">
    <header class="detail-topbar shell">
      <a class="detail-back-link" id="back-home-link" href="../index.html#projects">Back to Home</a>
    </header>

    <main class="detail-shell shell">
      <section class="detail-hero">
        <p class="eyebrow">Project Detail</p>
        <h1 id="detail-title"></h1>
        <p class="detail-subtitle" id="detail-subtitle"></p>
        <ul class="tag-list" id="detail-hero-tags"></ul>
      </section>

      <section class="detail-section">
        <h2>Overview</h2>
        <div class="detail-body" id="detail-overview-body"></div>
      </section>

      <section class="detail-section">
        <h2>Challenge</h2>
        <div class="detail-body" id="detail-challenge-body"></div>
      </section>

      <section class="detail-section">
        <h2>Approach</h2>
        <div class="detail-body" id="detail-approach-body"></div>
      </section>

      <section class="detail-section">
        <h2>Tech Stack</h2>
        <ul class="tag-list" id="detail-stack"></ul>
      </section>

      <section class="detail-section">
        <h2>Gallery</h2>
        <div class="detail-gallery" id="detail-gallery"></div>
      </section>

      <section class="detail-section">
        <h2>Outcome</h2>
        <div class="detail-body" id="detail-outcome-body"></div>
      </section>
    </main>

    <script type="module" src="../project-detail.js"></script>
  </body>
</html>
```

Create `projects/robot-car.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vision-Assisted Arduino Robot Car | Tianyu Zhang</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="detail-page" data-project-slug="robot-car">
    <header class="detail-topbar shell">
      <a class="detail-back-link" id="back-home-link" href="../index.html#projects">Back to Home</a>
    </header>

    <main class="detail-shell shell">
      <section class="detail-hero">
        <p class="eyebrow">Project Detail</p>
        <h1 id="detail-title"></h1>
        <p class="detail-subtitle" id="detail-subtitle"></p>
        <ul class="tag-list" id="detail-hero-tags"></ul>
      </section>

      <section class="detail-section">
        <h2>Overview</h2>
        <div class="detail-body" id="detail-overview-body"></div>
      </section>

      <section class="detail-section">
        <h2>Challenge</h2>
        <div class="detail-body" id="detail-challenge-body"></div>
      </section>

      <section class="detail-section">
        <h2>Approach</h2>
        <div class="detail-body" id="detail-approach-body"></div>
      </section>

      <section class="detail-section">
        <h2>Tech Stack</h2>
        <ul class="tag-list" id="detail-stack"></ul>
      </section>

      <section class="detail-section">
        <h2>Gallery</h2>
        <div class="detail-gallery" id="detail-gallery"></div>
      </section>

      <section class="detail-section">
        <h2>Outcome</h2>
        <div class="detail-body" id="detail-outcome-body"></div>
      </section>
    </main>

    <script type="module" src="../project-detail.js"></script>
  </body>
</html>
```

Create `projects/analytics-dashboard.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consumer Behaviour Analytics Dashboard | Tianyu Zhang</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="detail-page" data-project-slug="analytics-dashboard">
    <header class="detail-topbar shell">
      <a class="detail-back-link" id="back-home-link" href="../index.html#projects">Back to Home</a>
    </header>

    <main class="detail-shell shell">
      <section class="detail-hero">
        <p class="eyebrow">Project Detail</p>
        <h1 id="detail-title"></h1>
        <p class="detail-subtitle" id="detail-subtitle"></p>
        <ul class="tag-list" id="detail-hero-tags"></ul>
      </section>

      <section class="detail-section">
        <h2>Overview</h2>
        <div class="detail-body" id="detail-overview-body"></div>
      </section>

      <section class="detail-section">
        <h2>Challenge</h2>
        <div class="detail-body" id="detail-challenge-body"></div>
      </section>

      <section class="detail-section">
        <h2>Approach</h2>
        <div class="detail-body" id="detail-approach-body"></div>
      </section>

      <section class="detail-section">
        <h2>Tech Stack</h2>
        <ul class="tag-list" id="detail-stack"></ul>
      </section>

      <section class="detail-section">
        <h2>Gallery</h2>
        <div class="detail-gallery" id="detail-gallery"></div>
      </section>

      <section class="detail-section">
        <h2>Outcome</h2>
        <div class="detail-body" id="detail-outcome-body"></div>
      </section>
    </main>

    <script type="module" src="../project-detail.js"></script>
  </body>
</html>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`
Expected: PASS with exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add projects/process-platform.html projects/robot-car.html projects/analytics-dashboard.html tests/web/test_app.js
git commit -m "feat: add static project detail shells"
```

### Task 4: Implement Shared Detail-Page Rendering and Safe Fallbacks

**Files:**
- Create: `project-detail.js`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Update the imports at the top of `tests/web/test_app.js`:

```js
import {
  getProjectBySlug,
  getProjectDetailState,
  renderProjectDetail,
  registerProjectDetailBoot,
} from '../../project-detail.js';
```

Add these helpers and tests below the existing homepage mock-document helpers:

```js
function createMockDetailElement() {
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

function createMockDetailDocument(slug = 'process-platform') {
  const ids = [
    'back-home-link',
    'detail-title',
    'detail-subtitle',
    'detail-hero-tags',
    'detail-overview-body',
    'detail-challenge-body',
    'detail-approach-body',
    'detail-stack',
    'detail-gallery',
    'detail-outcome-body',
  ];

  const nodes = new Map(ids.map((id) => [id, createMockDetailElement()]));

  return {
    body: {
      dataset: {
        projectSlug: slug,
      },
    },
    getElementById(id) {
      return nodes.get(id);
    },
  };
}

test('detail helpers resolve project records and a safe missing-project state', () => {
  assert.equal(getProjectBySlug('robot-car').title, 'Vision-Assisted Arduino Robot Car');
  assert.equal(getProjectBySlug('missing-project'), null);

  const foundState = getProjectDetailState('robot-car');
  const missingState = getProjectDetailState('missing-project');

  assert.equal(foundState.isMissing, false);
  assert.equal(foundState.project.slug, 'robot-car');
  assert.equal(missingState.isMissing, true);
  assert.equal(missingState.title, 'Project not found');
  assert.equal(missingState.backHref, '../index.html#projects');
});

test('renderProjectDetail mounts the selected project with empty-body and gallery fallbacks', () => {
  const mockDocument = createMockDetailDocument('process-platform');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('back-home-link').href,
    '../index.html#projects',
  );
  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Industrial Process Modeling Platform',
  );
  assert.equal(
    mockDocument.getElementById('detail-subtitle').textContent,
    'Performance improvements for a research process-modeling platform',
  );
  assert.match(mockDocument.getElementById('detail-hero-tags').innerHTML, /TypeScript/);
  assert.equal(
    mockDocument.getElementById('detail-overview-body').attributes['data-empty'],
    'true',
  );
  assert.match(
    mockDocument.getElementById('detail-gallery').innerHTML,
    /gallery-placeholder/,
  );
});

test('renderProjectDetail mounts a safe fallback when the slug is unknown', () => {
  const mockDocument = createMockDetailDocument('missing-project');

  renderProjectDetail(mockDocument);

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Project not found');
  assert.match(
    mockDocument.getElementById('detail-subtitle').textContent,
    /Return to the homepage/i,
  );
  assert.equal(
    mockDocument.getElementById('back-home-link').href,
    '../index.html#projects',
  );
});

test('registerProjectDetailBoot mounts immediately when the detail document is ready', () => {
  const mockDocument = createMockDetailDocument('analytics-dashboard');
  mockDocument.readyState = 'interactive';
  mockDocument.addEventListener = () => {
    throw new Error('detail page should mount immediately when ready');
  };

  registerProjectDetailBoot(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Consumer Behaviour Analytics Dashboard',
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` because `project-detail.js` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `project-detail.js` with this content:

```js
import { portfolioContent } from './content.js';

const DETAIL_BACK_HREF = '../index.html#projects';
const GALLERY_PLACEHOLDER_SRC = '../assets/placeholders/portfolio-placeholder.svg';

export function getProjectBySlug(slug, content = portfolioContent) {
  return content.projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectDetailState(slug, content = portfolioContent) {
  const project = getProjectBySlug(slug, content);

  if (!project) {
    return {
      isMissing: true,
      title: 'Project not found',
      subtitle: 'Return to the homepage to choose an available project.',
      backHref: DETAIL_BACK_HREF,
    };
  }

  return {
    isMissing: false,
    project,
    title: project.title,
    subtitle: project.subtitle,
    backHref: DETAIL_BACK_HREF,
  };
}

function renderTagItems(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function mountDetailBody(node, text) {
  const value = (text || '').trim();
  node.textContent = value;

  if (value) {
    node.removeAttribute('data-empty');
    return;
  }

  node.setAttribute('data-empty', 'true');
}

function renderGalleryItems(items) {
  if (!items || items.length === 0) {
    return `
      <div class="gallery-placeholder">
        <img src="${GALLERY_PLACEHOLDER_SRC}" alt="" aria-hidden="true" />
      </div>
    `;
  }

  return items
    .map((item) => {
      const src = item.src ? `../${item.src}` : GALLERY_PLACEHOLDER_SRC;
      const alt = item.alt || '';

      return `
        <figure class="gallery-item">
          <img
            src="${src}"
            alt="${alt}"
            onerror="this.onerror=null;this.src='${GALLERY_PLACEHOLDER_SRC}';"
          />
        </figure>
      `;
    })
    .join('');
}

export function renderProjectDetail(doc = document, content = portfolioContent) {
  const slug = doc.body?.dataset?.projectSlug ?? '';
  const state = getProjectDetailState(slug, content);
  const backLink = doc.getElementById('back-home-link');
  const title = doc.getElementById('detail-title');
  const subtitle = doc.getElementById('detail-subtitle');
  const heroTags = doc.getElementById('detail-hero-tags');
  const overview = doc.getElementById('detail-overview-body');
  const challenge = doc.getElementById('detail-challenge-body');
  const approach = doc.getElementById('detail-approach-body');
  const stack = doc.getElementById('detail-stack');
  const gallery = doc.getElementById('detail-gallery');
  const outcome = doc.getElementById('detail-outcome-body');

  backLink.href = state.backHref;

  if (state.isMissing) {
    title.textContent = state.title;
    subtitle.textContent = state.subtitle;
    heroTags.innerHTML = '';
    stack.innerHTML = '';
    gallery.innerHTML = renderGalleryItems([]);
    mountDetailBody(overview, '');
    mountDetailBody(challenge, '');
    mountDetailBody(approach, '');
    mountDetailBody(outcome, '');
    return;
  }

  title.textContent = state.title;
  subtitle.textContent = state.subtitle;
  heroTags.innerHTML = renderTagItems(state.project.stack.slice(0, 3));
  stack.innerHTML = renderTagItems(state.project.stack);
  gallery.innerHTML = renderGalleryItems(state.project.gallery);
  mountDetailBody(overview, state.project.detailSections.overview);
  mountDetailBody(challenge, state.project.detailSections.challenge);
  mountDetailBody(approach, state.project.detailSections.approach);
  mountDetailBody(outcome, state.project.detailSections.outcome);
}

export function registerProjectDetailBoot(doc) {
  if (typeof doc === 'undefined') {
    return;
  }

  if (doc.readyState !== 'loading') {
    renderProjectDetail(doc);
    return;
  }

  doc.addEventListener('DOMContentLoaded', () => {
    renderProjectDetail(doc);
  });
}

if (typeof document !== 'undefined' && document.body?.dataset?.projectSlug) {
  registerProjectDetailBoot(document);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/web/test_app.js`
Expected: PASS with exit code `0`.

- [ ] **Step 5: Commit**

```bash
git add project-detail.js tests/web/test_app.js
git commit -m "feat: render shared project detail pages"
```

### Task 5: Add Shared Detail-Page Styling and Final Integration Checks

**Files:**
- Modify: `styles.css`
- Modify: `tests/web/test_app.js`

- [ ] **Step 1: Write the failing test**

Replace the existing CSS test in `tests/web/test_app.js` with this version:

```js
test('styles include homepage card-link states and detail-page layout rules', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /scroll-behavior:\s*smooth/);
  assert.match(css, /\.button\.is-disabled/);
  assert.match(css, /\.project-card-link/);
  assert.match(css, /\.detail-page/);
  assert.match(css, /\.detail-topbar/);
  assert.match(css, /\.detail-shell/);
  assert.match(css, /\.detail-section/);
  assert.match(css, /\.detail-body\[data-empty='true'\]/);
  assert.match(css, /\.gallery-placeholder/);
  assert.match(css, /@media\s*\(max-width:\s*800px\)/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/web/test_app.js`
Expected: FAIL because the new detail-page selectors are not present in `styles.css`.

- [ ] **Step 3: Write minimal implementation**

Append this block to `styles.css` near the project-card styles and responsive rules:

```css
.project-card-link {
  display: block;
}

.project-card-link:focus-visible {
  outline: 3px solid rgba(184, 92, 56, 0.32);
  outline-offset: 8px;
  border-radius: var(--radius-lg);
}

.detail-page {
  min-height: 100vh;
}

.detail-topbar {
  padding: 28px 0 0;
}

.detail-back-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line);
  background: rgba(255, 250, 243, 0.88);
  font-weight: 700;
}

.detail-shell {
  padding: 36px 0 88px;
}

.detail-hero,
.detail-section {
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.detail-hero {
  padding: 40px;
  margin-bottom: 24px;
}

.detail-subtitle {
  margin: 18px 0 0;
  max-width: 720px;
  font-size: 1.12rem;
  line-height: 1.7;
  color: var(--muted);
}

.detail-shell .tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.detail-section {
  padding: 28px;
  margin-bottom: 20px;
}

.detail-section h2 {
  margin: 0 0 18px;
  font-size: clamp(1.45rem, 3vw, 2.1rem);
}

.detail-body {
  min-height: 96px;
  color: var(--muted);
  line-height: 1.75;
}

.detail-body[data-empty='true'] {
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.1)),
    rgba(255, 250, 243, 0.68);
  border: 1px dashed rgba(30, 28, 25, 0.12);
}

.detail-gallery {
  min-height: 240px;
}

.gallery-placeholder,
.gallery-item {
  overflow: hidden;
  border-radius: calc(var(--radius-lg) - 8px);
  background: rgba(255, 250, 243, 0.82);
  border: 1px solid var(--line);
}

.gallery-placeholder img,
.gallery-item img {
  width: 100%;
  min-height: 240px;
  object-fit: cover;
}

@media (max-width: 800px) {
  .detail-shell {
    padding: 24px 0 72px;
  }

  .detail-hero,
  .detail-section {
    padding: 24px;
  }

  .detail-topbar {
    padding-top: 20px;
  }
}
```

- [ ] **Step 4: Run the full suite to verify it passes**

Run: `node --test tests/web/test_app.js`
Expected: PASS with exit code `0`.

- [ ] **Step 5: Inspect the diff before committing**

Run: `git diff --stat`
Expected: only `content.js`, `app.js`, `project-detail.js`, `projects/*.html`, `styles.css`, and `tests/web/test_app.js` show intentional changes for this feature.

- [ ] **Step 6: Manually smoke-test the static pages**

Open `index.html` in a browser, click all three homepage project cards, and verify:

- each card opens the matching `projects/*.html` page
- the `Back to Home` link returns to `index.html#projects`
- the detail pages still look balanced with empty narrative sections
- mobile responsive mode at roughly `390px` wide keeps the layout readable

- [ ] **Step 7: Commit**

```bash
git add content.js app.js project-detail.js projects/process-platform.html projects/robot-car.html projects/analytics-dashboard.html styles.css tests/web/test_app.js
git commit -m "feat: add shared project detail pages"
```
