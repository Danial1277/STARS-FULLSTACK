"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { CONSTELLATIONS, STARS } from "@/data/constellations";

export default function ProfilePage() {
  const {
    userName,
    setUserName,
    favorites,
    toggleFavorite,
    readArticles,
    toggleRead,
    notes,
    addNote,
    deleteNote,
    quizScores,
  } = useUser();

  const [activeTab, setActiveTab] = useState<"favorites" | "read" | "notes" | "stats">("favorites");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

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

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto text-slate-100">
      {/* Profile Header Card */}
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
              <p className="text-xs text-slate-400 mt-0.5">
                Профиль исследователя звёздного неба
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
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
        <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-slate-800 pt-4">
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
        </div>
      </div>

      {/* Tab: Favorites */}
      {activeTab === "favorites" && (
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
      {activeTab === "read" && (
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
      {activeTab === "notes" && (
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
      {activeTab === "stats" && (
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
    </div>
  );
}
