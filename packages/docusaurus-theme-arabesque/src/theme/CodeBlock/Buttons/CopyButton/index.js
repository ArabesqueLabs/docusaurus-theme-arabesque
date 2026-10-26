import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import ArabesqueIcon from '@theme/ArabesqueIcon';

// The design system's copy button (js/copy.js): its icon and a word, "Copy",
// that says "Copied" for a moment once it has, and is announced. If the
// clipboard can't be written, the code is selected instead, to copy by hand.

const LABELS = {
  idle: () => translate({id: 'theme.CodeBlock.copy', message: 'Copy', description: 'The copy button label on code blocks'}),
  copied: () => translate({id: 'theme.CodeBlock.copied', message: 'Copied', description: 'The copied button label on code blocks'}),
  failed: () =>
    translate({
      id: 'theme.CodeBlock.copyFailed',
      message: "Couldn't copy. The code is selected, so you can copy it yourself.",
      description: 'Said when a code block could not be copied',
    }),
};

function selectCode(button) {
  const code = button.closest('.theme-code-block')?.querySelector('pre code');
  if (!code) return;
  const range = document.createRange();
  range.selectNodeContents(code);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

export default function CopyButton({className}) {
  const {
    metadata: {code},
  } = useCodeBlockContext();
  const [state, setState] = useState('idle');
  const timeout = useRef(undefined);
  const copy = useCallback(
    (event) => {
      const button = event.currentTarget;
      window.clearTimeout(timeout.current);
      const done = (next) => {
        setState(next);
        timeout.current = window.setTimeout(() => setState('idle'), next === 'copied' ? 2000 : 6000);
      };
      Promise.resolve()
        .then(() => navigator.clipboard.writeText(code))
        .then(
          () => done('copied'),
          () => {
            selectCode(button);
            done('failed');
          },
        );
    },
    [code],
  );
  useEffect(() => () => window.clearTimeout(timeout.current), []);
  return (
    <>
      <button
        type="button"
        className={clsx('clean-btn', 'al-code-copy', state === 'copied' && 'al-code-copy--copied', className)}
        aria-label={translate({
          id: 'theme.CodeBlock.copyButtonAriaLabel',
          message: 'Copy code to clipboard',
          description: 'The ARIA label for copy code blocks button',
        })}
        onClick={copy}>
        <ArabesqueIcon name={state === 'copied' ? 'check' : 'copy'} size={16} />
        <span>{state === 'copied' ? LABELS.copied() : LABELS.idle()}</span>
      </button>
      <span className="al-visually-hidden" role="status">
        {state === 'idle' ? '' : LABELS[state]()}
      </span>
    </>
  );
}
