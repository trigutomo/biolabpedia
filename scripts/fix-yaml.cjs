const fs = require('fs');
const dir = 'src/content/articles';
fs.readdirSync(dir).forEach((f) => {
  const p = dir + '/' + f;
  let t = fs.readFileSync(p, 'utf8');
  // Wrap title, description, and label values in double quotes
  t = t.replace(/^(title: )(.+)$/m, (m, k, v) => k + '"' + v.replace(/"/g, '\\"') + '"');
  t = t.replace(/^(description: )(.+)$/m, (m, k, v) => k + '"' + v.replace(/"/g, '\\"') + '"');
  t = t.replace(/^(\s*- label: )(.+)$/gm, (m, k, v) => k + '"' + v.replace(/"/g, '\\"') + '"');
  fs.writeFileSync(p, t);
  console.log('fixed: ' + f);
});
