"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditProfileModal = ({
  isOpen,
  onClose,
  profileData,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);
  const [nim_nip, setNimNip] = useState(profileData.nim_nip);
  const [role, setRole] = useState(profileData.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "https://be-perpus-undip.up.railway.app/api/edit-pengguna-by-email",
        {
          email,
          name,
          nim_nip,
          role,
        }
      );

      onUpdateProfile({ name, email, nim_nip, role });
      alert("Berhasil Mengedit Data!");
      // Tutup modal setelah menyimpan
      onClose();
    } catch (err) {
      console.error("Error saving profile data:", err);
      setError("Gagal menyimpan data profil. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
        <h2 className="text-lg font-semibold text-blue-600">Edit Profil</h2>
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-500">
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 text-gray-600 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-500">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 text-gray-600 block w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-500">
            Nomor Identitas
          </label>
          <input
            type="text"
            value={nim_nip}
            onChange={(e) => setNimNip(e.target.value)}
            className="mt-1 text-gray-600 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-500">
            Role
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 text-gray-600 block w-full p-2 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600"
            } text-white p-2 rounded hover:bg-blue-700 transition-colors`}
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
