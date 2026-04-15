import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { portfolioContent } from '../../content.js';
import {
  registerPortfolioBoot,
  renderNavigation,
  renderProjectCards,
  renderProjectGroups,
  renderContactLinks,
  renderPortfolio,
} from '../../app.js';
import {
  getProjectBySlug,
  getProjectDetailState,
  renderProjectDetail,
  registerProjectDetailBoot,
} from '../../project-detail.js';
import {
  mountInteractiveBackground,
  registerInteractiveBackgroundBoot,
} from '../../background.js';
import {
  bindContactCardActions,
  copyContactValue,
  renderContactCards,
  renderContactPage,
  registerContactPageBoot,
} from '../../contact.js';
import {
  renderAboutPage,
  registerAboutPageBoot,
} from '../../about.js';

test('portfolio content exposes the cloned dekiru-style homepage contract', () => {
  assert.equal(portfolioContent.profile.name, 'Tianyu Zhang');
  assert.equal(portfolioContent.profile.wordmark.primary, 'Tianyu');
  assert.equal(portfolioContent.profile.wordmark.secondary, 'Zhang');
  assert.deepEqual(portfolioContent.profile.heroStatementLines, [
    'Software Design',
    '& Build for',
    'Workflow Systems',
  ]);
  assert.equal(portfolioContent.navigation.length, 3);
  assert.deepEqual(
    portfolioContent.navigation.map((item) => item.href),
    ['index.html#projects', 'about.html', 'contact.html'],
  );
  assert.deepEqual(
    portfolioContent.navigation.map((item) => item.label),
    ['Projects', 'About Me', 'Contact'],
  );
  assert.deepEqual(
    portfolioContent.projects.map((project) => project.slug),
    ['process-platform', 'robot-car', 'analytics-dashboard'],
  );
  assert.deepEqual(
    portfolioContent.projectCategories.map((category) => category.slug),
    [
      'full-stack-development',
      'network-cybersecurity',
      'hardware-development',
      'data-analysis',
      'personal-interest',
    ],
  );
  assert.equal(portfolioContent.projects[0].detailMeta.siteType, 'Workflow Platform');
  assert.equal(portfolioContent.projects[1].detailMeta.platform, 'Angular + Python');
  assert.equal(portfolioContent.projects[2].detailMeta.disciplines.length, 2);
  assert.equal(portfolioContent.projects[0].category, 'full-stack-development');
  assert.equal(portfolioContent.projects[1].category, 'hardware-development');
  assert.equal(portfolioContent.projects[2].category, 'data-analysis');
  assert.equal(
    portfolioContent.contact.find((entry) => entry.label === 'Email')?.href,
    'mailto:zhant173@mcmaster.ca',
  );
});

test('homepage shell declares the dekiru-like header, tagline, and logo-wall hooks', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

  assert.match(html, /<body class="home-page">/);
  assert.match(html, /<div id="dots"><\/div>/);
  assert.match(html, /class="site-header"/);
  assert.match(html, /id="wordmark-primary"/);
  assert.match(html, /id="wordmark-secondary"/);
  assert.match(html, /id="nav-list"/);
  assert.match(html, /id="hero-statement"/);
  assert.match(html, /id="project-grid"/);
  assert.match(html, /class="view-all-projects"/);
  assert.doesNotMatch(html, /id="about-copy"/);
  assert.doesNotMatch(html, /<section class="page-copy" id="about">/);
  assert.doesNotMatch(html, /class="site-footer"/);
  assert.doesNotMatch(html, /id="contact-list"/);
  assert.doesNotMatch(html, /id="footer-note"/);
  assert.match(html, /src="\.\/assets\/vendor\/three\.min\.js"/);
  assert.match(html, /src="\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
  assert.match(html, /<script type="module" src="\.\/app\.js"><\/script>/);
});

