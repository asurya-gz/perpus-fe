"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi
import { FaArrowLeft } from "react-icons/fa"; // Import icon untuk back home
import Cookies from "js-cookie"; // Import js-cookie

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Inisialisasi router

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://be-perpus-undip.up.railway.app/api/login",
        {
          email: username, // Ganti username dengan email
          password,
        }
      );

      // Ambil email dan role dari respons
      const { email, role } = response.data.user; // Sesuaikan dengan struktur respons Anda

      // Simpan email dan role ke cookies
      Cookies.set("email", email);
      Cookies.set("role", role);

      alert("Berhasil Login");
      router.push("/");
    } catch (error) {
      // Tampilkan pesan kesalahan jika ada
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(
          "Terjadi kesalahan saat melakukan login. Silakan coba lagi."
        );
      }
      console.error("Terjadi kesalahan saat melakukan login:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }} // Ganti dengan URL gambar latar Anda
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo UPT Perpustakaan" className="h-12" />
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
            <FaArrowLeft className="mr-2" />
            Back home
          </a>
        </p>
      </div>
    </div>
  );
}
