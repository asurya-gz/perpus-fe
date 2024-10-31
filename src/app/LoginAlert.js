import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react";

const LoginAlert = ({ email }) => {
  const [isVisible, setIsVisible] = useState(true);

  // If user is logged in (email exists), don't show the alert
  if (email || !isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg animate-[fadeIn_0.3s_ease-in-out]">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-blue-800 font-medium">
              Beberapa fitur tidak tersedia karena Anda belum login. Silakan
              login untuk mengakses semua fitur.
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100"
            aria-label="Tutup pemberitahuan"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert;
