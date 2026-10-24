import type { ComponentType, CSSProperties } from 'react';
import { FileDown, Mail, Phone } from 'lucide-react';
import { UpworkIcon, WhatsAppIcon } from './BrandIcons';
import { BeaconIcon } from '../data/beacon';

// Dark translucent panels keep text readable over the busy backgrounds
export const glass = 'border border-white/20 bg-black/50 backdrop-blur-md';

// Start delay (seconds) of the `.rise` entrance animation, so a list of cards appears one after another
export const riseDelay = (seconds: number) => ({ '--delay': `${seconds}s` }) as CSSProperties;

export const ICONS: Record<BeaconIcon, ComponentType<{ className?: string }>> = {
  cv: FileDown,
  whatsapp: WhatsAppIcon,
  upwork: UpworkIcon,
  mail: Mail,
  phone: Phone,
};

export const ICON_TONE: Partial<Record<BeaconIcon, string>> = {
  cv: 'bg-slate-950/10 text-slate-950',
  whatsapp: 'bg-[#25D366] text-white', // WhatsApp brand green
  upwork: 'bg-[#14a800] text-white', // Upwork brand green
  mail: 'bg-white/10 text-white',
  phone: 'bg-white/10 text-white',
};
