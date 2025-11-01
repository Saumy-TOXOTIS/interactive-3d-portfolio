import { useEffect } from 'react';
const CustomCursor = () => {
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const moveCursor = e => {
      if (cursorDot && cursorOutline) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Let CSS handle the smooth follow animation for better performance
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
      }
      // Update parallax background position
      document.body.style.setProperty('--mx', `${e.clientX}px`);
      document.body.style.setProperty('--my', `${e.clientY}px`);
    };
    const addLinkHover = () => document.body.classList.add('cursor-link-hover');
    const removeLinkHover = () => document.body.classList.remove('cursor-link-hover');
    window.addEventListener('mousemove', moveCursor);

    // Use a function to query elements so it can be re-used in the cleanup function
    const getInteractiveElements = () => document.querySelectorAll('a, button');
    getInteractiveElements().forEach(el => {
      el.addEventListener('mouseover', addLinkHover);
      el.addEventListener('mouseleave', removeLinkHover);
    });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      getInteractiveElements().forEach(el => {
        el.removeEventListener('mouseover', addLinkHover);
        el.removeEventListener('mouseleave', removeLinkHover);
      });
    };
  }, []);
  return null; // This component does not render anything itself
};
export default CustomCursor;
