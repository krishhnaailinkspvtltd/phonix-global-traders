import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface PanelScene {
  num: string
  tag: string
  title: string
  subTitle: string
  desc: string
  image: string
  link: string
  linkText: string
}

const SCENES: PanelScene[] = [
  {
    num: '01',
    tag: 'INDIGENOUS HARVEST EXPORTS',
    title: 'DEHYDRATED VEGETABLES',
    subTitle: '& Pure Fruits.',
    desc: 'Gujarat & Maharashtra processing plants exporting premium dehydrated white/red onion flakes, minced garlic granules, ginger, and spray-dried fruit powders under USFDA and BRCGS accreditation.',
    image: '/images/products/dehydrated-onion.jpg',
    link: '/products',
    linkText: 'INSPECT DEHYDRATED AGRO',
  },
  {
    num: '02',
    tag: 'SPICES & BASMATI EXPORTS',
    title: 'AUTHENTIC INDIAN SPICES',
    subTitle: '& 1121 Basmati.',
    desc: 'Direct farm-gate sourcing of world-renowned Guntur Teja red chilies, high-curcumin Alleppey turmeric, cumin seeds, and aged 1121 steam Basmati rice certified by APEDA and Spices Board of India.',
    image: '/images/products/turmeric-curcumin.jpg',
    link: '/products?category=spices-commodities',
    linkText: 'VIEW SPICES & GRAINS',
  },
  {
    num: '03',
    tag: 'MANUFACTURED IN INDIA',
    title: 'ENGINEERED GOODS',
    subTitle: 'Vitrified & Eco-Ware.',
    desc: 'Exporting India’s premier manufactured goods: Morbi vitrified architectural porcelain tiles, zero-plastic biodegradable Areca palm leaf dinnerware, and organic combed cotton textiles.',
    image: '/images/products/morbi-tiles.jpg',
    link: '/products?category=manufactured-goods',
    linkText: 'EXPLORE MANUFACTURED',
  },
  {
    num: '04',
    tag: 'GLOBAL COMMODITY IMPORTS',
    title: 'INTERNATIONAL IMPORTS',
    subTitle: 'Sourcing Worldwide.',
    desc: 'Meeting domestic Indian demand through direct bilateral import of California in-shell almonds, African raw cashew nuts (RCN), Australian yellow lentils, and Middle Eastern petrochemical resins.',
    image: '/images/products/california-almonds.jpg',
    link: '/products?category=global-imports',
    linkText: 'VIEW IMPORT SOURCING',
  },
  {
    num: '05',
    tag: 'DEEPWATER MARITIME DISPATCH',
    title: 'MUNDRA & JNPT HUBS',
    subTitle: 'To 60+ Nations.',
    desc: 'Direct containerized sea freight connecting India’s premier deepwater export gateways with weekly liner schedules to GCC, Europe, Americas, and Southeast Asia.',
    image: '/images/hero/hero-port.jpg',
    link: '/contact',
    linkText: 'INITIATE TRADE INQUIRY',
  },
]

