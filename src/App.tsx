import React, { useState, useEffect } from 'react'
import './styles/premium-responsive.css'
import { RouteMotion } from '@/components/common/RouteMotion'
import './mobile-site-navigation.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { CursorProvider } from '@/context/CursorContext'
import { CustomCursor } from '@/components/common/CustomCursor'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
const HomePage = React.lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const AboutPage = React.lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ProductsPage = React.lazy(() => import('@/pages/ProductsPage').then(m => ({ default: m.ProductsPage })))
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })))
const GlobalTradePage = React.lazy(() => import('@/pages/GlobalTradePage').then(m => ({ default: m.GlobalTradePage })))
const GalleryPage = React.lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })))
const ContactPage = React.lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const UnderstandDashboardPage = React.lazy(() => import('@/pages/UnderstandDashboardPage').then(m => ({ default: m.UnderstandDashboardPage })))
import Lenis from 'lenis'

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false)

  const handleComplete = () => {
    setHasLoaded(true)
  }

  const triggerReplayIntro = () => {
    setHasLoaded(false)
  }

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Touch devices use native scrolling: no wheel smoothing, no touch blocking.
    const touchViewport = window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
    if (prefersReducedMotion || touchViewport) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <ThemeProvider>
      <CursorProvider>
        <BrowserRouter>
          {/* Subtle desktop follower cursor */}
          <CustomCursor />
          <RouteMotion />

          {/* Cinematic Opening Loading Screen */}
          {!hasLoaded && <LoadingScreen onComplete={handleComplete} />}

          {/* App Shell */}
          <div className="flex flex-col min-h-screen bg-canvas text-primary-text selection:bg-accent selection:text-white relative">
            {/* Floating Glassmorphism Navigation */}
            <Navigation />

            {/* Main Multi-page Routes */}
            <main className="flex-1">
              <React.Suspense fallback={
                <div className="min-h-[55svh] flex items-center justify-center pt-28 text-slate-500" role="status" aria-live="polite">
                  <span className="px-5 py-3 rounded-full border border-slate-200 bg-white/70 text-sm">Loading page…</span>
                </div>
              }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/global-trade" element={<GlobalTradePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/understand-dashboard" element={<UnderstandDashboardPage />} />
                <Route path="/dashboard" element={<UnderstandDashboardPage />} />
                <Route path="/architecture" element={<UnderstandDashboardPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              </React.Suspense>
            </main>

            {/* Editorial Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </CursorProvider>
    </ThemeProvider>
  )
}
