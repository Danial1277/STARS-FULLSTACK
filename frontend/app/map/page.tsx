"use client";

import React, { useState } from "react";
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
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#090d16] text-slate-100">
      {/* Top Map Control Toolbar */}
      <div className="z-20 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/80 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="text-xl">🗺️</span>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Интерактивная карта звёздного неба
            </h1>
            <p className="text-[11px] text-slate-400">
              Перемещайте карту мышью, приближайте колёсиком, кликайте на звёзды
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Hemisphere Filter */}
          <div className="flex rounded-2xl border border-slate-700/60 bg-slate-900/80 p-1">
            <button
              onClick={() => setHemisphereFilter("all")}
              className={`rounded-xl px-3 py-1 font-semibold transition-all ${
                hemisphereFilter === "all" ? "bg-sky-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Всё небо
            </button>
            <button
              onClick={() => setHemisphereFilter("north")}
              className={`rounded-xl px-3 py-1 font-semibold transition-all ${
                hemisphereFilter === "north" ? "bg-sky-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Северное
            </button>
            <button
              onClick={() => setHemisphereFilter("south")}
              className={`rounded-xl px-3 py-1 font-semibold transition-all ${
                hemisphereFilter === "south" ? "bg-sky-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
              }`}
            >
              Южное
            </button>
          </div>

          {/* Toggles */}
          <button
            onClick={() => setShowLines(!showLines)}
            className={`rounded-2xl border px-3 py-1.5 font-semibold transition-colors ${
              showLines
                ? "border-sky-400/50 bg-sky-950/50 text-sky-200"
                : "border-slate-800 bg-slate-900 text-slate-400"
            }`}
          >
            Линии: {showLines ? "Вкл" : "Выкл"}
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`rounded-2xl border px-3 py-1.5 font-semibold transition-colors ${
              showLabels
                ? "border-sky-400/50 bg-sky-950/50 text-sky-200"
                : "border-slate-800 bg-slate-900 text-slate-400"
            }`}
          >
            Подписи: {showLabels ? "Вкл" : "Выкл"}
          </button>

          {/* Zoom buttons */}
          <div className="flex items-center gap-1 rounded-2xl border border-slate-800 bg-slate-900/80 px-2 py-1">
            <button
              onClick={() => setZoom((z) => Math.min(z * 1.2, 3.5))}
              className="px-2 font-bold hover:text-sky-400 text-sm"
              title="Приблизить"
            >
              +
            </button>
            <span className="text-[11px] text-slate-300 w-10 text-center font-semibold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z * 0.8, 0.6))}
              className="px-2 font-bold hover:text-sky-400 text-sm"
              title="Отдалить"
            >
              −
            </button>
            <button
              onClick={resetView}
              className="ml-1 text-[11px] font-semibold text-amber-300 hover:underline px-1"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Viewport */}
      <div
        className="relative flex-1 cursor-grab active:cursor-grabbing overflow-hidden select-none bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#090d16_100%)]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
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
            <circle cx="500" cy="325" r="300" fill="none" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 4" />
            <circle cx="500" cy="325" r="200" fill="none" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 4" />
            <circle cx="500" cy="325" r="100" fill="none" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="3 4" />
            <line x1="500" y1="20" x2="500" y2="630" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="100" y1="325" x2="900" y2="325" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />

            {/* Soft Milky Way */}
            <path
              d="M100 100 Q 400 300, 800 550"
              fill="none"
              stroke="rgba(125, 211, 252, 0.05)"
              strokeWidth="110"
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
                          stroke={isSelected ? "#38bdf8" : "#64748b"}
                          strokeWidth={isSelected ? 1.4 : 0.8}
                          strokeOpacity={isSelected ? 0.95 : 0.45}
                        />
                      );
                    })}

                  {/* Constellation Name Label */}
                  {showLabels && (
                    <text
                      x="0"
                      y="-45"
                      textAnchor="middle"
                      fill={isSelected ? "#7dd3fc" : "#94a3b8"}
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
                    const r = Math.max(2.0, 4.0 - star.brightness * 0.4);

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
                            filter: `drop-shadow(0 0 ${r * 1.5}px ${star.color})`,
                          }}
                        />
                        {/* Hover star label */}
                        <text
                          cx={sx}
                          cy={sy - r - 3}
                          x={sx}
                          y={sy - r - 3}
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize="6.5"
                          className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-semibold"
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
          <div className="absolute right-4 top-4 z-30 w-84 max-w-[calc(100vw-2rem)] rounded-3xl border border-sky-400/40 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-right duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  {selectedStar ? "⭐ Звезда" : "✨ Созвездие"}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {selectedStar ? selectedStar.star.name : selectedConstellation.name}
                </h3>
                <p className="text-xs text-indigo-300 font-mono">
                  {selectedConstellation.latinName} ({selectedConstellation.abbreviation})
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedConstellation(null);
                  setSelectedStar(null);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {selectedStar ? (
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="rounded-2xl bg-slate-800/60 p-3 border border-slate-700/50">
                  <span className="text-slate-400">Тип: </span>
                  <span className="font-semibold text-white">{selectedStar.star.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl bg-slate-800/60 p-2.5 border border-slate-700/50">
                    <span className="text-slate-400 block text-[10px]">Блеск</span>
                    <span className="font-bold text-amber-300">{selectedStar.star.brightness} mag</span>
                  </div>
                  <div className="rounded-2xl bg-slate-800/60 p-2.5 border border-slate-700/50">
                    <span className="text-slate-400 block text-[10px]">Созвездие</span>
                    <span className="font-bold text-white">{selectedConstellation.name}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-xs">
                <p className="text-slate-200 leading-relaxed">
                  {selectedConstellation.shortDescription}
                </p>

                <div className="rounded-2xl bg-slate-800/60 p-3.5 border border-slate-700/50">
                  <h4 className="text-[11px] font-bold text-amber-300 mb-1">
                    Мифология и легенда:
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                    {selectedConstellation.mythology}
                  </p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-5 flex items-center gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => toggleFavorite(selectedConstellation.id)}
                className={`flex-1 rounded-2xl border py-2.5 text-xs font-bold transition-all ${
                  isFavorite(selectedConstellation.id)
                    ? "border-amber-400 bg-amber-400/20 text-amber-200"
                    : "border-slate-700 bg-slate-800 text-slate-200 hover:text-white"
                }`}
              >
                {isFavorite(selectedConstellation.id) ? "★ В избранном" : "☆ В избранное"}
              </button>

              <Link
                href={`/encyclopedia/constellation/${selectedConstellation.id}`}
                className="flex-1 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 py-2.5 text-center text-xs font-bold text-slate-950 shadow-md transition-all hover:brightness-110"
              >
                Подробнее →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
