import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Globe, ArrowRight, ShieldCheck, Radio, CheckCircle2 } from 'lucide-react'

interface TradeDesk {
  id: string
  city: string
  country: string
  timeZone: string
  utcOffset: string
  tag: string
  openHour: number // 9 AM
  closeHour: number // 18 PM (6 PM)
}

const GLOBAL_DESKS: TradeDesk[] = [
  {
    id: 'mumbai',
    city: 'Mumbai [HQ]',
    country: 'India',
    timeZone: 'Asia/Kolkata',
    utcOffset: 'UTC +5:30',
    tag: 'Corporate HQ & Sourcing Terminals',
    openHour: 9,
    closeHour: 19,
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    timeZone: 'Asia/Dubai',
    utcOffset: 'UTC +4:00',
    tag: 'GCC & Middle East Commercial Hub',
    openHour: 9,
    closeHour: 18,
  },
  {
    id: 'rotterdam',
    city: 'Rotterdam',
    country: 'Netherlands / EU',
    timeZone: 'Europe/Amsterdam',
    utcOffset: 'UTC +1:00',
    tag: 'Continental European Distribution',
    openHour: 8,
    closeHour: 18,
  },
  {
    id: 'newyork',
    city: 'New York',
    country: 'United States',
    timeZone: 'America/New_York',
    utcOffset: 'UTC -5:00',
    tag: 'North American Commercial Gateway',
    openHour: 9,
    closeHour: 18,
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    timeZone: 'Asia/Singapore',
    utcOffset: 'UTC +8:00',
    tag: 'Asia-Pacific Transshipment Desk',
    openHour: 9,
    closeHour: 18,
  },
]

