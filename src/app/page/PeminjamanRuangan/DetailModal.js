"use client";
import React, { useState, useEffect } from "react";
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

export default function DetailModal({ room, onClose, ruanganData }) {
  if (!room) return null;

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const emailFromCookie = Cookies.get("email");
    const roleFromCookie = Cookies.get("role");
    setEmail(emailFromCookie);
    setRole(roleFromCookie);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-3xl h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
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
                src={room.image}
                alt={room.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center text-white">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Kapasitas: {room.capacity} orang</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{room.description}</p>
          </div>

          {/* Facilities Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <MonitorSmartphone className="text-blue-500" />
              <span>Fasilitas</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {room.facilities.map((facility, index) => (
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

          {/* Rules Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <ClipboardList className="text-blue-500" />
              <span>Tata Tertib Penggunaan</span>
            </h3>
            <div className="space-y-3">
              {room.rules.map((rule, index) => (
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

          {/* Time Slots */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Clock className="text-blue-500" />
              <span>Waktu Peminjaman</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(room.timeSlots).map(([period, time]) => (
                <div key={period} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-700 capitalize mb-1">
                    {period}
                  </div>
                  <div className="text-gray-600">{time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Selection and Booking */}
          {email && role ? (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="datePicker"
                  className="block text-gray-700 font-medium mb-2 flex items-center gap-2"
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
                room={room.name}
                selectedDate={selectedDate}
                ruanganData={ruanganData}
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
