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
        left-0
        top-0
        lg:left-[-100px]
        lg:top-[-15px]

        w-[min(72vw,260px)]
        sm:w-[260px]
        lg:w-[320px]
        xl:w-[380px]
      "
    >
      <motion.img
        src="/idcard.webp"
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
