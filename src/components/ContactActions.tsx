import React, { useState } from 'react';
import { Check, Copy, FileDown, Mail, Phone } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { beaconCopy } from '../data/beacon';
import { openMailtoInGmail } from '../utils/contact';
import { UpworkIcon, WhatsAppIcon } from './BrandIcons';
import { glass, riseDelay } from './theme';

// Contact on the main screen: one primary action (WhatsApp), the email with a copy button,
// and the less used channels as a quiet row of round icons
export const ContactActions: React.FC<{
  copy: (typeof beaconCopy)['es']['contact'];
  whatsappUrl: string;
  whatsappPersonalUrl: string;
}> = ({ copy, whatsappUrl, whatsappPersonalUrl }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the address is still visible to select by hand
    }
  };

  const secondary = [
    { id: 'call', label: copy.call, title: PROFILE.phoneDisplay, href: `tel:${PROFILE.phoneTel}`, Icon: Phone },
    {
      id: 'wa-personal',
      label: copy.whatsappPersonal,
      title: `WhatsApp ${PROFILE.whatsappPersonalDisplay}`,
      href: whatsappPersonalUrl,
      Icon: WhatsAppIcon,
      external: true,
    },
    { id: 'upwork', label: 'Upwork', title: PROFILE.upworkDisplay, href: PROFILE.upwork, Icon: UpworkIcon, external: true },
    { id: 'cv', label: copy.cv, title: 'PDF', href: PROFILE.cvPdf, Icon: FileDown, download: true },
  ];

  return (
    <div className="mt-7 flex flex-col gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={riseDelay(0.1)}
        className="rise flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-sm font-bold text-white shadow-[0_10px_30px_-12px_rgba(37,211,102,0.8)] transition-transform hover:scale-[1.015] active:scale-[0.99] md:min-h-14 md:text-base"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {copy.whatsapp}
      </a>

      <div style={riseDelay(0.16)} className={`rise flex items-center gap-1 rounded-full p-1.5 ${glass}`}>
        <a
          href={`mailto:${PROFILE.email}`}
          onClick={openMailtoInGmail}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full px-3 py-2 transition-colors hover:bg-white/10"
        >
          <Mail className="h-4 w-4 shrink-0 text-white/70" aria-hidden="true" />
          <span className="truncate text-sm font-semibold md:text-[15px]">{PROFILE.email}</span>
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3.5 text-xs font-semibold transition-colors hover:bg-white/20"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? copy.copied : copy.copy}
        </button>
      </div>

      <ul style={riseDelay(0.22)} className="rise mt-2 flex justify-center gap-5 md:gap-7">
        {secondary.map(({ id, label, title, href, Icon, external, download }) => (
          <li key={id}>
            <a
              href={href}
              title={title}
              aria-label={`${label} · ${title}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              {...(download ? { download: true } : {})}
              className="group flex flex-col items-center gap-1.5 text-[11px] font-medium text-white/70 transition-colors hover:text-white md:text-xs"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-full transition-colors group-hover:bg-white/15 ${glass}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
