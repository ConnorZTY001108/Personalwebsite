import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { portfolioContent } from '../../content.js';
import {
  bindProjectCategoryToggles,
  registerPortfolioBoot,
  renderNavigation,
  renderProjectCards,
  renderProjectGroups,
  renderContactLinks,
  renderPortfolio,
} from '../../app.js';
import {
  bindProjectDetailSectionToggles,
  bindProjectDetailLightbox,
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
    [
      'process-platform',
      'robot-car',
      'analytics-dashboard',
      'secure-gateway-sgx',
      'intel-sgx-enclave-lab',
      'dns-parking-detection',
      'decentralized-platforms',
      'smart-home-management',
      'gym-membership-management',
      'community-refrigerator',
      'aed-interface-simulation',
      'interactive-documentary',
    ],
  );
  assert.equal(portfolioContent.projects.length, 12);
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'community-refrigerator')
      ?.category,
    'full-stack-development',
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'secure-gateway-sgx')
      ?.category,
    'network-cybersecurity',
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'aed-interface-simulation')
      ?.category,
    'hardware-development',
  );
  assert.equal(
    portfolioContent.projects.find((project) => project.slug === 'interactive-documentary')
      ?.category,
    'personal-interest',
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
  assert.equal(portfolioContent.projects[0].logoImage, 'assets/logos/hypronet-logo.png');
  assert.equal(portfolioContent.projects[0].detailLeadSections[0].title, 'Project Description');
  assert.equal(portfolioContent.projects[0].detailLeadSections[1].title, 'Outcome');
  assert.match(portfolioContent.projects[0].detailLeadSections[0].bodyHtml, /web-based modeling and version management tool/i);
  assert.match(portfolioContent.projects[0].detailLeadSections[1].bodyHtml, /reducing save time, improving computation speed/i);
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
    ['secure-gateway-sgx', '../../projects/secure-gateway-sgx.html'],
    ['intel-sgx-enclave-lab', '../../projects/intel-sgx-enclave-lab.html'],
    ['dns-parking-detection', '../../projects/dns-parking-detection.html'],
    ['decentralized-platforms', '../../projects/decentralized-platforms.html'],
    ['smart-home-management', '../../projects/smart-home-management.html'],
    ['gym-membership-management', '../../projects/gym-membership-management.html'],
    ['community-refrigerator', '../../projects/community-refrigerator.html'],
    ['aed-interface-simulation', '../../projects/aed-interface-simulation.html'],
    ['interactive-documentary', '../../projects/interactive-documentary.html'],
  ];

  for (const [slug, file] of detailPages) {
    const html = fs.readFileSync(new URL(file, import.meta.url), 'utf8');

    assert.match(html, new RegExp(`data-project-slug="${slug}"`));
    assert.match(html, /id="detail-prev-link"/);
    assert.match(html, /id="detail-next-link"/);
    assert.match(html, /id="detail-title"/);
    assert.match(html, /id="detail-visit-link"/);
    assert.match(html, /id="detail-meta-stack"/);
    assert.match(html, /id="detail-featured-image"/);
    assert.match(html, /id="detail-details-body"/);
    assert.match(html, /id="detail-project-quote"/);
    assert.match(html, /id="detail-quote-body"/);
    assert.match(html, /id="detail-quote-credit"/);
    assert.match(html, /id="detail-aside-logo"/);
    assert.match(html, /id="detail-longform-link"/);
    assert.match(html, /id="detail-longform-image"/);
    assert.match(html, /id="detail-image-lightbox"/);
    assert.match(html, /id="detail-image-lightbox-backdrop"/);
    assert.match(html, /id="detail-image-lightbox-dialog"/);
    assert.match(html, /id="detail-image-lightbox-close"/);
    assert.match(html, /id="detail-image-lightbox-image"/);
    assert.match(html, /id="detail-image-lightbox-caption"/);
    assert.match(html, /id="detail-image-lightbox-prev"/);
    assert.match(html, /id="detail-image-lightbox-next"/);
    assert.doesNotMatch(html, /class="site-footer"/);
    assert.doesNotMatch(html, /id="contact-list"/);
    assert.match(html, /src="\.\.\/assets\/vendor\/three\.min\.js"/);
    assert.match(html, /src="\.\.\/assets\/vendor\/vanta\.dots\.min\.js"/);
    assert.match(html, /src="\.\.\/project-detail\.js"/);
  }
});

