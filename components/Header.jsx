import React, { useState, useEffect, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { NAV_LINKS } from '../constants';
import ThemeToggle from './ThemeToggle';
import AccentPicker from './AccentPicker';
import ScreenshotButton from './ScreenshotButton';
import { Menu, X } from 'lucide-react';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('#about');
  const headerRef = useRef(null);
  const scroll = useScroll();
    useEffect(() => {
      const scrollContainer = scroll.el;
      if (!scrollContainer) return; // guard until ScrollControls mounts
      const handleScroll = () => {
        // Only compute active section; keep header pinned (no hide-on-scroll)
        const currentScrollY = scrollContainer.scrollTop;
        const sections = ['#about', '#experience', '#projects', '#skills', '#contact'];
        let current = '#about';
        for (const id of sections) {
          const el = document.querySelector(id);
          if (!el) continue;
          if (el.offsetTop - 120 <= currentScrollY) current = id;
        }
        setActive(current);
      };
      handleScroll();
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, [scroll]);
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      scroll.el.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };
  const handleLogoClick = e => {
    e.preventDefault();
    scroll.el.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out animate-fadeInUp" style={{
    animationDelay: '0.5s'
  }}>
            <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center bg-gray-900/30 backdrop-blur-lg border-b border-gray-500/10">
                <a href="#" className="text-2xl font-black tracking-tighter text-white" onClick={handleLogoClick}>
                    ST<span className="text-indigo-500">.</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {NAV_LINKS.map(link => <a key={link.name} href={link.href} onClick={e => handleLinkClick(e, link.href)} className={`transition-colors duration-300 font-medium ${active===link.href ? 'text-white' : 'text-gray-300 hover:text-indigo-400'}`}>
                            {link.name}
                        </a>)}
                        <ThemeToggle />
                        <AccentPicker />
                        <ScreenshotButton />
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <AccentPicker />
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

                {/* Mobile Navigation */}
            {isOpen && <div className="md:hidden bg-gray-900/80 backdrop-blur-xl">
                    <nav className="flex flex-col items-center gap-6 py-8">
                        {NAV_LINKS.map(link => <a key={link.name} href={link.href} className={`text-lg transition-colors duration-300 ${active===link.href ? 'text-white' : 'text-gray-200 hover:text-indigo-400'}`} onClick={e => handleLinkClick(e, link.href)}>
                                {link.name}
                            </a>)}
                        <div className="flex gap-3 mt-4">
                          <AccentPicker />
                          <ScreenshotButton />
                        </div>
                    </nav>
                </div>}
        </header>;
};
export default Header;
