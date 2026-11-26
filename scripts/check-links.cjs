const fs = require('fs');
const files = [
  'dist/index.html',
  'dist/artikel/index.html',
  'dist/artikel/micropipette-dasar/index.html',
  'dist/tentang/index.html',
];
files.forEach((f) => {
  const h = fs.readFileSync(f, 'utf8');
  const css = h.match(/stylesheet" href="([^"]+)"/);
  const nav = h.match(/<nav[\s\S]*?<\/nav>/);
  console.log('== ' + f);
  console.log('  CSS: ' + (css ? css[1] : 'NONE'));
  const navLinks = nav ? (nav[0].match(/href="[^"]*"/g) || []) : [];
  console.log('  NAV: ' + (navLinks ? navLinks.join(' ') : 'NONE'));
  // Cek file CSS benar-benar ada
  if (css) {
    const path = require('path');
    const abs = path.resolve(path.dirname(f), css[1]);
    console.log('  CSS exists: ' + fs.existsSync(abs));
  }
});
