import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight, Globe, Compass, Clock } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  label: string
  sublabel: string
  path: string
  image: string
  num: string
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'HOME',
    sublabel: 'Overview & Global Export Movement',
    path: '/',
    image: '/images/hero/hero-port.jpg',
    num: '01',
  },
  {
    label: 'DEHYDRATED AGRO',
    sublabel: 'Onion, Garlic & Spray-Dried Fruits',
    path: '/products',
    image: '/images/categories/cat-commodity.jpg',
    num: '02',
  },
  {
    label: 'SPICES & COMMODITIES',
    sublabel: 'Alleppey Turmeric, Chilies & 1121 Basmati',
    path: '/products?category=spices-commodities',
    image: '/images/panels/panel-2-sourcing.jpg',
    num: '03',
  },
  {
    label: 'MANUFACTURED GOODS',
    sublabel: 'Morbi Porcelain Tiles & Eco-Ware',
    path: '/products?category=manufactured-goods',
    image: '/images/categories/cat-industrial.jpg',
    num: '04',
  },
  {
    label: 'GLOBAL IMPORTS',
    sublabel: 'California Almonds, Cashews & Pulses',
    path: '/products?category=global-imports',
    image: '/images/panels/panel-4-markets.jpg',
    num: '05',
  },
  {
    label: 'TRADE ROUTES',
    sublabel: 'Mundra & JNPT Direct Corridors',
    path: '/global-trade',
    image: '/images/trade/trade-corridor.jpg',
    num: '06',
  },
  {
    label: 'CONTACT DESKS',
    sublabel: 'Mumbai HQ & International Clearing',
    path: '/contact',
    image: '/images/gallery/gallery-6.jpg',
    num: '07',
  },
]

export const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const [hoveredImage, setHoveredImage] = useState<string>(NAV_ITEMS[0].image)

  useEffect(() => {
    if (!isOpen) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = oldOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="fullscreen-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog" aria-modal="true" aria-label="Site navigation" className="mobile-nav-overlay fixed inset-0 z-99999 flex flex-col justify-between bg-canvas/98 text-primary-text backdrop-blur-2xl p-6 md:p-12 lg:p-16 overflow-y-auto select-none"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-6">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                onClick={onClose}
                className="font-display font-black text-xl tracking-tight flex items-baseline gap-1"
              >
                <span>PHONIX</span>
                <span className="font-serif italic font-normal text-accent text-sm">Trade</span>
              </Link>
              <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-border-strong text-secondary-text">
                NAVIGATION ARCHITECTURE
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Navigation Overlay"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer text-slate-700"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4 text-[#1557B0]" />
              </button>
            </div>
          </div>

          {/* Center: Main Nav Links & Dynamic Image Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-8">
            {/* Links Column */}
            <div className="lg:col-span-7 flex flex-col space-y-3 md:space-y-4">
              {NAV_ITEMS.map((item, index) => {
                const isActive = (location.pathname + location.search) === item.path

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.06,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setHoveredImage(item.image)}
                    className="group mobile-nav-item"
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="mobile-nav-item-link inline-flex items-baseline gap-4 md:gap-6 w-full py-1 text-left"
                    >
                      <span className="font-mono text-xs md:text-sm text-accent tracking-widest">
                        {item.num}
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                        <span
                          className={`mobile-nav-item-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter transition-all duration-300 group-hover:translate-x-3 ${
                            isActive
                              ? 'text-accent'
                              : 'text-primary-text group-hover:text-accent'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="mobile-nav-item-subtitle font-serif italic text-sm sm:text-base text-secondary-text opacity-70 group-hover:opacity-100 transition-opacity">
                          {item.sublabel}
                        </span>
                      </div>
                      <ArrowUpRight className="hidden sm:inline-block w-6 h-6 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-300" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Preview Column (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-border-strong shadow-2xl bg-surface/50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredImage}
                    src={hoveredImage}
                    alt="Navigation Visual Preview"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Subtle vignette & metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white font-mono text-xs">
                  <div className="flex items-center gap-2 text-accent">
                    <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
                    <span className="tracking-widest">PHONIX ARCHIVE CURATION</span>
                  </div>
                  <p className="text-white/80 text-[11px] mt-1 font-sans">
                    Real-time operational photography from verified global logistics nodes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Quick Metas, Regional Clocks */}
          <div className="border-t border-border-subtle pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-secondary-text">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span>HEADQUARTERS: SINGAPORE · ROTTERDAM</span>
            </div>
            <div className="flex items-center gap-2 sm:justify-center">
              <Clock className="w-4 h-4 text-accent-blue" />
              <span>TRADING HOURS: 24/7 INTERCONTINENTAL</span>
            </div>
            <div className="sm:text-right">
              <span className="text-primary-text font-semibold">DIRECT INQUIRY:</span>{' '}
              <a href="mailto:trade@phonix-demo.com" className="hover:text-accent underline">
                trade@phonix-demo.com
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
