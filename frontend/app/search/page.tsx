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
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto text-slate-100">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Поиск по каталогу
        </span>
        <h1 className="mt-1.5 text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Поиск созвездий и звёзд
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Поиск по русскому или латинскому названию, обозначению Байера или описанию
        </p>

        {/* Search Input */}
        <div className="mt-6 relative max-w-lg mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введите название (например: Орион, Сириус)..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 pl-11 text-sm text-white focus:border-slate-500 focus:outline-none"
            autoFocus
          />
          <svg
            className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400"
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
              className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-white"
            >
              Очистить
            </button>
          )}
        </div>

        {/* Suggestion pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-xs text-slate-400">Примеры запросов:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results output */}
      {query.trim() && (
        <div className="space-y-6">
          {searchResults.constellations.length === 0 && searchResults.stars.length === 0 && (
            <div className="text-center py-10 rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
              <p className="text-sm text-slate-400">По запросу «{query}» совпадений не обнаружено.</p>
              <p className="text-xs text-slate-500 mt-1">Проверьте правильность написания или воспользуйтесь подсказками выше.</p>
            </div>
          )}

          {/* Constellations */}
          {searchResults.constellations.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-white mb-3">
                Созвездия ({searchResults.constellations.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.constellations.map((c) => (
                  <Link
                    key={c.id}
                    href={`/encyclopedia/constellation/${c.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700 hover:bg-slate-850"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">{c.name}</span>
                        <span className="text-xs text-slate-400 font-mono">({c.latinName})</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                        {c.shortDescription}
                      </p>
                    </div>
                    <span className="text-slate-300 text-xs font-medium ml-4">
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
              <h2 className="text-base font-bold text-white mb-3">
                Звёзды ({searchResults.stars.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchResults.stars.map((s) => (
                  <Link
                    key={s.id}
                    href={`/encyclopedia/star/${s.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700 hover:bg-slate-850"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">{s.name}</span>
                          <span className="text-xs text-slate-400 font-mono">({s.latinName})</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          Созвездие: {s.constellationName} • Блеск: {s.magnitude} mag
                        </p>
                      </div>
                    </div>
                    <span className="text-slate-300 text-xs font-medium ml-4">
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
