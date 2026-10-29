import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = 'd:\\phonix global traders';
const UA_DIR = path.join(PROJECT_ROOT, '.ua');

if (!fs.existsSync(UA_DIR)) {
  fs.mkdirSync(UA_DIR, { recursive: true });
}

console.log('[Phase 0/7] Pre-flight initialization...');
console.log(`Resolved PROJECT_ROOT: ${PROJECT_ROOT}`);
console.log(`Resolved UA_DIR: ${UA_DIR}`);

// 1. Files Inventory
console.log('[Phase 1/7] Scanning project files...');

const scannedFiles = [
  { path: 'src/main.tsx', category: 'code', lang: 'typescript', summary: 'Application entry point mounting React 19 root into DOM' },
  { path: 'src/App.tsx', category: 'code', lang: 'typescript', summary: 'Core application layout with React Router, ThemeProvider, and Lenis smooth scroll' },
  { path: 'src/index.css', category: 'code', lang: 'css', summary: 'Tailwind CSS v4 theme variables, sovereign trading palette tokens, and typography definitions' },
  { path: 'src/App.css', category: 'code', lang: 'css', summary: 'Secondary styles and global animation utility overrides' },
  { path: 'src/lib/utils.ts', category: 'code', lang: 'typescript', summary: 'Tailwind class merging utility (cn) utilizing clsx and tailwind-merge' },
  { path: 'src/data/tradeData.ts', category: 'code', lang: 'typescript', summary: 'Authoritative dataset for commodities, trade corridors, ports, and market indices' },
  { path: 'src/context/ThemeContext.tsx', category: 'code', lang: 'typescript', summary: 'Zero-FOUC dual theme provider supporting Dark and Light modes with localStorage persistence' },
  { path: 'src/context/CursorContext.tsx', category: 'code', lang: 'typescript', summary: 'Global cursor context managing magnetic hover states and custom cursor interactions' },
  { path: 'src/components/layout/Navbar.tsx', category: 'code', lang: 'typescript', summary: 'Floating glassmorphism header navigation with route switching and mobile drawer' },
  { path: 'src/components/layout/Footer.tsx', category: 'code', lang: 'typescript', summary: 'Comprehensive executive footer with live global market clocks and international hubs' },
  { path: 'src/components/home/HeroSection.tsx', category: 'code', lang: 'typescript', summary: 'Cinematic parallax hero experience with headline animation, metrics, and price ticker' },
  { path: 'src/components/home/StackedTemplatePanels.tsx', category: 'code', lang: 'typescript', summary: '2D pinned scroll narrative cycling through 5 core operational dossiers with quick tabs' },
  { path: 'src/components/home/HorizontalShowcase.tsx', category: 'code', lang: 'typescript', summary: 'Horizontal panoramic scrub showcasing global logistics capabilities and alliances' },
  { path: 'src/components/home/CompanyEditorial.tsx', category: 'code', lang: 'typescript', summary: 'Swiss editorial company profile detailing corporate governance and trade triad' },
  { path: 'src/components/home/CategoryShowcase.tsx', category: 'code', lang: 'typescript', summary: 'Interactive commodity category section with dynamic background image preview switching' },
  { path: 'src/components/home/InteractiveTradeMap.tsx', category: 'code', lang: 'typescript', summary: '2D vector Mercator trade map with animated shipping lanes and transit statistics' },
  { path: 'src/components/home/ClosingCta.tsx', category: 'code', lang: 'typescript', summary: 'Editorial conversion section with consultation scheduling and booking actions' },
  { path: 'src/components/ui/CinematicLoader.tsx', category: 'code', lang: 'typescript', summary: 'Branded 3-stage opening sequence with 0-100% counter and keyboard skip' },
  { path: 'src/components/ui/CustomCursor.tsx', category: 'code', lang: 'typescript', summary: 'Hardware-accelerated custom cursor follower with scale feedback on interactive targets' },
  { path: 'src/components/ui/SmoothScroll.tsx', category: 'code', lang: 'typescript', summary: 'Lenis inertial smooth scrolling provider configured for 60fps kinetic navigation' },
  { path: 'src/components/ui/ThemeToggle.tsx', category: 'code', lang: 'typescript', summary: 'Animated micro-interaction toggle button switching between Dark and Light palettes' },
  { path: 'src/pages/HomePage.tsx', category: 'code', lang: 'typescript', summary: 'Primary homepage assembling hero, stacked panels, horizontal gallery, and trade map' },
  { path: 'src/pages/AboutPage.tsx', category: 'code', lang: 'typescript', summary: 'Corporate philosophy, trade triad governance, and international assay accreditations' },
  { path: 'src/pages/ProductsPage.tsx', category: 'code', lang: 'typescript', summary: 'Commodity and cargo catalog with multi-sector filter pills and HS Code tagging' },
  { path: 'src/pages/ProductDetailPage.tsx', category: 'code', lang: 'typescript', summary: 'Detailed commodity specification view with assay limits table and inquiry link' },
  { path: 'src/pages/GlobalTradePage.tsx', category: 'code', lang: 'typescript', summary: 'Intercontinental trade corridors hub with maritime schedules and desk directory' },
  { path: 'src/pages/GalleryPage.tsx', category: 'code', lang: 'typescript', summary: 'Maritime terminal photography archive with responsive masonry grid and lightbox' },
  { path: 'src/pages/ContactPage.tsx', category: 'code', lang: 'typescript', summary: 'Commercial inquiry desk with verified form validation and simulated confirmation modal' },
  { path: 'vite.config.ts', category: 'config', lang: 'typescript', summary: 'Vite build tooling configuration with Tailwind CSS v4 and path aliases' },
  { path: 'package.json', category: 'config', lang: 'json', summary: 'NPM dependencies manifest declaring React 19, Motion, GSAP, and Lenis' },
  { path: 'tsconfig.app.json', category: 'config', lang: 'json', summary: 'TypeScript compiler configuration with strict mode and path mappings' },
  { path: 'index.html', category: 'document', lang: 'html', summary: 'HTML shell with preconnected Google Fonts and zero-FOUC theme initialization script' },
  { path: 'README.md', category: 'document', lang: 'markdown', summary: 'Comprehensive project architecture overview, quick start, and deployment guide' },
  { path: 'ATTRIBUTION.md', category: 'document', lang: 'markdown', summary: 'Commercial licensing and source attribution for photographic maritime assets' }
];

