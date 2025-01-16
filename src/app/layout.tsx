import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChefHatIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-orange-50 flex flex-col min-h-screen`}>
        <nav className="flex justify-between px-32 py-4 items-center bg-orange-100 border-b-2 border-orange-300">
          <div className="bg-orange-400 p-1 h-min w-min rounded-full">
            <Link className="" href={"/"}>
            <ChefHatIcon fill="#ffffff" className="size-12 text-orange-400" />
            </Link>
          </div>
          <ul className="flex items-center justify-end gap-16">
            <Link className="flex gap-1 p-3 rounded-xl border-2 border-orange-300 bg-orange-300" href={"/"}>
              Home
            </Link>
            <Link className="flex gap-1 p-3 border-2 border-orange-300 rounded-xl bg-orange-300" href={"/favourites"}>
              Favourites
            </Link>

            <span className="flex gap-1 p-3 border-2 border-green-500 rounded-xl bg-green-500 text-white">
              <PlusCircleIcon />
            <Link className="border border-green-500 rounded bg-green-500 text-white" href={"/recipe/add"}>
              Add Recipe
            </Link>
          </span>
          </ul>
        </nav>
        {children}
        <footer className="mt-auto w-full px-32 py-4 text-center items-center bg-orange-100 border-t-2 border-orange-300  bottom-0">
          ©2025 Jiří Novák pro <a className="text-blue-500" href="https://naostro.mendelu.cz/">https://naostro.mendelu.cz/</a>
        </footer>
      </body>
    </html>
  );
}
//