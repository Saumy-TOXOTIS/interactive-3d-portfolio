import { useEffect, useMemo } from 'react';
import { useScroll } from '@react-three/drei';
import { NAV_LINKS } from '../constants';

export default function KeyboardNavigator() {
  const scroll = useScroll();

  const ids = useMemo(() => NAV_LINKS.map(l => l.href), []);

  useEffect(() => {
    const el = scroll && scroll.el;
    if (!el) return;

    const idxFor = (top) => {
      let best = 0;
      for (let i = 0; i < ids.length; i++) {
        const sec = document.querySelector(ids[i]);
        if (!sec) continue;
        if (sec.offsetTop - 40 <= top) best = i;
      }
      return best;
    };

    const goToIndex = (i) => {
      const clamped = Math.max(0, Math.min(ids.length - 1, i));
      const sec = document.querySelector(ids[clamped]);
      if (sec) el.scrollTo({ top: sec.offsetTop, behavior: 'smooth' });
    };

    const onKey = (e) => {
      // Ignore when typing in inputs
      const tag = (e.target && e.target.tagName) || '';
      if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;

      const i = idxFor(el.scrollTop);
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        goToIndex(i + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        goToIndex(i - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        el.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scroll, ids]);

  return null;
}
