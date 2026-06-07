import React, { useEffect, useRef } from "react";

const desktopSettings = {
  count: 58,
  linkDistance: 172,
  speed: 0.36,
  radius: 2.05,
  mouseRadius: 175,
};

const mobileSettings = {
  count: 28,
  linkDistance: 118,
  speed: 0.24,
  radius: 1.55,
  mouseRadius: 112,
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function createSignalPoint(width, height, settings) {
  const angle = Math.random() * Math.PI * 2;
  const velocity = settings.speed * (0.35 + Math.random() * 0.75);

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * velocity,
    vy: Math.sin(angle) * velocity,
    radius: settings.radius * (0.65 + Math.random() * 0.8),
  };
}

export default function HeroSignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let deviceScale = 1;
    let points = [];
    let settings = desktopSettings;
    const reduceMotion = prefersReducedMotion();
    const pointer = { x: -10000, y: -10000, active: false };

    const resetCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      settings = width < 760 ? mobileSettings : desktopSettings;

      canvas.width = Math.floor(width * deviceScale);
      canvas.height = Math.floor(height * deviceScale);
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

      const pointCount = reduceMotion ? Math.round(settings.count * 0.5) : settings.count;
      points = Array.from({ length: pointCount }, () => createSignalPoint(width, height, settings));
    };

    const updatePointer = (event) => {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) {
        pointer.active = false;
        return;
      }

      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;
      pointer.x = -10000;
      pointer.y = -10000;
    };

    const movePoint = (point) => {
      if (!reduceMotion) {
        point.x += point.vx;
        point.y += point.vy;
      }

      if (point.x < -24) point.x = width + 24;
      if (point.x > width + 24) point.x = -24;
      if (point.y < -24) point.y = height + 24;
      if (point.y > height + 24) point.y = -24;

      if (!pointer.active || reduceMotion) return;

      const dx = point.x - pointer.x;
      const dy = point.y - pointer.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0 && distance < settings.mouseRadius) {
        const force = (1 - distance / settings.mouseRadius) * 0.6;
        point.x += (dx / distance) * force;
        point.y += (dy / distance) * force;
      }
    };

    const drawMouseGlow = () => {
      if (!pointer.active || reduceMotion) return;

      const radius = settings.mouseRadius * 1.36;
      const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
      gradient.addColorStop(0, "rgba(245, 241, 232, 0.18)");
      gradient.addColorStop(0.4, "rgba(176, 184, 196, 0.1)");
      gradient.addColorStop(1, "rgba(245, 241, 232, 0)");

      context.fillStyle = gradient;
      context.fillRect(pointer.x - radius, pointer.y - radius, radius * 2, radius * 2);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        movePoint(point);

        for (let j = i + 1; j < points.length; j += 1) {
          const other = points[j];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);

          if (distance < settings.linkDistance) {
            const alpha = (1 - distance / settings.linkDistance) * 0.24;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(245, 241, 232, ${alpha})`;
            context.lineWidth = 0.85;
            context.stroke();
          }
        }
      }

      for (const point of points) {
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(245, 241, 232, 0.62)";
        context.fill();
      }

      drawMouseGlow();
      animationFrame = window.requestAnimationFrame(draw);
    };

    resetCanvas();
    draw();

    const resizeObserver = new ResizeObserver(resetCanvas);
    resizeObserver.observe(canvas);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    window.addEventListener("blur", clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("blur", clearPointer);
    };
  }, []);

  return (
    <div className="hero-signal-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
