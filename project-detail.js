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

function renderProjectWordmark(lines = []) {
  return lines.map((line) => `<span>${line}</span>`).join('');
}

function renderDisciplineItems(items = []) {
  return items.map((item) => `<li>${item}</li>`).join('');
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

function renderAsideLogo(project) {
  return `
    <a class="project project-card aside-project-card" href="${project.visit.href}" target="_blank" rel="noreferrer" aria-label="${project.title}">
      <div class="project-card-inner">
        <div class="project-logo project-card-wordmark">
          ${renderProjectWordmark(project.wordmarkLines)}
        </div>
        <div class="aside-project-copy">
          <span class="aside-project-title">${project.title}</span>
          <p class="aside-project-domain">${project.domain}</p>
        </div>
      </div>
    </a>
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
    setNodeText(doc, 'detail-meta-site-type', '');
    setNodeText(doc, 'detail-meta-platform', '');
    setNodeHTML(doc, 'detail-meta-disciplines', '');
    setNodeHTML(doc, 'detail-details-body', state.detailsHtml);
    setNodeText(doc, 'detail-quote-body', '');
    setNodeText(doc, 'detail-quote-credit', '');
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

  setNodeText(doc, 'detail-meta-site-type', project.detailMeta.siteType);
  setNodeText(doc, 'detail-meta-platform', project.detailMeta.platform);
  setNodeHTML(doc, 'detail-meta-disciplines', renderDisciplineItems(project.detailMeta.disciplines));
  setImageNode(doc, 'detail-featured-image', `../${project.media.featuredImage}`, project.media.featuredAlt);
  setNodeHTML(doc, 'detail-details-body', project.detailsHtml);
  setNodeText(doc, 'detail-quote-body', quote.body);
  setNodeText(doc, 'detail-quote-credit', quote.credit);
  setNodeHTML(doc, 'detail-aside-logo', renderAsideLogo(project));
  setImageNode(doc, 'detail-longform-image', `../${project.media.longformImage}`, project.media.longformAlt);

  const longformLink = doc.getElementById('detail-longform-link');
  if (longformLink) {
    longformLink.href = `../${project.media.longformImage}`;
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
