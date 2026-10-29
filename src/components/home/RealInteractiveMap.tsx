import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Layers, ZoomIn, ZoomOut, Compass, MapPin, Radio } from 'lucide-react'

// Served Countries & Global Trade Gateways
export interface ServedCountryPoint {
  id: string
  country: string
  hubName: string
  code: string
  lat: number
  lng: number
  isOrigin?: boolean
  transitDays: string
  commodities: string
  frequency: string
}

export const SERVED_COUNTRIES: ServedCountryPoint[] = [
  {
    id: 'india',
    country: 'India',
    hubName: 'Mundra & JNPT (Mumbai)',
    code: 'IN',
    lat: 21.0,
    lng: 73.0,
    isOrigin: true,
    transitDays: 'Origin Hub',
    commodities: 'Dehydrated Agro, Spices, 1121 Basmati Rice, Vitrified Porcelain, Eco Ware',
    frequency: 'Continuous 24/7 Loading Berths',
  },
  {
    id: 'uae',
    country: 'United Arab Emirates',
    hubName: 'Jebel Ali (Dubai)',
    code: 'AE',
    lat: 25.01,
    lng: 55.06,
    transitDays: '5 Days',
    commodities: 'Dehydrated Onions & Garlic, Whole Spices, Basmati, Morbi Vitrified Tiles',
    frequency: 'Weekly Express Sailings',
  },
  {
    id: 'saudi',
    country: 'Saudi Arabia',
    hubName: 'King Abdulaziz Port (Dammam)',
    code: 'SA',
    lat: 26.43,
    lng: 50.10,
    transitDays: '6 Days',
    commodities: 'Basmati Rice, Cumin Seeds, Dehydrated Vegetables',
    frequency: 'Bi-Weekly Direct Liner',
  },
  {
    id: 'netherlands',
    country: 'Netherlands (EU)',
    hubName: 'Port of Rotterdam',
    code: 'NL',
    lat: 51.95,
    lng: 4.14,
    transitDays: '20 Days',
    commodities: 'Spray-Dried Mango Powders, Organic Turmeric, Areca Biodegradable Ware',
    frequency: 'Weekly Direct Container Sailings',
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    hubName: 'Southampton & London Gateway',
    code: 'GB',
    lat: 50.90,
    lng: -1.40,
    transitDays: '22 Days',
    commodities: 'Aged Basmati Rice, Dehydrated Agro, Architectural Tiles',
    frequency: 'Weekly Scheduled Service',
  },
  {
    id: 'germany',
    country: 'Germany',
    hubName: 'Port of Hamburg',
    code: 'DE',
    lat: 53.54,
    lng: 9.98,
    transitDays: '21 Days',
    commodities: 'BRCGS Certified Garlic, Ground Spices, Sesame Seeds',
    frequency: 'Weekly Container Service',
  },
  {
    id: 'usa',
    country: 'United States',
    hubName: 'Port of New York & New Jersey',
    code: 'US',
    lat: 40.67,
    lng: -74.04,
    transitDays: '26 Days',
    commodities: 'USFDA Dehydrated Onion Flakes, Vitrified Slabs, Cotton, Spices',
    frequency: 'Weekly Trans-Oceanic Express',
  },
  {
    id: 'canada',
    country: 'Canada',
    hubName: 'Port of Vancouver',
    code: 'CA',
    lat: 49.28,
    lng: -123.12,
    transitDays: '28 Days',
    commodities: 'Specialty Spices, Extra-Long Basmati, Wall & Floor Tiles',
    frequency: 'Bi-Weekly Liner Connection',
  },
  {
    id: 'singapore',
    country: 'Singapore',
    hubName: 'Port of Singapore (PSA)',
    code: 'SG',
    lat: 1.28,
    lng: 103.85,
    transitDays: '8 Days',
    commodities: 'Hulled Sesame Seeds, Dehydrated Spices, Basmati, Castings',
    frequency: 'Weekly ASEAN Hub Feeders',
  },
  {
    id: 'japan',
    country: 'Japan',
    hubName: 'Yokohama / Tokyo Bay',
    code: 'JP',
    lat: 35.44,
    lng: 139.65,
    transitDays: '15 Days',
    commodities: 'Pure Spice Oleoresins, Dehydrated Powders, Agro Commodities',
    frequency: 'Bi-Weekly Direct Service',
  },
  {
    id: 'australia',
    country: 'Australia',
    hubName: 'Port Botany (Sydney)',
    code: 'AU',
    lat: -33.86,
    lng: 151.20,
    transitDays: '24 Days',
    commodities: 'Vitrified Porcelain Tiles, Whole Grains, Organic Spices',
    frequency: 'Fortnightly Container Line',
  },
  {
    id: 'vietnam',
    country: 'Vietnam',
    hubName: 'Ho Chi Minh City (Cat Lai)',
    code: 'VN',
    lat: 10.76,
    lng: 106.66,
    transitDays: '10 Days',
    commodities: 'Agricultural Raw Commodities, Ceramic Slabs',
    frequency: 'Weekly Feeder Service',
  },
  {
    id: 'egypt',
    country: 'Egypt',
    hubName: 'Port Said (Suez Canal)',
    code: 'EG',
    lat: 31.26,
    lng: 32.30,
    transitDays: '12 Days',
    commodities: 'Transit Agro Cargo, Bulk Spices, Raw Minerals',
    frequency: 'Weekly Med-Red Sea Sailings',
  },
]

