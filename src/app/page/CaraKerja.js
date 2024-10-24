import React from "react";
import Image from "next/image";

export default function CaraKerja() {
  return (
    <div>
      <section id="how-it-works" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Cara Kerja</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center justify-center">
              <Image src="/logo.png" alt="Step 1" width={300} height={300} />
              <h4 className="text-xl font-semibold mt-4">1. Daftar Akun</h4>
              <p className="text-gray-700">
                Buat akun dan masuk ke dalam sistem.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image src="/logo.png" alt="Step 2" width={300} height={300} />
              <h4 className="text-xl font-semibold mt-4">2. Pilih Ruangan</h4>
              <p className="text-gray-700">
                Pilih ruangan yang tersedia sesuai dengan kebutuhan Anda.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image src="/logo.png" alt="Step 3" width={300} height={300} />
              <h4 className="text-xl font-semibold mt-4">
                3. Konfirmasi Peminjaman
              </h4>
              <p className="text-gray-700">
                Konfirmasi peminjaman dan dapatkan notifikasi pengingat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
