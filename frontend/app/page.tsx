"use client";

import React from "react";
import Link from "next/link";
import { ConstellationHeroAnimation } from "@/components/ConstellationHeroAnimation";
import { DateConstellationFinder } from "@/components/DateConstellationFinder";
import { CONSTELLATIONS, STARS } from "@/data/constellations";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-4 py-1.5 text-xs font-medium text-cyan-300 shadow-inner backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Интерактивная энциклопедия звёздного неба
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Открой для себя <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Тайны Созвездий
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 leading-relaxed">
            Погрузитесь в бесконечное звёздное пространство. Наблюдайте живую анимацию созвездий, приближайте интерактивную карту, читайте мифы древних цивилизаций и проверяйте свои знания.
          </p>
        </div>

        {/* 1. Живая анимация созвездия (Canvas / SVG) */}
        <ConstellationHeroAnimation />
      </section>

      {/* 2. Созвездие по дате (Feature 2 from README) */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <DateConstellationFinder />
      </section>

      {/* Quick Nav / Key Features Bento Grid */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Основные разделы
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Исследуйте космос вместе с нами
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Interactive Sky Map */}
          <Link
            href="/map"
            className="group relative overflow-hidden rounded-3xl border border-indigo-900/40 bg-zinc-950/60 p-6 backdrop-blur-md transition-all hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-950/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950/80 border border-cyan-800 text-2xl text-cyan-400 group-hover:scale-110 transition-transform">
              🗺️
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              Карта звёздного неба
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Интерактивный атлас с панорамированием и зумом. Кликайте на звёзды, включайте линии и исследуйте созвездия обоих полушарий.
            </p>
            <div className="mt-4 text-xs font-semibold text-cyan-400 flex items-center gap-1">
              Открыть карту <span>→</span>
            </div>
          </Link>

          {/* Card 2: Encyclopedia */}
          <Link
            href="/encyclopedia"
            className="group relative overflow-hidden rounded-3xl border border-indigo-900/40 bg-zinc-950/60 p-6 backdrop-blur-md transition-all hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-950/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/80 border border-indigo-800 text-2xl text-indigo-300 group-hover:scale-110 transition-transform">
              📖
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              Энциклопедия звёзд
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Подробные статьи о {CONSTELLATIONS.length} созвездиях и {STARS.length} ярчайших звёздах: происхождение, греческие мифы и астрофизические факты.
            </p>
            <div className="mt-4 text-xs font-semibold text-indigo-400 flex items-center gap-1">
              Читать статьи <span>→</span>
            </div>
          </Link>

          {/* Card 3: Cosmic Quiz */}
          <Link
            href="/quiz"
            className="group relative overflow-hidden rounded-3xl border border-indigo-900/40 bg-zinc-950/60 p-6 backdrop-blur-md transition-all hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-950/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-950/80 border border-purple-800 text-2xl text-purple-300 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              Космическая викторина
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Проверьте свои знания в игре: угадайте созвездие только по его геометрической схеме на небе и сохраните свой рекорд.
            </p>
            <div className="mt-4 text-xs font-semibold text-purple-400 flex items-center gap-1">
              Начать игру <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Astro Fact of the Day Banner */}
      <section className="py-8 px-4 sm:px-6 max-w-5xl mx-auto mb-12">
        <div className="rounded-3xl border border-indigo-800/40 bg-gradient-to-r from-indigo-950/40 via-cyan-950/20 to-purple-950/40 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center gap-6">
          <div className="text-4xl">✨</div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Интересный факт о космосе
            </h4>
            <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
              Свет от красного сверхгиганта Бетельгейзе в созвездии Ориона летит до Земли около 642 лет. Когда мы смотрим на эту звезду в небе, мы видим её такой, какой она была во времена позднего Средневековья!
            </p>
          </div>
          <Link
            href="/encyclopedia/star/betelgeuse"
            className="rounded-xl border border-cyan-500/50 bg-cyan-950/40 px-4 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/60 transition-colors flex-shrink-0"
          >
            О Бетельгейзе →
          </Link>
        </div>
      </section>
    </div>
  );
}
