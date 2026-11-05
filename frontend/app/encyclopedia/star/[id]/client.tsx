"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStarById } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

export default function StarClientView({ id }: { id: string }) {
  const star = getStarById(id);
  const { isFavorite, toggleFavorite, isRead, toggleRead } = useUser();

  if (!star) {
    notFound();
    return null;
  }

  const favorite = isFavorite(star.id);
  const read = isRead(star.id);

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 max-w-4xl mx-auto text-slate-100">
      {/* Back button */}
      <div className="mb-5">
        <Link
          href="/encyclopedia"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          ← Каталог звёзд
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300 font-mono">
              Спектральный класс: {star.spectralClass}
            </span>
            <Link
              href={`/encyclopedia/constellation/${star.constellationId}`}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Созвездие: {star.constellationName}
            </Link>
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-bold text-white">
            {star.name}
          </h1>
          <p className="mt-1 text-xs text-slate-400 font-mono">
            {star.latinName} • {star.bayer}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleRead(star.id)}
            className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              read
                ? "border-emerald-600 bg-emerald-950/40 text-emerald-200"
                : "border-slate-700 bg-slate-850 text-slate-400 hover:text-white"
            }`}
          >
            {read ? "Изучено" : "Отметить"}
          </button>

          <button
            onClick={() => toggleFavorite(star.id)}
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

      {/* Star visual representation & core metrics */}
      <div className="my-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Star Node */}
          <div className="relative flex h-36 w-36 flex-shrink-0 items-center justify-center rounded-xl bg-[#080c16] border border-slate-800">
            <div
              className="h-14 w-14 rounded-full"
              style={{
                backgroundColor: star.color,
                boxShadow: `0 0 24px 4px ${star.color}35`,
              }}
            />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 flex-1 w-full text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
              <span className="text-[10px] text-slate-400 block uppercase">Видимый блеск</span>
              <span className="text-xl font-bold text-white font-mono">{star.magnitude} mag</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
              <span className="text-[10px] text-slate-400 block uppercase">Расстояние от Солнца</span>
              <span className="text-xl font-bold text-white font-mono">{star.distanceLy} св. лет</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
              <span className="text-[10px] text-slate-400 block uppercase">Родительское созвездие</span>
              <span className="text-sm font-semibold text-slate-200">{star.constellationName}</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
              <span className="text-[10px] text-slate-400 block uppercase">Обозначение Байера</span>
              <span className="text-sm font-semibold text-slate-200 font-mono">{star.bayer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl mb-6">
        <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Астрономическая справка</h3>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-300 whitespace-pre-line">
          {star.description}
        </p>
      </div>

      {/* Facts */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">Особенности и данные наблюдений</h3>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          {star.facts.map((fact, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-slate-500 font-mono text-xs mt-0.5">[{idx + 1}]</span>
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
