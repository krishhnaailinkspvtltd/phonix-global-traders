import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ArrowUpRight } from 'lucide-react'
import { FullscreenMenu } from '@/components/layout/FullscreenMenu'

const NAV_LINKS = [
  { label: 'Products', path: '/products' },
  { label: 'Spices & Agro', path: '/products?category=spices-commodities' },
  { label: 'Manufacturing', path: '/products?category=manufactured-goods' },
  { label: 'Imports', path: '/products?category=global-imports' },
  { label: 'Trade Routes', path: '/global-trade' },
  { label: 'About', path: '/about' },
]

export const Navigation: React.FC = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled dynamic island state after 35px scroll
      setIsScrolled(window.scrollY > 35)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  // Whether header is in the "Invisible at Top" mode (Home page when not scrolled)
  const isTransparentTop = isHome && !isScrolled

  useEffect(() => { setIsMenuOpen(false) }, [location.pathname, location.search])

  return (
    <>
      {/* 
        Dynamic Island Header:
        - Invisible on Home Page at top (just options floating cleanly over hero)
        - Morphs smoothly on scroll into a Water-Effect Glassmorphic Dynamic Island
      */}
      <header
        className={`mobile-site-header fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
          isTransparentTop
            ? 'top-4 sm:top-6 w-[94vw] max-w-7xl py-3 px-4 sm:px-8 bg-transparent shadow-none border-transparent'
            : 'top-3 sm:top-4 w-[92vw] max-w-4xl py-2 px-4 sm:px-6 water-glass-island rounded-full overflow-hidden'
        }`}
      >
        {/* Water Ripple & Liquid Sheen Shimmer (Only visible in Dynamic Island state) */}
        {!isTransparentTop && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent w-full h-full animate-water-sheen" />
          </div>
        )}

        {/* Left: Brand Monogram & Title */}
        <Link
          to="/"
          className="relative z-10 flex items-center gap-2.5 group focus-visible:outline-none select-none"
          aria-label="Phonix Global Trade Home"
        >
          {/* Monogram P Icon */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm transition-all duration-300 ${
              isTransparentTop
                ? 'bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-md group-hover:bg-white group-hover:text-[#0F172A]'
                : 'bg-[#1557B0] text-white shadow-sm group-hover:bg-[#0A3478]'
            }`}
          >
            P
          </div>

          {/* Brand Typography */}
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display font-black text-xl sm:text-2xl tracking-tight leading-none transition-colors duration-300 ${
                isTransparentTop
                  ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:text-white'
                  : 'text-[#0F172A] group-hover:text-[#1557B0]'
              }`}
            >
              PHONIX
            </span>
            <span
              className={`font-editorial italic font-normal text-xs hidden sm:inline transition-colors duration-300 ${
                isTransparentTop
                  ? 'text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]'
                  : 'text-[#1557B0]'
              }`}
            >
              Trade
            </span>
          </div>
        </Link>

        {/* Center: Clean Minimalist Navigation Options (No Clutter, Pure Options) */}
        <nav className="relative z-10 hidden lg:flex items-center space-x-1 font-sans text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = (location.pathname + location.search) === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isTransparentTop
                    ? isActive
                      ? 'text-white font-bold bg-white/20 backdrop-blur-xs drop-shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]'
                    : isActive
                    ? 'text-[#1557B0] bg-blue-50/90 font-semibold shadow-xs'
                    : 'text-slate-700 hover:text-[#1557B0] hover:bg-blue-50/50'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right: Sleek Action CTA & Minimalist Menu Trigger */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          {/* Inquiry Action Button: Blur Transparent with Hover Scale & Active Motion */}
          <Link
            to="/contact"
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group ${
              isTransparentTop
                ? 'bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white shadow-lg'
                : 'bg-[#1557B0]/90 hover:bg-[#1557B0] backdrop-blur-md border border-white/50 text-white shadow-md'
            }`}
          >
            <span>Inquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Minimal Menu Trigger with Blur Transparent Glass & Motion */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu" aria-expanded={isMenuOpen} aria-haspopup="dialog"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
              isTransparentTop
                ? 'bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white drop-shadow-sm'
                : 'bg-white/45 hover:bg-white/75 backdrop-blur-md border border-white/60 text-[#0F172A] hover:text-[#1557B0] shadow-xs'
            }`}
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
