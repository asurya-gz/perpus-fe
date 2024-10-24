import React from "react";

export default function Peta() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-screen-lg">
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.667030217679!2d110.43525517459295!3d-7.048357092953834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c0230b5b061%3A0xfef333e5f3860212!2sUPT%20Perpustakaan%20dan%20UNDIP%20Press!5e0!3m2!1sid!2sid!4v1728037241345!5m2!1sid!2sid"
            width="600"
            height="338" // Adjusted height for larger screens
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}