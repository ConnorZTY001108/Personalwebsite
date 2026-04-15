import { portfolioContent, renderPortfolio } from './app.js';
import { mountInteractiveBackground } from './background.js';

function renderAboutParagraphs(paragraphs = []) {
  return paragraphs.map((text) => `<p>${text}</p>`).join('');
}

function setNodeHTML(doc, id, value) {
  const node = doc.getElementById(id);

  if (node) {
    node.innerHTML = value;
  }
}

export function renderAboutPage(doc = document, content = portfolioContent) {
  renderPortfolio(content, doc);
  setNodeHTML(doc, 'about-page-copy', renderAboutParagraphs(content.about.paragraphs));
}

export function registerAboutPageBoot(doc) {
  if (typeof doc === 'undefined') {
    return;
  }

  const boot = () => {
    renderAboutPage(doc);
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
