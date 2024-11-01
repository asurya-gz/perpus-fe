"use client";
import React, { useState } from "react";
import { Key } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie"; // Impor js-cookie

const UbahPasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Kata sandi baru dan konfirmasi tidak cocok.");
      return;
    }

    // Ambil email dari cookies
    const email = Cookies.get("email"); // Pastikan nama cookie sesuai dengan yang Anda gunakan

    try {
      const response = await axios.put(
        "https://be-perpus-undip.up.railway.app/api/change-password",
        {
          email, // Gunakan email dari cookie
          oldPassword,
          newPassword,
        }
      );

      setSuccess(response.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert("Password Berhasil Di Ubah!");
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" onClick={onClose} />
        <div className="bg-white rounded-lg p-6 z-20 w-full max-w-md">
          <div className="flex items-center mb-4">
            <Key className="mr-2 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Ubah Password</h3>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Password Lama
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full border text-gray-500 border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Password Baru
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 text-gray-500 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 text-gray-500 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 text-gray-500 hover:text-gray-700"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Ubah Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UbahPasswordModal;
