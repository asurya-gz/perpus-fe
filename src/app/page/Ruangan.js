"use client";
import React, { useState } from "react";
import DetailModal from "./PeminjamanRuangan/DetailModal";
import ruanganData from "./PeminjamanRuangan/components/RuanganData/ruanganData";
import { FaFileDownload } from "react-icons/fa"; // Menggunakan ikon untuk tombol download

export default function Ruangan(email, role) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBoxClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        Daftar Ruangan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ruanganData.map((ruang) => (
          <div
            key={ruang.id}
            className="bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
            onClick={() => handleBoxClick(ruang)}
          >
            <img
              src={ruang.image}
              alt={ruang.name}
              className="rounded-t-lg h-40 w-full object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-2">{ruang.name}</h2>
              <p className="text-gray-700 mb-1">{ruang.description}</p>
              <p className="text-gray-600">Kapasitas: {ruang.capacity}</p>
              {ruang.withLetter && (
                <div className="mt-3 border-t pt-3 border-gray-200">
                  <p className="text-red-500 font-medium">
                    * Ruangan ini membutuhkan surat peminjaman
                  </p>
                  <a
                    href="/templateSuratPeminjaman.pdf"
                    download
                    className="mt-2 inline-flex items-center bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
                  >
                    <FaFileDownload className="mr-1" /> Download Template
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <DetailModal
          room={selectedRoom}
          onClose={closeModal}
          ruanganData={ruanganData}
        />
      )}
    </div>
  );
}
