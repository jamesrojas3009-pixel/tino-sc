import React from 'react';

export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mb-3 mt-8 px-1 font-mono-tabular text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 [text-shadow:0_1px_10px_rgba(0,0,0,0.95)]">
    {children}
  </h2>
);
