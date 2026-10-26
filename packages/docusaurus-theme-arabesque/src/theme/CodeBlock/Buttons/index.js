import React from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';

// The buttons over the code: only word wrap, since Copy is in the window's
// bar (CodeBlock/Layout). Not server-rendered, as in the classic theme.
export default function CodeBlockButtons({className}) {
  return (
    <BrowserOnly>
      {() => (
        <div className={clsx(className, 'al-code-window__buttons')}>
          <WordWrapButton />
        </div>
      )}
    </BrowserOnly>
  );
}
