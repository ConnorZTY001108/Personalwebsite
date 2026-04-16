import { portfolioContent } from './content.js';
import { mountInteractiveBackground } from './background.js';

export function renderNavigation(items, options = {}) {
  const { basePath = '' } = options;

  return items
    .map(
      (item) => `
        <li class="menu-item">
          <a href="${basePath}${item.href}">${item.label}</a>
        </li>
      `,
    )
    .join('');
}

export function renderHeroStatement(lines = []) {
  return lines.map((line) => `<span class="tagline-line">${line}</span>`).join('<br />');
}

export function getProjectPageHref(project) {
  if (project.href) {
    return project.href;
  }

  if (project.slug) {
    return `projects/${project.slug}.html`;
  }

  return '#projects';
}

function renderProjectWordmark(lines = []) {
  return lines.map((line) => `<span>${line}</span>`).join('');
}

export function renderProjectCards(projects = []) {
  return projects
    .map(
      (project) => `
        <a class="project project-card" href="${getProjectPageHref(project)}" aria-label="${project.title}">
          <div class="project-card-inner">
            <div class="project-logo project-card-wordmark">
              ${renderProjectWordmark(project.wordmarkLines)}
            </div>
            <div class="project-hover-copy">
              <p class="project-card-result">${project.result}</p>
            </div>
          </div>
        </a>
      `,
    )
    .join('');
}

function renderProjectEmptyState(category) {
  return `
    <article class="project project-card project-empty-state" aria-label="${category.title}">
      <div class="project-card-inner">
        <div class="project-empty-copy">
          <p class="project-empty-text">Projects coming soon.</p>
        </div>
      </div>
    </article>
  `;
}

export function renderProjectGroups(projects = [], categories = []) {
  return categories
    .map((category) => {
      const groupedProjects = projects.filter((project) => project.category === category.slug);
      const projectMarkup = groupedProjects.length
        ? renderProjectCards(groupedProjects)
        : renderProjectEmptyState(category);
      const gridId = `project-category-grid-${category.slug}`;

      return `
        <section class="project-category" data-category="${category.slug}">
          <div class="project-category-header">
            <button
              class="project-category-toggle project-category-title"
              type="button"
              data-project-category-toggle
              aria-expanded="true"
              aria-controls="${gridId}"
            >
              <span class="project-category-arrow" aria-hidden="true">></span>
              <span class="project-category-label">${category.title}</span>
            </button>
          </div>
          <div class="project-grid project-category-grid" id="${gridId}" data-collapsed="false">
            ${projectMarkup}
          </div>
        </section>
      `;
    })
    .join('');
}

function getProjectCategoryAnimationFrame(doc) {
  return doc?.defaultView?.requestAnimationFrame?.bind(doc.defaultView) ?? ((handler) => handler());
}

function removeProjectCategoryTransitionHandler(grid) {
  const existingHandler = grid._projectCategoryTransitionHandler;

  if (!existingHandler) {
    return;
  }

  grid.removeEventListener?.('transitionend', existingHandler);
  delete grid._projectCategoryTransitionHandler;
}

function resetProjectCategoryGridAnimationStyles(grid) {
  grid.style.maxHeight = '';
  grid.style.opacity = '';
  grid.style.transform = '';
  grid.style.overflow = '';
}

function setProjectCategoryCollapsedState(button, grid, collapsed, doc = document) {
  const requestAnimationFrame = getProjectCategoryAnimationFrame(doc);

  removeProjectCategoryTransitionHandler(grid);
  button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  grid.dataset.collapsed = collapsed ? 'true' : 'false';

  grid.removeAttribute('hidden');
  const fullHeight = `${grid.scrollHeight}px`;
  grid.style.overflow = 'hidden';

  if (collapsed) {
    grid.style.maxHeight = fullHeight;
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';

    requestAnimationFrame(() => {
      grid.style.maxHeight = '0px';
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(-12px)';
    });
  } else {
    grid.style.maxHeight = '0px';
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(-12px)';

    requestAnimationFrame(() => {
      grid.style.maxHeight = fullHeight;
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    });
  }

  const transitionHandler = (event) => {
    if (event?.target && event.target !== grid) {
      return;
    }

    removeProjectCategoryTransitionHandler(grid);

    if (grid.dataset.collapsed === 'true') {
      resetProjectCategoryGridAnimationStyles(grid);
      grid.setAttribute('hidden', '');
      return;
    }

    resetProjectCategoryGridAnimationStyles(grid);
  };

  grid._projectCategoryTransitionHandler = transitionHandler;
  grid.addEventListener?.('transitionend', transitionHandler);
}

function initializeProjectCategoryGrid(grid) {
  grid.dataset.collapsed = grid.dataset.collapsed ?? 'false';
  resetProjectCategoryGridAnimationStyles(grid);
}

export function bindProjectCategoryToggles(doc = document) {
  if (!doc?.querySelectorAll) {
    return;
  }

  const toggleButtons = doc.querySelectorAll('[data-project-category-toggle]');

  toggleButtons.forEach((button) => {
    const controlledId = button.getAttribute('aria-controls');
    const grid = controlledId ? doc.getElementById(controlledId) : null;

    if (!grid) {
      return;
    }

    initializeProjectCategoryGrid(grid);

    button.addEventListener('click', () => {
      const collapsed = button.getAttribute('aria-expanded') === 'true';
      setProjectCategoryCollapsedState(button, grid, collapsed, doc);
    });
  });
}

export function renderContactLinks(items = []) {
  return items
    .filter((item) => item.available)
    .map(
      (item) => `
        <a class="footer-link" href="${item.href}"${item.href.startsWith('http') ? ' target="_blank" rel="noreferrer"' : ''}>
          <span class="footer-link-label">${item.label}</span>
          <span class="footer-link-value">${item.value}</span>
        </a>
      `,
    )
    .join('');
}

function renderAboutParagraphs(paragraphs = []) {
  return paragraphs.map((text) => `<p>${text}</p>`).join('');
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

function getNavBasePath(doc) {
  return doc.body?.dataset?.navBasePath ?? '';
}

export function renderPortfolio(content = portfolioContent, doc = document) {
  setNodeText(doc, 'wordmark-primary', content.profile.wordmark.primary);
  setNodeText(doc, 'wordmark-secondary', content.profile.wordmark.secondary);
  setNodeHTML(doc, 'nav-list', renderNavigation(content.navigation, { basePath: getNavBasePath(doc) }));
  setNodeHTML(doc, 'hero-statement', renderHeroStatement(content.profile.heroStatementLines));
  setNodeHTML(doc, 'project-grid', renderProjectGroups(content.projects, content.projectCategories));
  setNodeHTML(doc, 'about-copy', renderAboutParagraphs(content.about.paragraphs));
  setNodeHTML(doc, 'contact-list', renderContactLinks(content.contact));
  setNodeText(doc, 'footer-note', content.footer.note);
}

export function bootPortfolio(doc = document) {
  renderPortfolio(portfolioContent, doc);
  bindProjectCategoryToggles(doc);
  mountInteractiveBackground(doc);
}

export function registerPortfolioBoot(doc) {
  if (typeof doc === 'undefined') {
    return;
  }

  if (doc.readyState !== 'loading') {
    bootPortfolio(doc);
    return;
  }

  doc.addEventListener('DOMContentLoaded', () => {
    bootPortfolio(doc);
  });
}

if (typeof document !== 'undefined') {
  registerPortfolioBoot(document);
}

export { portfolioContent };
