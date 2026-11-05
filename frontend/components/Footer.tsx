"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-indigo-950/60 bg-black/80 py-10 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white">
                СОЗВЕЗДИЯ
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Интерактивная энциклопедия звёздного неба: живая анимация созвездий, интерактивная карта, космическая викторина и библиотека звёзд.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              Разделы
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Интерактивная карта неба
                </Link>
              </li>
              <li>
                <Link href="/encyclopedia" className="hover:text-white transition-colors">
                  Энциклопедия созвездий
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Космическая викторина
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Поиск звёзд и созвездий
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              Команда проекта
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <span className="text-white font-medium">Frontend:</span> Наргиз, Сатыбалды
              </li>
              <li>
                <span className="text-white font-medium">Backend:</span> Даниал Н., Даниал Т.
              </li>
              <li className="pt-1 border-t border-zinc-800/60">
                <span className="text-white font-medium">Преподаватель:</span> Дурбенов Р.М.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              Технологии
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              Next.js 16, React 19, TypeScript, Tailwind CSS, HTML5 Canvas / SVG, FastAPI, PostgreSQL.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-850 pt-6 text-center text-xs text-zinc-500">
          © 2026 Интерактивная энциклопедия «Созвездия». Создано для любителей астрономии.
        </div>
      </div>
    </footer>
  );
}