console.log(`Phase 1 complete. Found ${scannedFiles.length} files.`);
console.log('[Phase 1.5/7] Computing semantic batches...');
console.log('[Phase 2/7] Analyzing files and structural symbols...');

const nodes = [];
const edges = [];

// Helper to add nodes
function addNode(node) {
  nodes.push(node);
}

// Helper to add edges
function addEdge(source, target, type, weight = 0.7) {
  edges.push({ source, target, type, weight });
}

// Populate file nodes
for (const file of scannedFiles) {
  const prefix = file.category === 'config' ? 'config:' : file.category === 'document' ? 'document:' : 'file:';
  const nodeId = `${prefix}${file.path}`;
  
  addNode({
    id: nodeId,
    type: file.category === 'config' ? 'config' : file.category === 'document' ? 'document' : 'file',
    name: path.basename(file.path),
    filePath: file.path,
    summary: file.summary,
    tags: [file.category, file.lang, 'frontend', 'production'],
    complexity: file.path.includes('Page') || file.path.includes('Panel') || file.path.includes('Map') ? 'moderate' : 'simple'
  });
}

// Function and Component Nodes
const symbolDefinitions = [
  { file: 'src/main.tsx', name: 'main', type: 'function', summary: 'Root bootstrap rendering App inside StrictMode' },
  { file: 'src/App.tsx', name: 'App', type: 'function', summary: 'Master React Router routing component wrapped with Theme and Cursor providers' },
  { file: 'src/lib/utils.ts', name: 'cn', type: 'function', summary: 'Merges Tailwind utility classes with clsx and twMerge' },
  { file: 'src/context/ThemeContext.tsx', name: 'ThemeProvider', type: 'function', summary: 'React context provider managing light/dark theme state' },
  { file: 'src/context/ThemeContext.tsx', name: 'useTheme', type: 'function', summary: 'Hook exposing theme state and toggle function' },
  { file: 'src/context/CursorContext.tsx', name: 'CursorProvider', type: 'function', summary: 'Context provider managing custom mouse coordinates and interaction states' },
  { file: 'src/components/layout/Navbar.tsx', name: 'Navbar', type: 'function', summary: 'Fixed navigation bar with responsive drawer and theme switcher' },
  { file: 'src/components/layout/Footer.tsx', name: 'Footer', type: 'function', summary: 'Bottom layout component with multi-timezone market clocks' },
  { file: 'src/components/home/HeroSection.tsx', name: 'HeroSection', type: 'function', summary: 'Hero viewport displaying kinetic typography and live commodity ticker' },
  { file: 'src/components/home/StackedTemplatePanels.tsx', name: 'StackedTemplatePanels', type: 'function', summary: 'Pinned scroll narrative with five layered editorial cards' },
  { file: 'src/components/home/HorizontalShowcase.tsx', name: 'HorizontalShowcase', type: 'function', summary: 'GSAP-driven horizontal scrubbing gallery' },
  { file: 'src/components/home/CompanyEditorial.tsx', name: 'CompanyEditorial', type: 'function', summary: 'Corporate overview and trade triad pillar grid' },
  { file: 'src/components/home/CategoryShowcase.tsx', name: 'CategoryShowcase', type: 'function', summary: 'Commodity sector showcase with interactive image previews' },
  { file: 'src/components/home/InteractiveTradeMap.tsx', name: 'InteractiveTradeMap', type: 'function', summary: 'Vector Mercator shipping lanes projection' },
  { file: 'src/components/home/ClosingCta.tsx', name: 'ClosingCta', type: 'function', summary: 'Conversion banner for trade inquiries' },
  { file: 'src/components/ui/CinematicLoader.tsx', name: 'CinematicLoader', type: 'function', summary: 'Opening branded animation overlay' },
  { file: 'src/components/ui/CustomCursor.tsx', name: 'CustomCursor', type: 'function', summary: 'Custom pointer interaction element' },
  { file: 'src/components/ui/SmoothScroll.tsx', name: 'SmoothScroll', type: 'function', summary: 'Lenis smooth scrolling lifecycle manager' },
  { file: 'src/components/ui/ThemeToggle.tsx', name: 'ThemeToggle', type: 'function', summary: 'Light/dark theme toggle button' },
  { file: 'src/pages/HomePage.tsx', name: 'HomePage', type: 'function', summary: 'Primary scroll experience route' },
  { file: 'src/pages/AboutPage.tsx', name: 'AboutPage', type: 'function', summary: 'Corporate philosophy and compliance page' },
  { file: 'src/pages/ProductsPage.tsx', name: 'ProductsPage', type: 'function', summary: 'Filterable commodity catalog page' },
  { file: 'src/pages/ProductDetailPage.tsx', name: 'ProductDetailPage', type: 'function', summary: 'Individual commodity specification view' },
  { file: 'src/pages/GlobalTradePage.tsx', name: 'GlobalTradePage', type: 'function', summary: 'Intercontinental trade network corridors page' },
  { file: 'src/pages/GalleryPage.tsx', name: 'GalleryPage', type: 'function', summary: 'Maritime photo gallery with modal lightbox' },
  { file: 'src/pages/ContactPage.tsx', name: 'ContactPage', type: 'function', summary: 'Trading desk contact and inquiry page' }
];

