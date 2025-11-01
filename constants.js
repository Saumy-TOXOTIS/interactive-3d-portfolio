export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];
export const PROJECTS = [
  {
    title: 'Meteorite Classifier App',
    description:
      'Full‑stack meteorite texture classifier. React + Vite frontend uploads images to a Flask API that serves a TensorFlow/Keras CNN (MeteorT) to estimate metal vs. silicate composition with visual preview.',
    imageUrl: '/images/meteorite.svg',
    tags: ['React', 'Vite', 'Flask', 'Python', 'TensorFlow', 'Keras', 'Computer Vision', 'CNN'],
    liveUrl: '',
    sourceUrl: 'https://github.com/CyberXshaurya/meteorite-classifier-app',
  },
];
export const SKILLS = ['React', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Next.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'GraphQL', 'REST APIs', 'Webpack', 'Vite', 'CI/CD', 'Jest', 'React Testing Library', 'Figma', 'UI/UX Design'];
export const TIMELINE = [
  {
    role: 'Senior Frontend Engineer',
    company: 'TechNova Labs',
    period: '2022 — Present',
    highlights: [
      'Led migration to micro‑frontends with Module Federation',
      'Shipped 3D product configurator (R3F + Drei)',
      'Improved Lighthouse performance from 72 → 96'
    ]
  },
  {
    role: 'Frontend Engineer',
    company: 'PixelForge',
    period: '2019 — 2022',
    highlights: [
      'Built design system adopted across 5 teams',
      'Reduced bundle size by 35% via code‑splitting',
      'Introduced automated visual regression testing'
    ]
  },
  {
    role: 'UI Engineer',
    company: 'Creatify Studio',
    period: '2016 — 2019',
    highlights: [
      'Launched marketing microsites with rich motion',
      'Mentored interns; ran weekly UI/UX workshops'
    ]
  }
];
