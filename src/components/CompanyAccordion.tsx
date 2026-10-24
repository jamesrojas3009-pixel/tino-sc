import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { Language } from '../data/profile';
import { BeaconCompany } from '../data/beacon';
import { ExperienceItem, experienceItems } from '../data/experience';
import { glass } from './theme';

// One employer: logo, role and dates always visible; tapping it unfolds each position's details from the CV
export const CompanyAccordion: React.FC<{
  company: BeaconCompany;
  lang: Language;
  open: boolean;
  onToggle: () => void;
}> = ({ company, lang, open, onToggle }) => {
  const positions = company.itemIds
    .map((id) => experienceItems[lang].find((item) => item.id === id))
    .filter((item): item is ExperienceItem => Boolean(item));
  const panelId = `experience-${company.itemIds[0]}`;

  return (
    <li className={`overflow-hidden rounded-2xl ${glass}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center gap-4 p-3 text-left transition-colors hover:bg-white/5"
      >
        <span
          className="flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/20"
          style={{ backgroundColor: company.tile }}
        >
          <img src={company.logo} alt="" loading="lazy" className="h-full w-full object-contain" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[15px] font-bold leading-snug">{company.name}</span>
          <span className="mt-0.5 block text-xs leading-snug text-white/70">{company.role[lang]}</span>
          <span className="mt-1 block font-mono-tabular text-[11px] text-white/50">{company.period[lang]}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 border-t border-white/15 px-4 pb-4 pt-3.5">
              {positions.map((position, idx) => (
                <div key={position.id} className={idx > 0 ? 'border-t border-white/10 pt-4' : ''}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <h3 className="font-display text-[13px] font-bold">{position.role}</h3>
                    <span className="font-mono-tabular text-[11px] text-white/50">{position.period}</span>
                  </div>
                  {position.company !== company.name && (
                    <p className="text-[11px] text-white/50">{position.company}</p>
                  )}
                  <p className="mt-1.5 text-xs leading-relaxed text-white/75">{position.summary}</p>
                  <ul className="mt-2 space-y-1">
                    {position.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-2 text-xs leading-relaxed">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {position.tools.map((tool) => (
                      <li key={tool} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-medium text-white/80">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
