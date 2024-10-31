"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import PeminjamanRuangan from "./page";
import { FaClipboardList, FaClock, FaRegEdit, FaLock } from "react-icons/fa";

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
    // Ambil email dan role dari cookies
    const emailFromCookie = Cookies.get("email");
    const roleFromCookie = Cookies.get("role");
    setEmail(emailFromCookie);
    setRole(roleFromCookie);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-[80%] h-[80%] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {room.name}
        </h2>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-56 object-cover rounded-lg shadow-md mb-6"
        />
        <p className="text-gray-500 text-lg mb-6">Kapasitas: {room.capacity}</p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-500" /> Fasilitas:
        </h3>
        <ul className="list-disc list-inside mb-6">
          {room.facilities.map((facility, index) => (
            <li key={index} className="text-gray-600 flex items-center mb-1">
              <FaRegEdit className="mr-2 text-gray-400" /> {facility}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-500" /> Tata Tertib
          Penggunaan:
        </h3>
        <ul className="list-disc list-inside mb-6">
          {room.rules.map((rule, index) => (
            <li key={index} className="text-gray-600 flex items-center mb-1">
              <FaRegEdit className="mr-2 text-gray-400" /> {rule}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaClock className="mr-2 text-blue-500" /> Waktu Peminjaman:
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <p className="text-gray-600 mb-2">Pagi: {room.timeSlots.morning}</p>
          <p className="text-gray-600 mb-2">
            Siang: {room.timeSlots.afternoon}
          </p>
          <p className="text-gray-600 mb-2">Sore: {room.timeSlots.evening}</p>
        </div>

        {email && role ? (
          <>
            <div className="mb-6">
              <label
                htmlFor="datePicker"
                className="block text-gray-700 font-medium mb-2"
              >
                Pilih Tanggal:
              </label>
              <input
                type="date"
                id="datePicker"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <PeminjamanRuangan
              room={room.name}
              selectedDate={selectedDate}
              ruanganData={ruanganData}
            />
          </>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-700 font-semibold mb-2">
              Fitur Terkunci
            </p>
            <p className="text-red-500 font-semibold mb-4">
              Anda harus login terlebih dahulu untuk melakukan peminjaman
              ruangan.
            </p>
            <div className="flex justify-center">
              <FaLock className="text-4xl text-gray-500" />
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
