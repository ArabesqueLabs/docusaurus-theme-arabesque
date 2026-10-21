import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';

// Admonitions as Arabesque notices: the kind's icon beside a title word and
// the message, on the kind's wash with a rule at the start edge. Colour is
// never the only signal.
export default function AdmonitionLayout({type, icon, title, children, className, id}) {
  return (
    <div
      id={id}
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        'al-admonition',
        className,
      )}>
      <span className="al-admonition__icon">{icon}</span>
      <div className="al-admonition__body">
        {title && <span className="al-admonition__title">{title}</span>}
        {children && <div className="al-admonition__content">{children}</div>}
      </div>
    </div>
  );
}
