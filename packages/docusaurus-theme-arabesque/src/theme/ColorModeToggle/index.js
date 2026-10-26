import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import IconSystemColorMode from '@theme/Icon/SystemColorMode';

// The colour mode button, as careerhunt.app's: the system's theme, light or
// dark, in turn. It shows the one in use (the half-filled disc, a sun, a
// moon) and says which comes next. Without respectPrefersColorScheme, light
// and dark only.

function nextMode(mode, respectPrefersColorScheme) {
  if (!respectPrefersColorScheme) return mode === 'dark' ? 'light' : 'dark';
  return {null: 'light', light: 'dark', dark: null}[mode];
}

function switchLabel(mode) {
  switch (mode) {
    case 'light':
      return translate({id: 'theme.colorToggle.switchTo.light', message: 'Switch to light theme', description: 'The colour mode button, when light comes next'});
    case 'dark':
      return translate({id: 'theme.colorToggle.switchTo.dark', message: 'Switch to dark theme', description: 'The colour mode button, when dark comes next'});
    default:
      return translate({id: 'theme.colorToggle.switchTo.system', message: "Switch to the system's theme", description: "The colour mode button, when the system's comes next"});
  }
}

export default React.memo(function ColorModeToggle({className, buttonClassName, respectPrefersColorScheme, value, onChange}) {
  const isBrowser = useIsBrowser();
  const next = nextMode(value, respectPrefersColorScheme);
  const label = switchLabel(next);
  return (
    <div className={clsx('al-theme-toggle', className)}>
      <button
        type="button"
        className={clsx('clean-btn', 'al-theme-toggle__button', buttonClassName)}
        onClick={() => onChange(next)}
        disabled={!isBrowser}
        title={label}
        aria-label={label}>
        {/* All three are drawn, and html[data-theme-choice] shows one, so the
            right one shows before React runs. */}
        <IconSystemColorMode className="al-theme-toggle__icon al-theme-toggle__icon--system" />
        <IconLightMode className="al-theme-toggle__icon al-theme-toggle__icon--light" />
        <IconDarkMode className="al-theme-toggle__icon al-theme-toggle__icon--dark" />
      </button>
    </div>
  );
});
