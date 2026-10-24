import { useSyncExternalStore } from 'react';

// True while the viewport matches the CSS media query; re-renders when it changes (rotation, window resize)
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', notify);
      return () => mq.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
