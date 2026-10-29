export interface TradePanel {
  id: string
  number: string
  tag: string
  title: string
  italicTitle?: string
  description: string
  metrics: { label: string; value: string }[]
  image: string
  accentColor?: string
}

export interface ProductCategory {
  id: string
  index: string
  name: string
  subhead: string
  description: string
  itemCount: number
  keyCommodities: string[]
  image: string
}

export interface ProductItem {
  id: string
  slug: string
  category: string
  categoryId: string
  title: string
  tagline: string
  description: string
  image: string
  secondaryImages: string[]
  hsCode: string
  originHub: string
  primaryMarkets: string[]
  moq: string
  packaging: string
  leadTime: string
  specifications: { key: string; value: string }[]
  complianceStandards: string[]
}

export interface TradeRoute {
  id: string
  name: string
  origin: string
  destination: string
  transitDays: number
  primaryCargo: string
  keyHubs: string[]
  volumeAnnual: string
  coordinates: { x: number; y: number }[]
  status: 'OPTIMAL' | 'CONGESTED' | 'SEASONAL'
}

export interface GalleryPhoto {
  id: string
  title: string
  category: 'Maritime' | 'Terminals' | 'Freight' | 'Infrastructure'
  location: string
  coordinates: string
  image: string
  aspect: 'wide' | 'tall' | 'square'
}

// 5 Pinned Template-Style Panels for Homepage Section
export const PINNED_TEMPLATE_PANELS: TradePanel[] = [
  {
    id: 'dehydrated-agro',
    number: '01',
    tag: 'INDIGENOUS HARVEST EXPORTS',
    title: 'DEHYDRATED VEGETABLES',
    italicTitle: '& Pure Fruits.',
    description: 'Operating advanced solar and hot-air dehydration facilities across Gujarat and Maharashtra. We export premium dehydrated white/red onion flakes, minced garlic, ginger powder, and spray-dried tropical fruit powders conforming strictly to USFDA and BRCGS international standards.',
    metrics: [
      { label: 'PRODUCE PURITY', value: '100% PURE' },
      { label: 'MOISTURE LEVEL', value: '< 5.0% MAX' },
      { label: 'GLOBAL DESTINATIONS', value: '45+ NATIONS' }
    ],
    image: '/images/products/dehydrated-onion.jpg',
  },
  {
    id: 'spices-basmati',
    number: '02',
    tag: 'AUTHENTIC SPICES & GRAINS',
    title: 'INDIAN SPICES',
    italicTitle: '& Basmati Rice.',
    description: 'Direct farm-gate sourcing of world-renowned Indian agro commodities: Guntur Teja red chilies, high-curcumin Alleppey turmeric, Unjha cumin seeds, green cardamom, and extra-long aged 1121 Basmati rice tested under Spices Board of India and APEDA export protocols.',
    metrics: [
      { label: 'CURCUMIN POTENCY', value: '5.2% MIN' },
      { label: 'BASMATI GRAIN LENGTH', value: '8.35 MM+' },
      { label: 'ASSAYS CERTIFIED', value: 'APEDA / FSSAI' }
    ],
    image: '/images/products/turmeric-curcumin.jpg',
  },
  {
    id: 'manufactured-goods',
    number: '03',
    tag: 'MANUFACTURED IN INDIA',
    title: 'ENGINEERED GOODS',
    italicTitle: '& Eco-Ware.',
    description: 'Promoting Indian industrial craftsmanship worldwide: Morbi vitrified architectural porcelain tiles, zero-plastic biodegradable Areca palm leaf dinnerware, organic combed cotton textiles, and high-precision CNC brass hardware components.',
    metrics: [
      { label: 'CERAMIC HUB EXPORTS', value: 'MORBI, GUJARAT' },
      { label: 'ECO BIODEGRADATION', value: '60-90 DAYS' },
      { label: 'OEKO-TEX CERTIFIED', value: '100% ORGANIC' }
    ],
    image: '/images/products/morbi-tiles.jpg',
  },
  {
    id: 'global-imports',
    number: '04',
    tag: 'GLOBAL SOURCING TO INDIA',
    title: 'INTERNATIONAL',
    italicTitle: 'Import Desks.',
    description: 'Balancing bilateral trade by importing high-demand international agricultural staples: California in-shell almonds, African raw cashew nuts (RCN), Australian yellow lentils, and Middle Eastern petrochemical resins directly into Indian processing belts.',
    metrics: [
      { label: 'IMPORT CHANNELS', value: '18 COUNTRIES' },
      { label: 'CUSTOMS CLEARED', value: '< 24 HOURS' },
      { label: 'QUALITY RETENTION', value: '99.9%' }
    ],
    image: '/images/products/california-almonds.jpg',
  },
  {
    id: 'worldwide-logistics',
    number: '05',
    tag: 'DEEPWATER MARITIME DISPATCH',
    title: 'MUNDRA & JNPT',
    italicTitle: 'To The World.',
    description: 'Containerized liner shipping connecting major Indian deepwater gateways—Mundra, JNPT (Nhava Sheva), Hazira, and Chennai—to premier discharge terminals across the Middle East, Europe, North America, and Southeast Asia with real-time satellite telemetry.',
    metrics: [
      { label: 'EXPORT PORTS', value: 'MUNDRA / JNPT' },
      { label: 'ANNUAL VOLUME', value: '65,000+ TEU' },
      { label: 'DISPATCH VELOCITY', value: 'WEEKLY LINERS' }
    ],
    image: '/images/hero/hero-port.jpg',
  },
]

