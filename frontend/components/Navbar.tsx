"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

export function Navbar() {
  const pathname = usePathname();
  const { favorites } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Главная", icon: "✨" },
    { href: "/map", label: "Карта неба", icon: "🗺️" },
    { href: "/encyclopedia", label: "Энциклопедия", icon: "📖" },
    { href: "/search", label: "Поиск", icon: "🔍" },
    { href: "/quiz", label: "Викторина", icon: "🏆" },
    { href: "/about", label: "О проекте", icon: "🪐" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-400 to-indigo-500 shadow-md shadow-sky-500/15 transition-transform duration-300 group-hover:scale-105">
            <span className="text-lg">⭐</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-wide text-slate-100">
                Созвездия
              </span>
              <span className="rounded-full bg-amber-400/15 border border-amber-400/30 px-1.5 py-0.2 text-[9px] font-semibold text-amber-300">
                live
              </span>
            </div>
            <span className="hidden text-[11px] font-medium tracking-wider text-slate-400 sm:block">
              Атлас ночного неба
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex bg-slate-900/60 p-1 rounded-2xl border border-slate-800/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-300 border border-sky-400/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span className="text-xs">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile and Favorites Button */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/profile"
            className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold transition-all shadow-sm ${
              pathname === "/profile"
                ? "border-sky-400/50 bg-sky-950/40 text-sky-200"
                : "border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-sm">👤</span>
            <span className="hidden sm:inline">Кабинет</span>
            {favorites.length > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-1 text-[10px] font-bold text-slate-950 shadow-sm">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 md:hidden"
            aria-label="Меню"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-sky-950/60 text-sky-300 border border-sky-800/40"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
