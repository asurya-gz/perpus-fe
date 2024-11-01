"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ShieldCheck, LogIn } from "lucide-react";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nimNip, setNimNip] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPasswordMessage("");

    try {
      // Validasi email UNDIP
      if (!email.endsWith(".undip.ac.id")) {
        setPasswordMessage("Gunakan Akun SSO UNDIP Untuk Mendaftar");
        setIsLoading(false);
        return;
      }

      // Validasi password
      if (password !== confirmPassword) {
        setPasswordMessage("Password dan Konfirmasi Password tidak cocok");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setPasswordMessage("Password harus minimal 6 karakter");
        setIsLoading(false);
        return;
      }

      // Registrasi user pertama
      const userResponse = await axios.post(
        "https://be-perpus-undip.up.railway.app/api/register",
        {
          email: email.toLowerCase().trim(),
          password,
          role,
        }
      );

      if (userResponse.data.message === "Pengguna berhasil dibuat") {
        // Registrasi data pengguna tambahan
        const penggunaResponse = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/register-pengguna",
          {
            name,
            nim_nip: nimNip,
            email: email.toLowerCase().trim(),
            role,
          }
        );

        if (
          penggunaResponse.data.message ===
          "Pengguna berhasil dibuat, kode verifikasi telah dikirim ke email Anda."
        ) {
          alert(
            "Berhasil mendaftarkan akun! Silakan cek email Anda untuk verifikasi."
          );
          router.push(
            `/page/Register/konfirmasi?email=${encodeURIComponent(email)}`
          );
        } else {
          throw new Error("Gagal mendaftarkan data pengguna tambahan");
        }
      } else {
        throw new Error("Gagal mendaftarkan user");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat mendaftar, coba lagi.";
      setPasswordMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-h-[90vh] w-[90%] max-w-md overflow-y-auto">
        <div className="flex flex-col items-center">
          <LogIn className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Daftar Akun Baru
          </h2>
          <p className="text-gray-500 mb-6">UPT Perpustakaan UNDIP</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Nama"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-600 text-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="NIM/NIP"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-600 text-gray-600"
              value={nimNip}
              onChange={(e) => setNimNip(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <select
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-600 text-gray-600"
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
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-600 text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-600 text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              className="w-full pl-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-600 text-gray-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordMessage && (
            <p className="text-red-500 text-sm">{passwordMessage}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-blue-400" : "bg-blue-600"
            } text-white p-3 rounded-md font-semibold hover:bg-blue-500 transition duration-200 flex items-center justify-center`}
          >
            {isLoading ? (
              "Mendaftar..."
            ) : (
              <>
                <User className="mr-2" />
                Daftar
              </>
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500">
          Sudah punya akun?{" "}
          <a href="/page/Login" className="text-blue-600 hover:underline">
            Masuk sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
