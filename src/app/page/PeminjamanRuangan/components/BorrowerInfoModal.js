import React from "react";
import { Building, building } from "lucide-react"; // Mengganti ikon ruangan dengan ikon dari Lucide

const BorrowerInfoModal = ({ slot, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-center mb-6">
          <Building className="h-16 w-16 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Informasi Peminjam
        </h2>
        <p className="mb-2 text-gray-700">
          <strong>Slot Waktu:</strong> {slot.time}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Dipesan Oleh:</strong> {slot.borrower}
        </p>
        <p className="mb-4 text-gray-700">
          <strong>Peran:</strong> {slot.role}
        </p>
        <button
          className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition duration-200  focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default BorrowerInfoModal;
