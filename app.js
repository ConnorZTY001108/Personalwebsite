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

      return `
        <section class="project-category" data-category="${category.slug}">
          <div class="project-category-header">
            <h3 class="project-category-title">${category.title}</h3>
          </div>
          <div class="project-grid project-category-grid">
            ${projectMarkup}
          </div>
        </section>
      `;
    })
    .join('');
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
