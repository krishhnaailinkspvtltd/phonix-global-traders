import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Globe2, MapPin, MoveUpRight, Ship, Sparkles } from 'lucide-react'
import './mobile-home.css'

const HERO_SLIDES = [
  {
    kicker: 'INDIAN ORIGINS / GLOBAL HORIZONS',
    lineOne: 'FROM INDIA.',
    lineTwo: 'To everywhere.',
    description: 'Exceptional Indian produce, spices and manufactured goods — connected to markets around the world.',
    image: '/images/hero/hero-vessel.jpg',
    alt: 'Ocean-going container vessel',
    primary: '/products',
    primaryText: 'Explore our exports',
  },
  {
    kicker: 'SOURCING / SHIPPING / CONNECTIONS',
    lineOne: 'BUILT TO',
    lineTwo: 'cross borders.',
    description: 'From the agricultural heartlands of India to international supply chains, every connection matters.',
    image: '/images/hero/hero-port.jpg',
    alt: 'Busy international container port',
    primary: '/global-trade',
    primaryText: 'Our trade routes',
  },
  {
    kicker: 'EXPORTS & IMPORTS / ONE NETWORK',
    lineOne: 'WORLDWIDE',
    lineTwo: 'by nature.',
    description: 'Discover how our export and import divisions bring products, people and opportunities together.',
    image: '/images/trade/trade-corridor.jpg',
    alt: 'Maritime global trade corridor',
    primary: '/contact',
    primaryText: 'Start a conversation',
  },
]

const COLLECTION = [
  {
    number: '01',
    category: 'DEHYDRATED AGRO',
    name: 'Nature, preserved.',
    detail: 'Onion flakes, garlic, fruit powders and more.',
    image: '/images/products/dehydrated-onion.jpg',
    path: '/products?category=dehydrated-agro',
  },
  {
    number: '02',
    category: 'SPICES & GRAINS',
    name: 'The taste of India.',
    detail: 'Turmeric, chilies, cumin and aged Basmati.',
    image: '/images/products/turmeric-curcumin.jpg',
    path: '/products?category=spices-commodities',
  },
  {
    number: '03',
    category: 'MADE IN INDIA',
    name: 'Crafted to travel.',
    detail: 'Morbi ceramics and sustainable manufactured goods.',
    image: '/images/products/morbi-tiles.jpg',
    path: '/products?category=manufactured-goods',
  },
  {
    number: '04',
    category: 'GLOBAL IMPORTS',
    name: 'Worlds of possibility.',
    detail: 'International agricultural and industrial sourcing.',
    image: '/images/products/california-almonds.jpg',
    path: '/products?category=global-imports',
  },
]

