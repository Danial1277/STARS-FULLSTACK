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
    <div className="relative min-h-screen py-12 px-4 sm:px-6 max-w-7xl mx-auto text-white">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          База астрономических знаний
        </span>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">
          Энциклопедия Вселенной
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Исследуйте созвездия ночного неба, ярчайшие звёзды, их мифологические корни и захватывающие астрономические факты.
        </p>

        {/* Search input in encyclopedia */}
        <div className="mt-6 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Фильтр по названию или описанию..."
            className="w-full rounded-2xl border border-indigo-900/60 bg-zinc-950/80 px-4 py-3 pl-11 text-sm text-white shadow-xl backdrop-blur-md focus:border-cyan-400 focus:outline-none"
          />
          <svg
            className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tab Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "Все объекты" },
            { id: "constellations", label: "Популярные созвездия" },
            { id: "stars", label: "Ярчайшие звёзды" },
            { id: "zodiac", label: "Зодиакальные" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Constellations Grid */}
      {filteredConstellations.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6 border-b border-indigo-950 pb-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <span className="text-cyan-400">✦</span> Созвездия ({filteredConstellations.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConstellations.map((c) => {
              const favorite = isFavorite(c.id);
              const read = isRead(c.id);

              return (
                <div
                  key={c.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-indigo-900/40 bg-zinc-950/60 p-6 backdrop-blur-md transition-all hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/30"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="rounded-md bg-indigo-950/80 border border-indigo-800/50 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                          {c.hemisphere}
                        </span>
                        {c.zodiac && (
                          <span className="rounded-md bg-purple-950/80 border border-purple-800/50 px-2 py-0.5 text-[10px] font-medium text-purple-300">
                            Зодиак
                          </span>
                        )}
                        {read && (
                          <span className="rounded-md bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            ✓ Прочитано
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(c.id)}
                        className={`text-lg transition-transform hover:scale-125 ${
                          favorite ? "text-amber-400" : "text-zinc-600 hover:text-amber-300"
                        }`}
                        title={favorite ? "Удалить из избранного" : "Добавить в избранное"}
                      >
                        {favorite ? "★" : "☆"}
                      </button>
                    </div>

                    {/* Constellation Mini Preview Scheme */}
                    <div className="my-4 h-36 w-full rounded-2xl bg-black/70 border border-indigo-950/80 p-2 overflow-hidden relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {c.lines.map(([idxA, idxB], i) => (
                          <line
                            key={i}
                            x1={c.stars[idxA]?.x}
                            y1={c.stars[idxA]?.y}
                            x2={c.stars[idxB]?.x}
                            y2={c.stars[idxB]?.y}
                            stroke="#38bdf8"
                            strokeWidth="1.2"
                            strokeOpacity="0.6"
                          />
                        ))}
                        {c.stars.map((s, i) => (
                          <circle
                            key={i}
                            cx={s.x}
                            cy={s.y}
                            r={Math.max(1.5, 3.5 - s.brightness * 0.4)}
                            fill={s.color}
                          />
                        ))}
                      </svg>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-xs text-indigo-300 font-mono">
                      {c.latinName} ({c.abbreviation})
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                      {c.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <button
                      onClick={() => toggleRead(c.id)}
                      className={`text-[11px] font-medium transition-colors ${
                        read ? "text-emerald-400 hover:text-emerald-300" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {read ? "Отметить непрочитанным" : "Отметить прочитанным"}
                    </button>

                    <Link
                      href={`/encyclopedia/constellation/${c.id}`}
                      className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 inline-flex items-center gap-1 hover:underline"
                    >
                      Изучить →
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
          <div className="flex items-center justify-between mb-6 border-b border-indigo-950 pb-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <span className="text-amber-400">★</span> Известные звёзды ({filteredStars.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStars.map((star) => {
              const favorite = isFavorite(star.id);
              const read = isRead(star.id);

              return (
                <div
                  key={star.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-indigo-900/40 bg-zinc-950/60 p-6 backdrop-blur-md transition-all hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                          {star.spectralClass}
                        </span>
                        {read && (
                          <span className="rounded-md bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                            ✓
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleFavorite(star.id)}
                        className={`text-lg transition-transform hover:scale-125 ${
                          favorite ? "text-amber-400" : "text-zinc-600 hover:text-amber-300"
                        }`}
                        title={favorite ? "Удалить из избранного" : "Добавить в избранное"}
                      >
                        {favorite ? "★" : "☆"}
                      </button>
                    </div>

                    {/* Glowing Star visual element */}
                    <div className="my-6 flex items-center justify-center h-28 rounded-2xl bg-black/60 border border-zinc-900">
                      <div
                        className="h-10 w-10 rounded-full"
                        style={{
                          backgroundColor: star.color,
                          boxShadow: `0 0 35px 8px ${star.color}`,
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {star.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {star.latinName} • {star.bayer}
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-xs text-zinc-400">
                      <div>
                        Яркость: <span className="font-semibold text-white">{star.magnitude} mag</span>
                      </div>
                      <div>
                        Расстояние: <span className="font-semibold text-white">{star.distanceLy} св. л.</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-zinc-300 line-clamp-3">
                      {star.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <button
                      onClick={() => toggleRead(star.id)}
                      className={`text-[11px] font-medium transition-colors ${
                        read ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {read ? "Прочитано" : "Отметить"}
                    </button>

                    <Link
                      href={`/encyclopedia/star/${star.id}`}
                      className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 inline-flex items-center gap-1 hover:underline"
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
