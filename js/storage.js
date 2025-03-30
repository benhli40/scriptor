// storage.js – Handles saving and loading notes + versions

const NOTE_KEY = 'scriptor_note';
const VERSIONS_KEY = 'scriptor_versions';

// === Current Note ===

export function saveNote(content) {
  localStorage.setItem(NOTE_KEY, content);
}

export function loadNote() {
  return localStorage.getItem(NOTE_KEY) || '';
}

// === Versioned Notes ===

export function loadVersions() {
  const saved = localStorage.getItem(VERSIONS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveVersion(content) {
  const timestamp = Date.now();
  const versions = loadVersions();

  versions.unshift({ timestamp, content });

  if (versions.length > 10) versions.pop(); // Keep last 10 versions

  localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
}