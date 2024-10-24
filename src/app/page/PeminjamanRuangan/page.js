"use client";
import React, { useState } from "react";
import ModalSlot from "./ModalSlot";
import { generateTimeSlots } from "./components/TimeSlots";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import BorrowerInfoModal from "./components/BorrowerInfoModal";

// Komponen utama untuk peminjaman ruangan
export default function PeminjamanRuangan({ room, selectedDate, ruanganData }) {
  const { ruang2_1, ruang2_2, ruang3_1, ruang3_2, ruang4 } =
    generateTimeSlots(); // Ambil data slot waktu dari generateTimeSlots
  const [selectedSlot, setSelectedSlot] = useState(null); // Simpan slot yang dipilih untuk modal
  const [borrowerInfo, setBorrowerInfo] = useState(null);

  // Fungsi untuk mengecek apakah slot sudah lewat
  const isPastSlot = (slot) => {
    const slotDateTime = new Date(`${selectedDate}T${slot.time}`);
    return slotDateTime < new Date();
  };

  // Cek ketersediaan ruanganData sebelum mencari selectedRuangan
  const selectedRuangan = ruanganData?.find((ruangan) => ruangan.name === room);

  // Pastikan selectedRuangan ada sebelum melanjutkan
  if (!selectedRuangan) {
    return (
      <p className="text-center text-gray-500">Data ruangan tidak tersedia.</p>
    );
  }

  console.log(selectedRuangan.withLetter);

  // Fungsi untuk menentukan warna berdasarkan status slot
  const getSlotColor = (status, isPast) => {
    if (isPast) {
      return "bg-gray-300 text-gray-500"; // Slot yang sudah lewat
    }
    switch (status) {
      case "available":
        return "bg-white text-gray-900";
      case "booked":
        return "bg-blue-400 text-white";
      case "holiday":
        return "bg-gray-600 text-white";
      default:
        return "";
    }
  };

  const handleSlotClick = (slot) => {
    console.log("Slot clicked: ", slot); // Debugging untuk slot yang diklik
    if (slot.status === "available" && !isPastSlot(slot)) {
      setSelectedSlot(slot);
    } else if (slot.status === "booked") {
      setBorrowerInfo(slot); // Simpan informasi peminjam ke state
    } else {
      alert(`Slot waktu ${slot.time} tidak tersedia.`);
    }
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedSlot(null);
    console.log("Modal closed"); // Debugging saat modal ditutup
  };

  const timeSlots = (() => {
    switch (room) {
      case "Ruang 2.1":
        return ruang2_1[selectedDate];
      case "Ruang 2.2":
        return ruang2_2[selectedDate];
      case "Ruang 3.1":
        return ruang3_1[selectedDate];
      case "Ruang 3.2":
        return ruang3_2[selectedDate];
      case "Ruang 4":
        return ruang4[selectedDate];
      default:
        return []; // Atau bisa menambahkan handling khusus
    }
  })();

  console.log("Available time slots: ", timeSlots); // Debugging untuk slot waktu yang tersedia

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Timeline Peminjaman {room.name}
      </h2>

      {/* Keterangan warna slot */}
      <div className="flex flex-wrap justify-center text-sm mb-4 gap-4">
        <div className="flex items-center mr-6">
          <div className="w-4 h-4 bg-white border border-gray-400 rounded-full mr-2"></div>
          <span className="text-gray-700">Slot Tersedia</span>
        </div>
        <div className="flex items-center mr-6">
          <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
          <span className="text-gray-700">Slot Dipesan</span>
        </div>
        <div className="flex items-center mr-6">
          <div className="w-4 h-4 bg-gray-600 rounded-full mr-2"></div>
          <span className="text-gray-700">Tidak Ada Operasional</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-gray-700">Lewat Waktu</span>
        </div>
      </div>

      <p className="text-center text-gray-500 mb-4">
        *Slot yang dipilih berlaku booked +30 menit
      </p>

      {/* Container untuk slot waktu dengan scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {Array.isArray(timeSlots) && timeSlots.length > 0 ? (
          timeSlots.map((slot, index) => {
            const pastSlot = isPastSlot(slot);
            return (
              <div
                key={index}
                className={`p-3 rounded-lg transition-all duration-200 ease-in-out text-xs font-medium text-center border ${getSlotColor(
                  slot.status,
                  pastSlot
                )} ${
                  pastSlot
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-lg hover:bg-blue-200"
                }`}
                onClick={() => !pastSlot && handleSlotClick(slot)}
              >
                <p>{slot.time}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 w-full">
            Tidak ada slot yang tersedia untuk tanggal ini.
          </p>
        )}
      </div>

      {/* Modal untuk slot yang dipilih */}
      {selectedSlot && (
        <ModalSlot
          selectedSlot={selectedSlot}
          selectedDate={selectedDate}
          onClose={closeModal}
          timeSlots={timeSlots}
          withLetter={selectedRuangan.withLetter}
        />
      )}

      {/* Modal untuk informasi peminjam */}
      {borrowerInfo && (
        <BorrowerInfoModal
          slot={borrowerInfo}
          onClose={() => setBorrowerInfo(null)} // Tutup modal dengan mengatur state menjadi null
        />
      )}
    </div>
  );
}
