import React, { useEffect, useRef } from 'react';

function Counter({ to, label, delay = 0 }) {
  const spanRef = useRef(null);
  useEffect(() => {
    let raf, start;
    const duration = 1200;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const value = Math.floor(to * (0.5 - Math.cos(Math.PI * p) / 2)); // easeInOut
      if (spanRef.current) spanRef.current.textContent = String(value);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const id = setTimeout(() => { raf = requestAnimationFrame(step); }, delay);
    return () => { clearTimeout(id); cancelAnimationFrame(raf); };
  }, [to, delay]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-black text-white tracking-tight"><span ref={spanRef}>0</span>+</div>
      <div className="text-sm md:text-base text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      <Counter to={80} label="Projects" />
      <Counter to={8} label="Years Experience" delay={150} />
      <Counter to={24} label="Awards" delay={300} />
      <Counter to={120} label="Happy Clients" delay={450} />
    </div>
  );
}

