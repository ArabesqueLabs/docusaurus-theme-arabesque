import React from 'react';
import clsx from 'clsx';
import {usePluginData} from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {ThemeClassNames} from '@docusaurus/theme-common';
import badgeEnDark from '../../../../assets/logos/badges/product-of-en-dark-star@2x.png';
import badgeEnLight from '../../../../assets/logos/badges/product-of-en-light-star@2x.png';
import badgeArDark from '../../../../assets/logos/badges/product-of-ar-dark-star@2x.png';
import badgeArLight from '../../../../assets/logos/badges/product-of-ar-light-star@2x.png';

// The footer, as on Arabesque Labs' sites: the footer's `logo` (and a line
// on what the site is) at the start, the link columns at the end, both from
// the top; the legal lines under a hairline. The logo says `greeting` in a
// comic speech bubble. Under the legal lines, who makes the site: the design
// system's attribution badge, "A product of Arabesque Labs".

// A comic speech bubble: a rounded oval with a tail sweeping out from one
// corner. Drawn tail down; the stylesheet turns it so the tail points up at
// the logo's mouth.
const BUBBLE_PATH =
  'M182 375C140 335 126 295 128 245C130 140 250 45 430 45C600 45 708 140 708 248C708 360 610 437 470 437C400 437 340 428 292 424C230 428 160 440 118 450C150 420 170 400 182 375Z';

// The badges, @2x, at their drawn size: the dark pill on the light theme,
// the light pill on the dark.
const BADGES = {
  en: {dark: badgeEnDark, light: badgeEnLight, width: 253, height: 35},
  ar: {dark: badgeArDark, light: badgeArLight, width: 247, height: 37},
};

function Bubble({greeting}) {
  return (
    <div className="al-site-footer__bubble">
      <svg viewBox="100 25 630 440" aria-hidden="true" focusable="false">
        <path d={BUBBLE_PATH} />
      </svg>
      <span className="al-site-footer__speech">{greeting}</span>
    </div>
  );
}

function Attribution({attribution}) {
  const {i18n} = useDocusaurusContext();
  const badge = BADGES[i18n.currentLocale.startsWith('ar') ? 'ar' : 'en'];
  return (
    <a className="al-site-footer__attribution" href={attribution.href} target="_blank" rel="noopener noreferrer">
      <img className="al-site-footer__badge--on-light" src={badge.dark} width={badge.width} height={badge.height} alt={attribution.label} />
      <img className="al-site-footer__badge--on-dark" src={badge.light} width={badge.width} height={badge.height} alt={attribution.label} />
      <span className="al-visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

export default function FooterLayout({style, links, logo, copyright}) {
  const {footer: about = {}} = usePluginData('docusaurus-theme-arabesque') ?? {};
  const greeting = about.greeting ?? 'Hello, world!';
  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', 'al-site-footer', {
        'footer--dark': style === 'dark',
        'al-site-footer--mascot': Boolean(logo),
      })}>
      <div className="al-site-footer__inner">
        <div className="al-site-footer__top">
          {(logo || about.blurb) && (
            <div className="al-site-footer__about">
              {logo && (
                <div className="al-site-footer__mascot">
                  <div className="al-site-footer__dino">{logo}</div>
                  {greeting && <Bubble greeting={greeting} />}
                </div>
              )}
              {about.blurb && <p className="al-site-footer__blurb">{about.blurb}</p>}
            </div>
          )}
          {links}
        </div>
        {(copyright || about.attribution) && (
          <div className="al-site-footer__bottom">
            {copyright}
            {about.attribution && <Attribution attribution={about.attribution} />}
          </div>
        )}
      </div>
    </footer>
  );
}
