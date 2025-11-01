import React from 'react';

export default function SkillPanel({ selected, onClear }) {
  if (!selected) return null;
  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-xs p-4 rounded-xl border border-white/10 bg-gray-900/70 backdrop-blur-md shadow-xl animate-fadeInUp">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-white font-bold text-lg">{selected}</div>
          <p className="text-gray-300 text-sm mt-1">
            {DESCRIPTIONS[selected] || 'A core technology in my toolkit.'}
          </p>
        </div>
        <button className="text-gray-400 hover:text-white" aria-label="Close" onClick={onClear}>✕</button>
      </div>
    </div>
  );
}

const DESCRIPTIONS = {
  'React': 'Modern UI library. Hooks, Suspense, concurrent patterns.',
  'Three.js': 'Low-level WebGL rendering powering the 3D world.',
  'React Three Fiber': 'React renderer for Three.js with hooks and abstractions.',
  'Tailwind CSS': 'Utility-first styling for fast design iteration.',
  'TypeScript': 'Typed APIs and safer refactors (source originally TS).',
  'JavaScript (ES6+)': 'The foundation. Async, modules, and patterns.',
};

