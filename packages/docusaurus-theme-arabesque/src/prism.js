// Code highlighting for prism-react-renderer, from the design system's syntax
// tokens. The colours are CSS custom properties, so one theme follows light
// and dark on its own; comments are italic too, so kind isn't told by colour
// alone.

const v = (name) => `var(--al-color-syntax-${name})`;

export const codeTheme = {
  plain: {color: 'var(--al-color-text)', backgroundColor: 'var(--al-color-surface-sunk)'},
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: v('comment'), fontStyle: 'italic'}},
    {types: ['punctuation', 'operator'], style: {color: 'var(--al-color-text-muted)'}},
    {types: ['keyword', 'atrule', 'important', 'rule', 'module', 'control-flow'], style: {color: v('keyword')}},
    {types: ['string', 'char', 'attr-value', 'regex', 'template-string', 'inserted'], style: {color: v('string')}},
    {types: ['number', 'boolean', 'constant', 'symbol', 'unit'], style: {color: v('number')}},
    {types: ['function', 'class-name', 'maybe-class-name', 'builtin'], style: {color: v('function')}},
    {types: ['tag', 'selector', 'deleted'], style: {color: v('tag')}},
    {types: ['attr-name', 'property'], style: {color: v('attribute')}},
    {types: ['bold'], style: {fontWeight: 600}},
    {types: ['italic'], style: {fontStyle: 'italic'}},
  ],
};

// Docusaurus asks for a theme per colour mode; both are the same one.
export const lightCodeTheme = codeTheme;
export const darkCodeTheme = codeTheme;
