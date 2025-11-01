import React, { useEffect, useState } from 'react';
import { useScroll } from '@react-three/drei';

export default function ScrollProgress() {
  const scroll = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scroll && scroll.el;
    if (!el) return;
    const onScroll = () => {
      const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [scroll]);

  return (
    <div className="fixed top-1/2 right-4 -translate-y-1/2 h-64 w-1.5 bg-white/10 rounded-full overflow-hidden z-50">
      <div className="bg-indigo-500 w-full" style={{ height: `${progress * 100}%` }} />
    </div>
  );
}
