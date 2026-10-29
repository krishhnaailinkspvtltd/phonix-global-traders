import React, { useEffect, useSyncExternalStore } from 'react'
import { MobileHomeExperience } from '@/components/home/MobileHomeExperience'
import { EditorialDesktopHome } from '@/components/home/EditorialDesktopHome'
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

  return <EditorialDesktopHome />
}
