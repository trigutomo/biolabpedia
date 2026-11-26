// Fix semua masalah: kutip di description, publishedAt salah, encoding
const fs = require('fs');
const yaml = require('js-yaml');
const dir = 'src/content/articles';

fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  let t = fs.readFileSync(p, 'utf8');
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return;
  
  let data;
  try {
    data = yaml.load(m[1]);
  } catch (e) {
    // Jika parse gagal, skip
    console.log('SKIP (parse error): ' + f);
    return;
  }
  
  const body = t.slice(m[0].length);
  
  // Bersihkan kutip di values
  const clean = (s) => String(s).replace(/^["']+|["']+$/g, '');
  
  const title = clean(data.title);
  const description = clean(data.description);
  const author = clean(data.author || 'Redaksi Biolabpedia');
  
  // Fix publishedAt - pastikan format YYYY-MM-DD
  let publishedAt = data.publishedAt;
  if (typeof publishedAt === 'string' && !/^\d{4}-\d{2}-\d{2}/.test(publishedAt)) {
    // Coba parse date string seperti "Wed Nov 25"
    const parsed = new Date(publishedAt + ', 2026');
    if (!isNaN(parsed)) {
      publishedAt = parsed.toISOString().slice(0, 10);
    } else {
      publishedAt = '2026-11-25'; // fallback
    }
  } else if (publishedAt instanceof Date) {
    publishedAt = publishedAt.toISOString().slice(0, 10);
  }
  
  let updatedAt = data.updatedAt;
  if (updatedAt instanceof Date) updatedAt = updatedAt.toISOString().slice(0, 10);
  if (typeof updatedAt === 'string' && !/^\d{4}-\d{2}-\d{2}/.test(updatedAt)) {
    updatedAt = null;
  }
  
  // Format YAML dengan block scalar untuk strings yang butuh
  const esc = (s) => {
    s = String(s);
    if (/[:#\[\]{}]|^\s|\s$|^[-?]|^\d/.test(s) || s.includes('"') || s.includes("'")) {
      return '|-\n  ' + s;
    }
    return s;
  };
  
  const lines = [];
  lines.push('title: ' + esc(title));
  lines.push('description: ' + esc(description));
  lines.push('pillar: ' + data.pillar);
  lines.push('publishedAt: ' + publishedAt);
  if (updatedAt) lines.push('updatedAt: ' + updatedAt);
  lines.push('tags: [' + data.tags.map((s) => {
    s = clean(s);
    return /\d/.test(s) ? `"${s}"` : s;
  }).join(', ') + ']');
  if (data.featured) lines.push('featured: true');
  lines.push('author: ' + esc(author));
  
  // Hitung readingTime dari body
  const words = body.replace(/[#>*|`-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  lines.push('readingTime: ' + minutes);
  
  if (data.sources && data.sources.length) {
    lines.push('sources:');
    data.sources.forEach((s) => {
      const lbl = clean(s.label);
      if (/[:#\[\]{}]|^\s|\s$|^[-?]|^\d/.test(lbl) || lbl.includes('"') || lbl.includes("'")) {
        lines.push('  - label: |-\n      ' + lbl);
      } else {
        lines.push('  - label: ' + lbl);
      }
    });
  }
  
  fs.writeFileSync(p, '---\n' + lines.join('\n') + '\n---' + body);
  console.log('fixed: ' + f + ' (' + publishedAt + ')');
});
