"use client";
import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Logika untuk mendaftarkan user
    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok");
      return;
    }
    console.log("Register:", { username, email, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }} // Ganti dengan URL gambar latar belakang
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg w-[500px] h-[600px]">
        {" "}
        {/* Membatasi tinggi div ke 600px */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo UPT Perpustakaan" className="h-12" />{" "}
          {/* Ganti dengan logo Anda */}
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Daftar Akun Baru
        </h2>
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          UPT Perpustakaan UNDIP
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Isi formulir di bawah ini untuk membuat akun baru.
        </p>
        <form
          onSubmit={handleRegister}
          className="overflow-y-auto h-[300px] px-2" // Mengubah tinggi form agar tidak memakan seluruh tempat
        >
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
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Daftar
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          <p>
            Sudah punya akun?{" "}
            <a href="/page/Login" className="text-blue-600 hover:underline">
              Masuk sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
