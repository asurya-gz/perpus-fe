"use client";
import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaFileImport,
  FaEye,
} from "react-icons/fa";
import ruanganData from "@/app/page/PeminjamanRuangan/components/RuanganData/ruanganData";
import ImportRoomModal from "./importRoomModal/page";
import DeleteRoomModal from "./deleteRoomModal/page";
import DetailRuanganModal from "./detailRuanganModal/page";

export default function RoomManagementSuperAdmin() {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roomIdToDelete, setRoomIdToDelete] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null); // State untuk ruangan yang dipilih untuk detail
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State untuk modal detail

  const handleDetailClick = (room) => {
    setSelectedRoom(room); // Set ruangan yang dipilih
    setIsDetailModalOpen(true); // Buka modal detail
  };

  const handleEditClick = (id) => {
    console.log(`Edit ruangan dengan ID: ${id}`);
  };

  const handleDeleteClick = (id) => {
    setRoomIdToDelete(id); // Set ID ruangan yang akan dihapus
    setIsDeleteModalOpen(true); // Buka modal konfirmasi hapus
  };

  const handleAddRoomClick = () => {
    console.log("Tambah ruangan baru");
    // Logika untuk menambah ruangan baru
  };

  const handleImportRoomClick = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRoomIdToDelete(null); // Reset ID ruangan yang akan dihapus
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedRoom(null); // Reset ruangan yang dipilih
  };

  const handleDeleteConfirm = (id) => {
    console.log(`Ruangan dengan ID: ${id} telah dihapus`);
    closeDeleteModal(); // Tutup modal setelah konfirmasi
    // Tambahkan logika untuk menghapus ruangan dari data
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-black border-b-2 border-gray-300 pb-2">
        Pengelolaan Ruangan
      </h1>

      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={handleAddRoomClick}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus className="mr-2" />
          Tambah Ruangan
        </button>
        <button
          onClick={handleImportRoomClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <FaFileImport className="mr-2" />
          Import Ruangan
        </button>
      </div>

      {/* Modal untuk mengimpor ruangan */}
      <ImportRoomModal isOpen={isImportModalOpen} onClose={closeImportModal} />

      {/* Modal untuk konfirmasi hapus ruangan */}
      <DeleteRoomModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        roomId={roomIdToDelete}
        onDelete={handleDeleteConfirm}
      />

      {/* Modal untuk detail ruangan */}
      <DetailRuanganModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        room={selectedRoom} // Kirimkan ruangan yang dipilih
      />

      <div className="max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ruanganData.map((ruangan) => (
            <div
              key={ruangan.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <img
                src={ruangan.image}
                alt={ruangan.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {ruangan.name}
              </h2>
              <p className="text-gray-600">{ruangan.description}</p>
              <p className="mt-2 text-gray-800">
                <strong>Kapasitas:</strong> {ruangan.capacity}
              </p>
              {ruangan.withLetter ? (
                <p className="text-red-600 mt-2">
                  <strong>* Ruangan ini membutuhkan surat peminjaman</strong>
                </p>
              ) : (
                <p className="text-green-600 mt-2">
                  <strong>* Tidak membutuhkan surat peminjaman</strong>
                </p>
              )}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleDetailClick(ruangan)} // Pass the whole room object
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FaEye className="mr-2" />
                  Detail
                </button>
                <button
                  onClick={() => handleEditClick(ruangan.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(ruangan.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <FaTrashAlt className="mr-2" />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
