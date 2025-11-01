import React, { Suspense, lazy, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
const Experience = lazy(() => import('./components/Scene').then(m => ({ default: m.Experience })));
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
import Stats from './components/Stats';
import SkillPanel from './components/SkillPanel';
const ProjectGallery = lazy(() => import('./components/ProjectGallery'));
import SkillBadge from './components/SkillBadge';
import CustomCursor from './components/CustomCursor';
import ContactForm from './components/ContactForm';
import { PROJECTS, SKILLS } from './constants';
import Timeline from './components/Timeline';
import ScrollProgress from './components/ScrollProgress';
import KeyboardNavigator from './components/KeyboardNavigator';
import CommandPalette from './components/CommandPalette';
const App = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const lowQuality = typeof window !== 'undefined' && (window.devicePixelRatio > 2 || window.matchMedia && (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches));
  return <>
            <CustomCursor />
            <Canvas className="fixed inset-0" camera={{
      position: [0, 0, 3],
      fov: 75
    }}>
                <Suspense fallback={null}>
                    <ScrollControls pages={6} damping={0.25}>
                        <Suspense fallback={null}>
                          <Experience onSelectSkill={setSelectedSkill} quality={lowQuality ? 'low' : 'high'} />
                        </Suspense>
                        <Scroll html style={{
            width: '100%'
          }}>
                            <div className="relative z-10">
                                <Header />
                                <main className="container mx-auto px-6 md:px-12">
                                    <Hero />

                                    <Section id="about" title="About Me">
                                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed text-center animate-fadeInUp" style={{
                    animationDelay: '0.2s'
                  }}>
                                            I'm a passionate Senior Frontend Engineer with a knack for creating beautiful, functional, and user-centric web applications. With over 8 years of experience, I specialize in the React ecosystem, TypeScript, and modern UI/UX design. I thrive on solving complex problems and turning innovative ideas into reality. This 3D portfolio is a small showcase of my love for combining code with creative design.
                                        </p>
                                        <Stats />
                                    </Section>

                                    <Section id="experience" title="Experience">
                                        <Timeline />
                                    </Section>

                                    <Section id="projects" title="My Work">
                                        <Suspense fallback={null}>
                                          <ProjectGallery />
                                        </Suspense>
                                    </Section>

                                    <Section id="skills" title="My Arsenal">
                                         <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                            {SKILLS.map((skill, index) => <div key={index} className="animate-fadeInUp" style={{
                      animationDelay: `${200 + index * 50}ms`,
                      opacity: 0,
                      animationFillMode: 'forwards'
                    }}>
                                                    <SkillBadge skill={skill} />
                                                </div>)}
                                        </div>
                                    </Section>

                                    <Section id="contact" title="Get In Touch">
                                        <div className="text-center max-w-2xl mx-auto">
                                            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fadeInUp" style={{
                      animationDelay: '0.2s'
                    }}>
                                                I'm currently open to new opportunities and collaborations. Have a question or just want to say hi? I’ll try my best to get back to you!
                                            </p>
                                            <div className="animate-fadeInUp" style={{
                      animationDelay: '0.4s'
                    }}>
                                                <ContactForm />
                                            </div>
                                            <div className="flex justify-center gap-6 mt-12 animate-fadeInUp" style={{
                      animationDelay: '0.6s'
                    }}>
                                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors"><Twitter size={28} /></a>
                                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors"><Github size={28} /></a>
                                                <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors"><Linkedin size={28} /></a>
                                                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-indigo-400 transition-colors"><Mail size={28} /></a>
                                            </div>
                                        </div>
                                    </Section>
                                </main>

                                <footer className="text-center py-8 mt-16 border-t border-gray-800/50">
                                    <p className="text-gray-500">&copy; {new Date().getFullYear()} John Doe. All Rights Reserved.</p>
                                </footer>
                            </div>
                            {/* Context-bound UI */}
                            <ScrollProgress />
                            <KeyboardNavigator />
                            <CommandPalette />
                        </Scroll>
                    </ScrollControls>
                </Suspense>
            </Canvas>
            <Loader />
            <SkillPanel selected={selectedSkill} onClear={() => setSelectedSkill(null)} />
        </>;
};
export default App;
