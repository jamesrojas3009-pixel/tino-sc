import React, { useEffect, useState } from 'react';
import { Check, MapPin, Share2 } from 'lucide-react';
import { Language, PROFILE } from '../data/profile';
import { BEACON_THEMES, BeaconLink, beaconCompanies, beaconCopy, beaconLinks } from '../data/beacon';
import { buildWhatsAppUrl } from '../utils/contact';
import { CompanyAccordion } from './CompanyAccordion';
import { ContactRow, ContactRowData } from './ContactRow';
import { LinkCard } from './LinkCard';
import { PillButton } from './PillButton';
import { ProjectCard } from './ProjectCard';
import { SectionLabel } from './SectionLabel';
import { TechRows } from './TechRows';
import { glass } from './theme';

// Screens, in order. Each one gets the next background image (they cycle), and is linkable as /beacon#<id>
const TAB_IDS = ['home', 'links', 'projects', 'experience', 'stack'] as const;
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
  const hrefFor = (link: BeaconLink) => (link.id === 'whatsapp' ? whatsappUrl : link.href);

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

  const contactRows: ContactRowData[] = [
    { id: 'email', icon: 'mail', label: copy.contact.email, value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { id: 'calls', icon: 'phone', label: copy.contact.calls, value: PROFILE.phoneDisplay, href: `tel:${PROFILE.phoneTel}` },
    { id: 'wa-business', icon: 'whatsapp', label: copy.contact.whatsappBusiness, value: PROFILE.whatsappDisplay, href: whatsappUrl, external: true },
    { id: 'wa-personal', icon: 'whatsapp', label: copy.contact.whatsappPersonal, value: PROFILE.whatsappPersonalDisplay, href: whatsappPersonalUrl, external: true },
    { id: 'upwork', icon: 'upwork', label: 'Upwork', value: PROFILE.upworkDisplay, href: PROFILE.upwork, external: true },
  ];

  const mainLinks = beaconLinks.filter((l) => l.group === 'main');
  const projectLinks = beaconLinks.filter((l) => l.group === 'projects');

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/75" />
        {/* Extra dark veil behind the content so text stays readable on wide screens; it grows with the layout */}
        <div className="absolute inset-y-0 left-1/2 hidden w-[52rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.45)_55%,transparent_75%)] md:block lg:w-[80rem]" />
      </div>

      {/* One column on phones, a wider centered column on tablets and a two-column layout on desktops */}
      <main className="mx-auto flex w-full max-w-[34rem] flex-col px-4 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-6 md:max-w-3xl md:pt-10 lg:max-w-6xl lg:px-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleShare}
            className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 cursor-pointer md:px-5 md:text-sm ${glass}`}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? copy.copied : copy.share}
          </button>

          <div role="group" aria-label={copy.langAria} className={`inline-flex items-center rounded-full p-1 ${glass}`}>
            {(['es', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`min-h-8 rounded-full px-3 text-xs font-bold uppercase transition-colors cursor-pointer md:min-h-9 md:px-4 md:text-sm ${
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
            <div className="lg:grid lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-14">
              {/* Main screen, left: who I am and how to reach me */}
              <div>
                <header className="mt-8 flex flex-col items-center text-center [text-shadow:0_1px_12px_rgba(0,0,0,0.95)] lg:mt-12">
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
                      className="relative h-28 w-28 rounded-full border-4 border-[#0d0d0d] object-cover object-[50%_30%] md:h-36 md:w-36"
                    />
                  </div>

                  <h1 className="mt-5 font-display text-2xl font-bold tracking-tight md:mt-6 md:text-3xl">
                    James Valentino Rojas Díaz
                    <span className="ml-1.5 font-light text-white/70">(Tino)</span>
                  </h1>
                  <p className="mt-1.5 text-sm font-medium text-white/85 md:text-base">{copy.tagline}</p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90 md:max-w-md md:text-base">{copy.bio}</p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs md:mt-5 md:text-sm">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white/85 ${glass}`}>
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {copy.location}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-medium text-emerald-200 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      {copy.availability}
                    </span>
                  </div>
                </header>

                <SectionLabel>{copy.home.contactTitle}</SectionLabel>
                <div className="flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-3 lg:flex lg:flex-col">
                  {contactRows.map((row, idx) => (
                    <ContactRow key={row.id} row={row} index={idx} />
                  ))}
                </div>
              </div>

              {/* Main screen, right: summary and the button that opens the other screens */}
              <div>
                <SectionLabel className="mt-8 lg:mt-14">{copy.home.summaryTitle}</SectionLabel>
                <div className={`rounded-3xl p-5 md:p-7 ${glass}`}>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-white/90 md:space-y-3.5 md:text-base">
                    {copy.home.summary.map((line) => (
                      <li key={line} className="flex gap-2.5 md:gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 grid grid-cols-3 gap-2 md:mt-7 md:gap-4">
                    {copy.home.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-white/15 bg-white/5 px-2 py-3 text-center md:py-5"
                      >
                        <div className="font-display text-xl font-bold md:text-3xl">{stat.value}</div>
                        <div className="mt-0.5 text-[11px] leading-tight text-white/65 md:mt-1 md:text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <PillButton onClick={() => selectTab('links')}>{copy.home.more}</PillButton>
              </div>
            </div>
          ) : (
            <>
              {/* Compact identity header, tap to return to the main screen */}
              <div className="mt-6 flex md:mt-8 md:justify-center">
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
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-white/80 object-cover object-[50%_30%] md:h-14 md:w-14"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold leading-tight md:text-lg">James Valentino Rojas Díaz</span>
                    <span className="block truncate text-xs text-white/75 md:text-sm">{copy.tagline}</span>
                  </span>
                </button>
              </div>

              {/* Centered pill bar; the five tabs fit on a phone, and it only scrolls on very narrow screens */}
              <div className="sticky top-3 z-20 mt-5 flex justify-center md:mt-6">
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
                        className={`min-h-10 shrink-0 rounded-full px-2.5 text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer max-[360px]:px-1.5 max-[360px]:text-[10.5px] sm:px-3.5 sm:text-xs md:px-6 md:text-sm ${
                          active ? 'bg-white text-slate-950' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {copy.tabs[id]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-5 md:mt-8">
                {tab === 'links' && (
                  <div className="mx-auto grid max-w-3xl gap-3 md:grid-cols-2 md:gap-4">
                    {mainLinks.map((link, idx) => (
                      <LinkCard key={link.id} link={link} lang={lang} href={hrefFor(link)} index={idx} />
                    ))}
                  </div>
                )}

                {tab === 'projects' && (
                  <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                    {projectLinks.map((link, idx) => (
                      <ProjectCard key={link.id} link={link} lang={lang} index={idx} />
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

              <PillButton onClick={() => selectTab(nextTab ?? 'home')}>
                {nextTab ? `${copy.next}: ${copy.tabs[nextTab]}` : copy.backHome}
              </PillButton>
            </>
          )}
        </div>

        <p className="mt-12 text-center text-xs text-white/50 md:mt-16 md:text-sm">{copy.footer}</p>
      </main>
    </div>
  );
};
