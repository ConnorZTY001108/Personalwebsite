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

function renderTagItems(items = []) {
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

function renderGalleryItems(items = []) {
  if (items.length === 0) {
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
    gallery.innerHTML = renderGalleryItems();
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
