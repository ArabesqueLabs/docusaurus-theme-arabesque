import React from 'react';
import clsx from 'clsx';

// The dark theme: a crescent moon, in the system's 1.5px stroke (as
// careerhunt.app's theme button has it). The colour mode button shows it
// while dark is chosen.
export default function IconDarkMode({width = 24, height = 24, className, ...props}) {
  return (
    <svg
      className={clsx('al-icon', className)}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}>
      <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z" />
    </svg>
  );
}
