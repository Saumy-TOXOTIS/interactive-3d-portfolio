import React, { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { PROJECTS } from '../constants';

export default function ProjectGallery() {
  const allTags = useMemo(() => {
    const s = new Set();
    PROJECTS.forEach(p => p.tags?.forEach(t => s.add(t)));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter(p => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesTag = tag === 'All' || p.tags?.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [query, tag]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${tag===t ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-800/40 border-gray-700 text-gray-300 hover:border-gray-500'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="form-input md:w-72"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((project, index) => (
          <div key={project.title} className="animate-fadeInUp" style={{ animationDelay: `${200 + index * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
            <div onClick={() => setSelected(project)}>
              <ProjectCard {...project} />
            </div>
          </div>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
