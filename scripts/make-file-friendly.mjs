// Bikin output dist/ bisa dibuka langsung via file:// (double-click index.html).
// - Tambah ./ pada href/src absolut agar tidak jatuh ke root filesystem
// - Rapikan ././ jadi ./
// - Tambah index.html pada link folder (artikel/, tentang/)
// - Perbaiki path relatif berdasarkan kedalaman folder halaman
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const dist = join(process.cwd(), 'dist');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(dist)) {
  let html = readFileSync(file, 'utf8');
  const before = html;
  const pageDir = dirname(file);
  const depth = relative(dist, pageDir).split(/[\\/]/).filter(Boolean).length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  // href="/x" -> prefix + "x"
  html = html.replace(/href="\/(?!\/)/g, `href="${prefix}`);
  html = html.replace(/src="\/(?!\/)/g, `src="${prefix}`);
  // Rapikan ganda ././
  html = html.replace(/\.\/\.\//g, './');

  // Link folder di dalam path relatif -> tambah index.html
  html = html.replace(/(href="(?:\.\.\/|\.\.\/)*)([^"?#]*\/)"/g, (m, pre, path) => {
    if (path.endsWith('.html')) return m;
    return `${pre}${path}index.html"`;
  });
  html = html.replace(/(href="(?:\.\.\/)*)([^"?#]*\/)(\?[^"]*)"/g, (m, pre, path, query) => {
    if (path.endsWith('.html')) return m;
    return `${pre}${path}index.html${query}"`;
  });

  if (html !== before) {
    writeFileSync(file, html);
    changed++;
  }
}
console.log(`file-friendly: ${changed} html diproses di ${relative(process.cwd(), dist) || dist}`);
