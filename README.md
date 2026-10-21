# Arabesque for Docusaurus

A Docusaurus 3 theme built on the Arabesque design system, and a documentation site that uses it and explains how to use it.

```
packages/docusaurus-theme-arabesque   the theme
  tokens.json                         the design system's tokens (source of truth)
  scripts/build-tokens.mjs            tokens.json -> src/css/tokens.css
  src/index.js                        the plugin: CSS, fonts, swizzle config
  src/css/theme.css                   Infima mapping and classic-theme styles
  src/theme/                          components and overrides (@theme/...)
  src/prism.js                        code highlighting themes
  assets/logos/                       mark and favicon SVGs
website/                              the docs site
```

## Run it

```bash
npm install
npm start          # http://localhost:3000
npm run build      # website/build
npm run tokens     # regenerate tokens.css after changing tokens.json
```

## Use it in your own site

```js
// docusaurus.config.js
import {lightCodeTheme, darkCodeTheme} from 'docusaurus-theme-arabesque/prism';

export default {
  themes: ['docusaurus-theme-arabesque'],
  themeConfig: {prism: {theme: lightCodeTheme, darkTheme: darkCodeTheme}},
};
```

The full guide is in the site, under Docs: getting started, configuration, components, customising tokens, and Arabic and right-to-left.
