import React, { useEffect, useSyncExternalStore } from 'react'
import { MobileHomeExperience } from '@/components/home/MobileHomeExperience'
import { HeroSection } from '@/components/home/HeroSection'
import { StackedTemplatePanels } from '@/components/home/StackedTemplatePanels'
import { DraggableProductShowcase } from '@/components/home/DraggableProductShowcase'
import { MaritimeInMotion } from '@/components/home/MaritimeInMotion'
import { CompanyEditorial } from '@/components/home/CompanyEditorial'
import { InteractiveTradeMap } from '@/components/home/InteractiveTradeMap'
import { ClosingCta } from '@/components/home/ClosingCta'

const MOBILE_VIEWPORT = '(max-width: 1023px)'

const subscribeViewport = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE_VIEWPORT)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const isMobileViewport = () => window.matchMedia(MOBILE_VIEWPORT).matches

export const HomePage: React.FC = () => {
  const isMobile = useSyncExternalStore(subscribeViewport, isMobileViewport, () => false)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'PHONIX GLOBAL TRADE | International Maritime Commerce'
  }, [])

  if (isMobile) return <MobileHomeExperience />

  return (
    <div className="relative overflow-x-clip">
      {/* 1. Fullscreen Cinematic Hero (Phase 4 & 5) */}
      <HeroSection />

      {/* 2. Pinned Fullscreen Editorial Scenes (Phase 6) */}
      <StackedTemplatePanels />

      {/* 3. Carysil-Inspired Draggable Product Showcase (Phase 7) */}
      <DraggableProductShowcase />

      {/* 4. Film & Motion Showcase: "Maritime In Motion" (Phase 8) */}
      <MaritimeInMotion />

      {/* 5. Editorial Corporate Governance & Philosophy */}
      <CompanyEditorial />

      {/* 6. Interactive 2D Maritime Cartography */}
      <InteractiveTradeMap />

      {/* 7. Closing High-Impact Commercial Action */}
      <ClosingCta />
    </div>
  )
}
