import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem } from '@/animations'
import IDCardMockup from '@/components/IDCardMockup'

/* ==========================================================================
   Hero Section — Ground Scenes, ID Card & Editorial Content
   ========================================================================== */

export default function HeroSection() {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[720px] overflow-visible flex items-center"
      style={{ backgroundColor: '#0B4D2B' }}
    >
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

      {/* ── Ground Line Divider (z-index: 1) ── */}
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
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════════════════════
          LEFT ILLUSTRATION GROUP CONTAINER
          • Parent container: bottom:0, overflow:visible
          • Desktop: 340px width
          • Tablet (sm): 255px width (75% scale)
          • Mobile (<768px): 180px width
         ══════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-[15px] sm:left-[45px] lg:left-[80px] overflow-visible pointer-events-none select-none z-10 w-[180px] sm:w-[255px] lg:w-[340px]"
        style={{ height: 'auto' }}
      >
        {/* House (base of left group on ground) */}
        <img
          src="/house.png"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          className="absolute object-contain bottom-0 left-0 w-[160px] sm:w-[225px] lg:w-[300px]"
          style={{ zIndex: 2 }}
        />
        {/* Board (stands in front of house) */}
        <img
          src="/board.png"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          className="absolute object-contain bottom-[10px] sm:bottom-[14px] lg:bottom-[18px] left-[60px] sm:left-[82px] lg:left-[110px] w-[52px] sm:w-[68px] lg:w-[90px]"
          style={{ zIndex: 3 }}
        />
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT ILLUSTRATION GROUP CONTAINER
          • Parent container: bottom:0, overflow:visible
          • Desktop: 340px width
          • Tablet (sm): 255px width (75% scale)
          • Mobile (<768px): 180px width
         ══════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 right-[15px] sm:right-[45px] lg:right-[80px] overflow-visible pointer-events-none select-none z-10 w-[180px] sm:w-[255px] lg:w-[340px]"
        style={{ height: 'auto' }}
      >
        {/* House (base of right group on ground) */}
        <img
          src="/righthouse.png"
          alt=""
          aria-hidden="true"
          onError={handleImgError}
          className="absolute object-contain bottom-0 right-0 w-[160px] sm:w-[225px] lg:w-[300px]"
          style={{ zIndex: 2 }}
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
          top: '150px',
          right: '480px',
          width: '65px',
          zIndex: 10,
        }}
      />

      {/* ── Pink Glow Behind Card (z-index: 10) ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full hidden md:block"
        style={{
          top: '50px',
          right: '330px',
          width: '440px',
          height: '440px',
          background:
            'radial-gradient(circle, rgba(255,0,127,0.35) 0%, rgba(255,0,127,0.10) 48%, transparent 70%)',
          filter: 'blur(45px)',
          zIndex: 10,
        }}
      />

      {/* ── ID Card & Strap (z-index: 10, top of strap starts ~20px below navbar at 108px) ── */}
      <div
        className="absolute pointer-events-auto hidden md:block"
        style={{
          top: '108px',
          right: '370px',
          width: '420px',
          transform: 'rotate(-6deg)',
          zIndex: 10,
        }}
      >
        <IDCardMockup />
      </div>

      {/* ── Main Hero Content Grid (z-index: 20) ── */}
      <div
        className="relative w-full max-w-[1320px] mx-auto px-6 lg:px-12 pt-8"
        style={{ zIndex: 20 }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col justify-center max-w-[520px]"
        >
          {/* Welcome Label + hhGoa.png Highlight Group */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-[10px] mb-6 flex-wrap"
          >
            <span
              className="inline-flex items-center gap-3 font-mono font-medium uppercase text-[#98E8A3]"
              style={{ fontSize: '18px', letterSpacing: '0.4em' }}
            >
              <span className="w-[56px] h-[2px] bg-[#98E8A3]/60 inline-block" />
              Welcome to HH Goa 2026
            </span>
            <img
              src="/hhGoa.png"
              alt="HH Goa 2026 Badge"
              onError={handleImgError}
              className="h-[36px] w-auto object-contain select-none inline-block drop-shadow-sm"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={staggerItem}
            className="text-hero mb-6"
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
            className="text-[#b3c7aa] text-base md:text-lg leading-relaxed max-w-[480px] mb-10"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Upload your photo and instantly generate your official Hacker House Goa ID Card — a premium keepsake for the most epic builder residency in India.
          </motion.p>

          {/* CTA Buttons with Lucide Icons */}
          <motion.div variants={staggerItem} className="flex flex-wrap gap-4 mb-8">
            <Button
              variant="pink"
              size="lg"
              rightIcon={<Upload className="w-4 h-4" />}
              onClick={() => document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Upload Photo
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Play className="w-4 h-4" />}
              className="border-[#7ec28b]/30 text-[#b3c7aa] hover:border-[#7ec28b]/60 hover:text-[#d6e5cf] hover:bg-[#7ec28b]/10"
            >
              View Demo
            </Button>
          </motion.div>

          {/* Trust Signal */}
          <motion.p
            variants={staggerItem}
            className="text-[11px] font-mono tracking-widest uppercase text-[#7ec28b]/60 flex items-center gap-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#7ec28b]" />
            Free · No signup · Instant download
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