// 5 Horizontal Scroll Panels for Homepage Section
export const HORIZONTAL_PANELS = [
  {
    id: 'reach',
    num: '01',
    heading: 'Indian Origin to Worldwide Reach',
    sub: 'Direct containerized maritime supply linking Indian farm-gates and manufacturing centers with 60+ countries.',
    image: '/images/gallery/gallery-1.jpg',
    metric: '60+ Countries · 14 Shipping Lines',
  },
  {
    id: 'categories-show',
    num: '02',
    heading: 'Dehydrated Vegetables & Fruits',
    sub: 'Hygienically processed onion flakes, minced garlic, dried ginger, and spray-dried fruit powders with zero moisture.',
    image: '/images/categories/cat-commodity.jpg',
    metric: 'USFDA & BRCGS Certified',
  },
  {
    id: 'solutions',
    num: '03',
    heading: 'Spices, Basmati & Agro Commodities',
    sub: 'Guntur red chilies, turmeric fingers, cumin seeds, and aged 1121 Basmati rice with certified lab assays.',
    image: '/images/panels/panel-2-sourcing.jpg',
    metric: 'APEDA & Spices Board Inspected',
  },
  {
    id: 'logistics-flow',
    num: '04',
    heading: 'Morbi Ceramics & Indian Manufacturing',
    sub: 'Exporting world-class vitrified porcelain tiles, Areca palm leaf tableware, and precision engineered hardware.',
    image: '/images/categories/cat-industrial.jpg',
    metric: 'Zero-Defect Quality Assurance',
  },
  {
    id: 'partnerships',
    num: '05',
    heading: 'Global Sourcing & Import Gateways',
    sub: 'Importing raw cashew nuts, California almonds, and pulses to feed domestic processing hubs.',
    image: '/images/about/about-editorial-1.jpg',
    metric: 'Reliable Bilateral Trade Contracts',
  },
]