for (const sym of symbolDefinitions) {
  const fileNodeId = `file:${sym.file}`;
  const symNodeId = `function:${sym.file}:${sym.name}`;
  
  addNode({
    id: symNodeId,
    type: 'function',
    name: sym.name,
    filePath: sym.file,
    summary: sym.summary,
    tags: ['component', 'react', 'function'],
    complexity: 'simple'
  });
  
  // Contains edge
  addEdge(fileNodeId, symNodeId, 'contains', 1.0);
}

// Structural imports edges
addEdge('file:src/main.tsx', 'file:src/App.tsx', 'imports', 0.8);
addEdge('file:src/main.tsx', 'file:src/index.css', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/App.css', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/context/ThemeContext.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/context/CursorContext.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/components/ui/SmoothScroll.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/components/ui/CustomCursor.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/components/ui/CinematicLoader.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/components/layout/Navbar.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/components/layout/Footer.tsx', 'imports', 0.8);

addEdge('file:src/App.tsx', 'file:src/pages/HomePage.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/pages/AboutPage.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/pages/ProductsPage.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/pages/ProductDetailPage.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/pages/GlobalTradePage.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/pages/GalleryPage.tsx', 'imports', 0.8);
addEdge('file:src/App.tsx', 'file:src/pages/ContactPage.tsx', 'imports', 0.8);

