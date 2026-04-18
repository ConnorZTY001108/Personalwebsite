import { portfolioContent, renderPortfolio } from './app.js';

const DETAIL_HOME_HREF = '../index.html#projects';

export function getProjectBySlug(slug, content = portfolioContent) {
  return content.projects.find((project) => project.slug === slug) ?? null;
}

function getProjectIndex(slug, content = portfolioContent) {
  return content.projects.findIndex((project) => project.slug === slug);
}

function getDetailPageHref(project) {
  return `${project.slug}.html`;
}

function getLightboxItem(source, fallbackCaption = '') {
  if (!source?.getAttribute) {
    return null;
  }

  const src = source.getAttribute('src');

  if (!src) {
    return null;
  }

  return {
    src,
    alt: source.getAttribute('alt') || 'Project preview',
    caption: source.getAttribute('data-detail-caption') || fallbackCaption || source.getAttribute('alt') || '',
  };
}

function setProjectDetailLightboxContent(lightboxImage, lightboxCaption, item) {
  if (!item) {
    return;
  }

  lightboxImage.setAttribute('src', item.src);
  lightboxImage.setAttribute('alt', item.alt || 'Project preview');
  lightboxCaption.textContent = item.caption || item.alt || '';
}

function setProjectDetailLightboxPagination(prevButton, nextButton, currentIndex, totalItems) {
  const isAtStart = currentIndex <= 0;
  const isAtEnd = currentIndex >= totalItems - 1;

  prevButton.disabled = isAtStart;
  nextButton.disabled = isAtEnd;
  prevButton.setAttribute('aria-disabled', isAtStart ? 'true' : 'false');
  nextButton.setAttribute('aria-disabled', isAtEnd ? 'true' : 'false');
}

export function getProjectDetailState(slug, content = portfolioContent) {
  const projectIndex = getProjectIndex(slug, content);
  const project = projectIndex >= 0 ? content.projects[projectIndex] : null;

  if (!project) {
    return {
      isMissing: true,
      title: 'Project not found',
      detailsHtml: '<p>Return to the homepage to choose an available project.</p>',
      visit: {
        href: DETAIL_HOME_HREF,
        label: 'Back to Home',
      },
      prevProject: null,
      nextProject: null,
    };
  }

  return {
    isMissing: false,
    project,
    title: project.title,
    visit: project.visit,
    prevProject: content.projects[projectIndex - 1] ?? null,
    nextProject: content.projects[projectIndex + 1] ?? null,
  };
}

