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
    { href: "/", label: "Главная" },
    { href: "/map", label: "Карта неба" },
    { href: "/encyclopedia", label: "Энциклопедия" },
    { href: "/search", label: "Поиск" },
    { href: "/quiz", label: "Викторина" },
    { href: "/about", label: "О проекте" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-950/60 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <svg
              className="h-5 w-5 text-white animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider text-white">
              СОЗВЕЗДИЯ
            </span>
            <span className="hidden text-[10px] tracking-widest text-cyan-400 uppercase sm:block">
              Интерактивный атлас
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-900/50 text-cyan-300 shadow-inner shadow-cyan-500/10"
                    : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Profile and Favorites Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
              pathname === "/profile"
                ? "border-cyan-500/60 bg-cyan-950/40 text-cyan-200"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <svg
              className="h-4 w-4 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="hidden sm:inline">Кабинет</span>
            {favorites.length > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[11px] font-bold text-black">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-800 md:hidden"
            aria-label="Меню"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-black/95 px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col gap-1">
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
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-900/50 text-cyan-300"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
