"use client";
import React, { useState } from "react";
import {
  FaClipboardList,
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
  FaChartLine,
  FaHome,
} from "react-icons/fa";
import DashboardSuperAdmin from "./dashboard/page";
import UserManagementSuperAdmin from "./usermanagement/page";
import RoomManagementSuperAdmin from "./roommanagement/page";

export default function SuperAdmin() {
  const [activePage, setActivePage] = useState("dashboard"); // State untuk halaman yang aktif

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardSuperAdmin />;
      case "userManagement":
        return <UserManagementSuperAdmin />;
      case "roomManagement":
        return <RoomManagementSuperAdmin />;
      default:
        return <DashboardSuperAdmin />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md p-6 flex flex-col justify-between h-screen">
        <div>
          <h2 className="text-2xl text-center font-semibold text-blue-600">
            Super Admin Dashboard
          </h2>
          <ul className="mt-6 space-y-4">
            <li
              className={`flex items-center space-x-2 border-b border-gray-200 pb-2 cursor-pointer ${
                activePage === "dashboard" ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => setActivePage("dashboard")}
            >
              <FaClipboardList />
              <span>Dashboard</span>
            </li>
            <li
              className={`flex items-center space-x-2 border-b border-gray-200 pb-2 cursor-pointer ${
                activePage === "userManagement"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActivePage("userManagement")}
            >
              <FaUser />
              <span>User Management</span>
            </li>
            <li
              className={`flex items-center space-x-2 border-b border-gray-200 pb-2 cursor-pointer ${
                activePage === "roomManagement"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActivePage("roomManagement")}
            >
              <FaHome />
              <span>Room Management</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 border-b border-gray-200 pb-2">
              <FaEnvelope />
              <span>Messages</span>
            </li>
          </ul>
        </div>

        {/* Tombol Profile dan Log Out */}
        <div className="mt-auto pt-4 flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center">
            <FaUser className="mr-2" />
          </button>
          <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-center">
            <FaSignOutAlt className="mr-2" />
          </button>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 p-6">
        {renderContent()} {/* Menampilkan konten sesuai dengan state aktif */}
      </div>
    </div>
  );
}
