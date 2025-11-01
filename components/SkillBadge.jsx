import React from 'react';
const SkillBadge = ({
  skill
}) => {
  return <div className="bg-gray-800/60 border border-gray-700 text-gray-300 text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-700/60 hover:text-white transition-all duration-300 cursor-default skill-badge-glow">
            {skill}
        </div>;
};
export default SkillBadge;