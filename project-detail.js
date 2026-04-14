import { portfolioContent } from './content.js';

const DETAIL_BACK_HREF = '../index.html#projects';

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

function renderTagItems(items = []) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function mountDetailBody(node, text) {
  const value = (text || '').trim();
  node.innerHTML = value;

  if (value) {
    node.removeAttribute('data-empty');
    return;
  }

  node.setAttribute('data-empty', 'true');
}

export function renderProjectDetail(doc = document, content = portfolioContent) {
  const slug = doc.body?.dataset?.projectSlug ?? '';
  const state = getProjectDetailState(slug, content);
  const backLink = doc.getElementById('back-home-link');
  const title = doc.getElementById('detail-title');
  const subtitle = doc.getElementById('detail-subtitle');
  const projectDetail = doc.getElementById('detail-project-body');
  const challenge = doc.getElementById('detail-challenge-body');
  const approach = doc.getElementById('detail-approach-body');
  const stack = doc.getElementById('detail-stack');
  const outcome = doc.getElementById('detail-outcome-body');

  backLink.href = state.backHref;

  if (state.isMissing) {
    title.textContent = state.title;
    subtitle.textContent = state.subtitle;
    stack.innerHTML = '';
    mountDetailBody(projectDetail, '');
    mountDetailBody(challenge, '');
    mountDetailBody(approach, '');
    mountDetailBody(outcome, '');
    return;
  }

  title.textContent = state.title;
  subtitle.textContent = state.subtitle;
  stack.innerHTML = renderTagItems(state.project.stack);
  mountDetailBody(projectDetail, state.project.detailSections.projectDetail);
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
