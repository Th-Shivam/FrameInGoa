import { motion } from 'framer-motion'

/**
 * IDCardMockup — Premium card display
 * Clean PNG on transparent background with soft shadow.
 * Sized responsively for hero layout.
 */
export default function IDCardMockup() {
  return (
    <div
      className="
        relative
        w-[min(68vw,240px)]
        sm:w-[260px]
        md:w-[280px]
        lg:w-[300px]
        xl:w-[340px]
      "
    >
      <motion.img
        src="/idcard.webp"
        alt="Hacker House Goa 2026 — Official ID Card"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="w-full h-auto object-contain select-none pointer-events-none"
        style={{
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.4))',
        }}
      />
    </div>
  )
}
