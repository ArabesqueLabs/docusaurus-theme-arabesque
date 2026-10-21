# Arabesque for Docusaurus

<picture><source media="(prefers-color-scheme: dark)" srcset="dist/brand/arabesque-mark-reversed.svg"><img src="dist/brand/arabesque-mark-ink.svg" width="56" height="56" alt=""></picture>

[`@arabesquelabs/docusaurus-theme-arabesque`](packages/docusaurus-theme-arabesque): a Docusaurus 3 theme built on the [Arabesque design system](https://github.com/ArabesqueLabs/design-system), and a documentation site that uses it and explains how to use it.

```
packages/docusaurus-theme-arabesque   the theme (published to npm)
  src/index.js                        the plugin: fonts, tokens, styles, swizzle config
  src/css/theme.css                   Infima mapping and the classic theme, restyled
  src/css/tokens.css, src/fonts/      copied from the design system (don't edit)
  src/theme/                          components and overrides (@theme/...)
  src/prism.js                        code colours
  assets/logos/                       the marks and favicons
  scripts/sync-design-system.mjs      copies a design-system release into the theme
website/                              the docs site
```

## Run it

```bash
npm ci
npm start          # http://localhost:3000
npm run build      # website/build
```

## Update the design system

```bash
git clone --depth 1 --branch v0.9.0 https://github.com/ArabesqueLabs/design-system.git ../design-system
npm run sync-design-system -- ../design-system
```

## Publish

From the repository root (a plain `npm publish` there fails: the root is the private workspace, not the package):

```bash
npm version minor -w @arabesquelabs/docusaurus-theme-arabesque   # or patch / major
npm run release                                                 # public, under the @arabesquelabs scope
```

## Use it in your own site

```bash
npm install @arabesquelabs/docusaurus-theme-arabesque
```

```js
// docusaurus.config.js
import {lightCodeTheme, darkCodeTheme} from '@arabesquelabs/docusaurus-theme-arabesque/prism';

export default {
  themes: ['@arabesquelabs/docusaurus-theme-arabesque'],
  themeConfig: {prism: {theme: lightCodeTheme, darkTheme: darkCodeTheme}},
};
```

The full guide is in the site, under Docs.

## License

The code in this repository is [MIT licensed](./LICENSE).

The documentation (the `.md` and `.mdx` files in `website/docs/` and `website/blog/`) is [Creative Commons licensed](./LICENSE-docs) (CC BY 4.0).

The Arabesque and Arabesque Labs logos and marks are not open source: they're the property of Arabesque Labs Ltd., all rights reserved. The fonts keep their own licences (SIL Open Font License 1.1). [NOTICE.md](./NOTICE.md) says what each licence covers.
