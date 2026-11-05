"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  targetId?: string;
}

export interface QuizScore {
  date: string;
  score: number;
  total: number;
  percentage: number;
}

interface UserContextType {
  favorites: string[]; // ids of constellations or stars
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  readArticles: string[]; // ids of constellations or stars
  toggleRead: (id: string) => void;
  isRead: (id: string) => boolean;

  notes: Note[];
  addNote: (title: string, content: string, targetId?: string) => void;
  deleteNote: (id: string) => void;

  quizScores: QuizScore[];
  saveQuizScore: (score: number, total: number) => void;

  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [userName, setUserName] = useState<string>("Звёздный странник");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("stars_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedRead = localStorage.getItem("stars_read");
      if (savedRead) setReadArticles(JSON.parse(savedRead));

      const savedNotes = localStorage.getItem("stars_notes");
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedScores = localStorage.getItem("stars_quiz_scores");
      if (savedScores) setQuizScores(JSON.parse(savedScores));

      const savedName = localStorage.getItem("stars_user_name");
      if (savedName) setUserName(savedName);
    } catch {
      // ignore localStorage errors in SSR / private mode
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_read", JSON.stringify(readArticles));
    } catch {}
  }, [readArticles, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_notes", JSON.stringify(notes));
    } catch {}
  }, [notes, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_quiz_scores", JSON.stringify(quizScores));
    } catch {}
  }, [quizScores, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_user_name", userName);
    } catch {}
  }, [userName, isLoaded]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleRead = (id: string) => {
    setReadArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isRead = (id: string) => readArticles.includes(id);

  const addNote = (title: string, content: string, targetId?: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString("ru-RU"),
      targetId,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const saveQuizScore = (score: number, total: number) => {
    const newScore: QuizScore = {
      date: new Date().toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      score,
      total,
      percentage: Math.round((score / total) * 100),
    };
    setQuizScores((prev) => [newScore, ...prev.slice(0, 9)]);
  };

  return (
    <UserContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        readArticles,
        toggleRead,
        isRead,
        notes,
        addNote,
        deleteNote,
        quizScores,
        saveQuizScore,
        userName,
        setUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
