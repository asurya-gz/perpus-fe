"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import Header from "./page/Header";
import Hero from "./page/Hero";
import Fitur from "./page/Fitur";
import CaraKerja from "./page/CaraKerja";
import Kontak from "./page/Kontak";
import Footer from "./page/Footer";
import WhatsAppFloating from "./page/Wa";
import Peta from "./page/Peta";
import Ruangan from "./page/Ruangan";
import LoginAlert from "./LoginAlert";

export default function Home() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Ambil email dan role dari cookies
    const storedEmail = Cookies.get("email");
    const storedRole = Cookies.get("role");

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // Hanya dijalankan sekali saat komponen dipasang

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 scroll-smooth w-full overflow-x-hidden">
      <LoginAlert email={email} />
      <Header email={email} role={role} />{" "}
      {/* Kirim email dan role ke Header */}
      <Hero />
      <div className="container mx-auto px-4">
        <Fitur />
        <CaraKerja />
        <Ruangan email={email} role={role} />
        <Peta />
      </div>
      <Kontak />
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
