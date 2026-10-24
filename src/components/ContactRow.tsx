import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BeaconIcon } from '../data/beacon';
import { openMailtoInGmail } from '../utils/contact';
import { ICONS, ICON_TONE, glass, riseDelay } from './theme';

export interface ContactRowData {
  id: string;
  icon: BeaconIcon;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const ContactRow: React.FC<{ row: ContactRowData; index: number }> = ({ row, index }) => {
  const Icon = ICONS[row.icon];
  return (
    <a
      href={row.href}
      {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(row.href.startsWith('mailto:') ? { onClick: openMailtoInGmail } : {})}
      style={riseDelay(0.15 + index * 0.05)}
      className={`rise group flex items-center gap-3.5 rounded-2xl p-2.5 pr-4 text-white transition-[transform,background-color] duration-200 hover:scale-[1.015] hover:bg-white/15 ${glass}`}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${ICON_TONE[row.icon] ?? 'bg-white/10 text-white'}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/55">{row.label}</span>
        <span className="block truncate font-display text-[15px] font-bold leading-snug">{row.value}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
};
