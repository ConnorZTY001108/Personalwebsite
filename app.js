import { portfolioContent } from './content.js';

export function getResumeState(resume) {
  if (resume.available) {
    return {
      href: resume.path,
      label: resume.label,
      helperText: '',
      isDisabled: false,
    };
  }

  return {
    href: '#resume',
    label: resume.fallbackLabel,
    helperText: resume.helperText,
    isDisabled: true,
  };
}

export function renderNavigation(items) {
  return items
    .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
    .join('');
}

export function renderStatPills(stats) {
  return stats.map((item) => `<li class="stat-pill">${item}</li>`).join('');
}

export function renderHeroPanelItems(items) {
  return items
    .map(
      (item, index) => `
        <li>
          <span class="hero-panel-index">${String(index + 1).padStart(2, '0')}</span>
          <strong>${item}</strong>
        </li>
      `,
    )
    .join('');
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

export function renderProjectCards(projects) {
  const fallbackImageSrc = 'assets/placeholders/portfolio-placeholder.svg';

  return projects
    .map((project, index) => {
      const detailHref = getProjectPageHref(project);
      const projectNumber = String(index + 1).padStart(2, '0');

      return `
        <a class="project-card" href="${detailHref}">
          <div class="project-meta-row">
            <span class="project-index">project_${projectNumber}</span>
            <span class="project-command">open_case_study</span>
          </div>
          <figure class="project-media">
            <img
              src="${project.image.src || fallbackImageSrc}"
              alt="${project.image.alt}"
              onerror="this.onerror=null;this.src='${fallbackImageSrc}';"
            />
          </figure>
          <div class="project-copy">
            <p class="eyebrow">${project.kicker}</p>
            <h3>${project.title}</h3>
            <p class="project-summary">${project.summary}</p>
            <ul class="project-bullets">
              ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <ul class="tag-list">
              ${project.stack.map((tag) => `<li>${tag}</li>`).join('')}
            </ul>
          </div>
        </a>
      `;
    })
    .join('');
}

export function renderContactLinks(items) {
  return items
    .filter((item) => item.available)
    .map((item, index) => {
      const externalAttrs = item.href.startsWith('http')
        ? ' target="_blank" rel="noreferrer"'
        : '';
      const contactIndex = String(index + 1).padStart(2, '0');

      return `
        <a class="contact-card" href="${item.href}"${externalAttrs}>
          <span class="contact-label">endpoint_${contactIndex}</span>
          <span class="contact-type">${item.label}</span>
          <span class="contact-value">${item.value}</span>
        </a>
      `;
    })
    .join('');
}

function renderAboutParagraphs(paragraphs) {
  return paragraphs.map((text) => `<p>${text}</p>`).join('');
}

function applyResumeState(doc, resumeState) {
  const heroButton = doc.getElementById('resume-button');
  const cardButton = doc.getElementById('resume-card-button');
  const helper = doc.getElementById('resume-helper');

  [heroButton, cardButton].forEach((button) => {
    button.textContent = resumeState.label;

    if (resumeState.isDisabled) {
      button.classList.add('is-disabled');
      button.removeAttribute('href');
      button.setAttribute('tabindex', '-1');
      button.setAttribute('aria-disabled', 'true');
    } else {
      button.classList.remove('is-disabled');
      button.href = resumeState.href;
      button.removeAttribute('tabindex');
      button.removeAttribute('aria-disabled');
    }
  });

  helper.textContent = resumeState.helperText;
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

export function renderPortfolio(content = portfolioContent, doc = document) {
  setNodeText(doc, 'site-name', content.profile.name);
  setNodeHTML(doc, 'nav-list', renderNavigation(content.navigation));
  setNodeText(doc, 'hero-availability', content.profile.availability);
  setNodeText(doc, 'hero-name', content.profile.name);
  setNodeText(doc, 'hero-headline', content.profile.headline);
  setNodeText(doc, 'hero-intro', content.profile.intro);
  setNodeText(doc, 'hero-panel-label', content.profile.heroPanel.label);
  setNodeText(doc, 'hero-panel-title', content.profile.heroPanel.title);
  setNodeText(doc, 'hero-panel-summary', content.profile.heroPanel.summary);
  setNodeHTML(doc, 'hero-panel-list', renderHeroPanelItems(content.profile.heroPanel.items));
  setNodeHTML(doc, 'about-copy', renderAboutParagraphs(content.about.paragraphs));
  setNodeHTML(doc, 'about-stats', renderStatPills(content.about.stats));
  setNodeHTML(doc, 'project-grid', renderProjectCards(content.projects));
  setNodeHTML(doc, 'contact-list', renderContactLinks(content.contact));
  setNodeText(doc, 'footer-note', content.footer.note);

  applyResumeState(doc, getResumeState(content.resume));
}

export function bootPortfolio(doc = document) {
  renderPortfolio(portfolioContent, doc);
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
