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

test('portfolio project images resolve to existing files', () => {
  for (const project of portfolioContent.projects) {
    assert.equal(
      fs.existsSync(new URL(`../../${project.image.src}`, import.meta.url)),
      true,
      project.slug,
    );
  }
});

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
  assert.match(projectMarkup, /40 seconds to 3 seconds/);
  assert.match(projectMarkup, /assets\/placeholders\/portfolio-placeholder\.svg/);
  assert.equal((projectMarkup.match(/class="project-card"/g) ?? []).length, 3);
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

test('contact rendering hides unavailable links', () => {
  const contactMarkup = renderContactLinks(portfolioContent.contact);

  assert.equal((contactMarkup.match(/class="contact-card"/g) ?? []).length, 2);
  assert.match(contactMarkup, /mailto:zhant173@mcmaster.ca/);
  assert.match(
    contactMarkup,
    /<a class="contact-card" href="https:\/\/github\.com\/ConnorZTY001108" target="_blank" rel="noreferrer">/,
  );
  assert.match(contactMarkup, /github\.com\/ConnorZTY001108/);
  assert.doesNotMatch(contactMarkup, /LinkedIn will be added soon/);
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
