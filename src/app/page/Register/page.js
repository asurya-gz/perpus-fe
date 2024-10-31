"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import axios from "axios";

export default function Register() {
  const router = useRouter(); // Inisialisasi router
  const [name, setName] = useState("");
  const [nimNip, setNimNip] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi email
    if (!email.endsWith(".undip.ac.id")) {
      setPasswordMessage("Gunakan Akun SSO UNDIP Untuk Mendaftar");
      return; // Hentikan eksekusi lebih lanjut jika email tidak valid
    }

    if (password !== confirmPassword) {
      setPasswordMessage("Password dan Konfirmasi Password tidak cocok");
      return; // Hentikan eksekusi jika password tidak cocok
    }

    // Jika password cocok, lanjutkan dengan proses registrasi
    console.log("Register:", { name, nimNip, role, email, password });

    try {
      // Buat pengguna di tabel users terlebih dahulu
      const userResponse = await axios.post(
        "http://localhost:4000/api/register",
        {
          email,
          password,
          role,
        }
      );
      console.log(
        "Pengguna di tabel users berhasil dibuat:",
        userResponse.data
      );

      // Jika berhasil, lanjutkan untuk membuat pengguna di tabel pengguna
      const penggunaResponse = await axios.post(
        "http://localhost:4000/api/register-pengguna",
        {
          name,
          nim_nip: nimNip,
          email,
          role,
        }
      );
      console.log(
        "Pengguna di tabel pengguna berhasil dibuat:",
        penggunaResponse.data
      );

      alert("Berhasil mendaftarkan akun!");

      // Redirect ke halaman konfirmasi dengan email sebagai query parameter
      router.push(
        `/page/Register/konfirmasi?email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mendaftar:",
        error.response?.data || error.message
      );
      setPasswordMessage("Terjadi kesalahan saat mendaftar, coba lagi."); // Menampilkan pesan kesalahan
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg w-[500px] h-[625px]">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Logo UPT Perpustakaan" className="h-12" />
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
          className="overflow-y-auto h-[300px] px-2"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nimNip">
              NIM/NIP
            </label>
            <input
              type="text"
              id="nimNip"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={nimNip}
              onChange={(e) => setNimNip(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Peran
            </label>
            <select
              id="role"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Pilih Peran
              </option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Dosen">Dosen</option>
              <option value="Staff">Staff</option>
            </select>
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
          <p className="text-red-500 mb-4">{passwordMessage}</p>
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
