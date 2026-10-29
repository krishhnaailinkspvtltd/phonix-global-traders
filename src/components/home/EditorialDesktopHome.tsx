import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Globe2, PackageCheck, Ship, Sprout } from 'lucide-react'
import './editorial-desktop-home.css'

const collections = [
  { title: 'Dehydrated vegetables', tag: 'INDIAN AGRICULTURAL EXPORTS', detail: 'Onion flakes, garlic, dried ginger and fruit powders.', photo: '/images/products/dehydrated-onion.jpg', href: '/products?category=dehydrated-agro' },
  { title: 'Spices & grains', tag: 'FROM INDIAN FARMS', detail: 'Turmeric, chilies, cumin and Basmati rice.', photo: '/images/products/turmeric-curcumin.jpg', href: '/products?category=spices-commodities' },
  { title: 'Manufactured goods', tag: 'MADE IN INDIA', detail: 'Architectural ceramics and thoughtful everyday goods.', photo: '/images/products/morbi-tiles.jpg', href: '/products?category=manufactured-goods' },
  { title: 'Global imports', tag: 'INTERNATIONAL SOURCING', detail: 'Agricultural commodities and materials from other markets.', photo: '/images/products/california-almonds.jpg', href: '/products?category=global-imports' },
]

const steps = [
  { no: '01', icon: Sprout, title: 'Understand the product', text: 'Start with origin, grade, quantities and packaging requirements.' },
  { no: '02', icon: PackageCheck, title: 'Clarify the details', text: 'Discuss specifications, available documentation and practical next steps.' },
  { no: '03', icon: Ship, title: 'Plan the shipment', text: 'Explore logistics, lead times and the destination requirements together.' },
]

export const EditorialDesktopHome: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-ed-reveal]'))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('ed-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -45px 0px' })
    nodes.forEach(node => observer.observe(node))
    root.classList.add('ed-motion')
    return () => { observer.disconnect(); root.classList.remove('ed-motion') }
  }, [])

  return <div className="ed-home" ref={rootRef}>
    <section className="ed-hero">
      <div className="ed-container ed-hero-grid">
        <div className="ed-hero-content">
          <div className="ed-eyebrow"><span className="ed-line-short"/>INDIAN EXPORTS · GLOBAL SOURCING</div>
          <h1>From Indian soil <em>to global shelves.</em></h1>
          <p>Dehydrated vegetables, Indian spices, grains and manufactured goods—thoughtfully sourced for international trade.</p>
          <div className="ed-actions">
            <Link to="/products" className="ed-btn ed-btn-blue">Explore our products <ArrowUpRight size={18}/></Link>
            <Link to="/contact" className="ed-btn ed-btn-soft">Talk to our team <ArrowRight size={18}/></Link>
          </div>
          <div className="ed-hero-small">INDIAN ORIGINS <span>•</span> INTERNATIONAL OPPORTUNITIES</div>
        </div>
        <div className="ed-hero-visual" data-ed-reveal>
          <div className="ed-main-photo"><img src="/images/products/dehydrated-onion.jpg" fetchPriority="high" alt="Dehydrated onion flakes from India"/></div>
          <div className="ed-inset-photo"><img src="/images/products/turmeric-curcumin.jpg" alt="Indian turmeric and spices"/></div>
          <div className="ed-photo-stamp"><Globe2 size={26}/><span>PRODUCT<br/>FIRST</span></div>
          <div className="ed-photo-caption">01 / FROM THE SOURCE <span>INDIA → WORLD</span></div>
        </div>
      </div>
      <a className="ed-scroll" href="#ed-collection">SCROLL TO EXPLORE <span>↓</span></a>
    </section>

    <section className="ed-intro">
      <div className="ed-container ed-intro-grid">
        <div className="ed-section-label" data-ed-reveal>01 / OUR APPROACH</div>
        <h2 data-ed-reveal>Good trade begins with <em>knowing what matters.</em></h2>
        <div className="ed-intro-text" data-ed-reveal>
          <p>Every product has an origin, a story and a specification. We focus on the details that help buyers and suppliers build useful international connections.</p>
          <Link to="/about" className="ed-text-link">Get to know Phonix <ArrowUpRight size={18}/></Link>
        </div>
      </div>
    </section>

    <section className="ed-collection" id="ed-collection">
      <div className="ed-container">
        <div className="ed-section-top" data-ed-reveal>
          <div><div className="ed-section-label">02 / WHAT WE TRADE</div><h2>Our <em>collections.</em></h2></div>
          <Link to="/products" className="ed-text-link">All products <ArrowUpRight size={18}/></Link>
        </div>
        <div className="ed-product-grid">{collections.map((item, index) => <Link to={item.href} className="ed-product" key={item.title} data-ed-reveal>
          <div className="ed-product-image">
            <img src={item.photo} alt={item.title} loading="lazy"/>
            <span className="ed-product-number">0{index+1} / 04</span>
            <span className="ed-product-arrow"><ArrowUpRight size={21}/></span>
          </div>
          <div className="ed-product-copy"><span>{item.tag}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
        </Link>)}</div>
      </div>
    </section>

    <section className="ed-travel">
      <img src="/images/hero/hero-vessel.jpg" loading="lazy" alt="Container vessel travelling on an international shipping route"/>
      <div className="ed-travel-shade"/>
      <div className="ed-container ed-travel-content" data-ed-reveal>
        <div className="ed-section-label">03 / BEYOND THE BORDER</div>
        <h2>From product <em>to port.</em></h2>
        <p>International trade calls for more than a destination. It takes clear requirements, good communication and a shipping plan built around the order.</p>
        <Link to="/global-trade" className="ed-btn ed-btn-outline">Explore trade routes <ArrowUpRight size={18}/></Link>
      </div>
    </section>

    <section className="ed-process">
      <div className="ed-container">
        <div className="ed-process-intro" data-ed-reveal><div className="ed-section-label">04 / HOW WE WORK</div><h2>Practical from <em>day one.</em></h2><p>A straightforward conversation is often the best place to begin.</p></div>
        <div className="ed-process-grid">{steps.map(item => <div className="ed-process-card" data-ed-reveal key={item.no}>
          <div className="ed-process-top"><span>{item.no}</span><item.icon size={26} strokeWidth={1.5}/></div>
          <h3>{item.title}</h3><p>{item.text}</p>
        </div>)}</div>
      </div>
    </section>

    <section className="ed-contact">
      <div className="ed-container ed-contact-grid">
        <div className="ed-contact-image" data-ed-reveal><img src="/images/panels/panel-2-sourcing.jpg" loading="lazy" alt="Indian sourcing and logistics"/></div>
        <div className="ed-contact-copy" data-ed-reveal><div className="ed-section-label">05 / LET'S CONNECT</div>
          <h2>Looking for a <em>trade partner?</em></h2>
          <p>Tell us what you want to export or source. Start with the product, quantity and destination.</p>
          <Link className="ed-btn ed-btn-blue" to="/contact">Start a conversation <ArrowUpRight size={18}/></Link>
          <small>INDIAN PRODUCTS · INTERNATIONAL POSSIBILITIES</small>
        </div>
      </div>
    </section>
  </div>
}
