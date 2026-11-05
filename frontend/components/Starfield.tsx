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

    // Generate random twinkling stars
    const starCount = Math.floor((width * height) / 4500);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      color:
        Math.random() > 0.8
          ? "#cce6ff"
          : Math.random() > 0.6
          ? "#ffdfba"
          : "#ffffff",
    }));

    // Occasional shooting stars
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
      if (shootingStars.length < 2 && Math.random() < 0.015) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height / 2),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw starry ambient background
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.direction = -1;
        } else if (star.alpha <= 0.1) {
          star.alpha = 0.1;
          star.direction = 1;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn and draw shooting stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, " + s.alpha + ")";
        ctx.lineWidth = 1.5;
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
        s.alpha -= 0.02;

        if (s.alpha <= 0 || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
    />
  );
}
