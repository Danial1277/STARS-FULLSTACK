"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CONSTELLATIONS, Constellation, StarPoint } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

export default function SkyMapPage() {
  const { toggleFavorite, isFavorite } = useUser();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [showLines, setShowLines] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [hemisphereFilter, setHemisphereFilter] = useState<string>("all");

  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null);
  const [selectedStar, setSelectedStar] = useState<{ star: StarPoint; constellation: Constellation } | null>(null);

  // Map constellations across a full celestial sky projection
  // We distribute them across sky coordinates (0 to 1000 x 0 to 600)
  const skyOffsets: Record<string, { x: number; y: number; scale: number }> = {
    "ursa-major": { x: 220, y: 150, scale: 1.6 },
    "ursa-minor": { x: 420, y: 110, scale: 1.2 },
    "cassiopeia": { x: 620, y: 140, scale: 1.4 },
    "cygnus": { x: 780, y: 220, scale: 1.5 },
    "pegasus": { x: 820, y: 380, scale: 1.5 },
    "andromeda": { x: 660, y: 290, scale: 1.4 },
    "orion": { x: 180, y: 380, scale: 1.6 },
    "canis-major": { x: 240, y: 520, scale: 1.3 },
    "taurus": { x: 380, y: 360, scale: 1.4 },
    "gemini": { x: 490, y: 310, scale: 1.4 },
    "leo": { x: 370, y: 240, scale: 1.5 },
    "scorpius": { x: 630, y: 510, scale: 1.6 },
    "aries": { x: 540, y: 420, scale: 1.2 },
    "aquarius": { x: 740, y: 470, scale: 1.4 },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.6), 3.5));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const filteredConstellations = CONSTELLATIONS.filter((c) => {
    if (hemisphereFilter === "all") return true;
    if (hemisphereFilter === "north") return c.hemisphere === "Северное";
    if (hemisphereFilter === "south") return c.hemisphere === "Южное" || c.hemisphere === "Экваториальное";
    return true;
  });

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-black text-white">
      {/* Top Map Control Toolbar */}
      <div className="z-20 flex flex-wrap items-center justify-between gap-3 border-b border-indigo-900/40 bg-zinc-950/80 px-4 py-3 backdrop-blur-md">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">✦</span> Интерактивная карта звёздного неба
          </h1>
          <p className="text-[11px] text-zinc-400">
            Перемещайте карту мышью, масштабируйте колёсиком, кликайте на звёзды и созвездия
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Hemisphere Filter */}
          <div className="flex rounded-lg border border-indigo-900/60 bg-zinc-900 p-0.5">
            <button
              onClick={() => setHemisphereFilter("all")}
              className={`rounded px-2.5 py-1 ${
                hemisphereFilter === "all" ? "bg-cyan-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Всё небо
            </button>
            <button
              onClick={() => setHemisphereFilter("north")}
              className={`rounded px-2.5 py-1 ${
                hemisphereFilter === "north" ? "bg-cyan-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Северное
            </button>
            <button
              onClick={() => setHemisphereFilter("south")}
              className={`rounded px-2.5 py-1 ${
                hemisphereFilter === "south" ? "bg-cyan-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Южное / Экват.
            </button>
          </div>

          {/* Toggles */}
          <button
            onClick={() => setShowLines(!showLines)}
            className={`rounded-lg border px-3 py-1.5 transition-colors ${
              showLines
                ? "border-cyan-500/50 bg-cyan-950/40 text-cyan-300"
                : "border-zinc-800 bg-zinc-900 text-zinc-400"
            }`}
          >
            Линии: {showLines ? "Вкл" : "Выкл"}
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`rounded-lg border px-3 py-1.5 transition-colors ${
              showLabels
                ? "border-cyan-500/50 bg-cyan-950/40 text-cyan-300"
                : "border-zinc-800 bg-zinc-900 text-zinc-400"
            }`}
          >
            Подписи: {showLabels ? "Вкл" : "Выкл"}
          </button>

          {/* Zoom buttons */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1">
            <button
              onClick={() => setZoom((z) => Math.min(z * 1.2, 3.5))}
              className="px-1.5 font-bold hover:text-cyan-400"
              title="Приблизить"
            >
              +
            </button>
            <span className="text-[11px] text-zinc-400 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z * 0.8, 0.6))}
              className="px-1.5 font-bold hover:text-cyan-400"
              title="Отдалить"
            >
              −
            </button>
            <button
              onClick={resetView}
              className="ml-1 text-[11px] text-cyan-400 hover:underline"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Viewport */}
      <div
        className="relative flex-1 cursor-grab active:cursor-grabbing overflow-hidden bg-radial-gradient select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Soft celestial grid and Milky Way band */}
        <div
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <svg
            viewBox="0 0 1000 650"
            className="w-[1000px] h-[650px] mx-auto overflow-visible"
          >
            {/* Celestial Grids */}
            <circle cx="500" cy="325" r="300" fill="none" stroke="#1e1b4b" strokeWidth="0.8" strokeDasharray="3 4" />
            <circle cx="500" cy="325" r="200" fill="none" stroke="#1e1b4b" strokeWidth="0.8" strokeDasharray="3 4" />
            <circle cx="500" cy="325" r="100" fill="none" stroke="#1e1b4b" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="500" y1="20" x2="500" y2="630" stroke="#1e1b4b" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="100" y1="325" x2="900" y2="325" stroke="#1e1b4b" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Faint milky way path */}
            <path
              d="M100 100 Q 400 300, 800 550"
              fill="none"
              stroke="rgba(99, 102, 241, 0.08)"
              strokeWidth="90"
              strokeLinecap="round"
            />

            {/* Render Constellations and their Stars */}
            {filteredConstellations.map((constellation) => {
              const pos = skyOffsets[constellation.id] || { x: 500, y: 325, scale: 1.2 };
              const isSelected = selectedConstellation?.id === constellation.id;

              return (
                <g
                  key={`map-constellation-${constellation.id}`}
                  transform={`translate(${pos.x}, ${pos.y})`}
                >
                  {/* Constellation Lines */}
                  {showLines &&
                    constellation.lines.map(([idxA, idxB], lineIdx) => {
                      const sA = constellation.stars[idxA];
                      const sB = constellation.stars[idxB];
                      if (!sA || !sB) return null;
                      return (
                        <line
                          key={`skyline-${constellation.id}-${lineIdx}`}
                          x1={(sA.x - 50) * pos.scale}
                          y1={(sA.y - 50) * pos.scale}
                          x2={(sB.x - 50) * pos.scale}
                          y2={(sB.y - 50) * pos.scale}
                          stroke={isSelected ? "#38bdf8" : "#4f46e5"}
                          strokeWidth={isSelected ? 1.4 : 0.8}
                          strokeOpacity={isSelected ? 0.9 : 0.5}
                        />
                      );
                    })}

                  {/* Constellation Name Label */}
                  {showLabels && (
                    <text
                      x="0"
                      y="-45"
                      textAnchor="middle"
                      fill={isSelected ? "#38bdf8" : "#93c5fd"}
                      fontSize="9"
                      fontWeight="bold"
                      className="cursor-pointer hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedConstellation(constellation);
                        setSelectedStar(null);
                      }}
                    >
                      {constellation.name}
                    </text>
                  )}

                  {/* Stars in this constellation */}
                  {constellation.stars.map((star, sIdx) => {
                    const sx = (star.x - 50) * pos.scale;
                    const sy = (star.y - 50) * pos.scale;
                    const r = Math.max(1.8, 4.0 - star.brightness * 0.45);

                    return (
                      <g
                        key={`map-star-${constellation.id}-${sIdx}`}
                        className="cursor-pointer group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStar({ star, constellation });
                          setSelectedConstellation(constellation);
                        }}
                      >
                        {/* Glow halo */}
                        <circle
                          cx={sx}
                          cy={sy}
                          r={r * 2.2}
                          fill={star.color}
                          opacity="0.25"
                          className="group-hover:opacity-60 transition-opacity"
                        />
                        {/* Star core */}
                        <circle
                          cx={sx}
                          cy={sy}
                          r={r}
                          fill={star.color}
                          style={{
                            filter: `drop-shadow(0 0 ${r * 2}px ${star.color})`,
                          }}
                        />
                        {/* Hover star label */}
                        <text
                          cx={sx}
                          cy={sy - r - 3}
                          x={sx}
                          y={sy - r - 3}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="6.5"
                          className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium"
                        >
                          {star.name.split(" ")[0]}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Object Info Sidebar / Panel */}
        {selectedConstellation && (
          <div className="absolute right-4 top-4 z-30 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-cyan-500/40 bg-zinc-950/90 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                  {selectedStar ? "Карточка звезды" : "Карточка созвездия"}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedStar ? selectedStar.star.name : selectedConstellation.name}
                </h3>
                <p className="text-xs text-indigo-300">
                  {selectedConstellation.latinName} ({selectedConstellation.abbreviation})
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedConstellation(null);
                  setSelectedStar(null);
                }}
                className="text-zinc-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            {selectedStar ? (
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="rounded-lg bg-indigo-950/40 p-2.5 border border-indigo-900/40">
                  <span className="text-zinc-400">Тип: </span>
                  <span className="font-medium text-white">{selectedStar.star.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-zinc-900 p-2 border border-zinc-800">
                    <span className="text-zinc-400 block text-[10px]">Яркость</span>
                    <span className="font-semibold text-cyan-300">{selectedStar.star.brightness} mag</span>
                  </div>
                  <div className="rounded-lg bg-zinc-900 p-2 border border-zinc-800">
                    <span className="text-zinc-400 block text-[10px]">Созвездие</span>
                    <span className="font-semibold text-white">{selectedConstellation.name}</span>
                  </div>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed pt-1">
                  Звезда входит в состав созвездия {selectedConstellation.name}.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-xs">
                <p className="text-zinc-300 leading-relaxed">
                  {selectedConstellation.shortDescription}
                </p>

                <div className="rounded-xl bg-indigo-950/30 p-3 border border-indigo-900/30">
                  <h4 className="text-[11px] font-semibold text-cyan-300 mb-1">
                    Мифология и история:
                  </h4>
                  <p className="text-[11px] text-zinc-300 line-clamp-3 leading-relaxed">
                    {selectedConstellation.mythology}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                  <span>Полушарие: {selectedConstellation.hemisphere}</span>
                  <span>Сезон: {selectedConstellation.season}</span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-5 flex items-center gap-2 pt-2 border-t border-zinc-850">
              <button
                onClick={() => toggleFavorite(selectedConstellation.id)}
                className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition-all ${
                  isFavorite(selectedConstellation.id)
                    ? "border-amber-500/60 bg-amber-950/40 text-amber-300"
                    : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
                }`}
              >
                {isFavorite(selectedConstellation.id) ? "★ В избранном" : "☆ В избранное"}
              </button>

              <Link
                href={`/encyclopedia/constellation/${selectedConstellation.id}`}
                className="flex-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 py-2 text-center text-xs font-semibold text-white shadow-md transition-colors"
              >
                В энциклопедию →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
