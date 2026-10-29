import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const compactScreen = window.matchMedia('(max-width: 1023px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onComplete()
      return
    }

    // Smooth, extended progress counter (0% -> 100% over ~3.2s)
    // Giving the 1st monumental font animation ample, luxurious screen time
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, compactScreen ? 17 : 32)

    // Smooth curtain exit at ~3.8s (after 100% is reached and appreciated)
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(onComplete, compactScreen ? 420 : 650)
    }, compactScreen ? 1800 : 3800)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearTimeout(exitTimer)
        clearInterval(interval)
        setIsExiting(true)
        setTimeout(onComplete, 100)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(exitTimer)
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onComplete])

  const letters = ['P', 'H', 'O', 'N', 'I', 'X']

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="minimalist-image-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-99999 flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden bg-[#0A2540]"
        >
          {/* Visible High-Resolution Background Photography */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/images/hero/hero-vessel.jpg"
              alt="Maritime Export Vessel"
              className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.12] scale-105"
            />
            {/* Subtle Royal Navy Gradient Overlay for High Typographic Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#082653]/90 via-[#0A2540]/60 to-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(21,87,176,0.25),transparent_75%)]" />
          </div>

          {/* Top Bar: Clean Minimal Brand Origin & Skip Button */}
          <div className="relative z-10 flex items-center justify-between text-xs font-sans text-white/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#66A8FF] animate-pulse" />
              <span className="font-semibold tracking-wider sm:tracking-widest uppercase text-[9px] sm:text-xs text-white leading-relaxed">
                PHONIX GLOBAL TRADE // INDIA ⇄ WORLDWIDE
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsExiting(true)
                setTimeout(onComplete, 100)
              }}
              className="shrink-0 text-[10px] sm:text-xs text-white/70 hover:text-white transition-colors font-medium tracking-wider uppercase cursor-pointer px-2 sm:px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs"
            >
              Skip [ESC]
            </button>
          </div>

          {/* Center: The Single Extended Monumental Font Animation */}
          <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center">
            
            {/* Big Monumental Staggered Letters Assembling the Brand Identity */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-4 md:gap-7 overflow-hidden py-4">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 90, opacity: 0, scale: 0.75 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.95,
                    delay: index * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-display font-black text-[clamp(2.4rem,11.5vw,3.8rem)] sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight text-white select-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Graceful Brand Identity Subtext Emerging Below Monumental Letters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 sm:mt-6 space-y-2 text-center"
            >
              <span className="font-display font-bold text-xs sm:text-base tracking-[0.18em] sm:tracking-[0.45em] text-[#66A8FF] uppercase block">
                GLOBAL TRADE // EXPORT &amp; IMPORT
              </span>
              <p className="font-editorial italic text-white/80 text-xs sm:text-base max-w-lg mx-auto">
                Exporting Indian Indigenous Harvest &amp; Manufactured Excellence Worldwide
              </p>
            </motion.div>

          </div>

          {/* Bottom Bar: Minimalist Hairline Progress Bar */}
          <div className="relative z-10 max-w-sm mx-auto w-full flex flex-col items-center space-y-2.5">
            <div className="flex items-center justify-between w-full text-[11px] font-sans text-white/70">
              <span className="tracking-wide">
                {progress < 40
                  ? 'Assembling maritime network'
                  : progress < 75
                  ? 'Linking Mundra & JNPT export berths'
                  : progress < 100
                  ? 'Synchronizing sovereign corridors'
                  : 'Clear for global departure'}
              </span>
              <span className="font-semibold text-white">{progress}%</span>
            </div>

            {/* Clean Minimalist Progress Line */}
            <div className="h-[2px] w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#66A8FF] to-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}