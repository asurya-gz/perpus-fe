import React from "react";
import { Library, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const handleScroll = () => {
    document.getElementById("cara").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <Library className="h-16 w-16 text-blue-500" />
          </div>

          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Selamat Datang di Sistem Peminjaman Ruangan UPT Perpustakaan
          </h1>

          <p className="mb-8 text-lg leading-8 text-gray-300">
            Sistem yang memudahkan Anda dalam melakukan peminjaman ruangan di
            Perpustakaan Universitas Diponegoro
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <Link href="/page/Login">
              <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>

            <button
              onClick={handleScroll}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Pelajari Lebih Lanjut
              <BookOpen className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