test('contact page shell declares the shared header and standalone contact hooks', () => {
  const html = fs.readFileSync(new URL('../../contact.html', import.meta.url), 'utf8');

  assert.match(html, /<body class="contact-page">/);
  assert.match(html, /<div id="dots"><\/div>/);
  assert.match(html, /id="wordmark-primary"/);
  assert.match(html, /id="wordmark-secondary"/);
  assert.match(html, /id="nav-list"/);
  assert.match(html, /id="contact-page-list"/);
  assert.doesNotMatch(html, /class="site-footer"/);
  assert.match(html, /src="\.\/assets\/vendor\/three\.min\.js"/);
  assert.match(html, /src="\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
  assert.match(html, /<script type="module" src="\.\/contact\.js"><\/script>/);
});

test('about page shell declares the shared header and standalone about hooks', () => {
  const html = fs.readFileSync(new URL('../../about.html', import.meta.url), 'utf8');

  assert.match(html, /<body class="about-page">/);
  assert.match(html, /<div id="dots"><\/div>/);
  assert.match(html, /id="wordmark-primary"/);
  assert.match(html, /id="wordmark-secondary"/);
  assert.match(html, /id="nav-list"/);
  assert.match(html, /id="about-page-copy"/);
  assert.doesNotMatch(html, /class="site-footer"/);
  assert.match(html, /src="\.\/assets\/vendor\/three\.min\.js"/);
  assert.match(html, /src="\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
  assert.match(html, /<script type="module" src="\.\/about\.js"><\/script>/);
});

test('project detail shells expose pagination, metadata, media, and aside hooks', () => {
  const detailPages = [
    ['process-platform', '../../projects/process-platform.html'],
    ['robot-car', '../../projects/robot-car.html'],
    ['analytics-dashboard', '../../projects/analytics-dashboard.html'],
  ];

  for (const [slug, file] of detailPages) {
    const html = fs.readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(html, new RegExp(`data-project-slug="${slug}"`));
    assert.match(html, /id="detail-prev-link"/);
    assert.match(html, /id="detail-next-link"/);
    assert.match(html, /id="detail-title"/);
    assert.match(html, /id="detail-visit-link"/);
    assert.match(html, /id="detail-meta-site-type"/);
    assert.match(html, /id="detail-meta-platform"/);
    assert.match(html, /id="detail-meta-disciplines"/);
    assert.match(html, /id="detail-featured-image"/);
    assert.match(html, /id="detail-details-body"/);
    assert.match(html, /id="detail-quote-body"/);
    assert.match(html, /id="detail-quote-credit"/);
    assert.match(html, /id="detail-aside-logo"/);
    assert.match(html, /id="detail-longform-link"/);
    assert.match(html, /id="detail-longform-image"/);
    assert.doesNotMatch(html, /class="site-footer"/);
    assert.doesNotMatch(html, /id="contact-list"/);
    assert.match(html, /src="\.\.\/assets\/vendor\/three\.min\.js"/);
    assert.match(html, /src="\.\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
    assert.match(html, /src="\.\.\/project-detail\.js"/);
  }
});

test('styles define local postmono font faces and cloned homepage/detail layout classes', () => {
  const css = fs.readFileSync(new URL('../../styles.css', import.meta.url), 'utf8');

  assert.match(css, /font-family:\s*'PostMono'/);
  assert.match(css, /src:\s*url\('\.\/assets\/fonts\/PostMono-Light\.woff2'\)/);
  assert.match(css, /font-family:\s*'SpaceMono'/);
  assert.match(css, /src:\s*url\('\.\/assets\/fonts\/SpaceMono-Regular\.woff2'\)/);
  assert.match(css, /\.site-header\b/);
  assert.match(css, /\.dots-canvas\b/);
  assert.match(css, /\.header-content\b/);
  assert.match(css, /\.tagline\b/);
  assert.match(css, /\.tagline-line\b/);
  assert.match(css, /\.work\b/);
  assert.match(css, /\.project-grid\b/);
  assert.match(css, /\.project-groups\b/);
  assert.match(css, /\.project-category\b/);
  assert.match(css, /\.project-category-title\b/);
  assert.match(css, /\.project-empty-state\b/);
  assert.match(css, /\.project-logo\b/);
  assert.match(css, /\.project-card\b/);
  assert.match(css, /\.project-card-wordmark\b/);
  assert.match(css, /\.project-hover-copy\b/);
  assert.match(css, /\.project-title\b/);
  assert.match(css, /\.view-all-projects\b/);
  assert.match(css, /\.project-pagination\b/);
  assert.match(css, /\.project-header\b/);
  assert.match(css, /\.project-content\b/);
  assert.match(css, /\.featured-image\b/);
  assert.match(css, /\.project-aside\b/);
  assert.match(css, /\.project-longform-image\b/);
  assert.match(css, /\.project-quote\b/);
  assert.match(css, /\.about-page \.site-main\b/);
  assert.match(css, /\.about-page-panel\b/);
  assert.match(css, /\.about-page-copy\b/);
  assert.match(css, /\.contact-card\b/);
  assert.match(css, /\.contact-card-icon\b/);
  assert.match(css, /\.contact-card-copy\b/);
  assert.match(css, /\.contact-page \.site-content\b/);
  assert.match(css, /\.contact-page \.content-area\b/);
  assert.match(css, /\.contact-page \.site-main\b/);
  assert.match(css, /aspect-ratio:\s*1\s*\/\s*1/);
  assert.match(css, /justify-content:\s*flex-start/);
  assert.match(css, /align-items:\s*flex-start/);
  assert.match(css, /padding-top:\s*clamp\(/);
  assert.match(css, /@media\s*\(max-width:\s*960px\)/);
});

test('renderNavigation outputs linked menu items using explicit hrefs', () => {
  const markup = renderNavigation(portfolioContent.navigation);

  assert.match(markup, /class="menu-item"/);
  assert.match(markup, /href="index\.html#projects"/);
  assert.match(markup, /href="about\.html"/);
  assert.match(markup, /href="contact\.html"/);
  assert.match(markup, />About Me</);
});

test('renderProjectCards outputs logo-wall cards with a wordmark and short result line', () => {
  const markup = renderProjectCards(portfolioContent.projects);

  assert.match(markup, /class="project project-card"/);
  assert.match(markup, /class="project-logo project-card-wordmark"/);
  assert.match(markup, /class="project-hover-copy"/);
  assert.match(markup, /class="project-card-result"/);
  assert.match(markup, /Industrial Process Modeling Platform/);
  assert.match(markup, /Vision-Assisted Arduino Robot Car/);
  assert.match(markup, /Safer saves, schema upgrades/i);
  assert.match(markup, /href="projects\/process-platform\.html"/);
});

test('renderProjectGroups outputs grouped project sections with a category placeholder state', () => {
  const markup = renderProjectGroups(
    portfolioContent.projects,
    portfolioContent.projectCategories,
  );

  assert.match(markup, /Full-Stack Development/);
  assert.match(markup, /Network &amp; Cybersecurity|Network & Cybersecurity/);
  assert.match(markup, /Hardware Development/);
  assert.match(markup, /Data Analysis/);
  assert.match(markup, /Personal Interest/);
  assert.match(markup, /Industrial Process Modeling Platform/);
  assert.match(markup, /Vision-Assisted Arduino Robot Car/);
  assert.match(markup, /Consumer Behaviour Analytics Dashboard/);
  assert.match(markup, /project-empty-state/);
  assert.match(markup, /Projects coming soon\./);
});

test('renderContactLinks outputs footer-style contact endpoints', () => {
  const markup = renderContactLinks(portfolioContent.contact);

  assert.match(markup, /class="footer-link"/);
  assert.match(markup, /mailto:zhant173@mcmaster\.ca/);
  assert.match(markup, /github\.com\/ConnorZTY001108/);
});

test('renderContactCards outputs project-style tiles with copy and external actions', () => {
  const markup = renderContactCards(portfolioContent.contact);

  assert.match(markup, /class="project project-card contact-card contact-card-button"/);
  assert.match(markup, /data-contact-copy="zhant173@mcmaster\.ca"/);
  assert.match(markup, />Email</);
  assert.match(markup, /class="project project-card contact-card suppressed"/);
  assert.match(markup, /href="https:\/\/github\.com\/ConnorZTY001108"/);
  assert.match(markup, /href="https:\/\/www\.linkedin\.com\/in\/tianyu-zhang-9470a7266\/"/);
  assert.match(markup, />GitHub</);
  assert.match(markup, />LinkedIn</);
  assert.doesNotMatch(markup, /Copy my McMaster email address to the clipboard/i);
  assert.doesNotMatch(markup, /View repositories and project work/i);
  assert.doesNotMatch(markup, /Open my professional profile/i);
});

test('copyContactValue writes the requested value to clipboard when available', async () => {
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };

  await copyContactValue('zhant173@mcmaster.ca', clipboard);
  assert.equal(clipboard.copiedText, 'zhant173@mcmaster.ca');
});

test('bindContactCardActions wires email copy cards to the clipboard action', async () => {
  const button = createMockInteractiveContactButton();
  const clipboard = {
    copiedText: '',
    async writeText(value) {
      this.copiedText = value;
    },
  };
  const doc = {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-contact-copy]');
      return [button];
    },
  };

  bindContactCardActions(doc, clipboard);
  await button.listeners.click();

  assert.equal(clipboard.copiedText, 'zhant173@mcmaster.ca');
  assert.equal(button.dataset.copyState, 'copied');
});

test('renderContactPage mounts the shared wordmark and standalone contact list', () => {
  const mockDocument = createMockContactDocument();

  renderContactPage(mockDocument);

  assert.equal(mockDocument.getElementById('wordmark-primary').textContent, 'Tianyu');
  assert.equal(mockDocument.getElementById('wordmark-secondary').textContent, 'Zhang');
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /contact\.html/);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /contact-card/);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /data-contact-copy="zhant173@mcmaster\.ca"/);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /github\.com\/ConnorZTY001108/i);
  assert.match(mockDocument.getElementById('contact-page-list').innerHTML, /linkedin\.com\/in\/tianyu-zhang-9470a7266/i);
});

