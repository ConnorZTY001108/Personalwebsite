import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { portfolioContent } from '../../content.js';
import {
  getResumeState,
  registerPortfolioBoot,
  renderHeroWorkIndex,
  renderMetaStrip,
  renderNavigation,
  renderPrinciples,
  renderProjectCards,
  renderContactLinks,
  renderPortfolio,
} from '../../app.js';
import {
  getProjectBySlug,
  getProjectDetailState,
  renderProjectDetail,
  registerProjectDetailBoot,
} from '../../project-detail.js';

test('portfolio content includes the fixed internship profile and three featured projects', () => {
  assert.equal(portfolioContent.profile.name, 'Tianyu Zhang');
  assert.equal(
    portfolioContent.profile.availability,
    'Open to software engineering internship opportunities',
  );
  assert.equal(portfolioContent.navigation.length, 3);
  assert.deepEqual(
    portfolioContent.projects.map((project) => project.slug),
    ['process-platform', 'robot-car', 'analytics-dashboard'],
  );
  assert.deepEqual(
    portfolioContent.projects.map((project) => project.title),
    [
      'Industrial Process Modeling Platform',
      'Vision-Assisted Arduino Robot Car',
      'Consumer Behaviour Analytics Dashboard',
    ],
  );
  assert.equal(portfolioContent.resume.available, false);
  assert.equal(
    portfolioContent.contact.find((entry) => entry.label === 'Email')?.href,
    'mailto:zhant173@mcmaster.ca',
  );
  assert.equal(
    portfolioContent.footer.note,
    'Copyright 2026 Tianyu Zhang. Open to internship opportunities.',
  );
});

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
  assert.equal('intro' in portfolioContent.profile, false);
  assert.equal('heroPanel' in portfolioContent.profile, false);
  assert.equal('stats' in portfolioContent.about, false);
});

test('project content includes detail-page metadata for all three featured projects', () => {
  const expectedProjects = new Map([
    [
      'process-platform',
      {
        title: 'Industrial Process Modeling Platform',
        subtitle: 'A full-stack web app for drawing, saving, and computing industrial process diagrams',
      },
    ],
    [
      'robot-car',
      {
        title: 'Vision-Assisted Arduino Robot Car',
        subtitle: 'Browser-based robotics control with computer vision assistance',
      },
    ],
    [
      'analytics-dashboard',
      {
        title: 'Consumer Behaviour Analytics Dashboard',
        subtitle: 'Retail analytics dashboard for interpretable business insights',
      },
    ],
  ]);

  assert.equal(portfolioContent.projects.length, expectedProjects.size);

  for (const project of portfolioContent.projects) {
    const expected = expectedProjects.get(project.slug);

    assert.ok(expected, `Unexpected project slug: ${project.slug}`);
    assert.equal(project.href, undefined);
    assert.equal(project.title, expected.title);
    assert.equal(project.subtitle, expected.subtitle);
    assert.ok(project.summary.length > 0);
    assert.equal(project.gallery, undefined);
    assert.deepEqual(Object.keys(project.detailSections).sort(), [
      'approach',
      'challenge',
      'outcome',
      'projectDetail',
    ]);

    if (project.slug === 'process-platform') {
      assert.match(project.summary, /McMaster capstone/i);
      assert.match(project.summary, /interactive canvas/i);
      assert.match(project.detailSections.projectDetail, /Excel/i);
      assert.match(project.detailSections.challenge, /reliable enough for repeated use/i);
      assert.match(project.detailSections.challenge, /MongoDB and PostgreSQL/i);
      assert.match(project.detailSections.approach, /schema version/i);
      assert.match(project.detailSections.outcome, /McMaster University/i);
    } else {
      assert.deepEqual(
        Object.values(project.detailSections),
        ['', '', '', ''],
      );
    }
  }
});

test('resume state returns a disabled CTA when no PDF is available', () => {
  const state = getResumeState(portfolioContent.resume);

  assert.equal(state.isDisabled, true);
  assert.equal(state.href, '#resume');
  assert.equal(state.label, 'Resume PDF coming soon');
  assert.match(state.helperText, /PDF version will be added/i);
});

