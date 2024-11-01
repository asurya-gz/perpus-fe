"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const WhatsAppFloating = ({
  phoneNumber,
  mapUrl,
  initialMessage = "Hello! I have a question.",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    try {
      const encodedMessage = encodeURIComponent(initialMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
    }
  };

  const handleMapClick = () => {
    try {
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening Google Maps:", error);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="flex flex-col space-y-3 mb-4"
          >
            {/* WhatsApp Button */}
            <motion.button
              variants={buttonVariants}
              onClick={handleWhatsAppClick}
              aria-label="Open WhatsApp Chat"
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 
                         focus:outline-none focus:ring-2 focus:ring-green-300 
                         transition-all duration-300 ease-in-out"
            >
              <FaWhatsapp className="h-6 w-6" />
            </motion.button>

            {/* Maps Button */}
            <motion.button
              variants={buttonVariants}
              onClick={handleMapClick}
              aria-label="Open Google Maps"
              className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 
                         focus:outline-none focus:ring-2 focus:ring-blue-300 
                         transition-all duration-300 ease-in-out"
            >
              <FaMapMarkerAlt className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-blue-900 text-white p-4 rounded-full shadow-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-300 
                   hover:bg-blue-800 active:bg-blue-700
                   transition-all duration-300 ease-in-out"
      >
        <FaPlus className="h-8 w-8" />
      </motion.button>
    </div>
  );
};

export default WhatsAppFloating;
