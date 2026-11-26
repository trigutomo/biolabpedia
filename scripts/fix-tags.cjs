// Pastikan semua tags di YAML berupa string (kutip) agar angka seperti 1,5 tidak jadi number
const fs = require('fs');
const yaml = require('js-yaml');
const dir = 'src/content/articles';

fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  const t = fs.readFileSync(p, 'utf8');
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return;
  const data = yaml.load(m[1]);
  const body = t.slice(m[0].length);

  const esc = (s) => (/[:#\[\]{}]|^\s|\s$|^[-?]|^\d/.test(s) ? '"' + String(s).replace(/"/g, '\\"') + '"' : String(s));
  const lines = [];
  lines.push('title: ' + esc(data.title));
  lines.push('description: ' + esc(data.description));
  lines.push('pillar: ' + data.pillar);
  lines.push('publishedAt: ' + String(data.publishedAt).slice(0, 10));
  if (data.updatedAt) lines.push('updatedAt: ' + String(data.updatedAt).slice(0, 10));
  lines.push('tags: [' + data.tags.map(esc).join(', ') + ']');
  if (data.featured) lines.push('featured: true');
  if (data.author) lines.push('author: ' + esc(data.author));
  if (data.readingTime) lines.push('readingTime: ' + data.readingTime);
  if (data.sources && data.sources.length) {
    lines.push('sources:');
    data.sources.forEach((s) => lines.push('  - label: ' + esc(s.label)));
  }
  fs.writeFileSync(p, '---\n' + lines.join('\n') + '\n---' + body);
  console.log('ok: ' + f);
});
