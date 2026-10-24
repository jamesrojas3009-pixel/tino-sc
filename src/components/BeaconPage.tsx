import React, { useEffect, useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import { Language, PROFILE } from '../data/profile';
import { BEACON_THEMES, beaconCompanies, beaconCopy, beaconProjects } from '../data/beacon';
import { buildWhatsAppUrl } from '../utils/contact';
import { useMediaQuery } from '../utils/useMediaQuery';
import { CompanyAccordion } from './CompanyAccordion';
import { ContactActions } from './ContactActions';
import { PillButton } from './PillButton';
import { ProjectCard } from './ProjectCard';
import { SectionLabel } from './SectionLabel';
import { TechRows } from './TechRows';
import { glass } from './theme';

// Screens, in order. Each one gets its own background image, and is linkable as /beacon#<id>
const TAB_IDS = ['home', 'projects', 'experience', 'stack'] as const;
type TabId = (typeof TAB_IDS)[number];

const getInitialTab = (): TabId => {
  const hash = window.location.hash.replace('#', '');
  return (TAB_IDS as readonly string[]).includes(hash) ? (hash as TabId) : 'home';
};

export const BeaconPage: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [tab, setTab] = useState<TabId>(getInitialTab);
  const [copied, setCopied] = useState(false);
  // Only the visible background is requested at first; the others are fetched once the page has finished
  // loading, so the first screen isn't competing with them and later cross-fades are instant
  const [backgroundsWarm, setBackgroundsWarm] = useState(false);
  // Employers whose details are unfolded; the first one starts open so it's clear the cards expand
  const [openCompanies, setOpenCompanies] = useState<string[]>([beaconCompanies[0].name]);
  const toggleCompany = (name: string) =>
    setOpenCompanies((open) => (open.includes(name) ? open.filter((n) => n !== name) : [...open, name]));
  // Tablets and desktops get the section tabs in the top bar on every screen; phones keep the step-by-step flow
  const wide = useMediaQuery('(min-width: 768px)');
  const copy = beaconCopy[lang];

  const tabIdx = TAB_IDS.indexOf(tab);
  const themeIdx = tabIdx % BEACON_THEMES.length;
  const theme = BEACON_THEMES[themeIdx];
  const nextTab: TabId | undefined = TAB_IDS[tabIdx + 1];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = copy.title;
  }, [lang, copy.title]);

  useEffect(() => {
    let timer: number | undefined;
    const warmUp = () => {
      timer = window.setTimeout(() => setBackgroundsWarm(true), 1200);
    };
    if (document.readyState === 'complete') warmUp();
    else window.addEventListener('load', warmUp, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', warmUp);
    };
  }, []);

  // Keep the screen in sync if the hash is edited by hand or the user navigates back
  useEffect(() => {
    const onHashChange = () => setTab(getInitialTab());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectTab = (id: TabId) => {
    setTab(id);
    try {
      const base = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', id === 'home' ? base : `${base}#${id}`);
    } catch {
      // history API unavailable: the screen still switches, it just isn't reflected in the URL
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = buildWhatsAppUrl(copy.whatsappMessage, PROFILE.whatsappPhone);
  const whatsappPersonalUrl = buildWhatsAppUrl(copy.whatsappMessage, PROFILE.whatsappPersonalPhone);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: copy.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // user dismissed the share sheet or clipboard is blocked: nothing to do
    }
  };

  const tabBar = (
    <div
      role="tablist"
      aria-label="Secciones"
      className={`inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full p-1 [scrollbar-width:none] ${glass}`}
    >
      {TAB_IDS.map((id) => {
        const active = tab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-selected={active}
            aria-controls={`panel-${id}`}
            onClick={(e) => {
              selectTab(id);
              e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
            }}
            className={`min-h-10 shrink-0 rounded-full px-3 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer max-[360px]:px-2 md:px-5 md:text-sm ${
              active ? 'bg-white text-slate-950' : 'text-white/70 hover:text-white'
            }`}
          >
            {copy.tabs[id]}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative min-h-dvh overflow-x-hidden text-white">
      {/* Background: one image per screen, cross-faded; the glows only show if an image is missing */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-[#0d0d0d]">
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute top-1/2 -right-32 h-[26rem] w-[26rem] rounded-full bg-sky-500/20 blur-3xl" />

        {BEACON_THEMES.map((t, idx) => (
          <div
            key={t.id}
            className={`absolute inset-0 bg-center transition-opacity duration-700 ${
              t.desktop === 'tile' ? 'bg-cover md:bg-[length:720px_auto] md:bg-repeat md:bg-top' : 'bg-cover'
            } ${idx === themeIdx ? 'opacity-100' : 'opacity-0'}`}
            style={idx === themeIdx || backgroundsWarm ? { backgroundImage: `url(${t.image})` } : undefined}
          />
        ))}

        <div className="absolute inset-0 bg-black transition-opacity duration-700" style={{ opacity: theme.scrim }} />
        {/* Darker on big screens, where the busy backgrounds fill much more space around the text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/75 md:from-black/65 md:via-black/60 md:to-black/80" />
      </div>

      {/* One column on phones, a wider centered column on tablets and a two-column layout on desktops */}
      <main className="mx-auto flex w-full max-w-[34rem] flex-col px-4 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6 md:max-w-3xl md:pt-8 lg:max-w-6xl lg:px-10">
        {/* Top bar; on tablets and desktops it also holds the section tabs and stays pinned while scrolling */}
        <div className="flex items-center justify-between gap-3 md:sticky md:top-4 md:z-30">
          <button
            type="button"
            onClick={handleShare}
            aria-label={copy.share}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 cursor-pointer md:text-sm lg:px-5 ${glass}`}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Share2 className="h-4 w-4" />}
            <span className={wide ? 'hidden lg:inline' : ''}>{copied ? copy.copied : copy.share}</span>
          </button>

          {wide && tabBar}

          <div role="group" aria-label={copy.langAria} className={`inline-flex items-center rounded-full p-1 ${glass}`}>
            {(['es', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`min-h-8 rounded-full px-3 text-xs font-bold uppercase transition-colors cursor-pointer md:min-h-9 md:px-3.5 md:text-sm ${
                  lang === code ? 'bg-white text-slate-950' : 'text-white/70 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        <div key={tab} className="rise">
          {tab === 'home' ? (
            <div className="lg:mx-auto lg:grid lg:max-w-5xl lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pt-6">
              {/* Main screen, left: who I am and how to reach me */}
              <div>
                <header className="mt-8 flex flex-col items-center text-center [text-shadow:0_1px_12px_rgba(0,0,0,0.95)] md:mt-12">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-white via-slate-300 to-slate-500 opacity-90 blur-[2px]"
                    />
                    <img
                      src={PROFILE.portraitImage}
                      alt="James Valentino Rojas Díaz"
                      width={112}
                      height={112}
                      fetchPriority="high"
                      decoding="async"
                      className="relative h-28 w-28 rounded-full border-4 border-[#0d0d0d] object-cover object-[50%_30%] md:h-32 md:w-32"
                    />
                  </div>

                  <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
                    James Valentino Rojas Díaz
                    <span className="ml-1.5 font-light text-white/70">(Tino)</span>
                  </h1>
                  <p className="mt-1.5 text-sm font-medium text-white/85 text-balance md:text-base">{copy.tagline}</p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90 text-balance md:text-base">{copy.bio}</p>

                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-white/75 md:text-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {copy.location} · <span className="text-emerald-200">{copy.availability}</span>
                  </p>
                </header>

                <ContactActions
                  copy={copy.contact}
                  whatsappUrl={whatsappUrl}
                  whatsappPersonalUrl={whatsappPersonalUrl}
                />
              </div>

              {/* Main screen, right: summary */}
              <div>
                <SectionLabel className="mt-10 lg:mt-0">{copy.home.summaryTitle}</SectionLabel>
                <div className={`rounded-3xl p-5 md:p-7 ${glass}`}>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-white/90 md:space-y-3 md:text-[15px]">
                    {copy.home.summary.map((line) => (
                      <li key={line} className="flex gap-2.5 md:gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 grid grid-cols-3 border-t border-white/10 pt-5 md:mt-7 md:pt-6">
                    {copy.home.stats.map((stat) => (
                      <div key={stat.label} className="px-1 text-center">
                        <div className="font-display text-xl font-bold md:text-3xl">{stat.value}</div>
                        <div className="mt-0.5 text-[11px] leading-tight text-white/60 md:mt-1 md:text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {!wide && <PillButton onClick={() => selectTab('projects')}>{copy.home.more}</PillButton>}
              </div>
            </div>
          ) : (
            <>
              {/* Compact identity header, tap to return to the main screen */}
              <div className="mt-6 flex md:mt-10 md:justify-center">
                <button
                  type="button"
                  onClick={() => selectTab('home')}
                  aria-label={copy.tabs.home}
                  className="flex min-w-0 max-w-full cursor-pointer items-center gap-3 text-left [text-shadow:0_1px_12px_rgba(0,0,0,0.95)]"
                >
                  <img
                    src={PROFILE.portraitImage}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-white/80 object-cover object-[50%_30%]"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold leading-tight md:text-lg">James Valentino Rojas Díaz</span>
                    <span className="block truncate text-xs text-white/75 md:text-sm">{copy.tagline}</span>
                  </span>
                </button>
              </div>

              {/* Phones: centered pill bar under the header, pinned while scrolling */}
              {!wide && <div className="sticky top-3 z-20 mt-5 flex justify-center">{tabBar}</div>}

              <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-5 md:mt-8">
                {tab === 'projects' && (
                  <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                    {beaconProjects.map((project, idx) => (
                      <ProjectCard key={project.id} project={project} lang={lang} index={idx} />
                    ))}
                  </div>
                )}

                {/* Where I have worked: one dropdown per employer with the details of each position */}
                {tab === 'experience' && (
                  <ul className="mx-auto flex max-w-3xl flex-col gap-3 md:gap-4">
                    {beaconCompanies.map((company) => (
                      <CompanyAccordion
                        key={company.name}
                        company={company}
                        lang={lang}
                        open={openCompanies.includes(company.name)}
                        onToggle={() => toggleCompany(company.name)}
                      />
                    ))}
                  </ul>
                )}

                {tab === 'stack' && <TechRows />}
              </div>

              {!wide && (
                <PillButton onClick={() => selectTab(nextTab ?? 'home')}>
                  {nextTab ? `${copy.next}: ${copy.tabs[nextTab]}` : copy.backHome}
                </PillButton>
              )}
            </>
          )}
        </div>

        <p className="mt-12 text-center text-xs text-white/50 md:mt-16 md:text-sm">{copy.footer}</p>
      </main>
    </div>
  );
};
