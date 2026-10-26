import {createContext, useContext} from 'react';
import {translate} from '@docusaurus/Translate';

// What the code block's window (CodeBlock/Layout) needs that Docusaurus's
// metadata doesn't carry: the caption under it, from the fence's metastring
// (```bash caption="Then open http://localhost:3000.").

export const CodeBlockCaptionContext = createContext('');

export const useCodeBlockCaption = () => useContext(CodeBlockCaptionContext);

export function parseCaption(metastring) {
  return metastring?.match(/caption=(["'])(?<caption>.*?)\1/)?.groups.caption ?? '';
}

// Shell languages: their windows are terminals, with a prompt before each
// command, drawn but never copied.
const SHELLS = new Set(['bash', 'sh', 'shell', 'zsh']);

export const isShell = (language) => SHELLS.has(language);

const NAMES = {
  css: 'CSS',
  diff: 'Diff',
  html: 'HTML',
  js: 'JavaScript',
  javascript: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  md: 'Markdown',
  markdown: 'Markdown',
  mdx: 'MDX',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  yaml: 'YAML',
  yml: 'YAML',
};

// The name in a window's bar when the block has no title: "Terminal" for a
// shell, the language's name for the rest; none for plain text.
export function languageName(language) {
  if (isShell(language)) {
    return translate({id: 'theme.CodeBlock.terminal', message: 'Terminal', description: 'The name of a shell code block'});
  }
  if (!language || language === 'text') return '';
  return NAMES[language] ?? language;
}
