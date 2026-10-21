import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import ArabesqueIcon from '@theme/ArabesqueIcon';
import ArabesquePattern from '@theme/ArabesquePattern';

// The homepage hero, as on arabesquelabs.com: the pattern behind one display
// heading, a lede, one primary action and a text link.
export default function ArabesqueHero({
  title,
  lede,
  primary,
  secondary,
  caption,
  pattern = true,
  className,
  children,
}) {
  return (
    <header className={clsx('al-hero', className)}>
      {pattern && <ArabesquePattern caption={caption} />}
      <div className="al-hero__text">
        <h1 className="al-display">{title}</h1>
        {lede && <p className="al-lede">{lede}</p>}
        {(primary || secondary) && (
          <div className="al-hero__actions">
            {primary && (
              <Link className="button button--primary" to={primary.to}>
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link className="al-link al-link--arrow" to={secondary.to}>
                {secondary.label}
                <ArabesqueIcon name="arrow" size={20} className="al-link__arrow" />
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </header>
  );
}
