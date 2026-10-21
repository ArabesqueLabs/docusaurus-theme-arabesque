import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(here, '../package.json'), 'utf8'));

// The version of the Arabesque design system this theme is built on.
export const designSystemVersion = pkg.arabesque.designSystem;

const DEFAULT_OPTIONS = {
  // Load the design system's own font files (Jost, Newsreader, Kufam, IBM
  // Plex Sans Arabic, Amiri, IBM Plex Mono). Turn off to load them yourself.
  fonts: true,
  // The footer (see Footer/Layout): `blurb`, a line on what the site is,
  // beside the links; `attribution`, {label, href}, who makes it. The
  // footer's logo says the label in a comic speech bubble.
  footer: {},
};

/** @type {import('@docusaurus/types').PluginModule} */
export default function themeArabesque(context, options) {
  const {fonts, footer} = {...DEFAULT_OPTIONS, ...options};

  return {
    name: 'docusaurus-theme-arabesque',

    // Components under src/theme are available as @theme/<Name>, and any
    // file that shares a name with a theme-classic component replaces it.
    getThemePath() {
      return join(here, 'theme');
    },

    // What Footer/Layout reads with usePluginData.
    async contentLoaded({actions}) {
      actions.setGlobalData({footer});
    },

    getClientModules() {
      return [
        ...(fonts ? [join(here, 'fonts/fonts.css')] : []),
        join(here, 'css/tokens.css'),
        join(here, 'css/theme.css'),
      ];
    },

    injectHtmlTags() {
      return {
        headTags: [{tagName: 'meta', attributes: {name: 'arabesque-design-system', content: designSystemVersion}}],
      };
    },
  };
}

// Swizzle safety for `docusaurus swizzle docusaurus-theme-arabesque`.
const safe = (description) => ({actions: {eject: 'safe', wrap: 'safe'}, description});

export function getSwizzleConfig() {
  return {
    components: {
      ArabesqueHero: safe('The homepage hero: pattern, display heading, lede and actions.'),
      ArabesqueIcon: safe('The Arabesque icon set.'),
      ArabesqueMark: safe('The Arabesque and Arabesque Labs marks.'),
      ArabesquePattern: safe('The generative 4.8.8 pattern background.'),
      ArabesqueSteps: safe('A numbered sequence.'),
      'Admonition/Layout': safe('Admonitions as Arabesque notices.'),
      'Footer/Layout': safe('The footer: a blurb beside the links, the legal lines under a hairline, and the logo standing on it with a speech bubble.'),
    },
  };
}

export function validateOptions({options = {}}) {
  if ('googleFonts' in options) {
    throw new Error(
      'docusaurus-theme-arabesque: "googleFonts" was replaced by "fonts" in 0.2.0. The theme now loads the design system\'s own font files.',
    );
  }
  if (options.fonts !== undefined && typeof options.fonts !== 'boolean') {
    throw new Error('docusaurus-theme-arabesque: "fonts" must be a boolean.');
  }
  const {footer} = options;
  if (footer !== undefined) {
    const ok =
      typeof footer === 'object' &&
      (footer.blurb === undefined || typeof footer.blurb === 'string') &&
      (footer.attribution === undefined ||
        (typeof footer.attribution?.label === 'string' &&
          typeof footer.attribution?.href === 'string'));
    if (!ok) {
      throw new Error(
        'docusaurus-theme-arabesque: "footer" takes {blurb?: string, attribution?: {label: string, href: string}}.',
      );
    }
  }
  // Docusaurus names a plugin's data by its id.
  return {id: 'default', ...options};
}
