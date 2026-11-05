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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          Календарный расчёт
        </span>
      </div>

      <h3 className="mt-1.5 text-xl font-bold text-white">
        Определение созвездия по дате
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
        Укажите календарную дату (например, день рождения), чтобы определить созвездие, связанное с этим периодом года.
      </p>

      {/* Date Input */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-slate-500 focus:outline-none"
        />
        <span className="text-xs text-slate-400">
          Календарный день и месяц
        </span>
      </div>

      {/* Matched Constellation Preview Card */}
      {matched && (
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                  {matched.zodiac ? `Зодиакальный сектор: ${matched.zodiac}` : matched.season}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {matched.latinName}
                </span>
              </div>
              <h4 className="mt-1.5 text-xl font-bold text-white">
                {matched.name}
              </h4>
              <p className="mt-1 max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                {matched.shortDescription}
              </p>
            </div>

            <Link
              href={`/encyclopedia/constellation/${matched.id}`}
              className="inline-flex items-center justify-center rounded-lg bg-slate-100 hover:bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors flex-shrink-0"
            >
              Перейти к описанию →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
