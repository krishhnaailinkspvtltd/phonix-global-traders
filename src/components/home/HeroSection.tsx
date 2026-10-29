import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLImageElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // 1. Entrance Animation Timeline (fires smoothly on mount / after loader)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Image initial scale reveal
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.15, opacity: 0.6 },
        { scale: 1.0, opacity: 1, duration: 1.6, ease: 'power2.out' }
      )

      // Headline lines masked reveal from below
      const headlineLines = headlineRef.current?.querySelectorAll('.hero-line')
      if (headlineLines && headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power4.out' },
          '-=1.2'
        )
      }

      // Subhead and CTA entrance
      if (subheadRef.current) {
        tl.fromTo(
          subheadRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        )
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
      }

      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
      }

      // 2. Scrubbed Scroll Animation (GSAP ScrollTrigger)
      // When visitor scrolls down:
      // Stage 1: Headline lifts and subtly fades
      // Stage 2: Background vessel slightly zooms in for parallax depth
      // Stage 3: Smooth handoff into next section
      if (containerRef.current && bgImageRef.current) {
        gsap.to(headlineRef.current, {
          y: -120,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.to(bgImageRef.current, {
          scale: 1.12,
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.to(subheadRef.current, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 0.5,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="home-fullscreen-hero relative w-full h-[100vh] min-h-[680px] flex flex-col justify-between overflow-hidden select-none bg-[#082653]"
    >
      {/* Background Fullscreen Maritime Carrier Photography */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="/images/hero/hero-vessel.jpg"
          alt="International Container Vessel Navigating Open Ocean"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.12]"
        />
        {/* Cinematic Deep Navy Vignette & Radiant Gradient for Crisp White Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#082653] via-[#082653]/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#082653]/80 via-[#082653]/30 to-transparent" />
      </div>

      {/* Top Spacer for Fixed Nav */}
      <div className="pt-28 sm:pt-36" />

      {/* Main Center Content: Carysil-Standard Bold Typographic Composition */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 my-auto">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          
          {/* Subtle Institutional Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-sans text-xs tracking-wider font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#66A8FF] animate-pulse" />
            <span className="uppercase tracking-[0.15em]">INDIAN EXPORT &amp; GLOBAL IMPORT HOUSE</span>
          </div>

          {/* Monumental Headline: Masked Lines */}
          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-[0.90] uppercase"
          >
            <div className="overflow-hidden">
              <span className="hero-line block">INDIAN EXPORTS.</span>
            </div>
            <div className="overflow-hidden mt-1 sm:mt-2">
              <span className="hero-line block text-[#EAF3FF] font-light italic font-serif tracking-normal">
                Across The World.
              </span>
            </div>
          </h1>

          {/* Sophisticated Marketing Lead Copy (Medium Font Size) */}
          <div ref={subheadRef} className="max-w-2xl">
            <p className="text-white/95 font-sans text-lg sm:text-xl lg:text-2xl leading-relaxed font-normal">
              Supplying international markets with India&apos;s premium dehydrated vegetables &amp; fruits, authentic spices, and manufactured goods from Mundra &amp; JNPT deepwater terminals, while importing sovereign commodities globally.
            </p>
          </div>

          {/* Dual Action CTAs: Blur Transparent Glass Buttons with Motion */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="px-7 py-3.5 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] text-white backdrop-blur-md border border-white/35 font-sans text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-[#1557B0]/40 inline-flex items-center gap-2.5 group cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore Dehydrated Agro &amp; Products</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/global-trade"
              className="px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/40 font-sans text-sm font-medium tracking-wide transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <span>View Shipping Corridors</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Bar & Animated Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white/90 font-sans text-sm">
          
          <div className="flex items-center gap-6 text-xs sm:text-sm tracking-wide">
            <span className="font-semibold text-white">MUNDRA // JNPT // DUBAI // ROTTERDAM // NEW YORK</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-white/70 font-mono text-xs">APEDA · SPICES BOARD · FSSAI REGISTERED</span>
          </div>

          {/* Subtle Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="flex items-center gap-2.5 text-xs sm:text-sm tracking-widest uppercase text-white font-bold"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#66A8FF]" />
          </div>
        </div>
      </div>
    </section>
  )
}
