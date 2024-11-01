// Profile.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCircle, Key, IdCard, Shield, ArrowLeft, Edit } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import ChangePasswordModal from "./ubahPassword";
import EditProfileModal from "./EditProfile";

export default function Profile() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal ganti password
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false); // State untuk modal edit profil

  const handleUpdateProfile = (updatedData) => {
    setProfileData(updatedData);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const email = Cookies.get("email");

      if (!email) {
        console.error("Email tidak ditemukan di cookies");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "https://be-perpus-undip.up.railway.app/api/pengguna-by-email",
          { email }
        );
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChangePassword = () => {
    setIsModalOpen(true); // Buka modal ganti password
  };

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true); // Buka modal edit profil
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Data pengguna tidak tersedia.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                  <UserCircle className="w-20 h-20 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profileData.name}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {profileData.role}
                </span>
                <div className="mt-4 w-full">
                  <button
                    onClick={handleChangePassword}
                    className="flex items-center justify-center w-full px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Informasi Profil
                </h3>
                <p className="text-sm text-gray-500">
                  Detail informasi akun dan kredensial Anda
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <IdCard className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Nomor Identitas
                    </label>
                    <span className="text-gray-900">{profileData.nim_nip}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <span className="text-gray-900 truncate max-w-full">
                      {profileData.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={handleEditProfile} // Panggil fungsi untuk membuka modal edit profil
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ubah Password */}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Modal Edit Profil */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        profileData={profileData} // Kirim data profil jika diperlukan
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
