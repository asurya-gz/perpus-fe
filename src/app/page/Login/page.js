"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogIn, UserCircle2, Lock, Home, User, Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://be-perpus-undip.up.railway.app/api/login",
        {
          email: username,
          password,
        }
      );

      const { email, role } = response.data.user;

      Cookies.set("email", email);
      Cookies.set("role", role);

      router.push("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Email atau password salah");
      } else {
        setError("Terjadi kesalahan saat melakukan login. Silakan coba lagi.");
      }
      console.error("Terjadi kesalahan saat melakukan login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <UserCircle2
            size={64}
            className="text-blue-600 mb-2"
            strokeWidth={1.5}
          />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Sistem Peminjaman Ruangan
          </h2>
          <p className="text-gray-500 text-center">UPT Perpustakaan UNDIP</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="text-gray-700 mb-2 flex items-center"
            >
              <User className="mr-2 text-gray-500" size={20} />
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="w-full text-gray-600 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700 mb-2 flex items-center"
            >
              <Lock className="mr-2 text-gray-500" size={20} />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full text-gray-600 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Masuk</span>
              </>
            )}
          </button>

          <div className="text-center">
            <a
              href="/page/LupaPassword"
              className="text-blue-600 hover:underline font-semibold"
            >
              Lupa Password?
            </a>
          </div>
        </form>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Belum punya akun?{" "}
            <a
              href="/page/Register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Daftar sekarang
            </a>
          </p>

          <a
            href="/"
            className="flex items-center justify-center text-gray-500 hover:text-blue-600 transition duration-300"
          >
            <Home className="mr-2" size={20} />
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
}
