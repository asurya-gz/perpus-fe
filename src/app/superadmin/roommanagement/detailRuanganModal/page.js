"use client";
import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa"; // Import ikon 'X' dari react-icons

const DetailRuanganModal = ({ isOpen, onClose, room }) => {
  if (!isOpen) return null; // Jika modal tidak dibuka, kembalikan null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-11/12 md:w-4/5 lg:w-3/5 h-4/5 overflow-y-auto relative">
        <span
          onClick={onClose}
          className="cursor-pointer text-gray-500 hover:text-gray-700 absolute top-3 right-3 text-2xl"
        >
          <FaTimes />
        </span>
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
          Detail Ruangan
        </h2>
        {room ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
            <img
              src={room.image || "/path/to/placeholder/image.jpg"} // Ganti dengan path placeholder jika tidak ada gambar
              alt={room.name}
              className="mb-4 w-full max-h-64 object-cover rounded-md" // Mengatur ukuran gambar
            />
            <p className="text-gray-700">{room.description}</p>
            <p className="text-gray-700">
              <strong>Kapasitas:</strong> {room.capacity}
            </p>
            {room.withLetter ? (
              <p className="text-red-600">
                <strong>* Ruangan ini membutuhkan surat peminjaman</strong>
              </p>
            ) : (
              <p className="text-green-600">
                <strong>* Tidak membutuhkan surat peminjaman</strong>
              </p>
            )}
            <h4 className="font-semibold mt-4 text-gray-800">Fasilitas:</h4>
            <ul className="list-disc list-inside mb-4">
              {room.facilities.map((facility, index) => (
                <li key={index} className="text-gray-700">
                  {facility}
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-gray-800">Aturan:</h4>
            <ul className="list-disc list-inside mb-4">
              {room.rules.map((rule, index) => (
                <li key={index} className="text-gray-700">
                  {rule}
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-gray-800">Slot Waktu:</h4>
            <p className="text-gray-700">
              <strong>Pagi:</strong> {room.timeSlots.morning}
            </p>
            <p className="text-gray-700">
              <strong>Siang:</strong> {room.timeSlots.afternoon}
            </p>
            <p className="text-gray-700">
              <strong>Sore:</strong> {room.timeSlots.evening}
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Tutup
            </button>
          </>
        ) : (
          <p className="text-gray-700">Ruangan tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

// Memastikan prop types
DetailRuanganModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  room: PropTypes.object, // Atau bisa lebih spesifik
};

export default DetailRuanganModal;
