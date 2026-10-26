import React from 'react';
import clsx from 'clsx';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import Buttons from '@theme/CodeBlock/Buttons';
import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import {isShell, languageName, useCodeBlockCaption} from '../../../code-block.js';

// A code block in a window, as on Arabesque Labs' sites: a bar with the
// window's three dots, the block's title (or its language: "Terminal" for a
// shell) and a Copy button that says what it did; the code; and a caption
// under it, if the fence has one. A shell's commands have a prompt
// (CodeBlock/Line).
export default function CodeBlockLayout({className}) {
  const {metadata} = useCodeBlockContext();
  const caption = useCodeBlockCaption();
  const name = metadata.title || languageName(metadata.language);
  return (
    <Container
      as="div"
      className={clsx(className, metadata.className, 'al-code-window', isShell(metadata.language) && 'al-code-window--terminal')}>
      <div className="al-code-window__bar">
        <span className="al-code-window__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {name && (
          <span className="al-code-window__title">
            <Title>{name}</Title>
          </span>
        )}
        <CopyButton className="al-code-window__copy" />
      </div>
      <div className="al-code-window__content">
        <Content />
        <Buttons />
      </div>
      {caption && <p className="al-code-window__caption">{caption}</p>}
    </Container>
  );
}