test('resume state returns an active CTA when the PDF is available', () => {
  const state = getResumeState({
    ...portfolioContent.resume,
    available: true,
  });

  assert.equal(state.isDisabled, false);
  assert.equal(state.href, 'assets/resume/Tianyu_Zhang_Resume.pdf');
  assert.equal(state.label, 'Download Resume');
  assert.equal(state.helperText, '');
});

test('index shell defines the editorial hero, work index, and profile hooks', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

  assert.match(html, /family=Newsreader:opsz,wght@6\.\.72,400;6\.\.72,500;6\.\.72,600/);
  assert.match(html, /family=IBM\+Plex\+Sans:wght@400;500;600;700/);
  assert.match(html, /family=IBM\+Plex\+Mono:wght@400;500;600/);
  assert.match(html, /<body class="home-page">/);
  assert.match(html, /<link rel="stylesheet" href="\.\/styles\.css" \/>/);
  assert.match(html, /class="hero-intro-block"/);
  assert.match(html, /id="site-name"/);
  assert.match(html, /id="nav-list"/);
  assert.match(html, /id="hero-availability"/);
  assert.match(html, /id="hero-name"/);
  assert.match(html, /id="hero-headline"/);
  assert.match(html, /id="hero-summary"/);
  assert.match(html, /id="hero-work-list"/);
  assert.match(html, /id="hero-meta-strip"/);
  assert.match(html, /id="about-copy"/);
  assert.match(html, /id="about-principles"/);
  assert.match(html, /<div class="project-list" id="project-grid"><\/div>/);
  assert.match(html, /id="resume-button"/);
  assert.match(html, /id="resume-card-button"/);
  assert.match(html, /id="resume-helper"/);
  assert.match(html, /id="contact-list"/);
  assert.match(html, /id="footer-note"/);
  assert.match(html, /<script type="module" src="\.\/app\.js"><\/script>/);
  assert.doesNotMatch(html, /hero-panel/);
});

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
    assert.match(html, /id="detail-project-body"/);
    assert.match(html, /id="detail-challenge-body"/);
    assert.match(html, /id="detail-approach-body"/);
    assert.match(html, /id="detail-stack"/);
    assert.match(html, /id="detail-outcome-body"/);
    assert.match(html, /src="\.\.\/project-detail\.js"/);

    if (slug === 'process-platform') {
      assert.match(html, />Project Overview</);
      assert.match(html, />My Contribution</);
      assert.match(html, />Outcome</);
    } else {
      assert.match(html, />Project Detail</);
      assert.match(html, />Challenge</);
      assert.match(html, />Approach</);
      assert.match(html, />Outcome</);
    }
  }
});

test('portfolio project images resolve to existing files', () => {
  for (const project of portfolioContent.projects) {
    assert.equal(
      fs.existsSync(new URL(`../../${project.image.src}`, import.meta.url)),
      true,
      project.slug,
    );
  }
});

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
  assert.match(css, /\.project-feature:hover/);
  assert.match(css, /\.project-feature:focus-visible/);
  assert.match(css, /\.project-feature-media\b/);
  assert.match(css, /\.project-result\b/);
  assert.match(css, /\.project-link-label\b/);
  assert.match(css, /\.resume-panel\b/);
  assert.match(css, /\.detail-topbar\b/);
  assert.match(css, /\.detail-shell\b/);
  assert.match(css, /\.detail-hero\b/);
  assert.match(css, /\.detail-section\b/);
  assert.match(css, /\.detail-section-head\b/);
  assert.match(css, /\.detail-stack-block\b/);
  assert.match(css, /\.project-gallery-track\s*{[^}]*grid-auto-flow:\s*column/s);
  assert.match(css, /\.project-gallery-track\s*{[^}]*grid-template-rows:\s*repeat\(2,/s);
  assert.match(css, /\.gallery-card-caption\s*{[^}]*backdrop-filter:\s*blur/s);
  assert.match(css, /\.gallery-card-title\b/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*700px\)/);
  assert.doesNotMatch(css, /\.hero-panel\b/);
  assert.doesNotMatch(css, /\.project-command\b/);
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