function openProjectDetailLightbox(doc, lightbox, lightboxImage, lightboxCaption, item) {
  if (!item?.src || !lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  setProjectDetailLightboxContent(lightboxImage, lightboxCaption, item);
  lightbox.removeAttribute('hidden');
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  doc.body?.classList?.add('detail-lightbox-open');
}

function closeProjectDetailLightbox(doc, lightbox, lightboxImage, lightboxCaption) {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('hidden', '');
  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');
  lightboxCaption.textContent = '';
  doc.body?.classList?.remove('detail-lightbox-open');
}

function renderProjectWordmark(lines = []) {
  return lines.map((line) => `<span>${line}</span>`).join('');
}

function renderDisciplineItems(items = []) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function renderProjectSectionMarkup(sectionTitle, sectionBodyHtml, bodyId) {
  return `
    <section class="project-section">
      <button
        class="project-section-toggle"
        type="button"
        data-project-section-toggle
        aria-expanded="true"
        aria-controls="${bodyId}"
      >
        <span class="project-section-arrow" aria-hidden="true">&gt;</span>
        <span class="project-section-label">${sectionTitle}</span>
      </button>
      <div
        class="project-section-body"
        id="${bodyId}"
        data-project-section-body
        data-collapsed="false"
      >
        ${sectionBodyHtml}
      </div>
    </section>
  `;
}

function renderLeadSectionMarkup(leadSections = []) {
  if (!leadSections.length) {
    return '';
  }

  return `
    <div class="project-details-lead">
      ${leadSections
        .map((section, index) =>
          renderProjectSectionMarkup(
            section.title,
            section.bodyHtml.trim(),
            `detail-section-body-lead-${index + 1}`,
          ))
        .join('')}
    </div>
  `;
}

function renderCollapsibleProjectDetails(detailsHtml = '', detailLeadSections = []) {
  const trimmedHtml = detailsHtml.trim();
  const headingPattern = /<h4>([\s\S]*?)<\/h4>/gi;
  const headingMatches = Array.from(trimmedHtml.matchAll(headingPattern));
  const leadMarkup = renderLeadSectionMarkup(detailLeadSections);

  if (!headingMatches.length) {
    return `${leadMarkup}${trimmedHtml}`;
  }

  const introHtml = trimmedHtml.slice(0, headingMatches[0].index).trim();
  const introMarkup = introHtml
    ? `<div class="project-details-intro">${introHtml}</div>`
    : '';

  const sectionMarkup = headingMatches
    .map((match, index) => {
      const nextMatch = headingMatches[index + 1];
      const bodyId = `detail-section-body-${index + 1}`;
      const sectionTitle = match[1].replace(/<[^>]+>/g, '').trim();
      const sectionBodyHtml = trimmedHtml
        .slice(
          (match.index ?? 0) + match[0].length,
          nextMatch ? nextMatch.index : trimmedHtml.length,
        )
        .trim();

      return renderProjectSectionMarkup(sectionTitle, sectionBodyHtml, bodyId);
    })
    .join('');

  return `${leadMarkup}${introMarkup}${sectionMarkup}`;
}

function setNodeText(doc, id, value) {
  const node = doc.getElementById(id);

  if (node) {
    node.textContent = value;
  }
}

function setNodeHTML(doc, id, value) {
  const node = doc.getElementById(id);

  if (node) {
    node.innerHTML = value;
  }
}

function setNodeHidden(doc, id, hidden) {
  const node = doc.getElementById(id);

  if (!node) {
    return;
  }

  if (hidden) {
    node.setAttribute('hidden', '');
    return;
  }

  node.removeAttribute('hidden');
}

function setNodeLink(doc, id, href, label) {
  const node = doc.getElementById(id);

  if (!node) {
    return;
  }

  node.href = href;
  node.textContent = label;
}

function setImageNode(doc, id, src, alt) {
  const node = doc.getElementById(id);

  if (!node) {
    return;
  }

  node.setAttribute('src', src);
  node.setAttribute('alt', alt);
}

function getProjectSectionAnimationFrame(doc) {
  return doc?.defaultView?.requestAnimationFrame?.bind(doc.defaultView) ?? ((handler) => handler());
}

function removeProjectSectionTransitionHandler(body) {
  const existingHandler = body._projectSectionTransitionHandler;

  if (!existingHandler) {
    return;
  }

  body.removeEventListener?.('transitionend', existingHandler);
  delete body._projectSectionTransitionHandler;
}

function resetProjectSectionAnimationStyles(body) {
  body.style.maxHeight = '';
  body.style.opacity = '';
  body.style.transform = '';
  body.style.overflow = '';
}

function initializeProjectSectionBody(body) {
  body.dataset.collapsed = body.dataset.collapsed ?? 'false';
  resetProjectSectionAnimationStyles(body);
}

function setProjectSectionCollapsedState(button, body, collapsed, doc = document) {
  const requestAnimationFrame = getProjectSectionAnimationFrame(doc);

  removeProjectSectionTransitionHandler(body);
  button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  body.dataset.collapsed = collapsed ? 'true' : 'false';
  body.removeAttribute('hidden');

  const fullHeight = `${body.scrollHeight}px`;
  body.style.overflow = 'hidden';

  if (collapsed) {
    body.style.maxHeight = fullHeight;
    body.style.opacity = '1';
    body.style.transform = 'translateY(0)';

    requestAnimationFrame(() => {
      body.style.maxHeight = '0px';
      body.style.opacity = '0';
      body.style.transform = 'translateY(-8px)';
    });
  } else {
    body.style.maxHeight = '0px';
    body.style.opacity = '0';
    body.style.transform = 'translateY(-8px)';

    requestAnimationFrame(() => {
      body.style.maxHeight = fullHeight;
      body.style.opacity = '1';
      body.style.transform = 'translateY(0)';
    });
  }

  const transitionHandler = (event) => {
    if (event?.target && event.target !== body) {
      return;
    }

    removeProjectSectionTransitionHandler(body);

    if (body.dataset.collapsed === 'true') {
      resetProjectSectionAnimationStyles(body);
      body.setAttribute('hidden', '');
      return;
    }

    resetProjectSectionAnimationStyles(body);
  };

  body._projectSectionTransitionHandler = transitionHandler;
  body.addEventListener?.('transitionend', transitionHandler);
}

export function bindProjectDetailSectionToggles(doc = document) {
  if (!doc?.querySelectorAll) {
    return;
  }

  const toggleButtons = doc.querySelectorAll('[data-project-section-toggle]');

  toggleButtons.forEach((button) => {
    const controlledId = button.getAttribute('aria-controls');
    const body = controlledId ? doc.getElementById(controlledId) : null;

    if (!body) {
      return;
    }

    initializeProjectSectionBody(body);

    button.addEventListener('click', () => {
      const collapsed = button.getAttribute('aria-expanded') === 'true';
      setProjectSectionCollapsedState(button, body, collapsed, doc);
    });
  });
}

export function bindProjectDetailLightbox(doc = document) {
  if (!doc?.getElementById) {
    return;
  }

  const featuredImage = doc.getElementById('detail-featured-image');
  const longformLink = doc.getElementById('detail-longform-link');
  const longformImage = doc.getElementById('detail-longform-image');
  const lightbox = doc.getElementById('detail-image-lightbox');
  const dialog = doc.getElementById('detail-image-lightbox-dialog');
  const closeButton = doc.getElementById('detail-image-lightbox-close');
  const lightboxImage = doc.getElementById('detail-image-lightbox-image');
  const lightboxCaption = doc.getElementById('detail-image-lightbox-caption');
  const prevButton = doc.getElementById('detail-image-lightbox-prev');
  const nextButton = doc.getElementById('detail-image-lightbox-next');
  const backdrop = doc.getElementById('detail-image-lightbox-backdrop');
  const galleryLinks = doc.querySelectorAll?.('[data-detail-gallery-link]') ?? [];

  if (!featuredImage || !longformLink || !longformImage || !lightbox || !dialog || !closeButton || !lightboxImage || !lightboxCaption || !prevButton || !nextButton || !backdrop) {
    return;
  }

  if (lightbox.dataset.bound === 'true') {
    return;
  }

  const lightboxItems = [
    getLightboxItem(featuredImage),
    getLightboxItem(longformImage, longformLink.getAttribute('data-detail-caption') || ''),
    ...Array.from(galleryLinks)
      .map((link) => getLightboxItem(link.querySelector?.('img'), link.getAttribute?.('data-detail-caption') || '')),
  ].filter(Boolean);

  let currentLightboxIndex = -1;

  const openLightboxAtIndex = (index) => {
    const item = lightboxItems[index];

    if (!item) {
      return;
    }

    currentLightboxIndex = index;
    openProjectDetailLightbox(doc, lightbox, lightboxImage, lightboxCaption, item);
    setProjectDetailLightboxPagination(prevButton, nextButton, currentLightboxIndex, lightboxItems.length);
  };

  const openFeaturedImage = () => {
    openLightboxAtIndex(0);
  };

  const openLongformImage = (event) => {
    event?.preventDefault?.();
    openLightboxAtIndex(1);
  };

  const openGalleryImage = (event) => {
    event?.preventDefault?.();
    const clickedIndex = Array.from(galleryLinks).indexOf(event?.currentTarget);

    if (clickedIndex < 0) {
      return;
    }

    openLightboxAtIndex(clickedIndex + 2);
  };

  const closeLightbox = () => {
    closeProjectDetailLightbox(doc, lightbox, lightboxImage, lightboxCaption);
    currentLightboxIndex = -1;
  };

  const goToPreviousImage = (event) => {
    event?.stopPropagation?.();

    if (currentLightboxIndex <= 0) {
      return;
    }

    openLightboxAtIndex(currentLightboxIndex - 1);
  };

  const goToNextImage = (event) => {
    event?.stopPropagation?.();

    if (currentLightboxIndex < 0 || currentLightboxIndex >= lightboxItems.length - 1) {
      return;
    }

    openLightboxAtIndex(currentLightboxIndex + 1);
  };

  featuredImage.addEventListener('click', openFeaturedImage);
  longformLink.addEventListener('click', openLongformImage);
  galleryLinks.forEach((link) => link.addEventListener('click', openGalleryImage));
  backdrop.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', goToPreviousImage);
  nextButton.addEventListener('click', goToNextImage);
  closeButton.addEventListener('click', (event) => {
    event?.stopPropagation?.();
    closeLightbox();
  });
  dialog.addEventListener('click', (event) => event?.stopPropagation?.());
  lightbox.addEventListener('click', closeLightbox);
  doc.addEventListener?.('keydown', (event) => {
    if (event?.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });

  lightbox.dataset.bound = 'true';
}

function setPaginationLink(doc, id, project, fallbackLabel) {
  const node = doc.getElementById(id);

  if (!node) {
    return;
  }

  if (!project) {
    node.href = '#';
    node.textContent = fallbackLabel;
    node.classList.add('disabled');
    node.setAttribute('aria-disabled', 'true');
    return;
  }

  node.href = getDetailPageHref(project);
  node.textContent = fallbackLabel;
  node.classList.remove('disabled');
  node.removeAttribute('aria-disabled');
}

function renderQuote(project) {
  if (!project?.quote?.body) {
    return {
      body: '',
      credit: '',
    };
  }

  return project.quote;
}

function normalizeAsideActionHref(href) {
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('/') ||
    href.startsWith('./') ||
    href.startsWith('../') ||
    href.startsWith('#')
  ) {
    return href;
  }

  return `../${href}`;
}

function renderAsideActionCard(action) {
  if (!action?.href || !action?.label) {
    return '';
  }

  const wordmarkLines = action.wordmarkLines?.length ? action.wordmarkLines : [action.label];
  const downloadAttribute = action.download ? ` download="${action.download}"` : '';

  return `
    <a
      class="project project-card aside-project-card aside-action-card"
      href="${normalizeAsideActionHref(action.href)}"
      aria-label="${action.ariaLabel || action.label}"
     ${downloadAttribute}
    >
      <div class="project-card-inner">
        <div class="project-logo project-card-wordmark">
          ${renderProjectWordmark(wordmarkLines)}
        </div>
      </div>
    </a>
  `;
}

function renderAsideLogo(project) {
  if (project.detailAsideAction) {
    return renderAsideActionCard(project.detailAsideAction);
  }

  const logoMarkup = project.logoImage
    ? `
        <div class="aside-project-logo-shell has-image">
          <img
            class="aside-project-logo-image"
            src="../${project.logoImage}"
            alt="${project.title} logo"
          />
        </div>
      `
    : `
        <div class="project-logo project-card-wordmark">
          ${renderProjectWordmark(project.wordmarkLines)}
        </div>
      `;

  return `
    <article class="project project-card aside-project-card" aria-label="${project.title}">
      <div class="project-card-inner">
        ${logoMarkup}
      </div>
    </article>
  `;
}

export function renderProjectDetail(doc = document, content = portfolioContent) {
  renderPortfolio(content, doc);

  const slug = doc.body?.dataset?.projectSlug ?? '';
  const state = getProjectDetailState(slug, content);

  setPaginationLink(doc, 'detail-prev-link', state.prevProject, '< Prev');
  setPaginationLink(doc, 'detail-next-link', state.nextProject, 'Next >');
  setNodeText(doc, 'detail-title', state.title);
  setNodeLink(doc, 'detail-visit-link', state.visit.href, state.visit.label);

  if (state.isMissing) {
    setNodeHTML(doc, 'detail-meta-stack', '');
    setNodeHTML(doc, 'detail-details-body', state.detailsHtml);
    setNodeText(doc, 'detail-quote-body', '');
    setNodeText(doc, 'detail-quote-credit', '');
    setNodeHidden(doc, 'detail-project-quote', true);
    setNodeHTML(doc, 'detail-aside-logo', '');
    setImageNode(doc, 'detail-featured-image', '../assets/placeholders/portfolio-placeholder.svg', 'Missing project');
    setImageNode(doc, 'detail-longform-image', '../assets/placeholders/portfolio-placeholder.svg', 'Missing project');

    const longformLink = doc.getElementById('detail-longform-link');
    if (longformLink) {
      longformLink.href = DETAIL_HOME_HREF;
    }
    return;
  }

  const { project } = state;
  const quote = renderQuote(project);

  setNodeHTML(doc, 'detail-meta-stack', renderDisciplineItems(project.stack));
  setImageNode(doc, 'detail-featured-image', `../${project.media.featuredImage}`, project.media.featuredAlt);
  setNodeHTML(
    doc,
    'detail-details-body',
    renderCollapsibleProjectDetails(
      project.detailsHtml,
      project.detailLeadSections ?? (project.detailLeadSection ? [project.detailLeadSection] : []),
    ),
  );
  setNodeText(doc, 'detail-quote-body', quote.body);
  setNodeText(doc, 'detail-quote-credit', quote.credit);
  setNodeHidden(doc, 'detail-project-quote', !quote.body && !quote.credit);
  setNodeHTML(doc, 'detail-aside-logo', renderAsideLogo(project));

  const longformLink = doc.getElementById('detail-longform-link');
  const longformImage = doc.getElementById('detail-longform-image');
  const hideLongformMedia = project.hideLongformMedia === true;

  setNodeHidden(doc, 'detail-longform-link', hideLongformMedia);

  if (hideLongformMedia) {
    if (longformLink) {
      longformLink.removeAttribute('href');
      longformLink.style.display = 'none';
    }
    if (longformImage) {
      longformImage.removeAttribute('src');
      longformImage.removeAttribute('alt');
    }
  } else {
    setImageNode(doc, 'detail-longform-image', `../${project.media.longformImage}`, project.media.longformAlt);
    if (longformLink) {
      longformLink.href = `../${project.media.longformImage}`;
      longformLink.style.display = '';
    }
  }

  bindProjectDetailSectionToggles(doc);
  bindProjectDetailLightbox(doc);
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
