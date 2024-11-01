import React, { useState } from "react";
import {
  UserPlus,
  Layout,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CaraKerja() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      icon: <UserPlus className="w-12 h-12 text-blue-600" />,
      title: "1. Daftar Akun",
      description: "Buat akun dan masuk ke dalam sistem.",
      fullDescription:
        "Proses pendaftaran akun sangat mudah. Anda hanya perlu mengisi formulir dengan data pribadi yang valid. Pastikan gunakan email aktif untuk konfirmasi dan notifikasi selanjutnya.",
      color: "bg-blue-50",
    },
    {
      icon: <Layout className="w-12 h-12 text-green-600" />,
      title: "2. Pilih Ruangan",
      description: "Pilih ruangan yang tersedia sesuai dengan kebutuhan Anda.",
      fullDescription:
        "Tersedia berbagai pilihan ruangan dengan fasilitas berbeda. Anda dapat melihat detail setiap ruangan, kapasitas, dan kelengkapan fasilitas yang tersedia sebelum melakukan pemesanan.",
      color: "bg-green-50",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-purple-600" />,
      title: "3. Konfirmasi Peminjaman",
      description: "Konfirmasi peminjaman dan dapatkan notifikasi pengingat.",
      fullDescription:
        "Setelah memilih ruangan, Anda akan menerima konfirmasi melalui email dan sistem. Sistem akan mengirimkan pengingat sebelum jadwal peminjaman untuk memastikan Anda tidak lupa.",
      color: "bg-purple-50",
    },
  ];

  const toggleStep = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Cara Kerja
          </h2>
          <p className="text-lg text-gray-600">
            Tiga langkah mudah untuk meminjam ruangan di Perpustakaan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines (visible on md screens and up) */}
          <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gray-200" />
          <div className="hidden md:block absolute top-24 right-1/3 w-1/3 h-0.5 bg-gray-200" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => toggleStep(index)}
            >
              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}

              <div
                className={`
                flex flex-col items-center p-6 rounded-2xl transition-all duration-300 
                ${activeStep === index ? "shadow-xl" : "hover:shadow-xl"}
              `}
              >
                <div
                  className={`p-4 rounded-full ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-center max-w-xs mb-4">
                  {step.description}
                </p>

                {/* Expandable Content */}
                {activeStep === index && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center animate-fade-in">
                    <p className="text-gray-800">{step.fullDescription}</p>
                  </div>
                )}

                {/* Expand/Collapse Icon */}
                <div className="mt-2">
                  {activeStep === index ? (
                    <ChevronUp className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
