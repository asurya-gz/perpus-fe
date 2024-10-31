"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Logout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      // Hapus cookies
      Cookies.remove("email");
      Cookies.remove("role");

      // Mulai animasi fade out setelah sedikit delay
      setTimeout(() => {
        setIsLoggingOut(true);
      }, 500);

      // Redirect setelah animasi selesai
      const timer = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timer);
    };

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        className={`
        bg-white p-8 rounded-lg shadow-lg
        transform transition-all duration-[2500ms] ease-in-out
        ${
          isLoggingOut ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }
      `}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Logging out...
          </h2>
          <p className="text-gray-600 text-center">
            Terima kasih telah menggunakan layanan kami
          </p>
        </div>
      </div>
    </div>
  );
}
