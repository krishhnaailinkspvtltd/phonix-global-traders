import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GALLERY_ITEMS } from '@/data/tradeData'
import { Camera, X, ArrowLeft, ArrowRight, MapPin, Maximize2, Compass } from 'lucide-react'
import { useCursor } from '@/context/CursorContext'

export const GalleryPage: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const { setCursor, resetCursor } = useCursor()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Visual Archives & Maritime Documentation | PHONIX GLOBAL TRADE'
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex, activeFilter])

  const categories = ['All', 'Terminals', 'Infrastructure', 'Freight', 'Maritime']

  const filteredItems =
    activeFilter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter)

  const handleNext = () => {
    if (selectedPhotoIndex === null) return
    const currentIndex = filteredItems.findIndex(item => item.id === GALLERY_ITEMS[selectedPhotoIndex].id)
    const next = filteredItems[(currentIndex + 1) % filteredItems.length]
    if (next) setSelectedPhotoIndex(GALLERY_ITEMS.findIndex(item => item.id === next.id))
  }

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return
    const currentIndex = filteredItems.findIndex(item => item.id === GALLERY_ITEMS[selectedPhotoIndex].id)
    const previous = filteredItems[(currentIndex - 1 + filteredItems.length) % filteredItems.length]
    if (previous) setSelectedPhotoIndex(GALLERY_ITEMS.findIndex(item => item.id === previous.id))
  }

  const currentPhoto = selectedPhotoIndex !== null ? GALLERY_ITEMS[selectedPhotoIndex] : null

  return (
    <div className="site-inner-page pt-28 pb-24 text-primary-text select-none overflow-x-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="border-b border-border-strong pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.25em] text-accent font-semibold uppercase">
                  SECTION 05 // ARCHIVAL FIELD REPOSITORY
                </span>
                <span className="h-px w-10 bg-accent/40" />
                <span className="font-mono text-[11px] text-secondary-text">
                  6 CURATED PLATES
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight leading-[0.95]">
                THE ARCHIVE OF{' '}
                <span className="font-serif italic font-normal text-accent block sm:inline">
                  Maritime Precision.
                </span>
              </h1>
            </div>

            <p className="text-secondary-text max-w-md font-sans text-xs sm:text-sm leading-relaxed border-l border-border-subtle pl-4">
              A documentary monograph capturing deepwater container terminals, intermodal freight junctions, high-seas maritime transit, and sovereign trade advisory chambers across four continents.
            </p>
          </div>

          {/* Architectural Filter Ribbon */}
          <div className="mt-10 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? GALLERY_ITEMS.length
                    : GALLERY_ITEMS.filter((i) => i.category === cat).length

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setActiveFilter(cat); setSelectedPhotoIndex(null) }}
                    className={`px-4 py-2 border transition-all duration-200 cursor-pointer text-xs font-mono tracking-wider uppercase flex items-center gap-2 ${
                      activeFilter === cat
                        ? 'bg-primary-text text-canvas border-primary-text shadow-sm'
                        : 'bg-surface text-secondary-text border-border-subtle hover:border-border-strong hover:text-primary-text'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="opacity-60 text-[10px]">[{count.toString().padStart(2, '0')}]</span>
                  </button>
                )
              })}
            </div>

            <div className="font-mono text-[11px] text-secondary-text hidden sm:flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>CANONICAL 35MM / LARGE FORMAT MONOGRAPHS</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Exhibition Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {filteredItems.map((item, index) => {
            const originalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id)
            const figNum = (originalIndex + 1).toString().padStart(2, '0')
            
            // Asymmetric grid column spans based on layout index
            const colSpan =
              index === 0
                ? 'md:col-span-8'
                : index === 1
                ? 'md:col-span-4'
                : index === 2
                ? 'md:col-span-4'
                : index === 3
                ? 'md:col-span-8'
                : index === 4
                ? 'md:col-span-6'
                : 'md:col-span-6'

            const aspectClass =
              index === 0
                ? 'aspect-[16/10]'
                : index === 1
                ? 'aspect-[4/5]'
                : index === 2
                ? 'aspect-square'
                : index === 3
                ? 'aspect-[16/9]'
                : 'aspect-[4/3]'

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedPhotoIndex(originalIndex)}
                role="button"
                tabIndex={0}
                aria-label={'View ' + item.title + ' in fullscreen'}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedPhotoIndex(originalIndex)
                  }
                }
                onMouseEnter={() => setCursor('EXPAND', 'action')}
                onMouseLeave={resetCursor}
                className={`${colSpan} group relative rounded-2xl border border-border-strong bg-surface p-3.5 cursor-pointer transition-all duration-300 hover:border-accent shadow-sm hover:shadow-xl`}
              >
                {/* Plate Header Monograph */}
                <div className="flex items-center justify-between font-mono text-[11px] border-b border-border-subtle pb-2.5 mb-3 text-secondary-text">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">PLATE {figNum}</span>
                    <span>/</span>
                    <span className="uppercase tracking-widest">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 group-hover:text-accent transition-opacity">
                    <Maximize2 className="w-3 h-3" />
                    <span>ZOOM [PLATE]</span>
                  </div>
                </div>

                {/* Photograph Canvas */}
                <div className={`${aspectClass} rounded-xl overflow-hidden bg-black/90 relative`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Corner Coordinates Stamp */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase">
                    {item.coordinates}
                  </div>
                </div>

                {/* Plate Footer Monograph */}
                <div className="pt-3.5 space-y-1">
                  <h3 className="font-sans font-bold text-base sm:text-lg text-primary-text leading-snug group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-mono text-secondary-text pt-1 border-t border-border-subtle/50">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-accent" />
                      <span>{item.location}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60">ID: {item.id}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Archival Monograph Disclaimer */}
        <div className="mt-20 border-t border-border-strong pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-secondary-text">
          <div className="space-y-1">
            <span className="text-primary-text font-bold uppercase tracking-wider block">CURATORIAL PROVENANCE</span>
            <p className="font-sans text-[11px] leading-relaxed">
              Photographs captured on site across verified deepwater berths, intermodal railheads, and chartered merchant tonnage under Phonix operational oversight.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-primary-text font-bold uppercase tracking-wider block">METRIC &amp; LOCATION AUDIT</span>
            <p className="font-sans text-[11px] leading-relaxed">
              Geographic coordinates and maritime charts referenced against standard WGS84 coordinates and IMO registration ledgers.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-primary-text font-bold uppercase tracking-wider block">COMMERCIAL INQUIRIES</span>
            <p className="font-sans text-[11px] leading-relaxed">
              For high-resolution photographic license requests or terminal inspection visits, contact the Rotterdam or Singapore communications desks.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Architectural Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog" aria-modal="true" aria-label="Image viewer" className="gallery-lightbox fixed inset-0 z-99999 flex flex-col justify-between bg-black/98 text-white p-4 sm:p-8 backdrop-blur-2xl select-none"
          >
            {/* Modal Top Control Bar */}
            <div className="flex items-center justify-between font-mono text-xs text-white/70 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-accent inline-block" />
                <span className="tracking-widest uppercase">
                  MONOGRAPH DOSSIER — PLATE {(filteredItems.findIndex(item => item.id === currentPhoto.id) + 1).toString().padStart(2, '0')} / {filteredItems.length.toString().padStart(2, '0')}
                </span>
                <span className="text-white/40 hidden sm:inline">|</span>
                <span className="text-accent hidden sm:inline font-bold uppercase tracking-wider">
                  {currentPhoto.category}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close Lightbox"
                className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer font-mono text-xs uppercase tracking-widest"
              >
                <span>CLOSE [ESC]</span>
                <X className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>

            {/* Modal Center Viewport */}
            <div className="gallery-lightbox-viewport relative my-auto flex items-center justify-center w-full max-w-6xl mx-auto h-[70vh]">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-2 sm:-left-12 z-20 px-3 py-4 bg-black/80 border border-white/20 hover:border-accent text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md font-mono text-xs uppercase group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Main Photo Container */}
              <div className="gallery-image-frame max-h-full max-w-full relative flex items-center justify-center border border-white/15 p-2 bg-white/5">
                <motion.img
                  key={currentPhoto.id}
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[64vh] max-w-full object-contain filter brightness-[0.96] contrast-[1.05]"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-2 sm:-right-12 z-20 px-3 py-4 bg-black/80 border border-white/20 hover:border-accent text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md font-mono text-xs uppercase group"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Modal Bottom Metadata Bar */}
            <div className="max-w-4xl mx-auto w-full text-center border-t border-white/10 pt-4 font-mono text-xs space-y-1.5">
              <h2 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight">
                {currentPhoto.title}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/60 text-[11px] tracking-wider uppercase">
                <span className="flex items-center gap-1.5 text-white/80">
                  <MapPin className="w-3 h-3 text-accent" />
                  {currentPhoto.location}
                </span>
                <span>•</span>
                <span>COORDINATES: {currentPhoto.coordinates}</span>
                <span>•</span>
                <span>ARCHIVAL ID: {currentPhoto.id}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
