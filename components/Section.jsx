import React from 'react';
const Section = ({
  id,
  title,
  children
}) => {
  return <section id={id} className="py-20 md:py-32">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    {title}
                </h2>
                <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4"></div>
            </div>
            {children}
        </section>;
};
export default Section;