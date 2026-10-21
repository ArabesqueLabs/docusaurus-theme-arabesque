import React from 'react';
import ArabesqueIcon from '@theme/ArabesqueIcon';

// As in the design system's theme button: one icon, the half-filled disc,
// turned half a turn when the page is dark. Never a sun or a moon.
export default function IconDarkMode({width, height, ...props}) {
  return <ArabesqueIcon name="theme" size={width || 24} {...props} />;
}