// Categories Data
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'dehydrated-agro',
    index: '01',
    name: 'Dehydrated Vegetables & Fruits',
    subhead: 'Solar & Hot-Air Dried Indian Agricultural Produce',
    description: 'Premium Indian dehydrated white/red onion flakes, chopped garlic, dried ginger, green chili, dried tomatoes, and spray-dried tropical fruit powders (mango, banana, guava) processed to strict USFDA and BRCGS standards.',
    itemCount: 16,
    keyCommodities: ['Dehydrated White Onion Flakes', 'Dehydrated Garlic Granules & Powder', 'Spray-Dried Mango Powder', 'Sun-Dried Golden Raisins'],
    image: '/images/categories/cat-commodity.jpg',
  },
  {
    id: 'spices-commodities',
    index: '02',
    name: 'Authentic Indian Spices & Grains',
    subhead: 'Direct Farm-Origin Spices, Basmati & Oilseeds',
    description: 'Sovereign Indian agro commodities sourced directly from traditional farming belts: Guntur red chilies, high-curcumin Alleppey turmeric, Gujarat cumin seeds, premium aged 1121 Basmati rice, and hulled sesame seeds.',
    itemCount: 24,
    keyCommodities: ['Alleppey Turmeric (Curcumin 5%+)', 'Guntur Teja Red Chilies', '1121 Extra Long Basmati Rice', 'Hulled White Sesame Seeds'],
    image: '/images/panels/panel-2-sourcing.jpg',
  },
  {
    id: 'manufactured-goods',
    index: '03',
    name: 'Indian Manufactured & Eco Goods',
    subhead: 'Ceramic Tiles, Biodegradable Ware & Textiles',
    description: 'Promoting Indian industrial and eco-friendly manufacturing: Morbi glazed vitrified architectural tiles, 100% natural Areca palm leaf dinnerware, organic combed cotton yarns, and precision CNC metal components.',
    itemCount: 18,
    keyCommodities: ['Morbi Vitrified Porcelain Tiles', 'Areca Palm Biodegradable Tableware', 'GOTS Organic Cotton Yarns', 'Precision Brass Turned Parts'],
    image: '/images/categories/cat-industrial.jpg',
  },
  {
    id: 'global-imports',
    index: '04',
    name: 'Global Import Commodities',
    subhead: 'Importing World Specialties into Indian Hubs',
    description: 'Direct bilateral procurement of premier global commodities for Indian processing and retail markets: California in-shell almonds, African raw cashew nuts (RCN), Australian yellow lentils, and Middle Eastern dates.',
    itemCount: 12,
    keyCommodities: ['California In-Shell Almonds', 'African Raw Cashew Nuts (RCN)', 'Australian Desi Chickpeas', 'Gulf Medjool Dates'],
    image: '/images/categories/cat-sourcing.jpg',
  },
]

