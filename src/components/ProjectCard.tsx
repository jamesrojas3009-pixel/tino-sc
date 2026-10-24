import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../data/profile';
import { BeaconLink } from '../data/beacon';
import { glass } from './theme';

// Brand logos that are a full-bleed square on a dark background: crop them to the circle instead of letterboxing
const COVER_LOGOS = ['/images/brands/obsidiana.jpg'];

// Project card: wide screenshot on top, uniform round brand logos over it, title below
export const ProjectCard: React.FC<{ link: BeaconLink; lang: Language; index: number }> = ({ link, lang, index }) => (
  <motion.a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.05 + index * 0.06 }}
    whileHover={{ y: -3 }}
    className={`group block overflow-hidden rounded-3xl text-white transition-colors hover:bg-black/70 ${glass}`}
  >
    <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
      {link.image && (
        <img
          src={link.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="absolute bottom-3 left-3 flex -space-x-2.5">
        {link.logos?.map((logo) => (
          <span key={logo} className="h-10 w-10 overflow-hidden rounded-full bg-white shadow-lg ring-2 ring-black/60">
            <img
              src={logo}
              alt=""
              loading="lazy"
              className={`h-10 w-10 ${COVER_LOGOS.includes(logo) ? 'object-cover' : 'object-contain p-1'}`}
            />
          </span>
        ))}
      </div>

      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-950 shadow-lg transition-transform group-hover:rotate-12">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>

    <div className="px-4 py-3.5">
      <h3 className="font-display text-[15px] font-bold leading-snug">{link.title[lang]}</h3>
      <p className="mt-0.5 text-xs leading-snug text-white/65">{link.subtitle[lang]}</p>
    </div>
  </motion.a>
);
