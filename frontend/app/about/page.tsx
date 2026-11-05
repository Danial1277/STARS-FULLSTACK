import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto text-slate-100">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Сведения о разработке
        </span>
        <h1 className="mt-1.5 text-2xl sm:text-4xl font-bold tracking-tight text-white">
          О проекте «Созвездия»
        </h1>
        <p className="mt-1.5 text-sm text-slate-300">
          Интерактивный веб-сервис для изучения созвездий и навигационных звёзд
        </p>
      </div>

      {/* Описание */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl mb-6 space-y-3">
        <h2 className="text-base font-bold text-white">
          Концепция и задачи проекта
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
          Проект разработан как наглядный образовательный атлас ночного неба. Вместо статичных таблиц пользователю предоставляется динамическая проекция созвездий, интерактивная карта небосвода с возможностью масштабирования, справочный каталог и блок тестирования.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
          Сервис включает в себя алгоритм вычисления видимых созвездий по календарной дате, модуль персональных заметок для полевых наблюдений и интерактивную викторину.
        </p>
      </div>

      {/* Команда */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl mb-6">
        <h2 className="text-base font-bold text-white mb-4">
          Состав команды разработчиков
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frontend Team */}
          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Frontend-разработка (Next.js / React)
            </span>
            <h3 className="text-base font-bold text-white mt-1">Наргиз и Сатыбалды</h3>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              <li>• Архитектура клиентской части на Next.js 16 и React 19</li>
              <li>• Проекция созвездий и координатные сетки (SVG / Canvas)</li>
              <li>• Интерактивная карта небосвода</li>
              <li>• Модули викторины, каталога и личного кабинета</li>
            </ul>
          </div>

          {/* Backend Team */}
          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Backend-разработка (Python / FastAPI)
            </span>
            <h3 className="text-base font-bold text-white mt-1">Даниал Н. и Даниал Т.</h3>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              <li>• Проектирование REST API на FastAPI</li>
              <li>• Схема базы данных астрономических объектов (PostgreSQL)</li>
              <li>• Аутентификация и хранение пользовательских данных</li>
              <li>• Валидация входных данных и алгоритм расчёта по дате</li>
            </ul>
          </div>
        </div>

        {/* Руководитель */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400">Преподаватель и научный руководитель: </span>
            <strong className="text-white">Дурбенов Р.М.</strong>
          </div>
          <Link
            href="/"
            className="text-slate-300 hover:text-white underline"
          >
            На главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
}
