import React, { useState } from "react";
import DetailModal from "./PeminjamanRuangan/DetailModal";
import ruanganData from "./PeminjamanRuangan/components/RuanganData/ruanganData";
import { Download, Users, Info, ChevronRight } from "lucide-react";

export default function Ruangan({ email, role }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const handleBoxClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Daftar Ruangan
          </h1>
          <p className="text-lg text-gray-600">
            Pilih ruangan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ruanganData.map((ruang) => (
            <div
              key={ruang.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredId(ruang.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={ruang.image}
                  alt={ruang.name}
                  className="h-48 w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <button
                  onClick={() => handleBoxClick(ruang)}
                  className={`absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transform transition-all duration-300 ${
                    hoveredId === ruang.id || selectedRoom?.id === ruang.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <span>Detail</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {ruang.name}
                </h2>

                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Kapasitas: {ruang.capacity} orang</span>
                </div>

                <p className="text-gray-700 mb-4">{ruang.description}</p>

                {ruang.withLetter && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-start space-x-2 text-amber-600 mb-3">
                      <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        Ruangan ini membutuhkan surat peminjaman
                      </p>
                    </div>

                    <a
                      href="/templateSuratPeminjaman.pdf"
                      download
                      className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Template Surat</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
