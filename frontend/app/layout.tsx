import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Созвездия — Интерактивная энциклопедия звёздного неба",
  description:
    "Интерактивный сайт для изучения звёзд и созвездий: живая анимация неба, интерактивная карта, космическая викторина и энциклопедия.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
        <UserProvider>
          <Starfield />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