export const GlobalTradeClock: React.FC = () => {
  const [activeDesk, setActiveDesk] = useState<TradeDesk>(GLOBAL_DESKS[0])
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  // Ticking real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate local time components for a given timezone
  const getTimeComponents = (timeZone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      })
      const parts = formatter.formatToParts(currentTime)
      let hour24 = 0
      let minute = 0
      let second = 0
      parts.forEach((p) => {
        if (p.type === 'hour') hour24 = parseInt(p.value, 10)
        if (p.type === 'minute') minute = parseInt(p.value, 10)
        if (p.type === 'second') second = parseInt(p.value, 10)
      })

      const hour12 = hour24 % 12 || 12
      const ampm = hour24 >= 12 ? 'PM' : 'AM'
      const formattedTime = `${hour12.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}:${second.toString().padStart(2, '0')} ${ampm}`

      return { hour24, hour12, minute, second, ampm, formattedTime }
    } catch {
      return {
        hour24: currentTime.getHours(),
        hour12: currentTime.getHours() % 12 || 12,
        minute: currentTime.getMinutes(),
        second: currentTime.getSeconds(),
        ampm: currentTime.getHours() >= 12 ? 'PM' : 'AM',
        formattedTime: currentTime.toLocaleTimeString(),
      }
    }
  }

  const activeTime = getTimeComponents(activeDesk.timeZone)

  // Clock Hand Angles
  const secondDeg = activeTime.second * 6
  const minuteDeg = activeTime.minute * 6 + activeTime.second * 0.1
  const hourDeg = (activeTime.hour12 % 12) * 30 + activeTime.minute * 0.5

  // Desk Operational Status
  const isDeskOpen =
    activeTime.hour24 >= activeDesk.openHour && activeTime.hour24 < activeDesk.closeHour

  // Format Date for active timezone
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: activeDesk.timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(currentTime)

  return (
    <div className="rounded-3xl bg-white/40 border border-white/70 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden text-slate-800">
      
      {/* Specular Ambient Glow */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#1557B0]/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-slate-200/80 pb-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-tech text-xs font-bold text-[#1557B0] uppercase tracking-widest">
              GLOBAL TRADING CLOCK
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-xs">
            LIVE SYNCHRONIZED
          </span>
        </div>
        <h3 className="font-display font-extrabold text-2xl text-slate-900 leading-tight">
          Commercial Timezones
        </h3>
        <p className="font-editorial italic text-sm text-slate-600 mt-0.5">
          Live operating hours across our international trading &amp; chartering chambers.
        </p>
      </div>

      {/* Swiss Minimalist Analog & Digital Watchmaker Dial */}
      <div className="relative z-10 flex flex-col items-center justify-center py-3">
        {/* Analog Clock Dial */}
        <div className="relative w-44 h-44 rounded-full bg-white/70 border border-white/90 shadow-xl backdrop-blur-md flex items-center justify-center">
          
          {/* Subtle Dial Texture & Concentric Ring */}
          <div className="absolute inset-2 rounded-full border border-slate-200/60" />
          <div className="absolute inset-6 rounded-full border border-dashed border-slate-200/40" />

          {/* 12 Hour Ticks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const isCardinal = deg % 90 === 0
            return (
              <div
                key={i}
                className="absolute inset-0 flex justify-center pointer-events-none"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div
                  className={`w-0.5 rounded-full ${
                    isCardinal ? 'h-3 bg-slate-800' : 'h-1.5 bg-slate-400'
                  }`}
                />
              </div>
            )
          })}

          {/* Hour Numbers on Cardinal Points */}
          <span className="absolute top-3 font-mono text-[10px] font-bold text-slate-700">12</span>
          <span className="absolute right-3.5 font-mono text-[10px] font-bold text-slate-700">3</span>
          <span className="absolute bottom-3 font-mono text-[10px] font-bold text-slate-700">6</span>
          <span className="absolute left-3.5 font-mono text-[10px] font-bold text-slate-700">9</span>

          {/* Hour Hand */}
          <div
            className="absolute w-1.5 h-12 bg-slate-900 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 shadow-sm transition-transform duration-100 ease-linear"
            style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
          />

          {/* Minute Hand */}
          <div
            className="absolute w-1 h-16 bg-slate-700 rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 shadow-sm transition-transform duration-100 ease-linear"
            style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
          />

          {/* Sweeping Second Hand (Maritime Blue) */}
          <div
            className="absolute w-0.5 h-18 bg-[#1557B0] rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 transition-transform duration-75 ease-linear"
            style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}
          >
            {/* Second Hand Counterweight */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#1557B0] rounded-full" />
          </div>

          {/* Center Pivot Jewel Pin */}
          <div className="absolute w-3.5 h-3.5 rounded-full bg-[#1557B0] border-2 border-white shadow-md z-20" />
        </div>

        {/* Digital Readout for Active Timezone */}
        <div className="mt-4 text-center">
          <div className="font-mono text-2xl font-extrabold text-slate-900 tracking-wider">
            {activeTime.formattedTime}
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-tech text-xs font-bold text-[#1557B0]">
              {activeDesk.city} ({activeDesk.utcOffset})
            </span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-[11px] text-slate-500">
              {formattedDate}
            </span>
          </div>

          {/* Operational Status Pill */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-tech font-bold shadow-xs border backdrop-blur-md">
            {isDeskOpen ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                COMMERCIAL DESK ACTIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                AFTER-HOURS · AUTOMATED QUEUE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* World City List: Interactive Selection Pills */}
      <div className="relative z-10 space-y-2 my-4 pt-2 border-t border-slate-200/80">
        <span className="font-tech text-[11px] text-slate-500 uppercase tracking-widest font-semibold block mb-1">
          Select Trading Desk:
        </span>
        {GLOBAL_DESKS.map((desk) => {
          const isSelected = activeDesk.id === desk.id
          const deskTime = getTimeComponents(desk.timeZone)
          return (
            <button
              key={desk.id}
              type="button"
              onClick={() => setActiveDesk(desk)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] ${
                isSelected
                  ? 'bg-white/90 border-[#1557B0]/50 shadow-md ring-2 ring-[#1557B0]/15'
                  : 'bg-white/35 hover:bg-white/60 border-white/60 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-[#1557B0]' : 'bg-slate-400'
                  }`}
                />
                <div>
                  <span className="font-tech text-xs font-bold text-slate-900 block leading-tight">
                    {desk.city}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {desk.country}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-slate-900 block">
                  {deskTime.formattedTime.replace(/:\d\d\s/, ' ')}
                </span>
                <span className="font-mono text-[9px] text-[#1557B0] font-semibold">
                  {desk.utcOffset}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Action Button: Glass Requisition Button */}
      <div className="relative z-10 pt-2">
        <Link
          to="/contact"
          className="w-full py-3.5 px-5 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-tech text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-[#1557B0]/30 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <span>Connect With Regional Chamber</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  )
}
