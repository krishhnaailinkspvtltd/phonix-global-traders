import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PRODUCTS_CATALOG } from '@/data/tradeData'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const product = PRODUCTS_CATALOG.find((p) => p.id === id) || PRODUCTS_CATALOG[0]
  const allImages = [product.image, ...(product.secondaryImages || [])]
  const [selectedImage, setSelectedImage] = useState(product.image)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product) {
      document.title = `${product.title} | PHONIX GLOBAL TRADE`
      setSelectedImage(product.image)
    }
  }, [product, id])

  const relatedProducts = PRODUCTS_CATALOG.filter(
    (p) => p.id !== product.id && p.categoryId === product.categoryId
  ).slice(0, 3)

  return (
    <div className="pt-28 sm:pt-32 pb-20 text-primary-text select-none overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Return Link */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-tech text-xs tracking-wider uppercase text-secondary-text hover:text-[#1557B0] px-4 py-2 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-md border border-white/70 transition-all duration-300 shadow-xs hover:scale-105 active:scale-95 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Commodity Catalog</span>
          </Link>
        </div>

        {/* Top Product Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/11] rounded-2xl border border-border-strong bg-surface overflow-hidden shadow-xl">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover filter contrast-[1.10] brightness-[0.94] dark:brightness-[0.80] transition-all duration-300"
              />
              <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 rounded-full bg-black/80 text-white backdrop-blur-md">
                HS CODE {product.hsCode}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {allImages.map((img: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? 'border-accent shadow-sm ring-2 ring-accent/30'
                      : 'border-border-strong opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Commercial Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block mb-2">
                COMMODITY DOSSIER · {product.category}
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-text leading-tight">
                {product.title}
              </h1>
              <p className="font-editorial italic text-lg text-secondary-text mt-2">
                {product.tagline}
              </p>
            </div>

            <p className="editorial-body text-secondary-text font-sans text-sm sm:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Commercial Parameters Box with Glassmorphism */}
            <div className="rounded-2xl border border-white/80 bg-white/60 backdrop-blur-md p-6 space-y-3 font-tech text-xs shadow-md">
              <div className="flex justify-between py-1.5 border-b arch-line">
                <span className="text-secondary-text uppercase">ORIGIN HUB</span>
                <span className="font-bold text-primary-text">{product.originHub}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b arch-line">
                <span className="text-secondary-text uppercase">MIN ORDER QUANTITY</span>
                <span className="font-bold text-accent">{product.moq}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b arch-line">
                <span className="text-secondary-text uppercase">PACKAGING</span>
                <span className="font-bold text-primary-text text-right max-w-xs">{product.packaging}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-secondary-text uppercase">TRANSIT LEAD TIME</span>
                <span className="font-bold text-primary-text">{product.leadTime}</span>
              </div>
            </div>

            {/* Booking Inquiry CTA: Rounded Blur Transparent Glass Button with Micro-Motion */}
            <div className="pt-2">
              <Link
                to={`/contact?subject=${encodeURIComponent(`Cargo Booking Inquiry: ${product.title}`)}`}
                className="w-full py-4 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#1557B0]/30 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Inquire For Cargo Booking</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Technical Specification Table */}
        <section className="mb-16 border-t arch-line pt-12">
          <div className="max-w-4xl space-y-6">
            <div>
              <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block mb-2">
                VERIFIED LABORATORY METRICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-text">
                Technical Specifications &amp; Assay Limits
              </h2>
            </div>

            <div className="border border-border-strong overflow-hidden bg-surface shadow-sm">
              <table className="w-full text-left font-tech text-xs sm:text-sm">
                <thead className="border-b arch-line bg-canvas text-secondary-text uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6 font-semibold">Parameter / Chemical Assay</th>
                    <th className="py-3.5 px-6 font-semibold">Guaranteed Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y arch-line">
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="hover:bg-canvas/50 transition-colors">
                      <td className="py-3 px-6 font-medium text-secondary-text">{spec.key}</td>
                      <td className="py-3 px-6 font-bold text-primary-text">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Compliance Standards */}
            <div className="space-y-3 pt-4">
              <span className="font-tech text-xs text-secondary-text uppercase tracking-widest block">
                COMPLIANCE &amp; ACCREDITATIONS:
              </span>
              <div className="flex flex-wrap gap-2.5 font-mono text-xs">
                {product.complianceStandards.map((std, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 border border-border-strong bg-surface text-primary-text text-[11px]"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Commodities */}
        {relatedProducts.length > 0 && (
          <section className="border-t arch-line pt-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block mb-1">
                  PARALLEL COMMODITY FLOWS
                </span>
                <h3 className="text-2xl font-display font-bold text-primary-text">
                  Related in {product.category}
                </h3>
              </div>
              <Link
                to="/products"
                className="font-tech text-xs text-accent hover:underline flex items-center gap-1 uppercase tracking-wider font-semibold"
              >
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/products/${rel.id}`}
                  className="group border border-border-strong bg-surface p-5 space-y-3 hover:border-accent transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-canvas border arch-line">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-primary-text group-hover:text-accent transition-colors">
                      {rel.title}
                    </h4>
                    <span className="font-mono text-xs text-secondary-text block mt-1">
                      MOQ: {rel.moq}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