test('renderAboutPage mounts the shared wordmark and standalone about copy', () => {
  const mockDocument = createMockAboutDocument();

  renderAboutPage(mockDocument);

  assert.equal(mockDocument.getElementById('wordmark-primary').textContent, 'Tianyu');
  assert.equal(mockDocument.getElementById('wordmark-secondary').textContent, 'Zhang');
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /about\.html/);
  assert.match(mockDocument.getElementById('nav-list').innerHTML, />About Me</);
  assert.match(
    mockDocument.getElementById('about-page-copy').innerHTML,
    /software that sits between people, operations, and technical systems/i,
  );
  assert.match(
    mockDocument.getElementById('about-page-copy').innerHTML,
    /product judgment and engineering rigor/i,
  );
});

test('mountInteractiveBackground appends an animated canvas and registers pointer listeners', () => {
  const { doc, root, win } = createMockBackgroundDocument();

  assert.equal(mountInteractiveBackground(doc), true);
  assert.equal(root.dataset.enhanced, 'true');
  assert.equal(root.children.length, 1);
  assert.equal(root.children[0].className, 'dots-canvas');
  assert.equal(typeof win.listeners.pointermove, 'function');
  assert.equal(typeof win.listeners.resize, 'function');
  assert.equal(mountInteractiveBackground(doc), false);
});