// Products Catalog
export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'prod-01',
    slug: 'dehydrated-white-onion-flakes',
    category: 'Dehydrated Vegetables & Fruits',
    categoryId: 'dehydrated-agro',
    title: 'Dehydrated White Onion Flakes & Minced (Grade-A)',
    tagline: '100% pure Indian white onion flakes with intense aroma and zero moisture.',
    description: 'Manufactured from selected Saurashtra white onions through state-of-the-art automated optical color sorting and hot-air dehydration. Free from microbiological contamination, GMOs, and synthetic preservatives. Conforms strictly to USFDA, BRCGS, and FSSAI standards.',
    image: '/images/products/dehydrated-onion.jpg',
    secondaryImages: [
      '/images/panels/panel-1-connections.jpg',
      '/images/products/food-processing-plant.jpg'
    ],
    hsCode: '0712.20.00',
    originHub: 'Mahuva / Bhavnagar, Gujarat, India',
    primaryMarkets: ['United States', 'Germany', 'United Kingdom', 'Japan', 'UAE'],
    moq: '14 Metric Tons (1 x 20ft FCL)',
    packaging: 'Poly-lined multi-wall paper bags / export corrugated cartons (20kg / 25kg)',
    leadTime: '12 - 18 Days CIF',
    specifications: [
      { key: 'Moisture Content', value: '4.5% Maximum' },
      { key: 'Total Ash', value: '4.0% Maximum' },
      { key: 'Acid Insoluble Ash', value: '0.5% Maximum' },
      { key: 'Color / Appearance', value: 'Natural Creamy White Flakes' },
      { key: 'Mesh / Granulation Size', value: '8 – 15 mm Flakes / Minced' },
      { key: 'Microbial Standard', value: 'TPC < 50,000 cfu/g, E.Coli Nil, Salmonella Negative' }
    ],
    complianceStandards: ['USFDA Registered', 'BRCGS Grade-A', 'FSSAI Certified', 'ISO 22000:2018', 'Halal & Kosher']
  },
  {
    id: 'prod-02',
    slug: 'dehydrated-garlic-granules-powder',
    category: 'Dehydrated Vegetables & Fruits',
    categoryId: 'dehydrated-agro',
    title: 'Dehydrated Indian Garlic Flakes, Granules & Pure Powder',
    tagline: 'High-pungency garlic processed from native cloves for culinary and food-service industries.',
    description: 'Produced from fresh, mature Indian garlic cloves peeled, washed, sliced, and dehydrated using controlled temperature hot-air dryers. Free from added starch or anti-caking chemicals, offering strong natural allicin content and intense seasoning value.',
    image: '/images/products/dehydrated-garlic.jpg',
    secondaryImages: [
      '/images/gallery/gallery-1.jpg',
      '/images/products/food-processing-plant.jpg'
    ],
    hsCode: '0712.90.20',
    originHub: 'Mandsaur / Gujarat Processing Hub, India',
    primaryMarkets: ['European Union', 'Middle East', 'Australia', 'Canada'],
    moq: '15 Metric Tons (1 x 20ft FCL)',
    packaging: 'Double poly-lined export cartons (20kg net) with nitrogen flush options',
    leadTime: '14 - 20 Days CIF',
    specifications: [
      { key: 'Moisture', value: '5.0% Maximum' },
      { key: 'Pungency / Allicin Content', value: 'High Natural Retention' },
      { key: 'Granule Sizes Available', value: 'Flakes, Chopped, Minced, Granules (40-60 mesh), Powder (80-100 mesh)' },
      { key: 'Foreign Matter', value: 'Nil (Metal-detected & Optical-sorted)' },
      { key: 'Acid Insoluble Ash', value: '0.4% Maximum' }
    ],
    complianceStandards: ['FSSAI Certified', 'ISO 9001:2015', 'BRCGS Food Safety', 'Phytosanitary Certificate']
  },
  {
    id: 'prod-03',
    slug: 'spray-dried-alphonso-mango-powder',
    category: 'Dehydrated Vegetables & Fruits',
    categoryId: 'dehydrated-agro',
    title: 'Spray-Dried 100% Pure Alphonso Mango Fruit Powder',
    tagline: 'Naturally sweet, aromatic tropical fruit powder retaining original Alphonso mango flavor.',
    description: 'Manufactured by gently spray-drying fresh, ripe Alphonso mango pulp under hygienic GMP conditions. Instantly soluble in water, free from artificial colorants, sweeteners, and chemical carriers. Widely utilized in ice creams, confectionery, beverages, and nutraceutical formulations.',
    image: '/images/products/spray-mango.jpg',
    secondaryImages: [
      '/images/gallery/gallery-4.jpg',
      '/images/products/food-processing-plant.jpg'
    ],
    hsCode: '1106.30.10',
    originHub: 'Ratnagiri / Valsad Fruit Processing Corridor, India',
    primaryMarkets: ['United Kingdom', 'France', 'Japan', 'United States', 'Singapore'],
    moq: '3 Metric Tons',
    packaging: 'Aluminium vacuum foil pouches in corrugated outer cartons (10kg / 25kg)',
    leadTime: '10 - 15 Days Air / Sea',
    specifications: [
      { key: 'Purity / Fruit Solids', value: '100% Fruit Solids (No Added Sugar)' },
      { key: 'Solubility', value: 'Instant & Complete in Cold/Warm Water' },
      { key: 'Moisture Content', value: '< 4.0%' },
      { key: 'Color', value: 'Vibrant Natural Golden Yellow' },
      { key: 'pH Level', value: '3.8 - 4.2' }
    ],
    complianceStandards: ['APEDA Certified', 'FSSAI License', 'USFDA Compliant', 'HACCP Accredited']
  },
  {
    id: 'prod-04',
    slug: 'alleppey-turmeric-high-curcumin',
    category: 'Authentic Indian Spices & Grains',
    categoryId: 'spices-commodities',
    title: 'Alleppey Finger Turmeric (High Curcumin 5.0%+)',
    tagline: 'World-renowned Indian golden turmeric with exceptional pharmaceutical and culinary potency.',
    description: 'Sourced from the fertile soil of South India, Alleppey turmeric is celebrated globally for its high natural curcumin content (5.0% to 5.8%) and deep orange-gold hue. Double-polished and machine-cleaned to eliminate dust, foreign matter, and heavy metals.',
    image: '/images/products/turmeric-curcumin.jpg',
    secondaryImages: [
      '/images/panels/panel-2-sourcing.jpg',
      '/images/products/guntur-chili.jpg'
    ],
    hsCode: '0910.30.20',
    originHub: 'Erode (Tamil Nadu) / Nizamabad (Telangana), India',
    primaryMarkets: ['United States', 'Germany', 'Netherlands', 'South Korea', 'UAE'],
    moq: '18 Metric Tons (1 x 20ft FCL)',
    packaging: '25kg / 50kg new multi-wall Jute bags or PP bags with inner liner',
    leadTime: '12 - 16 Days CIF',
    specifications: [
      { key: 'Curcumin Percentage', value: '5.0% – 5.8% Guaranteed' },
      { key: 'Moisture', value: '10.0% Maximum' },
      { key: 'Total Ash', value: '7.0% Maximum' },
      { key: 'Lead Chromate Test', value: 'Strictly Negative (100% Pure)' },
      { key: 'Grade', value: 'Double Polished Fingers (Length 4-7 cm)' }
    ],
    complianceStandards: ['Spices Board of India Registered', 'AGMARK Special Grade', 'SGS Assay Tested', 'FSSAI']
  },
  {
    id: 'prod-05',
    slug: 'aged-1121-steam-basmati-rice',
    category: 'Authentic Indian Spices & Grains',
    categoryId: 'spices-commodities',
    title: 'Traditional Aged 1121 Steam Extra-Long Basmati Rice',
    tagline: 'The crown jewel of Indian grains: 8.35mm average uncooked length with exquisite natural aroma.',
    description: 'Cultivated in the Himalayan foothills of Punjab and Haryana, our 1121 Steam Basmati rice is aged for up to two years to ensure non-sticky cooking, dramatic grain elongation (up to 20mm cooked), and sweet delicate fragrance. Extensively tested for zero pesticide residues.',
    image: '/images/products/basmati-rice.jpg',
    secondaryImages: [
      '/images/gallery/gallery-5.jpg',
      '/images/panels/panel-3-logistics.jpg'
    ],
    hsCode: '1006.30.20',
    originHub: 'Karnal / Taraori Rice Belt, Punjab & Haryana, India',
    primaryMarkets: ['Saudi Arabia', 'UAE', 'United Kingdom', 'Canada', 'Iraq', 'Iran'],
    moq: '25 Metric Tons (1 x 20ft FCL)',
    packaging: 'Non-woven fabric bags, BOPP, or PP bags (5kg, 10kg, 20kg, 40kg, 50kg)',
    leadTime: '14 - 21 Days CIF',
    specifications: [
      { key: 'Average Grain Length (AGL)', value: '8.35 mm Minimum (Uncooked)' },
      { key: 'Moisture Content', value: '12.0% Maximum' },
      { key: 'Broken Grains', value: '0.5% Maximum' },
      { key: 'Chalky Grains', value: '< 2.0%' },
      { key: 'Aroma & Taste', value: 'Authentic Natural Himalayan Basmati Aroma' }
    ],
    complianceStandards: ['APEDA Export Verified', 'EIC Inspection', 'ISO 22000:2018', 'Halal Certified']
  },
  {
    id: 'prod-06',
    slug: 'morbi-vitrified-porcelain-tiles',
    category: 'Indian Manufactured & Eco Goods',
    categoryId: 'manufactured-goods',
    title: 'Morbi Glazed Vitrified Architectural Porcelain Tiles',
    tagline: 'Heavy-duty architectural porcelain slabs from the world’s second largest ceramic cluster.',
    description: 'Engineered using ultra-modern Italian hydraulic pressing and digital nano-printing technology in Morbi, Gujarat. High breaking strength, ultra-low water absorption (< 0.05%), and frost-proof resilience designed for luxury hotels, commercial towers, and residential complexes globally.',
    image: '/images/products/morbi-tiles.jpg',
    secondaryImages: [
      '/images/categories/cat-industrial.jpg',
      '/images/gallery/gallery-3.jpg'
    ],
    hsCode: '6907.21.00',
    originHub: 'Morbi Ceramic Cluster, Gujarat, India',
    primaryMarkets: ['United States', 'GCC Countries (Saudi Arabia, UAE)', 'United Kingdom', 'Mexico', 'Kenya'],
    moq: '3 x 20ft FCL (Approx. 5,400 sq. meters)',
    packaging: 'Corrugated cartons strapped on fumigated wooden euro-pallets with plastic corner edge guards',
    leadTime: '18 - 25 Days CIF',
    specifications: [
      { key: 'Standard Dimensions', value: '600x600mm, 600x1200mm, 800x1600mm, 1200x2400mm' },
      { key: 'Water Absorption', value: '< 0.05% (Vitrified Impervious)' },
      { key: 'Surface Finishes', value: 'High-Gloss Polished, Carving, Matt, Satin, Sugar-Finish' },
      { key: 'Breaking Strength', value: '> 2200 N' },
      { key: 'Chemical Resistance', value: 'Class GA (Resistant to household chemicals & stains)' }
    ],
    complianceStandards: ['ISO 13006 / EN 14411 Group Bla', 'CE Mark Certified', 'CAPEXIL Export Certificate']
  },
  {
    id: 'prod-07',
    slug: 'areca-palm-leaf-biodegradable-tableware',
    category: 'Indian Manufactured & Eco Goods',
    categoryId: 'manufactured-goods',
    title: 'Eco-Friendly Areca Palm Leaf Biodegradable Tableware',
    tagline: '100% natural, chemical-free dinnerware pressed from fallen Areca palm sheaths.',
    description: 'Zero trees are cut to produce this eco-friendly tableware. Gathered from the fallen leaves of Areca palm plantations in South India, washed with fresh spring water, and heat-pressed into elegant plates, bowls, and platters. 100% biodegradable and compostable within 60–90 days without plastic liners.',
    image: '/images/products/areca-tableware.jpg',
    secondaryImages: [
      '/images/panels/panel-5-opportunities.jpg',
      '/images/gallery/gallery-6.jpg'
    ],
    hsCode: '4419.90.90',
    originHub: 'Shimoga / Mangalore, Karnataka, India',
    primaryMarkets: ['Germany', 'Netherlands', 'United States', 'Australia', 'United Kingdom'],
    moq: '1 x 40ft High Cube Container (~120,000 pieces)',
    packaging: 'Shrink-wrapped sets of 25 pieces in corrugated master export cartons',
    leadTime: '15 - 22 Days CIF',
    specifications: [
      { key: 'Material', value: '100% Natural Areca Palm Sheath (No Chemicals/Wax)' },
      { key: 'Thermal Resistance', value: '-20°C to +180°C (Microwave & Freezer Safe)' },
      { key: 'Moisture & Oil Resistance', value: 'Leak-proof for liquid curries & hot soups' },
      { key: 'Biodegradability', value: 'Commercial & Backyard Compostable in 60-90 Days' }
    ],
    complianceStandards: ['DIN EN 13432 Certified', 'USFDA Food Contact Approved', 'TUV Rheinland Certified']
  },
  {
    id: 'prod-08',
    slug: 'california-almonds-raw-cashews-imports',
    category: 'Global Import Commodities',
    categoryId: 'global-imports',
    title: 'California In-Shell Almonds & African Raw Cashew Nuts (RCN)',
    tagline: 'Direct bilateral procurement of high-yield nuts and seeds for Indian distribution.',
    description: 'We manage sovereign import contracts sourcing Nonpareil and Carmel in-shell almonds directly from California growers, alongside high-outturn Raw Cashew Nuts (48-52 lbs outturn) from West Africa (Ivory Coast, Benin). Customs clearance, fumigation, and bonded warehousing handled seamlessly.',
    image: '/images/products/california-almonds.jpg',
    secondaryImages: [
      '/images/products/raw-cashews.jpg',
      '/images/hero/hero-port.jpg'
    ],
    hsCode: '0802.11.00 / 0801.31.00',
    originHub: 'California (USA) / Abidjan (Ivory Coast) → Mundra / JNPT Ports',
    primaryMarkets: ['India (Pan-India Roasting & Retail Distribution)'],
    moq: '50 Metric Tons',
    packaging: '50kg Jute bags or bulk sea-containers with moisture-absorbing desiccants',
    leadTime: '24 - 35 Days Inbound',
    specifications: [
      { key: 'Almond Varieties', value: 'Nonpareil, Carmel, Monterey, Butte/Padre' },
      { key: 'Cashew Outturn (KOR)', value: '48 – 52 lbs per 80kg bag' },
      { key: 'Nut Count', value: '180 – 200 nuts per kg' },
      { key: 'Moisture', value: '8.0% Maximum' }
    ],
    complianceStandards: ['FSSAI Inbound Import Clearance', 'Plant Quarantine Inspection', 'Phytosanitary Clearance']
  }
]

