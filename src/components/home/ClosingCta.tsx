import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShieldCheck, Clock, Mail } from 'lucide-react'

export const ClosingCta: React.FC = () => {
  return (
    <section className="relative py-28 bg-surface text-primary-text select-none overflow-hidden border-b arch-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-white/70 bg-white/60 backdrop-blur-xl p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden">
          
          {/* Subtle oceanic radial backdrop */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(40,118,208,0.12),transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="flex items-center gap-3 text-sm font-tech text-accent uppercase tracking-widest font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>COMMERCIAL INITIATION · SECTION 06</span>
            </div>

            <h2 className="display-heading font-display font-extrabold text-primary-text">
              FROM HERE.{' '}
              <span className="font-editorial italic font-normal text-accent block mt-1">
                To Everywhere.
              </span>
            </h2>

            <p className="editorial-body text-secondary-text font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
              Connect directly with our export desks in Mumbai and Mundra, or our international clearing desks in Dubai, Rotterdam, and New York to structure bilateral supply agreements, review dehydrated produce samples, or lock in dedicated container freight slots.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-sans text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer shadow-lg hover:shadow-[#1557B0]/30 hover:scale-105 active:scale-95 group"
              >
                <span>Initiate Export Inquiry</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-md border border-white/70 text-slate-800 hover:text-[#1557B0] font-sans text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 group"
              >
                <span>Inspect Export Catalog</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* Direct Commercial Desk Telemetry with Medium Typography */}
            <div className="pt-8 border-t arch-line grid grid-cols-1 sm:grid-cols-3 gap-6 font-tech text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-secondary-text uppercase block text-xs tracking-wider font-semibold">RESPONSE VELOCITY</span>
                  <span className="text-primary-text font-bold text-base">Within 18 Hours</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-secondary-text uppercase block text-xs tracking-wider font-semibold">LEGAL PROTOCOL</span>
                  <span className="text-primary-text font-bold text-base">Bilateral Corporate NDA</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-secondary-text uppercase block text-xs tracking-wider font-semibold">COMMERCIAL DESK</span>
                  <span className="text-accent font-bold text-base">trade@phonix-demo.com</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
