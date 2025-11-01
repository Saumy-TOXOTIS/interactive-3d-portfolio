import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-neon-enabled';

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (_) {
      return false;
    }
  });

  useEffect(() => {
    const body = document.body;
    if (enabled) body.classList.add('theme-neon');
    else body.classList.remove('theme-neon');
    try { localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0'); } catch (_) {}
  }, [enabled]);

  return (
    <button
      aria-label="Toggle neon theme"
      onClick={() => setEnabled(v => !v)}
      className="text-white/80 hover:text-white transition-colors px-3 py-1 rounded-md border border-white/10 hover:border-white/20"
    >
      {enabled ? 'Neon On' : 'Neon Off'}
    </button>
  );
}

