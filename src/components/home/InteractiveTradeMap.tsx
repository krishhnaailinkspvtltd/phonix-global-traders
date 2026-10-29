import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import worldMapPaths from '@/data/worldMapPaths.json'
import { RealInteractiveMap, SERVED_COUNTRIES, ServedCountryPoint } from './RealInteractiveMap'
import { GlobalTradeClock } from './GlobalTradeClock'
import { 
  Globe, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Anchor, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react'

// Mathematically projected coordinates for served countries on 1000x500 Equirectangular SVG:
// x = (lon + 180.0) * (1000.0 / 360.0)
// y = (90.0 - lat) * (500.0 / 180.0)
const SVG_COUNTRY_POINTS = [
  { id: 'india', name: 'India', hub: 'Mundra & JNPT', x: 702.8, y: 191.7, isOrigin: true },
  { id: 'uae', name: 'UAE', hub: 'Dubai (Jebel Ali)', x: 652.9, y: 180.5 },
  { id: 'saudi', name: 'Saudi Arabia', hub: 'Dammam', x: 639.2, y: 176.6 },
  { id: 'netherlands', name: 'Netherlands', hub: 'Rotterdam', x: 511.5, y: 105.7 },
  { id: 'uk', name: 'United Kingdom', hub: 'Southampton', x: 496.1, y: 108.6 },
  { id: 'germany', name: 'Germany', hub: 'Hamburg', x: 527.7, y: 101.3 },
  { id: 'usa', name: 'United States', hub: 'New York & LA', x: 294.3, y: 137.0 },
  { id: 'canada', name: 'Canada', hub: 'Vancouver', x: 158.0, y: 113.1 },
  { id: 'singapore', name: 'Singapore', hub: 'Port of Singapore', x: 788.5, y: 246.4 },
  { id: 'japan', name: 'Japan', hub: 'Yokohama / Tokyo', x: 887.9, y: 151.5 },
  { id: 'australia', name: 'Australia', hub: 'Sydney', x: 920.0, y: 344.1 },
  { id: 'vietnam', name: 'Vietnam', hub: 'Ho Chi Minh', x: 796.3, y: 220.1 },
  { id: 'egypt', name: 'Egypt', hub: 'Port Said', x: 589.7, y: 177.1 },
]

export const InteractiveTradeMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<ServedCountryPoint | null>(null)
  const [viewEngine, setViewEngine] = useState<'interactive' | 'vector'>('interactive')
  const [activeRegion, setActiveRegion] = useState<string>('all')

  const regions = [
    { id: 'all', label: 'All Served Countries (13)' },
    { id: 'gcc', label: 'Middle East & GCC' },
    { id: 'europe', label: 'Europe & UK' },
    { id: 'americas', label: 'Americas' },
    { id: 'apac', label: 'Asia-Pacific' },
  ]

  return (
    <section className="relative py-24 bg-surface text-primary-text select-none overflow-hidden border-b arch-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b arch-line pb-8">
          <div>
            <div className="flex items-center gap-3 text-sm font-tech text-accent uppercase tracking-widest mb-3 font-semibold">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>GLOBAL FOOTPRINT · SECTION 05</span>
            </div>
            <h2 className="display-heading font-display font-extrabold text-primary-text">
              SERVED COUNTRIES &amp; GLOBAL CLOCK.{' '}
              <span className="font-editorial italic font-normal text-accent block sm:inline">
                Sovereign Destinations.
              </span>
            </h2>
          </div>
          <p className="text-secondary-text max-w-lg font-sans text-base sm:text-lg leading-relaxed">
            Direct physical export pathways and commercial trading desks operating across 13 core international sovereign destinations with live synchronized financial market timezones.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="text-sm font-tech text-secondary-text uppercase font-semibold mr-2 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-accent" />
            <span>Region Filter:</span>
          </span>
          {regions.map((reg) => {
            const isSelected = activeRegion === reg.id
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => setActiveRegion(reg.id)}
                className={`px-5 py-2.5 rounded-full border text-sm font-tech transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 ${
                  isSelected
                    ? 'bg-[#1557B0] text-white border-white/40 shadow-lg font-bold backdrop-blur-md ring-2 ring-[#1557B0]/20'
                    : 'bg-white/60 hover:bg-white/90 text-slate-700 border-slate-200/90 hover:text-slate-900 hover:border-[#1557B0]/40 backdrop-blur-md shadow-xs'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#1557B0]/50'}`} />
                <span>{reg.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main Grid: Left Map (7 Columns) + Right Luxury Clock (5 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Real Map with Served Country Points & Labels (7 Columns) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white/80 backdrop-blur-xl text-slate-800 p-5 sm:p-7 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[520px] md:min-h-[600px]">
            
            {/* Top Bar with Map Engine Selector */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 font-mono text-sm border-b border-slate-200/80 pb-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1557B0]/10 border border-[#1557B0]/25 text-[#1557B0] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  CURRENT ACTIVE SERVICE
                </span>
                <span className="text-slate-900 font-extrabold text-xs sm:text-sm tracking-wide hidden sm:inline">
                  13 International Sovereign Gateways
                </span>
              </div>

              {/* Engine Toggle */}
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-full bg-slate-100 p-0.5 border border-slate-200 text-xs font-tech font-bold">
                  <button
                    type="button"
                    onClick={() => setViewEngine('interactive')}
                    className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      viewEngine === 'interactive'
                        ? 'bg-[#1557B0] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#1557B0]'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Real Interactive Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewEngine('vector')}
                    className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      viewEngine === 'vector'
                        ? 'bg-[#1557B0] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#1557B0]'
                    }`}
                  >
                    <Compass className="w-3 h-3" />
                    <span>Vector Nautical</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="relative z-10 my-auto py-2">
              {viewEngine === 'interactive' ? (
                /* 1. Leaflet Powered Real Interactive Map (Ocean & Satellite with Country Points) */
                <RealInteractiveMap
                  onCountrySelect={(c) => setSelectedCountry(c)}
                />
              ) : (
                /* 2. Light Theme Handcrafted Nautical Vector Chart with Country Points & Names */
                <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-[#EAF4FD]">
                  <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-auto select-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern id="nautical-grid-clean" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(21, 87, 176, 0.08)" strokeWidth="0.5" />
                      </pattern>

                      <radialGradient id="ocean-gradient-clean" cx="50%" cy="50%" r="65%">
                        <stop offset="0%" stopColor="#EBF5FF" />
                        <stop offset="60%" stopColor="#DBEDFD" />
                        <stop offset="100%" stopColor="#CBE4FB" />
                      </radialGradient>
                    </defs>

                    {/* Ocean Canvas */}
                    <rect width="1000" height="500" fill="url(#ocean-gradient-clean)" />
                    <rect width="1000" height="500" fill="url(#nautical-grid-clean)" />

                    {/* Compass Rose */}
                    <g transform="translate(390, 360)" opacity="0.18">
                      <circle cx="0" cy="0" r="45" fill="none" stroke="#1557B0" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="0" cy="0" r="30" fill="none" stroke="#1557B0" strokeWidth="0.75" />
                      <line x1="0" y1="-50" x2="0" y2="50" stroke="#1557B0" strokeWidth="1" />
                      <line x1="-50" y1="0" x2="50" y2="0" stroke="#1557B0" strokeWidth="1" />
                      <polygon points="0,-48 6,-15 0,-25" fill="#1557B0" />
                      <polygon points="0,-48 -6,-15 0,-25" fill="#2876D0" />
                      <text x="0" y="-54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1557B0" fontFamily="sans-serif">N</text>
                    </g>

                    {/* Graticules */}
                    <g stroke="rgba(21, 87, 176, 0.16)" strokeWidth="0.6" strokeDasharray="3 3">
                      <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(21, 87, 176, 0.3)" strokeWidth="0.8" />
                      <line x1="0" y1="184.7" x2="1000" y2="184.7" />
                      <line x1="0" y1="315.3" x2="1000" y2="315.3" />
                      <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(21, 87, 176, 0.25)" />
                    </g>

                    <text x="12" y="246" fill="rgba(15, 23, 42, 0.45)" fontSize="9" fontFamily="monospace" fontWeight="bold">0° EQUATOR</text>
                    <text x="12" y="181" fill="rgba(15, 23, 42, 0.35)" fontSize="8" fontFamily="monospace">23.5°N TROPIC OF CANCER</text>
                    <text x="504" y="20" fill="rgba(15, 23, 42, 0.45)" fontSize="8" fontFamily="monospace" fontWeight="bold">0° PRIME MERIDIAN</text>

                    {/* World Landmasses in Natural Earth Sage/Stone */}
                    <g id="world-landmasses-vector" fill="#E7EDE3" stroke="#94A3B8" strokeWidth="0.6">
                      {worldMapPaths.map((pathD, idx) => (
                        <path key={idx} d={pathD} className="transition-colors duration-200 hover:fill-[#DDE8D7]" />
                      ))}
                    </g>

                    {/* Served Country Points with Visible Country Names on Map */}
                    {SVG_COUNTRY_POINTS.map((pt) => {
                      const isOrigin = !!pt.isOrigin
                      return (
                        <g key={pt.id} className="cursor-pointer group">
                          {/* Pulsing Sonar Ring */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isOrigin ? 13 : 9}
                            fill="none"
                            stroke={isOrigin ? '#1557B0' : '#10B981'}
                            strokeWidth="1.2"
                            opacity="0.6"
                            className="animate-ping"
                          />

                          {/* Pin Center */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isOrigin ? 6 : 4.5}
                            fill={isOrigin ? '#1557B0' : '#059669'}
                            stroke="#FFFFFF"
                            strokeWidth={isOrigin ? 2.5 : 1.5}
                          />

                          {/* Country Name Badge on Map */}
                          <g>
                            <rect
                              x={pt.x > 760 ? pt.x - 85 : pt.x + 8}
                              y={pt.y > 360 ? pt.y - 22 : pt.y - 9}
                              width={pt.name.length * 7.5 + 16}
                              height="18"
                              rx="9"
                              fill={isOrigin ? '#1557B0' : 'rgba(255, 255, 255, 0.95)'}
                              stroke={isOrigin ? '#FFFFFF' : '#CBD5E1'}
                              strokeWidth="1"
                            />
                            <text
                              x={pt.x > 760 ? pt.x - 85 + (pt.name.length * 7.5 + 16) / 2 : pt.x + 8 + (pt.name.length * 7.5 + 16) / 2}
                              y={pt.y > 360 ? pt.y - 10 : pt.y + 3}
                              fill={isOrigin ? '#FFFFFF' : '#0F172A'}
                              fontSize="9"
                              fontWeight="800"
                              textAnchor="middle"
                              fontFamily="Space Grotesk, sans-serif"
                            >
                              {pt.name}
                            </text>
                          </g>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm text-slate-700 border-t border-slate-200/90 pt-4 bg-white/40 backdrop-blur-xs rounded-b-2xl px-2">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>EXPORT VERIFICATION: <strong className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">100% CERTIFIED ORIGIN</strong></span>
              </div>
              <div className="flex items-center gap-4 text-xs font-tech">
                <span className="text-slate-500">WEEKLY CHARTERS:</span>
                <strong className="text-[#1557B0] font-bold">Mundra · JNPT · Chennai</strong>
              </div>
            </div>

          </div>

          {/* Right Column: Global Trading Clock with Glassmorphism (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <GlobalTradeClock />
          </div>

        </div>

      </div>
    </section>
  )
}
