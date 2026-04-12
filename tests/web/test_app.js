import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { portfolioContent } from '../../content.js';
import { getResumeState } from '../../app.js';

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
});

test('resume state returns a disabled CTA when no PDF is available', () => {
  const state = getResumeState(portfolioContent.resume);

  assert.equal(state.isDisabled, true);
  assert.equal(state.href, '#resume');
  assert.equal(state.label, 'Resume PDF coming soon');
  assert.match(state.helperText, /PDF version will be added/i);
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
