import type { MouseEvent } from 'react';

/**
 * Builds a WhatsApp URL with a pre-filled message. Without a usable phone number it
 * falls back to the generic share link, where the visitor picks the chat.
 */
export function buildWhatsAppUrl(message: string, phone?: string): string {
  const encodedText = encodeURIComponent(message.trim());
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
  if (cleanPhone.length >= 9) {
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

/**
 * Turns a mailto: URL into the equivalent Gmail web composer URL (recipient, subject and body carried over)
 */
export function buildGmailComposeUrl(mailto: string): string {
  const url = new URL(mailto);
  const parts = [`view=cm`, `fs=1`, `to=${encodeURIComponent(decodeURIComponent(url.pathname))}`];
  const subject = url.searchParams.get('subject');
  const body = url.searchParams.get('body');
  if (subject) parts.push(`su=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `https://mail.google.com/mail/?${parts.join('&')}`;
}

/**
 * Click handler for mailto: links. Desktop browsers often have no mail app registered for mailto:
 * (the click then silently does nothing), so there it opens Gmail's web composer instead;
 * touch devices keep the native mailto: flow, and modified clicks (new tab, etc.) are left alone.
 */
export function openMailtoInGmail(event: MouseEvent<HTMLAnchorElement>): void {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const href = event.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('mailto:')) return;
  event.preventDefault();
  window.open(buildGmailComposeUrl(href), '_blank', 'noopener,noreferrer');
}