interface RealInteractiveMapProps {
  onCountrySelect?: (country: ServedCountryPoint) => void
}

export const RealInteractiveMap: React.FC<RealInteractiveMapProps> = ({
  onCountrySelect,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [mapType, setMapType] = useState<'ocean' | 'satellite' | 'osm'>('ocean')
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  // Clean Public Tile Layer URLs
  const TILE_URLS = {
    ocean: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  }

  const ATTRIBUTIONS = {
    ocean: '&copy; Esri, GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org',
    satellite: '&copy; Esri, Maxar, Earthstar Geographics',
    osm: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initialCenter: [number, number] = [25.0, 50.0]
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 3,
      minZoom: 2,
      maxZoom: 9,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
    })

    const initialTile = L.tileLayer(TILE_URLS.ocean, {
      attribution: ATTRIBUTIONS.ocean,
      maxZoom: 18,
    }).addTo(map)

    tileLayerRef.current = initialTile
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // 2. Handle Map Type Toggle (Ocean vs Satellite vs OSM)
  useEffect(() => {
    if (!mapRef.current) return

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current)
    }

    const newTile = L.tileLayer(TILE_URLS[mapType], {
      attribution: ATTRIBUTIONS[mapType],
      maxZoom: 18,
    }).addTo(mapRef.current)

    tileLayerRef.current = newTile
  }, [mapType])

  // 3. Render Served Country Points with Permanent Country Names
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Clear previous markers
    markersRef.current.forEach((m) => map.removeLayer(m))
    markersRef.current = []

    SERVED_COUNTRIES.forEach((c) => {
      const isOrigin = !!c.isOrigin

      // Clean, High-Contrast Country Point with Visible Country Label
      const iconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer pointer-events-auto -translate-x-1/2 -translate-y-1/2 group">
          <!-- Outer Pulsing Sonar Ring -->
          <div class="absolute w-7 h-7 rounded-full ${
            isOrigin ? 'bg-[#1557B0]/25' : 'bg-emerald-500/25'
          } animate-ping pointer-events-none"></div>

          <!-- Solid Pin Dot -->
          <div class="relative w-4 h-4 rounded-full ${
            isOrigin
              ? 'bg-[#1557B0] ring-3 ring-white shadow-xl'
              : 'bg-emerald-600 ring-3 ring-white shadow-xl'
          } flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>

          <!-- Visible Country Name Pill -->
          <div class="mt-1 whitespace-nowrap">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-tech font-extrabold ${
              isOrigin
                ? 'bg-[#1557B0] text-white shadow-lg border border-white/50'
                : 'bg-white/95 text-slate-900 shadow-md border border-slate-300/80'
            } backdrop-blur-md transition-transform duration-200 group-hover:scale-110">
              ${c.country}
            </span>
          </div>
        </div>
      `

      const customIcon = L.divIcon({
        className: 'country-marker-pin',
        html: iconHtml,
        iconSize: [110, 40],
        iconAnchor: [55, 10],
      })

      const marker = L.marker([c.lat, c.lng], { icon: customIcon }).addTo(map)

      // Glassmorphic Info Popup
      const popupContent = `
        <div style="font-family: 'Space Grotesk', system-ui, sans-serif; padding: 4px 6px; min-width: 230px; color: #0F172A;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 8px;">
            <span style="font-size: 11px; font-weight: 800; color: #1557B0; letter-spacing: 0.05em; text-transform: uppercase;">
              ${c.code} · ${isOrigin ? 'PRIMARY EXPORT HUB' : 'SERVED DESTINATION'}
            </span>
            <span style="font-size: 9px; font-weight: 700; background: ${
              isOrigin ? '#DBEAFE' : '#DEF7EC'
            }; color: ${isOrigin ? '#1E40AF' : '#03543F'}; padding: 2px 7px; border-radius: 9999px;">
              ACTIVE
            </span>
          </div>
          <h4 style="font-size: 15px; font-weight: 800; margin: 0 0 3px 0; color: #0F172A;">
            ${c.country}
          </h4>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 8px 0; font-weight: 600;">
            Primary Terminal: <span style="color: #0F172A;">${c.hubName}</span>
          </p>
          <div style="background: #F8FAFC; padding: 7px 8px; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 8px; font-size: 10px;">
            <span style="color: #64748B; display: block; font-weight: 700; margin-bottom: 2px;">PRIMARY COMMODITIES SERVED:</span>
            <strong style="color: #0F172A; line-height: 1.4;">${c.commodities}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 10px; font-family: monospace; color: #475569;">
            <span>TRANSIT: <strong style="color: #1557B0;">${c.transitDays}</strong></span>
            <span>${c.frequency}</span>
          </div>
        </div>
      `

      marker.bindPopup(popupContent, {
        className: 'custom-glass-popup',
        closeButton: true,
      })

      marker.on('click', () => {
        marker.openPopup()
        if (onCountrySelect) onCountrySelect(c)
      })

      markersRef.current.push(marker)
    })
  }, [onCountrySelect])

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] md:h-[510px] rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 bg-[#E8EEF5]">
      {/* Real Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0 select-none" />

      {/* Floating Light-Theme HUD Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        {/* Layer Selector */}
        <div className="inline-flex rounded-full bg-white/95 backdrop-blur-md p-1 border border-slate-200/90 shadow-lg text-xs font-tech font-bold text-slate-700">
          <button
            type="button"
            onClick={() => setMapType('ocean')}
            className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              mapType === 'ocean'
                ? 'bg-[#1557B0] text-white shadow-xs'
                : 'hover:text-[#1557B0]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Ocean Basemap</span>
          </button>
          <button
            type="button"
            onClick={() => setMapType('satellite')}
            className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              mapType === 'satellite'
                ? 'bg-[#1557B0] text-white shadow-xs'
                : 'hover:text-[#1557B0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Satellite Orbital</span>
          </button>
          <button
            type="button"
            onClick={() => setMapType('osm')}
            className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              mapType === 'osm'
                ? 'bg-[#1557B0] text-white shadow-xs'
                : 'hover:text-[#1557B0]'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Political Map</span>
          </button>
        </div>

        {/* Global Reach Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg font-tech text-xs text-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-[#1557B0]">CURRENT SERVICE:</span>
          <span className="font-extrabold text-slate-900">13 Core Sovereign Gateways</span>
        </div>
      </div>

      {/* Floating Navigation Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="Zoom In"
          className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center justify-center font-bold text-base transition-transform hover:scale-110 active:scale-90 cursor-pointer"
        >
          <ZoomIn className="w-4 h-4 text-[#1557B0]" />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="Zoom Out"
          className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-800 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center justify-center font-bold text-base transition-transform hover:scale-110 active:scale-90 cursor-pointer"
        >
          <ZoomOut className="w-4 h-4 text-[#1557B0]" />
        </button>
      </div>

      {/* Subtle Bottom-Left Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-4 text-[11px] font-tech font-bold text-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1557B0] ring-2 ring-white"></span>
          <span>India (Origin)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-white"></span>
          <span>Served Countries</span>
        </div>
      </div>
    </div>
  )
}