test('renderProjectCards falls back to the placeholder image and onerror handler', () => {
  const projectMarkup = renderProjectCards([
    {
      domain: 'Fallback Domain',
      kicker: 'Fallback check',
      result: 'Fallback result',
      title: 'Broken Image Project',
      summary: 'Tests the image fallback path.',
      image: {
        src: '',
        alt: 'Broken preview',
      },
      bullets: ['One bullet'],
      stack: ['Test'],
    },
  ]);

  assert.match(projectMarkup, /assets\/placeholders\/portfolio-placeholder\.svg/);
  assert.match(
    projectMarkup,
    /onerror="this\.onerror=null;this\.src='assets\/placeholders\/portfolio-placeholder\.svg';"/,
  );
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
  assert.match(projectMarkup, /href="projects\/process-platform\.html"/);
});

test('renderProjectCards avoids undefined detail hrefs when a project slug is missing', () => {
  const projectMarkup = renderProjectCards([
    {
      domain: 'Fallback Domain',
      href: '',
      kicker: 'Fallback check',
      result: 'Fallback result',
      title: 'No Slug Project',
      summary: 'Tests the detail href fallback path.',
      image: {
        src: '',
        alt: 'Missing slug preview',
      },
      bullets: ['One bullet'],
      stack: ['Test'],
    },
  ]);

  assert.doesNotMatch(projectMarkup, /projects\/undefined\.html/);
  assert.match(projectMarkup, /href="#projects"/);
});

test('contact rendering includes available email and external profile links', () => {
  const contactMarkup = renderContactLinks(portfolioContent.contact);

  assert.equal((contactMarkup.match(/class="contact-card"/g) ?? []).length, 3);
  assert.match(contactMarkup, /class="contact-type"/);
  assert.match(contactMarkup, /mailto:zhant173@mcmaster.ca/);
  assert.match(
    contactMarkup,
    /<a class="contact-card" href="https:\/\/github\.com\/ConnorZTY001108" target="_blank" rel="noreferrer">/,
  );
  assert.match(contactMarkup, /github\.com\/ConnorZTY001108/);
  assert.match(
    contactMarkup,
    /<a class="contact-card" href="https:\/\/www\.linkedin\.com\/in\/tianyu-zhang-9470a7266\/" target="_blank" rel="noreferrer">/,
  );
  assert.match(contactMarkup, /linkedin\.com\/in\/tianyu-zhang-9470a7266/);
});

test('renderPortfolio skips missing editorial nodes without throwing and still mounts the current shell', () => {
  const nodes = new Map([
    ['site-name', createMockElement()],
    ['nav-list', createMockElement()],
    ['hero-availability', createMockElement()],
    ['hero-name', createMockElement()],
    ['hero-headline', createMockElement()],
    ['hero-summary', createMockElement()],
    ['hero-work-list', createMockElement()],
    ['hero-meta-strip', createMockElement()],
    ['about-copy', createMockElement()],
    ['about-principles', createMockElement()],
    ['project-grid', createMockElement()],
    ['resume-button', createMockElement()],
    ['resume-card-button', createMockElement()],
    ['resume-helper', createMockElement()],
    ['contact-list', createMockElement()],
    ['footer-note', createMockElement()],
  ]);

  const mockDocument = {
    getElementById(id) {
      return nodes.get(id) ?? null;
    },
  };

  assert.doesNotThrow(() => renderPortfolio(portfolioContent, mockDocument));
  assert.equal(nodes.get('site-name').textContent, 'Tianyu Zhang');
  assert.equal(nodes.get('hero-name').textContent, 'Tianyu Zhang');
  assert.match(nodes.get('hero-work-list').innerHTML, /Industrial Process Modeling Platform/);
  assert.match(nodes.get('hero-meta-strip').innerHTML, /Open to internships/);
  assert.match(nodes.get('about-principles').innerHTML, /Treat reliability as product work/);
  assert.match(nodes.get('project-grid').innerHTML, /class="project-feature"/);
});

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
      if (name === 'href') {
        this.href = '';
      }
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

  const nodes = new Map(ids.map((id) => [id, createMockElement()]));

  return {
    getElementById(id) {
      return nodes.get(id);
    },
  };
}

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
    'detail-project-body',
    'detail-challenge-body',
    'detail-approach-body',
    'detail-stack',
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

