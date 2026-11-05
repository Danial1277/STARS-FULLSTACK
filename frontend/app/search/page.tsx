"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CONSTELLATIONS, STARS } from "@/data/constellations";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return { constellations: [], stars: [] };
    const q = query.toLowerCase().trim();

    const matchedConstellations = CONSTELLATIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.latinName.toLowerCase().includes(q) ||
        c.abbreviation.toLowerCase().includes(q) ||
        (c.zodiac && c.zodiac.toLowerCase().includes(q)) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.facts.some((f) => f.toLowerCase().includes(q))
    );

    const matchedStars = STARS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.latinName.toLowerCase().includes(q) ||
        s.bayer.toLowerCase().includes(q) ||
        s.constellationName.toLowerCase().includes(q) ||
        s.facts.some((f) => f.toLowerCase().includes(q))
    );

    return { constellations: matchedConstellations, stars: matchedStars };
  }, [query]);

  // Quick prompt suggestions
  const suggestions = [
    "Орион",
    "Большая Медведица",
    "Сириус",
    "Полярная звезда",
    "Кассиопея",
    "Телец",
    "Скорпион",
    "Бетельгейзе",
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto text-white">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          Поиск по каталогу
        </span>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">
          Поиск звёзд и созвездий
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Введите название созвездия, звезды, знак зодиака или астрономический термин
        </p>

        {/* Search Input */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Начните вводить (например: Орион, Сириус, Кассиопея)..."
            className="w-full rounded-2xl border border-indigo-700/60 bg-zinc-950/90 px-5 py-4 pl-12 text-base text-white shadow-2xl backdrop-blur-md focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            autoFocus
          />
          <svg
            className="absolute left-4 top-4.5 h-5 w-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-4 text-xs font-bold text-zinc-400 hover:text-white"
            >
              ✕ Очистить
            </button>
          )}
        </div>

        {/* Suggestion pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-zinc-500">Популярные запросы:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:border-cyan-500/60 hover:text-cyan-300 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results output */}
      {query.trim() && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {searchResults.constellations.length === 0 && searchResults.stars.length === 0 && (
            <div className="text-center py-12 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/40">
              <p className="text-base text-zinc-400">По запросу «{query}» ничего не найдено.</p>
              <p className="text-xs text-zinc-500 mt-1">Попробуйте изменить запрос или выбрать одну из подсказок выше.</p>
            </div>
          )}

          {/* Constellations */}
          {searchResults.constellations.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">✦</span> Созвездия ({searchResults.constellations.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.constellations.map((c) => (
                  <Link
                    key={c.id}
                    href={`/encyclopedia/constellation/${c.id}`}
                    className="flex items-center justify-between rounded-2xl border border-indigo-900/40 bg-zinc-950/70 p-4 transition-all hover:border-cyan-400 hover:bg-zinc-900"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{c.name}</span>
                        <span className="text-xs text-indigo-300 font-mono">({c.latinName})</span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-1">
                        {c.shortDescription}
                      </p>
                    </div>
                    <span className="text-cyan-400 text-xs font-semibold ml-4">
                      Открыть →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Stars */}
          {searchResults.stars.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">★</span> Звёзды ({searchResults.stars.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.stars.map((s) => (
                  <Link
                    key={s.id}
                    href={`/encyclopedia/star/${s.id}`}
                    className="flex items-center justify-between rounded-2xl border border-indigo-900/40 bg-zinc-950/70 p-4 transition-all hover:border-amber-400 hover:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: s.color,
                          boxShadow: `0 0 10px ${s.color}`,
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">{s.name}</span>
                          <span className="text-xs text-zinc-400 font-mono">({s.latinName})</span>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">
                          Созвездие: {s.constellationName} • Блеск: {s.magnitude} mag
                        </p>
                      </div>
                    </div>
                    <span className="text-amber-400 text-xs font-semibold ml-4">
                      Открыть →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
