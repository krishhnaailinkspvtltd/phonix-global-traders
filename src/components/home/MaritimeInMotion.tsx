import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

interface MotionFilm {
  id: string
  num: string
  duration: string
  title: string
  subhead: string
  desc: string
  image: string
  category: string
  link: string
  linkText: string
}

const MOTION_FILMS: MotionFilm[] = [
  {
    id: 'film-1',
    num: '01',
    duration: '1:45',
    title: 'Mundra & JNPT Deepwater Terminals',
    subhead: 'Automated Port Gantries & Weekly Vessel Departures',
    desc: 'Round-the-clock container crane operations at Mundra and Nhava Sheva (JNPT) handling high-cube export containers destined for GCC, Europe, and the Americas.',
    image: '/images/hero/hero-port.jpg',
    category: 'EXPORT TERMINALS',
    link: '/gallery',
    linkText: 'INSPECT TERMINALS',
  },
  {
    id: 'film-2',
    num: '02',
    duration: '2:10',
    title: 'Dehydration & Optical Sorting Plants',
    subhead: 'Continuous Hot-Air Drying & Analytical Food Assays',
    desc: 'Continuous hot-air dehydration and color sorting lines in Mahuva and Saurashtra ensuring zero moisture, pristine aroma, and complete microbiological purity for onion flakes, garlic, and mango powders.',
    image: '/images/products/food-processing-plant.jpg',
    category: 'AGRO DEHYDRATION',
    link: '/products',
    linkText: 'VIEW PRODUCTS',
  },
  {
    id: 'film-3',
    num: '03',
    duration: '1:25',
    title: 'Morbi Ceramics & Eco Tableware',
    subhead: 'Factory-Gate Stuffing & Palletized Freight Movement',
    desc: 'Direct dockside rail linkages and containerized stuffing from Morbi tile kilns, Areca palm leaf workshops, and Punjab Basmati rice mills to coastal discharge harbors.',
    image: '/images/products/morbi-tiles.jpg',
    category: 'MANUFACTURING',
    link: '/products?category=manufactured-goods',
    linkText: 'INSPECT MANUFACTURED',
  },
]

export const MaritimeInMotion: React.FC = () => {
  const [activeFilmId, setActiveFilmId] = useState<string>('film-1')

  return (
    <section className="relative py-24 sm:py-32 bg-[#07162D] text-white select-none overflow-hidden border-b border-[#244368]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header (Direct Carysil Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#66A8FF]" />
              <span className="font-tech text-sm uppercase tracking-[0.25em] text-[#66A8FF] font-bold">
                IN MOTION // MARITIME CHOREOGRAPHY
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[0.95]">
              MARITIME IN MOTION
            </h2>
          </div>

          {/* Right Header: Guidance hint */}
          <div className="flex items-center gap-6 font-tech text-sm text-white/80">
            <span className="hidden sm:inline">Select any panel to explore cargo corridor.</span>
          </div>
        </div>

        {/* 3-Panel Interactive Motion Canvas (Carysil-Style Expandable Layout) */}
        <div className="home-motion-films flex flex-col lg:flex-row gap-6 h-[640px] sm:h-[680px]">
          {MOTION_FILMS.map((film) => {
            const isActive = film.id === activeFilmId

            return (
              <motion.div
                key={film.id}
                layout
                onClick={() => setActiveFilmId(film.id)}
                onMouseEnter={() => setActiveFilmId(film.id)}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`home-scene-card relative rounded-3xl overflow-hidden cursor-pointer border transition-colors duration-500 ${
                  isActive
                    ? 'lg:flex-[2.6] border-[#66A8FF]/60 shadow-2xl'
                    : 'lg:flex-[0.7] border-white/10 hover:border-white/30'
                }`}
              >
                {/* Background Photographic Canvas with Cinematic Ken-Burns Pan */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                  <motion.img
                    src={film.image}
                    alt={film.title}
                    animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.12]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* ACTIVE PANEL CONTENT */}
                <AnimatePresence>
                  {isActive ? (
                    <motion.div
                      key="active-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between"
                    >
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between text-sm font-tech text-white/90">
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                          <span className="w-2 h-2 rounded-full bg-[#66A8FF] animate-pulse" />
                          <span className="tracking-wider uppercase font-bold text-xs">{film.category}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="px-4 py-1.5 bg-black/60 rounded-full font-mono text-xs border border-white/20 font-semibold">
                            {film.num}. {film.duration}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Active Information */}
                      <div className="space-y-4 max-w-xl">
                        <span className="font-tech text-sm uppercase tracking-[0.25em] text-[#66A8FF] font-bold block">
                          FILM ARCHIVE // {film.num}
                        </span>

                        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase">
                          {film.title}
                        </h3>

                        <p className="font-editorial italic text-white/90 text-xl sm:text-2xl">
                          {film.subhead}
                        </p>

                        <p className="text-white/80 font-sans text-base sm:text-lg leading-relaxed">
                          {film.desc}
                        </p>

                        <div className="pt-2">
                          <Link
                            to={film.link}
                            onClick={(e) => e.stopPropagation()}
                            className="px-7 py-3.5 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white font-tech text-sm font-bold tracking-wider uppercase transition-all duration-300 inline-flex items-center gap-2.5 border border-white/40 hover:border-white shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95 group"
                          >
                            <span>{film.linkText}</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* INACTIVE PANEL CONTENT: Vertical Title Plaque (Carysil Pattern) */
                    <motion.div
                      key="inactive-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 w-full h-full p-6 flex flex-col justify-between"
                    >
                      <div className="font-mono text-sm text-white/80 font-bold">
                        <span>{film.num}</span>
                      </div>

                      <div className="lg:[writing-mode:vertical-rl] lg:rotate-180 font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-white/90 my-auto">
                        {film.title}
                      </div>

                      <div className="font-mono text-xs text-[#66A8FF] font-semibold">
                        <span>{film.duration}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
