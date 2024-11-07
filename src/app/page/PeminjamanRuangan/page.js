"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalSlot from "./ModalSlot";
import BorrowerInfoModal from "./components/BorrowerInfoModal";
import { Clock, CheckCircle, XCircle, Info } from "lucide-react";

export default function PeminjamanRuangan({ room, selectedDate }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [borrowerInfo, setBorrowerInfo] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const compareDates = (date1, date2) => {
    return new Date(date1).toDateString() === new Date(date2).toDateString();
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/time-slots",
          {
            room_id: room.id,
          }
        );
        const filteredSlots = response.data.data.filter((slot) =>
          compareDates(slot.date, selectedDate)
        );

        setTimeSlots(filteredSlots);
        setError(null);
      } catch (err) {
        setError("Error loading time slots");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (room && selectedDate) {
      fetchTimeSlots();
    }
  }, [room, selectedDate]);

  const isPastSlot = (slot) => {
    const now = new Date();
    const slotDateTime = new Date(`${selectedDate}T${slot.time}`);
    return slotDateTime < now;
  };

  const getSlotColor = (status, isPast) => {
    if (isPast) {
      return "bg-gray-300 text-gray-500"; // Slot yang sudah lewat
    }
    switch (status) {
      case "available":
        return "bg-green-500 text-white border-green-600";
      case "booked":
        return "bg-blue-500 text-white border-blue-600";
      case "holiday":
        return "bg-gray-600 text-white border-gray-700";
      default:
        return "";
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.status === "available" && !isPastSlot(slot)) {
      setSelectedSlot(slot);
    } else if (slot.status === "booked") {
      setBorrowerInfo(slot);
    } else {
      alert(`Slot waktu ${slot.time} tidak tersedia.`);
    }
  };

  const closeModal = () => {
    setSelectedSlot(null);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Timeline Peminjaman {room?.name}
      </h2>

      <div className="flex flex-wrap justify-center text-sm mb-4 gap-4">
        <div className="flex items-center mr-6">
          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
          <span className="text-gray-700">Slot Tersedia</span>
        </div>
        <div className="flex items-center mr-6">
          <Clock className="w-4 h-4 text-blue-500 mr-2" />
          <span className="text-blue-600">Slot Dipesan</span>
        </div>
        <div className="flex items-center mr-6">
          <XCircle className="w-4 h-4 text-gray-600 mr-2" />
          <span className="text-gray-600">Tidak Ada Operasional</span>
        </div>
        <div className="flex items-center">
          <Info className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-400">Lewat Waktu</span>
        </div>
      </div>

      <p className="text-center text-gray-500 mb-4">
        *Slot yang dipilih berlaku booked +30 menit
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {timeSlots.length > 0 ? (
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
                <p>{slot.time.substring(0, 5)}</p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Tidak ada slot yang tersedia untuk tanggal ini.
          </p>
        )}
      </div>

      {selectedSlot && (
        <ModalSlot
          selectedSlot={selectedSlot}
          selectedDate={selectedDate}
          onClose={closeModal}
          timeSlots={timeSlots}
          withLetter={room?.with_letter}
        />
      )}

      {borrowerInfo && (
        <BorrowerInfoModal
          slot={borrowerInfo}
          onClose={() => setBorrowerInfo(null)}
        />
      )}
    </div>
  );
}