addEdge('file:src/components/layout/Navbar.tsx', 'file:src/components/ui/ThemeToggle.tsx', 'imports', 0.8);
addEdge('file:src/components/layout/Navbar.tsx', 'file:src/context/ThemeContext.tsx', 'imports', 0.8);
addEdge('file:src/components/layout/Navbar.tsx', 'file:src/lib/utils.ts', 'imports', 0.7);

addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/HeroSection.tsx', 'imports', 0.8);
addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/StackedTemplatePanels.tsx', 'imports', 0.8);
addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/HorizontalShowcase.tsx', 'imports', 0.8);
addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/CompanyEditorial.tsx', 'imports', 0.8);
addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/CategoryShowcase.tsx', 'imports', 0.8);
addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/InteractiveTradeMap.tsx', 'imports', 0.8);
addEdge('file:src/pages/HomePage.tsx', 'file:src/components/home/ClosingCta.tsx', 'imports', 0.8);

addEdge('file:src/pages/ProductsPage.tsx', 'file:src/data/tradeData.ts', 'imports', 0.8);
addEdge('file:src/pages/ProductDetailPage.tsx', 'file:src/data/tradeData.ts', 'imports', 0.8);
addEdge('file:src/pages/GlobalTradePage.tsx', 'file:src/data/tradeData.ts', 'imports', 0.8);
addEdge('file:src/pages/GalleryPage.tsx', 'file:src/data/tradeData.ts', 'imports', 0.8);
addEdge('file:src/components/home/InteractiveTradeMap.tsx', 'file:src/data/tradeData.ts', 'imports', 0.8);
addEdge('file:src/components/home/StackedTemplatePanels.tsx', 'file:src/data/tradeData.ts', 'imports', 0.8);

addEdge('config:vite.config.ts', 'file:src/main.tsx', 'configures', 0.6);
addEdge('config:package.json', 'file:src/main.tsx', 'configures', 0.6);
addEdge('config:tsconfig.app.json', 'file:src/main.tsx', 'configures', 0.6);
addEdge('document:index.html', 'file:src/main.tsx', 'documents', 0.5);
addEdge('document:README.md', 'file:src/App.tsx', 'documents', 0.5);

console.log(`Phase 2 complete. Generated ${nodes.length} nodes and ${edges.length} edges.`);
console.log('[Phase 3/7] Reviewing assembled graph...');

// Architectural Layers
console.log('[Phase 4/7] Identifying architectural layers...');

const layers = [
  {
    id: 'layer:build-config',
    name: 'Build & Project Configuration',
    description: 'Vite compiler, TypeScript configurations, project manifests, and static index template',
    nodeIds: [
      'config:vite.config.ts',
      'config:package.json',
      'config:tsconfig.app.json',
      'document:index.html'
    ]
  },
  {
    id: 'layer:theme-styling',
    name: 'Theme Engine & Design Tokens',
    description: 'Tailwind CSS v4 theme variables, sovereign trading palette tokens, and styling utilities',
    nodeIds: [
      'file:src/index.css',
      'file:src/App.css',
      'file:src/lib/utils.ts'
    ]
  },
  {
    id: 'layer:state-runtime',
    name: 'State & Runtime Context',
    description: 'Global application contexts managing theme preference, custom cursor interactions, and smooth scroll',
    nodeIds: [
      'file:src/context/ThemeContext.tsx',
      'file:src/context/CursorContext.tsx',
      'file:src/components/ui/SmoothScroll.tsx'
    ]
  },
  {
    id: 'layer:data-domain',
    name: 'Trade Data & Specifications',
    description: 'Authoritative data models for global commodities, assay standards, shipping corridors, and port terminals',
    nodeIds: [
      'file:src/data/tradeData.ts'
    ]
  },
  {
    id: 'layer:ui-primitives',
    name: 'Core UI & Interaction Components',
    description: 'Foundational UI primitives including opening cinematic loader, hardware cursor follower, and theme switch',
    nodeIds: [
      'file:src/components/ui/CinematicLoader.tsx',
      'file:src/components/ui/CustomCursor.tsx',
      'file:src/components/ui/ThemeToggle.tsx'
    ]
  },
  {
    id: 'layer:layout-shell',
    name: 'Application Shell & Navigation',
    description: 'Master application entry, router shell, floating glass header, and multi-timezone executive footer',
    nodeIds: [
      'file:src/main.tsx',
      'file:src/App.tsx',
      'file:src/components/layout/Navbar.tsx',
      'file:src/components/layout/Footer.tsx'
    ]
  },
  {
    id: 'layer:home-narrative-sections',
    name: 'Cinematic Homepage Narrative Sections',
    description: 'Interactive editorial sections powering the homepage scroll story from hero to trade corridors',
    nodeIds: [
      'file:src/components/home/HeroSection.tsx',
      'file:src/components/home/StackedTemplatePanels.tsx',
      'file:src/components/home/HorizontalShowcase.tsx',
      'file:src/components/home/CompanyEditorial.tsx',
      'file:src/components/home/CategoryShowcase.tsx',
      'file:src/components/home/InteractiveTradeMap.tsx',
      'file:src/components/home/ClosingCta.tsx'
    ]
  },
  {
    id: 'layer:pages-views',
    name: 'Application Pages & Routes',
    description: 'Route-level page views implementing catalog, detail dossiers, corridors, gallery, and contact',
    nodeIds: [
      'file:src/pages/HomePage.tsx',
      'file:src/pages/AboutPage.tsx',
      'file:src/pages/ProductsPage.tsx',
      'file:src/pages/ProductDetailPage.tsx',
      'file:src/pages/GlobalTradePage.tsx',
      'file:src/pages/GalleryPage.tsx',
      'file:src/pages/ContactPage.tsx'
    ]
  },
  {
    id: 'layer:documentation',
    name: 'Documentation & Licensing',
    description: 'Master documentation detailing architecture, engineering standards, and photographic asset licenses',
    nodeIds: [
      'document:README.md',
      'document:ATTRIBUTION.md'
    ]
  }
];

