import React from "react";
import { FaClock, FaBell, FaFileAlt } from "react-icons/fa"; // Mengimpor ikon dari react-icons

export default function Fitur() {
  return (
    <div>
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-8 text-blue-900">Fitur Utama</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartu Peminjaman Cepat */}
            <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50">
              <div className="flex justify-center mb-4">
                <FaClock className="text-4xl text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Peminjaman Cepat</h4>
              <p className="text-gray-700">
                Proses peminjaman ruangan yang cepat dan efisien hanya dengan
                beberapa klik.
              </p>
            </div>

            {/* Kartu Notifikasi Pengingat */}
            <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50">
              <div className="flex justify-center mb-4">
                <FaBell className="text-4xl text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold mb-4">
                Notifikasi Pengingat
              </h4>
              <p className="text-gray-700">
                Dapatkan notifikasi berupa hitung mundur untuk mengingatkan
                peminjaman Anda.
              </p>
            </div>

            {/* Kartu Laporan Lengkap */}
            <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50">
              <div className="flex justify-center mb-4">
                <FaFileAlt className="text-4xl text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold mb-4">Laporan Lengkap</h4>
              <p className="text-gray-700">
                Laporan lengkap tentang riwayat peminjaman dan penggunaan
                ruangan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
