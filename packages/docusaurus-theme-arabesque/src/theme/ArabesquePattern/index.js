import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {buildCells, SQRT2} from './geometry.js';

// The generative background. Fills its positioned parent
// (position: absolute; inset: 0) and is hidden from assistive tech.

function useSize(ref) {
  const [size, setSize] = useState({w: 0, h: 0});
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let timer = null;
    let last = {w: 0, h: 0};
    function measure() {
      const r = el.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      // Redraw when the width changes, or when the section outgrows the
      // drawing (it covers a quarter more), never per frame.
      if (w !== last.w || h > last.h) {
        last = {w, h: Math.round(h * 1.25)};
        setSize({w, h: last.h});
      }
    }
    measure();
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 120);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [ref]);
  return size;
}

function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function useRtl() {
  const {i18n} = useDocusaurusContext();
  return i18n.localeConfigs[i18n.currentLocale]?.direction === 'rtl';
}

export default function ArabesquePattern({
  variant = 'hero',
  angle = 67.5,
  side: sideProp,
  focal: focalProp = true,
  caption,
  animate: animateProp = true,
  fade = false,
  className,
  style,
}) {
  const ref = useRef(null);
  const {w, h} = useSize(ref);
  const rtl = useRtl();
  const narrow = w > 0 && w < 900;
  const hero = variant === 'hero';
  const side = sideProp || (hero ? (narrow ? 30 : 46) : narrow ? 22 : 32);
  const showFocal = hero && focalProp && !narrow;
  const [drawing, setDrawing] = useState(false);

  // The one unprompted animation: draw in once on first load.
  useEffect(() => {
    if (!hero || !animateProp || prefersReducedMotion()) return undefined;
    setDrawing(true);
    const t = setTimeout(() => setDrawing(false), 2700);
    return () => clearTimeout(t);
  }, [hero, animateProp]);

  // The focal tile: three quarters across and half way down (a quarter
  // across in RTL). The geometry itself never mirrors.
  const fx = hero ? (narrow ? w / 2 : w * (rtl ? 0.24 : 0.76)) : w / 2;
  const fy = hero ? (narrow ? side * (1 + SQRT2) : (h / 1.25) * 0.5) : h / 2;

  const geo = useMemo(() => {
    if (!w || !h) return null;
    const o = hero ? [fx, fy] : [(side * (1 + SQRT2)) / 2, (side * (1 + SQRT2)) / 2];
    return buildCells(side, angle, o[0], o[1], w, h, fx, fy);
  }, [w, h, side, angle, fx, fy, hero]);

  const mask = !fade
    ? null
    : narrow
      ? 'linear-gradient(to bottom, #000 170px, transparent 300px)'
      : `linear-gradient(to ${rtl ? 'left' : 'right'}, transparent 42%, #000 78%)`;
  const focal = geo && showFocal ? geo.cells.find((c) => c.key === geo.focalKey) : null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={style}
      className={clsx('al-pattern', `al-pattern--${variant}`, drawing && 'is-drawing', className)}>
      {geo && (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="al-pattern__svg"
          style={mask ? {WebkitMaskImage: mask, maskImage: mask} : undefined}>
          {hero && (
            <g className="al-pattern__scaffold">
              {geo.cells.map((c) => (
                <path key={c.key} d={c.poly} />
              ))}
            </g>
          )}
          <g className="al-pattern__strands">
            {geo.cells.map((c) => (
              <path
                key={c.key}
                d={c.star}
                pathLength={1}
                style={drawing ? {animationDelay: `${Math.round((900 * c.dist) / geo.maxD)}ms`} : undefined}
              />
            ))}
          </g>
          {focal && (
            <g className="al-pattern__focal">
              <path className="al-pattern__focal-tile" d={focal.poly} />
              <path className="al-pattern__focal-star" d={focal.star} />
            </g>
          )}
        </svg>
      )}
      {caption && focal && (
        <p
          className="al-pattern__caption"
          style={{top: `${fy + geo.D * 0.5 + 12}px`, insetInlineStart: `${rtl ? w - fx : fx}px`}}>
          {caption}
        </p>
      )}
    </div>
  );
}
