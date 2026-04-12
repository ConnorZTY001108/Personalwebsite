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

export function renderProjectCards(projects) {
  return projects
    .map(
      (project) => `
        <article class="project-card">
          <figure class="project-media">
            <img src="${project.image.src}" alt="${project.image.alt}" />
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
        </article>
      `,
    )
    .join('');
}

export function renderContactLinks(items) {
  return items
    .filter((item) => item.available)
    .map((item) => {
      const externalAttrs = item.href.startsWith('http')
        ? ' target="_blank" rel="noreferrer"'
        : '';

      return `
        <a class="contact-card" href="${item.href}"${externalAttrs}>
          <span class="contact-label">${item.label}</span>
          <span class="contact-value">${item.value}</span>
        </a>
      `;
    })
    .join('');
}

export { portfolioContent };
