import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { portfolioContent } from '../../content.js';
import {
  getResumeState,
  registerPortfolioBoot,
  renderNavigation,
  renderStatPills,
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
  assert.equal(portfolioContent.profile.headline, 'M.Eng Student in Systems and Technology');
  assert.equal(portfolioContent.profile.availability, 'Open to internship opportunities');
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

test('index shell defines the required sections and the module entrypoint', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

  assert.ok(html.includes('<link rel="stylesheet" href="./styles.css" />'));
  assert.ok(html.includes('src="assets/placeholders/hero-shape.svg"'));
  assert.ok(html.includes('id="site-name"'));
  assert.ok(html.includes('id="nav-list"'));
  assert.ok(html.includes('id="hero-availability"'));
  assert.ok(html.includes('id="hero-name"'));
  assert.ok(html.includes('id="hero-headline"'));
  assert.ok(html.includes('id="hero-intro"'));
  assert.ok(html.includes('id="about-copy"'));
  assert.ok(html.includes('id="about-stats"'));
  assert.ok(html.includes('id="resume-button"'));
  assert.ok(html.includes('id="resume-card-button"'));
  assert.ok(html.includes('id="resume-helper"'));
  assert.ok(html.includes('id="footer-note"'));
  assert.ok(html.includes('id="about"'));
  assert.ok(html.includes('id="projects"'));
  assert.ok(html.includes('id="resume"'));
  assert.ok(html.includes('id="contact"'));
  assert.ok(html.includes('id="project-grid"'));
  assert.ok(html.includes('id="contact-list"'));
  assert.ok(html.includes('<script type="module" src="./app.js"></script>'));
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

test('styles include focus treatment for project cards, gallery ribbon hooks, and a mobile breakpoint', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /scroll-behavior:\s*smooth/);
  assert.match(css, /\.button\.is-disabled/);
  assert.match(css, /\.project-card:hover/);
  assert.match(css, /\.project-card:focus-visible/);
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

test('render helpers output the expected navigation, stat pills, and project cards', () => {
  const navMarkup = renderNavigation(portfolioContent.navigation);
  const statMarkup = renderStatPills(portfolioContent.about.stats);
  const projectMarkup = renderProjectCards(portfolioContent.projects);

  assert.equal((navMarkup.match(/<li>/g) ?? []).length, portfolioContent.navigation.length);
  assert.match(navMarkup, /<li><a href="#about">About<\/a><\/li>.*<li><a href="#projects">Projects<\/a><\/li>.*<li><a href="#contact">Contact<\/a><\/li>/s);
  assert.equal((statMarkup.match(/class="stat-pill"/g) ?? []).length, portfolioContent.about.stats.length);
  assert.match(statMarkup, /Performance-Focused Projects/);
  assert.match(projectMarkup, /class="project-card"/);
  assert.match(projectMarkup, /class="project-media"/);
  assert.match(projectMarkup, /class="project-copy"/);
  assert.match(projectMarkup, /class="project-bullets"/);
  assert.match(projectMarkup, /class="tag-list"/);
  assert.match(projectMarkup, /Industrial Process Modeling Platform/);
  assert.match(projectMarkup, /Vision-Assisted Arduino Robot Car/);
  assert.match(projectMarkup, /Consumer Behaviour Analytics Dashboard/);
  assert.match(projectMarkup, /interactive canvas/i);
  assert.match(projectMarkup, /schema upgrades for older files/i);
  assert.match(projectMarkup, /assets\/placeholders\/portfolio-placeholder\.svg/);
  assert.equal((projectMarkup.match(/class="project-card"/g) ?? []).length, 3);
  assert.match(projectMarkup, /<a class="project-card" href="projects\/process-platform\.html">/);
  assert.match(projectMarkup, /<a class="project-card" href="projects\/robot-car\.html">/);
  assert.match(projectMarkup, /<a class="project-card" href="projects\/analytics-dashboard\.html">/);
});

test('renderProjectCards falls back to the placeholder image and onerror handler', () => {
  const projectMarkup = renderProjectCards([
    {
      kicker: 'Fallback check',
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

test('renderProjectCards avoids undefined detail hrefs when a project slug is missing', () => {
  const projectMarkup = renderProjectCards([
    {
      href: '',
      kicker: 'Fallback check',
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

test('renderPortfolio mounts the content and disables resume CTAs safely', () => {
  const mockDocument = createMockDocument();
  renderPortfolio(portfolioContent, mockDocument);

  assert.equal(mockDocument.getElementById('site-name').textContent, 'Tianyu Zhang');
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /Projects/);
  assert.match(mockDocument.getElementById('about-copy').innerHTML, /Master of Engineering student/);
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
