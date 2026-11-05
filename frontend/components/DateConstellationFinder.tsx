"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getConstellationByDate, Constellation } from "@/data/constellations";

export function DateConstellationFinder() {
  const [selectedDate, setSelectedDate] = useState("2000-04-12");
  const [matched, setMatched] = useState<Constellation | null>(() => {
    return getConstellationByDate(4, 12);
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    if (!val) return;
    const parts = val.split("-");
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const result = getConstellationByDate(month, day);
      setMatched(result);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-950/40 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2 text-amber-300">
        <span className="text-lg">🎂</span>
        <span className="text-xs font-bold tracking-wider uppercase">
          Звёздный календарь
        </span>
      </div>

      <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-white">
        Узнай своё созвездие по дате рождения
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
        Выберите дату своего рождения или любого значимого дня — и мы покажем, под каким созвездием сияло небо:
      </p>

      {/* Date Input with friendly styling */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-2xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-inner focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span>✨</span>
          <span>Попробуйте день рождения, юбилей или день космонавтики!</span>
        </div>
      </div>

      {/* Matched Constellation Preview Card */}
      {matched && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-indigo-950/30 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-xl bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-xs font-bold text-amber-200">
                  {matched.zodiac ? `Знак: ${matched.zodiac}` : matched.season}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {matched.latinName} ({matched.abbreviation})
                </span>
              </div>
              <h4 className="mt-2 text-2xl font-black text-white">
                {matched.name}
              </h4>
              <p className="mt-1 max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                {matched.shortDescription}
              </p>
            </div>

            <Link
              href={`/encyclopedia/constellation/${matched.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md shadow-amber-400/20 hover:brightness-110 transition-all flex-shrink-0"
            >
              Изучить моё созвездие
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
