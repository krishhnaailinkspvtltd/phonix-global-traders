import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { PRODUCTS_CATALOG, PRODUCT_CATEGORIES } from '@/data/tradeData'
import { ArrowUpRight } from 'lucide-react'

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Commodity & Industrial Cargo Catalog | PHONIX GLOBAL TRADE'
  }, [])

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  const handleFilterChange = (catId: string) => {
    setSelectedCategory(catId)
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: catId })
    }
  }

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS_CATALOG
      : PRODUCTS_CATALOG.filter((p) => p.categoryId === selectedCategory)

  return (
    <div className="pt-28 sm:pt-32 pb-20 text-primary-text select-none overflow-x-hidden">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 text-xs font-tech text-accent uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>CARGO DIRECTORY &amp; LABORATORY SPECIFICATIONS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b arch-line pb-8">
          <div>
            <h1 className="display-heading font-display font-extrabold text-primary-text leading-[0.92]">
              INDIAN EXPORTS &amp;{' '}
              <span className="font-editorial italic font-normal text-accent block mt-1">
                Global Import Cargo.
              </span>
            </h1>
          </div>
          <p className="editorial-body text-secondary-text max-w-md font-sans text-base leading-relaxed">
            Certified Indian dehydrated vegetables &amp; fruits, authentic spices, aged Basmati rice, Morbi vitrified architectural tiles, and reciprocal global commodity imports.
          </p>
        </div>
      </section>

      {/* Architectural Filter Bar with Rounded Glass Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 font-tech text-sm">
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className={`px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
              selectedCategory === 'all'
                ? 'bg-[#1557B0]/90 text-white border-white/40 shadow-md font-bold backdrop-blur-md'
                : 'bg-white/50 hover:bg-white/80 text-secondary-text hover:text-primary-text border-white/70 backdrop-blur-md shadow-xs'
            }`}
          >
            All Divisions ({PRODUCTS_CATALOG.length})
          </button>

          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleFilterChange(cat.id)}
              className={`px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#1557B0]/90 text-white border-white/40 shadow-md font-bold backdrop-blur-md'
                  : 'bg-white/50 hover:bg-white/80 text-secondary-text hover:text-primary-text border-white/70 backdrop-blur-md shadow-xs'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Catalog Grid with Frosted Glassmorphism Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-white/80 bg-white/60 backdrop-blur-md flex flex-col justify-between group shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Photographic Header */}
                <div className="relative aspect-[16/10] overflow-hidden border-b arch-line bg-canvas">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover filter contrast-[1.10] brightness-[0.94] dark:brightness-[0.80] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Top Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 bg-black/75 text-white backdrop-blur-md rounded-full border border-white/20">
                      HS {product.hsCode}
                    </span>
                    <span className="px-2.5 py-1 bg-black/75 text-[#66A8FF] font-semibold backdrop-blur-md rounded-full border border-white/20">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-primary-text group-hover:text-accent transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-secondary-text text-xs leading-relaxed font-sans line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Metadata Telemetry */}
                  <div className="pt-4 border-t arch-line space-y-2 font-tech text-xs">
                    <div className="flex justify-between">
                      <span className="text-secondary-text uppercase">ORIGIN HUB</span>
                      <span className="text-primary-text font-bold">{product.originHub}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-text uppercase">MIN ORDER</span>
                      <span className="text-accent font-bold">{product.moq}</span>
                    </div>
                  </div>

                  {/* Action Link: Rounded Glass Button with Hover Motion */}
                  <div className="pt-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="w-full py-2.5 rounded-full bg-white/70 hover:bg-[#1557B0] text-primary-text hover:text-white backdrop-blur-md border border-white/80 hover:border-[#1557B0] font-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group/btn"
                    >
                      <span>Inspect Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  )
}