// Global Maritime Trade Corridors Connecting India Worldwide
export const TRADE_CORRIDORS: TradeRoute[] = [
  {
    id: 'india-gcc',
    name: 'India-GCC & Gulf Express (Mundra / JNPT → Jebel Ali)',
    origin: 'Mundra & JNPT (Mumbai), India',
    destination: 'Jebel Ali, Dubai & Dammam, Saudi Arabia',
    transitDays: 5,
    primaryCargo: 'Dehydrated Vegetables & Garlic, Basmati Rice, Spices, Morbi Vitrified Tiles',
    keyHubs: ['Mundra Deepwater', 'JNPT Mumbai', 'Strait of Hormuz', 'Jebel Ali Super-Hub'],
    volumeAnnual: '38,000 TEU',
    coordinates: [
      { x: 67, y: 46 },
      { x: 63, y: 48 },
      { x: 57, y: 46 }
    ],
    status: 'OPTIMAL'
  },
  {
    id: 'india-europe',
    name: 'India-Europe Atlantic Highway (Nhava Sheva → Rotterdam)',
    origin: 'Nhava Sheva (JNPT) & Mundra, India',
    destination: 'Rotterdam, Netherlands & Hamburg, Germany',
    transitDays: 20,
    primaryCargo: 'Spray-Dried Mango Powders, Organic Turmeric & Spices, Areca Tableware, Textiles',
    keyHubs: ['Arabian Sea', 'Gulf of Aden', 'Suez Canal Chokepoint', 'Strait of Gibraltar', 'Rotterdam Port'],
    volumeAnnual: '29,500 TEU',
    coordinates: [
      { x: 68, y: 48 },
      { x: 55, y: 48 },
      { x: 44, y: 38 },
      { x: 43, y: 28 }
    ],
    status: 'OPTIMAL'
  },
  {
    id: 'india-americas',
    name: 'India-North America Trans-Oceanic Axis (Mundra → New York / LA)',
    origin: 'Mundra & Chennai Ports, India',
    destination: 'New York (East Coast) & Long Beach / LA (West Coast), USA',
    transitDays: 26,
    primaryCargo: 'Certified Dehydrated Onion Flakes, Vitrified Slabs, Spices, Organic Cotton',
    keyHubs: ['Mundra Port', 'Colombo Transshipment', 'Suez / Atlantic Transit', 'New York Terminal'],
    volumeAnnual: '24,000 TEU',
    coordinates: [
      { x: 67, y: 46 },
      { x: 50, y: 48 },
      { x: 30, y: 42 },
      { x: 22, y: 40 }
    ],
    status: 'OPTIMAL'
  },
  {
    id: 'india-seasia',
    name: 'Southeast Asia & Far East Gateway (Chennai → Singapore / Tokyo)',
    origin: 'Chennai & Hazira Ports, India',
    destination: 'Singapore & Yokohama / Tokyo, Japan',
    transitDays: 9,
    primaryCargo: 'Hulled Sesame Seeds, Dehydrated Spices, Basmati Rice, Engineering Castings',
    keyHubs: ['Bay of Bengal', 'Strait of Malacca', 'Port of Singapore', 'Tokyo Bay'],
    volumeAnnual: '19,200 TEU',
    coordinates: [
      { x: 72, y: 52 },
      { x: 78, y: 56 },
      { x: 86, y: 42 }
    ],
    status: 'OPTIMAL'
  }
]

