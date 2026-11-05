import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
          О проекте
        </span>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight">
          Сайт «Созвездия»
        </h1>
        <p className="mt-2 text-base text-zinc-400">
          Интерактивная энциклопедия звёздного неба
        </p>
      </div>

      {/* Main Mission */}
      <div className="rounded-3xl border border-indigo-900/40 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-cyan-400">✦</span> Концепция и цели
        </h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          Сайт задуман не как сухой справочник или статичные картинки, а как живое интерактивное пространство. При входе пользователь видит живую анимацию небесных созвездий, которые плавно двигаются и меняются.
        </p>
        <p className="text-sm leading-relaxed text-zinc-300">
          Здесь можно исследовать интерактивную карту неба, рассчитывать созвездие по дате рождения, читать мифы и факты в энциклопедии, сохранять заметки в личном кабинете и проверять астрономическую интуицию в викторине.
        </p>
      </div>

      {/* Team */}
      <div className="rounded-3xl border border-indigo-900/40 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-indigo-400">👥</span> Команда разработчиков
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frontend Team */}
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
            <span className="rounded-md bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 text-[11px] font-semibold text-cyan-300">
              Frontend-разработчики (Next.js / React)
            </span>
            <h3 className="text-lg font-bold text-white mt-2">Наргиз и Сатыбалды</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-zinc-400">
              <li>• Разработка интерфейса на Next.js и React 19</li>
              <li>• Динамические анимации на SVG и HTML5 Canvas</li>
              <li>• Интерактивная карта неба с зумом и перемещением</li>
              <li>• Энциклопедия, личный кабинет и викторина</li>
            </ul>
          </div>

          {/* Backend Team */}
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
            <span className="rounded-md bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 text-[11px] font-semibold text-indigo-300">
              Бэкенд-разработчики (Python / FastAPI)
            </span>
            <h3 className="text-lg font-bold text-white mt-2">Даниал Н. и Даниал Т.</h3>
            <ul className="mt-2 space-y-1.5 text-xs text-zinc-400">
              <li>• Архитектура API и база данных PostgreSQL / SQLAlchemy</li>
              <li>• Эндпоинты для созвездий, звёзд и расчёта по дате</li>
              <li>• Авторизация, роли пользователей и личные кабинеты</li>
              <li>• Логика подсчёта баллов викторины</li>
            </ul>
          </div>
        </div>

        {/* Supervisor */}
        <div className="mt-6 pt-6 border-t border-zinc-850 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400">Преподаватель и руководитель проекта:</span>
            <div className="text-base font-bold text-white">Дурбенов Р.М.</div>
          </div>
          <Link
            href="/"
            className="rounded-xl bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all"
          >
            На главную →
          </Link>
        </div>
      </div>
    </div>
  );
}
