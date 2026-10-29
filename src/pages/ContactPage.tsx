import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { GLOBAL_DESKS } from '@/data/tradeData'
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight, Building2, Anchor } from 'lucide-react'

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialSubject = searchParams.get('subject') || ''

  const [formData, setFormData] = useState({
    fullName: '',
    corporateEmail: '',
    companyName: '',
    country: '',
    sector: 'commodity',
    incoterm: 'CIF',
    destinationPort: '',
    volumeRequirement: '',
    subject: initialSubject,
    message: '',
  })

  const [errors, setErrors] = useState<{ [k: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [dossierRef, setDossierRef] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Commercial Inquiries & Desks | PHONIX GLOBAL TRADE'
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: { [k: string]: string } = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your name.'
    if (!formData.corporateEmail.trim()) {
      newErrors.corporateEmail = 'Corporate business email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.corporateEmail)) {
      newErrors.corporateEmail = 'Please provide a valid corporate email format.'
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Please enter your company name.'
    if (!formData.destinationPort.trim()) newErrors.destinationPort = 'Please specify the destination or delivery location.'
    if (!formData.message.trim()) newErrors.message = 'Please describe the product, quantity and destination you're interested in.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    const refCode = `PHX-${Math.floor(100000 + Math.random() * 900000)}`
    setDossierRef(refCode)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccessModalOpen(true)
    }, 900)
  }

  return (
    <div className="pt-28 pb-24 text-primary-text select-none overflow-x-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Section Header */}
        <div className="border-b border-border-strong pb-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.25em] text-accent font-semibold uppercase">
                  CONTACT // BUSINESS INQUIRIES
                </span>
                <span className="h-px w-10 bg-accent/40" />
                <span className="font-mono text-[11px] text-secondary-text">
                  FOUR CONTINENTAL DESKS
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight leading-[0.95]">
                INITIATE A{' '}
                <span className="font-serif italic font-normal text-accent block sm:inline">
                  Conversation.
                </span>
              </h1>
            </div>

            <p className="text-secondary-text max-w-md font-sans text-xs sm:text-sm leading-relaxed border-l border-border-subtle pl-4">
              Direct access to our senior export chartering and commodity trading desks in Mumbai, Mundra, Dubai, Rotterdam, and New York. Inquire for dehydrated produce, spices, Basmati, Morbi tiles, or reciprocal global imports.
            </p>
          </div>

          {/* Demonstration Notice Plaque */}
          <div className="mt-8 p-3.5 border border-border-subtle bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-accent">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="font-bold tracking-wider uppercase">COMMERCIAL DEMONSTRATION ENVIRONMENT</span>
            </div>
            <span className="text-secondary-text text-[11px]">
              This is a website demonstration. The form does not send inquiries to a real inbox.
            </span>
          </div>
        </div>

        {/* Main Grid: Form Left, Global Desks Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Commercial Requisition Form with Glassmorphic Card */}
          <div className="lg:col-span-7 rounded-3xl border border-white/80 bg-white/60 backdrop-blur-xl p-6 sm:p-10 shadow-xl space-y-8">
            <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest block mb-0.5">
                  REQUISITION FORM PHX-2026
                </span>
                <h2 className="text-xl font-sans font-bold text-primary-text">
                  Direct Trade Specification
                </h2>
              </div>
              <FileText className="w-5 h-5 text-secondary-text" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Legal Representative *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Lord Alexander Vance"
                    className={`w-full px-4 py-3 border bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-border-strong'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[10px] font-mono text-red-500 block">{errors.fullName}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    name="corporateEmail"
                    value={formData.corporateEmail}
                    onChange={handleChange}
                    placeholder="e.g. a.vance@meridian-global.com"
                    className={`w-full px-4 py-3 border bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors ${
                      errors.corporateEmail ? 'border-red-500' : 'border-border-strong'
                    }`}
                  />
                  {errors.corporateEmail && (
                    <span className="text-[10px] font-mono text-red-500 block">{errors.corporateEmail}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Entity and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Corporate Entity / Buyer *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Meridian Global Logistics BV"
                    className={`w-full px-4 py-3 border bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors ${
                      errors.companyName ? 'border-red-500' : 'border-border-strong'
                    }`}
                  />
                  {errors.companyName && (
                    <span className="text-[10px] font-mono text-red-500 block">{errors.companyName}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Incorporation Jurisdiction
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. Netherlands / Singapore"
                    className="w-full px-4 py-3 border border-border-strong bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Sector & Incoterm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Commodity Category
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border-strong bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="dehydrated">Dehydrated Vegetables &amp; Fruits (Onion/Garlic/Mango)</option>
                    <option value="spices">Authentic Indian Spices &amp; Aged Basmati Rice</option>
                    <option value="manufactured">Morbi Vitrified Tiles &amp; Indian Manufactured Goods</option>
                    <option value="imports">Global Import Commodities (Almonds/Cashews/Pulses)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Target Incoterm
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                    {['CIF', 'FOB', 'CFR', 'DAP'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, incoterm: term }))}
                        className={`py-2 text-xs font-mono font-bold tracking-wider uppercase border transition-colors cursor-pointer ${
                          formData.incoterm === term
                            ? 'bg-primary-text text-canvas border-primary-text'
                            : 'bg-canvas text-secondary-text border-border-strong hover:border-border-strong hover:text-primary-text'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Discharge Port & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Discharge Port &amp; Draft Limit *
                  </label>
                  <input
                    type="text"
                    name="destinationPort"
                    value={formData.destinationPort}
                    onChange={handleChange}
                    placeholder="e.g. Port of Rotterdam (Draft: 17.5m)"
                    className={`w-full px-4 py-3 border bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors ${
                      errors.destinationPort ? 'border-red-500' : 'border-border-strong'
                    }`}
                  />
                  {errors.destinationPort && (
                    <span className="text-[10px] font-mono text-red-500 block">{errors.destinationPort}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                    Required Volume (MT / TEU)
                  </label>
                  <input
                    type="text"
                    name="volumeRequirement"
                    value={formData.volumeRequirement}
                    onChange={handleChange}
                    placeholder="e.g. 15,000 MT Bulk / 80 FCL"
                    className="w-full px-4 py-3 border border-border-strong bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Row 5: Specification details */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs text-secondary-text uppercase tracking-wider block">
                  Product Requirements &amp; Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your product, approximate quantity, required packaging and delivery destination..."
                  className={`w-full px-4 py-3 border bg-canvas text-primary-text font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-border-strong'
                  }`}
                />
                {errors.message && (
                  <span className="text-[10px] font-mono text-red-500 block">{errors.message}</span>
                )}
              </div>

              {/* Submit Button: Blur Transparent Glass Button with Micro-Motion */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-[#1557B0]/30 hover:scale-[1.02] active:scale-[0.98] group"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin" />
                    <span>PREPARING DEMO PREVIEW...</span>
                  </>
                ) : (
                  <>
                    <span>PREVIEW DEMO INQUIRY</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Global Desks Directory & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Global Desks Register */}
            <div className="border border-border-strong bg-surface p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div>
                  <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest block">
                    DIRECTORY // GLOBAL DESKS
                  </span>
                  <h3 className="text-lg font-sans font-bold text-primary-text">
                    Regional Commercial Chambers
                  </h3>
                </div>
                <Building2 className="w-5 h-5 text-secondary-text" />
              </div>

              <div className="space-y-4">
                {GLOBAL_DESKS.map((desk, idx) => (
                  <div key={idx} className="border border-border-subtle p-4 bg-canvas space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-primary-text font-bold text-sm tracking-tight">{desk.city} Desk</span>
                      <span className="font-mono text-[10px] text-accent uppercase tracking-wider">{desk.region}</span>
                    </div>
                    <p className="text-secondary-text text-xs font-sans leading-relaxed">{desk.address}</p>
                    <div className="pt-2 border-t border-border-subtle/50 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-secondary-text">
                      <div className="flex items-center gap-1.5 text-accent">
                        <Clock className="w-3 h-3" />
                        <span>{desk.timezone}</span>
                      </div>
                      <span className="text-primary-text">{desk.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sovereign Trade Protocol Plaque */}
            <div className="border border-border-strong bg-surface p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 border-b border-border-subtle pb-2.5 text-primary-text">
                <Anchor className="w-4 h-4 text-accent" />
                <span className="font-bold tracking-wider uppercase">SOVEREIGN SETTLEMENT PROTOCOLS</span>
              </div>
              <ul className="space-y-2.5 text-secondary-text text-[11px] font-sans">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-accent font-bold">01.</span>
                  <span><strong>Letters of Credit (L/C):</strong> Irrevocable, confirmed at sight via Tier-1 international correspondent banks under ICC UCP 600.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-accent font-bold">02.</span>
                  <span><strong>Independent Assay:</strong> Pre-loading quality and quantity validation by SGS, Bureau Veritas, or Intertek at discharge port.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-accent font-bold">03.</span>
                  <span><strong>Maritime Chartering:</strong> Verified IMO-registered double-hull vessels with Baltic Exchange index hedging.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              className="max-w-lg w-full border border-border-strong bg-surface p-8 space-y-6 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">
                      COMMERCIAL ACKNOWLEDGMENT
                    </span>
                    <h3 className="text-lg font-sans font-bold text-primary-text">
                      Demo Inquiry Preview Created
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs text-secondary-text font-bold">
                  {dossierRef}
                </span>
              </div>

              <div className="space-y-3 font-sans text-xs text-secondary-text leading-relaxed">
                <p>
                  Thank you, <strong className="text-primary-text">{formData.fullName}</strong>. Your demonstration inquiry for <strong className="text-primary-text">{formData.companyName}</strong> is shown here as a preview only and has not been sent to Phonix Global Trade.
                </p>
                <div className="p-3 border border-border-subtle bg-canvas font-mono text-[11px] space-y-1">
                  <div><span className="text-secondary-text">DESTINATION PORT:</span> <span className="text-primary-text font-bold">{formData.destinationPort}</span></div>
                  <div><span className="text-secondary-text">INCOTERM:</span> <span className="text-primary-text font-bold">{formData.incoterm}</span></div>
                  <div><span className="text-secondary-text">COMMODITY:</span> <span className="text-primary-text font-bold">{formData.sector}</span></div>
                </div>
                <p className="text-[11px]">
                  In production operations, an assigned chartering broker evaluates cargo specifications, demurrage terms, and vessel availability within 18 hours.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  setFormData({
                    fullName: '',
                    corporateEmail: '',
                    companyName: '',
                    country: '',
                    sector: 'commodity',
                    incoterm: 'CIF',
                    destinationPort: '',
                    volumeRequirement: '',
                    subject: '',
                    message: '',
                  })
                }}
                className="w-full py-3.5 bg-primary-text text-canvas font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors cursor-pointer border border-primary-text"
              >
                CLOSE CONFIRMATION [ESC]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
