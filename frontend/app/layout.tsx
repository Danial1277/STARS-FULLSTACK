import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Созвездия — Интерактивный астрономический атлас",
  description:
    "Атлас созвездий и ярких звёзд: интерактивная карта небосвода, каталог объектов, мифология и проверка астрономических знаний.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#06080e] space-background text-slate-100 font-sans selection:bg-slate-700 selection:text-white">
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
