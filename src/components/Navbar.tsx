import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '#home', active: true, targetId: 'home' },
  { label: 'How It Works', href: '#how-it-works', targetId: 'how-it-works' },
  { label: 'Create ID', href: '#generate', targetId: 'generate' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="sticky top-0 w-full"
        style={{
          zIndex: 50,
          background: 'transparent',
        }}
      >
        <div
          className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between"
          style={{ height: '72px' }}
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex-shrink-0 flex items-center group relative z-50"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
          >
            <img
              src="/logo.webp"
              alt="Hacker House Goa"
              onError={handleImgError}
              className="w-auto h-[48px] sm:h-[52px] md:h-[56px] lg:h-[60px] object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation — centered */}
          <nav
            aria-label="Primary"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.targetId)
                }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                className={`relative whitespace-nowrap text-[13px] lg:text-[14px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
                  link.active ? 'text-[#FFD229]' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {link.active && (
                  <span className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[20px] h-[2px] bg-[#FFD229] rounded-full" />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="hidden md:flex items-center flex-shrink-0"
          >
            <Button
              variant="pink"
              className="h-[42px] px-6 rounded-xl text-[13px] font-semibold tracking-wide shadow-[0_6px_20px_rgba(255,0,130,0.2)]"
              onClick={() => scrollToSection('generate')}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile: CTA + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="pink"
              className="h-[40px] px-4 rounded-xl text-[12px] font-semibold tracking-wide shadow-[0_6px_20px_rgba(255,0,130,0.2)]"
              onClick={() => scrollToSection('generate')}
            >
              Create ID
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 text-white/70 hover:text-white transition-colors p-2.5 min-h-[44px] min-w-[44px] inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430] rounded-xl"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="md:hidden absolute left-0 right-0 top-full bg-[#0B4D2B]/96 backdrop-blur-2xl z-40 overflow-hidden border-t border-white/5"
            >
              <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setMobileOpen(false)
                      scrollToSection(link.targetId)
                    }}
                    className={`text-base py-3 min-h-[48px] border-b border-white/[0.05] transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430] rounded-lg ${
                      link.active ? 'text-[#FFE600]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
