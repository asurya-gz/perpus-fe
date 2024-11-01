"use client";
import React from "react";
import {
  Clock,
  Bell,
  FileText,
  CheckCircle,
  Calendar,
  Users,
} from "lucide-react";

export default function Fitur() {
  const features = [
    {
      icon: Clock,
      title: "Peminjaman Cepat",
      description:
        "Proses peminjaman ruangan yang cepat dan efisien hanya dengan beberapa klik. Hemat waktu Anda dalam mengatur jadwal.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Bell,
      title: "Notifikasi Pengingat",
      description:
        "Dapatkan notifikasi real-time dan pengingat otomatis untuk setiap peminjaman ruangan yang akan datang.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: FileText,
      title: "Laporan Lengkap",
      description:
        "Akses laporan detail dan analisis penggunaan ruangan untuk pengambilan keputusan yang lebih baik.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: CheckCircle,
      title: "Konfirmasi Otomatis",
      description:
        "Sistem konfirmasi otomatis untuk memastikan ketersediaan ruangan dan menghindari konflik jadwal.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Calendar,
      title: "Penjadwalan Fleksibel",
      description:
        "Atur jadwal dengan mudah dan fleksibel sesuai dengan kebutuhan dan ketersediaan ruangan.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: "Manajemen Pengguna",
      description:
        "Kelola hak akses dan peran pengguna untuk keamanan dan efisiensi sistem yang lebih baik.",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            Fitur Unggulan
          </h2>
          <h3 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Solusi Modern untuk Peminjaman Ruangan
          </h3>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Nikmati berbagai fitur yang dirancang untuk memudahkan proses
            peminjaman dan pengelolaan ruangan
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="h-full bg-white rounded-2xl shadow-sm transition-all duration-300 p-8 hover:shadow-lg border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className={`p-3 rounded-xl ${feature.bgColor}`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
