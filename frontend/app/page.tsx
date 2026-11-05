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
      <section className="relative pt-8 pb-10 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center mb-8">
          <span className="inline-block rounded-md border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300">
            Электронный справочник созвездий
          </span>

          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Интерактивный атлас звёздного неба
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Астрономический проект для изучения созвездий: динамические схемы звёзд, интерактивная карта полушарий, мифологические описания и викторина для проверки знаний.
          </p>
        </div>

        {/* 1. Живая анимация созвездия */}
        <ConstellationHeroAnimation />
      </section>

      {/* 2. Созвездие по дате */}
      <section className="py-6 px-4 sm:px-6 max-w-5xl mx-auto">
        <DateConstellationFinder />
      </section>

      {/* Разделы сайта */}
      <section className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            Основные разделы
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Быстрый переход к модулям атласа
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Map */}
          <Link
            href="/map"
            className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-sky-300 transition-colors">
              Карта неба
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Интерактивная проекция небесной сферы с поддержкой масштабирования, перемещения и подробными карточками звёздных объектов.
            </p>
            <div className="mt-4 text-xs font-medium text-slate-300 flex items-center gap-1 group-hover:text-white">
              Перейти к карте <span>→</span>
            </div>
          </Link>

          {/* Card 2: Encyclopedia */}
          <Link
            href="/encyclopedia"
            className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-sky-300 transition-colors">
              Энциклопедия
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Справочник по {CONSTELLATIONS.length} созвездиям и {STARS.length} навигационным звёздам: астрономические параметры, мифология и история.
            </p>
            <div className="mt-4 text-xs font-medium text-slate-300 flex items-center gap-1 group-hover:text-white">
              Каталог объектов <span>→</span>
            </div>
          </Link>

          {/* Card 3: Quiz */}
          <Link
            href="/quiz"
            className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-sky-300 transition-colors">
              Викторина
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Тестовый модуль для проверки ориентации по созвездиям: распознавание контуров без подписей с фиксацией результатов.
            </p>
            <div className="mt-4 text-xs font-medium text-slate-300 flex items-center gap-1 group-hover:text-white">
              Начать тест <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Астрономическая справка */}
      <section className="py-6 px-4 sm:px-6 max-w-5xl mx-auto mb-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Астрономическая справка
            </span>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              В 1922 году Международный астрономический союз (IAU) официально утвердил границы 88 созвездий, полностью покрывающих всю небесную сферу Земли.
            </p>
          </div>
          <Link
            href="/about"
            className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            О проекте
          </Link>
        </div>
      </section>
    </div>
  );
}
