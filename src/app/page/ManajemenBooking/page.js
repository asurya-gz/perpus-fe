"use client";
import React, { useEffect, useState } from "react";
import { Building, ArrowLeft } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BookingHistoryModal from "./BookingHistoryModal";

export default function ManajemenBooking() {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearestSlot, setNearestSlot] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const userEmail = Cookies.get("email");
        if (!userEmail) {
          throw new Error("Email pengguna tidak ditemukan dalam cookies");
        }

        const response = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/time-slots/by-email",
          { email: userEmail }
        );

        let slots;
        if (response.data && Array.isArray(response.data)) {
          slots = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          slots = response.data.data;
        } else if (
          response.data &&
          response.data.message === "Slot waktu berhasil ditemukan" &&
          Array.isArray(response.data.data)
        ) {
          slots = response.data.data;
        } else {
          throw new Error("Format data tidak sesuai");
        }

        if (slots.length === 0) {
          setError("Anda belum pernah melakukan peminjaman");
        } else {
          setBookedSlots(slots);
        }
      } catch (err) {
        setError(err.message || "Gagal mengambil data booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, []);

  useEffect(() => {
    const findNearestSlot = () => {
      const now = new Date();
      const futureSlots = bookedSlots.filter((slot) => {
        const slotDate = new Date(slot.date);
        const [hours, minutes] = slot.time.split(":").map(Number);
        slotDate.setHours(hours, minutes, 0);
        return slotDate > now;
      });

      if (futureSlots.length > 0) {
        const nearest = futureSlots.reduce((nearest, current) => {
          const nearestDate = new Date(nearest.date);
          const [nearestHours, nearestMinutes] = nearest.time
            .split(":")
            .map(Number);
          nearestDate.setHours(nearestHours, nearestMinutes, 0);

          const currentDate = new Date(current.date);
          const [currentHours, currentMinutes] = current.time
            .split(":")
            .map(Number);
          currentDate.setHours(currentHours, currentMinutes, 0);

          return currentDate < nearestDate ? current : nearest;
        });

        setNearestSlot(nearest);
      }
    };

    findNearestSlot();
  }, [bookedSlots]);

  const handleCancelAllBookings = async (roomId) => {
    try {
      // Mendapatkan semua slot untuk room yang dipilih
      const slotsToCancel = groupedSlots[roomId];
      const now = new Date();

      // Fungsi untuk mengidentifikasi slot yang belum lewat
      const isSlotValid = (slot) => {
        const slotDate = new Date(slot.date);
        const [hours, minutes] = slot.time.split(":").map(Number);
        slotDate.setHours(hours, minutes, 0);
        return slotDate > now;
      };

      // Filter hanya slot yang belum lewat
      const validSlots = slotsToCancel.filter(isSlotValid);

      if (validSlots.length > 0) {
        // Kirim request dengan array dari slot IDs yang akan dibatalkan
        const response = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/time-slots/reset-multiple",
          {
            slotIds: validSlots.map((slot) => slot.id),
          }
        );

        if (response.data.totalReset > 0) {
          // Update state bookedSlots untuk menghapus slot yang valid yang dibatalkan
          setBookedSlots((prevSlots) =>
            prevSlots.filter((slot) => !validSlots.includes(slot))
          );
          alert(`${response.data.totalReset} booking berhasil dibatalkan.`);
          window.location.reload();
        } else {
          alert("Tidak ada booking yang dapat dibatalkan.");
        }
      } else {
        alert("Tidak ada booking aktif yang dapat dibatalkan untuk ruang ini.");
      }
    } catch (err) {
      console.error("Error cancelling bookings:", err);
      alert("Gagal membatalkan booking.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const calculateCountdown = (slot) => {
    const slotDate = new Date(slot.date);
    const [hours, minutes] = slot.time.split(":").map(Number);
    slotDate.setHours(hours, minutes, 0);

    const now = new Date();

    if (slotDate <= now) {
      return "Waktu sudah lewat";
    }

    const diffInMilliseconds = slotDate - now;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hoursLeft = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutesLeft = Math.floor((diffInSeconds % 3600) / 60);

    if (days > 0) {
      return `${days} hari ${hoursLeft} jam ${minutesLeft} menit`;
    }
    return `${hoursLeft} jam ${minutesLeft} menit`;
  };

  // Filter slots for today and future dates
  const filteredSlots = bookedSlots.filter((slot) => {
    const slotDate = new Date(slot.date);
    const [hours, minutes] = slot.time.split(":").map(Number);
    slotDate.setHours(hours, minutes, 0);
    const now = new Date();
    return slotDate > now;
  });

  // Group slots by room
  const groupedSlots = filteredSlots.reduce((groups, slot) => {
    if (!groups[slot.room_id]) {
      groups[slot.room_id] = [];
    }
    groups[slot.room_id].push(slot);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Memuat data booking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600">{`Error: ${error}`}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6"
      >
        <ArrowLeft size={24} className="mr-2" />
        Kembali
      </button>

      {nearestSlot && (
        <div className="max-w-4xl mx-auto p-6 bg-indigo-100 rounded-lg shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Slot Terdekat
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-gray-800">{`Tanggal: ${formatDate(
                nearestSlot.date
              )} - ${nearestSlot.time}`}</p>
              <p className="text-sm text-gray-600">Peran: {nearestSlot.role}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                {calculateCountdown(nearestSlot)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Manajemen Booking
        </h2>
        <BookingHistoryModal bookedSlots={bookedSlots} />

        {Object.keys(groupedSlots).length === 0 ? (
          <p className="text-gray-600">
            Anda belum memiliki booking slot yang aktif.
          </p>
        ) : (
          <ul className="space-y-6">
            {Object.entries(groupedSlots).map(([roomId, slots]) => (
              <li
                key={roomId}
                className="p-6 bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    {slots.length > 0 && calculateCountdown(slots[0])}
                  </p>
                  <button
                    onClick={() => handleCancelAllBookings(roomId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Batalkan Semua Booking
                  </button>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <Building className="text-indigo-600" size={24} />
                  <p className="text-xl font-semibold text-gray-800">
                    {`Ruang ${roomId}`}
                  </p>
                </div>
                {slots.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 mb-4 rounded-lg"
                  >
                    <div>
                      <p className="text-sm text-gray-600">{`${slot.time} - ${slot.role}`}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(slot.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
