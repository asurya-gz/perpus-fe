"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

const WhatsAppFloating = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = () => {
    let message = "Hallo Bens Autolight!";
    let phoneNumber = "+6282135876098"; // Ganti dengan nomor WhatsApp yang sesuai
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url);
  };

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/895d3fwtQwJRAVkH7");
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end space-y-3">
      {/* Tombol untuk WA dan Maps */}
      <div
        className={`flex flex-col space-y-3 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Tombol WhatsApp */}
        <button
          onClick={openWhatsApp}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none transition-transform duration-200 transform hover:scale-110"
        >
          <FaWhatsapp className="h-6 w-6" />
        </button>
        {/* Tombol Google Maps */}
        <button
          onClick={openGoogleMaps}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-transform duration-200 transform hover:scale-110"
        >
          <FaMapMarkerAlt className="h-6 w-6" />
        </button>
      </div>

      {/* Tombol utama untuk toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-blue-900 text-white p-4 rounded-full shadow-lg focus:outline-none transition-transform duration-300 transform ${
          isOpen ? "rotate-45" : ""
        } hover:bg-blue-800`}
      >
        {/* Plus icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 transition-transform duration-200`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppFloating;
