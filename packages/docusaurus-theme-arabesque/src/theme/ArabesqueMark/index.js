import React from 'react';
import clsx from 'clsx';

// The marks' artwork is a brand asset of Arabesque Labs Ltd.: all rights
// reserved, not covered by this package's MIT licence (see NOTICE.md). The
// component's code around it is MIT.
//
// Exact geometry from the design system's Logos. Always one colour
// (currentColor), never mirrored, even in RTL.

// Arabesque's own mark: four tiles, two by two, at a 2.4-unit stroke.
const ARABESQUE_TILES =
  'M4.69 -4.69L2.75 0L4.69 4.69L0 2.75L-4.69 4.69L-2.75 0L-4.69 -4.69L0 -2.75L4.69 -4.69Z M4.69 27.31L2.75 32L4.69 36.69L0 34.75L-4.69 36.69L-2.75 32L-4.69 27.31L0 29.25L4.69 27.31Z M4.69 59.31L2.75 64L4.69 68.69L0 66.75L-4.69 68.69L-2.75 64L-4.69 59.31L0 61.25L4.69 59.31Z M36.69 -4.69L34.75 0L36.69 4.69L32 2.75L27.31 4.69L29.25 0L27.31 -4.69L32 -2.75L36.69 -4.69Z M32 16L24 19.31L27.31 27.31L19.31 24L16 32L12.69 24L4.69 27.31L8 19.31L0 16L8 12.69L4.69 4.69L12.69 8L16 0L19.31 8L27.31 4.69L24 12.69L32 16Z M36.69 27.31L34.75 32L36.69 36.69L32 34.75L27.31 36.69L29.25 32L27.31 27.31L32 29.25L36.69 27.31Z M32 48L24 51.31L27.31 59.31L19.31 56L16 64L12.69 56L4.69 59.31L8 51.31L0 48L8 44.69L4.69 36.69L12.69 40L16 32L19.31 40L27.31 36.69L24 44.69L32 48Z M36.69 59.31L34.75 64L36.69 68.69L32 66.75L27.31 68.69L29.25 64L27.31 59.31L32 61.25L36.69 59.31Z M68.69 -4.69L66.75 0L68.69 4.69L64 2.75L59.31 4.69L61.25 0L59.31 -4.69L64 -2.75L68.69 -4.69Z M64 16L56 19.31L59.31 27.31L51.31 24L48 32L44.69 24L36.69 27.31L40 19.31L32 16L40 12.69L36.69 4.69L44.69 8L48 0L51.31 8L59.31 4.69L56 12.69L64 16Z M68.69 27.31L66.75 32L68.69 36.69L64 34.75L59.31 36.69L61.25 32L59.31 27.31L64 29.25L68.69 27.31Z M64 48L56 51.31L59.31 59.31L51.31 56L48 64L44.69 56L36.69 59.31L40 51.31L32 48L40 44.69L36.69 36.69L44.69 40L48 32L51.31 40L59.31 36.69L56 44.69L64 48Z M68.69 59.31L66.75 64L68.69 68.69L64 66.75L59.31 68.69L61.25 64L59.31 59.31L64 61.25L68.69 59.31Z';

// The Arabesque Labs mark: one tile, centred on an octagon, 3.2-unit stroke.
const LABS_CORNERS =
  'M9.37 -9.37L5.49 0L9.37 9.37L0 5.49L-9.37 9.37L-5.49 0L-9.37 -9.37L0 -5.49Z M73.37 -9.37L69.49 0L73.37 9.37L64 5.49L54.63 9.37L58.51 0L54.63 -9.37L64 -5.49Z M9.37 54.63L5.49 64L9.37 73.37L0 69.49L-9.37 73.37L-5.49 64L-9.37 54.63L0 58.51Z M73.37 54.63L69.49 64L73.37 73.37L64 69.49L54.63 73.37L58.51 64L54.63 54.63L64 58.51Z';
const LABS_STAR =
  'M64 32L48 38.63L54.63 54.63L38.63 48L32 64L25.37 48L9.37 54.63L16 38.63L0 32L16 25.37L9.37 9.37L25.37 16L32 0L38.63 16L54.63 9.37L48 25.37Z';

function Symbol({symbol, size}) {
  const labs = symbol === 'labs';
  const stroke = labs ? 3.2 : 2.4;
  const inset = stroke / 2;
  return (
    <svg
      className="al-mark__symbol"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinejoin="miter"
      style={{overflow: 'hidden'}}
      aria-hidden="true"
      focusable="false">
      {labs ? (
        <>
          <path d={LABS_CORNERS} />
          <path d={LABS_STAR} />
        </>
      ) : (
        <path d={ARABESQUE_TILES} />
      )}
      <rect x={inset} y={inset} width={64 - stroke} height={64 - stroke} />
    </svg>
  );
}

export default function ArabesqueMark({
  symbol = 'arabesque',
  variant = 'horizontal',
  size = 32,
  wordmark,
  label,
  decorative = false,
  className,
}) {
  const word = wordmark ?? (symbol === 'labs' ? 'Arabesque Labs' : 'Arabesque');
  const a11y = decorative ? {'aria-hidden': true} : {role: 'img', 'aria-label': label || word};
  if (variant === 'symbol') {
    return (
      <span className={clsx('al-mark', 'al-mark--symbol', className)} {...a11y}>
        <Symbol symbol={symbol} size={size} />
      </span>
    );
  }
  return (
    <span className={clsx('al-mark', `al-mark--${variant}`, className)} dir="ltr" {...a11y}>
      <Symbol symbol={symbol} size={size} />
      <span
        className="al-mark__word"
        style={{fontSize: `${Math.round(size * (variant === 'stacked' ? 0.4 : 0.62))}px`}}
        aria-hidden="true">
        {word}
      </span>
    </span>
  );
}
