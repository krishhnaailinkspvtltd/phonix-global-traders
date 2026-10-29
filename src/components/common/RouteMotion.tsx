import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Lightweight scroll reveals for editorial interior pages.
 * Never hides content before JS runs and respects reduced motion.
 * Keeps homepage's handcrafted GSAP/Motion effects untouched.
 */
export function RouteMotion() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!pathname || pathname === '/') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(
      '.site-inner-page > section, .site-inner-page > div.max-w-7xl > section, .site-inner-page > div.max-w-7xl > div.grid'
    ))
    const animated = new WeakSet<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || animated.has(entry.target)) continue
        animated.add(entry.target)
        observer.unobserve(entry.target)
        const element = entry.target as HTMLElement
        element.animate(
          [{ opacity: 0.83, transform: 'translate3d(0, 17px, 0)' },
           { opacity: 1, transform: 'translate3d(0, 0, 0)' }],
          { duration: 710, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' }
        )
      }
    }, { threshold: 0.075, rootMargin: '0px 0px -24px 0px' })
    nodes.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
