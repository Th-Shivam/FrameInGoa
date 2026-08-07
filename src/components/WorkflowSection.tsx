import React from 'react'
import { Upload, Crop, Palette, Download } from 'lucide-react'

/* ==========================================================================
   Workflow / Features Section
   STRUCTURE:
   ┌─────────────────────────────────────────┐
   │ CREAM (#F8F3E8)                         │
   │  • 4-step icons grid (compact padding)  │
   ├─────────────────────────────────────────┤
   │ wave SVG cream → dark-green             │
   ├─────────────────────────────────────────┤
   │ DARK GREEN (#0B5A33)                    │
   │  • WHY USE OUR ID GENERATOR? label     │
   │  • Make It Uniquely Hacker. heading     │
   └─────────────────────────────────────────┘
   ========================================================================== */

const steps = [
  {
    icon: Upload,
    circleBg: '#FF007F',
    iconColor: '#FFFFFF',
    title: 'Upload Photo',
    subtitle: 'Select your photo or selfie',
  },
  {
    icon: Crop,
    circleBg: '#FFE600',
    iconColor: '#0B5A33',
    title: 'Crop & Adjust',
    subtitle: 'Frame & adjust alignment',
  },
  {
    icon: Palette,
    circleBg: '#FF007F',
    iconColor: '#0B5A33',
    title: 'Customize',
    subtitle: 'Add details & theme',
  },
  {
    icon: Download,
    circleBg: '#FFE600',
    iconColor: '#0B5A33',
    title: 'Download',
    subtitle: 'Get your official ID card',
  },
]

export default function WorkflowSection() {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none'
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════
          CREAM SECTION — 4-step grid ONLY, compact height
         ══════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="relative w-full"
        style={{
          backgroundColor: '#F8F3E8',
          backgroundImage: 'radial-gradient(circle, rgba(11,90,51,0.035) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* 4-step grid */}
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 pt-6 md:pt-5 pb-7 md:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-start justify-items-center">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center w-full max-w-[240px]"
                >
                  {/* 72×72 circle */}
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 shadow-[0_6px_16px_rgba(0,0,0,0.12)] flex-shrink-0"
                    style={{ backgroundColor: step.circleBg }}
                  >
                    <Icon className="w-8 h-8" style={{ color: step.iconColor }} strokeWidth={2.2} />
                  </div>

                  <h3
                    className="font-bold text-[17px] leading-tight mb-1 text-[#0B5A33]"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="font-medium text-[13px] leading-snug text-[#0B5A33]/80"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                  >
                    {step.subtitle}
                  </p>

                  {/* Dotted curved arrow between steps (desktop only) */}
                  {idx < steps.length - 1 && (
                    <svg
                      aria-hidden="true"
                      className="hidden lg:block absolute -right-[52px] top-[21px] w-[90px] h-[30px] pointer-events-none select-none z-10"
                      viewBox="0 0 90 30"
                      fill="none"
                    >
                      <path
                        d="M 6 22 C 30 5, 60 5, 80 16"
                        stroke="#0B5A33"
                        strokeWidth="2.2"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 73 11 L 82 17 L 76 22"
                        stroke="#0B5A33"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Cream → Dark Green wave separator (bottom of cream section) */}
        <div className="w-full overflow-hidden leading-none select-none pointer-events-none" style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            className="w-full block h-[38px] md:h-[48px]"
            style={{ display: 'block' }}
          >
            {/* cream (top) stays, green fills bottom */}
            <path
              d="M0,0 L1440,0 L1440,18 Q1080,52 720,28 Q360,4 0,38 Z"
              fill="#F8F3E8"
            />
            <path
              d="M0,38 Q360,4 720,28 Q1080,52 1440,18 L1440,56 L0,56 Z"
              fill="#0B5A33"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DARK GREEN SECTION — heading block
         ══════════════════════════════════════════════════ */}
      <section
        id="features"
        className="relative w-full"
        style={{ backgroundColor: '#0B5A33' }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-6 pt-[30px] md:pt-[36px] pb-[20px] text-center flex flex-col items-center">
          {/* Small label */}
          <p
            className="uppercase font-bold text-[12px] md:text-[13px] tracking-[3px] md:tracking-[4px] mb-[12px]"
            style={{ color: '#F4C430', fontFamily: 'var(--font-mono, monospace)' }}
          >
            WHY USE OUR ID GENERATOR?
          </p>

          {/* Main heading */}
          <h2
            className="font-bold text-[clamp(2rem,10vw,2.875rem)] lg:text-[56px] leading-[1.05] tracking-[-0.5px] text-white relative inline-block"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Make It Uniquely{' '}
            <span className="relative inline-block">
              Hacker.
              {/* /line.png pink brush underline */}
              <img
                src="/line.png"
                alt=""
                aria-hidden="true"
                onError={handleImgError}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[120px] h-auto pointer-events-none select-none -rotate-6"
              />
            </span>
          </h2>
        </div>
      </section>
    </>
  )
}
