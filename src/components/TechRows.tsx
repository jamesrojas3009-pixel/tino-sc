import React from 'react';
import { TECH_ROW_PATTERN, beaconTech } from '../data/beacon';
import { glass } from './theme';

// Split the icons into zig-zag rows following TECH_ROW_PATTERN; `n` is a running index used to desync animations
const techRows = (() => {
  const rows: { tech: (typeof beaconTech)[number]; n: number }[][] = [];
  let cursor = 0;
  for (const size of TECH_ROW_PATTERN) {
    rows.push(beaconTech.slice(cursor, cursor + size).map((tech, i) => ({ tech, n: cursor + i })));
    cursor += size;
  }
  return rows;
})();

// Stack: brand icons in centered rows, each one floating while its tile spins
export const TechRows: React.FC = () => (
  <div className="flex flex-col items-center gap-7 py-3">
    {techRows.map((row, r) => (
      <ul key={r} className="flex justify-center gap-5">
        {row.map(({ tech, n }) => (
          <li key={tech.slug} className="tech-scene flex w-[4.5rem] flex-col items-center gap-2">
            <div className="tech-float" style={{ animationDelay: `-${((n * 0.7) % 3.6).toFixed(2)}s` }}>
              <div
                className={`tech-spin grid h-16 w-16 place-items-center rounded-2xl ${glass}`}
                style={{ animationDelay: `-${((n * 1.3) % 9).toFixed(2)}s` }}
              >
                <img src={`/images/tech/${tech.slug}.svg`} alt="" className="h-8 w-8" />
              </div>
            </div>
            <span className="text-center text-[11px] font-medium leading-tight text-white/75 [text-shadow:0_1px_8px_rgba(0,0,0,0.95)]">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    ))}
  </div>
);
