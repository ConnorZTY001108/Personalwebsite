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

function setupProcessPlatformGallery(doc, projectDetail) {
  if (typeof projectDetail.querySelector !== 'function') {
    return;
  }

  const root = projectDetail.querySelector('[data-gallery-root]');
  const track = root?.querySelector('[data-gallery-track]');
  const items = Array.from(
    track?.querySelectorAll?.('[data-gallery-item]') ?? root?.querySelectorAll?.('[data-gallery-item]') ?? [],
  );
  const preview = root?.querySelector('[data-gallery-preview]');
  const previewPanel = root?.querySelector('.gallery-preview-panel');
  const previewImage = root?.querySelector('[data-gallery-preview-image]');
  const previewTitle = root?.querySelector('[data-gallery-preview-title]');
  const previewClose = root?.querySelector('.gallery-preview-close');
  const win = doc.defaultView;

  if (!root || !track || items.length === 0 || !preview || !previewPanel || !previewImage || !previewTitle || !previewClose) {
    return;
  }

  const state = {
    activePreview: null,
    dragPointerId: null,
    dragStartX: 0,
    dragStartScrollLeft: 0,
    didDrag: false,
    suppressClick: false,
    restoreFocusTo: null,
  };

  const closePreview = () => {
    if (state.activePreview === null) {
      return;
    }

    preview.classList.remove('is-open');
    preview.setAttribute('aria-hidden', 'true');
    doc.body?.classList?.remove('gallery-modal-open');
    state.activePreview = null;
    previewImage.removeAttribute('src');
    previewImage.removeAttribute('alt');
    previewTitle.textContent = '';
    state.restoreFocusTo?.focus?.();
    state.restoreFocusTo = null;
  };

  const openPreview = (item) => {
    const title = item.dataset.galleryTitle || item.querySelector('img')?.alt || 'Screenshot';
    const src = item.dataset.gallerySrc || item.querySelector('img')?.getAttribute('src');

    if (!src) {
      return;
    }

    state.restoreFocusTo = typeof doc.activeElement?.focus === 'function' ? doc.activeElement : null;
    state.activePreview = item;
    previewImage.src = src;
    previewImage.alt = title;
    previewTitle.textContent = title;
    preview.classList.add('is-open');
    preview.setAttribute('aria-hidden', 'false');
    doc.body?.classList?.add('gallery-modal-open');
    previewClose.focus?.();
  };

  const resetDragState = () => {
    if (state.dragPointerId !== null) {
      track.classList.remove('is-dragging');
    }

    state.dragPointerId = null;
    state.didDrag = false;
    if (state.suppressClick) {
      setTimeout(() => {
        state.suppressClick = false;
      }, 0);
    }
  };

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }

    state.dragPointerId = event.pointerId;
    state.dragStartX = event.clientX;
    state.dragStartScrollLeft = track.scrollLeft;
    state.didDrag = false;
    state.suppressClick = false;
    track.classList.add('is-dragging');
    track.setPointerCapture?.(event.pointerId);
  });

  track.addEventListener('pointermove', (event) => {
    if (state.dragPointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - state.dragStartX;

    if (Math.abs(deltaX) > 6) {
      state.didDrag = true;
    }

    if (state.didDrag) {
      track.scrollLeft = state.dragStartScrollLeft - deltaX;
    }
  });

  track.addEventListener('pointerup', (event) => {
    if (state.dragPointerId !== event.pointerId) {
      return;
    }

    if (state.didDrag) {
      state.suppressClick = true;
    }

    track.releasePointerCapture?.(event.pointerId);
    resetDragState();
  });

  track.addEventListener('pointercancel', (event) => {
    if (state.dragPointerId !== event.pointerId) {
      return;
    }

    track.releasePointerCapture?.(event.pointerId);
    resetDragState();
  });

  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      if (state.suppressClick) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      openPreview(event.currentTarget ?? item);
    });
  });

  preview.addEventListener('click', (event) => {
    if (event.target.closest?.('[data-gallery-close]')) {
      closePreview();
    }
  });

  win?.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && state.activePreview !== null) {
      event.preventDefault();
      previewClose.focus?.();
      return;
    }

    if (event.key === 'Escape') {
      closePreview();
    }
  });
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

  if (state.project.slug === 'process-platform') {
    setupProcessPlatformGallery(doc, projectDetail);
  }
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
