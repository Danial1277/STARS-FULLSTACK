"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CONSTELLATIONS as defaultConstellations, STARS as defaultStars, Constellation, StarDetail } from "@/data/constellations";

export type UserRole = "guest" | "user" | "admin";

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

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  login: (name: string, email: string, role?: UserRole) => void;
  logout: () => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  readArticles: string[];
  toggleRead: (id: string) => void;
  isRead: (id: string) => boolean;

  notes: Note[];
  addNote: (title: string, content: string, targetId?: string) => void;
  deleteNote: (id: string) => void;

  quizScores: QuizScore[];
  saveQuizScore: (score: number, total: number) => void;

  // Admin capabilities
  customConstellations: Constellation[];
  addCustomConstellation: (constellation: Constellation) => void;
  deleteConstellation: (id: string) => void;
  systemUsers: SystemUser[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("user");
  const [userName, setUserNameState] = useState<string>("Даниал");
  const [userEmail, setUserEmail] = useState<string>("danial@example.com");

  const [favorites, setFavorites] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [customConstellations, setCustomConstellations] = useState<Constellation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock database of users for Admin view
  const [systemUsers] = useState<SystemUser[]>([
    { id: "1", name: "Даниал (Вы)", email: "danial@example.com", role: "admin", createdAt: "01.11.2026" },
    { id: "2", name: "Наргиз", email: "nargiz@example.com", role: "user", createdAt: "02.11.2026" },
    { id: "3", name: "Сатыбалды", email: "satybaldy@example.com", role: "user", createdAt: "03.11.2026" },
    { id: "4", name: "Гость #412", email: "guest@stars.net", role: "guest", createdAt: "05.11.2026" },
  ]);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("stars_role") as UserRole | null;
      if (savedRole) setRoleState(savedRole);

      const savedName = localStorage.getItem("stars_user_name");
      if (savedName) setUserNameState(savedName);

      const savedEmail = localStorage.getItem("stars_user_email");
      if (savedEmail) setUserEmail(savedEmail);

      const savedFavs = localStorage.getItem("stars_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedRead = localStorage.getItem("stars_read");
      if (savedRead) setReadArticles(JSON.parse(savedRead));

      const savedNotes = localStorage.getItem("stars_notes");
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedScores = localStorage.getItem("stars_quiz_scores");
      if (savedScores) setQuizScores(JSON.parse(savedScores));

      const savedCustom = localStorage.getItem("stars_custom_constellations");
      if (savedCustom) setCustomConstellations(JSON.parse(savedCustom));
    } catch {
      // ignore SSR storage issues
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_role", role);
    } catch {}
  }, [role, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_user_name", userName);
    } catch {}
  }, [userName, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stars_user_email", userEmail);
    } catch {}
  }, [userEmail, isLoaded]);

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
      localStorage.setItem("stars_custom_constellations", JSON.stringify(customConstellations));
    } catch {}
  }, [customConstellations, isLoaded]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const setUserName = (name: string) => {
    setUserNameState(name);
  };

  const login = (name: string, email: string, newRole: UserRole = "user") => {
    setUserNameState(name);
    setUserEmail(email);
    setRoleState(newRole);
  };

  const logout = () => {
    setRoleState("guest");
    setUserNameState("Гость");
    setUserEmail("");
  };

  const toggleFavorite = (id: string) => {
    if (role === "guest") return;
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleRead = (id: string) => {
    if (role === "guest") return;
    setReadArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isRead = (id: string) => readArticles.includes(id);

  const addNote = (title: string, content: string, targetId?: string) => {
    if (role === "guest") return;
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
    if (role === "guest") return; // Гость проходит викторину без сохранения результатов
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

  const addCustomConstellation = (c: Constellation) => {
    if (role !== "admin") return;
    setCustomConstellations((prev) => [c, ...prev]);
  };

  const deleteConstellation = (id: string) => {
    if (role !== "admin") return;
    setCustomConstellations((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        userName,
        setUserName,
        userEmail,
        login,
        logout,
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
        customConstellations,
        addCustomConstellation,
        deleteConstellation,
        systemUsers,
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
