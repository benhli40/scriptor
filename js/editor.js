// editor.js – Handles editor input, autosave, and live preview

import { updatePreview } from './preview.js';
import { saveNote, loadNote, saveVersion } from './storage.js';
import { renderVersionList } from './versioning.js';

const editor = document.getElementById('editor');

document.addEventListener('DOMContentLoaded', () => {
  const saved = loadNote();
  editor.value = saved;
  updatePreview(saved);
  renderVersionList();
});

editor.addEventListener('input', () => {
  const content = editor.value;

  saveNote(content);
  updatePreview(content);
  saveVersion(content);
});

const snapshotBtn = document.getElementById('save-snapshot');

snapshotBtn?.addEventListener('click', () => {
  saveVersion(editor.value);
});