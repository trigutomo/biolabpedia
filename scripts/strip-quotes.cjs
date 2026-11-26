// Hapus tanda kutip visual di frontmatter: ganti "..." jadi tanpa kutip, pakai YAML block literal aman
const fs = require('fs');
const yaml = require('js-yaml');
const dir = 'src/content/articles';

fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  const t = fs.readFileSync(p, 'utf8');
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return;
  const data = yaml.load(m[1]);
  // strip all leading/trailing quotes from string fields
  const clean = (s) => s.replace(/^["']+|["']+$/g, '');
  if (data.title) data.title = clean(data.title);
  if (data.description) data.description = clean(data.description);
  if (Array.isArray(data.sources)) {
    data.sources = data.sources.map((s) => ({ ...s, label: clean(s.label) }));
  }
  // Re-serialize frontmatter with block scalars where needed (no visible quotes)
  const lines = [];
  const esc = (s) => (/[:#\[\]{}]|^\s|\s$|^[-?]/.test(s) ? '"' + s.replace(/"/g, '\\"') + '"' : s);
  lines.push('title: ' + esc(data.title));
  lines.push('description: ' + esc(data.description));
  lines.push('pillar: ' + data.pillar);
  lines.push('publishedAt: ' + String(data.publishedAt).slice(0, 10));
  if (data.updatedAt) lines.push('updatedAt: ' + String(data.updatedAt).slice(0, 10));
  lines.push('tags: [' + data.tags.join(', ') + ']');
  if (data.featured) lines.push('featured: true');
  if (data.sources && data.sources.length) {
    lines.push('sources:');
    data.sources.forEach((s) => {
      lines.push('  - label: ' + esc(s.label));
    });
  }
  const newFm = '---\n' + lines.join('\n') + '\n---';
  const body = t.slice(m[0].length);
  fs.writeFileSync(p, newFm + body);
  console.log('cleaned: ' + f);
});
