import React from 'react';
import clsx from 'clsx';
import {usePluginData} from '@docusaurus/useGlobalData';
import {ThemeClassNames} from '@docusaurus/theme-common';
import ArabesqueMark from '@theme/ArabesqueMark';

// The footer, as on Arabesque Labs' sites: the footer's `logo` (and a line
// on what the site is) at the start, the link columns at the end, both from
// the top; the legal lines under a hairline. The logo, larger than anything
// else in the footer, says who makes the site in a comic speech bubble.
// Without a logo, the attribution is a quiet pill under the line.

// A comic speech bubble: a rounded oval with a tail sweeping out from one
// corner. Drawn tail down; the stylesheet turns it so the tail points up at
// the logo's mouth.
const BUBBLE_PATH =
  'M182 375C140 335 126 295 128 245C130 140 250 45 430 45C600 45 708 140 708 248C708 360 610 437 470 437C400 437 340 428 292 424C230 428 160 440 118 450C150 420 170 400 182 375Z';

function Bubble({attribution}) {
  return (
    <a className="al-site-footer__bubble" href={attribution.href} target="_blank" rel="noopener noreferrer">
      <svg viewBox="100 25 630 440" aria-hidden="true" focusable="false">
        <path d={BUBBLE_PATH} />
      </svg>
      <span className="al-site-footer__speech">
        <ArabesqueMark symbol="labs" variant="symbol" size={22} decorative className="al-site-footer__speech-mark" />
        <span>{attribution.label}</span>
        <span className="al-visually-hidden"> (opens in a new tab)</span>
      </span>
    </a>
  );
}

function Attribution({attribution}) {
  return (
    <a className="al-site-footer__attribution" href={attribution.href}>
      <ArabesqueMark symbol="labs" variant="symbol" size={16} decorative />
      <span>{attribution.label}</span>
    </a>
  );
}

export default function FooterLayout({style, links, logo, copyright}) {
  const {footer: about = {}} = usePluginData('docusaurus-theme-arabesque') ?? {};
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', 'al-site-footer', {
        'footer--dark': style === 'dark',
        'al-site-footer--mascot': Boolean(logo),
      })}>
      <div className="al-site-footer__inner">
        <div className="al-site-footer__top">
          {(logo || about.blurb || about.attribution) && (
            <div className="al-site-footer__about">
              {logo && (
                <div className="al-site-footer__mascot">
                  <div className="al-site-footer__dino">{logo}</div>
                  {about.attribution && <Bubble attribution={about.attribution} />}
                </div>
              )}
              {about.blurb && <p className="al-site-footer__blurb">{about.blurb}</p>}
              {about.attribution && !logo && <Attribution attribution={about.attribution} />}
            </div>
          )}
          {links}
        </div>
        {copyright && <div className="al-site-footer__bottom">{copyright}</div>}
      </div>
    </footer>
  );
}
