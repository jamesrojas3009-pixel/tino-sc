import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../data/profile';
import { BeaconLink } from '../data/beacon';
import { ICONS, ICON_TONE, glass, riseDelay } from './theme';

export const LinkCard: React.FC<{ link: BeaconLink; lang: Language; href: string; index: number }> = ({
  link,
  lang,
  href,
  index,
}) => {
  const Icon = link.icon ? ICONS[link.icon] : null;
  const featured = link.featured;

  return (
    <a
      href={href}
      {...(link.download ? { download: true } : {})}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={riseDelay(0.05 + index * 0.06)}
      className={`rise group flex items-center gap-4 rounded-[1.75rem] p-3 pr-5 transition-[transform,background-color] duration-200 hover:scale-[1.015] active:scale-[0.99] md:gap-5 md:p-4 md:pr-6 ${
        featured
          ? 'bg-white text-slate-950 shadow-[0_0_44px_-10px_rgba(255,255,255,0.65)]'
          : `${glass} text-white hover:bg-white/15`
      }`}
    >
      {Icon && (
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl md:h-14 md:w-14 md:rounded-2xl ${
            link.icon ? ICON_TONE[link.icon] ?? 'bg-white/15' : ''
          }`}
        >
          <Icon className="h-6 w-6 md:h-7 md:w-7" />
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block font-display text-[15px] font-bold leading-snug md:text-lg">{link.title[lang]}</span>
        <span
          className={`mt-0.5 block text-xs leading-snug md:text-sm ${featured ? 'text-slate-900/75' : 'text-white/65'}`}
        >
          {link.subtitle[lang]}
        </span>
      </span>

      <ArrowUpRight
        className={`h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          featured ? 'text-slate-900/70' : 'text-white/60'
        }`}
        aria-hidden="true"
      />
    </a>
  );
};
