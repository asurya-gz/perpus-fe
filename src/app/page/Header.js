"use client";
import React, { useState } from "react";
import {
  FaHeadphones,
  FaUser,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaEnvelope,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";
import Link from "next/link";

export default function Header({ email, role }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    setContactOpen(false);
  };

  const toggleContactMenu = () => {
    setContactOpen(!isContactOpen);
  };

  console.log("Email dan role cookies header:", email, role);

  return (
    <div className="relative">
      <header className="bg-blue-900 text-white py-4 shadow-lg fixed w-full top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo dan Judul */}
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Logo UPT Perpustakaan"
                className="h-10 w-auto"
              />
              <h1 className="text-xl lg:text-2xl font-bold">
                UPT Perpustakaan Universitas Diponegoro
              </h1>
            </div>

            {/* Navigation untuk Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* Hubungi Kami Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleContactMenu}
                  className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
                >
                  <FaHeadphones />
                  <span>Hubungi Kami</span>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-200 ease-in-out ${
                    isContactOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <a
                    href="https://wa.me/123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaWhatsapp className="mr-2 text-green-500" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="mailto:email@example.com"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaEnvelope className="mr-2 text-blue-500" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Menu untuk User yang Sudah Login */}
              {email && role ? (
                <div className="flex items-center space-x-6">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/manajemen-booking"
                    className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <FaBuilding />
                    <span>Manajemen Booking</span>
                  </Link>
                  <Link
                    href="/page/Logout"
                    className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <Link
                  href="/page/Login"
                  className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
                >
                  <FaUser />
                  <span>Masuk/Daftar</span>
                </Link>
              )}
            </nav>

            {/* Hamburger Menu */}
            <button
              className="md:hidden text-white p-2 hover:text-yellow-400 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay ketika sidebar terbuka */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar untuk Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-blue-900 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header Sidebar */}
          <div className="p-4 border-b border-blue-800">
            <button
              onClick={toggleSidebar}
              className="p-2 text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Menu Sidebar */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {/* Hubungi Kami Section */}
            <div className="space-y-4">
              <button
                onClick={toggleContactMenu}
                className="flex items-center space-x-3 w-full text-white hover:text-yellow-400 transition-colors duration-200"
              >
                <FaHeadphones className="text-white" />
                <span>Hubungi Kami</span>
              </button>

              {isContactOpen && (
                <div className="ml-8 space-y-3">
                  <a
                    href="https://wa.me/+6282135876098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    <FaWhatsapp className="text-white" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="mailto:email@example.com"
                    className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    <FaEnvelope className="text-white" />
                    <span>Email</span>
                  </a>
                </div>
              )}
            </div>

            {/* Menu untuk User */}
            {email && role ? (
              <div className="space-y-6">
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <FaUser className="text-white" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/manajemen-booking"
                  className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <FaBuilding className="text-white" />
                  <span>Manajemen Booking</span>
                </Link>
                <Link
                  href="/page/Logout"
                  className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <FaSignOutAlt className="text-white" />
                  <span>Logout</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/page/Login"
                className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
              >
                <FaUser className="text-white" />
                <span>Masuk/Daftar</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
