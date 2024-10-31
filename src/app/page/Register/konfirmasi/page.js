"use client";
import React, { useState, Suspense } from "react"; // Tambahkan import Suspense
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

// Komponen untuk konten utama
const KonfirmasiContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      setMessage("Silakan masukkan kode verifikasi.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/verifikasi-pengguna",
        {
          email: email,
          verificationCode: verificationCode,
        }
      );

      if (response.status === 200) {
        setMessage("Kode verifikasi berhasil!");
        setTimeout(() => {
          router.push("/page/Login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage("Kode verifikasi salah.");
      } else {
        console.error("Error during verification:", error);
        setMessage("Terjadi kesalahan saat memverifikasi kode.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      <div className="bg-white bg-opacity-95 p-10 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Konfirmasi Pendaftaran
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Kode verifikasi telah dikirim ke email Anda: <strong>{email}</strong>.
          Silakan masukkan kode di bawah ini.
        </p>
        <form onSubmit={handleVerifyCode}>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="verificationCode"
            >
              Kode Verifikasi
            </label>
            <input
              type="text"
              id="verificationCode"
              className="w-full p-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <p className="text-red-500 mb-4">{message}</p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Verifikasi Kode
          </button>
        </form>
      </div>
    </div>
  );
};

// Komponen wrapper dengan Suspense
const Konfirmasi = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KonfirmasiContent />
    </Suspense>
  );
};

export default Konfirmasi;
