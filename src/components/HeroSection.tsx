import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/animations'
import IDCardMockup from '@/components/IDCardMockup'
import { Upload, ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ==========================================================================
   Hero Section — Premium 2-Column Layout
   Clean, breathable, with strong visual hierarchy
   ========================================================================== */

export default function HeroSection({ children }: { children?: React.ReactNode }) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col"
      style={{ backgroundColor: '#0B5A33' }}
    >
      {children}

      {/* ── Ambient Background Layers ── */}
      {/* Soft radial gradients for depth — quieter than before */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(ellipse at 15% 20%, rgba(18,110,60,0.18) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 85% 80%, rgba(0,0,0,0.2) 0%, transparent 50%)',
        }}
      />

      {/* Subtle grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          zIndex: 1,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* ── Corner Leaves — reduced opacity and size ── */}
      <img
        src="/topLeave.webp"
        alt=""
        aria-hidden="true"
        onError={handleImgError}
        className="absolute top-0 left-[-20px] hidden lg:block w-[180px] xl:w-[220px] h-auto object-contain origin-top-left pointer-events-none select-none"
        style={{ zIndex: 5, opacity: 0.6 }}
      />
      <img
        src="/rightLeave.webp"
        alt=""
        aria-hidden="true"
        onError={handleImgError}
        className="absolute top-0 right-[-20px] hidden lg:block w-[180px] xl:w-[220px] h-auto object-contain origin-top-right pointer-events-none select-none"
        style={{ zIndex: 5, opacity: 0.6 }}
      />

      {/* ── Ground Scene (bottom) — softened ── */}
      <img
        src="/board.webp"
        alt=""
        aria-hidden="true"
        onError={handleImgError}
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none object-fill"
        style={{ zIndex: 4, opacity: 0.5 }}
      />

      {/* Left house — smaller, lower opacity */}
      <div
        className="absolute bottom-0 left-[10px] sm:left-[30px] lg:left-[50px] pointer-events-none select-none z-[3] w-[120px] sm:w-[160px] lg:w-[220px]"
      >
        <img
          src="/house.webp"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          className="w-full h-auto"
          style={{ opacity: 0.45 }}
        />
      </div>

      {/* Right house — smaller, lower opacity */}
      <div
        className="absolute bottom-0 right-[10px] sm:right-[30px] lg:right-[50px] pointer-events-none select-none z-[3] w-[120px] sm:w-[160px] lg:w-[220px]"
      >
        <img
          src="/righthouse.webp"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          className="w-full h-auto"
          style={{ opacity: 0.45 }}
        />
      </div>

      {/* ── Vignette overlay for text clarity ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,40,20,0.4) 100%)',
        }}
      />

      {/* ── Main Hero Content ── */}
      <div
        className="relative flex-1 w-full flex items-center"
        style={{ zIndex: 10 }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-8 xl:gap-16">

            {/* ── Left Column: Text Content ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-[520px] flex-shrink-0"
            >
              {/* Eyebrow */}
              <motion.div
                variants={staggerItem}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-[40px] h-[1.5px] bg-[#98E8A3]/50 hidden sm:block" />
                <span
                  className="font-mono font-medium uppercase text-[#98E8A3] tracking-[0.2em]"
                  style={{ fontSize: 'clamp(11px, 1.4vw, 14px)' }}
                >
                  HH Goa 2026
                </span>
              </motion.div>

              {/* Headline — controlled width, clean breaks */}
              <motion.h1
                variants={staggerItem}
                className="text-hero mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#f5efe4',
                  lineHeight: 1.06,
                  letterSpacing: '-0.03em',
                  maxWidth: '480px',
                }}
              >
                Create Your{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF007F 0%, #ff6b9d 50%, #FFE600 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Hacker
                </span>
                <br />
                Identity
              </motion.h1>

              {/* Supporting paragraph */}
              <motion.p
                variants={staggerItem}
                className="text-[#b3c7aa] text-base md:text-lg leading-relaxed mb-10"
                style={{
                  fontFamily: 'var(--font-sans)',
                  maxWidth: '420px',
                }}
              >
                Upload your photo and instantly generate your official Hacker House Goa ID Card — share it with the world.
              </motion.p>

              {/* CTA Buttons — clean spacing */}
              <motion.div
                variants={staggerItem}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <Button
                  variant="pink"
                  size="lg"
                  rightIcon={<Upload className="w-4 h-4" />}
                  onClick={() => scrollToSection('generate')}
                  className="shadow-[0_8px_30px_rgba(255,0,127,0.3)] hover:shadow-[0_12px_40px_rgba(255,0,127,0.4)]"
                >
                  Create Your ID
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<ArrowDown className="w-4 h-4" />}
                  className="border-[#7ec28b]/25 text-[#b3c7aa] hover:border-[#7ec28b]/50 hover:text-[#d6e5cf] hover:bg-[#7ec28b]/8"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  How It Works
                </Button>
              </motion.div>
            </motion.div>

            {/* ── Right Column: ID Card Visual ── */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="relative flex-shrink-0 flex justify-center"
            >
              {/* Soft glow behind card */}
              <div
                aria-hidden="true"
                className="absolute pointer-events-none rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'min(80vw, 400px)',
                  height: 'min(80vw, 400px)',
                  background:
                    'radial-gradient(circle, rgba(255,0,127,0.2) 0%, rgba(255,0,127,0.06) 45%, transparent 70%)',
                  filter: 'blur(50px)',
                  zIndex: -1,
                }}
              />

              {/* Card container with gentle float + rotation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
                style={{ transform: 'rotate(-4deg)' }}
              >
                <IDCardMockup />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
