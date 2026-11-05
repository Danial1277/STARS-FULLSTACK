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
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto text-white">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/encyclopedia"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-300 transition-colors"
        >
          ← Назад в энциклопедию
        </Link>
      </div>

      {/* Main constellation title and action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-950 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-950 border border-indigo-800 px-2.5 py-0.5 text-xs text-cyan-300">
              {constellation.hemisphere} полушарие
            </span>
            {constellation.zodiac && (
              <span className="rounded-md bg-purple-950 border border-purple-800 px-2.5 py-0.5 text-xs text-purple-300">
                Зодиакальное созвездие ({constellation.dateRange})
              </span>
            )}
          </div>
          <h1 className="mt-2 text-3xl sm:text-5xl font-black text-white">
            {constellation.name}
          </h1>
          <p className="mt-1 text-sm text-indigo-300 font-mono">
            {constellation.latinName} • Сокращение: {constellation.abbreviation}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleRead(constellation.id)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
              read
                ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {read ? "✓ Прочитано" : "Отметить прочитанным"}
          </button>

          <button
            onClick={() => toggleFavorite(constellation.id)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
              favorite
                ? "border-amber-500/60 bg-amber-950/40 text-amber-300"
                : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white"
            }`}
          >
            {favorite ? "★ В избранном" : "☆ В избранное"}
          </button>
        </div>
      </div>

      {/* Visual interactive diagram */}
      <div className="my-8 rounded-3xl border border-indigo-900/50 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <h2 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase mb-4 flex items-center gap-2">
          <span>✧</span> Небесная схема созвездия
        </h2>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black border border-indigo-950">
          <svg viewBox="0 0 100 100" className="w-full h-full select-none">
            {/* Constellation lines */}
            {constellation.lines.map(([iA, iB], idx) => (
              <line
                key={idx}
                x1={constellation.stars[iA]?.x}
                y1={constellation.stars[iA]?.y}
                x2={constellation.stars[iB]?.x}
                y2={constellation.stars[iB]?.y}
                stroke="#38bdf8"
                strokeWidth="0.8"
                strokeOpacity="0.75"
                style={{ filter: "drop-shadow(0 0 2px rgba(56, 189, 248, 0.8))" }}
              />
            ))}

            {/* Stars */}
            {constellation.stars.map((star, idx) => {
              const r = Math.max(1.2, 2.8 - star.brightness * 0.3);
              return (
                <g key={idx}>
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={r * 2}
                    fill={star.color}
                    opacity="0.3"
                  />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={r}
                    fill={star.color}
                    style={{
                      filter: `drop-shadow(0 0 ${r * 1.5}px ${star.color})`,
                    }}
                  />
                  <text
                    x={star.x}
                    y={star.y - (r + 1.8)}
                    fill="#e2e8f0"
                    fontSize="2.4"
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

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            Видимость: <span className="font-medium text-white">{constellation.season}</span>
          </div>
          <div>
            Лучшее время наблюдения: <span className="font-medium text-cyan-300">{constellation.bestObservingTime}</span>
          </div>
          <div>
            Яркость: <span className="font-medium text-white">{constellation.brightness}</span>
          </div>
        </div>
      </div>

      {/* Description & Mythology Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="rounded-3xl border border-indigo-900/30 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-cyan-400">📖</span> Описание созвездия
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {constellation.description}
          </p>
        </div>

        <div className="rounded-3xl border border-indigo-900/30 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-indigo-400">🏛️</span> Мифология и история
          </h3>
          <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
            {constellation.mythology}
          </p>
        </div>
      </div>

      {/* Interesting Facts */}
      <div className="rounded-3xl border border-indigo-900/30 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-md mb-10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">★</span> Интересные факты
        </h3>
        <ul className="space-y-3 text-sm text-zinc-300">
          {constellation.facts.map((fact, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-800">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stars in this Constellation */}
      <div className="rounded-3xl border border-indigo-900/30 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-cyan-400">✦</span> Главные звёзды созвездия ({constellation.stars.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {constellation.stars.map((star, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-900 bg-black/40 p-3.5 flex items-center gap-3"
            >
              <div
                className="h-3.5 w-3.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: star.color,
                  boxShadow: `0 0 8px ${star.color}`,
                }}
              />
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">
                  {star.name}
                </div>
                <div className="text-[10px] text-zinc-400 truncate">
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
