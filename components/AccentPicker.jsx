import React, { useEffect, useState } from 'react';

const KEY = 'accent-pair';
const PALETTES = [
  { a: '#6366f1', b: '#22d3ee', name: 'Indigo/Cyan' },
  { a: '#f59e0b', b: '#ef4444', name: 'Amber/Red' },
  { a: '#10b981', b: '#06b6d4', name: 'Emerald/Cyan' },
  { a: '#8b5cf6', b: '#f472b6', name: 'Violet/Pink' },
  { a: '#06b6d4', b: '#3b82f6', name: 'Cyan/Blue' }
];

export default function AccentPicker() {
  const [open, setOpen] = useState(false);
  const [pair, setPair] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
  });

  useEffect(() => {
    if (pair) {
      document.body.style.setProperty('--accent', pair.a);
      document.body.style.setProperty('--accent-2', pair.b);
      try { localStorage.setItem(KEY, JSON.stringify(pair)); } catch {}
    }
  }, [pair]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="text-white/80 hover:text-white px-3 py-1 rounded-md border border-white/10 hover:border-white/20">
        Accent
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-gray-900/90 border border-white/10 backdrop-blur-md shadow-xl z-50">
          {PALETTES.map(p => (
            <button key={p.name} onClick={() => { setPair(p); setOpen(false); }} className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/5 text-left">
              <span className="inline-flex w-5 h-5 rounded-full" style={{ background: `linear-gradient(135deg, ${p.a}, ${p.b})` }} />
              <span className="text-gray-200 text-sm">{p.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

