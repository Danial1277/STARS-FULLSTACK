"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CONSTELLATIONS, Constellation } from "@/data/constellations";

export function ConstellationHeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const current = CONSTELLATIONS[currentIndex];

  // Pick random constellation on initial mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CONSTELLATIONS.length);
    setCurrentIndex(randomIndex);
  }, []);

  // Cycle constellations every 7 seconds if playing
  useEffect(() => {
    setAnimatedProgress(0);
    const animInterval = setInterval(() => {
      setAnimatedProgress((prev) => Math.min(prev + 0.05, 1));
    }, 40);

    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % CONSTELLATIONS.length);
      }, 7000);
    }

    return () => {
      clearInterval(animInterval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CONSTELLATIONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CONSTELLATIONS.length) % CONSTELLATIONS.length);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 via-black/60 to-purple-950/20 p-4 backdrop-blur-xl sm:p-8 shadow-2xl shadow-indigo-950/50">
      {/* Header of the Hero viewer */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-indigo-900/40 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            Живая анимация неба
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {current.name}
            <span className="ml-2.5 text-base font-normal text-indigo-300">
              ({current.latinName})
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-lg">
            {current.shortDescription}
          </p>
        </div>

        {/* Animation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-800/60 bg-indigo-950/60 text-zinc-300 hover:border-cyan-400 hover:text-white transition-colors"
            title="Предыдущее созвездие"
          >
            ←
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-indigo-800/60 bg-indigo-950/60 px-3 text-xs font-medium text-zinc-300 hover:border-cyan-400 hover:text-white transition-colors"
          >
            {isPlaying ? "❚❚ Пауза" : "▶ Авто"}
          </button>
          <button
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-800/60 bg-indigo-950/60 text-zinc-300 hover:border-cyan-400 hover:text-white transition-colors"
            title="Следующее созвездие"
          >
            →
          </button>
          <Link
            href={`/encyclopedia/constellation/${current.id}`}
            className="flex h-9 items-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all"
          >
            Подробнее →
          </Link>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-indigo-900/30 bg-black/60 shadow-inner">
        {/* Soft cosmic glow in background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(67,56,202,0.15),transparent_70%)]" />

        <svg
          viewBox="0 0 100 100"
          className="relative h-full w-full select-none"
          preserveAspectRatio="none"
        >
          {/* Subtle grid lines */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#312e81" strokeWidth="0.15" strokeDasharray="1 2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#312e81" strokeWidth="0.15" strokeDasharray="1 2" />

          {/* Constellation connecting lines with draw animation */}
          {current.lines.map(([startIndex, endIndex], lineIdx) => {
            const starA = current.stars[startIndex];
            const starB = current.stars[endIndex];
            if (!starA || !starB) return null;

            return (
              <line
                key={`line-${current.id}-${lineIdx}`}
                x1={starA.x}
                y1={starA.y}
                x2={starB.x}
                y2={starB.y}
                stroke="#60a5fa"
                strokeWidth="0.4"
                strokeOpacity={0.7 * animatedProgress}
                strokeDasharray="100"
                strokeDashoffset={100 * (1 - animatedProgress)}
                style={{
                  filter: "drop-shadow(0 0 2px rgba(96, 165, 250, 0.8))",
                  transition: "stroke-dashoffset 0.8s ease-out",
                }}
              />
            );
          })}

          {/* Constellation Stars */}
          {current.stars.map((star, idx) => {
            const isHovered = hoveredStar === star.name;
            const radius = Math.max(0.9, 2.2 - (star.brightness * 0.25));

            return (
              <g
                key={`star-${current.id}-${idx}`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredStar(star.name)}
                onMouseLeave={() => setHoveredStar(null)}
              >
                {/* Outer halo */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={radius * (isHovered ? 2.5 : 1.8)}
                  fill={star.color}
                  opacity={isHovered ? 0.45 : 0.2}
                  style={{ transition: "all 0.3s ease" }}
                />

                {/* Core star */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={radius}
                  fill={star.color}
                  style={{
                    filter: `drop-shadow(0 0 ${radius * 1.5}px ${star.color})`,
                  }}
                />

                {/* Star label */}
                <text
                  x={star.x}
                  y={star.y - (radius + 1.6)}
                  fill={isHovered ? "#38bdf8" : "#94a3b8"}
                  fontSize="2.2"
                  textAnchor="middle"
                  className="pointer-events-none font-medium tracking-wide transition-colors"
                >
                  {star.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip on hover */}
        {hoveredStar && (
          <div className="absolute bottom-3 left-3 rounded-lg border border-cyan-500/40 bg-zinc-950/90 px-3 py-1.5 text-xs text-white shadow-xl backdrop-blur-md">
            <span className="font-semibold text-cyan-300">{hoveredStar}</span>
          </div>
        )}

        {/* Season & Hemisphere badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="rounded-lg bg-black/60 border border-zinc-800 px-2.5 py-1 text-[11px] text-zinc-300 backdrop-blur-md">
            {current.hemisphere} полушарие
          </span>
          <span className="rounded-lg bg-black/60 border border-zinc-800 px-2.5 py-1 text-[11px] text-cyan-300 backdrop-blur-md">
            {current.season}
          </span>
        </div>
      </div>

      {/* Thumbnails to switch directly */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CONSTELLATIONS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCurrentIndex(i)}
            className={`flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              i === currentIndex
                ? "border border-cyan-400 bg-cyan-950/50 text-white shadow-md shadow-cyan-500/20"
                : "border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
