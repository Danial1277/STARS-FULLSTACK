"use client";

import React from "react";
import Link from "next/link";
import { ConstellationHeroAnimation } from "@/components/ConstellationHeroAnimation";
import { DateConstellationFinder } from "@/components/DateConstellationFinder";
import { CONSTELLATIONS, STARS } from "@/data/constellations";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Hero Header */}
      <section className="relative pt-10 pb-12 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-slate-900/80 px-4 py-1.5 text-xs font-semibold text-sky-200 shadow-sm backdrop-blur-md">
            <span>✨</span>
            <span>Твой уютный путеводитель по ночному небу</span>
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Открой для себя <br />
            <span className="bg-gradient-to-r from-amber-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Красоту Звёздного Неба
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Погрузитесь в космос без скучных формул: любуйтесь плавными живыми созвездиями, приближайте карту неба, читайте древние мифы и проверяйте интуицию в дружелюбной викторине.
          </p>
        </div>

        {/* 1. Живая анимация созвездия (Canvas / SVG) */}
        <ConstellationHeroAnimation />
      </section>

      {/* 2. Созвездие по дате */}
      <section className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
        <DateConstellationFinder />
      </section>

      {/* Quick Nav / Key Features */}
      <section className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Исследуй галактику
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            Что вас ждёт на сайте
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Interactive Sky Map */}
          <Link
            href="/map"
            className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-xl transition-all hover:border-sky-400/60 hover:shadow-xl hover:shadow-sky-950/30 hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-950/80 border border-sky-800 text-2xl text-sky-400 group-hover:scale-110 transition-transform">
              🗺️
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
              Карта звёздного неба
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Интерактивный атлас неба с панорамированием и плавным зумом. Кликайте на любые звёзды и созвездия, чтобы узнать их секреты.
            </p>
            <div className="mt-5 text-xs font-bold text-sky-400 flex items-center gap-1.5">
              Открыть карту <span>→</span>
            </div>
          </Link>

          {/* Card 2: Encyclopedia */}
          <Link
            href="/encyclopedia"
            className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-xl transition-all hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-950/30 hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-950/80 border border-indigo-800 text-2xl text-indigo-300 group-hover:scale-110 transition-transform">
              📖
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              Энциклопедия созвездий
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Красивые иллюстрированные статьи о {CONSTELLATIONS.length} созвездиях и {STARS.length} самых ярких звёздах неба: мифы, факты и параметры.
            </p>
            <div className="mt-5 text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              Читать статьи <span>→</span>
            </div>
          </Link>

          {/* Card 3: Cosmic Quiz */}
          <Link
            href="/quiz"
            className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-xl transition-all hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-950/30 hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-950/80 border border-amber-800 text-2xl text-amber-300 group-hover:scale-110 transition-transform">
              🏆
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
              Космическая викторина
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Увлекательная игра: угадайте созвездие по его схеме из звёзд, зарабатывайте баллы и открывайте почётные звания звездочёта!
            </p>
            <div className="mt-5 text-xs font-bold text-amber-300 flex items-center gap-1.5">
              Сыграть в викторину <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Astro Fact of the Day Banner */}
      <section className="py-6 px-4 sm:px-6 max-w-5xl mx-auto mb-12">
        <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900/90 via-amber-950/20 to-slate-900/90 p-6 sm:p-7 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-5 shadow-lg">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 border border-amber-400/30 text-3xl">
            💡
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Знаете ли вы?
            </h4>
            <p className="mt-1 text-sm text-slate-200 leading-relaxed">
              Свет от оранжевого гиганта <strong>Альдебаран</strong> летит до нас 65 лет, а от багрового <strong>Бетельгейзе</strong> — целых 642 года! Глядя на ночное небо, мы смотрим прямо в далёкое историческое прошлое.
            </p>
          </div>
          <Link
            href="/encyclopedia/star/betelgeuse"
            className="rounded-2xl border border-amber-400/50 bg-amber-400/10 px-4 py-2.5 text-xs font-bold text-amber-200 hover:bg-amber-400/20 transition-all flex-shrink-0"
          >
            Узнать о Бетельгейзе →
          </Link>
        </div>
      </section>
    </div>
  );
}
