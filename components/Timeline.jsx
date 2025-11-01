import React from 'react';
import { TIMELINE } from '../constants';

export default function Timeline() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10" />
      <ul className="space-y-10">
        {TIMELINE.map((item, i) => (
          <li key={i} className="relative flex md:block items-start gap-4">
            <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-indigo-600 ring-4 ring-indigo-600/20" />
            <div className="bg-gray-800/50 border border-white/10 rounded-xl p-5 backdrop-blur-md shadow-lg w-full">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-white font-bold">{item.role}</h3>
                <span className="text-xs text-indigo-300 bg-indigo-900/40 rounded-full px-2 py-1">{item.period}</span>
              </div>
              <div className="text-gray-300 mt-1">{item.company}</div>
              <ul className="list-disc list-inside text-gray-400 mt-3 space-y-1">
                {item.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

