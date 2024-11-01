import React from "react";
import {
  Instagram,
  MessageCircle,
  Globe,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      href: "https://www.instagram.com/perpus.undip",
      icon: <Instagram className="w-5 h-5" />,
      text: "perpus.undip",
      label: "Instagram",
    },
    {
      href: "https://wa.me/6282135876098",
      icon: <MessageCircle className="w-5 h-5" />,
      text: "082135876098",
      label: "WhatsApp",
    },
    {
      href: "https://x.com/perpus_undip",
      icon: <Twitter className="w-5 h-5" />,
      text: "@perpus_undip",
      label: "Twitter",
    },
    {
      href: "https://www.youtube.com/@PerpustakaanUndip",
      icon: <Youtube className="w-5 h-5" />,
      text: "Perpustakaan Undip",
      label: "YouTube",
    },
    {
      href: "https://digilib.undip.ac.id",
      icon: <Globe className="w-5 h-5" />,
      text: "UPT Perpustakan UNDIP",
      label: "Website",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="UPT Perpustakaan UNDIP Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">UPT Perpustakaan</h3>
                <p className="text-blue-200">Universitas Diponegoro</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                <p className="text-sm text-blue-100">
                  Komplek Gedung Widya Puraya, Jl. Prof. Soedarto SH, Tembalang,
                  Kec. Tembalang, Kota Semarang, Jawa Tengah 50275
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-300" />
                <p className="text-sm text-blue-100">+62 821-3587-6098</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <p className="text-sm text-blue-100">
                  perpustakaan@live.undip.ac.id
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Layanan Kami</h4>
            <ul className="space-y-3">
              {[
                "E-Resources",
                "UNDIP Repository",
                "E-Journal",
                "Online Public Access",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-blue-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="mr-2">›</span>
                    {item}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Ikuti Kami</h4>
            <div className="grid grid-cols-1 gap-4">
              {socialLinks.map(({ href, icon, text, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors duration-200 group"
                >
                  <div className="p-2 bg-blue-800/50 rounded-lg group-hover:bg-blue-800 transition-colors">
                    {icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-xs text-blue-300">{text}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-blue-800/50">
          <p className="text-center text-sm text-blue-200">
            © {new Date().getFullYear()} UPT Perpustakaan Universitas
            Diponegoro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
