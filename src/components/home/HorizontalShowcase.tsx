import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

export const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Horizontal scrub across full-height editorial spreads
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-68%'])
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['10%', '100%'])

  return (
    <section className="relative bg-canvas border-b arch-line select-none overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-accent uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>EDITORIAL PANORAMA · HORIZONTAL SPREADS</span>
          </div>
          <h2 className="display-heading font-display font-extrabold text-primary-text">
            THE ART OF{' '}
            <span className="font-editorial italic font-normal text-accent">Intercontinental Scale.</span>
          </h2>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="w-full md:w-60 space-y-2 font-mono text-xs text-secondary-text">
          <div className="flex justify-between tracking-wider">
            <span>SPREAD PROGRESSION</span>
            <span className="text-accent font-bold">01 / 05</span>
          </div>
          <div className="w-full h-[1.5px] bg-border-strong overflow-hidden">
            <motion.div
              style={{ width: progressBarWidth }}
              className="h-full bg-accent"
            />
          </div>
        </div>
      </div>

      {/* DESKTOP HORIZONTAL SPREADS */}
      <div ref={containerRef} className="hidden md:block relative h-[210vh]">
        <div className="sticky top-24 h-[72vh] w-full flex items-center overflow-hidden pl-4 sm:pl-10 lg:pl-16">
          <motion.div
            style={{ x }}
            className="flex gap-10 items-stretch h-[64vh]"
          >
            {/* ========================================================
                SPREAD 01: Full-Height Photograph with Dramatic Typography
                ======================================================== */}
            <div className="w-[52vw] shrink-0 h-full relative overflow-hidden border border-border-strong bg-surface flex flex-col justify-between p-8 sm:p-10">
              <img
                src="/images/hero/hero-vessel.jpg"
                alt="Intercontinental Ocean Vessel Freight"
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.12] brightness-[0.80] dark:brightness-[0.65]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

              <div className="relative z-10 flex items-center justify-between text-white font-mono text-xs">
                <span className="px-2.5 py-1 border border-white/30 font-bold uppercase tracking-widest text-[#D97736]">
                  SPREAD 01 / CORRIDORS
                </span>
                <span className="tracking-widest">PACIFIC FREIGHT AXIS</span>
              </div>

              <div className="relative z-10 text-white space-y-3">
                <h3 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight leading-[0.95]">
                  MASSIVE SCALE.
                  <br />
                  <span className="font-editorial italic font-normal text-[#D97736]">
                    Oceanic Sovereignty.
                  </span>
                </h3>
                <p className="text-white/80 font-sans text-sm max-w-md">
                  Vessel chartering spanning deepwater lanes from Busan to Los Angeles and Long Beach.
                </p>
              </div>
            </div>

            {/* ========================================================
                SPREAD 02: Large Typography Editorial Manifesto on Paper Background
                ======================================================== */}
            <div className="w-[42vw] shrink-0 h-full border border-border-strong bg-surface p-10 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs text-secondary-text border-b arch-line pb-4">
                <span className="uppercase tracking-widest text-accent font-semibold">
                  SPREAD 02 / MANIFESTO
                </span>
                <span>DISCIPLINE</span>
              </div>

              <div className="space-y-6">
                <p className="font-editorial italic text-2xl lg:text-3xl text-primary-text leading-snug">
                  "International trade is not merely the relocation of physical mass. It is the mastery of contractual timing, chemical verification, and logistical equilibrium."
                </p>
                <div className="w-12 h-[1px] bg-accent" />
                <p className="font-tech text-xs uppercase tracking-widest text-secondary-text">
                  EXECUTIVE BOARD OF GOVERNANCE · SINGAPORE
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-secondary-text pt-4 border-t arch-line">
                <span>GAFTA 78/88 ASSAYS</span>
                <span>FOSFA CONTRACTING</span>
              </div>
            </div>

            {/* ========================================================
                SPREAD 03: Two Intersecting Photographs with Coordinates
                ======================================================== */}
            <div className="w-[50vw] shrink-0 h-full border border-border-strong bg-surface p-8 relative flex items-center justify-between gap-6 overflow-hidden">
              <div className="w-1/2 h-full relative overflow-hidden border border-border-strong">
                <img
                  src="/images/gallery/gallery-1.jpg"
                  alt="Deepwater Gantry Cranes"
                  className="w-full h-full object-cover filter contrast-[1.10]"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 text-white font-mono text-[10px]">
                  ROTTERDAM · 51°57′N
                </div>
              </div>

              <div className="w-1/2 h-full relative overflow-hidden border border-border-strong">
                <img
                  src="/images/gallery/gallery-4.jpg"
                  alt="Container Stacks at Dawn"
                  className="w-full h-full object-cover filter contrast-[1.10]"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 px-2.5 py-1 text-white font-mono text-[10px]">
                  SINGAPORE · 01°17′N
                </div>
              </div>

              <div className="absolute top-6 left-6 right-6 z-20 flex justify-between font-mono text-[11px] text-white bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/20">
                <span className="uppercase text-[#D97736] font-bold">SPREAD 03 / TERMINALS</span>
                <span>SYNCHRONIZED GANTRY NETWORKS</span>
              </div>
            </div>

            {/* ========================================================
                SPREAD 04: Full-Bleed Logistics with Artistic Typography
                ======================================================== */}
            <div className="w-[46vw] shrink-0 h-full relative overflow-hidden border border-border-strong bg-surface flex flex-col justify-between p-8 sm:p-10">
              <img
                src="/images/trade/trade-corridor.jpg"
                alt="Maritime Corridor Waterway"
                className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.15] brightness-[0.75]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

              <div className="relative z-10 flex items-center justify-between text-white font-mono text-xs">
                <span className="px-2.5 py-1 border border-white/30 text-[#D97736] font-bold uppercase tracking-widest">
                  SPREAD 04 / NAVIGATION
                </span>
                <span>MALACCA &amp; SUEZ CORRIDORS</span>
              </div>

              <div className="relative z-10 text-white space-y-2">
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
                  CHOKEPOINT NAVIGABILITY.
                  <br />
                  <span className="font-editorial italic font-normal text-[#D97736]">
                    Autonomous Rerouting.
                  </span>
                </h3>
                <p className="text-white/80 font-sans text-xs sm:text-sm max-w-sm">
                  Continuous GPS telemetry avoiding canal congestion and seasonal monsoon delays.
                </p>
              </div>
            </div>

            {/* ========================================================
                SPREAD 05: Closing Statement with Direct Catalog Action
                ======================================================== */}
            <div className="w-[38vw] shrink-0 h-full border border-border-strong bg-surface p-10 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs text-secondary-text border-b arch-line pb-4">
                <span className="uppercase tracking-widest text-accent font-semibold">
                  SPREAD 05 / CONTRACTING
                </span>
                <span>CATALOG ACCESS</span>
              </div>

              <div className="space-y-6">
                <span className="font-tech text-xs uppercase tracking-[0.25em] text-accent block font-semibold">
                  BOOKING &amp; ALLOCATIONS
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight leading-snug text-primary-text">
                  READY TO ENGAGE
                  <br />
                  <span className="font-editorial italic font-normal text-accent">
                    The Global Fleet?
                  </span>
                </h3>
                <p className="text-secondary-text font-sans text-sm leading-relaxed">
                  Inspect our verified commodities catalog, certified assay parameters, and FOB/CIF delivery terms.
                </p>
              </div>

              <div>
                <Link
                  to="/products"
                  className="w-full py-3.5 bg-primary-text text-canvas hover:bg-accent hover:text-white transition-all duration-300 font-tech text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2"
                >
                  <span>Open Commodity Catalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* MOBILE ADAPTATION: Touch-friendly vertical stack */}
      <div className="md:hidden px-4 py-8 space-y-6">
        <div className="border border-border-strong bg-surface p-6 space-y-4">
          <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block">
            SPREAD 01
          </span>
          <h3 className="font-display font-bold text-2xl text-primary-text">
            MASSIVE SCALE. <span className="font-editorial italic text-accent">Oceanic Sovereignty.</span>
          </h3>
          <div className="aspect-video w-full overflow-hidden border border-border-subtle">
            <img src="/images/hero/hero-vessel.jpg" alt="Vessel at Sea" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="border border-border-strong bg-surface p-6 space-y-4">
          <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block">
            SPREAD 02
          </span>
          <p className="font-editorial italic text-xl text-primary-text leading-snug">
            "International trade is the mastery of contractual timing, chemical verification, and logistical equilibrium."
          </p>
        </div>
      </div>
    </section>
  )
}