function createInteractiveNode() {
  const classStore = new Set();
  const listeners = new Map();
  const attributes = {};

  return {
    attributes,
    classList: {
      add: (...names) => names.forEach((name) => classStore.add(name)),
      remove: (...names) => names.forEach((name) => classStore.delete(name)),
      contains: (name) => classStore.has(name),
    },
    dataset: {},
    innerHTML: '',
    scrollLeft: 0,
    textContent: '',
    addEventListener(name, handler) {
      listeners.set(name, handler);
    },
    dispatch(name, event = {}) {
      const handler = listeners.get(name);

      if (handler) {
        handler(event);
      }
    },
    focus() {
      this.wasFocused = true;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    releasePointerCapture() {},
    removeAttribute(name) {
      delete attributes[name];
      delete this[name];
    },
    setAttribute(name, value) {
      attributes[name] = value;
      this[name] = value;
    },
    setPointerCapture() {},
  };
}

function createInteractiveDetailDocument() {
  const document = createMockDetailDocument('process-platform');
  const galleryRoot = createInteractiveNode();
  const galleryTrack = createInteractiveNode();
  const galleryPreview = createInteractiveNode();
  const galleryPreviewPanel = createInteractiveNode();
  const galleryPreviewImage = createInteractiveNode();
  const galleryPreviewTitle = createInteractiveNode();
  const galleryPreviewClose = createInteractiveNode();
  const galleryItem = createInteractiveNode();
  const windowListeners = new Map();

  galleryItem.dataset.galleryTitle = 'Start Menu';
  galleryItem.dataset.gallerySrc =
    '../assets/Industrial Process Modeling Platform/start_menu.png';
  galleryItem.querySelector = (selector) => {
    if (selector === 'img') {
      return {
        alt: 'Start Menu screenshot',
        getAttribute(name) {
          return name === 'src'
            ? '../assets/Industrial Process Modeling Platform/start_menu.png'
            : '';
        },
      };
    }

    return null;
  };

  galleryTrack.querySelectorAll = (selector) => {
    if (selector === '[data-gallery-item]') {
      return [galleryItem];
    }

    return [];
  };

  galleryRoot.querySelector = (selector) => {
    if (selector === '[data-gallery-track]') {
      return galleryTrack;
    }

    if (selector === '[data-gallery-preview]') {
      return galleryPreview;
    }

    if (selector === '.gallery-preview-panel') {
      return galleryPreviewPanel;
    }

    if (selector === '[data-gallery-preview-image]') {
      return galleryPreviewImage;
    }

    if (selector === '[data-gallery-preview-title]') {
      return galleryPreviewTitle;
    }

    if (selector === '.gallery-preview-close') {
      return galleryPreviewClose;
    }

    return null;
  };

  galleryRoot.querySelectorAll = (selector) => {
    if (selector === '[data-gallery-item]') {
      return [galleryItem];
    }

    return [];
  };

  document.body.classList = createInteractiveNode().classList;
  document.defaultView = {
    addEventListener(name, handler) {
      windowListeners.set(name, handler);
    },
  };
  document.getElementById('detail-project-body').querySelector = (selector) => {
    if (selector === '[data-gallery-root]') {
      return galleryRoot;
    }

    return null;
  };

  return {
    document,
    galleryItem,
    galleryPreview,
    galleryPreviewImage,
    galleryPreviewTitle,
    galleryPreviewClose,
    galleryTrack,
    windowListeners,
  };
}

test('renderPortfolio mounts the current shell and editorial fields while disabling resume CTAs safely', () => {
  const mockDocument = createMockDocument();
  renderPortfolio(portfolioContent, mockDocument);

  assert.equal(mockDocument.getElementById('site-name').textContent, 'Tianyu Zhang');
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /Projects/);
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
  assert.match(mockDocument.getElementById('about-copy').innerHTML, /workflow tools, internal platforms/i);
  assert.match(mockDocument.getElementById('project-grid').innerHTML, /Vision-Assisted Arduino Robot Car/);
  assert.equal(mockDocument.getElementById('resume-button').href, '');
  assert.equal(mockDocument.getElementById('resume-button').textContent, 'Resume PDF coming soon');
  assert.equal(mockDocument.getElementById('resume-button').classList.contains('is-disabled'), true);
  assert.equal(mockDocument.getElementById('resume-button').attributes['aria-disabled'], 'true');
  assert.equal(mockDocument.getElementById('resume-button').attributes.href, undefined);
  assert.equal(mockDocument.getElementById('resume-button').attributes.tabindex, '-1');
  assert.equal(mockDocument.getElementById('resume-card-button').textContent, 'Resume PDF coming soon');
  assert.equal(mockDocument.getElementById('resume-card-button').classList.contains('is-disabled'), true);
  assert.equal(mockDocument.getElementById('resume-card-button').attributes['aria-disabled'], 'true');
  assert.equal(mockDocument.getElementById('resume-card-button').attributes.href, undefined);
  assert.equal(mockDocument.getElementById('resume-card-button').attributes.tabindex, '-1');
  assert.equal(
    mockDocument.getElementById('resume-helper').textContent,
    portfolioContent.resume.helperText,
  );
  assert.match(mockDocument.getElementById('contact-list').innerHTML, /mailto:zhant173@mcmaster.ca/);
});

