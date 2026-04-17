import React, { useEffect, useRef, useState } from 'react';

const LiquidCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const cursorRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateCapability = () => setIsEnabled(mediaQuery.matches);

    updateCapability();
    mediaQuery.addEventListener('change', updateCapability);

    return () => mediaQuery.removeEventListener('change', updateCapability);
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const cursor = cursorRef.current;
    const blob = blobRef.current;

    if (!cursor || !blob) {
      return undefined;
    }

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let frameId = 0;

    const animate = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;

      cursor.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      blob.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      frameId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleHoverState = (event) => {
      const interactive = event.target.closest('a, button, input, textarea, select, [role="button"]');
      document.body.classList.toggle('cursor-hovering', Boolean(interactive));
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleHoverState);
    document.addEventListener('mouseleave', handleLeave);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleHoverState);
      document.removeEventListener('mouseleave', handleLeave);
      document.body.classList.remove('cursor-hovering');
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className={`liquid-cursor ${isVisible ? 'is-visible' : ''}`} aria-hidden='true'>
      <span ref={blobRef} className='liquid-cursor__blob' />
      <span ref={cursorRef} className='liquid-cursor__core' />
    </div>
  );
};

export default LiquidCursor;
