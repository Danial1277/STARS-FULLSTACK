"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getConstellationById } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

export default function ConstellationClientView({ id }: { id: string }) {
  const constellation = getConstellationById(id);
  const { isFavorite, toggleFavorite, isRead, toggleRead } = useUser();

  if (!constellation) {
    notFound();
    return null;
  }

  const favorite = isFavorite(constellation.id);
  const read = isRead(constellation.id);

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 max-w-5xl mx-auto text-slate-100">
      {/* Back button */}
      <div className="mb-5">
        <Link
          href="/encyclopedia"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          ← Каталог созвездий
        </Link>
      </div>

      {/* Main constellation title and action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
              {constellation.hemisphere} полушарие
            </span>
            {constellation.zodiac && (
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300 font-mono">
                Зодиак ({constellation.dateRange})
              </span>
            )}
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold text-white">
            {constellation.name}
          </h1>
          <p className="mt-1 text-xs text-slate-400 font-mono">
            {constellation.latinName} • Код IAU: {constellation.abbreviation}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRead(constellation.id)}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              read
                ? "border-emerald-600 bg-emerald-950/40 text-emerald-200"
                : "border-slate-700 bg-slate-850 text-slate-400 hover:text-white"
            }`}
          >
            {read ? "Изучено" : "Отметить изученным"}
          </button>

          <button
            onClick={() => toggleFavorite(constellation.id)}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              favorite
                ? "border-slate-500 bg-slate-800 text-white"
                : "border-slate-700 bg-slate-850 text-slate-300 hover:text-white"
            }`}
          >
            {favorite ? "В избранном" : "В избранное"}
          </button>
        </div>
      </div>

      {/* Visual interactive diagram */}
      <div className="my-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl">
        <h2 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3">
          Схема расположения звёзд
        </h2>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#080c16] border border-slate-800">
          <svg viewBox="0 0 100 100" className="w-full h-full select-none">
            {constellation.lines.map(([iA, iB], idx) => (
              <line
                key={idx}
                x1={constellation.stars[iA]?.x}
                y1={constellation.stars[iA]?.y}
                x2={constellation.stars[iB]?.x}
                y2={constellation.stars[iB]?.y}
                stroke="#64748b"
                strokeWidth="0.8"
                strokeOpacity="0.8"
              />
            ))}

            {constellation.stars.map((star, idx) => {
              const r = Math.max(1.2, 2.8 - star.brightness * 0.3);
              return (
                <g key={idx}>
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={r * 1.8}
                    fill={star.color}
                    opacity="0.2"
                  />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={r}
                    fill={star.color}
                  />
                  <text
                    x={star.x}
                    y={star.y - (r + 1.8)}
                    fill="#e2e8f0"
                    fontSize="2.2"
                    textAnchor="middle"
                    className="font-medium"
                  >
                    {star.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <div>
            Период видимости: <span className="text-slate-200 font-medium">{constellation.season}</span>
          </div>
          <div>
            Благоприятный период наблюдения: <span className="text-slate-200 font-medium">{constellation.bestObservingTime}</span>
          </div>
          <div>
            Относительная яркость: <span className="text-slate-200 font-medium">{constellation.brightness}</span>
          </div>
        </div>
      </div>

      {/* Description & Mythology Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
            Астрономическое описание
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300 whitespace-pre-line">
            {constellation.description}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
            Историко-мифологический контекст
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-300 whitespace-pre-line">
            {constellation.mythology}
          </p>
        </div>
      </div>

      {/* Interesting Facts */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl mb-8">
        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
          Факты и примечания
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          {constellation.facts.map((fact, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-slate-500 font-mono text-xs mt-0.5">[{idx + 1}]</span>
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stars in this Constellation */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
          Основные звёзды созвездия ({constellation.stars.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {constellation.stars.map((star, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 flex items-center gap-2.5"
            >
              <div
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: star.color }}
              />
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">
                  {star.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {star.type} • {star.brightness} mag
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