test('secure gateway pdf asset exists for the detail download card', () => {
  assert.equal(
    fs.existsSync(
      new URL('../../assets/project-documents/secure-gateway-sgx-group-report.pdf', import.meta.url),
    ),
    true,
  );
});

test('process platform detail page exposes stacked gallery images in the aside', () => {
  const html = fs.readFileSync(new URL('../../projects/process-platform.html', import.meta.url), 'utf8');

  assert.match(html, /class="project-media-gallery"/);
  assert.match(html, /data-detail-gallery-link/);
  assert.match(html, /Computation Pane\.png/);
  assert.match(html, /MaterialEditor\.png/);
  assert.doesNotMatch(html, /TPseting\.png/);
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
  assert.match(css, /\.project-pagination\b/);
  assert.match(css, /\.project-header\b/);
  assert.match(css, /\.project-content\b/);
  assert.match(css, /\.featured-image\b/);
  assert.match(css, /\.project-aside\b/);
  assert.match(css, /\.project-longform-image\b/);
  assert.match(css, /\.project-media-gallery\b/);
  assert.match(css, /\.project-details-lead\b/);
  assert.match(css, /\.project-details-intro\b/);
  assert.match(css, /\.project-section\b/);
  assert.match(css, /\.project-section-toggle\b/);
  assert.match(css, /\.project-section-arrow\b/);
  assert.match(css, /\.project-section-body\b/);
  assert.match(css, /\.project-quote\b/);
  assert.match(css, /\.aside-project-logo-shell\b/);
  assert.match(css, /\.aside-project-logo-image\b/);
  assert.match(css, /\.detail-image-lightbox\b/);
  assert.match(css, /\.detail-image-lightbox-backdrop\b/);
  assert.match(css, /\.detail-image-lightbox-close\b/);
  assert.match(css, /\.detail-image-lightbox-caption\b/);
  assert.match(css, /\.detail-image-lightbox-pagination\b/);
  assert.match(css, /\.detail-image-lightbox-nav\b/);
  assert.match(css, /\.detail-lightbox-open\b/);
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
  assert.match(markup, /Hybrid Process Network Optimization Software/);
  assert.match(markup, /Vision-Assisted Arduino Robot Car/);
  assert.match(markup, /Safer saves, schema upgrades/i);
  assert.match(markup, /href="projects\/process-platform\.html"/);
});

test('renderProjectGroups outputs grouped project sections across the populated category taxonomy', () => {
  const markup = renderProjectGroups(
    portfolioContent.projects,
    portfolioContent.projectCategories,
  );

  assert.match(markup, /project-category-toggle/);
  assert.match(markup, /aria-expanded="true"/);
  assert.match(markup, /project-category-grid-full-stack-development/);
  assert.match(markup, /Full-Stack Development/);
  assert.match(markup, /Network &amp; Cybersecurity|Network & Cybersecurity/);
  assert.match(markup, /Hardware Development/);
  assert.match(markup, /Data Analysis/);
  assert.match(markup, /Personal Interest/);
  assert.match(markup, /Hybrid Process Network Optimization Software/);
  assert.match(markup, /Unidirectional Secure Gateway Based on SGX/);
  assert.match(markup, /Vision-Assisted Arduino Robot Car/);
  assert.match(markup, /Consumer Behaviour Analytics Dashboard/);
  assert.match(markup, /Interactive Documentary Created with HTML/);
  assert.doesNotMatch(markup, /project-empty-state/);
  assert.doesNotMatch(markup, /Projects coming soon\./);
});

