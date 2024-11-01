"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Headphones,
  User,
  Menu,
  X,
  Phone,
  Mail,
  LogOut,
  Building,
} from "lucide-react";

// Configuration for contact methods
const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "WhatsApp",
    href: "https://wa.me/+6282135876098",
    iconColor: "text-green-500",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:email@example.com",
    iconColor: "text-blue-500",
    external: false,
  },
];

// Configuration for user menu items
const getUserMenuItems = (isLoggedIn) => {
  if (isLoggedIn) {
    return [
      {
        href: "/page/Profile",
        icon: User,
        label: "Profile",
      },
      {
        href: "/manajemen-booking",
        icon: Building,
        label: "Manajemen Booking",
      },
      {
        href: "/page/Logout",
        icon: LogOut,
        label: "Logout",
      },
    ];
  }
  return [
    {
      href: "/page/Login",
      icon: User,
      label: "Masuk/Daftar",
    },
  ];
};

export default function Header({ email, role }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);

  // Memoized toggle functions to prevent unnecessary re-renders
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
    setContactOpen(false);
  }, []);

  const toggleContactMenu = useCallback(() => {
    setContactOpen((prev) => !prev);
  }, []);

  // Render contact dropdown
  const renderContactDropdown = (isMobile = false) => {
    const dropdownClass = isMobile
      ? "ml-8 space-y-3"
      : "absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-200 ease-in-out";

    const linkClass = isMobile
      ? "flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
      : "flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100";

    return (
      <div className={dropdownClass}>
        {CONTACT_METHODS.map(
          ({ icon: Icon, label, href, iconColor, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={linkClass}
            >
              <Icon className={`${isMobile ? "text-white" : iconColor} mr-2`} />
              <span>{label}</span>
            </a>
          )
        )}
      </div>
    );
  };

  // Render user menu
  const renderUserMenu = (isMobile = false) => {
    const isLoggedIn = email && role;
    const menuItems = getUserMenuItems(isLoggedIn);

    const menuClass = isMobile ? "space-y-6" : "flex items-center space-x-6";

    const linkClass = isMobile
      ? "flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-200"
      : "flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200";

    return (
      <div className={menuClass}>
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Link key={label} href={href} className={linkClass}>
            <Icon className={isMobile ? "text-white" : ""} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      <header className="bg-blue-900 text-white py-4 shadow-lg fixed w-full top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo and Title */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* Contact Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleContactMenu}
                  className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
                >
                  <Headphones />
                  <span>Hubungi Kami</span>
                </button>

                {isContactOpen && renderContactDropdown()}
              </div>

              {/* User Menu */}
              {renderUserMenu()}
            </nav>

            {/* Mobile Hamburger Menu */}
            <button
              className="md:hidden text-white p-2 hover:text-yellow-400 transition-colors duration-200"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-blue-900 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-blue-800">
            <button
              onClick={toggleSidebar}
              className="p-2 text-white hover:text-yellow-400 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {/* Contact Section */}
            <div className="space-y-4">
              <button
                onClick={toggleContactMenu}
                className="flex items-center space-x-3 w-full text-white hover:text-yellow-400 transition-colors duration-200"
              >
                <Headphones className="text-white" />
                <span>Hubungi Kami</span>
              </button>

              {isContactOpen && renderContactDropdown(true)}
            </div>

            {/* User Menu */}
            {renderUserMenu(true)}
          </nav>
        </div>
      </div>
    </div>
  );
}
