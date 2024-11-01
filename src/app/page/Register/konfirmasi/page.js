"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Mail,
  KeyRound,
  AlertCircle,
  Loader2,
} from "lucide-react";
import axios from "axios";

const KonfirmasiContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!verificationCode) {
      setMessage("Silakan masukkan kode verifikasi.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://be-perpus-undip.up.railway.app/api/verifikasi-pengguna",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 m-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Konfirmasi Pendaftaran
          </h2>
          <div className="mt-2 text-center">
            <p className="text-gray-600">Kode verifikasi telah dikirim ke:</p>
            <p className="font-medium text-blue-600 break-all">{email}</p>
          </div>
        </div>

        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label
              className="text-gray-700 text-sm font-medium mb-2 flex items-center"
              htmlFor="verificationCode"
            >
              <KeyRound className="w-4 h-4 mr-2 text-gray-500" />
              Kode Verifikasi
            </label>
            <div className="relative">
              <input
                type="text"
                id="verificationCode"
                className="w-full text-gray-600 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-lg tracking-wider"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Masukkan kode"
                required
                maxLength="6"
              />
            </div>
          </div>

          {message && (
            <div
              className={`flex items-center justify-center p-3 rounded-lg ${
                message.includes("berhasil")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.includes("berhasil") ? (
                <CheckCircle2 className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <span className="text-sm">{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Verifikasi Kode</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak menerima kode?{" "}
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Kirim ulang
          </button>
        </p>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="text-gray-600 font-medium">Memuat...</p>
    </div>
  </div>
);

const Konfirmasi = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <KonfirmasiContent />
    </Suspense>
  );
};

export default Konfirmasi;
