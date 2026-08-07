import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About HH Goa', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <>
      {/* ── NAVBAR CONTAINER (Height 72px, z-index 20, transparent — hero bg shows through) ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative w-full overflow-visible"
        style={{
          zIndex: 20,
          background: 'transparent',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <div
          className="relative w-full max-w-[1320px] mx-auto px-5 md:px-[28px] lg:px-[40px] flex items-center justify-between"
          style={{ height: '72px' }}
        >
          {/* Logo aligned left */}
          <a
            href="#home"
            className="flex-shrink-0 flex items-center group relative z-50"
          >
            <img
              src="/logo.png"
              alt="Hacker House Goa"
              onError={handleImgError}
              className="w-auto h-[60px] md:h-[68px] lg:h-[72px] object-contain select-none transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>

          {/* Navigation perfectly centered */}
          <nav
            aria-label="Primary"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-[36px] lg:gap-[40px]"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                className={`relative text-[15px] font-semibold tracking-normal transition-colors duration-200 ${
                  link.active ? 'text-[#FFD229]' : 'text-white/[.88] hover:text-white'
                }`}
              >
                {link.label}

                {/* Active Underline for Home */}
                {link.active ? (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[28px] h-[3px] bg-[#FFD229] rounded-full" />
                ) : (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-white rounded-full group-hover:w-[20px] transition-all duration-300" />
                )}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button aligned right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="hidden md:flex items-center flex-shrink-0"
          >
            <Button
              variant="pink"
              className="h-[48px] px-0 py-0 rounded-[12px] text-[14px] font-semibold tracking-wide shadow-[0_8px_25px_rgba(255,0,130,0.22)] hover:shadow-[0_8px_25px_rgba(255,0,130,0.22)]"
              style={{ paddingLeft: '28px', paddingRight: '28px' }}
            >
              Create Your ID
            </Button>
          </motion.div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="md:hidden fixed inset-0 top-0 bg-[#0B4D2B]/96 backdrop-blur-2xl z-40 pt-24 px-8"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg py-3 border-b border-white/[0.07] transition-colors font-medium ${
                    link.active ? 'text-[#FFE600]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-6">
                <Button variant="pink" size="md" fullWidth className="h-[44px] rounded-[12px]">
                  Create Your ID
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}
