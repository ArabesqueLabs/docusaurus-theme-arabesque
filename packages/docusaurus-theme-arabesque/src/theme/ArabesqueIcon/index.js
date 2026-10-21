import React from 'react';
import clsx from 'clsx';
import ICONS from './icons.js';

// The Arabesque icon set: 24px grid, 1.5px stroke, square caps, mitred
// joins. Icons inherit currentColor and are aria-hidden unless given a label.

// Names the theme used before 0.2.0.
const ALIASES = {'arrow-forward': 'arrow', 'chevron-forward': 'chevron'};

// Directional icons point along the reading direction, so they mirror in RTL.
const DIRECTIONAL = new Set(['arrow', 'chevron', 'external']);

export const names = Object.keys(ICONS);

export default function ArabesqueIcon({name, size = 24, label, strokeWidth = 1.5, className, ...rest}) {
  const key = ALIASES[name] ?? name;
  const a11y = label ? {role: 'img', 'aria-label': label} : {'aria-hidden': true, focusable: 'false'};
  return (
    <svg
      className={clsx('al-icon', DIRECTIONAL.has(key) && 'al-icon--flip', className)}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...a11y}
      {...rest}
      // The markup is the design system's own icon sprite, copied at sync time.
      dangerouslySetInnerHTML={{__html: ICONS[key] ?? ''}}
    />
  );
}
