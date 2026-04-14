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

export function renderHeroWorkIndex(projects) {
  return projects
    .map(
      (project, index) => `
        <li class="hero-work-item">
          <span class="hero-work-number">${String(index + 1).padStart(2, '0')}</span>
          <div class="hero-work-copy">
            <p class="hero-work-domain">${project.domain}</p>
            <h3>${project.title}</h3>
            <p class="hero-work-result">${project.result}</p>
          </div>
        </li>
      `,
    )
    .join('');
}

export function renderMetaStrip(items) {
  return items.map((item) => `<li class="hero-meta-item">${item}</li>`).join('');
}

export function renderPrinciples(items) {
  return items
    .map(
      (item, index) => `
        <li class="principle-item">
          <span class="principle-number">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
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
        <a class="project-feature" href="${detailHref}">
          <div class="project-feature-copy">
            <div class="project-feature-head">
              <span class="project-number">${projectNumber}</span>
              <p class="project-domain">${project.domain}</p>
            </div>
            <h3>${project.title}</h3>
            <p class="project-result">${project.result}</p>
            <p class="project-summary">${project.summary}</p>
            <ul class="project-bullets">
              ${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
            </ul>
            <ul class="tag-list">
              ${project.stack.map((tag) => `<li>${tag}</li>`).join('')}
            </ul>
            <span class="project-link-label">Open project</span>
          </div>
          <figure class="project-feature-media">
            <img
              src="${project.image.src || fallbackImageSrc}"
              alt="${project.image.alt}"
              onerror="this.onerror=null;this.src='${fallbackImageSrc}';"
            />
          </figure>
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
  setNodeText(doc, 'hero-summary', content.profile.summary);
  setNodeHTML(doc, 'hero-work-list', renderHeroWorkIndex(content.projects));
  setNodeHTML(doc, 'hero-meta-strip', renderMetaStrip(content.profile.metaStrip));
  setNodeHTML(doc, 'about-copy', renderAboutParagraphs(content.about.paragraphs));
  setNodeHTML(doc, 'about-principles', renderPrinciples(content.about.principles));
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
