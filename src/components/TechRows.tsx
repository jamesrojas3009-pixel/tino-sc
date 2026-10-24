import React, { CSSProperties, useMemo } from 'react';
import { TECH_ROW_PATTERNS, beaconTech } from '../data/beacon';
import { useMediaQuery } from '../utils/useMediaQuery';

// Split the icons into zig-zag rows following a pattern; `n` is the icon's running position,
// which the CSS uses to stagger the float and to sweep the spin through the grid as a wave
const buildRows = (pattern: number[]) => {
  const rows: { tech: (typeof beaconTech)[number]; n: number }[][] = [];
  let cursor = 0;
  for (const size of pattern) {
    rows.push(beaconTech.slice(cursor, cursor + size).map((tech, i) => ({ tech, n: cursor + i })));
    cursor += size;
  }
  return rows;
};

// Stack: brand icons in centered rows (4/3 per row on phones, 6/5 on wider screens). Each floats,
// glows in its brand color and takes a turn at spinning (see index.css)
export const TechRows: React.FC = () => {
  const wide = useMediaQuery('(min-width: 768px)');
  const rows = useMemo(() => buildRows(wide ? TECH_ROW_PATTERNS.wide : TECH_ROW_PATTERNS.compact), [wide]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 py-3 md:gap-10 md:py-6">
      {rows.map((row, r) => (
        <ul key={r} className="flex justify-center gap-5 max-[360px]:gap-2 md:gap-6">
          {row.map(({ tech, n }) => (
            <li
              key={tech.slug}
              className="tech-item tech-scene rise flex w-[4.5rem] flex-col items-center gap-2 max-[360px]:w-[3.75rem] md:w-24 md:gap-3"
              style={{ '--i': n, '--glow': tech.color, '--delay': `${n * 0.045}s` } as CSSProperties}
            >
              <div className="tech-float">
                <div className="tech-tile grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-black/55 max-[360px]:h-14 max-[360px]:w-14 md:h-20 md:w-20 md:rounded-3xl">
                  <img
                    src={`/images/tech/${tech.slug}.svg`}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 md:h-10 md:w-10"
                  />
                </div>
              </div>
              <span className="text-center text-[11px] font-medium leading-tight text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.95)] md:text-sm">
                {tech.name}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
