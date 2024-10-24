"use client";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  FaClipboardList,
  FaFileExport,
  FaUser,
  FaChartLine,
} from "react-icons/fa";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardSuperAdmin() {
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Ruang 2_1",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        data: [50, 60, 45, 70, 80, 75, 90],
      },
      {
        label: "Ruang 2_2",
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        data: [40, 50, 60, 55, 65, 70, 85],
      },
      {
        label: "Ruang 3_1",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        data: [60, 55, 70, 85, 90, 95, 100],
      },
      {
        label: "Ruang 3_2",
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        data: [55, 65, 75, 60, 85, 90, 95],
      },
      {
        label: "Ruang 4",
        backgroundColor: "rgba(255, 159, 64, 0.8)",
        data: [45, 50, 65, 75, 70, 80, 85],
      },
    ],
  };

  const doughnutData = {
    labels: ["Ruang 2_1", "Ruang 2_2", "Ruang 3_1", "Ruang 3_2", "Ruang 4"],
    datasets: [
      {
        data: [200, 150, 250, 180, 220],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(255, 87, 34, 0.8)",
          "rgba(76, 175, 80, 0.8)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-4xl font-bold mb-4 md:mb-0 flex items-center border-b-2 border-gray-300 pb-2">
            <span className="text-gray-700">Dashboard Peminjangan Ruangan</span>
          </h1>

          <div className="space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
              <FaFileExport className="mr-2" />{" "}
              {/* Pastikan mengimpor FaFileExport */}
              Export
            </button>
          </div>
        </div>

        {/* Summary Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center">
            <FaClipboardList className="text-4xl mr-4" />
            <div>
              <h2 className="text-lg font-medium">Total Peminjaman Ruangan</h2>
              <p className="text-4xl font-semibold">890</p>
            </div>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center">
            <FaUser className="text-4xl mr-4" />
            <div>
              <h2 className="text-lg font-medium">Pengguna Terdaftar</h2>
              <p className="text-4xl font-semibold">1,200</p>
            </div>
          </div>
          <div className="bg-red-600 text-white p-4 rounded-lg shadow-md flex items-center">
            <FaChartLine className="text-4xl mr-4" />
            <div>
              <h2 className="text-lg font-medium">Jumlah Peminjam Hari Ini</h2>
              <p className="text-4xl font-semibold">180</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 text-gray-800">
              Perbandingan Jumlah Peminjam Antar Ruangan
            </h3>
            <div className="h-64 md:h-80">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4 text-gray-800">
              Data Pengunjung dan Peminjaman
            </h3>
            <div className="h-64 md:h-80">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
