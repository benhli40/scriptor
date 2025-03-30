// preview.js – Controls live rendering in the preview pane

import { renderMarkdown } from './utils.js';

const preview = document.getElementById('preview');

export function updatePreview(content) {
  preview.innerHTML = renderMarkdown(content);
}
