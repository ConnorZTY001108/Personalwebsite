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
