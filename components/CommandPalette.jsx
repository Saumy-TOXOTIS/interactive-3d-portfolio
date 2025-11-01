import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { NAV_LINKS } from '../constants';

export default function CommandPalette() {
  const scroll = useScroll();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  const items = useMemo(() => NAV_LINKS.map(l => ({
    id: l.href, label: l.name, action: (el) => el.scrollTo({ top: (document.querySelector(l.href)?.offsetTop || 0), behavior: 'smooth' })
  })), []);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return items;
    return items.filter(i => i.label.toLowerCase().includes(qq) || i.id.toLowerCase().includes(qq));
  }, [q, items]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else setQ('');
  }, [open]);

  const onPick = (item) => {
    const el = scroll && scroll.el;
    if (!el) return;
    item.action(el);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-24 w-[92vw] max-w-xl rounded-xl overflow-hidden border border-white/10 bg-gray-900/90 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-3 border-b border-white/10">
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search sections • Ctrl+K to toggle" className="form-input bg-gray-800/60 border-gray-700 w-full" />
        </div>
        <ul className="max-h-64 overflow-auto">
          {filtered.map(it => (
            <li key={it.id} className="px-4 py-3 text-gray-200 hover:bg-white/5 cursor-pointer" onClick={() => onPick(it)}>
              {it.label}
            </li>
          ))}
          {filtered.length === 0 && <li className="px-4 py-6 text-gray-400 text-center">No matches</li>}
        </ul>
      </div>
    </div>
  );
}

