"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PeminjamanRuangan from "./page";
import {
  X,
  CalendarDays,
  ClipboardList,
  Clock,
  Users,
  CheckSquare,
  Lock,
  MonitorSmartphone,
  AlertCircle,
} from "lucide-react";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function DetailModal({ room, onClose, isOpen }) {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!room?.id) return;

      try {
        setLoading(true);
        const response = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/get-ruangan-by-id",
          {
            id: room.id,
          }
        );
        setRoomData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching room data:", err);
        setError("Gagal mengambil data ruangan");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [room?.id]);

  useEffect(() => {
    const emailFromCookie = Cookies.get("email");
    const roleFromCookie = Cookies.get("role");
    setEmail(emailFromCookie);
    setRole(roleFromCookie);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Return null jika modal tidak terbuka
  if (!isOpen) return null;

  // Tampilkan loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data ruangan...</p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan error jika ada
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="mt-4 text-red-600">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Return null jika tidak ada data
  if (!roomData) return null;

  const {
    name = "",
    description = "",
    capacity = "",
    image = "",
    with_letter = 0,
    facilities = [],
    rules = [],
    time_slots = [],
  } = roomData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-3xl h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Main Image and Info */}
          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center text-white">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Kapasitas: {capacity}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Facilities Section */}
          {facilities?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <MonitorSmartphone className="text-blue-500" />
                <span>Fasilitas</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {facilities.map((facility, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg"
                  >
                    <CheckSquare className="w-4 h-4 text-green-500" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules Section */}
          {rules?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <ClipboardList className="text-blue-500" />
                <span>Tata Tertib Penggunaan</span>
              </h3>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Time Slots */}
          {time_slots?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Clock className="text-blue-500" />
                <span>Waktu Peminjaman</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {time_slots.map((slot, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-700 capitalize mb-1">
                      {slot.period}
                    </div>
                    <div className="text-gray-600">{slot.time_range}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Date Selection and Booking */}
          {email && role ? (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="datePicker"
                  className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                >
                  <CalendarDays className="w-4 h-4 text-blue-500" />
                  Pilih Tanggal
                </label>
                <input
                  type="date"
                  id="datePicker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={getTodayDate()}
                />
              </div>
              <PeminjamanRuangan
                room={roomData}
                selectedDate={selectedDate}
                withLetter={with_letter}
              />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Fitur Terkunci
              </h4>
              <p className="text-red-500 font-medium">
                Anda harus login terlebih dahulu untuk melakukan peminjaman
                ruangan.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
