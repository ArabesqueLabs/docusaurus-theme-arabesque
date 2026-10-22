// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import {lightCodeTheme, darkCodeTheme} from '@arabesquelabs/docusaurus-theme-arabesque/prism';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Arabesque',
  tagline: 'A Docusaurus theme built on the Arabesque design system.',
  favicon: 'img/arabesque-docusaurus-favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docusaurus.arabesquelabs.com/',
  baseUrl: '/',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Docs-only: the docs are the site, and the Introduction is its home page.
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        // The blog is hidden for now; its posts stay in blog/. To bring it
        // back, restore these options and the navbar's Blog link:
        // {showReadingTime: true, onInlineTags: 'warn', onInlineAuthors: 'warn', onUntruncatedBlogPosts: 'warn'}
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // The Arabesque theme: tokens, fonts, component styles and components.
  themes: [
    [
      '@arabesquelabs/docusaurus-theme-arabesque',
      {
        footer: {
          attribution: {label: "a product of Arabesque Labs.", href: 'https://arabesquelabs.com'},
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Arabesque',
        logo: {
          alt: 'Arabesque for Docusaurus, home',
          src: 'img/arabesque-docusaurus-plain.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/components', label: 'Components', position: 'left'},
        ],
      },
      footer: {
        style: 'light',
        // The dinosaur stands on the legal lines' hairline (the theme's
        // Footer/Layout), and takes you back to the top.
        logo: {
          src: 'img/arabesque-docusaurus.svg',
          alt: 'Back to the top',
          href: '#',
          width: 160,
          height: 160,
        },
        links: [
          {
            title: 'The theme',
            items: [
              {label: 'Introduction', to: '/'},
              {label: 'Getting started', to: '/getting-started'},
              {label: 'Components', to: '/components'},
              {label: 'Markdown features', to: '/markdown-features'},
            ],
          },
          {
            title: 'Reference',
            items: [
              {label: 'Configuration', to: '/configuration'},
              {label: 'Customising tokens', to: '/customising-tokens'},
              {label: 'Arabic and right-to-left', to: '/arabic-and-rtl'},
              {label: 'Writing style', to: '/writing-style'},
            ],
          },
          {
            title: 'Arabesque Labs',
            items: [
              {label: 'arabesquelabs.com', href: 'https://arabesquelabs.com'},
              {label: 'The design system', href: 'https://github.com/ArabesqueLabs/design-system'},
              {label: 'Docusaurus', href: 'https://docusaurus.io/docs'},
              {label: 'Contact', href: 'mailto:hello@arabesquelabs.com'},
            ],
          },
        ],
        copyright: [
          `<p>Made with ♥ by <a href="https://mosab.co.uk">Mosab</a> at <a href="https://arabesquelabs.com">Arabesque Labs</a> | © ${new Date().getFullYear()}</p>`,
          '<p>Free software: the code under the <a href="https://opensource.org/license/mit">MIT licence</a>, the docs under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. The logos are Arabesque Labs\'.</p>',
        ].join(''),
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

export default config;
