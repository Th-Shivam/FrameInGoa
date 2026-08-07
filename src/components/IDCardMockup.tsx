import React from 'react'
import { motion } from 'framer-motion'

/**
 * IDCardMockup
 * - Pure PNG rendering on transparent background (no tilt, glare, box-shadow or glass wrappers).
 * - Smooth floating animation affects ONLY the PNG (moves up/down 7px).
 * - Soft drop-shadow applied directly to the PNG image.
 */
export default function IDCardMockup() {
  return (
    <div
      className="
        relative
        left-[-100px]
        top-[-15px]
        

        w-[120px]
        sm:w-[240px]
        lg:w-[320px]
        xl:w-[380px]
      "
    >
      <img
        src="/idcard.png"
        alt="Hacker House Goa 2026 — Official ID Card"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="w-full h-auto object-contain select-none pointer-events-none"
        style={{
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.35))",
        }}
      />
    </div>
  );
}
