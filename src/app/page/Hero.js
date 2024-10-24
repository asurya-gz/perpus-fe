import React from "react";

export default function Hero() {
  return (
    <div>
      <section
        className="bg-cover bg-center text-white py-20"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="bg-black bg-opacity-50 py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Selamat Datang di Sistem Peminjaman Ruangan UPT Perpustakaan
            </h2>
            <p className="text-lg mb-6">
              Sistem yang memudahkan Anda dalam melakukan peminjaman ruangan di
              Perpustakaan Universitas Diponegoro.
            </p>
            <a
              href="#features"
              className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500"
            >
              Mulai Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
