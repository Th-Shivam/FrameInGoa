import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/animations'
import IDCardMockup from '@/components/IDCardMockup'
import UploadBox from '@/components/upload/UploadBox'

/* ==========================================================================
   Hero Section — Ground Scenes, ID Card & Editorial Content
   ========================================================================== */

export default function HeroSection({ children }: { children?: React.ReactNode }) {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-fit overflow-hidden lg:overflow-visible flex flex-col"
      style={{ backgroundColor: '#0B5A33', isolation: 'isolate' }}
    >
      {children}

      {/* ── TOP LEFT CORNER LEAF (topLeave.png) — glued to viewport edge ── */}
      <img
        src="/topLeave.png"
        alt=""
        aria-hidden="true"
        onError={handleImgError}
        className="absolute top-[-2px] left-[-40px] hidden md:block w-[200px] lg:w-[250px] xl:w-[280px] h-auto object-contain origin-top-left pointer-events-none select-none overflow-visible"
        style={{ zIndex: 5 }}
      />

      {/* ── TOP RIGHT CORNER LEAF (rightLeave.png) — glued to viewport edge ── */}
      <img
        src="/rightLeave.png"
        alt=""
        aria-hidden="true"
        onError={handleImgError}
        className="absolute top-[-2px] right-[-40px] hidden md:block w-[200px] lg:w-[250px] xl:w-[280px] h-auto object-contain origin-top-right pointer-events-none select-none overflow-visible"
        style={{ zIndex: 5 }}
      />
      <div className="relative flex-1 w-full overflow-hidden lg:overflow-visible flex items-start pt-1 lg:pt-2">
        {/* ── Unified Paper / Noise Overlay (z-index: 0) — sits behind everything, visible across navbar + hero ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            opacity: 0.35,
          }}
        />
        {/* ── Background Ambient Layers (z-index: 1) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              'radial-gradient(circle at 12% 8%,  rgba(18,110,60,0.22) 0%, transparent 55%), ' +
              'radial-gradient(circle at 88% 92%, rgba(0,0,0,0.25) 0%, transparent 55%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            backgroundImage:
              'repeating-linear-gradient(to right, rgba(255,255,255,0.035) 0, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 80px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{
            zIndex: 1,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* ── Ground Line Divider (z-index: 5 so it slightly overlaps bottom of house wrappers) ── */}
        <img
          src="/line.png"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          className="absolute pointer-events-none select-none object-fill"
          style={{
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 5,
          }}
        />

        {/* ══════════════════════════════════════════════════
          LEFT HOUSE WRAPPER
          • absolute, left:0, bottom:0
          • Desktop: 420x320 | Large Desktop: 460x350 | Tablet: 340x260 | Mobile: 220x170
         ══════════════════════════════════════════════════ */}
        <div
          className="
    left-house-wrapper
    absolute
    left-[0px]
    bottom-[10px]
    md:bottom-[50px]
    lg:bottom-[20px]
    overflow-visible
    flex
    items-end
    justify-start
    pointer-events-none
    select-none

    w-[46vw]
    max-w-[220px]
    h-auto
    aspect-[26/21]

    sm:w-[380px]
    sm:h-[290px]
    sm:max-w-none

    lg:w-[500px]
    lg:h-[390px]

    xl:w-[720px]
    xl:h-[570px]
  "
          style={{ zIndex: 4 }}
        >
          <img
            src="/leftside.png"
            alt=""
            aria-hidden="true"
            onError={handleImgError}
            className="
      w-full
      h-full
      object-contain
      object-left-bottom
      scale-110
      pointer-events-none
      select-none
    "
          />
        </div>

        {/* ══════════════════════════════════════════════════
          RIGHT HOUSE WRAPPER
          • absolute, right:0, bottom:0
          • Desktop: 420x320 | Large Desktop: 460x350 | Tablet: 340x260 | Mobile: 220x170
         ══════════════════════════════════════════════════ */}
        <div
          className="
    right-house-wrapper
    absolute
    right-[0px]
    md:right-[-28px]
    lg:right-[-50px]
    bottom-[0px]
    md:bottom-[5px]
    lg:bottom-[20px]
    overflow-visible
    flex
    items-end
    justify-end
    pointer-events-none
    select-none

    w-[46vw]
    max-w-[220px]
    h-auto
    aspect-[26/21]

    sm:w-[380px]
    sm:h-[290px]
    sm:max-w-none

    lg:w-[500px]
    lg:h-[390px]

    xl:w-[620px]
    xl:h-[510px]
  "
          style={{ zIndex: 4 }}
        >
          <img
            src="/rightside.png"
            alt=""
            aria-hidden="true"
            onError={handleImgError}
            className="
      w-full
      h-full
      object-contain
      object-right-bottom
      scale-110
      pointer-events-none
      select-none
    "
          />
        </div>

        {/* ── Birds (z-index: 10) ── */}
        <motion.img
          src="/bird.png"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute pointer-events-none select-none object-contain hidden md:block"
          style={{
            top: '70px',
            right: '560px',
            width: '65px',
            zIndex: 10,
          }}
        />

        {/* ── ID Card & Strap Container (z-index: 10) ── */}
        <div
          className="absolute pointer-events-auto hidden lg:block"
          style={{
            top: '-10px',
            right: 'min(34vw, 450px)',
            width: 'min(32vw, 420px)',
            transform: 'rotate(-6deg)',
            zIndex: 10,
          }}
        >
          {/* ── Pink Glow Behind Card (centered behind card) ── */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(36vw, 440px)',
              height: 'min(36vw, 440px)',
              background:
                'radial-gradient(circle, rgba(255,0,127,0.35) 0%, rgba(255,0,127,0.10) 48%, transparent 70%)',
              filter: 'blur(45px)',
              zIndex: -1,
            }}
          />
          <IDCardMockup />
        </div>

        {/* ── Main Hero Content Grid (z-index: 10) ── */}
        <div
          className="relative w-full max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12 pb-8 md:pb-8 lg:pb-8 pt-4 md:pt-8 lg:pt-0"
          style={{ zIndex: 10 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col justify-center items-center text-center md:items-start md:text-left max-w-[520px] mx-auto md:mx-0"
          >
            {/* Welcome Label + hhGoa.png Highlight Group */}
            <motion.div
              variants={staggerItem}
              className="flex items-center justify-center md:justify-start gap-[10px] mb-4 flex-wrap"
            >
              <span
                className="inline-flex items-center gap-3 font-mono font-medium uppercase text-[#98E8A3]"
                style={{ fontSize: 'clamp(12px, 3.6vw, 18px)', letterSpacing: '0.26em' }}
              >
                <span className="hidden sm:inline-block w-[56px] h-[2px] bg-[#98E8A3]/60" />
                Welcome to HH Goa 2026
              </span>
              <img
                src="/hhGoa.png"
                alt="HH Goa 2026 Badge"
                onError={handleImgError}
                className="h-[30px] sm:h-[36px] w-auto object-contain select-none inline-block drop-shadow-sm"
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={staggerItem}
              className="text-hero mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#f5efe4',
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
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

            {/* Supporting Copy */}
            <motion.p
              variants={staggerItem}
              className="text-[#b3c7aa] text-base md:text-lg leading-relaxed max-w-[480px] mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Upload your photo and instantly generate your official Hacker House Goa ID Card — a premium keepsake for the most epic builder residency in India.
            </motion.p>

            {/* Primary Call-To-Action: Upload Box Component */}
            <motion.div variants={staggerItem} className="mb-0 mx-auto md:mx-0 md:ml-[50px] w-full flex justify-center md:block">
              <UploadBox />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="relative z-10 flex justify-center lg:hidden w-full mt-1 md:mt-4 pointer-events-none"
              style={{ transform: 'rotate(-6deg)' }}
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'min(78vw, 360px)',
                    height: 'min(78vw, 360px)',
                    background:
                      'radial-gradient(circle, rgba(255,0,127,0.35) 0%, rgba(255,0,127,0.10) 48%, transparent 70%)',
                    filter: 'blur(45px)',
                    zIndex: -1,
                  }}
                />
                <IDCardMockup />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