test('renderProjectGroups preserves the empty-category placeholder branch', () => {
  const markup = renderProjectGroups([], [portfolioContent.projectCategories[0]]);

  assert.match(markup, /project-empty-state/);
  assert.match(markup, /Projects coming soon\./);
});

test('bindProjectCategoryToggles animates collapse and re-expands a category grid', () => {
  const button = createMockProjectCategoryToggleButton('project-category-grid-full-stack-development');
  const grid = createMockNode('project-category-grid-full-stack-development');
  const doc = {
    defaultView: {
      requestAnimationFrame(handler) {
        handler();
      },
    },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-project-category-toggle]');
      return [button];
    },
    getElementById(id) {
      assert.equal(id, 'project-category-grid-full-stack-development');
      return grid;
    },
  };

  bindProjectCategoryToggles(doc);
  assert.equal(grid.style.overflow, '');
  assert.equal(grid.style.transform, '');
  assert.equal(grid.style.opacity, '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(grid.dataset.collapsed, 'true');
  assert.equal(grid.style.maxHeight, '0px');
  assert.equal(grid.style.opacity, '0');
  assert.equal(grid.style.transform, 'translateY(-12px)');
  assert.equal(grid.style.overflow, 'hidden');
  assert.equal(grid.hasAttribute('hidden'), false);

  grid.listeners.transitionend({ target: grid });

  assert.equal(grid.getAttribute('hidden'), '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(grid.hasAttribute('hidden'), false);
  assert.equal(grid.dataset.collapsed, 'false');
  assert.equal(grid.style.maxHeight, '320px');
  assert.equal(grid.style.opacity, '1');
  assert.equal(grid.style.transform, 'translateY(0)');
  assert.equal(grid.style.overflow, 'hidden');

  grid.listeners.transitionend({ target: grid });

  assert.equal(grid.style.maxHeight, '');
  assert.equal(grid.style.opacity, '');
  assert.equal(grid.style.transform, '');
  assert.equal(grid.style.overflow, '');
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

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Hybrid Process Network Optimization Software');
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Visit Project');
  assert.match(mockDocument.getElementById('detail-visit-link').href, /process-platform/i);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /TypeScript/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Vite/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /MongoDB/);
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Docker Compose/);
  assert.match(mockDocument.getElementById('detail-featured-image').attributes.src, /ui_overview\.png/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /project-details-lead/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-section-body-lead-1/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-section-body-lead-2/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Project Description[\s\S]*This project is a web-based modeling and version management tool[\s\S]*Outcome[\s\S]*reducing save time, improving computation speed[\s\S]*Challenge/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /data-project-section-toggle/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /detail-section-body-1/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /project-inline-quote/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /project-inline-quote-emphasis/,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Outcome[\s\S]*Reduced large-network save time[\s\S]*from 40 seconds to 1\.5 seconds/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Challenge/i);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Approach/i);
  assert.doesNotMatch(mockDocument.getElementById('detail-details-body').innerHTML, /MongoDB and PostgreSQL/i);
  assert.doesNotMatch(mockDocument.getElementById('detail-details-body').innerHTML, /schema version stamping/i);
  assert.match(mockDocument.getElementById('detail-aside-logo').innerHTML, /assets\/logos\/hypronet-logo\.png/);
  assert.match(mockDocument.getElementById('detail-aside-logo').innerHTML, /<article class="project project-card aside-project-card"/);
  assert.doesNotMatch(mockDocument.getElementById('detail-aside-logo').innerHTML, /aside-project-title/);
  assert.doesNotMatch(mockDocument.getElementById('detail-aside-logo').innerHTML, /href="https:\/\/example\.com\/process-platform"/);
  assert.match(mockDocument.getElementById('detail-longform-image').attributes.src, /portfolio-placeholder\.svg|start_menu\.png|ui_overview\.png/);
  assert.equal(mockDocument.getElementById('detail-quote-body').textContent, '');
  assert.equal(mockDocument.getElementById('detail-quote-credit').textContent, '');
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('renderProjectDetail mounts the SGX report summary and PDF download card', () => {
  const mockDocument = createMockDetailDocument('secure-gateway-sgx');

  renderProjectDetail(mockDocument);

  assert.equal(
    mockDocument.getElementById('detail-title').textContent,
    'Unidirectional Secure Gateway Based on SGX',
  );
  assert.match(mockDocument.getElementById('detail-meta-stack').innerHTML, /Intel SGX/);
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Project Description/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /operational technology \(OT\) environments/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /pass-through mode/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /security-check mode/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Key Contributions/);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /Design & Implementation/i,
  );
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /fully offline authentication workflow/i,
  );
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Outcome/i);
  assert.match(
    mockDocument.getElementById('detail-details-body').innerHTML,
    /side-channel attacks/i,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /Download Project PDF/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /assets\/project-documents\/secure-gateway-sgx-group-report\.pdf/,
  );
  assert.match(
    mockDocument.getElementById('detail-aside-logo').innerHTML,
    /download="COMP4900K Group 4 Project\.pdf"/,
  );
  assert.match(
    mockDocument.getElementById('detail-featured-image').attributes.src,
    /portfolio-placeholder\.svg/,
  );
  assert.equal(mockDocument.getElementById('detail-project-quote').getAttribute('hidden'), '');
});

