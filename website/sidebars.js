// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      link: {type: 'doc', id: 'intro'},
      collapsed: false,
      items: ['inside-the-theme'],
    },
    'getting-started',
    'configuration',
    'components',
    'markdown-features',
    'customising-tokens',
    'arabic-and-rtl',
    'writing-style',
  ],
};

export default sidebars;
