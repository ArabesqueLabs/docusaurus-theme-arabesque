# @arabesquelabs/docusaurus-theme-arabesque

A Docusaurus 3 theme built on the [Arabesque design system](https://github.com/ArabesqueLabs/design-system), the system Arabesque Labs' sites and products are made with. It restyles the classic theme with the design system's tokens, fonts and components, in light and dark, English and Arabic.

Built on design system **0.9.0** (`package.json`'s `arabesque.designSystem`).

## Use it

```bash
npm install @arabesquelabs/docusaurus-theme-arabesque
```

```js
// docusaurus.config.js
import {lightCodeTheme, darkCodeTheme} from '@arabesquelabs/docusaurus-theme-arabesque/prism';

export default {
  presets: [['classic', {/* docs, blog */}]],
  themes: ['@arabesquelabs/docusaurus-theme-arabesque'],
  themeConfig: {
    prism: {theme: lightCodeTheme, darkTheme: darkCodeTheme},
  },
};
```

Needs Node.js 20 or newer, and a site on Docusaurus 3 with the classic preset.

## Options

```js
themes: [
  [
    '@arabesquelabs/docusaurus-theme-arabesque',
    {
      fonts: true, // load the design system's font files (the default)
      footer: {
        blurb: 'What this site is, in one line.',
        greeting: 'Hello, world!', // what the footer's logo says (the default)
        attribution: {label: 'A product of Arabesque Labs', href: 'https://arabesquelabs.com'},
      },
    },
  ],
],
```

The footer's `logo` (in `themeConfig.footer`) says `footer.greeting` in a speech bubble, and `footer.attribution` is the design system's "A product of Arabesque Labs" badge under the legal lines.

Code blocks are windows, as on Arabesque Labs' sites: a bar with the title or language and a Copy button, a `$` before a shell's commands (never copied), and an optional `caption="…"` under the code.

## What's in the package

- **Components** for pages and MDX: `ArabesquePattern`, `ArabesqueHero`, `ArabesqueMark`, `ArabesqueSteps` and `ArabesqueIcon`, under `@theme/`.
- **Code colours:** `@arabesquelabs/docusaurus-theme-arabesque/prism`.
- **Tokens:** `tokens.css` and `tokens.json`, the design system's, as `--al-*` custom properties.
- **Logos** in `assets/logos/`: this theme's logo (`arabesque-docusaurus.svg`, `-plain.svg` for 32 to 64px, `-favicon.svg`), the design system's marks, and its "A product of Arabesque Labs" badges (`badges/`).

The full guide (configuration, components, tokens, Arabic) is in the [repository](https://github.com/ArabesqueLabs/docusaurus-theme-arabesque).

## License

The code is [MIT licensed](./LICENSE). The logos and marks in `assets/logos/`, and the artwork `ArabesqueMark` draws, are the property of Arabesque Labs Ltd., all rights reserved, and aren't covered by the MIT licence. The fonts keep their own licences (SIL Open Font License 1.1). See [NOTICE.md](./NOTICE.md).