test('bindProjectDetailSectionToggles collapses and re-expands a detail section body', () => {
  const button = createMockProjectDetailSectionToggleButton('detail-section-body-1');
  const body = createMockNode('detail-section-body-1');
  const mockDocument = createMockDetailDocument('process-platform', {
    sectionToggleButtons: [button],
    sectionBodies: [body],
  });

  bindProjectDetailSectionToggles(mockDocument);

  assert.equal(body.style.overflow, '');
  assert.equal(body.style.transform, '');
  assert.equal(body.style.opacity, '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'false');
  assert.equal(body.dataset.collapsed, 'true');
  assert.equal(body.style.maxHeight, '0px');
  assert.equal(body.style.opacity, '0');
  assert.equal(body.style.transform, 'translateY(-8px)');
  assert.equal(body.style.overflow, 'hidden');
  assert.equal(body.hasAttribute('hidden'), false);

  body.listeners.transitionend({ target: body });

  assert.equal(body.getAttribute('hidden'), '');

  button.listeners.click();

  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.equal(body.hasAttribute('hidden'), false);
  assert.equal(body.dataset.collapsed, 'false');
  assert.equal(body.style.maxHeight, '320px');
  assert.equal(body.style.opacity, '1');
  assert.equal(body.style.transform, 'translateY(0)');
  assert.equal(body.style.overflow, 'hidden');

  body.listeners.transitionend({ target: body });

  assert.equal(body.style.maxHeight, '');
  assert.equal(body.style.opacity, '');
  assert.equal(body.style.transform, '');
  assert.equal(body.style.overflow, '');
});

test('renderProjectDetail mounts a safe fallback when the slug is unknown', () => {
  const mockDocument = createMockDetailDocument('missing-project');

  renderProjectDetail(mockDocument);

  assert.equal(mockDocument.getElementById('detail-title').textContent, 'Project not found');
  assert.match(mockDocument.getElementById('detail-details-body').innerHTML, /Return to the homepage/i);
  assert.equal(mockDocument.getElementById('detail-visit-link').textContent, 'Back to Home');
  assert.match(mockDocument.getElementById('detail-visit-link').href, /\.\.\/index\.html#projects/);
});

test('bindProjectDetailLightbox opens images in a dismissible overlay', () => {
  const mockDocument = createMockDetailDocument('process-platform');

  renderProjectDetail(mockDocument);
  bindProjectDetailLightbox(mockDocument);

  const featuredImage = mockDocument.getElementById('detail-featured-image');
  const longformLink = mockDocument.getElementById('detail-longform-link');
  const longformImage = mockDocument.getElementById('detail-longform-image');
  const lightbox = mockDocument.getElementById('detail-image-lightbox');
  const lightboxImage = mockDocument.getElementById('detail-image-lightbox-image');
  const lightboxCaption = mockDocument.getElementById('detail-image-lightbox-caption');
  const backdrop = mockDocument.getElementById('detail-image-lightbox-backdrop');
  const closeButton = mockDocument.getElementById('detail-image-lightbox-close');
  const prevButton = mockDocument.getElementById('detail-image-lightbox-prev');
  const nextButton = mockDocument.getElementById('detail-image-lightbox-next');

  featuredImage.listeners.click();

  assert.equal(lightbox.hasAttribute('hidden'), false);
  assert.equal(lightbox.getAttribute('aria-hidden'), 'false');
  assert.equal(lightboxImage.getAttribute('src'), featuredImage.getAttribute('src'));
  assert.equal(lightboxCaption.textContent, featuredImage.getAttribute('alt'));
  assert.equal(prevButton.disabled, true);
  assert.equal(nextButton.disabled, false);
  assert.equal(mockDocument.body.classList.contains('detail-lightbox-open'), true);

  backdrop.listeners.click();

  assert.equal(lightbox.getAttribute('hidden'), '');
  assert.equal(lightboxImage.getAttribute('src'), '');
  assert.equal(lightboxCaption.textContent, '');
  assert.equal(mockDocument.body.classList.contains('detail-lightbox-open'), false);

  const clickEvent = {
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
  };

  longformLink.listeners.click(clickEvent);

  assert.equal(clickEvent.prevented, true);
  assert.equal(lightbox.hasAttribute('hidden'), false);
  assert.equal(lightboxImage.getAttribute('src'), longformImage.getAttribute('src'));
  assert.equal(lightboxCaption.textContent, longformImage.getAttribute('alt'));

  closeButton.listeners.click({ stopPropagation() {} });

  assert.equal(lightbox.getAttribute('hidden'), '');
  assert.equal(lightbox.getAttribute('aria-hidden'), 'true');
});

test('bindProjectDetailLightbox opens stacked gallery images with the same overlay', () => {
  const galleryImage = createMockNode('gallery-image');
  galleryImage.setAttribute('src', '../assets/Industrial Process Modeling Platform/Computation Pane.png');
  galleryImage.setAttribute('alt', 'Hybrid Process Network Optimization Software computation pane');
  const galleryLink = createMockGalleryLink(galleryImage);
  const mockDocument = createMockDetailDocument('process-platform', { galleryLinks: [galleryLink] });

  renderProjectDetail(mockDocument);
  bindProjectDetailLightbox(mockDocument);

  const lightbox = mockDocument.getElementById('detail-image-lightbox');
  const lightboxImage = mockDocument.getElementById('detail-image-lightbox-image');
  const lightboxCaption = mockDocument.getElementById('detail-image-lightbox-caption');
  const prevButton = mockDocument.getElementById('detail-image-lightbox-prev');
  const nextButton = mockDocument.getElementById('detail-image-lightbox-next');

  const clickEvent = {
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
    currentTarget: galleryLink,
  };

  galleryLink.listeners.click(clickEvent);

  assert.equal(clickEvent.prevented, true);
  assert.equal(lightbox.hasAttribute('hidden'), false);
  assert.equal(lightboxImage.getAttribute('src'), '../assets/Industrial Process Modeling Platform/Computation Pane.png');
  assert.equal(lightboxCaption.textContent, 'Hybrid Process Network Optimization Software computation pane');

  prevButton.listeners.click({ stopPropagation() {} });
  assert.equal(lightboxImage.getAttribute('src'), mockDocument.getElementById('detail-longform-image').getAttribute('src'));

  nextButton.listeners.click({ stopPropagation() {} });
  assert.equal(lightboxImage.getAttribute('src'), '../assets/Industrial Process Modeling Platform/Computation Pane.png');
});

test('registerProjectDetailBoot mounts immediately and via DOMContentLoaded for detail pages', () => {
  const readyDoc = createMockDetailDocument('analytics-dashboard');
  readyDoc.readyState = 'interactive';
  readyDoc.addEventListener = (eventName, handler) => {
    assert.equal(eventName, 'keydown');
    readyDoc.listeners[eventName] = handler;
  };

  registerProjectDetailBoot(readyDoc);
  assert.equal(readyDoc.getElementById('detail-title').textContent, 'Consumer Behaviour Analytics Dashboard');

  const loadingDoc = createMockDetailDocument('robot-car');
  loadingDoc.readyState = 'loading';
  let loadingHandler;

  loadingDoc.addEventListener = (eventName, handler) => {
    if (eventName === 'DOMContentLoaded') {
      loadingHandler = handler;
      return;
    }

    assert.equal(eventName, 'keydown');
    loadingDoc.listeners[eventName] = handler;
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

function createMockDetailDocument(slug, options = {}) {
  const {
    galleryLinks = [],
    sectionToggleButtons = [],
    sectionBodies = [],
  } = options;
  const ids = [
    'detail-prev-link',
    'detail-next-link',
    'detail-title',
    'detail-visit-link',
    'detail-meta-stack',
    'detail-featured-image',
    'detail-details-body',
    'detail-project-quote',
    'detail-quote-body',
    'detail-quote-credit',
    'detail-aside-logo',
    'detail-longform-link',
    'detail-longform-image',
    'detail-image-lightbox',
    'detail-image-lightbox-backdrop',
    'detail-image-lightbox-dialog',
    'detail-image-lightbox-close',
    'detail-image-lightbox-image',
    'detail-image-lightbox-caption',
    'detail-image-lightbox-prev',
    'detail-image-lightbox-next',
  ];

  const doc = createMockDocument(ids);
  doc.body.dataset.projectSlug = slug;
  sectionBodies.forEach((body) => {
    doc.nodes.set(body.id, body);
  });
  doc.getElementById('detail-image-lightbox').setAttribute('hidden', '');
  doc.getElementById('detail-image-lightbox').setAttribute('aria-hidden', 'true');
  doc.querySelectorAll = (selector) => {
    if (selector === '[data-detail-gallery-link]') {
      return galleryLinks;
    }

    if (selector === '[data-project-section-toggle]') {
      return sectionToggleButtons;
    }

    assert.fail(`Unexpected selector: ${selector}`);
  };
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
  const listeners = {};

  return {
    readyState: 'interactive',
    body: {
      dataset: {},
      classList: createClassList(),
    },
    listeners,
    defaultView: {},
    nodes,
    getElementById(id) {
      return nodes.get(id) ?? null;
    },
    addEventListener(eventName, handler) {
      listeners[eventName] = handler;
    },
  };
}

function createMockProjectDetailSectionToggleButton(controlsId) {
  return {
    listeners: {},
    attributes: {
      'aria-controls': controlsId,
      'aria-expanded': 'true',
    },
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
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

function createMockProjectCategoryToggleButton(controlsId) {
  return {
    dataset: {
      projectCategoryToggle: '',
    },
    listeners: {},
    attributes: {
      'aria-controls': controlsId,
      'aria-expanded': 'true',
    },
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute(name) {
      return this.attributes[name];
    },
  };
}

function createMockGalleryLink(imageNode) {
  return {
    listeners: {},
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    querySelector(selector) {
      assert.equal(selector, 'img');
      return imageNode;
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
    dataset: {},
    style: {},
    listeners: {},
    scrollHeight: 320,
    classList: createClassList(),
    addEventListener(eventName, handler) {
      this.listeners[eventName] = handler;
    },
    removeEventListener(eventName) {
      delete this.listeners[eventName];
    },
    setAttribute(name, value) {
      this.attributes[name] = String(value);
      if (name === 'href') {
        this.href = String(value);
      }
    },
    getAttribute(name) {
      return this.attributes[name];
    },
    removeAttribute(name) {
      delete this.attributes[name];
      if (name === 'href') {
        this.href = '';
      }
    },
    hasAttribute(name) {
      return Object.hasOwn(this.attributes, name);
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
