'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  angle: number;
  swingSpeed: number;
  swingAmplitude: number;
  opacity: number;
  color: string;
  shapeType: number;
}

interface Firefly {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  speedX: number;
  speedY: number;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Paleta de tonos amarillos brillantes y dorados
    const petalColors = [
      '#FFD700', // Gold
      '#FFEA00', // Bright Yellow
      '#FACC15', // Amber 400
      '#F59E0B', // Warm Amber
      '#FEF08A', // Pale Soft Yellow
      '#FBBF24', // Golden Sunflower
    ];

    const petalCount = Math.min(Math.floor(width / 24), 55);
    const petals: Petal[] = [];

    const createPetal = (startY?: number): Petal => {
      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 1.3 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        angle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingAmplitude: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.45 + 0.55,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        shapeType: Math.floor(Math.random() * 3),
      };
    };

    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal());
    }

    // Luciérnagas doradas / chispitas de luz
    const fireflyCount = 25;
    const fireflies: Firefly[] = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random(),
        targetAlpha: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.2,
      });
    }

    // Dibujo de un pétalo curvado realista
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.angle * 0.5), 1); // Simula rotación 3D

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      const w = p.size * 0.7;
      const h = p.size * 1.4;

      // Forma elíptica de lágrima/pétalo de girasol
      ctx.moveTo(0, -h / 2);
      ctx.bezierCurveTo(w, -h / 3, w * 1.1, h / 3, 0, h / 2);
      ctx.bezierCurveTo(-w * 1.1, h / 3, -w, -h / 3, 0, -h / 2);
      ctx.fill();

      // Suave nervadura central en el pétalo
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
      ctx.lineWidth = 0.8;
      ctx.moveTo(0, -h / 2.5);
      ctx.lineTo(0, h / 2.5);
      ctx.stroke();

      ctx.restore();
    };

    // Al hacer clic o tocar, nacen pétalos mágicos
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 8; i++) {
        const burstPetal = createPetal(clientY + (Math.random() - 0.5) * 20);
        burstPetal.x = clientX + (Math.random() - 0.5) * 30;
        burstPetal.speedY = Math.random() * 2 + 1;
        burstPetal.speedX = (Math.random() - 0.5) * 3.5;
        petals.push(burstPetal);
        if (petals.length > 90) {
          petals.shift();
        }
      }
    };

    window.addEventListener('click', handlePointerDown);

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.66, 2.0);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Render de luciérnagas
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.x += f.speedX * delta;
        f.y += f.speedY * delta;

        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        f.alpha += (f.targetAlpha - f.alpha) * 0.03 * delta;
        if (Math.abs(f.alpha - f.targetAlpha) < 0.05) {
          f.targetAlpha = Math.random() * 0.8 + 0.1;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 120, ${f.alpha})`;
        ctx.shadowColor = '#FFEA00';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // Render de pétalos
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.angle += p.swingSpeed * delta;
        p.rotation += p.rotationSpeed * delta;
        p.y += p.speedY * delta;
        p.x += (Math.sin(p.angle) * p.swingAmplitude + p.speedX) * delta;

        drawPetal(p);

        // Reubicar cuando caen fuera de la pantalla
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