export const MobileHomeExperience: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const heroTouch = useRef<{ x: number; y: number } | null>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveSlide(current => (current + 1) % HERO_SLIDES.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [prefersReducedMotion])

  useEffect(() => {
    const root = homeRef.current
    if (!root || !('IntersectionObserver' in window) || prefersReducedMotion) return
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mx-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' })
    elements.forEach(element => observer.observe(element))
    root.classList.add('mx-motion-ready')
    return () => {
      observer.disconnect()
      root.classList.remove('mx-motion-ready')
    }
  }, [prefersReducedMotion])

  const chooseSlide = (index: number) => setActiveSlide((index + HERO_SLIDES.length) % HERO_SLIDES.length)

  const handleHeroTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    heroTouch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }
  }

  const handleHeroTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const start = heroTouch.current
    heroTouch.current = null
    if (!start) return
    const dx = event.changedTouches[0].clientX - start.x
    const dy = event.changedTouches[0].clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      setActiveSlide(current => (current + (dx < 0 ? 1 : -1) + HERO_SLIDES.length) % HERO_SLIDES.length)
    }
  }

  const moveRail = (direction: number) => {
    const rail = railRef.current
    if (!rail) return
    const items = Array.from(rail.querySelectorAll<HTMLElement>('.mx-product-card'))
    const nextIndex = Math.min(COLLECTION.length - 1, Math.max(0, activeCard + direction))
    const target = items[nextIndex]
    if (target) {
      rail.scrollTo({ left: target.offsetLeft - items[0].offsetLeft, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      setActiveCard(nextIndex)
    }
  }

  const handleRailScroll = () => {
    const rail = railRef.current
    if (!rail) return
    const items = Array.from(rail.querySelectorAll<HTMLElement>('.mx-product-card'))
    const position = rail.scrollLeft + (items[0]?.offsetLeft ?? 0)
    let closest = 0
    let distance = Number.POSITIVE_INFINITY
    items.forEach((item, index) => {
      const delta = Math.abs(item.offsetLeft - position)
      if (delta < distance) { distance = delta; closest = index }
    })
    setActiveCard(closest)
  }

  const current = HERO_SLIDES[activeSlide]

  return (
    <div className="mx-home" ref={homeRef}>
      <section
        className="mx-hero"
        aria-label="Welcome to Phonix Global Trade"
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        <div className="mx-hero-media" aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.img
              key={current.image}
              src={current.image}
              alt=""
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.05, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="mx-hero-vignette" />
        </div>

        <div className="mx-hero-content" key={activeSlide}>
          <div className="mx-eyebrow mx-eyebrow-light">
            <span className="mx-live-dot" />
            <span>{current.kicker}</span>
          </div>
          <h1 className="mx-hero-heading">
            <span className="mx-heading-solid">{current.lineOne}</span>
            <span className="mx-heading-serif">{current.lineTwo}</span>
          </h1>
          <p className="mx-hero-description">{current.description}</p>
          <div className="mx-hero-actions">
            <Link to={current.primary} className="mx-button mx-button-bright">
              <span>{current.primaryText}</span><ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/about" className="mx-button mx-button-glass">Our story <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="mx-hero-bottom">
          <div className="mx-slide-controllers" aria-label="Hero slides">
            <button type="button" className="mx-hero-arrow" onClick={() => chooseSlide(activeSlide - 1)} aria-label="Previous featured story"><ArrowLeft size={18} /></button>
            <button type="button" className="mx-hero-arrow" onClick={() => chooseSlide(activeSlide + 1)} aria-label="Next featured story"><ArrowRight size={18} /></button>
          </div>
          <div className="mx-hero-progress" aria-label="Slide position">
            {HERO_SLIDES.map((slide, index) => (
              <button key={slide.kicker} type="button" className={index === activeSlide ? 'mx-progress-item mx-current' : 'mx-progress-item'} onClick={() => chooseSlide(index)} aria-label={'Show story ' + (index + 1)} aria-current={index === activeSlide ? 'true' : undefined}>
                {index === activeSlide && <span key={activeSlide} className="mx-progress-fill" />}
              </button>
            ))}
          </div>
          <a href="#discover-phonix" className="mx-scroll-cue" aria-label="Scroll to discover Phonix"><ArrowDown size={16} /><span>SCROLL TO DISCOVER</span></a>
        </div>
      </section>

      <section className="mx-intro" id="discover-phonix">
        <div className="mx-section-header" data-reveal>
          <div className="mx-section-kicker"><span className="mx-small-line" /> THE WORLD, CONNECTED</div>
          <h2 className="mx-editorial-heading">From Indian soil <em>to global shelves.</em></h2>
          <p>From India’s farms and factories to international markets, we move products with purpose. Explore a new perspective on global trade.</p>
        </div>
        <div className="mx-intro-visual" data-reveal>
          <img src="/images/about/about-editorial-1.jpg" loading="lazy" alt="International trade and sourcing operations" />
          <div className="mx-image-plate"><Globe2 size={17} /><span>INDIA ⇄ THE WORLD</span><MoveUpRight size={17} /></div>
        </div>
        <div className="mx-intro-caption" data-reveal>
          <span>01 / OUR APPROACH</span>
          <Link to="/about">Discover Phonix <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <section className="mx-collection" aria-label="Explore our products">
        <div className="mx-section-header mx-collection-header" data-reveal>
          <div className="mx-section-kicker"><span className="mx-small-line" /> THE COLLECTION</div>
          <h2 className="mx-editorial-heading">Explore our <em>products.</em></h2>
          <p>Our export and import categories, thoughtfully sourced and ready for global opportunities.</p>
        </div>
        <div className="mx-drag-hint" data-reveal><span>SWIPE TO EXPLORE</span><ArrowRight size={18} /></div>
        <div className="mx-product-rail" ref={railRef} onScroll={handleRailScroll} aria-label="Swipeable product categories">
          {COLLECTION.map((item) => (
            <article className="mx-product-card" key={item.number}>
              <Link to={item.path} className="mx-product-link" aria-label={'Explore ' + item.category}>
                <img src={item.image} alt={item.category} loading="lazy" />
                <div className="mx-product-shade" />
                <span className="mx-product-top"><span>{item.number} / 04</span><span className="mx-card-icon"><ArrowUpRight size={19} /></span></span>
                <div className="mx-product-details">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.detail}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="mx-collection-footer" data-reveal>
          <div className="mx-rail-count"><strong>0{activeCard + 1}</strong><span>/ 0{COLLECTION.length}</span></div>
          <div className="mx-rail-controls">
            <button type="button" onClick={() => moveRail(-1)} disabled={activeCard === 0} aria-label="Previous category"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => moveRail(1)} disabled={activeCard === COLLECTION.length - 1} aria-label="Next category"><ArrowRight size={18} /></button>
          </div>
        </div>
        <Link className="mx-text-link" to="/products">VIEW ALL PRODUCTS <ArrowUpRight size={17} /></Link>
      </section>

      <section className="mx-maritime" aria-label="Maritime logistics">
        <div className="mx-maritime-image" aria-hidden="true">
          <img src="/images/hero/hero-port.jpg" alt="" loading="lazy" />
          <div />
        </div>
        <div className="mx-maritime-content">
          <div className="mx-section-kicker mx-section-kicker-light" data-reveal><span className="mx-small-line" /> MOVEMENT IS EVERYTHING</div>
          <h2 className="mx-maritime-heading" data-reveal>Across oceans.<br /><em>Beyond borders.</em></h2>
          <p data-reveal>Building bridges between Indian production and global demand — from the first conversation to the final port.</p>
          <div className="mx-process">
            <div className="mx-process-row" data-reveal><span>01</span><div><strong>Discover & source</strong><small>Products selected for your market.</small></div><Sparkles size={18} /></div>
            <div className="mx-process-row" data-reveal><span>02</span><div><strong>Coordinate & connect</strong><small>Trade planning across borders.</small></div><Globe2 size={18} /></div>
            <div className="mx-process-row" data-reveal><span>03</span><div><strong>Ship & deliver</strong><small>Maritime corridors to your destination.</small></div><Ship size={18} /></div>
          </div>
          <Link to="/global-trade" className="mx-button mx-button-glass mx-maritime-cta">Explore our network <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <section className="mx-map-story">
        <div className="mx-section-header" data-reveal>
          <div className="mx-section-kicker"><span className="mx-small-line" /> IN MOTION WORLDWIDE</div>
          <h2 className="mx-editorial-heading">From origin <em>to destination.</em></h2>
          <p>A connected outlook, with Indian export gateways reaching across regions and continents.</p>
        </div>
        <Link to="/global-trade" className="mx-map-card" data-reveal>
          <img src="/images/trade/trade-corridor.jpg" loading="lazy" alt="International maritime corridor" />
          <span className="mx-map-shade" />
          <span className="mx-map-pin"><MapPin size={16} /> EXPLORE TRADE ROUTES</span>
          <span className="mx-map-arrow"><ArrowUpRight size={24} /></span>
        </Link>
        <div className="mx-corridors" data-reveal><span>MUNDRA</span><span>•</span><span>JNPT</span><span>•</span><span>WORLDWIDE</span></div>
      </section>

      <section className="mx-outro" aria-label="Begin your trade enquiry">
        <div className="mx-outro-photo"><img src="/images/panels/panel-4-markets.jpg" loading="lazy" alt="" /><span /></div>
        <div className="mx-outro-content" data-reveal>
          <div className="mx-section-kicker mx-section-kicker-light"><span className="mx-small-line" /> MAKE THE CONNECTION</div>
          <h2>Let’s talk<br /><em>trade.</em></h2>
          <p>Looking to export from India or source internationally? Start with a conversation.</p>
          <Link to="/contact" className="mx-button mx-button-bright mx-outro-button">Start an inquiry <ArrowUpRight size={19} /></Link>
          <span className="mx-outro-foot">PHONIX GLOBAL TRADE · IMPORT & EXPORT</span>
        </div>
      </section>
    </div>
  )
}
