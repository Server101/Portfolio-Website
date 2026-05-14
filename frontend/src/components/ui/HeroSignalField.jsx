import React, { useEffect, useRef } from "react";

const desktopSettings = {
  count: 60,
  linkDistance: 190,
  speed: 0.42,
  radius: 2.1,
  mouseRadius: 170,
};

const mobileSettings = {
  count: 30,
  linkDistance: 130,
  speed: 0.28,
  radius: 1.65,
  mouseRadius: 110,
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function createPoint(width, height, settings) {
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
    let width = 0;
    let height = 0;
    let deviceScale = 1;
    let points = [];
    let settings = desktopSettings;
    const mouse = { x: -10000, y: -10000, active: false };
    const reduceMotion = prefersReducedMotion();

    const resetCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      settings = width < 760 ? mobileSettings : desktopSettings;

      canvas.width = Math.floor(width * deviceScale);
      canvas.height = Math.floor(height * deviceScale);
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

      const count = reduceMotion ? Math.round(settings.count * 0.45) : settings.count;
      points = Array.from({ length: count }, () => createPoint(width, height, settings));
    };

    const updateMouse = (event) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
      mouse.active = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height;
    };

    const clearMouse = () => {
      mouse.active = false;
      mouse.x = -10000;
      mouse.y = -10000;
    };

    const movePoint = (point) => {
      if (!reduceMotion) {
        point.x += point.vx;
        point.y += point.vy;
      }

      if (point.x < -20) point.x = width + 20;
      if (point.x > width + 20) point.x = -20;
      if (point.y < -20) point.y = height + 20;
      if (point.y > height + 20) point.y = -20;

      if (!mouse.active || reduceMotion) return;

      const dx = point.x - mouse.x;
      const dy = point.y - mouse.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 0 && distance < settings.mouseRadius) {
        const force = (1 - distance / settings.mouseRadius) * 0.9;
        point.x += (dx / distance) * force;
        point.y += (dy / distance) * force;
      }
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
            const alpha = (1 - distance / settings.linkDistance) * 0.2;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(245, 241, 232, ${alpha})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }
      }

      for (const point of points) {
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(245, 241, 232, 0.58)";
        context.fill();
      }

      if (mouse.active && !reduceMotion) {
        const gradient = context.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, settings.mouseRadius * 1.35);
        gradient.addColorStop(0, "rgba(245, 241, 232, 0.16)");
        gradient.addColorStop(0.4, "rgba(176, 184, 196, 0.08)");
        gradient.addColorStop(1, "rgba(245, 241, 232, 0)");
        context.fillStyle = gradient;
        context.fillRect(mouse.x - settings.mouseRadius * 1.35, mouse.y - settings.mouseRadius * 1.35, settings.mouseRadius * 2.7, settings.mouseRadius * 2.7);
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resetCanvas();
    draw();

    window.addEventListener("resize", resetCanvas);
    window.addEventListener("pointermove", updateMouse, { passive: true });
    window.addEventListener("pointerleave", clearMouse);
    window.addEventListener("blur", clearMouse);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resetCanvas);
      window.removeEventListener("pointermove", updateMouse);
      window.removeEventListener("pointerleave", clearMouse);
      window.removeEventListener("blur", clearMouse);
    };
  }, []);

  return (
    <div className="hero-signal-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
