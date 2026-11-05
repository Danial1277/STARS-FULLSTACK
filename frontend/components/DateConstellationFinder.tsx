"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getConstellationByDate, Constellation } from "@/data/constellations";

export function DateConstellationFinder() {
  const [selectedDate, setSelectedDate] = useState("2000-04-12"); // default Cosmonautics Day 12 April!
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
    <div className="rounded-3xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/30 via-zinc-950/80 to-purple-950/20 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
      <div className="flex items-center gap-2 text-cyan-400">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase">
          Индивидуальный расчёт
        </span>
      </div>

      <h3 className="mt-2 text-xl sm:text-2xl font-bold text-white">
        Твоё созвездие по дате
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-zinc-400">
        Укажите дату рождения или любой памятный день года, чтобы узнать, какое созвездие господствует на небе в этот день:
      </p>

      {/* Date Input */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="relative">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="rounded-xl border border-indigo-800/80 bg-zinc-900/90 px-4 py-2.5 text-sm font-medium text-white shadow-inner focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>
        <span className="text-xs text-zinc-400">
          (например, день рождения)
        </span>
      </div>

      {/* Matched Constellation Preview Card */}
      {matched && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-indigo-950/20 to-purple-950/30 p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-cyan-400/20 px-2 py-0.5 text-[11px] font-semibold text-cyan-300">
                  {matched.zodiac ? `Зодиак: ${matched.zodiac}` : matched.season}
                </span>
                <span className="text-xs text-zinc-400">
                  {matched.latinName} ({matched.abbreviation})
                </span>
              </div>
              <h4 className="mt-1 text-2xl font-bold text-white">
                {matched.name}
              </h4>
              <p className="mt-1 max-w-xl text-xs sm:text-sm text-zinc-300">
                {matched.shortDescription}
              </p>
            </div>

            <Link
              href={`/encyclopedia/constellation/${matched.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all flex-shrink-0"
            >
              Перейти к созвездию
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
