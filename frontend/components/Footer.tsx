"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-[#06080e]/95 py-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <span className="text-base font-bold tracking-wider text-slate-200">
              СОЗВЕЗДИЯ
            </span>
            <p className="text-xs leading-relaxed text-slate-400">
              Интерактивный атлас звёздного неба: динамические схемы созвездий, карта небосвода, каталог объектов и проверка знаний.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              Навигация
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/map" className="hover:text-white transition-colors">
                  Карта неба
                </Link>
              </li>
              <li>
                <Link href="/encyclopedia" className="hover:text-white transition-colors">
                  Энциклопедия
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Викторина
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Поиск
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              Разработчики
            </h4>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>
                <span className="text-slate-300 font-medium">Frontend:</span> Наргиз, Сатыбалды
              </li>
              <li>
                <span className="text-slate-300 font-medium">Backend:</span> Даниал Н., Даниал Т.
              </li>
              <li className="pt-1 border-t border-slate-800 text-[11px]">
                Руководитель: Дурбенов Р.М.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              Стек технологий
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Next.js 16, React 19, TypeScript, HTML5 Canvas / SVG, Tailwind CSS.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/80 pt-5 text-center text-[11px] text-slate-500">
          © 2026 Проект «Созвездия». Астрономический интерактивный атлас.
        </div>
      </div>
    </footer>
  );
}
