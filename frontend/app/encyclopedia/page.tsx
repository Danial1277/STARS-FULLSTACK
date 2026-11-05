"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CONSTELLATIONS, STARS } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

export default function EncyclopediaPage() {
  const { toggleFavorite, isFavorite, isRead, toggleRead } = useUser();
  const [activeTab, setActiveTab] = useState<"all" | "constellations" | "stars" | "zodiac">("all");
  const [searchFilter, setSearchFilter] = useState("");

  const filteredConstellations = CONSTELLATIONS.filter((c) => {
    if (activeTab === "stars") return false;
    if (activeTab === "zodiac" && !c.zodiac) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.latinName.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredStars = STARS.filter((s) => {
    if (activeTab === "constellations" || activeTab === "zodiac") return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.latinName.toLowerCase().includes(q) ||
        s.constellationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto text-slate-100">
      {/* Page Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Справочный каталог
        </span>
        <h1 className="mt-1.5 text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Энциклопедия созвездий и звёзд
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Справочные сведения о наблюдаемых созвездиях, навигационных звёздах, их астрономических координатах и происхождении названий.
        </p>

        {/* Search input in encyclopedia */}
        <div className="mt-5 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Поиск по названию или описанию..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 pl-10 text-xs sm:text-sm text-white focus:border-slate-500 focus:outline-none"
          />
          <svg
            className="absolute left-3.5 top-3 h-4 w-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tab Filters */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
          {[
            { id: "all", label: "Все объекты" },
            { id: "constellations", label: "Созвездия" },
            { id: "stars", label: "Яркие звёзды" },
            { id: "zodiac", label: "Зодиакальные" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-slate-700 text-white font-semibold"
                  : "bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Constellations Grid */}
      {filteredConstellations.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-base font-bold text-white">
              Созвездия ({filteredConstellations.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredConstellations.map((c) => {
              const favorite = isFavorite(c.id);
              const read = isRead(c.id);

              return (
                <div
                  key={c.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                          {c.hemisphere}
                        </span>
                        {c.zodiac && (
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                            Зодиак
                          </span>
                        )}
                        {read && (
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            Изучено
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(c.id)}
                        className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                          favorite
                            ? "border-slate-500 bg-slate-800 text-white"
                            : "border-slate-800 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {favorite ? "В избранном" : "В избранное"}
                      </button>
                    </div>

                    {/* Constellation Mini Preview Scheme */}
                    <div className="my-3.5 h-32 w-full rounded-lg bg-[#080c16] border border-slate-850 p-2 overflow-hidden relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {c.lines.map(([idxA, idxB], i) => (
                          <line
                            key={i}
                            x1={c.stars[idxA]?.x}
                            y1={c.stars[idxA]?.y}
                            x2={c.stars[idxB]?.x}
                            y2={c.stars[idxB]?.y}
                            stroke="#64748b"
                            strokeWidth="1"
                            strokeOpacity="0.75"
                          />
                        ))}
                        {c.stars.map((s, i) => (
                          <circle
                            key={i}
                            cx={s.x}
                            cy={s.y}
                            r={Math.max(1.5, 3.2 - s.brightness * 0.35)}
                            fill={s.color}
                          />
                        ))}
                      </svg>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {c.latinName} ({c.abbreviation})
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">
                      {c.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => toggleRead(c.id)}
                      className="text-[11px] text-slate-400 hover:text-white"
                    >
                      {read ? "Снять отметку" : "Отметить изученным"}
                    </button>

                    <Link
                      href={`/encyclopedia/constellation/${c.id}`}
                      className="text-xs font-semibold text-slate-200 hover:text-white hover:underline"
                    >
                      Подробнее →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Brightest Stars Section */}
      {filteredStars.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-base font-bold text-white">
              Яркие звёзды ({filteredStars.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStars.map((star) => {
              const favorite = isFavorite(star.id);
              const read = isRead(star.id);

              return (
                <div
                  key={star.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300 font-mono">
                          Класс {star.spectralClass}
                        </span>
                        {read && (
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            Изучено
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleFavorite(star.id)}
                        className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                          favorite
                            ? "border-slate-500 bg-slate-800 text-white"
                            : "border-slate-800 text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {favorite ? "В избранном" : "В избранное"}
                      </button>
                    </div>

                    <div className="my-5 flex items-center justify-center h-24 rounded-lg bg-[#080c16] border border-slate-850">
                      <div
                        className="h-8 w-8 rounded-full"
                        style={{
                          backgroundColor: star.color,
                          boxShadow: `0 0 16px 2px ${star.color}40`,
                        }}
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {star.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {star.latinName} • {star.bayer}
                    </p>

                    <div className="mt-2.5 flex items-center gap-3 text-xs text-slate-400">
                      <div>
                        Блеск: <span className="font-semibold text-slate-200">{star.magnitude} mag</span>
                      </div>
                      <div>
                        Расстояние: <span className="font-semibold text-slate-200">{star.distanceLy} св. л.</span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">
                      {star.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => toggleRead(star.id)}
                      className="text-[11px] text-slate-400 hover:text-white"
                    >
                      {read ? "Снять отметку" : "Отметить"}
                    </button>

                    <Link
                      href={`/encyclopedia/star/${star.id}`}
                      className="text-xs font-semibold text-slate-200 hover:text-white hover:underline"
                    >
                      Подробнее →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
