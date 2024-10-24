import React from "react";

export default function ImportRoomModal({ isOpen, onClose }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Proses file di sini, seperti parsing CSV atau Excel
    console.log(file); // Contoh untuk debugging
  };

  const handleUpload = () => {
    // Logika untuk mengunggah file
    alert("File uploaded!"); // Contoh alert
    onClose(); // Tutup modal setelah mengunggah
  };

  if (!isOpen) return null; // Tidak merender jika modal tidak terbuka

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">Import Rooms</h2>
        <p className="mb-2 text-gray-700">
          Upload your Excel or CSV file to import room data.
        </p>
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          className="mb-4 w-full text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
