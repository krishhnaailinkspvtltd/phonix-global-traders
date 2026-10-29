import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Award, ShieldCheck, TrendingUp } from 'lucide-react'

export const CompanyEditorial: React.FC = () => {
  return (
    <section className="relative py-24 bg-surface text-primary-text overflow-hidden select-none border-b arch-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle Tag */}
        <div className="flex items-center gap-3 mb-4 text-sm font-tech text-accent uppercase tracking-widest font-semibold">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>GOVERNANCE &amp; PHILOSOPHY · SECTION 03</span>
        </div>

        {/* Section Headline */}
        <div className="border-b arch-line pb-8 mb-14">
          <h2 className="display-heading font-display font-extrabold text-primary-text">
            SOVEREIGN STRUCTURE.{' '}
            <span className="font-editorial italic font-normal text-accent">
              Intercontinental Reach.
            </span>
          </h2>
        </div>

        {/* Asymmetrical 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Pull Quote & Narrative */}
          <div className="lg:col-span-6 space-y-7">
            <p className="font-editorial italic text-2xl sm:text-3xl text-primary-text leading-snug">
              &ldquo;Exporting India&apos;s agricultural heritage and manufactured mastery demands rigorous laboratory assaying, zero-tolerance phytosanitary compliance, and dependable ocean logistics.&rdquo;
            </p>

            <p className="editorial-body text-secondary-text font-sans text-base sm:text-lg leading-relaxed">
              PHONIX GLOBAL TRADE bridges traditional Indian farming hubs and advanced industrial manufacturing clusters with leading buyers across Europe, the Americas, GCC, and Southeast Asia. From certified dehydrated vegetable processing lines in Gujarat to Basmati paddy fields in Punjab and ceramic kilns in Morbi, our contracts provide guaranteed chemical specifications, zero pesticide residues, and dependable dispatch.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="px-8 py-4 rounded-full border border-border-strong hover:border-accent bg-canvas hover:bg-accent hover:text-white text-sm font-tech tracking-wider uppercase transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer font-bold shadow-md hover:shadow-lg"
              >
                <span>Read Corporate Charter &amp; Certifications</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Architectural Photographic Composition with Rounded Corners */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl border border-border-strong overflow-hidden aspect-[16/11] bg-canvas shadow-2xl">
              <img
                src="/images/about/about-editorial-1.jpg"
                alt="Executive Commercial Trade Negotiation"
                className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.94] dark:brightness-[0.80]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4BA0FF]" />
                  <span className="font-mono text-sm text-white uppercase tracking-wider font-semibold">
                    BILATERAL TRADE ARCHITECTURE · MUMBAI &amp; MUNDRA EXPORT DESKS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Modern Architectural Columns with Clean Light Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200/80">
          
          <div className="rounded-2xl p-7 bg-white border border-slate-200/70 space-y-4 hover:border-[#1557B0]/60 transition-all duration-300 shadow-xs hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-tech text-xs text-[#1557B0] font-bold uppercase tracking-wider">
                PILLAR 01 / INTEGRITY
              </span>
              <Award className="w-5 h-5 text-[#1557B0]" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A]">
              APEDA &amp; Spices Board Compliance
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              Every agro consignment undergoes pre-shipment laboratory assays governed by APEDA, Spices Board of India, FSSAI, and USFDA standards with certified inspection reports.
            </p>
          </div>

          <div className="rounded-2xl p-7 bg-white border border-slate-200/70 space-y-4 hover:border-[#1557B0]/60 transition-all duration-300 shadow-xs hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-tech text-xs text-slate-400 font-bold uppercase tracking-wider">
                PILLAR 02 / SOVEREIGNTY
              </span>
              <ShieldCheck className="w-5 h-5 text-[#1557B0]" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A]">
              Mundra &amp; JNPT Deepwater Dispatch
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              Continuous vessel monitoring across major container carriers with direct container stuffing at factory gates and expedited customs clearance at India&apos;s premier maritime ports.
            </p>
          </div>

          <div className="rounded-2xl p-7 bg-white border border-slate-200/70 space-y-4 hover:border-[#1557B0]/60 transition-all duration-300 shadow-xs hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="font-tech text-xs text-slate-400 font-bold uppercase tracking-wider">
                PILLAR 03 / EQUILIBRIUM
              </span>
              <TrendingUp className="w-5 h-5 text-[#1557B0]" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A]">
              Bilateral Import &amp; Export Parity
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              Structured long-term off-take agreements and letter-of-credit (L/C) financing that streamline both outbound Indian exports and inbound international commodity imports.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
