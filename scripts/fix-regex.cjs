// Fix YAML tanpa parse (karena file sudah rusak) - regex based
const fs = require('fs');
const dir = 'src/content/articles';

fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  let t = fs.readFileSync(p, 'utf8');
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return;
  
  const fm = m[1];
  const body = t.slice(m[0].length);
  
  // Extract fields via regex
  const extract = (key) => {
    const re = new RegExp(`^${key}:\\s*(\\|-\\n\\s*(.+)|(.+))$`, 'm');
    const match = fm.match(re);
    if (!match) return null;
    return (match[2] || match[3] || '').replace(/^["']+|["']+$/g, '').trim();
  };
  
  const title = extract('title');
  const description = extract('description');
  const pillar = extract('pillar');
  const author = extract('author') || 'Redaksi Biolabpedia';
  
  // publishedAt
  let publishedAt = extract('publishedAt');
  if (!publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    // Coba parse date string
    const dateMatch = fm.match(/publishedAt:\s*(.+)/);
    if (dateMatch) {
      const parsed = new Date(dateMatch[1].trim().replace(/"/g, '') + ', 2026');
      if (!isNaN(parsed)) {
        publishedAt = parsed.toISOString().slice(0, 10);
      }
    }
    if (!publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
      publishedAt = '2026-11-25';
    }
  }
  
  // updatedAt
  let updatedAt = extract('updatedAt');
  if (updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(updatedAt)) {
    const parsed = new Date(updatedAt + ', 2026');
    if (!isNaN(parsed)) updatedAt = parsed.toISOString().slice(0, 10);
    else updatedAt = null;
  }
  
  // tags
  const tagsMatch = fm.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch ? tagsMatch[1].split(',').map((s) => s.replace(/["']/g, '').trim()) : [];
  
  // sources
  const sourcesBlock = fm.match(/sources:\n((?:\s+-\s+label:.*\n?)+)/);
  const sources = [];
  if (sourcesBlock) {
    const srcLines = sourcesBlock[1].match(/-\s+label:\s*(?:\|-)?\s*\n?\s*(.+)/g) || [];
    srcLines.forEach((line) => {
      const lbl = line.replace(/^-\s+label:\s*(?:\|-)?\s*/, '').replace(/^["']+|["']+$/g, '').trim();
      if (lbl) sources.push(lbl);
    });
  }
  
  // Hitung readingTime
  const words = body.replace(/[#>*|`-]/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 180));
  
  // Format YAML block scalar
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
  lines.push('pillar: ' + pillar);
  lines.push('publishedAt: ' + publishedAt);
  if (updatedAt) lines.push('updatedAt: ' + updatedAt);
  lines.push('tags: [' + tags.map((s) => (/\d/.test(s) ? `"${s}"` : s)).join(', ') + ']');
  lines.push('author: ' + esc(author));
  lines.push('readingTime: ' + minutes);
  
  if (sources.length) {
    lines.push('sources:');
    sources.forEach((s) => {
      if (/[:#\[\]{}]|^\s|\s$|^[-?]|^\d/.test(s) || s.includes('"') || s.includes("'")) {
        lines.push('  - label: |-\n      ' + s);
      } else {
        lines.push('  - label: ' + s);
      }
    });
  }
  
  fs.writeFileSync(p, '---\n' + lines.join('\n') + '\n---' + body);
  console.log('fixed: ' + f);
});
