import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGmailComposeUrl, buildWhatsAppUrl } from './contact';

test('buildWhatsAppUrl builds a wa.me link with the encoded message', () => {
  assert.equal(
    buildWhatsAppUrl('  Hola Tino, ¿hablamos?  ', '+51 981 223 330'),
    'https://wa.me/51981223330?text=Hola%20Tino%2C%20%C2%BFhablamos%3F'
  );
});

test('buildWhatsAppUrl falls back to the generic link when the phone is missing or too short', () => {
  assert.equal(buildWhatsAppUrl('Hola'), 'https://api.whatsapp.com/send?text=Hola');
  assert.equal(buildWhatsAppUrl('Hola', '12345'), 'https://api.whatsapp.com/send?text=Hola');
});

test('buildGmailComposeUrl opens the Gmail composer for a plain mailto', () => {
  assert.equal(
    buildGmailComposeUrl('mailto:jamesrojas3009@gmail.com'),
    'https://mail.google.com/mail/?view=cm&fs=1&to=jamesrojas3009%40gmail.com'
  );
});

test('buildGmailComposeUrl carries over the subject and body', () => {
  const mailto = `mailto:jamesrojas3009@gmail.com?subject=${encodeURIComponent('Proyecto web')}&body=${encodeURIComponent('Hola & gracias')}`;
  const parsed = new URL(buildGmailComposeUrl(mailto));
  assert.equal(parsed.origin, 'https://mail.google.com');
  assert.equal(parsed.searchParams.get('to'), 'jamesrojas3009@gmail.com');
  assert.equal(parsed.searchParams.get('su'), 'Proyecto web');
  assert.equal(parsed.searchParams.get('body'), 'Hola & gracias');
});
