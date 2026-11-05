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
    };

    window.addEventListener("resize", handleResize);

    // Warm, soft cosmic palette for stars
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(254, 240, 138, ", // warm soft yellow
      "rgba(224, 231, 255, ", // soft lavender
      "rgba(186, 230, 253, ", // soft sky blue
      "rgba(254, 215, 170, ", // soft peach
    ];

    // Less dense, smoother stars (gentle on eyes)
    const starCount = Math.floor((width * height) / 6000);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.4 + 0.15,
      speed: Math.random() * 0.008 + 0.003, // much slower twinkling
      direction: Math.random() > 0.5 ? 1 : -1,
      colorPrefix: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Occasional gentle shooting star
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
    }
    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      if (shootingStars.length < 1 && Math.random() < 0.006) {
        shootingStars.push({
          x: Math.random() * (width * 0.8),
          y: Math.random() * (height * 0.4),
          length: Math.random() * 60 + 35,
          speed: Math.random() * 4 + 3,
          angle: (Math.PI / 4) + (Math.random() * 0.15 - 0.07),
          alpha: 0.65,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw soft ambient stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 0.75) {
          star.alpha = 0.75;
          star.direction = -1;
        } else if (star.alpha <= 0.12) {
          star.alpha = 0.12;
          star.direction = 1;
        }

        ctx.fillStyle = `${star.colorPrefix}${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn and draw gentle shooting stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.save();
        ctx.strokeStyle = `rgba(186, 230, 253, ${s.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
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
    <>
      <div className="pointer-events-none fixed inset-0 z-0 ambient-nebula" />
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
    </>
  );
}
