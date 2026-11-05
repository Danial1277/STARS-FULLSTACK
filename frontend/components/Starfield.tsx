"use client";

import React, { useEffect, useRef } from "react";

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Realistic stellar spectral colors based on Morgan-Keenan classification
    // Class O/B (blue-white), A (pure white), F (yellow-white), G (yellow), K (orange), M (reddish)
    const spectralColors = [
      { r: 202, g: 220, b: 255 }, // B - Blue-white
      { r: 240, g: 244, b: 255 }, // A - White
      { r: 255, g: 250, b: 235 }, // F - Warm white
      { r: 255, g: 232, b: 180 }, // G - Yellowish
      { r: 255, g: 204, b: 153 }, // K - Orange
      { r: 255, g: 170, b: 150 }, // M - Reddish
    ];

    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      currentAlpha: number;
      twinkleSpeed: number;
      phase: number;
      color: { r: number; g: number; b: number };
    }

    let stars: Star[] = [];

    const initStars = () => {
      // Density of stars in night sky
      const count = Math.floor((width * height) / 2800);
      stars = Array.from({ length: count }, () => {
        // Apparent magnitude distribution: many dim stars, very few bright ones
        const rand = Math.random();
        let radius = 0.5;
        let baseAlpha = 0.25;

        if (rand > 0.98) {
          radius = 1.6;
          baseAlpha = 0.85;
        } else if (rand > 0.90) {
          radius = 1.1;
          baseAlpha = 0.65;
        } else if (rand > 0.65) {
          radius = 0.8;
          baseAlpha = 0.45;
        } else {
          radius = 0.45;
          baseAlpha = 0.22;
        }

        const color = spectralColors[Math.floor(Math.random() * spectralColors.length)];

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha,
          currentAlpha: baseAlpha,
          twinkleSpeed: 0.005 + Math.random() * 0.012,
          phase: Math.random() * Math.PI * 2,
          color,
        };
      });
    };

    initStars();

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Smooth sinusoidal twinkle like real atmospheric seeing
        const flicker = Math.sin(time * star.twinkleSpeed + star.phase);
        star.currentAlpha = Math.max(0.08, star.baseAlpha + flicker * 0.18);

        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle diffraction glow for the brightest stars
        if (star.radius > 1.2 && star.currentAlpha > 0.6) {
          ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${star.currentAlpha * 0.12})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
    />
  );
}
