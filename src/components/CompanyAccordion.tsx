import React from 'react';
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
        className="flex w-full cursor-pointer items-center gap-4 p-3 text-left transition-colors hover:bg-white/5 md:gap-5 md:p-4"
      >
        <span
          className="flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/20 md:h-16 md:w-28"
          style={{ backgroundColor: company.tile }}
        >
          <img
            src={company.logo}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[15px] font-bold leading-snug md:text-lg">{company.name}</span>
          <span className="mt-0.5 block text-xs leading-snug text-white/70 md:text-sm">{company.role[lang]}</span>
          <span className="mt-1 block font-mono-tabular text-[11px] text-white/50 md:text-xs">{company.period[lang]}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Height animates through the grid row (0fr -> 1fr); `inert` keeps the closed content out of tab order */}
      <div
        id={panelId}
        role="region"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-4 border-t border-white/15 px-4 pb-4 pt-3.5 md:gap-5 md:px-6 md:pb-6 md:pt-5">
            {positions.map((position, idx) => (
              <div key={position.id} className={idx > 0 ? 'border-t border-white/10 pt-4 md:pt-5' : ''}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <h3 className="font-display text-[13px] font-bold md:text-base">{position.role}</h3>
                  <span className="font-mono-tabular text-[11px] text-white/50 md:text-xs">{position.period}</span>
                </div>
                {position.company !== company.name && (
                  <p className="text-[11px] text-white/50 md:text-xs">{position.company}</p>
                )}
                <p className="mt-1.5 text-xs leading-relaxed text-white/75 md:text-sm">{position.summary}</p>
                <ul className="mt-2 space-y-1">
                  {position.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2 text-xs leading-relaxed md:text-sm">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {position.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-medium text-white/80 md:px-3 md:py-1 md:text-xs"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};