test('registerPortfolioBoot wires DOMContentLoaded to mount the portfolio', () => {
  const mockDocument = createMockDocument();
  mockDocument.readyState = 'loading';
  let registeredHandler;

  mockDocument.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    registeredHandler = handler;
  };

  registerPortfolioBoot(mockDocument);
  assert.equal(typeof registeredHandler, 'function');

  registeredHandler();

  assert.equal(mockDocument.getElementById('site-name').textContent, 'Tianyu Zhang');
  assert.equal(mockDocument.getElementById('resume-button').textContent, 'Resume PDF coming soon');
  assert.equal(mockDocument.getElementById('resume-helper').textContent, portfolioContent.resume.helperText);
});

test('registerPortfolioBoot mounts immediately when the document is already ready', () => {
  const mockDocument = createMockDocument();
  mockDocument.readyState = 'interactive';
  let addEventListenerCalled = false;

  mockDocument.addEventListener = () => {
    addEventListenerCalled = true;
  };

  registerPortfolioBoot(mockDocument);

  assert.equal(addEventListenerCalled, false);
  assert.equal(mockDocument.getElementById('site-name').textContent, 'Tianyu Zhang');
  assert.equal(mockDocument.getElementById('resume-button').textContent, 'Resume PDF coming soon');
  assert.equal(mockDocument.getElementById('resume-helper').textContent, portfolioContent.resume.helperText);
});

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

test('renderProjectDetail mounts the selected project with project detail and embedded stack placeholders', () => {
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
    'A full-stack web app for drawing, saving, and computing industrial process diagrams',
  );
  assert.match(mockDocument.getElementById('detail-stack').innerHTML, /TypeScript/);
  assert.match(mockDocument.getElementById('detail-stack').innerHTML, /React Flow/);
  assert.match(mockDocument.getElementById('detail-project-body').innerHTML, /Excel/i);
  assert.match(mockDocument.getElementById('detail-challenge-body').innerHTML, /reliable enough for repeated use/i);
  assert.match(mockDocument.getElementById('detail-challenge-body').innerHTML, /MongoDB and PostgreSQL/i);
  assert.match(mockDocument.getElementById('detail-approach-body').innerHTML, /auto-upgrade logic/i);
  assert.match(mockDocument.getElementById('detail-outcome-body').innerHTML, /McMaster University/i);
  assert.equal(
    mockDocument.getElementById('detail-project-body').attributes['data-empty'],
    undefined,
  );
});

