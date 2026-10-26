import React from 'react';
import clsx from 'clsx';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import CodeBlockLine from '@theme-init/CodeBlock/Line';
import {isShell} from '../../../code-block.js';

// In a shell's window, a command has a prompt before it, drawn by the
// stylesheet and never copied. A command is a line that starts at the margin
// and isn't a comment: not a blank line, a "# …" comment, or an indented
// continuation of the line before.
export default function CodeBlockLineWithPrompt(props) {
  const {metadata} = useCodeBlockContext();
  const text = props.line.map((token) => token.content).join('');
  const command = isShell(metadata.language) && /^[^\s#]/.test(text);
  return <CodeBlockLine {...props} classNames={clsx(props.classNames, command && 'al-code-line--command')} />;
}
