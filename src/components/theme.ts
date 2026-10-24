import type { CSSProperties } from 'react';

// Dark translucent panels keep text readable over the busy backgrounds
export const glass = 'border border-white/20 bg-black/50 backdrop-blur-md';

// Start delay (seconds) of the `.rise` entrance animation, so a list of items appears one after another
export const riseDelay = (seconds: number) => ({ '--delay': `${seconds}s` }) as CSSProperties;
