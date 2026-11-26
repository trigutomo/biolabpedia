// Convert YAML frontmatter: pakai block scalar |- untuk title/description/label panjang
// agar tidak perlu kutip (kutip bocor ke output HTML)
const fs = require('fs');
const yaml = require('js-yaml');
const dir = 'src/content/articles';

function formatValue(key, value, indent) {
  const s = String(value);
  // Jika ada karakter yang butuh escape, pakai block scalar multi-line
  if (/[:#\[\]{}]|^\s|\s$|^[-?]|^\d/.test(s) || s.includes('"') || s.includes("'")) {
    return `${key}: |-\n${indent}${s}`;
  }
  return `${key}: ${s}`;
}

fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  const t = fs.readFileSync(p, 'utf8');
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return;
  const data = yaml.load(m[1]);
  const body = t.slice(m[0].length);

  const lines = [];
  lines.push(formatValue('title', data.title, ''));
  lines.push(formatValue('description', data.description, ''));
  lines.push('pillar: ' + data.pillar);
  lines.push('publishedAt: ' + String(data.publishedAt).slice(0, 10));
  if (data.updatedAt) lines.push('updatedAt: ' + String(data.updatedAt).slice(0, 10));
  lines.push('tags: [' + data.tags.map((s) => (/\d|^$/.test(String(s)) ? `"${s}"` : String(s))).join(', ') + ']');
  if (data.featured) lines.push('featured: true');
  if (data.author) lines.push(formatValue('author', data.author, ''));
  if (data.readingTime) lines.push('readingTime: ' + data.readingTime);
  if (data.sources && data.sources.length) {
    lines.push('sources:');
    data.sources.forEach((s) => {
      const lbl = String(s.label);
      if (/[:#\[\]{}]|^\s|\s$|^[-?]|^\d/.test(lbl) || lbl.includes('"') || lbl.includes("'")) {
        lines.push('  - label: |-\n      ' + lbl);
      } else {
        lines.push('  - label: ' + lbl);
      }
    });
  }
  fs.writeFileSync(p, '---\n' + lines.join('\n') + '\n---' + body);
  console.log('ok: ' + f);
});
