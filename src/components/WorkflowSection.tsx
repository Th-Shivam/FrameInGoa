import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Crop, Sparkles, Download } from 'lucide-react'

/* ==========================================================================
   Workflow Section — Clean, Premium 4-Step Process
   Smooth transition from hero → cream → dark green
   ========================================================================== */

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    subtitle: 'Drop your photo or selfie',
    accent: '#FF007F',
  },
  {
    icon: Crop,
    title: 'Crop',
    subtitle: 'Frame your perfect shot',
    accent: '#FFE600',
  },
  {
    icon: Sparkles,
    title: 'Customize',
    subtitle: 'Add your name & role',
    accent: '#FF007F',
  },
  {
    icon: Download,
    title: 'Download',
    subtitle: 'Get your official ID card',
    accent: '#FFE600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
}

export default function WorkflowSection() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          CREAM SECTION — 4-step process
         ══════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="relative w-full"
        style={{ backgroundColor: '#F8F3E8' }}
      >
        {/* Section header */}
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 md:pt-16 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12"
          >
            <p
              className="uppercase font-bold text-[11px] md:text-[12px] tracking-[3px] mb-3"
              style={{ color: '#0B5A33', fontFamily: 'var(--font-mono, monospace)', opacity: 0.6 }}
            >
              How It Works
            </p>
            <h2
              className="font-bold text-[clamp(1.5rem,4vw,2.25rem)] leading-tight tracking-[-0.02em] text-[#0B3D22]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Four Simple Steps
            </h2>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div className="w-full max-w-[960px] mx-auto px-5 sm:px-8 pb-14 md:pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <div
                    className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: step.accent,
                      boxShadow: `0 6px 20px ${step.accent}33`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 md:w-7 md:h-7"
                      style={{ color: step.accent === '#FFE600' ? '#0B5A33' : '#FFFFFF' }}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Step number */}
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-1.5"
                    style={{ color: '#0B5A33', opacity: 0.35 }}
                  >
                    Step {idx + 1}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-bold text-[15px] md:text-[16px] leading-tight mb-1 text-[#0B3D22]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="font-medium text-[12px] md:text-[13px] leading-snug text-[#0B5A33]/60"
                    style={{ fontFamily: 'var(--font-sans)', maxWidth: '160px' }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Connector line (desktop only) */}
                  {idx < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute top-[28px] md:top-[32px] -right-[20px] md:-right-[24px] w-[40px] md:w-[48px] h-[2px]"
                      style={{
                        background: 'linear-gradient(to right, #0B5A33 0%, #0B5A33 60%, transparent 100%)',
                        opacity: 0.15,
                      }}
                    />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Cream → Dark Green wave separator */}
        <div className="w-full overflow-hidden leading-none select-none pointer-events-none" style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            className="w-full block h-[32px] md:h-[40px]"
            style={{ display: 'block' }}
          >
            <path
              d="M0,0 L1440,0 L1440,16 Q1080,44 720,24 Q360,4 0,32 Z"
              fill="#F8F3E8"
            />
            <path
              d="M0,32 Q360,4 720,24 Q1080,44 1440,16 L1440,48 L0,48 Z"
              fill="#0B4D2B"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DARK GREEN TRANSITION — heading into generator
         ══════════════════════════════════════════════════ */}
      <section
        className="relative w-full"
        style={{ backgroundColor: '#0B4D2B' }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 md:pt-12 pb-6 md:pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="uppercase font-bold text-[11px] md:text-[12px] tracking-[3px] mb-3"
              style={{ color: '#F4C430', fontFamily: 'var(--font-mono, monospace)' }}
            >
              Ready to Build?
            </p>
            <h2
              className="font-bold text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Make It Uniquely{' '}
              <span className="relative inline-block">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF007F 0%, #FFE600 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Yours
                </span>
              </span>
            </h2>
          </motion.div>
        </div>
      </section>
    </>
  )
}
