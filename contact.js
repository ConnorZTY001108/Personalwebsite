import { portfolioContent, renderPortfolio } from './app.js';
import { mountInteractiveBackground } from './background.js';

const CONTACT_CARD_META = {
  Email: {
    icon: `
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="10" y="16" width="44" height="32" rx="2"></rect>
        <path d="M14 20 32 34 50 20"></path>
      </svg>
    `,
  },
  GitHub: {
    icon: `
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M32 12c-11 0-20 9-20 20 0 8.8 5.7 16.2 13.6 18.8 1 .2 1.4-.4 1.4-1v-3.7c-5.5 1.2-6.7-2.3-6.7-2.3-.9-2.2-2.1-2.8-2.1-2.8-1.8-1.2.1-1.2.1-1.2 2 .1 3 2 3 2 1.7 2.9 4.6 2.1 5.7 1.6.2-1.3.7-2.1 1.2-2.6-4.4-.5-9.1-2.2-9.1-9.8 0-2.2.8-4 2-5.5-.2-.5-.9-2.5.2-5.2 0 0 1.7-.5 5.5 2.1a19 19 0 0 1 10 0c3.8-2.6 5.5-2.1 5.5-2.1 1.1 2.7.4 4.7.2 5.2 1.2 1.5 2 3.3 2 5.5 0 7.6-4.7 9.3-9.2 9.8.7.6 1.3 1.8 1.3 3.6v5.4c0 .6.4 1.2 1.4 1 7.9-2.6 13.6-10 13.6-18.8 0-11-9-20-20-20Z"></path>
      </svg>
    `,
  },
  LinkedIn: {
    icon: `
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="12" y="12" width="40" height="40" rx="3"></rect>
        <path d="M22 28v14"></path>
        <path d="M22 22h.01"></path>
        <path d="M30 42V28"></path>
        <path d="M30 32c0-2.8 2.2-5 5-5s5 2.2 5 5v10"></path>
      </svg>
    `,
  },
};

function getContactCardMeta(item) {
  return CONTACT_CARD_META[item.label] ?? {
    icon: '',
  };
}

function renderContactCardInner(item) {
  const meta = getContactCardMeta(item);

  return `
    <div class="project-card-inner contact-card-inner">
      <div class="contact-card-content">
        <span class="contact-card-icon" aria-hidden="true">${meta.icon}</span>
        <div class="contact-card-copy">
          <span class="contact-card-title">${item.label}</span>
        </div>
      </div>
    </div>
  `;
}

export function renderContactCards(items = []) {
  return items
    .filter((item) => item.available)
    .map((item) => {
      if (item.label === 'Email') {
        return `
          <button
            class="project project-card contact-card contact-card-button"
            type="button"
            data-contact-copy="${item.value}"
            aria-label="Copy email address"
          >
            ${renderContactCardInner(item)}
          </button>
        `;
      }

      return `
        <a
          class="project project-card contact-card suppressed"
          href="${item.href}"
          target="_blank"
          rel="noreferrer"
          aria-label="${item.label}"
        >
          ${renderContactCardInner(item)}
        </a>
      `;
    })
    .join('');
}

export async function copyContactValue(value, clipboard = globalThis.navigator?.clipboard) {
  if (!clipboard?.writeText) {
    return false;
  }

  await clipboard.writeText(value);
  return true;
}

export function bindContactCardActions(doc = document, clipboard = doc?.defaultView?.navigator?.clipboard) {
  if (!doc?.querySelectorAll) {
    return;
  }

  const copyButtons = doc.querySelectorAll('[data-contact-copy]');

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const copied = await copyContactValue(button.dataset.contactCopy, clipboard);

      if (!copied) {
        return;
      }

      button.dataset.copyState = 'copied';
      button.setAttribute('aria-label', 'Email copied to clipboard');
    });
  });
}

function setNodeHTML(doc, id, value) {
  const node = doc.getElementById(id);

  if (node) {
    node.innerHTML = value;
  }
}

export function renderContactPage(doc = document, content = portfolioContent) {
  renderPortfolio(content, doc);
  setNodeHTML(doc, 'contact-page-list', renderContactCards(content.contact));
}

export function registerContactPageBoot(doc) {
  if (typeof doc === 'undefined') {
    return;
  }

  const boot = () => {
    renderContactPage(doc);
    bindContactCardActions(doc, doc.defaultView?.navigator?.clipboard);
    mountInteractiveBackground(doc);
  };

  if (doc.readyState !== 'loading') {
    boot();
    return;
  }

  doc.addEventListener('DOMContentLoaded', boot);
}

if (typeof document !== 'undefined' && document.body?.classList.contains('contact-page')) {
  registerContactPageBoot(document);
}
