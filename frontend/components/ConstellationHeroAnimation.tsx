"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CONSTELLATIONS } from "@/data/constellations";

export function ConstellationHeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const current = CONSTELLATIONS[currentIndex];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CONSTELLATIONS.length);
    setCurrentIndex(randomIndex);
  }, []);

  useEffect(() => {
    setAnimatedProgress(0);
    const animInterval = setInterval(() => {
      setAnimatedProgress((prev) => Math.min(prev + 0.04, 1));
    }, 35);

    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % CONSTELLATIONS.length);
      }, 7500);
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
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-slate-700/50 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-indigo-950/40 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-indigo-950/30">
      {/* Header of the Hero viewer */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              Живое созвездие сейчас
            </span>
            <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 font-medium">
              {current.hemisphere} небо
            </span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            {current.name}
            <span className="text-sm font-normal text-indigo-300">
              ({current.latinName})
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            {current.shortDescription}
          </p>
        </div>

        {/* Animation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:border-sky-400 hover:text-white transition-all shadow-sm"
            title="Предыдущее созвездие"
          >
            ←
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 items-center gap-1.5 rounded-2xl border border-slate-700/60 bg-slate-800/60 px-3.5 text-xs font-semibold text-slate-300 hover:border-sky-400 hover:text-white transition-all shadow-sm"
          >
            {isPlaying ? "❚❚ Пауза" : "▶ Смотреть"}
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-800/60 text-slate-300 hover:border-sky-400 hover:text-white transition-all shadow-sm"
            title="Следующее созвездие"
          >
            →
          </button>
          <Link
            href={`/encyclopedia/constellation/${current.id}`}
            className="flex h-10 items-center rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:brightness-110 transition-all"
          >
            История и звёзды →
          </Link>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-inner">
        {/* Soft cosmic glow in background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.18),transparent_70%)]" />

        <svg
          viewBox="0 0 100 100"
          className="relative h-full w-full select-none"
          preserveAspectRatio="none"
        >
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
                stroke="#7dd3fc"
                strokeWidth="0.55"
                strokeOpacity={0.8 * animatedProgress}
                strokeDasharray="100"
                strokeDashoffset={100 * (1 - animatedProgress)}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(125, 211, 252, 0.6))",
                  transition: "stroke-dashoffset 0.7s ease-out",
                }}
              />
            );
          })}

          {/* Constellation Stars */}
          {current.stars.map((star, idx) => {
            const isHovered = hoveredStar === star.name;
            const radius = Math.max(1.1, 2.4 - (star.brightness * 0.25));

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
                  r={radius * (isHovered ? 2.6 : 1.9)}
                  fill={star.color}
                  opacity={isHovered ? 0.5 : 0.22}
                  style={{ transition: "all 0.3s ease" }}
                />

                {/* Core star */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={radius}
                  fill={star.color}
                  style={{
                    filter: `drop-shadow(0 0 ${radius * 2}px ${star.color})`,
                  }}
                />

                {/* Star label */}
                <text
                  x={star.x}
                  y={star.y - (radius + 2)}
                  fill={isHovered ? "#38bdf8" : "#cbd5e1"}
                  fontSize="2.4"
                  fontWeight="600"
                  textAnchor="middle"
                  className="pointer-events-none select-none transition-colors"
                >
                  {star.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating tooltip on hover */}
        {hoveredStar && (
          <div className="absolute bottom-4 left-4 rounded-xl border border-sky-400/40 bg-slate-900/90 px-3.5 py-2 text-xs text-white shadow-xl backdrop-blur-md">
            <span className="font-bold text-sky-300">✦ {hoveredStar}</span>
            <span className="block text-[10px] text-slate-300 mt-0.5">Кликните, чтобы изучить подробнее</span>
          </div>
        )}

        {/* Season & Hemisphere badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
          <span className="rounded-xl bg-slate-900/80 border border-slate-700/60 px-3 py-1 text-xs text-slate-200 backdrop-blur-md shadow-sm">
            🔭 Сезон: <strong className="text-amber-300">{current.season}</strong>
          </span>
        </div>
      </div>

      {/* Thumbnails to switch directly */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CONSTELLATIONS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCurrentIndex(i)}
            className={`flex-shrink-0 rounded-2xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              i === currentIndex
                ? "border border-amber-400/70 bg-gradient-to-r from-amber-400/20 to-sky-400/20 text-white shadow-sm"
                : "border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
