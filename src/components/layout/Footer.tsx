import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#F8FAFC] text-[#0F172A] pt-20 pb-12 border-t border-slate-200/80 select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Editorial Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-16 border-b border-slate-200/60">
          <div className="max-w-md space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1557B0] text-white flex items-center justify-center font-display font-black text-sm">
                P
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-[#0F172A]">
                PHONIX
              </span>
              <span className="font-editorial italic font-normal text-xs text-[#1557B0]">
                Global Trade
              </span>
            </Link>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              Premier Indian export and international import house. Exporting certified dehydrated agro, authentic spices, aged Basmati, and manufactured goods worldwide through Mundra and JNPT deepwater terminals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#1557B0] hover:bg-[#0A3478] text-white text-sm font-sans font-semibold tracking-wide transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Initiate Export Inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-sm font-sans font-medium transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Products</span>
            </Link>
          </div>
        </div>

        {/* Directory Columns (Clean, Minimal, No Outlines) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-14">
          {/* Column 1: Core Divisions */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Export Divisions
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/products" className="hover:text-[#1557B0] transition-colors">
                  Dehydrated Vegetables &amp; Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?cat=spices" className="hover:text-[#1557B0] transition-colors">
                  Indian Spices &amp; 1121 Basmati
                </Link>
              </li>
              <li>
                <Link to="/products?cat=manufactured" className="hover:text-[#1557B0] transition-colors">
                  Morbi Architectural Tiles
                </Link>
              </li>
              <li>
                <Link to="/products?cat=manufactured" className="hover:text-[#1557B0] transition-colors">
                  Areca Palm Eco-Tableware
                </Link>
              </li>
              <li>
                <Link to="/products?cat=imports" className="hover:text-[#1557B0] transition-colors">
                  Global Commodity Imports
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-[#1557B0] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1557B0] transition-colors">
                  Corporate Charter
                </Link>
              </li>
              <li>
                <Link to="/global-trade" className="hover:text-[#1557B0] transition-colors">
                  Shipping Corridors
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#1557B0] transition-colors">
                  Maritime Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#1557B0] transition-colors">
                  Contact &amp; Commercial Desks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Logistics Hubs */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Corridors &amp; Gateways
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Mundra Port Deepwater Terminal</li>
              <li>JNPT (Nhava Sheva) Mumbai</li>
              <li>Jebel Ali Port (Dubai / GCC)</li>
              <li>Port of Rotterdam (Europe)</li>
              <li>New York Harbor (Americas)</li>
            </ul>
          </div>

          {/* Column 4: Accreditations */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Certifications
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>APEDA Government Registered</li>
              <li>Spices Board of India Certified</li>
              <li>FSSAI Central Export License</li>
              <li>USFDA Registered Facility</li>
              <li>BRCGS Grade-A Quality</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Clean Single Line */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
          <div>
            © 2026 PHONIX GLOBAL TRADE. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Mundra · Mumbai · Dubai · Rotterdam · New York</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#1557B0] transition-colors cursor-pointer font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
