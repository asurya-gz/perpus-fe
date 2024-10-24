"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import icon untuk back home

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Tambahkan logika untuk menangani proses login di sini
    console.log("Login:", { username, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }} // Ganti dengan URL gambar latar Anda
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg w-[500px]">
        {" "}
        {/* Mengubah lebar */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo UPT Perpustakaan" className="h-12" />{" "}
          {/* Ganti dengan logo Anda */}
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Sistem Peminjaman Ruangan
        </h2>
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          UPT Perpustakaan UNDIP
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Selamat datang di sistem peminjaman ruangan. Silakan masuk untuk
          melanjutkan.
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Masuk
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Belum punya akun?{" "}
          <a href="/page/Register" className="text-blue-600 hover:underline">
            Daftar sekarang
          </a>
        </p>
        <p className="mt-4 text-center text-gray-500">
          <a
            href="/"
            className="flex items-center justify-center hover:underline"
          >
            <FaArrowLeft className="mr-2" /> {/* Ikon panah kiri */}
            Back home
          </a>
        </p>
      </div>
    </div>
  );
}