export const StackedTemplatePanels: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinWrapRef = useRef<HTMLDivElement>(null)
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Desktop GSAP ScrollTrigger Pinned Sequence
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinWrapRef.current,
        anticipatePin: 1,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      // Scene 1 is visible by default.
      // Transition to Scene 2 (0.00 -> 0.25): Scene 2 slides over Scene 1 via animated clipPath
      const s2 = sceneRefs.current[1]
      if (s2) {
        tl.fromTo(
          s2,
          { clipPath: 'inset(0% 0% 0% 100%)', opacity: 1 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1, ease: 'none' }
        )
      }

      // Transition to Scene 3 (0.25 -> 0.50): Scene 3 slides from the right, Scene 2 shifts slightly left
      const s3 = sceneRefs.current[2]
      if (s3) {
        tl.to(s2, { xPercent: -20, opacity: 0.4, duration: 0.8, ease: 'none' }, '+=0.2')
        tl.fromTo(
          s3,
          { xPercent: 100, opacity: 1 },
          { xPercent: 0, opacity: 1, duration: 1, ease: 'none' },
          '<'
        )
      }

      // Transition to Scene 4 (0.50 -> 0.75): Scene 4 rises from bottom with parallax text
      const s4 = sceneRefs.current[3]
      if (s4) {
        tl.to(s3, { yPercent: -15, opacity: 0.4, duration: 0.8, ease: 'none' }, '+=0.2')
        tl.fromTo(
          s4,
          { yPercent: 100, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'none' },
          '<'
        )
      }

      // Transition to Scene 5 (0.75 -> 1.00): Scene 5 expands full-bleed
      const s5 = sceneRefs.current[4]
      if (s5) {
        tl.fromTo(
          s5,
          { scale: 0.94, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1, ease: 'none' },
          '+=0.2'
        )
      }

      return () => {
        pinTrigger.kill()
        tl.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="relative bg-[#07162D] text-white select-none">
      
      {/* DESKTOP PINNED FULLSCREEN SCENE TRACK (450vh total height) */}
      <div ref={containerRef} className="home-scene-track hidden md:block relative h-[450vh]">
        <div
          ref={pinWrapRef}
          className="home-scene-viewport relative w-full h-screen overflow-hidden bg-[#07162D]"
        >
          {SCENES.map((scene, index) => {
            const isFirst = index === 0

            return (
              <div
                key={scene.num}
                ref={(el) => {
                  sceneRefs.current[index] = el
                }}
                className={`absolute inset-0 w-full h-full overflow-hidden flex flex-col justify-between ${
                  isFirst ? 'home-scene z-10' : `home-scene z-${(index + 1) * 10}`
                }`}
                style={{
                  zIndex: (index + 1) * 10,
                  opacity: isFirst ? 1 : 0,
                }}
              >
                {/* Background Fullscreen Photography */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.12]"
                  />
                  {/* Luxury Deep Maritime Blue Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07162D] via-[#07162D]/40 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#07162D]/90 via-[#07162D]/40 to-transparent" />
                </div>

                {/* Top Chapter Breadcrumb Bar */}
                <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pt-8 flex items-center justify-between text-sm font-tech text-white/80">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#66A8FF] animate-pulse" />
                    <span className="tracking-[0.25em] uppercase font-bold text-[#66A8FF]">
                      CHAPTER {scene.num} // {scene.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-white/60 text-xs tracking-widest font-mono">
                    <span>{scene.num}</span>
                    <span>/</span>
                    <span>05</span>
                  </div>
                </div>

                {/* Center / Lower Content: Monumental Photography & Typography */}
                <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-16 sm:pb-20 my-auto">
                  <div className="max-w-3xl space-y-6">
                    
                    <span className="font-tech text-sm uppercase tracking-[0.3em] text-[#66A8FF] font-bold block">
                      {scene.tag}
                    </span>

                    <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.94] uppercase">
                      {scene.title}
                      <span className="block font-editorial font-light italic text-[#EAF3FF] tracking-normal mt-1 text-3xl sm:text-5xl lg:text-6xl">
                        {scene.subTitle}
                      </span>
                    </h2>

                    <p className="text-white/90 font-sans text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal">
                      {scene.desc}
                    </p>

                    <div className="pt-3">
                      <Link
                        to={scene.link}
                        className="px-8 py-4 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-tech text-sm font-bold tracking-wider uppercase transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-[#1557B0]/30 hover:scale-105 active:scale-95 group cursor-pointer"
                      >
                        <span>{scene.linkText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom Architectural Progress Track */}
                <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 pb-6">
                  <div className="h-[2px] w-full bg-white/20 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-[#66A8FF] transition-all duration-300 rounded-full"
                      style={{ width: `${((index + 1) / SCENES.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MOBILE ALTERNATIVE: Clean Sequential Full-Bleed Scenes */}
      <div className="md:hidden divide-y divide-[#244368]">
        {SCENES.map((scene) => (
          <div key={scene.num} className="relative py-20 px-6 overflow-hidden min-h-[550px] flex flex-col justify-end">
            <div className="absolute inset-0 z-0">
              <img
                src={scene.image}
                alt={scene.title}
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07162D] via-[#07162D]/60 to-black/30" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-sm font-tech text-[#66A8FF] font-semibold">
                <span>CHAPTER {scene.num}</span>
                <span>•</span>
                <span>{scene.tag}</span>
              </div>

              <h2 className="font-display text-3xl font-black text-white leading-tight uppercase">
                {scene.title}
                <span className="block font-editorial font-light italic text-[#EAF3FF] text-2xl mt-0.5">
                  {scene.subTitle}
                </span>
              </h2>

              <p className="text-white/85 font-sans text-base leading-relaxed">
                {scene.desc}
              </p>

              <div className="pt-2">
                <Link
                  to={scene.link}
                  className="px-7 py-3.5 rounded-full bg-[#1557B0]/85 hover:bg-[#1557B0] backdrop-blur-md border border-white/40 text-white font-tech text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>{scene.linkText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