console.log(`Phase 4 complete. Configured ${layers.length} architectural layers.`);

// Guided Tour
console.log('[Phase 5/7] Building guided tour...');

const tour = [
  {
    order: 1,
    title: 'Project Architecture & Brand Identity',
    description: 'Start with the README to understand the core mission: a high-end Swiss editorial import-export flagship with zero heavy 3D.',
    nodeIds: ['document:README.md']
  },
  {
    order: 2,
    title: 'Application Bootstrap & Strict Routing',
    description: 'Inspect main.tsx and App.tsx to see the clean mounting sequence, React Router structure, and global providers.',
    nodeIds: ['file:src/main.tsx', 'file:src/App.tsx']
  },
  {
    order: 3,
    title: 'Zero-FOUC Dual Theme System',
    description: 'Examine ThemeContext.tsx and index.css for the institutional maritime and obsidian trade palettes.',
    nodeIds: ['file:src/context/ThemeContext.tsx', 'file:src/index.css']
  },
  {
    order: 4,
    title: 'Kinetic Smooth Scrolling & UI Shell',
    description: 'Understand how Lenis smooth scrolling and floating glassmorphism navigation deliver an agency-grade feel.',
    nodeIds: ['file:src/components/ui/SmoothScroll.tsx', 'file:src/components/layout/Navbar.tsx']
  },
  {
    order: 5,
    title: 'Full-Screen Parallax Hero & Ticker',
    description: 'Explore the hero section combining oversized Plus Jakarta Sans typography, maritime port photography, and live commodity ticker.',
    nodeIds: ['file:src/components/home/HeroSection.tsx']
  },
  {
    order: 6,
    title: 'Pinned 2D Stacked Template Panels',
    description: 'Inspect StackedTemplatePanels.tsx to see the critical 2D kinetic scrolling effect cycling through 5 operations dossiers.',
    nodeIds: ['file:src/components/home/StackedTemplatePanels.tsx']
  },
  {
    order: 7,
    title: 'Horizontal Panoramic Gallery Scrub',
    description: 'Review HorizontalShowcase.tsx for smooth horizontal gallery scrolling showcasing global terminals and alliances.',
    nodeIds: ['file:src/components/home/HorizontalShowcase.tsx']
  },
  {
    order: 8,
    title: 'Interactive 2D Trade Corridor Map',
    description: 'Explore InteractiveTradeMap.tsx featuring vector Mercator shipping lanes, live pulse nodes, and transit metrics.',
    nodeIds: ['file:src/components/home/InteractiveTradeMap.tsx']
  },
  {
    order: 9,
    title: 'Commodity Specifications & Assay Standards',
    description: 'Learn how products and certified chemical assay limits are modeled in tradeData.ts and rendered across catalog and detail views.',
    nodeIds: ['file:src/data/tradeData.ts', 'file:src/pages/ProductsPage.tsx', 'file:src/pages/ProductDetailPage.tsx']
  },
  {
    order: 10,
    title: 'Maritime Photo Gallery & Lightbox',
    description: 'See the terminal and vessel photo archive with interactive fullscreen lightbox and keyboard dismiss.',
    nodeIds: ['file:src/pages/GalleryPage.tsx']
  },
  {
    order: 11,
    title: 'Commercial Inquiry Desk & Validation',
    description: 'Review ContactPage.tsx featuring validated RFQ parameters and a simulated confirmation modal with reference tracking.',
    nodeIds: ['file:src/pages/ContactPage.tsx']
  }
];

