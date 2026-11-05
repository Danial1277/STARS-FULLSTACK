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

  // Filter objects based on user favorites
  const favoriteConstellations = CONSTELLATIONS.filter((c) => favorites.includes(c.id));
  const favoriteStars = STARS.filter((s) => favorites.includes(s.id));

  // Filter read objects
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
    <div className="relative min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto text-white">
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-indigo-900/50 bg-gradient-to-r from-indigo-950/40 via-zinc-950/80 to-purple-950/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-3xl shadow-lg shadow-cyan-500/20">
              🔭
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="rounded-lg border border-cyan-500 bg-zinc-900 px-2 py-1 text-base font-bold text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="rounded bg-cyan-600 px-2 py-1 text-xs font-semibold hover:bg-cyan-500"
                    >
                      Сохранить
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-white">{userName}</h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-xs text-zinc-400 hover:text-cyan-300"
                    >
                      ✎
                    </button>
                  </>
                )}
              </div>
              <p className="text-xs text-cyan-400 mt-0.5">
                Исследователь звёздного неба • Уровень 1
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-4 text-center">
            <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-2.5">
              <span className="block text-xl font-black text-cyan-300">
                {favorites.length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase">В избранном</span>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-2.5">
              <span className="block text-xl font-black text-emerald-400">
                {readArticles.length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase">Прочитано</span>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-black/40 px-4 py-2.5">
              <span className="block text-xl font-black text-purple-300">
                {notes.length}
              </span>
              <span className="text-[10px] text-zinc-400 uppercase">Заметок</span>
            </div>
          </div>
        </div>

        {/* Tab navigation in profile */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-zinc-850 pt-4">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "favorites"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            ★ Избранное ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab("read")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "read"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            ✓ Прочитанные статьи ({readArticles.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "notes"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            📝 Личные заметки ({notes.length})
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === "stats"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            🏆 Викторины ({quizScores.length})
          </button>
        </div>
      </div>

      {/* Tab: Favorites */}
      {activeTab === "favorites" && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Сохранённое в избранное</h2>
          {favoriteConstellations.length === 0 && favoriteStars.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/40">
              <p className="text-zinc-400 text-sm">У вас пока нет сохранённых объектов в избранном.</p>
              <Link href="/encyclopedia" className="mt-3 inline-block text-xs text-cyan-400 hover:underline">
                Перейти в энциклопедию и добавить →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteConstellations.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-indigo-900/50 bg-zinc-950/70 p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-white">{c.name}</h3>
                    <p className="text-xs text-zinc-400">{c.latinName} • {c.hemisphere}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(c.id)}
                      className="text-amber-400 text-lg hover:scale-125 transition-transform"
                      title="Удалить из избранного"
                    >
                      ★
                    </button>
                    <Link
                      href={`/encyclopedia/constellation/${c.id}`}
                      className="text-xs text-cyan-400 font-semibold hover:underline"
                    >
                      Открыть →
                    </Link>
                  </div>
                </div>
              ))}

              {favoriteStars.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl border border-indigo-900/50 bg-zinc-950/70 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3.5 w-3.5 rounded-full"
                      style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}` }}
                    />
                    <div>
                      <h3 className="font-bold text-white">{s.name}</h3>
                      <p className="text-xs text-zinc-400">{s.constellationName} • {s.magnitude} mag</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(s.id)}
                      className="text-amber-400 text-lg hover:scale-125 transition-transform"
                    >
                      ★
                    </button>
                    <Link
                      href={`/encyclopedia/star/${s.id}`}
                      className="text-xs text-cyan-400 font-semibold hover:underline"
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
          <h2 className="text-lg font-bold text-white mb-4">Прочитанные статьи</h2>
          {readConstellations.length === 0 && readStars.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/40">
              <p className="text-zinc-400 text-sm">Вы ещё не отметили ни одной статьи как прочитанную.</p>
              <Link href="/encyclopedia" className="mt-3 inline-block text-xs text-cyan-400 hover:underline">
                Читать энциклопедию →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {readConstellations.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-emerald-950/60 bg-zinc-950/70 p-4 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-emerald-400 font-semibold">✓ Прочитано</span>
                    <h3 className="font-bold text-white">{c.name}</h3>
                  </div>
                  <button
                    onClick={() => toggleRead(c.id)}
                    className="text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    Снять отметку
                  </button>
                </div>
              ))}

              {readStars.map((s) => (
                <div
                  key={s.id}
                  className="rounded-2xl border border-emerald-950/60 bg-zinc-950/70 p-4 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-emerald-400 font-semibold">✓ Прочитано</span>
                    <h3 className="font-bold text-white">{s.name}</h3>
                  </div>
                  <button
                    onClick={() => toggleRead(s.id)}
                    className="text-xs text-zinc-500 hover:text-zinc-300"
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
        <div className="space-y-6">
          {/* Create new note form */}
          <div className="rounded-3xl border border-indigo-900/40 bg-zinc-950/80 p-6 backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-3">
              Новая заметка о ночном небе
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                type="text"
                placeholder="Заголовок наблюдения (например: 'Видел Орион в бинокль')"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
              <textarea
                placeholder="Ваши мысли, условия погоды или замеченные особенности..."
                rows={3}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-cyan-600 hover:bg-cyan-500 px-5 py-2 text-xs font-semibold text-white shadow-md transition-colors"
              >
                Сохранить заметку
              </button>
            </form>
          </div>

          {/* Notes list */}
          <div className="space-y-3">
            {notes.length === 0 ? (
              <p className="text-xs text-zinc-500 text-center py-6">
                Заметок пока нет. Запишите ваши первые впечатления о созвездиях выше!
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl border border-zinc-850 bg-zinc-950/60 p-5 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] text-zinc-400">{note.date}</span>
                    <h4 className="font-bold text-white text-base mt-0.5">{note.title}</h4>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed whitespace-pre-line">
                      {note.content}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-zinc-500 hover:text-rose-400 text-xs"
                    title="Удалить заметку"
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
          <h2 className="text-lg font-bold text-white mb-4">История результатов викторины</h2>
          {quizScores.length === 0 ? (
            <div className="text-center py-12 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/40">
              <p className="text-zinc-400 text-sm">Вы ещё не проходили космическую викторину.</p>
              <Link href="/quiz" className="mt-3 inline-block text-xs text-cyan-400 hover:underline">
                Пройти викторину прямо сейчас →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {quizScores.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-850 bg-zinc-950/60 p-4 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-zinc-400">{s.date}</span>
                    <div className="text-sm font-bold text-white">
                      Результат: {s.score} из {s.total} ({s.percentage}%)
                    </div>
                  </div>
                  <div className="rounded-full bg-cyan-950/60 border border-cyan-800 px-3 py-1 text-xs font-bold text-cyan-300">
                    {s.percentage >= 80 ? "Отлично 🌟" : s.percentage >= 60 ? "Хорошо 🚀" : "Старт 🔭"}
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
