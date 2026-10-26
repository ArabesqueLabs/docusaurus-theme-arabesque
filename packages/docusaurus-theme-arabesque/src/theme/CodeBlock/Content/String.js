import React from 'react';
import CodeBlockString from '@theme-init/CodeBlock/Content/String';
import {CodeBlockCaptionContext, parseCaption} from '../../../code-block.js';

// The classic code block, with the fence's caption="…" passed down to the
// window (CodeBlock/Layout), which shows it under the code.
export default function CodeBlockStringWithCaption(props) {
  return (
    <CodeBlockCaptionContext.Provider value={parseCaption(props.metastring)}>
      <CodeBlockString {...props} />
    </CodeBlockCaptionContext.Provider>
  );
}
