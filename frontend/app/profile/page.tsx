"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser, UserRole } from "@/context/UserContext";
import { CONSTELLATIONS, STARS, Constellation } from "@/data/constellations";

export default function ProfilePage() {
  const {
    role,
    setRole,
    userName,
    setUserName,
    userEmail,
    login,
    logout,
    favorites,
    toggleFavorite,
    readArticles,
    toggleRead,
    notes,
    addNote,
    deleteNote,
    quizScores,
    customConstellations,
    addCustomConstellation,
    deleteConstellation,
    systemUsers,
  } = useUser();

  const [activeTab, setActiveTab] = useState<"favorites" | "read" | "notes" | "stats" | "admin">("favorites");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  // Admin form state for creating new constellation
  const [adminConstName, setAdminConstName] = useState("");
  const [adminConstLatin, setAdminConstLatin] = useState("");
  const [adminConstHemisphere, setAdminConstHemisphere] = useState<"Северное" | "Южное" | "Экваториальное">("Северное");
  const [adminConstDesc, setAdminConstDesc] = useState("");
  const [adminSuccessMsg, setAdminSuccessMsg] = useState("");

  const favoriteConstellations = CONSTELLATIONS.filter((c) => favorites.includes(c.id));
  const favoriteStars = STARS.filter((s) => favorites.includes(s.id));

  const readConstellations = CONSTELLATIONS.filter((c) => readArticles.includes(c.id));
  const readStars = STARS.filter((s) => readArticles.includes(s.id));

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    addNote(noteTitle.trim(), noteContent.trim());
    setNoteTitle("");
    setNoteContent("");
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleAdminAddConstellation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminConstName.trim() || !adminConstLatin.trim()) return;

    const newConst: Constellation = {
      id: "custom-" + Date.now(),
      name: adminConstName.trim(),
      latinName: adminConstLatin.trim(),
      abbreviation: adminConstLatin.trim().slice(0, 3).toUpperCase(),
      hemisphere: adminConstHemisphere,
      season: "Всесезонное",
      zodiac: null,
      dateRange: null,
      brightness: "Стандартное",
      shortDescription: adminConstDesc.trim() || "Добавлено администратором через панель управления.",
      description: adminConstDesc.trim() || "Подробное описание объекта создано администратором.",
      mythology: "Астрономический объект внесён в каталог через панель управления.",
      facts: ["Объект зарегистрирован в базе данных сайта."],
      bestObservingTime: "По сезону",
      stars: [
        { name: "Альфа", x: 30, y: 30, brightness: 2.0, color: "#ffffff", type: "Главная звезда" },
        { name: "Бета", x: 70, y: 60, brightness: 2.5, color: "#93c5fd", type: "Вторая звезда" },
      ],
      lines: [[0, 1]],
    };

    addCustomConstellation(newConst);
    setAdminConstName("");
    setAdminConstLatin("");
    setAdminConstDesc("");
    setAdminSuccessMsg("Созвездие успешно добавлено в каталог!");
    setTimeout(() => setAdminSuccessMsg(""), 3500);
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto text-slate-100">
      {/* Role switcher bar */}
      <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-xs">
          <span className="text-slate-400">Текущая роль в системе: </span>
          <span className="font-semibold text-white uppercase font-mono tracking-wide">
            {role === "guest" && "Гость (без регистрации)"}
            {role === "user" && "Пользователь (авторизован)"}
            {role === "admin" && "Администратор системы"}
          </span>
        </div>

        {/* Instant role switcher for demo */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 p-1">
          <button
            onClick={() => {
              setRole("guest");
              setActiveTab("favorites");
            }}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              role === "guest" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Гость
          </button>
          <button
            onClick={() => {
              login("Даниал", "danial@example.com", "user");
              setActiveTab("favorites");
            }}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              role === "user" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Пользователь
          </button>
          <button
            onClick={() => {
              login("Даниал (Admin)", "admin@stars.net", "admin");
              setActiveTab("admin");
            }}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              role === "admin" ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Администратор
          </button>
        </div>
      </div>

      {/* Guest Mode Warning Banner */}
      {role === "guest" ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Режим гостя (без регистрации)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Вам доступны все базовые возможности: просмотр анимации на главной, интерактивная карта неба, каталог созвездий и викторина. Чтобы сохранять избранное, вести личный дневник наблюдений и сохранять баллы тестов — авторизуйтесь в системе.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => login("Даниал", "danial@example.com", "user")}
              className="rounded-lg bg-slate-100 hover:bg-white px-5 py-2.5 text-xs font-semibold text-slate-900 transition-colors"
            >
              Войти как Пользователь
            </button>
            <button
              onClick={() => login("Даниал (Admin)", "admin@stars.net", "admin")}
              className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white"
            >
              Войти с правами Администратора
            </button>
          </div>
        </div>
      ) : (
        /* Authenticated User / Admin Header Card */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-xl mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200">
                <svg className="h-6 w-6 text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-sm font-semibold text-white focus:outline-none"
                      />
                      <button
                        onClick={handleSaveName}
                        className="rounded bg-slate-700 px-2.5 py-1 text-xs font-semibold hover:bg-slate-600"
                      >
                        Сохранить
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-xl font-bold text-white">{userName}</h1>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-xs text-slate-400 hover:text-white"
                        title="Изменить имя"
                      >
                        (изменить)
                      </button>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {userEmail} • Роль: {role === "admin" ? "Администратор" : "Пользователь"}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-3 text-center">
              <div className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2">
                <span className="block text-lg font-bold text-white font-mono">
                  {favorites.length}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Избранное</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2">
                <span className="block text-lg font-bold text-white font-mono">
                  {readArticles.length}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Изучено</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2">
                <span className="block text-lg font-bold text-white font-mono">
                  {notes.length}
                </span>
                <span className="text-[10px] text-slate-400 uppercase">Заметок</span>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActiveTab("favorites")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "favorites"
                    ? "bg-slate-700 text-white"
                    : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                Избранное ({favorites.length})
              </button>
              <button
                onClick={() => setActiveTab("read")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "read"
                    ? "bg-slate-700 text-white"
                    : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                Изученные статьи ({readArticles.length})
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "notes"
                    ? "bg-slate-700 text-white"
                    : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                Журнал наблюдений ({notes.length})
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "stats"
                    ? "bg-slate-700 text-white"
                    : "bg-slate-800/50 text-slate-400 hover:text-white"
                }`}
              >
                Результаты тестов ({quizScores.length})
              </button>

              {/* Admin Panel Tab (only for Admin role) */}
              {role === "admin" && (
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeTab === "admin"
                      ? "bg-sky-600 text-white"
                      : "bg-sky-950/60 border border-sky-800/70 text-sky-300 hover:bg-sky-900"
                  }`}
                >
                  Панель администратора
                </button>
              )}
            </div>

            <button
              onClick={logout}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      )}

      {/* Tab: Favorites */}
      {role !== "guest" && activeTab === "favorites" && (
        <div>
          <h2 className="text-base font-bold text-white mb-3">Сохранённые объекты</h2>
          {favoriteConstellations.length === 0 && favoriteStars.length === 0 ? (
            <div className="text-center py-10 rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
              <p className="text-slate-400 text-xs sm:text-sm">В избранном пока нет сохранённых созвездий или звёзд.</p>
              <Link href="/encyclopedia" className="mt-2 inline-block text-xs text-sky-400 hover:underline">
                Перейти в энциклопедию →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favoriteConstellations.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.latinName} • {c.hemisphere}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(c.id)}
                      className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                      title="Удалить из избранного"
                    >
                      Удалить
                    </button>
                    <Link
                      href={`/encyclopedia/constellation/${c.id}`}
                      className="text-xs text-slate-200 font-medium hover:underline"
                    >
                      Открыть →
                    </Link>
                  </div>
                </div>
              ))}

              {favoriteStars.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <div>
                      <h3 className="font-semibold text-white text-sm">{s.name}</h3>
                      <p className="text-xs text-slate-400">{s.constellationName} • {s.magnitude} mag</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(s.id)}
                      className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Удалить
                    </button>
                    <Link
                      href={`/encyclopedia/star/${s.id}`}
                      className="text-xs text-slate-200 font-medium hover:underline"
                    >
                      Открыть →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Read Articles */}
      {role !== "guest" && activeTab === "read" && (
        <div>
          <h2 className="text-base font-bold text-white mb-3">Изученные материалы</h2>
          {readConstellations.length === 0 && readStars.length === 0 ? (
            <div className="text-center py-10 rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
              <p className="text-slate-400 text-xs sm:text-sm">Список изученных статей пока пуст.</p>
              <Link href="/encyclopedia" className="mt-2 inline-block text-xs text-sky-400 hover:underline">
                Каталог созвездий →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {readConstellations.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">Созвездие</span>
                    <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                  </div>
                  <button
                    onClick={() => toggleRead(c.id)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Снять отметку
                  </button>
                </div>
              ))}

              {readStars.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">Звезда</span>
                    <h3 className="font-semibold text-white text-sm">{s.name}</h3>
                  </div>
                  <button
                    onClick={() => toggleRead(s.id)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Снять отметку
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Notes / Diary */}
      {role !== "guest" && activeTab === "notes" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-bold text-white mb-3">
              Новая запись о наблюдениях
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                type="text"
                placeholder="Тема наблюдения (например: Наблюдение пояса Ориона в бинокль)"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs sm:text-sm text-white focus:border-slate-500 focus:outline-none"
              />
              <textarea
                placeholder="Условия видимости, координаты, время или примечания..."
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs sm:text-sm text-white focus:border-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-100 hover:bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition-colors"
              >
                Сохранить запись
              </button>
            </form>
          </div>

          <div className="space-y-3">
            {notes.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                Журнал пока пуст. Вы можете добавить первую заметку выше.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">{note.date}</span>
                    <h4 className="font-semibold text-white text-sm mt-0.5">{note.title}</h4>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed whitespace-pre-line">
                      {note.content}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-slate-500 hover:text-rose-400 text-xs"
                    title="Удалить"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab: Quiz Stats */}
      {role !== "guest" && activeTab === "stats" && (
        <div>
          <h2 className="text-base font-bold text-white mb-3">История прохождения викторины</h2>
          {quizScores.length === 0 ? (
            <div className="text-center py-10 rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
              <p className="text-slate-400 text-xs sm:text-sm">Вы ещё не проходили практическое тестирование.</p>
              <Link href="/quiz" className="mt-2 inline-block text-xs text-sky-400 hover:underline">
                Начать тестирование →
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {quizScores.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">{s.date}</span>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      Правильных ответов: {s.score} из {s.total} ({s.percentage}%)
                    </div>
                  </div>
                  <div className="rounded-md bg-slate-800 border border-slate-700 px-2.5 py-1 text-xs font-mono text-slate-300">
                    {s.percentage >= 80 ? "Высокий" : s.percentage >= 60 ? "Средний" : "Базовый"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Admin Panel (role === 'admin') */}
      {role === "admin" && activeTab === "admin" && (
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="rounded-xl border border-sky-800/60 bg-sky-950/30 p-5">
            <h2 className="text-base font-bold text-white mb-1">
              Панель администратора
            </h2>
            <p className="text-xs text-slate-300">
              Управление астрономическим контентом (добавление, редактирование, удаление созвездий) и пользователями системы.
            </p>
          </div>

          {/* 1. Добавление созвездия */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-bold text-white mb-3">
              Добавление нового созвездия в каталог
            </h3>

            {adminSuccessMsg && (
              <div className="mb-4 rounded-lg bg-emerald-950/60 border border-emerald-800 p-2.5 text-xs text-emerald-200">
                {adminSuccessMsg}
              </div>
            )}

            <form onSubmit={handleAdminAddConstellation} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Русское название (напр. Лира)"
                  value={adminConstName}
                  onChange={(e) => setAdminConstName(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-slate-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Латинское имя (напр. Lyra)"
                  value={adminConstLatin}
                  onChange={(e) => setAdminConstLatin(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-slate-500"
                  required
                />
                <select
                  value={adminConstHemisphere}
                  onChange={(e) => setAdminConstHemisphere(e.target.value as any)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-slate-500"
                >
                  <option value="Северное">Северное полушарие</option>
                  <option value="Южное">Южное полушарие</option>
                  <option value="Экваториальное">Экваториальное</option>
                </select>
              </div>

              <textarea
                placeholder="Краткое описание созвездия и мифологическая справка..."
                rows={2}
                value={adminConstDesc}
                onChange={(e) => setAdminConstDesc(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-slate-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-sky-600 hover:bg-sky-500 px-4 py-2 text-xs font-semibold text-white transition-colors"
              >
                Опубликовать в каталоге
              </button>
            </form>

            {/* List of custom added constellations */}
            {customConstellations.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-300 mb-2">
                  Добавленные администратором объекты ({customConstellations.length}):
                </h4>
                <div className="space-y-2">
                  {customConstellations.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-lg border border-slate-800 bg-slate-950 p-3 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-semibold text-sm text-white">{c.name}</span>
                        <span className="text-xs text-slate-400 font-mono ml-2">({c.latinName})</span>
                        <span className="text-[11px] text-slate-400 block">{c.shortDescription}</span>
                      </div>
                      <button
                        onClick={() => deleteConstellation(c.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 border border-rose-900/60 rounded px-2.5 py-1"
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Управление пользователями */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-sm font-bold text-white mb-3">
              Управление пользователями системы ({systemUsers.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 text-[10px] text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="py-2 px-3">ID</th>
                    <th className="py-2 px-3">Имя пользователя</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">Роль</th>
                    <th className="py-2 px-3">Дата создания</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {systemUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-mono text-slate-400">{u.id}</td>
                      <td className="py-2.5 px-3 font-medium text-white">{u.name}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400">{u.email}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            u.role === "admin"
                              ? "bg-sky-950 text-sky-300 border border-sky-800"
                              : u.role === "user"
                              ? "bg-slate-800 text-slate-300"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 font-mono">{u.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
