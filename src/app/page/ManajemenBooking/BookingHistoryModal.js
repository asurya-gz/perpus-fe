import React, { useState, useMemo } from "react";
import { Clock, CalendarDays, Building2, X } from "lucide-react";

const BookingHistoryModal = ({ bookedSlots }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pastBookings = useMemo(() => {
    const now = new Date();
    return bookedSlots
      .filter((slot) => {
        const slotDate = new Date(slot.date);
        const [hours, minutes] = slot.time.split(":").map(Number);
        slotDate.setHours(hours, minutes, 0);
        return slotDate < now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const timeA = a.time.split(":").map(Number);
        const timeB = b.time.split(":").map(Number);
        const dateComparison = dateB - dateA; // Sort by date first (most recent first)

        if (dateComparison === 0) {
          // If the dates are the same, compare by time
          const timeComparison = timeB[0] - timeA[0] || timeB[1] - timeA[1];
          return timeComparison;
        }

        return dateComparison;
      });
  }, [bookedSlots]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const formatTime = (timeString) => {
    return timeString.slice(0, 5);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        <Clock className="w-4 h-4 mr-2" />
        Riwayat Peminjaman
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Riwayat Peminjaman Ruangan
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div
            className="overflow-y-auto p-4 md:p-6"
            style={{ maxHeight: "calc(90vh - 150px)" }}
          >
            {pastBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Tidak ada riwayat peminjaman yang sudah lewat
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Table Header - Hidden on mobile, shown on larger screens */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 pb-4 border-b border-gray-200 font-semibold text-sm text-gray-700">
                  <div>Tanggal</div>
                  <div>Waktu</div>
                  <div>Ruangan</div>
                  <div>Peran</div>
                  <div>Status</div>
                </div>

                {/* Table Body */}
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {/* Mobile Labels & Content */}
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {formatDate(booking.date)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {formatTime(booking.time)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          Ruang {booking.room_id}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {booking.role}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Selesai
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryModal;
