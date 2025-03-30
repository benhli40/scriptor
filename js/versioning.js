// versioning.js – Save + load previous note versions

const VERSIONS_KEY = 'scriptor_versions';
const versionList = document.getElementById('versions');

export function saveVersion(content) {
  const timestamp = Date.now();
  const versions = loadVersions();
  versions.unshift({ timestamp, content });

  // Optional: limit to last 10 versions
  if (versions.length > 10) versions.pop();

  localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
  renderVersionList(versions);
}

export function loadVersions() {
  const saved = localStorage.getItem(VERSIONS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function renderVersionList(versions = loadVersions()) {
  versionList.innerHTML = '';

  versions.forEach((version, index) => {
    const li = document.createElement('li');
    const date = new Date(version.timestamp).toLocaleString();

    li.textContent = `Version ${index + 1} – ${date}`;
    li.addEventListener('click', () => {
      restoreVersion(version.content);
    });

    versionList.appendChild(li);
  });
}

function restoreVersion(content) {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');

  editor.value = content;
  localStorage.setItem('scriptor_note', content);

  // Optionally re-render preview
  import('./preview.js').then(({ updatePreview }) => {
    updatePreview(content);
  });
}
