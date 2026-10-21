import React from 'react';
import clsx from 'clsx';

// A numbered sequence: a 1px rule above each item, the number in primary.
// Only for real sequences.
export default function ArabesqueSteps({items = [], columns = false, className}) {
  return (
    <ol className={clsx('al-steps', columns && 'al-steps--cols', className)} role="list">
      {items.map((item, i) => (
        <li key={i} className="al-steps__item">
          <span className="al-steps__num" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="al-steps__title">{item.title}</h3>
          {item.body && <p className="al-steps__body">{item.body}</p>}
        </li>
      ))}
    </ol>
  );
}
