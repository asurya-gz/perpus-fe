"use client";
import React from "react";

export default function DeleteUserModal({ isOpen, onClose, userId, onDelete }) {
  const handleDelete = () => {
    // Logika untuk menghapus pengguna berdasarkan userId
    console.log("Deleting user with ID:", userId);
    // Panggil fungsi onDelete dari props untuk melakukan penghapusan
    onDelete(userId);
    onClose(); // Tutup modal setelah menghapus
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Delete User
        </h2>
        <p className="mb-4 text-gray-600">
          Apakah anda yakin ingin menghapus pengguna? akun yang dihapus tidak
          dapat dipulihkan
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
