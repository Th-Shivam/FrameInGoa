import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Sparkles, Sun, Download, Share2 } from 'lucide-react'

/* ==========================================================================
   Features Section — Dark Green Background, 5 Premium Cream Cards
   ========================================================================== */

const features = [
  {
    icon: Eye,
    title: 'Real-time Preview',
    description: 'See every change instantly as you tweak the layout and colors.',
  },
  {
    icon: Sparkles,
    title: 'HD Quality Output',
    description: 'Crisp, print-ready exports that look sharp on any screen.',
  },
  {
    icon: Sun,
    title: 'Goa Style Design',
    description: 'Tropical gradients and textures inspired by Hacker House Goa.',
  },
  {
    icon: Download,
    title: 'Instant Download',
    description: 'Grab your finished card as a high-resolution PNG in one click.',
  },
  {
    icon: Share2,
    title: 'Share with Friends',
    description: 'Post your ID to Twitter, LinkedIn, or the HH Goa community.',
  },
]

export default function FeaturesSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#0B5A33' }}
    >
      {/* ── Outer (1400) / Inner content (1280) ── */}
      <div className="w-full mx-auto" style={{ maxWidth: '1400px' }}>
        <div
          className="mx-auto"
          style={{
            maxWidth: '1280px',
            paddingLeft: '80px',
            paddingRight: '80px',
            paddingTop: '96px',
            paddingBottom: '96px',
          }}
        >
          {/* ── Centered heading block ── */}
          <div className="text-center mb-16">
            <span
              className="inline-block uppercase font-semibold tracking-[0.3em] text-[12px] mb-4"
              style={{ color: '#F6C431' }}
            >
              Why Use Our ID Generator?
            </span>

            <h2
              className="relative inline-block font-semibold"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#ffffff',
              }}
            >
              Make It Uniquely{' '}
              <span className="relative inline-block">
                Hacker
                {/* Pink brush stroke under "Hacker" */}
                <svg
                  aria-hidden="true"
                  className="absolute left-0 -bottom-2 w-full"
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  style={{ height: '14px' }}
                >
                  <path
                    d="M2,10 C40,2 80,14 120,8 C160,2 188,12 198,6"
                    stroke="#FF168C"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </h2>
          </div>

          {/* ── 5-card grid (equal heights) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex flex-col items-start"
                  style={{
                    backgroundColor: '#F7F3E8',
                    borderRadius: '18px',
                    padding: '32px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                    minHeight: '100%',
                  }}
                >
                  {/* Green circular icon */}
                  <div
                    className="flex items-center justify-center mb-6"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(11,90,51,0.10)',
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#0B5A33' }} strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-semibold mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      color: '#0B5A33',
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{ color: '#4a5a4f' }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
