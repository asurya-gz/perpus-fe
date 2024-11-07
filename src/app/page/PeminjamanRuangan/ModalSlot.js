"use client";
import { useState, useEffect } from "react";
import { X, Trash, Clock, Paperclip } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

const ModalSlot = ({
  selectedSlot,
  timeSlots,
  onClose,
  selectedDate,
  withLetter,
}) => {
  const [showSlots, setShowSlots] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = Cookies.get("email"); // Mengambil email dari cookies
        if (!userEmail) {
          throw new Error("Email tidak ditemukan dalam cookies");
        }

        const response = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/pengguna-by-email",
          {
            email: userEmail,
          }
        );

        if (response.data.message === "Pengguna berhasil ditemukan.") {
          setUserData(response.data.data);
        } else {
          throw new Error("Data pengguna tidak ditemukan");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleStartBorrowing = () => {
    setShowSlots(true);
  };

  const toggleSlotSelection = (slot) => {
    const currentIndex = timeSlots.findIndex((s) => s.time === slot.time);
    const isSlotAlreadySelected = selectedSlots.includes(slot.time);

    if (isSlotAlreadySelected) {
      return;
    }

    if (selectedSlots.length > 0) {
      const lastSelectedSlot = timeSlots.find(
        (s) => s.time === selectedSlots[selectedSlots.length - 1]
      );
      const lastSelectedIndex = timeSlots.findIndex(
        (s) => s.time === lastSelectedSlot.time
      );

      if (
        currentIndex !== lastSelectedIndex + 1 &&
        lastSelectedIndex + 1 < timeSlots.length &&
        !selectedSlots.includes(timeSlots[lastSelectedIndex + 1].time)
      ) {
        alert("Silakan pilih slot waktu secara berurutan.");
        return;
      }
    }

    const maxSlots = withLetter ? 24 : 8;

    if (selectedSlots.length >= maxSlots) {
      alert(`Anda hanya dapat memilih hingga ${maxSlots} slot waktu.`);
      return;
    }

    setSelectedSlots([...selectedSlots, slot.time]);
  };

  const handleBooking = async () => {
    if (!userData) {
      alert("Data pengguna tidak tersedia. Silakan coba lagi.");
      return;
    }

    try {
      // Prepare the slots data
      const slotsToUpdate = selectedSlots.map((time) => ({
        date: selectedDate,
        time: time,
        roomId: selectedSlot.room_id,
      }));

      const userEmail = Cookies.get("email");
      if (!userEmail) {
        throw new Error("Email tidak ditemukan dalam cookies");
      }

      // Prepare the update data
      const updateData = {
        status: "booked",
        borrower: userEmail,
        role: userData.role,
      };

      // Make API call to update multiple slots
      const response = await axios.put(
        "https://be-perpus-undip.up.railway.app/api/time-slots/update-multiple",
        {
          slots: slotsToUpdate,
          updateData: updateData,
        }
      );

      if (response.data.message === "Semua slot waktu berhasil diupdate.") {
        alert("Booking berhasil!");
        // Handle file upload if needed
        if (uploadFile && withLetter) {
          // Add your file upload logic here
          console.log("File to upload:", uploadFile);
        }
        onClose();
        window.location.reload();
      } else {
        throw new Error("Gagal melakukan booking");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Terjadi kesalahan saat melakukan booking. Silakan coba lagi.");
      }
    }
  };

  const isPastSlot = (slot) => {
    const slotDateTime = new Date(`${selectedDate}T${slot.time}`);
    return slotDateTime < new Date();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadFile(file);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-500">Error: {error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-h-[80vh] overflow-y-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {userData && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-lg">Info Peminjam:</h4>
            <p>Nama: {userData.name}</p>
            <p>NIM/NIP: {userData.nim_nip}</p>
            <p>Role: {userData.role}</p>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="mr-2 text-gray-500" size={24} />
          Slot yang Dipilih: {selectedSlot.time}
        </h3>
        <h5 className="text-lg mb-4">
          Tanggal: {formatDate(selectedSlot.date)}
        </h5>
        <p>
          Status: {selectedSlot.status === "available" ? "booked" : "holiday"}
        </p>

        {selectedSlot.status === "available" && !showSlots && (
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            onClick={handleStartBorrowing}
          >
            Mulai Pinjam
          </button>
        )}

        {showSlots && withLetter === 1 && (
          <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50">
            <h4 className="font-semibold text-lg flex items-center">
              <Paperclip className="mr-2 text-gray-500" size={24} />
              Upload Surat:
            </h4>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="mt-2 mb-4 border rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
            />
            {uploadFile && (
              <p className="text-gray-700">
                File yang dipilih: <strong>{uploadFile.name}</strong>
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
                      ? "bg-green-300 text-gray-700 shadow-lg"
                      : "bg-green-500 text-gray-100 hover:bg-green-100 transition duration-150";
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

                const pastSlot = isPastSlot(slot);
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
                      <Trash
                        className="ml-2 cursor-pointer"
                        onClick={() =>
                          setSelectedSlots(
                            selectedSlots.filter((t) => t !== time)
                          )
                        }
                      />
                    </span>
                  ))}
                </div>
                <button
                  className="mt-4 text-red-600 py-2 px-4 rounded shadow transition duration-150"
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
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
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