// Gallery Items
export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'gal-01',
    title: 'Mundra Port Deepwater Container Terminals',
    category: 'Terminals',
    location: 'Mundra, Gujarat, India',
    coordinates: '22°44′N 69°42′E',
    image: '/images/gallery/gallery-1.jpg',
    aspect: 'wide'
  },
  {
    id: 'gal-02',
    title: 'Automated Vegetable Dehydration & Optical Color Sorting Plant',
    category: 'Infrastructure',
    location: 'Mahuva Processing Facility, Gujarat, India',
    coordinates: '21°05′N 71°45′E',
    image: '/images/gallery/gallery-2.jpg',
    aspect: 'tall'
  },
  {
    id: 'gal-03',
    title: 'Vitrified Tile Container Loading & Export Palletizing',
    category: 'Freight',
    location: 'Morbi Ceramic Industrial Zone, Gujarat, India',
    coordinates: '22°49′N 70°50′E',
    image: '/images/gallery/gallery-3.jpg',
    aspect: 'square'
  },
  {
    id: 'gal-04',
    title: 'High-Seas Container Carrier Navigating International Trade Lanes',
    category: 'Maritime',
    location: 'Arabian Sea International Shipping Highway',
    coordinates: '18°30′N 68°45′E',
    image: '/images/gallery/gallery-4.jpg',
    aspect: 'wide'
  },
  {
    id: 'gal-05',
    title: 'APEDA & Spices Board Analytical Quality Testing Laboratory',
    category: 'Infrastructure',
    location: 'Navi Mumbai Quality Assurance Hub, India',
    coordinates: '19°02′N 73°01′E',
    image: '/images/gallery/gallery-5.jpg',
    aspect: 'tall'
  },
  {
    id: 'gal-06',
    title: 'Global Export Trade Negotiation & Consignment Dispatch Desk',
    category: 'Infrastructure',
    location: 'Bandra-Kurla Complex (BKC), Mumbai, India',
    coordinates: '19°04′N 72°52′E',
    image: '/images/gallery/gallery-6.jpg',
    aspect: 'wide'
  }
]

