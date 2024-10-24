import React from "react";
import { MdMeetingRoom } from "react-icons/md"; // Import ikon ruangan

const BorrowerInfoModal = ({ slot, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/3">
        {/* Jika ada ikon ruangan */}
        <div className="flex justify-center mb-4">
          <MdMeetingRoom className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Informasi Peminjam</h2>
        <p className="mb-2">Slot waktu: {slot.time}</p>
        <p className="mb-2">Dipesan oleh: {slot.borrower}</p>
        <p className="mb-2">Peran: {slot.role}</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default BorrowerInfoModal;
