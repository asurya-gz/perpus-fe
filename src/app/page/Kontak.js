import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaGlobe,
} from "react-icons/fa";

export default function Kontak() {
  return (
    <footer className="bg-blue-900 text-white py-8 border-none">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo and Info Section */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/logo.png" alt="Company Logo" className="w-16 h-16 mr-4" />
          <div>
            <p className="text-lg font-semibold">UPT Perpustakaan</p>
            <p className="text-sm italic">Universitas Diponegoro</p>
            <p className="text-sm mt-2 text-slate-100">
              Komplek Gedung Widya Puraya, Jl. Prof. Soedarto SH, Tembalang,
              Kec. Tembalang, Kota Semarang, Jawa Tengah 50275
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end space-x-4">
          {[
            {
              href: "https://www.instagram.com/perpus.undip",
              icon: <FaInstagram />,
              text: "perpus.undip",
            },
            {
              href: "https://wa.me/6282135876098",
              icon: <FaWhatsapp />,
              text: "082135876098",
            },
            {
              href: "https://www.tiktok.com/@perpus.undip.press",
              icon: <FaTiktok />,
              text: "@perpus.undip.press",
            },
            {
              href: "https://x.com/perpus_undip",
              icon: <FaTwitter />,
              text: "@perpus_undip",
            },
            {
              href: "https://www.youtube.com/@PerpustakaanUndip",
              icon: <FaYoutube />,
              text: "Perpustakaan Undip",
            },
            {
              href: "https://digilib.undip.ac.id",
              icon: <FaGlobe />,
              text: "UPT Perpustakan UNDIP",
            },
          ].map(({ href, icon, text }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm mb-2 hover:underline"
            >
              {icon}
              <span>{text}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