// Global Trading Desks (Indian HQ + International Key Consignment Desks)
export const GLOBAL_DESKS = [
  {
    city: 'Mumbai [HQ]',
    region: 'Corporate Headquarters & Export Gateway',
    address: 'Maker Chambers VI, Nariman Point & BKC, Mumbai 400021, India',
    timezone: 'Asia/Kolkata (UTC+05:30)',
    coordinates: '18°55′33″N 72°49′33″E',
    focus: 'Indian Agricultural Exports, Dehydrated Products & Manufacturing Dispatch',
    email: 'mumbai.hq@phonix-trade-demo.com',
    phone: '+91 22 6123 4500 [Demo]'
  },
  {
    city: 'Dubai',
    region: 'Middle East & GCC Distribution Desk',
    address: 'Gate Precinct 4, DIFC & JAFZA, PO Box 506500, Dubai, UAE',
    timezone: 'Asia/Dubai (UTC+4)',
    coordinates: '25°12′32″N 55°16′40″E',
    focus: 'Gulf Basmati Rice, Dehydrated Agro & Ceramic Tiles Clearance',
    email: 'dubai.desk@phonix-trade-demo.com',
    phone: '+971 4 362 7000 [Demo]'
  },
  {
    city: 'Rotterdam',
    region: 'European Union Gateway Desk',
    address: 'Wilhelminakade 953, 3072 AP Rotterdam, Netherlands',
    timezone: 'Europe/Amsterdam (UTC+1)',
    coordinates: '51°54′18″N 04°29′34″E',
    focus: 'European Import Discharge, Organic Spices & USFDA/BRCGS Auditing',
    email: 'rotterdam.desk@phonix-trade-demo.com',
    phone: '+31 10 297 3000 [Demo]'
  },
  {
    city: 'New York',
    region: 'Americas Commercial Desk',
    address: '1000 Louisiana Street & Wall Street, New York, NY 10005, USA',
    timezone: 'America/New_York (UTC-5)',
    coordinates: '40°42′25″N 74°00′35″W',
    focus: 'Dehydrated Onion Flakes, Vitrified Porcelain Tiles & Almond Outbound',
    email: 'newyork.desk@phonix-trade-demo.com',
    phone: '+1 212 555 0198 [Demo]'
  }
]
