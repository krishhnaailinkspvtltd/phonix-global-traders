import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { PRODUCT_CATEGORIES } from '@/data/tradeData'
import { ArrowUpRight } from 'lucide-react'

export const CategoryShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0])

  return (
    <section className="relative py-20 bg-canvas text-primary-text select-none border-b arch-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b arch-line pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 text-xs font-tech text-accent uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>COMMODITY DIVISIONS · SECTION 04</span>
            </div>
            <h2 className="display-heading font-display font-extrabold text-primary-text">
              PRODUCT SPECTRUM &amp;{' '}
              <span className="font-editorial italic font-normal text-accent">Cargo Sectors.</span>
            </h2>
          </div>
          <p className="text-secondary-text max-w-md font-sans text-sm sm:text-base leading-relaxed">
            Select a commercial sector to inspect primary specifications, verified origin corridors, and laboratory assay standards.
          </p>
        </div>

        {/* Editorial 2-Column Split: Sector List + Real Photographic Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Sector Rows */}
          <div className="lg:col-span-7 divide-y arch-line border-y arch-line">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = activeCategory.id === cat.id

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onClick={() => setActiveCategory(cat)}
                  className={`group py-7 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'bg-surface/50 pl-4' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-accent font-bold tracking-widest">
                          {cat.index}
                        </span>
                        <h3
                          className={`text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight transition-colors duration-200 ${
                            isSelected ? 'text-accent' : 'text-primary-text group-hover:text-accent'
                          }`}
                        >
                          {cat.name}
                        </h3>
                      </div>
                      <p className="text-sm text-secondary-text font-editorial italic pl-8">
                        {cat.subhead}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pl-8 sm:pl-0">
                      <span className="font-mono text-xs text-secondary-text">
                        {cat.itemCount} SPECIFICATIONS
                      </span>
                      <Link
                        to={`/products?category=${cat.id}`}
                        aria-label={`View ${cat.name} commodities`}
                        className={`w-9 h-9 border flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? 'bg-accent text-white border-accent'
                            : 'border-border-strong text-secondary-text group-hover:border-accent group-hover:text-accent'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: High-Contrast Photographic Canvas */}
          <div className="lg:col-span-5">
            <div className="relative border border-border-strong aspect-[4/3] bg-surface overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    className="w-full h-full object-cover filter contrast-[1.12] brightness-[0.92] dark:brightness-[0.78]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="font-mono text-xs text-[#D97736] tracking-widest uppercase font-bold mb-1">
                      SECTOR {activeCategory.index} · COMMODITY LOT
                    </span>
                    <h4 className="font-tech text-lg font-bold tracking-tight">
                      {activeCategory.name}
                    </h4>
                    <p className="font-sans text-xs text-white/80 mt-1">
                      {activeCategory.subhead}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Bottom Catalog Action Link */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary-text text-canvas hover:bg-accent hover:text-white font-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-sm"
          >
            <span>Browse Full Cargo Catalog &amp; Specifications</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
