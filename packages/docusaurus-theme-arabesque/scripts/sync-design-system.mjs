// Copies a release of the Arabesque design system into the theme.
//
//   node scripts/sync-design-system.mjs <path to a design-system checkout>
//
// Check out the release first (git clone --branch v0.8.0
// https://github.com/ArabesqueLabs/design-system.git). The script copies its
// built tokens, the self-hosted fonts and their licences, the logos, and the
// icon set, and records the version in package.json. Nothing it writes is
// edited by hand.

import {copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2] && resolve(process.argv[2]);
if (!source) {
  console.error('Usage: node scripts/sync-design-system.mjs <path to a design-system checkout>');
  process.exit(1);
}

const sourcePkg = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'));
if (sourcePkg.name !== '@arabesquelabs/design-system') {
  console.error(`${source} is not the Arabesque design system (found ${sourcePkg.name}).`);
  process.exit(1);
}
const {version} = sourcePkg;
const stamp = `/* Arabesque design system ${version}, copied by scripts/sync-design-system.mjs. Don't edit. */\n`;

// Tokens: the built CSS (light, dark, Arabic) and the JSON beside it.
const tokensCss = readFileSync(join(source, 'dist/tokens.css'), 'utf8');
writeFileSync(join(root, 'src/css/tokens.css'), stamp + tokensCss);
copyFileSync(join(source, 'dist/tokens.json'), join(root, 'tokens.json'));

// Fonts: the faces, their @font-face rules and their licences.
const fontsOut = join(root, 'src/fonts');
rmSync(fontsOut, {recursive: true, force: true});
mkdirSync(fontsOut, {recursive: true});
const fonts = readdirSync(join(source, 'fonts')).filter((f) => /\.(woff2|txt)$/.test(f) || f === 'fonts.css');
for (const f of fonts) copyFileSync(join(source, 'fonts', f), join(fontsOut, f));

// Logos.
const logos = [
  'arabesque-mark-ink.svg',
  'arabesque-mark-reversed.svg',
  'arabesque-favicon.svg',
  'mark-ink.svg',
  'mark-reversed.svg',
  'favicon.svg',
];
mkdirSync(join(root, 'assets/logos'), {recursive: true});
for (const f of logos) copyFileSync(join(source, 'dist/brand', f), join(root, 'assets/logos', f));

// Icons: each <symbol> of the sprite, as its inner markup, keyed by name.
const sprite = readFileSync(join(source, 'dist/icons.svg'), 'utf8');
const icons = {};
for (const [, name, inner] of sprite.matchAll(/<symbol id="al-icon-([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/symbol>/g)) {
  icons[name] = inner.trim();
}
writeFileSync(
  join(root, 'src/theme/ArabesqueIcon/icons.js'),
  `// Arabesque design system ${version}: the icon set, from dist/icons.svg.\n` +
    `// Copied by scripts/sync-design-system.mjs. Don't edit.\n\n` +
    `export default ${JSON.stringify(icons, null, 2)};\n`,
);

// Record the version.
const pkgPath = join(root, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.arabesque = {designSystem: version};
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(
  `Arabesque ${version}: tokens, ${fonts.length} font files, ${logos.length} logos, ${Object.keys(icons).length} icons.`,
);
