import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900/90 border border-white/10 rounded-xl max-w-3xl w-[92vw] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={project.imageUrl} alt={project.title} className="w-full max-h-[50vh] object-cover" />
          <button className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full px-3 py-1" onClick={onClose}>Close</button>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="text-gray-300 mt-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags?.map(t => (
              <span key={t} className="bg-indigo-900/50 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white" href={project.liveUrl} target="_blank" rel="noreferrer">Live</a>
            )}
            <a className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-100" href={project.sourceUrl} target="_blank" rel="noreferrer">Source</a>
          </div>
        </div>
      </div>
    </div>
  );
}