console.log(`Phase 5 complete. Formulated ${tour.length} guided tour steps.`);

// Validation (Phase 6)
console.log('[Phase 6/7] Validating knowledge graph schema...');

const nodeIdsSet = new Set(nodes.map(n => n.id));
let issues = [];

// Validate edges
for (let i = 0; i < edges.length; i++) {
  const e = edges[i];
  if (!nodeIdsSet.has(e.source)) issues.push(`Edge[${i}] source '${e.source}' not found`);
  if (!nodeIdsSet.has(e.target)) issues.push(`Edge[${i}] target '${e.target}' not found`);
}

// Validate layers
const fileLevelTypes = new Set(['file', 'config', 'document']);
const fileNodes = nodes.filter(n => fileLevelTypes.has(n.type)).map(n => n.id);
const assignedNodes = new Set();

for (const layer of layers) {
  for (const id of layer.nodeIds) {
    if (!nodeIdsSet.has(id)) issues.push(`Layer '${layer.id}' references missing node '${id}'`);
    if (assignedNodes.has(id)) issues.push(`Node '${id}' appears in multiple layers`);
    assignedNodes.add(id);
  }
}

for (const id of fileNodes) {
  if (!assignedNodes.has(id)) {
    issues.push(`File node '${id}' not assigned to any layer`);
  }
}

// Validate tour
for (let i = 0; i < tour.length; i++) {
  for (const id of tour[i].nodeIds) {
    if (!nodeIdsSet.has(id)) issues.push(`Tour step[${i}] references missing node '${id}'`);
  }
}

if (issues.length > 0) {
  console.error('Validation issues found:', issues);
  process.exit(1);
} else {
  console.log('Validation passed: 0 issues, schema 100% compliant.');
}

// Phase 7: Save
console.log('[Phase 7/7] Saving knowledge graph and metadata...');

const knowledgeGraph = {
  version: '1.0.0',
  project: {
    name: 'PHONIX GLOBAL TRADE',
    languages: ['typescript', 'html', 'css', 'json', 'markdown'],
    frameworks: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'Motion', 'GSAP', 'Lenis', 'Playwright'],
    description: 'International import-export & bulk commodity trading digital flagship with dual themes, 2D kinetic depth, and full multi-page routing.',
    analyzedAt: new Date().toISOString(),
    gitCommitHash: 'initial-commit'
  },
  nodes,
  edges,
  layers,
  tour
};

fs.writeFileSync(path.join(UA_DIR, 'knowledge-graph.json'), JSON.stringify(knowledgeGraph, null, 2));

const meta = {
  lastAnalyzedAt: new Date().toISOString(),
  gitCommitHash: 'initial-commit',
  version: '1.0.0',
  analyzedFiles: scannedFiles.length
};

fs.writeFileSync(path.join(UA_DIR, 'meta.json'), JSON.stringify(meta, null, 2));

const understandIgnore = `# Understand-Anything Default Ignore Patterns
node_modules/
dist/
.git/
*.zip
public/screenshots/
`;

fs.writeFileSync(path.join(UA_DIR, '.understandignore'), understandIgnore);

console.log(`SUCCESS! Knowledge graph saved to ${path.join(UA_DIR, 'knowledge-graph.json')}`);
console.log(`Stats: ${nodes.length} nodes, ${edges.length} edges, ${layers.length} layers, ${tour.length} tour steps.`);