test('mountInteractiveBackground prefers source-site VANTA DOTS when available', () => {
  const { doc, root, win } = createMockBackgroundDocument({ withVanta: true });

  assert.equal(mountInteractiveBackground(doc), true);
  assert.equal(root.dataset.enhanced, 'true');
  assert.deepEqual(win.vantaCalls[0], {
    el: root,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 5,
    size: 10,
    scaleMobile: 1,
    color: 2242616,
    color2: 16777215,
    backgroundColor: 0,
    spacing: 100,
    showLines: false,
  });
});

test('registerInteractiveBackgroundBoot mounts immediately and via DOMContentLoaded', () => {
  const { doc: readyDoc, root: readyRoot } = createMockBackgroundDocument();
  readyDoc.readyState = 'interactive';

  registerInteractiveBackgroundBoot(readyDoc);
  assert.equal(readyRoot.dataset.enhanced, 'true');

  const { doc: loadingDoc, root: loadingRoot } = createMockBackgroundDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerInteractiveBackgroundBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.equal(loadingRoot.dataset.enhanced, 'true');
});

test('renderPortfolio mounts the dekiru-like wordmark, navigation, tagline, grid, and footer endpoints', () => {
  const mockDocument = createMockHomeDocument();

  renderPortfolio(portfolioContent, mockDocument);

  assert.equal(mockDocument.getElementById('wordmark-primary').textContent, 'Tianyu');
  assert.equal(mockDocument.getElementById('wordmark-secondary').textContent, 'Zhang');
  assert.match(mockDocument.getElementById('hero-statement').innerHTML, /tagline-line/);
  assert.match(mockDocument.getElementById('hero-statement').innerHTML, /<br\s*\/?>/i);
  assert.match(mockDocument.getElementById('hero-statement').innerHTML, /Workflow Systems/);
  assert.match(mockDocument.getElementById('nav-list').innerHTML, /Projects/);
  assert.match(mockDocument.getElementById('project-grid').innerHTML, /project-category-title/);
  assert.match(mockDocument.getElementById('project-grid').innerHTML, /project-card-wordmark/);
});

