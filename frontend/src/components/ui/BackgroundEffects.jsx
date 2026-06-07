import React, { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrame = 0;

    const setPointerPosition = () => {
      background.style.setProperty("--mx", `${currentX}px`);
      background.style.setProperty("--my", `${currentY}px`);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animatePointer = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setPointerPosition();
      animationFrame = window.requestAnimationFrame(animatePointer);
    };

    setPointerPosition();

    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      animationFrame = window.requestAnimationFrame(animatePointer);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="background-effects" ref={backgroundRef} aria-hidden="true">
      <div className="luminary-atmosphere" />
      <div className="luminary-grid" />
      <div className="global-spotlight" />
      <div className="luminary-vignette" />
      <svg className="luminary-grain" width="100%" height="100%">
        <filter id="luminary-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="5" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#luminary-noise)" />
      </svg>
    </div>
  );
}
