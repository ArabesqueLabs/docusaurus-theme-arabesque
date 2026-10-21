import React from 'react';
import ArabesqueIcon from '@theme/ArabesqueIcon';

// The icon keeps the system's 1.5px stroke and inherits the text colour.
export default function IconClose({width, height, strokeWidth, color, ...props}) {
  return <ArabesqueIcon name="close" size={width || 24} {...props} />;
}
