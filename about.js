import { copyHeroContactValue, portfolioContent, renderPortfolio } from './app.js';
import { mountInteractiveBackground } from './background.js';

const SIMPLE_ICON_BASE = 'https://cdn.simpleicons.org';
const ICON_COLOR = '00f7ff';

function renderPlatformIcon(item) {
  if (!item.iconSlug) {
    return '';
  }

  return `
    <span class="about-platform-icon" aria-hidden="true">
      <img src="${SIMPLE_ICON_BASE}/${item.iconSlug}/${ICON_COLOR}" alt="" loading="lazy" decoding="async" />
    </span>
  `;
}

export function renderAboutPersonalItems(items = []) {
  const renderPlatformItem = (item) => {
    const isLinked = Boolean(item.href);
    const isCopyable = Boolean(item.copyValue);
    const isIconOnly = isLinked || isCopyable;
    const tagName = isLinked ? 'a' : isCopyable ? 'button' : 'div';
    const linkAttributes = isLinked
      ? ` href="${item.href}" target="_blank" rel="noreferrer" aria-label="${item.label}: ${item.value}" title="${item.label}: ${item.value}"`
      : isCopyable
        ? ` type="button" data-about-platform-copy="${item.copyValue}" aria-label="Copy ${item.label} ID: ${item.value}" title="${item.label}: ${item.value}"`
        : '';
    const actionClass = isLinked
      ? ' suppressed about-platform-link about-platform-icon-only'
      : isCopyable
        ? ' about-platform-copy-button about-platform-icon-only'
        : '';
    const copyMarkup = isIconOnly
      ? ''
      : `
        <span class="about-platform-copy">
          <span class="about-platform-label">${item.label}</span>
          <span class="about-platform-value">${item.value}</span>
        </span>
      `;

    return `
      <${tagName} class="about-platform-item${actionClass}"${linkAttributes}>
        ${renderPlatformIcon(item)}
        ${copyMarkup}
      </${tagName}>
    `;
  };
  const iconItems = items.filter((item) => item.href || item.copyValue);
  const plainItems = items.filter((item) => !item.href && !item.copyValue);
  const detailListMarkup = plainItems.length
    ? `
      <div class="about-platform-detail-list">
        ${plainItems.map(renderPlatformItem).join('')}
      </div>
    `
    : '';

  return `
    <div class="about-platform-list">
      <div class="about-platform-icon-row" aria-label="Linked profiles">
        ${iconItems.map(renderPlatformItem).join('')}
      </div>
      ${detailListMarkup}
    </div>
  `;
}

export async function copyAboutPlatformValue(
  value,
  clipboard = globalThis.navigator?.clipboard,
  doc = globalThis.document,
) {
  return copyHeroContactValue(value, clipboard, doc);
}

export function bindAboutPlatformActions(
  doc = document,
  clipboard = doc?.defaultView?.navigator?.clipboard,
  options = {},
) {
  if (!doc?.querySelectorAll) {
    return;
  }

  const scheduleReset =
    options.setTimeout ??
    doc?.defaultView?.setTimeout?.bind(doc.defaultView) ??
    globalThis.setTimeout?.bind(globalThis);
  const clearScheduledReset =
    options.clearTimeout ??
    doc?.defaultView?.clearTimeout?.bind(doc.defaultView) ??
    globalThis.clearTimeout?.bind(globalThis);
  const resetDelay = options.resetDelay ?? 2000;
  const copyButtons = doc.querySelectorAll('[data-about-platform-copy]');

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const copied = await copyAboutPlatformValue(button.dataset.aboutPlatformCopy, clipboard, doc);

      if (!copied) {
        return;
      }

      const originalAriaLabel =
        button.dataset.originalAriaLabel ??
        button.getAttribute?.('aria-label') ??
        button.attributes?.['aria-label'] ??
        '';
      button.dataset.originalAriaLabel = originalAriaLabel;
      button.dataset.copyState = 'copied';
      button.setAttribute('aria-label', `${button.dataset.aboutPlatformCopy} copied to clipboard`);

      if (button._aboutPlatformResetTimer && clearScheduledReset) {
        clearScheduledReset(button._aboutPlatformResetTimer);
      }

      if (scheduleReset) {
        button._aboutPlatformResetTimer = scheduleReset(() => {
          delete button.dataset.copyState;
          button.setAttribute('aria-label', button.dataset.originalAriaLabel ?? originalAriaLabel);
          delete button._aboutPlatformResetTimer;
        }, resetDelay);
      }
    });
  });
}

function setNodeHTML(doc, id, value) {
  const node = doc.getElementById(id);

  if (node) {
    node.innerHTML = value;
  }
}

export function renderAboutPage(doc = document, content = portfolioContent) {
  renderPortfolio(content, doc);
  setNodeHTML(doc, 'about-page-copy', renderAboutPersonalItems(content.about.personalItems));
}

export function registerAboutPageBoot(doc) {
  if (typeof doc === 'undefined') {
    return;
  }

  const boot = () => {
    renderAboutPage(doc);
    bindAboutPlatformActions(doc, doc.defaultView?.navigator?.clipboard);
    mountInteractiveBackground(doc);
  };

  if (doc.readyState !== 'loading') {
    boot();
    return;
  }

  doc.addEventListener('DOMContentLoaded', boot);
}

if (typeof document !== 'undefined' && document.body?.classList.contains('about-page')) {
  registerAboutPageBoot(document);
}