test('registerPortfolioBoot wires DOMContentLoaded and mounts immediately for ready documents', () => {
  const loadingDoc = createMockHomeDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerPortfolioBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.equal(loadingDoc.getElementById('wordmark-primary').textContent, 'Tianyu');

  const readyDoc = createMockHomeDocument();
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready documents should mount immediately');
  };

  registerPortfolioBoot(readyDoc);
  assert.equal(readyDoc.getElementById('wordmark-primary').textContent, 'Tianyu');
});

test('registerContactPageBoot mounts immediately and via DOMContentLoaded', () => {
  const readyDoc = createMockContactDocument();
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready contact documents should mount immediately');
  };

  registerContactPageBoot(readyDoc);
  assert.equal(readyDoc.getElementById('wordmark-primary').textContent, 'Tianyu');

  const loadingDoc = createMockContactDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerContactPageBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.match(loadingDoc.getElementById('contact-page-list').innerHTML, /GitHub/i);
});

test('registerAboutPageBoot mounts immediately and via DOMContentLoaded', () => {
  const readyDoc = createMockAboutDocument();
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready about documents should mount immediately');
  };

  registerAboutPageBoot(readyDoc);
  assert.equal(readyDoc.getElementById('wordmark-primary').textContent, 'Tianyu');

  const loadingDoc = createMockAboutDocument();
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerAboutPageBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.match(loadingDoc.getElementById('about-page-copy').innerHTML, /workflow platforms/i);
});

test('detail helpers resolve projects, prev-next pagination, and a safe missing-project state', () => {
  assert.equal(getProjectBySlug('robot-car').title, 'Vision-Assisted Arduino Robot Car');
  assert.equal(getProjectBySlug('missing-project'), null);

  const foundState = getProjectDetailState('robot-car');
  const missingState = getProjectDetailState('missing-project');

  assert.equal(foundState.isMissing, false);
  assert.equal(foundState.project.slug, 'robot-car');
  assert.equal(foundState.prevProject.slug, 'process-platform');
  assert.equal(foundState.nextProject.slug, 'analytics-dashboard');
  assert.equal(missingState.isMissing, true);
  assert.equal(missingState.title, 'Project not found');
});

test('renderProjectDetail mounts cloned detail-page metadata, media, and narrative sections', () => {
  const mockDocument = createMockDetailDocument('process-platform');

  renderProjectDetail(mockDocument);

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Industrial Process Modeling Platform');
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Visit Project');
  assert.match(mockDocument.getElementById('detail-visit-link').href, /process-platform/i);
  assert.equal(mockDocument.getElementById('detail-meta-site-type').textContent, 'Workflow Platform');
  assert.equal(mockDocument.getElementById('detail-meta-platform').textContent, 'React + Node.js');
  assert.match(mockDocument.getElementById('detail-meta-disciplines').innerHTML, /Frontend Systems/);
  assert.match(mockDocument.getElementById('detail-featured-image').attributes.src, /ui_overview\.png/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Challenge/i);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /MongoDB and PostgreSQL/i);
  assert.match(mockDocument.getElementById('detail-aside-logo').innerHTML, /Industrial Process Modeling Platform/);
  assert.match(mockDocument.getElementById('detail-longform-image').attributes.src, /portfolio-placeholder\.svg|start_menu\.png|ui_overview\.png/);
});

test('renderProjectDetail mounts a safe fallback when the slug is unknown', () => {
  const mockDocument = createMockDetailDocument('missing-project');

  renderProjectDetail(mockDocument);

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Project not found');
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Return to the homepage/i);
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Back to Home');
  assert.match(mockDocument.getElementById('detail-visit-link').href, /\.\.\/index\.html#projects/);
});

