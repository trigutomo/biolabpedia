// Tambah author + readingTime ke semua artikel yang belum punya
const fs = require('fs');
const yaml = require('js-yaml');
const dir = 'src/content/articles';

fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  const t = fs.readFileSync(p, 'utf8');
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return;
  const data = yaml.load(m[1]);
  if (!data.author) data.author = 'Redaksi Biolabpedia';
  if (!data.sources) data.sources = [];

  const body = t.slice(m[0].length);
  // hitung kata di body (kurangi markdown syntax sederhana)
  const words = body.replace(/[#>*|`-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));

  const esc = (s) => (/[:#\[\]{}]|^\s|\s$|^[-?]/.test(s) ? '"' + s.replace(/"/g, '\\"') + '"' : s);
  const lines = [];
  lines.push('title: ' + esc(data.title));
  lines.push('description: ' + esc(data.description));
  lines.push('pillar: ' + data.pillar);
  lines.push('publishedAt: ' + String(data.publishedAt).slice(0, 10));
  if (data.updatedAt) lines.push('updatedAt: ' + String(data.updatedAt).slice(0, 10));
  lines.push('tags: [' + data.tags.join(', ') + ']');
  if (data.featured) lines.push('featured: true');
  lines.push('author: ' + esc(data.author));
  lines.push('readingTime: ' + minutes);
  if (data.sources && data.sources.length) {
    lines.push('sources:');
    data.sources.forEach((s) => lines.push('  - label: ' + esc(s.label)));
  }
  const newFm = '---\n' + lines.join('\n') + '\n---';
  fs.writeFileSync(p, newFm + body);
  console.log(f + ': ' + minutes + ' min, author=' + data.author);
});
