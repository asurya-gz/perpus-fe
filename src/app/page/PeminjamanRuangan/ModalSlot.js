"use client";
import { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

const ModalSlot = ({
  selectedSlot,
  timeSlots,
  onClose,
  selectedDate,
  withLetter,
}) => {
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [uploadFile, setUploadFile] = useState(null); // State untuk menyimpan file yang diupload

  const handleStartBorrowing = () => {
    setShowSlots(true);
  };

  const toggleSlotSelection = (slot) => {
    const currentIndex = timeSlots.findIndex((s) => s.time === slot.time);

    // Cek apakah slot sudah ada di dalam daftar yang dipilih
    const isSlotAlreadySelected = selectedSlots.includes(slot.time);

    // Jika slot sudah ada di dalam daftar yang dipilih, hentikan aksi
    if (isSlotAlreadySelected) {
      return; // Tidak ada aksi jika slot sudah dipilih
    }

    // Cek apakah slot sebelumnya sudah dipilih
    if (selectedSlots.length > 0) {
      const lastSelectedSlot = timeSlots.find(
        (s) => s.time === selectedSlots[selectedSlots.length - 1]
      );
      const lastSelectedIndex = timeSlots.findIndex(
        (s) => s.time === lastSelectedSlot.time
      );

      // Pastikan slot yang dipilih adalah berurutan dari slot terakhir yang dipilih
      if (
        currentIndex !== lastSelectedIndex + 1 &&
        !selectedSlots.includes(timeSlots[lastSelectedIndex + 1].time)
      ) {
        alert("Silakan pilih slot waktu secara berurutan.");
        return;
      }
    }

    // Tentukan batas maksimum slot berdasarkan withLetter
    const maxSlots = withLetter ? 8 : 3;

    // Jika pengguna sudah memilih slot lebih dari maxSlots, tampilkan peringatan
    if (selectedSlots.length >= maxSlots) {
      alert(`Anda hanya dapat memilih hingga ${maxSlots} slot waktu.`);
      return;
    }

    // Jika slot belum dipilih, tambahkan ke daftar
    setSelectedSlots([...selectedSlots, slot.time]);
  };

  const handleBooking = () => {
    alert(`Slot yang dipilih: ${selectedSlots.join(", ")}`);
    if (uploadFile) {
      alert(`File yang diupload: ${uploadFile.name}`); // Menampilkan nama file yang diupload
    }
    // Tambahkan logika booking di sini
    onClose();
  };

  const isPastSlot = (slot) => {
    const slotDateTime = new Date(`${selectedDate}T${slot.time}`);
    return slotDateTime < new Date();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadFile(file); // Simpan file yang diupload ke state
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-4/5 max-h-[80vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Slot yang Dipilih: {selectedSlot.time}
        </h3>
        <h5 className="text-lg mb-4">Tanggal: {selectedSlot.date}</h5>
        <p>
          Status:{" "}
          {selectedSlot.status === "available" ? "Tersedia" : "Tidak Tersedia"}
        </p>

        {selectedSlot.status === "available" && (
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleStartBorrowing}
          >
            Mulai Pinjam
          </button>
        )}

        {/* Bagian untuk upload surat, tampilkan jika withLetter == true */}
        {showSlots && withLetter && (
          <div className="mt-4">
            <h4 className="font-semibold">Upload Surat:</h4>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="mt-2 mb-4"
            />
            {uploadFile && (
              <p className="text-gray-700">
                File yang dipilih: {uploadFile.name}
              </p>
            )}
          </div>
        )}

        {showSlots && (
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Daftar Slot Waktu:</h4>
            <ul className="mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {timeSlots.map((slot, index) => {
                let slotStatusText = "";
                let slotClassName = "";

                switch (slot.status) {
                  case "available":
                    slotStatusText = "Tersedia";
                    slotClassName = selectedSlots.includes(slot.time)
                      ? "bg-green-300 text-gray-900 shadow-lg" // Highlight selected available slot
                      : "bg-white text-gray-900 hover:bg-gray-100 transition duration-150";
                    break;
                  case "booked":
                    slotStatusText = "Tidak Tersedia";
                    slotClassName = "bg-blue-400 text-white";
                    break;
                  case "holiday":
                    slotStatusText = "Libur";
                    slotClassName = "bg-gray-600 text-white";
                    break;
                  default:
                    slotStatusText = "Status tidak diketahui";
                    slotClassName = "bg-gray-400 text-white";
                    break;
                }

                const pastSlot = isPastSlot(slot); // Check if the slot is past
                return (
                  <li
                    key={index}
                    className={`p-3 rounded-lg w-full text-xs font-medium text-center border cursor-pointer ${slotClassName} ${
                      pastSlot ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      !pastSlot &&
                      slot.status === "available" &&
                      toggleSlotSelection(slot)
                    }
                  >
                    {slot.time} - {slotStatusText}
                  </li>
                );
              })}
            </ul>

            {selectedSlots.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold text-lg">Slot yang Dipilih:</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedSlots.map((time, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-green-100 text-green-800 py-2 px-4 rounded-full text-sm shadow"
                    >
                      {time}
                    </span>
                  ))}
                </div>
                {/* Tombol Reset */}
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition duration-150"
                  onClick={() => setSelectedSlots([])}
                >
                  Reset Pilihan
                </button>
              </div>
            )}
          </div>
        )}

        {showSlots && (
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleBooking}
              disabled={selectedSlots.length === 0}
            >
              Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalSlot;
