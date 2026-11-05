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
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto text-white">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/encyclopedia"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-300 transition-colors"
        >
          ← Назад в энциклопедию
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-950 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-950/80 border border-amber-800/60 px-2.5 py-0.5 text-xs text-amber-300 font-medium">
              Спектральный класс: {star.spectralClass}
            </span>
            <Link
              href={`/encyclopedia/constellation/${star.constellationId}`}
              className="text-xs text-cyan-400 hover:underline"
            >
              Созвездие {star.constellationName}
            </Link>
          </div>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black text-white">
            {star.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-400 font-mono">
            {star.latinName} • {star.bayer}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleRead(star.id)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
              read
                ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {read ? "✓ Прочитано" : "Отметить прочитанным"}
          </button>

          <button
            onClick={() => toggleFavorite(star.id)}
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

      {/* Star visual representation & core metrics */}
      <div className="my-8 rounded-3xl border border-indigo-900/40 bg-zinc-950/80 p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Animated Star Sphere */}
          <div className="relative flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-2xl bg-black border border-indigo-950">
            <div
              className="h-20 w-20 rounded-full animate-pulse"
              style={{
                backgroundColor: star.color,
                boxShadow: `0 0 60px 18px ${star.color}`,
              }}
            />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 flex-1 w-full">
            <div className="rounded-2xl border border-zinc-900 bg-black/50 p-4">
              <span className="text-[11px] text-zinc-400 block uppercase">Видимый блеск (mag)</span>
              <span className="text-2xl font-black text-cyan-300">{star.magnitude}</span>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-black/50 p-4">
              <span className="text-[11px] text-zinc-400 block uppercase">Расстояние</span>
              <span className="text-2xl font-black text-white">{star.distanceLy} <span className="text-xs font-normal text-zinc-400">св. лет</span></span>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-black/50 p-4">
              <span className="text-[11px] text-zinc-400 block uppercase">Созвездие</span>
              <span className="text-lg font-bold text-white">{star.constellationName}</span>
            </div>
            <div className="rounded-2xl border border-zinc-900 bg-black/50 p-4">
              <span className="text-[11px] text-zinc-400 block uppercase">Байеровское имя</span>
              <span className="text-lg font-bold text-indigo-300">{star.bayer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-3xl border border-indigo-900/30 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-md mb-8">
        <h3 className="text-lg font-bold text-white mb-3">О звезде</h3>
        <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
          {star.description}
        </p>
      </div>

      {/* Facts */}
      <div className="rounded-3xl border border-indigo-900/30 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4">Интересные факты</h3>
        <ul className="space-y-3 text-sm text-zinc-300">
          {star.facts.map((fact, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-800">
                ★
              </span>
              <span className="leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
