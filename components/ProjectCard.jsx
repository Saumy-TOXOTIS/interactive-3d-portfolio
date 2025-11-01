import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
const ProjectCard = ({
  title,
  description,
  imageUrl,
  tags,
  liveUrl,
  sourceUrl
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = e => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = py * 8;
      const ry = -px * 8;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={containerRef} className="bg-gray-800/50 backdrop-blur-md rounded-lg overflow-hidden shadow-lg border border-gray-700/50 group project-card-container project-card-glow will-change-transform">
            <div className="overflow-hidden">
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => <span key={tag} className="bg-indigo-900/50 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {tag}
                        </span>)}
                </div>
                <div className="flex items-center justify-end gap-4 mt-6">
                    <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1">
                        <Github size={20} /> Source
                    </a>
                    {liveUrl && liveUrl !== '#' && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1">
                        <ArrowUpRight size={20} /> Live
                    </a>}
                </div>
            </div>
        </div>;
};
export default ProjectCard;
