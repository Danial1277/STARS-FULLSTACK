"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CONSTELLATIONS, STARS } from "@/data/constellations";
import { useUser } from "@/context/UserContext";

export default function DashboardPage() {
  const { role, favorites, readArticles, notes, quizScores, customConstellations, systemUsers } = useUser();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "all">("all");

  const totalConstellations = CONSTELLATIONS.length + customConstellations.length;
  const readCount = readArticles.length;
  const progressPercent = Math.min(100, Math.round((readCount / totalConstellations) * 100));

  // Average quiz score
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(
          (quizScores.reduce((acc, q) => acc + q.score / q.total, 0) / quizScores.length) * 100
        )
      : 0;

  // Constellations by hemisphere
  const northernCount = CONSTELLATIONS.filter((c) => c.hemisphere === "Северное").length;
  const southernCount = CONSTELLATIONS.filter((c) => c.hemisphere === "Южное" || c.hemisphere === "Экваториальное").length;

  // Stars by spectral class
  const spectralDistribution = [
    { class: "B", name: "Бело-голубые", count: 3, color: "#93c5fd", percent: 43 },
    { class: "A", name: "Белые", count: 2, color: "#e2e8f0", percent: 29 },
    { class: "F", name: "Желтовато-белые", count: 1, color: "#fef08a", percent: 14 },
    { class: "M", name: "Красные гиганты", count: 1, color: "#f87171", percent: 14 },
  ];

  // Observational seasons
  const seasonStats = [
    { season: "Зима", count: 4, label: "Орион, Большой Пёс, Телец, Близнецы" },
    { season: "Весна", count: 2, label: "Лев, Овен" },
    { season: "Лето", count: 2, label: "Лебедь, Скорпион" },
    { season: "Осень", count: 3, label: "Кассиопея, Пегас, Андромеда" },
    { season: "Круглый год", count: 2, label: "Большая и Малая Медведицы" },
  ];

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto text-slate-100">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Аналитическая панель
            </span>
            <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
              v1.2 Live
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Дашборд астрономического атласа
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Сводная аналитика каталога объектов, статистика активности пользователя и метрики системы.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-xs">
            <button
              onClick={() => setTimeRange("week")}
              className={`rounded px-2.5 py-1 transition-colors ${
                timeRange === "week" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              7 дней
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`rounded px-2.5 py-1 transition-colors ${
                timeRange === "month" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setTimeRange("all")}
              className={`rounded px-2.5 py-1 transition-colors ${
                timeRange === "all" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Всё время
            </button>
          </div>

          <Link
            href="/map"
            className="rounded-lg bg-slate-100 hover:bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-900 transition-colors"
          >
            К карте неба →
          </Link>
        </div>
      </div>

      {/* 4 Key KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* KPI 1 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
            Каталог созвездий
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{totalConstellations}</span>
            <span className="text-xs text-slate-400">из 88 IAU</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Северное: {northernCount}</span>
            <span>Южное: {southernCount}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
            Прогресс изучения атласа
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-sky-400 font-mono">{progressPercent}%</span>
            <span className="text-xs text-slate-400">({readCount} из {totalConstellations})</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
            Точность в викторине
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{avgQuizScore}%</span>
            <span className="text-xs text-slate-400">({quizScores.length} сессий)</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Статус: {avgQuizScore >= 70 ? "Отличный" : avgQuizScore >= 40 ? "Базовый" : "Ознакомление"}</span>
            <Link href="/quiz" className="text-sky-400 hover:underline">Пройти тест</Link>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
            Полевые наблюдения и заметки
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{notes.length}</span>
            <span className="text-xs text-slate-400">записей в журнале</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>В избранном: {favorites.length}</span>
            <Link href="/profile" className="text-sky-400 hover:underline">Открыть журнал</Link>
          </div>
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column (2 cols): Observational Seasons & Activity Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Season Visibility Distribution */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Распределение объектов по сезонам наблюдения
                </h3>
                <p className="text-xs text-slate-400">
                  Оптимальные периоды астрономической видимости на небесной сфере
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">Сезоны</span>
            </div>

            <div className="space-y-3.5">
              {seasonStats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{s.season}</span>
                    <span className="text-slate-400 font-mono">{s.count} созвездия ({s.label})</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full"
                      style={{ width: `${(s.count / totalConstellations) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Quiz History Chart / Session Log */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Динамика прохождения тестов
                </h3>
                <p className="text-xs text-slate-400">
                  Результаты распознавания созвездий по геометрическим контурам
                </p>
              </div>
              <Link href="/quiz" className="text-xs text-slate-300 hover:text-white underline">
                Новая сессия →
              </Link>
            </div>

            {quizScores.length === 0 ? (
              <div className="py-8 text-center rounded-lg border border-dashed border-slate-800 bg-slate-950/40 text-xs text-slate-400">
                История тестирования пуста. Пройдите викторину, чтобы зафиксировать первые баллы.
              </div>
            ) : (
              <div className="space-y-2">
                {quizScores.slice(0, 5).map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-850 bg-slate-950/60 text-xs"
                  >
                    <div>
                      <span className="font-mono text-slate-400">{q.date}</span>
                      <span className="ml-3 font-semibold text-white">
                        {q.score} из {q.total} правильно
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sky-300">{q.percentage}%</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${q.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Stellar Spectral Classes & System Status */}
        <div className="space-y-6">
          {/* Spectral Classification of Stars */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Спектральные классы звёзд
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Гарвардская классификация звёзд в базе данных (O, B, A, F, G, K, M)
            </p>

            <div className="space-y-3">
              {spectralDistribution.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: spec.color }}
                    />
                    <span className="font-mono font-semibold text-slate-200">Класс {spec.class}</span>
                    <span className="text-slate-400">({spec.name})</span>
                  </div>
                  <span className="font-mono text-slate-300">{spec.count} объекта</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] text-slate-400">
              Самая горячая звезда в базе: <strong className="text-slate-200">Ригель (B8Ia, 12 000 K)</strong>.
            </div>
          </div>

          {/* System & Architecture Health */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white mb-1">
              Состояние подсистем атласа
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Мониторинг клиентских и серверных модулей
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-300">Frontend Engine (Next.js 16)</span>
                <span className="font-mono text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-300">Canvas Starfield Renderer</span>
                <span className="font-mono text-emerald-400 font-semibold">60 FPS</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-300">User State Storage (LocalStorage)</span>
                <span className="font-mono text-emerald-400 font-semibold">Synchronized</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-850">
                <span className="text-slate-300">Backend API (FastAPI Gateway)</span>
                <span className="font-mono text-sky-400 font-semibold">Standby (Mock)</span>
              </div>
            </div>
          </div>

          {/* Role Status Widget */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl text-xs">
            <span className="text-slate-400 block mb-1">Текущий уровень доступа:</span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-white uppercase font-mono tracking-wider">
                {role === "admin" ? "Администратор" : role === "user" ? "Пользователь" : "Гость"}
              </span>
              <Link href="/profile" className="text-sky-400 hover:underline">
                Сменить роль →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