test('registerProjectDetailBoot mounts immediately and via DOMContentLoaded for detail pages', () => {
  const readyDoc = createMockDetailDocument('analytics-dashboard');
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = () => {
    throw new Error('ready detail documents should mount immediately');
  };

  registerProjectDetailBoot(readyDoc);
  assert.equal(readyDoc.getElementById('detail-title').textContent, 'Consumer Behaviour Analytics Dashboard');

  const loadingDoc = createMockDetailDocument('robot-car');
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'DOMContentLoaded');
    loadingHandler = handler;
  };

  registerProjectDetailBoot(loadingDoc);
  assert.equal(typeof loadingHandler, 'function');
  loadingHandler();
  assert.equal(loadingDoc.getElementById('detail-title').textContent, 'Vision-Assisted Arduino Robot Car');
});

function createMockHomeDocument() {
  const ids = [
    'wordmark-primary',
    'wordmark-secondary',
    'nav-list',
    'hero-statement',
    'project-grid',
  ];

  return createMockDocument(ids);
}

function createMockContactDocument() {
  const ids = [
    'wordmark-primary',
    'wordmark-secondary',
    'nav-list',
    'contact-page-list',
  ];

  return createMockDocument(ids);
}

function createMockAboutDocument() {
  const ids = [
    'wordmark-primary',
    'wordmark-secondary',
    'nav-list',
    'about-page-copy',
  ];

  return createMockDocument(ids);
}

function createMockDetailDocument(slug) {
  const ids = [
    'detail-prev-link',
    'detail-next-link',
    'detail-title',
    'detail-visit-link',
    'detail-meta-site-type',
    'detail-meta-platform',
    'detail-meta-disciplines',
    'detail-featured-image',
    'detail-details-body',
    'detail-quote-body',
    'detail-quote-credit',
    'detail-aside-logo',
    'detail-longform-link',
    'detail-longform-image',
  ];

  const doc = createMockDocument(ids);
  doc.body.dataset.projectSlug = slug;
  return doc;
}

function createMockBackgroundDocument(options = {}) {
  const { withVanta = false } = options;
  const root = {
    id: 'dots',
    dataset: {},
    children: [],
    clientWidth: 1280,
    clientHeight: 720,
    appendChild(node) {
      this.children.push(node);
      return node;
    },
  };

  const win = {
    innerWidth: 1280,
    innerHeight: 720,
    devicePixelRatio: 1,
    listeners: {},
    vantaCalls: [],
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    requestAnimationFrame(handler) {
      this.lastAnimationFrame = handler;
      return 1;
    },
  };

  if (withVanta) {
    win.VANTA = {
      DOTS(config) {
        win.vantaCalls.push(config);
        return { destroy() {} };
      },
    };
  }

  const doc = {
    readyState: 'interactive',
    body: {
      dataset: {},
    },
    defaultView: win,
    getElementById(id) {
      if (id === 'dots') {
        return root;
      }

      return null;
    },
    createElement(tagName) {
      return createMockElement(tagName);
    },
    addEventListener() {},
  };

  return { doc, root, win };
}

function createMockDocument(ids) {
  const nodes = new Map(ids.map((id) => [id, createMockNode(id)]));

  return {
    readyState: 'interactive',
    body: {
      dataset: {},
    },
    defaultView: {},
    getElementById(id) {
      return nodes.get(id) ?? null;
    },
    addEventListener() {},
  };
}

function createMockElement(tagName) {
  return {
    tagName: String(tagName).toUpperCase(),
    className: '',
    attributes: {},
    style: {},
    width: 0,
    height: 0,
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getContext() {
      return {
        clearRect() {},
        fillRect() {},
        beginPath() {},
        arc() {},
        fill() {},
        setTransform() {},
      };
    },
  };
}

function createMockInteractiveContactButton() {
  return {
    dataset: {
      contactCopy: 'zhant173@mcmaster.ca',
    },
    listeners: {},
    attributes: {},
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
  };
}

function createMockNode(id) {
  return {
    id,
    textContent: '',
    innerHTML: '',
    href: '',
    attributes: {},
    classList: createClassList(),
    setAttribute(name, value) {
      this.attributes[name] = String(value);
      if (name === 'href') {
        this.href = String(value);
      }
    },
    removeAttribute(name) {
      delete this.attributes[name];
      if (name === 'href') {
        this.href = '';
      }
    },
  };
}

function createClassList() {
  const values = new Set();

  return {
    add(...items) {
      items.forEach((item) => values.add(item));
    },
    remove(...items) {
      items.forEach((item) => values.delete(item));
    },
    contains(item) {
      return values.has(item);
    },
  };
}
