import React from 'react';
import ArabesqueIcon from '@theme/ArabesqueIcon';

// The system's theme: the design system's half-filled disc. The colour mode
// button shows it while the page follows the system.
export default function IconSystemColorMode({width, height, ...props}) {
  return <ArabesqueIcon name="theme" size={width || 24} {...props} />;
}
