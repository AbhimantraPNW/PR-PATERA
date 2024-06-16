'use client';

import { useState } from 'react';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setHoverTimeout(
      setTimeout(() => {
        setIsHovered(true);
      }, 3000) // seconds delay
    );
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHovered(false);
  };

  return (
    <section
      className="scenes w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="scene-1"></div>
      <div className={`scene-2 ${isHovered ? 'hovered' : ''}`}></div>
    </section>
  );
};

export default Hero;
