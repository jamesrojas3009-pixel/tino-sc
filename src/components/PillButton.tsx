import React from 'react';
import { ArrowRight } from 'lucide-react';

export const PillButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="group mt-8 flex w-full cursor-pointer items-center justify-between rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-950 shadow-[0_0_44px_-10px_rgba(255,255,255,0.65)] transition-transform hover:scale-[1.015] active:scale-[0.99] md:mx-auto md:max-w-md md:py-5 md:text-base"
  >
    <span>{children}</span>
    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
  </button>
);
