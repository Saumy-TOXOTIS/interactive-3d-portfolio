import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useScroll } from '@react-three/drei';
const Hero = () => {
  const scroll = useScroll();
  const handleScrollDown = e => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    if (aboutSection && scroll?.el) {
      scroll.el.scrollTo({
        top: aboutSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  return <section className="h-screen flex flex-col justify-center items-center text-center relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none animate-fadeInUp">
                Shaurya Tiwari
            </h1>
            <p className="mt-4 text-xl md:text-2xl lg:text-3xl font-medium text-indigo-400 tracking-wide animate-fadeInUp" style={{
      animationDelay: '0.2s'
    }}>
                MTech Student • IIT Roorkee · Web Developer · ML Enthusiast
            </p>
            <div className="absolute bottom-10 animate-bounce">
                <a href="#about" aria-label="Scroll to about section" onClick={handleScrollDown}>
                    <ArrowDown size={32} className="text-gray-500" />
                </a>
            </div>
        </section>;
};
export default Hero;
