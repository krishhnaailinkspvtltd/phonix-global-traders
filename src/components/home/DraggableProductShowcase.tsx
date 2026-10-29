import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ShowcaseProduct {
  id: string
  title: string
  subhead: string
  image: string
  link: string
}

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'dehydrated-veg',
    title: 'Dehydrated Vegetables',
    subhead: 'White & Red Onion Flakes, Garlic Granules & Powders',
    image: '/images/products/dehydrated-onion.jpg',
    link: '/products?cat=dehydrated-agro',
  },
  {
    id: 'indian-spices',
    title: 'Authentic Spices',
    subhead: 'Alleppey Turmeric, Guntur Chilies & Pure Cumin',
    image: '/images/products/turmeric-curcumin.jpg',
    link: '/products?category=spices-commodities-commodities',
  },
  {
    id: 'basmati-rice',
    title: 'Basmati & Agro Grains',
    subhead: 'Aged 1121 Extra Long Basmati & Hulled Sesame',
    image: '/images/products/basmati-rice.jpg',
    link: '/products?category=spices-commodities-commodities',
  },
  {
    id: 'morbi-ceramics',
    title: 'Architectural Ceramics',
    subhead: 'Morbi Glazed Vitrified Porcelain & Floor Kilns',
    image: '/images/products/morbi-tiles.jpg',
    link: '/products?category=manufactured-goods-goods',
  },
  {
    id: 'areca-tableware',
    title: 'Areca Eco Tableware',
    subhead: '100% Biodegradable Palm Leaf Sustainable Dinnerware',
    image: '/images/products/areca-tableware.jpg',
    link: '/products?category=manufactured-goods-goods',
  },
  {
    id: 'fruit-powders',
    title: 'Tropical Fruit Powders',
    subhead: 'Spray-Dried Alphonsa Mango, Guava & Banana',
    image: '/images/products/spray-mango.jpg',
    link: '/products?cat=dehydrated-agro',
  },
  {
    id: 'global-imports',
    title: 'Global Imports',
    subhead: 'California In-Shell Almonds & African Raw Cashews',
    image: '/images/products/california-almonds.jpg',
    link: '/products?cat=global-imports',
  },
]

export const DraggableProductShowcase: React.FC = () => {
  // Start with item 3 (Architectural Ceramics) in center so 2 items show on left and 2 on right
  const [activeIndex, setActiveIndex] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(280)
  const dragStartX = useRef<number | null>(null)

  // Responsive step calculation for 3D curvature
  useEffect(() => {
    const updateStep = () => {
      const width = window.innerWidth
      if (width < 640) {
        setStep(175)
      } else if (width < 1024) {
        setStep(230)
      } else if (width < 1280) {
        setStep(265)
      } else {
        setStep(295)
      }
    }

    updateStep()
    window.addEventListener('resize', updateStep)
    return () => window.removeEventListener('resize', updateStep)
  }, [])

  const handleNext = () => {
    setActiveIndex((prev) => (prev < SHOWCASE_PRODUCTS.length - 1 ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SHOWCASE_PRODUCTS.length - 1))
  }

  // Pointer drag gestures
  const handlePointerDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX
  }

  const handlePointerUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return
    const diff = e.clientX - dragStartX.current
    if (diff < -45) {
      handleNext()
    } else if (diff > 45) {
      handlePrev()
    }
    dragStartX.current = null
  }

  // Touch swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return
    const diff = e.changedTouches[0].clientX - dragStartX.current
    if (diff < -40) {
      handleNext()
    } else if (diff > 40) {
      handlePrev()
    }
    dragStartX.current = null
  }

  const activeProduct = SHOWCASE_PRODUCTS[activeIndex] || SHOWCASE_PRODUCTS[0]

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF9F5] text-primary-text select-none overflow-hidden border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header: Matching Carysil Reference Exact Proportions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[2px] bg-[#C2410C]" />
              <span className="font-tech text-xs uppercase tracking-[0.25em] text-[#C2410C] font-semibold">
                THE COLLECTION
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] tracking-tight">
              Product Range
            </h2>

            <p className="text-[#666666] font-sans text-sm sm:text-base">
              Dehydrated agro to manufactured goods. Drag or swipe to browse.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-tech tracking-widest text-[#1A1A1A] hover:text-[#C2410C] transition-all duration-300 uppercase font-semibold underline underline-offset-8 hover:-translate-y-0.5"
          >
            <span>SHOP ALL PRODUCTS</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3D Cylindrical Perspective Carousel Stage (Carysil Signature Effect) */}
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: 1300, perspectiveOrigin: '50% 50%' }}
          className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] overflow-visible flex items-center justify-center cursor-grab active:cursor-grabbing will-change-transform"
        >
          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            {SHOWCASE_PRODUCTS.map((prod, idx) => {
              const offset = idx - activeIndex
              const isVisible = Math.abs(offset) <= 3
              if (!isVisible) return null

              // 3D Perspective Calculations
              const xPos = offset * step
              // Left cards face inwards (positive rotateY), right cards face inwards (negative rotateY)
              const rotateY = -offset * 20
              const scale = Math.max(0.78, 1 - Math.abs(offset) * 0.08)
              const zIndex = 30 - Math.abs(offset) * 5
              const isCenter = offset === 0

              return (
                <motion.div
                  key={prod.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: xPos,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: Math.max(0.35, 1 - Math.abs(offset) * 0.16),
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                    mass: 0.8,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                  }}
                  className={`absolute w-[240px] sm:w-[300px] md:w-[340px] h-[340px] sm:h-[420px] md:h-[460px] rounded-[28px] sm:rounded-[34px] overflow-hidden cursor-pointer transition-shadow duration-500 ${
                    isCenter
                      ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.32)] ring-1 ring-black/10'
                      : 'shadow-[0_20px_40px_-12px_rgba(0,0,0,0.18)] hover:opacity-100 ring-1 ring-black/5'
                  }`}
                >
                  {/* Card Photography Canvas */}
                  <div className="w-full h-full relative overflow-hidden bg-[#0A2540]">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className={`w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] transition-transform duration-700 ease-out ${
                        isCenter ? 'scale-105' : 'hover:scale-105'
                      }`}
                    />
                    {/* Carysil-style Deep Vignette Gradient for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Bottom Title Plaque (Direct Carysil Style) */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-1">
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-white leading-snug drop-shadow-md">
                        {prod.title}
                      </h3>
                      {isCenter && (
                        <p className="font-sans text-xs sm:text-sm text-white/80 line-clamp-1 pt-0.5">
                          {prod.subhead}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom Control Ribbon: Matching Carysil Reference Exact Layout */}
        <div className="mt-8 sm:mt-12 flex items-center justify-between font-tech text-sm">
          
          {/* Active Product Name Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="text-[#888888] text-xs font-mono">
              0{activeIndex + 1} /
            </span>
            <span className="font-display font-medium text-sm sm:text-base text-[#1A1A1A] tracking-normal">
              {activeProduct.title}
            </span>
          </div>

          {/* Minimalist Circular Arrow Buttons with Blur Transparency & Motion */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Product"
              className="w-10 h-10 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md border border-black/20 hover:border-black flex items-center justify-center transition-all duration-300 cursor-pointer text-[#1A1A1A] hover:scale-110 active:scale-90 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Product"
              className="w-10 h-10 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md border border-black/20 hover:border-black flex items-center justify-center transition-all duration-300 cursor-pointer text-[#1A1A1A] hover:scale-110 active:scale-90 shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
