import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TRADE_CORRIDORS, GLOBAL_DESKS } from '@/data/tradeData'
import { ArrowUpRight } from 'lucide-react'

export const GlobalTradePage: React.FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState(TRADE_CORRIDORS[0])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Global Trade Corridors & Maritime Routing | PHONIX GLOBAL TRADE'
  }, [])

  return (
    <div className="site-inner-page pt-28 sm:pt-32 pb-20 text-primary-text select-none overflow-x-hidden">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center gap-3 text-xs font-tech text-accent uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>MARITIME LOGISTICS &amp; TRANSIT ARTERIES</span>
        </div>

        <h1 className="display-heading font-display font-extrabold text-primary-text leading-[0.92]">
          INDIAN GATEWAYS &amp;{' '}
          <span className="font-editorial italic font-normal text-accent block mt-1">
            Global Trade Corridors.
          </span>
        </h1>

        <p className="editorial-body text-secondary-text max-w-3xl font-sans mt-6 leading-relaxed text-base sm:text-lg">
          Orchestrating weekly container liner sailings from Mundra, JNPT (Mumbai), Hazira, and Chennai directly to premier discharge terminals across the GCC, Europe, North America, and Southeast Asia.
        </p>
      </section>

      {/* Hero Photographic Panorama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative border border-border-strong overflow-hidden aspect-[21/9] bg-surface shadow-2xl">
          <img
            src="/images/gallery/gallery-1.jpg"
            alt="International Ocean Trade Lane Gantry Infrastructure"
            className="w-full h-full object-cover filter contrast-[1.12] brightness-[0.85] dark:brightness-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 text-white">
            <div className="font-mono text-xs max-w-xl">
              <span className="text-[#66A8FF] font-bold block uppercase tracking-widest mb-1">
                MARITIME SOVEREIGNTY
              </span>
              <span className="font-tech text-base font-bold">
                CHARTERING HANDYMAX, PANAMAX &amp; CAPESIZE CARRIERS WITH CONTINUOUS GPS TELEMETRY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Trade Corridors Deep-Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b arch-line pb-8 mb-10">
          <div>
            <span className="font-tech text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">
              ACTIVE SHIPPING HIGHWAYS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-text">
              Sovereign Trade Corridors
            </h2>
          </div>
          <p className="text-secondary-text text-sm max-w-md font-sans">
            Select an operational corridor to inspect origin-destination transit schedules, container volumes, and transshipment hubs.
          </p>
        </div>

        {/* Corridor Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-tech text-xs">
          {TRADE_CORRIDORS.map((corridor) => (
            <button
              key={corridor.id}
              type="button"
              onClick={() => setSelectedCorridor(corridor)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedCorridor.id === corridor.id
                  ? 'bg-white/80 border-[#1557B0] shadow-xl text-primary-text ring-2 ring-[#1557B0]/20 backdrop-blur-md'
                  : 'bg-white/40 hover:bg-white/70 border-white/60 text-secondary-text hover:text-primary-text backdrop-blur-md shadow-xs'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-accent font-bold">{corridor.transitDays} Days</span>
                <span className="text-[10px] text-emerald-500 font-semibold tracking-wider uppercase">ACTIVE</span>
              </div>
              <h3 className="font-display font-bold text-base text-primary-text mb-1">
                {corridor.name}
              </h3>
              <span className="text-secondary-text text-[11px] block">{corridor.volumeAnnual}</span>
            </button>
          ))}
        </div>

        {/* Corridor Dossier Box with Glassmorphism */}
        <div className="rounded-3xl border border-white/80 bg-white/60 backdrop-blur-xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block mb-2">
                  CORRIDOR ARCHITECTURE
                </span>
                <h3 className="text-3xl font-display font-extrabold text-primary-text">
                  {selectedCorridor.name}
                </h3>
                <p className="font-editorial italic text-base text-secondary-text mt-1">
                  Origin: {selectedCorridor.origin} → Destination: {selectedCorridor.destination}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y arch-line font-tech text-xs">
                <div>
                  <span className="text-secondary-text block text-[10px] uppercase">TRANSIT TIME</span>
                  <span className="text-primary-text font-bold text-sm">{selectedCorridor.transitDays} Days</span>
                </div>
                <div>
                  <span className="text-secondary-text block text-[10px] uppercase">HUBS</span>
                  <span className="text-primary-text font-bold text-sm">{selectedCorridor.keyHubs.length} Hubs</span>
                </div>
                <div>
                  <span className="text-secondary-text block text-[10px] uppercase">ANNUAL VOLUME</span>
                  <span className="text-accent font-bold text-sm">{selectedCorridor.volumeAnnual}</span>
                </div>
                <div>
                  <span className="text-secondary-text block text-[10px] uppercase">TELEMETRY</span>
                  <span className="text-primary-text font-bold text-sm">24/7 Monitored</span>
                </div>
              </div>

              <p className="text-secondary-text text-sm font-sans leading-relaxed">
                Primary cargo flows along this corridor include: <span className="text-primary-text font-semibold">{selectedCorridor.primaryCargo}</span>. All cargo consignments include complete customs manifest pre-clearance and Institute Cargo Clauses (A) insurance.
              </p>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/70 bg-white/50 backdrop-blur-md p-6 space-y-4 shadow-sm">
              <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block">
                CARGO SLOTS ALLOCATION
              </span>
              <p className="text-secondary-text text-xs font-sans leading-relaxed">
                Commercial off-take bookings along the {selectedCorridor.name} require 14-day advance nomination.
              </p>
              <Link
                to="/contact"
                className="w-full py-3.5 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#1557B0]/30 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Reserve Cargo Slot</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Commercial Desk Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="border-t arch-line pt-12 mb-10">
          <span className="font-tech text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">
            COMMERCIAL DESKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-text">
            International Trading Desks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GLOBAL_DESKS.map((desk) => (
            <div
              key={desk.city}
              className="border border-border-strong bg-surface p-6 space-y-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-accent tracking-widest block mb-1">
                    {desk.region}
                  </span>
                  <h3 className="font-display font-bold text-xl text-primary-text">
                    {desk.city}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-secondary-text px-2 py-0.5 border arch-line">
                  {desk.timezone}
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans text-secondary-text border-t arch-line pt-4">
                <p>{desk.address}</p>
                <p className="font-mono text-primary-text font-semibold">{desk.phone}</p>
                <p className="font-mono text-accent">{desk.email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
