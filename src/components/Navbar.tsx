import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { navigateTo } from '@/lib/appRouter'

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
        className="sticky top-0 w-full overflow-visible"
        style={{
          zIndex: 20,
          background: 'transparent',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <div
          className="relative w-full max-w-[1320px] mx-auto px-4 sm:px-5 md:px-[28px] lg:px-[40px] flex items-center justify-between gap-3"
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
              className="
w-auto
h-[400px]
sm:h-[100px]
md:h-[250px]
lg:h-[80px]
object-contain

relative
top-2      /* Neeche shift */
-top-2     /* Upar shift */
left-2     /* Right ki taraf shift */
-right-2   /* Left ki taraf shift */

"
            />
          </a>

          {/* Navigation perfectly centered */}
          <nav
            aria-label="Primary"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 lg:gap-[40px]"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                className={`relative whitespace-nowrap text-[13px] lg:text-[15px] font-semibold tracking-normal transition-colors duration-200 ${
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
              type="button"
              onClick={() => navigateTo('/create-id')}
              aria-label="Create Your ID"
              className="h-[48px] px-0 py-0 rounded-[12px] text-[14px] font-semibold tracking-wide shadow-[0_8px_25px_rgba(255,0,130,0.22)] hover:shadow-[0_8px_25px_rgba(255,0,130,0.22)]"
              style={{ paddingLeft: '28px', paddingRight: '28px' }}
            >
              Create Your ID
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="md:hidden ml-auto flex items-center flex-shrink-0"
          >
            <Button
              variant="pink"
              type="button"
              onClick={() => navigateTo('/create-id')}
              aria-label="Create ID"
              className="min-h-[48px] h-[48px] px-4 py-0 rounded-[12px] text-[12px] font-semibold tracking-wide shadow-[0_8px_25px_rgba(255,0,130,0.22)] hover:shadow-[0_8px_25px_rgba(255,0,130,0.22)] whitespace-nowrap"
            >
              Create ID
            </Button>
          </motion.div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 text-white/70 hover:text-white transition-colors p-3 min-h-[48px] min-w-[48px] inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430] rounded-[12px]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="md:hidden absolute left-0 right-0 top-full bg-[#0B4D2B]/96 backdrop-blur-2xl z-40 overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-base py-3 min-h-[48px] border-b border-white/[0.07] transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C430] rounded-[8px] ${
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
