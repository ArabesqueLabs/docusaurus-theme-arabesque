import React from 'react';
import ArabesqueIcon from '@theme/ArabesqueIcon';

// The icon keeps the system's 1.5px stroke and inherits the text colour.
export default function IconMenu({width, height, strokeWidth, color, ...props}) {
  return <ArabesqueIcon name="menu" size={width || 24} {...props} />;
}