test('renderProjectDetail includes the process-platform overview gallery contract', () => {
  const mockDocument = createMockDetailDocument('process-platform');

  renderProjectDetail(mockDocument);

  const overviewMarkup = mockDocument.getElementById('detail-project-body').innerHTML;

  assert.match(overviewMarkup, /data-gallery-root/);
  assert.match(overviewMarkup, /data-gallery-track/);
  assert.match(overviewMarkup, /gallery-card-caption/);
  assert.match(overviewMarkup, /gallery-card-title/);
  assert.match(overviewMarkup, /gallery-preview/);
  assert.match(overviewMarkup, /Start Menu/);
  assert.match(overviewMarkup, /UI Overview/);
  assert.match(overviewMarkup, /assets\/Industrial Process Modeling Platform\//);
  assert.match(overviewMarkup, /Computation Panel/);
  assert.match(overviewMarkup, /Material Editor/);
  assert.match(overviewMarkup, /Data Export/);
  assert.match(overviewMarkup, /data-gallery-title="Start Menu"/);
  assert.match(overviewMarkup, /data-gallery-title="Cost Breakdown"/);
  assert.equal((overviewMarkup.match(/data-gallery-item/g) ?? []).length, 10);
  assert.ok(
    overviewMarkup.indexOf('subnetwork blueprints') < overviewMarkup.indexOf('data-gallery-root'),
    'expected the overview gallery to appear after the descriptive paragraphs',
  );
});

test('renderProjectDetail wires process-platform gallery cards to open and close the preview', async () => {
  const {
    document,
    galleryItem,
    galleryPreview,
    galleryPreviewImage,
    galleryPreviewTitle,
    galleryPreviewClose,
    galleryTrack,
    windowListeners,
  } = createInteractiveDetailDocument();

  renderProjectDetail(document);

  galleryItem.dispatch('click', {
    currentTarget: galleryItem,
    target: galleryItem,
    preventDefault() {},
  });

  assert.equal(galleryPreview.classList.contains('is-open'), true);
  assert.equal(
    galleryPreviewImage.src,
    '../assets/Industrial Process Modeling Platform/start_menu.png',
  );
  assert.equal(galleryPreviewTitle.textContent, 'Start Menu');
  assert.equal(galleryPreviewClose.wasFocused, true);

  galleryPreview.dispatch('click', {
    target: {
      closest(selector) {
        return selector === '[data-gallery-close]' ? {} : null;
      },
    },
  });

  assert.equal(galleryPreview.classList.contains('is-open'), false);

  galleryTrack.dispatch('mousedown', {
    button: 0,
    clientX: 120,
  });
  windowListeners.get('mousemove')?.({
    clientX: 142,
    preventDefault() {},
  });
  windowListeners.get('mouseup')?.({});
  galleryItem.dispatch('click', {
    currentTarget: galleryItem,
    target: galleryItem,
    preventDefault() {},
  });

  assert.equal(galleryPreview.classList.contains('is-open'), false);

  await new Promise((resolve) => setTimeout(resolve, 0));

  galleryItem.dispatch('click', {
    currentTarget: galleryItem,
    target: galleryItem,
    preventDefault() {},
  });

  assert.equal(galleryPreview.classList.contains('is-open'), true);

  windowListeners.get('keydown')?.({ key: 'Escape' });

  assert.equal(galleryPreview.classList.contains('is-open'), false);
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
  assert.equal(mockDocument.getElementById('detail-stack').innerHTML, '');
  assert.equal(
    mockDocument.getElementById('detail-project-body').attributes['data-empty'],
    'true',
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

test('registerProjectDetailBoot waits for DOMContentLoaded when the detail document is loading', () => {
  const mockDocument = createMockDetailDocument('robot-car');
  mockDocument.readyState = 'loading';
  let registeredHandler;

  mockDocument.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    registeredHandler = handler;
  };

  registerProjectDetailBoot(mockDocument);

  assert.equal(typeof registeredHandler, 'function');
  assert.equal(mockDocument.getElementById('detail-title').textContent, '');

  registeredHandler();

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Vision-Assisted Arduino Robot Car',
  );
});
