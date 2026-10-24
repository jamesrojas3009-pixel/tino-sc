import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../data/profile';
import { BeaconLink } from '../data/beacon';
import { ICONS, ICON_TONE, glass } from './theme';

export const LinkCard: React.FC<{ link: BeaconLink; lang: Language; href: string; index: number }> = ({
  link,
  lang,
  href,
  index,
}) => {
  const Icon = link.icon ? ICONS[link.icon] : null;
  const featured = link.featured;

  return (
    <motion.a
      href={href}
      {...(link.download ? { download: true } : {})}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 + index * 0.06 }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className={`group flex items-center gap-4 rounded-[1.75rem] p-3 pr-5 transition-colors ${
        featured
          ? 'bg-white text-slate-950 shadow-[0_0_44px_-10px_rgba(255,255,255,0.65)]'
          : `${glass} text-white hover:bg-white/15`
      }`}
    >
      {Icon && (
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
            link.icon ? ICON_TONE[link.icon] ?? 'bg-white/15' : ''
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block font-display text-[15px] font-bold leading-snug">{link.title[lang]}</span>
        <span className={`mt-0.5 block text-xs leading-snug ${featured ? 'text-slate-900/75' : 'text-white/65'}`}>
          {link.subtitle[lang]}
        </span>
      </span>

      <ArrowUpRight
        className={`h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          featured ? 'text-slate-900/70' : 'text-white/60'
        }`}
        aria-hidden="true"
      />
    </motion.a>
  );
};
