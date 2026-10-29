import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Corporate Charter & Philosophy | PHONIX GLOBAL TRADE'
  }, [])

  return (
    <div className="pt-28 sm:pt-32 pb-20 text-primary-text select-none overflow-x-hidden">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center gap-3 text-xs font-tech text-accent uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>CORPORATE PHILOSOPHY &amp; GOVERNANCE</span>
        </div>

        <h1 className="display-heading font-display font-extrabold text-primary-text leading-[0.92]">
          INDIAN HARVEST &amp;{' '}
          <span className="font-editorial italic font-normal text-accent block mt-1">
            Global Trade Sovereignty.
          </span>
        </h1>

        <p className="editorial-body text-secondary-text max-w-3xl font-sans mt-6 leading-relaxed text-base sm:text-lg">
          PHONIX GLOBAL TRADE operates as a premier Indian export-import house structuring multi-continental supply chains for India&apos;s indigenous agricultural harvest—including dehydrated vegetables &amp; fruits, authentic spices, and Basmati rice—alongside manufactured industrial goods like Morbi vitrified tiles and eco-tableware, while managing reciprocal global commodity imports from trusted international partners.
        </p>
      </section>

      {/* Full-Bleed High-Contrast Photographic Panorama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl border border-border-strong overflow-hidden aspect-[21/9] bg-surface shadow-2xl">
          <img
            src="/images/hero/hero-vessel.jpg"
            alt="Deepwater International Maritime Freight Corridor"
            className="w-full h-full object-cover filter contrast-[1.12] brightness-[0.88] dark:brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 text-white">
            <div className="font-mono text-xs">
              <span className="text-[#66A8FF] font-bold block uppercase tracking-widest mb-1">
                OPERATIONAL INTEGRATION
              </span>
              <span className="font-tech text-base font-bold">
                SYNCHRONIZING ORIGIN COMMODITY EXTRACTION WITH DEEPWATER VESSEL CHARTERING
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Trade Triad Governance Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="border-t arch-line pt-12 mb-10">
          <div className="flex items-center gap-2 text-xs font-tech text-accent uppercase tracking-widest mb-2">
            <span>FOUNDATIONAL CHARTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-text">
            The Trade Triad
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="border-l-2 border-accent pl-6 space-y-3">
            <span className="font-tech text-xs text-accent uppercase tracking-wider font-bold">
              01 / INTEGRITY &amp; ASSAYS
            </span>
            <h3 className="font-display font-bold text-xl text-primary-text">
              Empirical Laboratory Verification
            </h3>
            <p className="text-secondary-text text-sm leading-relaxed font-sans">
              Trust is forged through non-negotiable chemical verification. Every single consignment is surveyed by accredited independent inspectors (SGS, Bureau Veritas, GAFTA Analysts) before financial release.
            </p>
          </div>

          <div className="border-l-2 border-border-strong pl-6 space-y-3">
            <span className="font-tech text-xs text-secondary-text uppercase tracking-wider font-bold">
              02 / LOGISTICS SOVEREIGNTY
            </span>
            <h3 className="font-display font-bold text-xl text-primary-text">
              Multi-Modal Routing Control
            </h3>
            <p className="text-secondary-text text-sm leading-relaxed font-sans">
              By structuring integrated rail, port gantry, and deep-sea vessel chartering, we insulate clients from single-carrier choke points and port congestion bottlenecks across maritime straits.
            </p>
          </div>

          <div className="border-l-2 border-border-strong pl-6 space-y-3">
            <span className="font-tech text-xs text-secondary-text uppercase tracking-wider font-bold">
              03 / MACRO RESILIENCE
            </span>
            <h3 className="font-display font-bold text-xl text-primary-text">
              Contractual Risk Insulation
            </h3>
            <p className="text-secondary-text text-sm leading-relaxed font-sans">
              Global supply friction requires institutional risk mitigation. Our commercial desks execute customized off-take structures and letter-of-credit covenants that secure stable pricing.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Cross-Border Execution Sequence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="border-t arch-line pt-12 mb-10">
          <span className="font-tech text-xs text-accent uppercase tracking-widest block mb-2 font-semibold">
            EXECUTION METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-primary-text">
            How PHONIX Executes Cross-Border Movement
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-border-strong bg-surface p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs text-accent font-bold tracking-widest block mb-3">
                STEP 01
              </span>
              <h3 className="font-display font-bold text-lg text-primary-text mb-2">
                Origin Procurement
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed font-sans">
                Direct contracting with certified agricultural cooperatives, mineral extraction belts, and manufacturing plants.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-secondary-text border-t arch-line mt-6">
              ORIGIN AUDIT · CHAIN OF CUSTODY
            </div>
          </div>

          <div className="border border-border-strong bg-surface p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs text-accent font-bold tracking-widest block mb-3">
                STEP 02
              </span>
              <h3 className="font-display font-bold text-lg text-primary-text mb-2">
                Laboratory Assay
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed font-sans">
                Independent sampling, purity grading, and moisture analysis conforming strictly to GAFTA 78 and ASTM guidelines.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-secondary-text border-t arch-line mt-6">
              SGS CERTIFIED · GAFTA ACCREDITATION
            </div>
          </div>

          <div className="border border-border-strong bg-surface p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs text-accent font-bold tracking-widest block mb-3">
                STEP 03
              </span>
              <h3 className="font-display font-bold text-lg text-primary-text mb-2">
                Charter Logistics
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed font-sans">
                Dedicated vessel booking, customs export clearance, and continuous satellite telemetry tracking through sea lanes.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-secondary-text border-t arch-line mt-6">
              HANDYMAX / PANAMAX · 24/7 GPS
            </div>
          </div>

          <div className="border border-border-strong bg-surface p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs text-accent font-bold tracking-widest block mb-3">
                STEP 04
              </span>
              <h3 className="font-display font-bold text-lg text-primary-text mb-2">
                Discharge &amp; Delivery
              </h3>
              <p className="text-secondary-text text-xs leading-relaxed font-sans">
                Port berthing, customs discharge inspection, and final CIF/FOB escrow release upon clean bill of lading issuance.
              </p>
            </div>
            <div className="pt-6 font-mono text-[10px] text-secondary-text border-t arch-line mt-6">
              INCOTERMS 2020 · ESCROW SETTLEMENT
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Standards Manifest */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="border border-border-strong bg-surface p-8 sm:p-12">
          <div className="max-w-2xl space-y-4 mb-8">
            <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold block">
              REGULATORY COMPLIANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-text">
              International Trade Frameworks
            </h2>
            <p className="text-secondary-text text-sm font-sans leading-relaxed">
              Our trading house operates strictly within established multilateral frameworks:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-tech text-xs border-t arch-line pt-8">
            <div>
              <span className="text-primary-text font-bold block text-sm">ISO 9001:2015</span>
              <span className="text-secondary-text">Quality Management</span>
            </div>
            <div>
              <span className="text-primary-text font-bold block text-sm">GAFTA 78 / 88</span>
              <span className="text-secondary-text">Grain &amp; Feed Assays</span>
            </div>
            <div>
              <span className="text-primary-text font-bold block text-sm">FOSFA INTERNATIONAL</span>
              <span className="text-secondary-text">Oils &amp; Fats Contracts</span>
            </div>
            <div>
              <span className="text-primary-text font-bold block text-sm">INCOTERMS® 2020</span>
              <span className="text-secondary-text">CIF / CFR / FOB Rules</span>
            </div>
          </div>
        </div>
      </section>

      {/* Action CTA: Rounded Glass Button with Hover Motion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link
          to="/products"
          className="px-8 py-4 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-[#1557B0]/30 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <span>Explore Commodity Specifications</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>

    </div>
  )
}
