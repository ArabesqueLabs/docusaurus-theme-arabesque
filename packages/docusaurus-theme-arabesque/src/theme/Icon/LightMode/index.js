import React from 'react';
import clsx from 'clsx';

// The light theme: a sun, in the system's 1.5px stroke (as careerhunt.app's
// theme button has it). The colour mode button shows it while light is chosen.
export default function IconLightMode({width = 24, height = 24, className, ...props}) {
  return (
    <svg
      className={clsx('al-icon', className)}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}
