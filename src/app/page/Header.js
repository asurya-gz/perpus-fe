"use client";
import React, { useState } from "react";
import {
  FaHeadphones,
  FaUser,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setContactOpen(false); // Tutup menu kontak ketika sidebar ditutup
  };

  const toggleContactMenu = () => {
    setContactOpen(!isContactOpen); // Buka/tutup menu kontak ketika diklik
  };

  return (
    <div>
      <header className="bg-blue-900 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/logo.png" // Ganti dengan path ke logo Anda
              alt="Logo UPT Perpustakaan"
              className="h-12 mr-2" // Ukuran logo dan jarak
            />
            <h1 className="text-2xl font-bold">
              UPT Perpustakaan Universitas Diponegoro
            </h1>
          </div>
          <nav className="hidden md:flex items-center relative">
            <div
              className="relative flex items-center text-lg mx-4 hover:text-yellow-400 cursor-pointer"
              onClick={toggleContactMenu}
            >
              <FaHeadphones className="mr-1" /> {/* Ikon headphone */}
              Hubungi Kami
              <div
                className={`absolute left-0 bg-white text-blue-900 rounded shadow-lg p-2 mt-2 transition-all duration-300 ease-in-out ${
                  isContactOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                style={{ top: "100%", minWidth: "180px" }}
              >
                <a
                  href="https://wa.me/123456789" // Ganti dengan nomor WA
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-lg px-4 py-2 hover:bg-gray-200"
                >
                  <FaWhatsapp className="mr-2" /> WhatsApp
                </a>
                <a
                  href="mailto:email@example.com" // Ganti dengan email Anda
                  className="flex items-center text-lg px-4 py-2 hover:bg-gray-200"
                >
                  <FaEnvelope className="mr-2" /> Email
                </a>
              </div>
            </div>
            <Link
              href="/page/Login" // Ganti dengan path yang sesuai
              className="flex items-center text-lg mx-4 hover:text-yellow-400"
            >
              <FaUser className="mr-1" /> {/* Ikon orang */}
              Masuk/Daftar
            </Link>
          </nav>
          {/* Hamburger icon for mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />} {/* Icon toggle */}
          </button>
        </div>

        {/* Sidebar for small screens */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-blue-900 text-white transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden z-50`} // Tambahkan z-50 untuk mencegah konflik dengan konten lain
          style={{ zIndex: 50 }} // Pastikan sidebar di atas konten lain
        >
          <div className="p-6 relative">
            <button
              className="text-white text-2xl mb-6"
              onClick={toggleSidebar}
            >
              <FaTimes /> {/* Icon to close sidebar */}
            </button>
            <nav className="flex flex-col">
              <div
                className="flex flex-col text-lg mb-4 hover:text-yellow-400 cursor-pointer"
                onClick={toggleContactMenu}
              >
                <div className="flex items-center">
                  <FaHeadphones className="mr-2" /> Hubungi Kami
                </div>
                {isContactOpen && (
                  <div
                    className={`bg-white text-blue-900 rounded shadow-lg mt-2 transition-all duration-300 ease-in-out visible opacity-100 z-40`} // Hilangkan posisi absolute
                    style={{ minWidth: "180px" }}
                  >
                    <a
                      href="https://wa.me/123456789" // Ganti dengan nomor WA
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-lg px-4 py-2 hover:bg-gray-200"
                    >
                      <FaWhatsapp className="mr-2" /> WhatsApp
                    </a>
                    <a
                      href="mailto:email@example.com" // Ganti dengan email Anda
                      className="flex items-center text-lg px-4 py-2 hover:bg-gray-200"
                    >
                      <FaEnvelope className="mr-2" /> Email
                    </a>
                  </div>
                )}
              </div>
              <Link
                href="/page/Login" // Ganti dengan path yang sesuai
                className="flex items-center text-lg hover:text-yellow-400"
              >
                <FaUser className="mr-2" /> Masuk/Daftar
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
