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
    <div className="relative mx-auto w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7 backdrop-blur-xl shadow-xl">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
              {current.hemisphere} полушарие
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              IAU: {current.abbreviation}
            </span>
          </div>

          <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {current.name}
            <span className="ml-2 text-sm font-normal text-slate-400 font-mono">
              ({current.latinName})
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {current.shortDescription}
          </p>
        </div>

        {/* Animation controls without emojis */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            title="Предыдущее созвездие"
            aria-label="Предыдущее"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-9 items-center rounded-lg border border-slate-700 bg-slate-800/80 px-3 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
          >
            {isPlaying ? "Пауза" : "Автосмена"}
          </button>
          <button
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            title="Следующее созвездие"
            aria-label="Следующее"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Link
            href={`/encyclopedia/constellation/${current.id}`}
            className="flex h-9 items-center rounded-lg bg-slate-100 hover:bg-white px-3.5 text-xs font-semibold text-slate-900 transition-colors"
          >
            В энциклопедию
          </Link>
        </div>
      </div>

      {/* SVG Projection Canvas */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-800/90 bg-[#080c16] shadow-inner">
        <svg
          viewBox="0 0 100 100"
          className="relative h-full w-full select-none"
          preserveAspectRatio="none"
        >
          {/* Constellation connecting lines */}
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
                stroke="#64748b"
                strokeWidth="0.5"
                strokeOpacity={0.8 * animatedProgress}
                strokeDasharray="100"
                strokeDashoffset={100 * (1 - animatedProgress)}
                style={{
                  transition: "stroke-dashoffset 0.6s ease-out",
                }}
              />
            );
          })}

          {/* Stars */}
          {current.stars.map((star, idx) => {
            const isHovered = hoveredStar === star.name;
            const radius = Math.max(0.9, 2.2 - (star.brightness * 0.22));

            return (
              <g
                key={`star-${current.id}-${idx}`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredStar(star.name)}
                onMouseLeave={() => setHoveredStar(null)}
              >
                {/* Subtle halo */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={radius * (isHovered ? 2.4 : 1.7)}
                  fill={star.color}
                  opacity={isHovered ? 0.35 : 0.15}
                  style={{ transition: "all 0.2s ease" }}
                />

                {/* Star center */}
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={radius}
                  fill={star.color}
                />

                {/* Star label */}
                <text
                  x={star.x}
                  y={star.y - (radius + 2)}
                  fill={isHovered ? "#93c5fd" : "#94a3b8"}
                  fontSize="2.2"
                  fontWeight="500"
                  textAnchor="middle"
                  className="pointer-events-none select-none transition-colors"
                >
                  {star.name.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover info tooltip */}
        {hoveredStar && (
          <div className="absolute bottom-3 left-3 rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-1.5 text-xs text-slate-200 shadow-md">
            <span className="font-semibold text-white">{hoveredStar}</span>
          </div>
        )}

        {/* Season indicator */}
        <div className="absolute top-3 right-3">
          <span className="rounded-md bg-slate-900/90 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-300">
            Наблюдение: {current.season}
          </span>
        </div>
      </div>

      {/* Direct Selection Pills */}
      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CONSTELLATIONS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCurrentIndex(i)}
            className={`flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              i === currentIndex
                ? "bg-slate-700 text-white"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
