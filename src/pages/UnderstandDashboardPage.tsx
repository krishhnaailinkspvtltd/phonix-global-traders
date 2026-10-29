import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Layers,
  Compass,
  Search,
  Network,
  Code2,
  FileText,
  Settings,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Maximize2,
  Filter,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  X
} from 'lucide-react'

interface GraphNode {
  id: string
  type: string
  name: string
  filePath: string
  summary: string
  tags: string[]
  complexity?: string
}

interface GraphEdge {
  source: string
  target: string
  type: string
  weight: number
}

interface Layer {
  id: string
  name: string
  description: string
  nodeIds: string[]
}

interface TourStep {
  order: number
  title: string
  description: string
  nodeIds: string[]
}

interface KnowledgeGraph {
  version: string
  project: {
    name: string
    languages: string[]
    frameworks: string[]
    description: string
    analyzedAt: string
    gitCommitHash: string
  }
  nodes: GraphNode[]
  edges: GraphEdge[]
  layers: Layer[]
  tour: TourStep[]
}

const LAYER_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  'layer:build-config': { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-500', glow: '#0ea5e9' },
  'layer:theme-styling': { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-500', glow: '#6366f1' },
  'layer:state-runtime': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-500', glow: '#a855f7' },
  'layer:data-domain': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-500', glow: '#10b981' },
  'layer:ui-primitives': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-500', glow: '#06b6d4' },
  'layer:layout-shell': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500', glow: '#3b82f6' },
  'layer:home-narrative-sections': { bg: 'bg-blue-600/10', border: 'border-blue-600/30', text: 'text-blue-400', glow: '#2563eb' },
  'layer:pages-views': { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-500', glow: '#6366f1' },
  'layer:documentation': { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', glow: '#64748b' },
}

export function UnderstandDashboardPage() {
  const [graphData, setGraphData] = useState<KnowledgeGraph | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'graph' | 'layers' | 'tour'>('graph')
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [selectedLayerId, setSelectedLayerId] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTourIndex, setActiveTourIndex] = useState(0)

  useEffect(() => {
    fetch('/knowledge-graph.json')
      .then((res) => res.json())
      .then((data: KnowledgeGraph) => {
        setGraphData(data)
        setLoading(false)
        if (data.nodes.length > 0) {
          setSelectedNodeId('file:src/App.tsx')
        }
      })
      .catch((err) => {
        console.error('Failed to load knowledge graph:', err)
        setLoading(false)
      })
  }, [])

  // Map nodes to layers
  const nodeLayerMap = useMemo(() => {
    if (!graphData) return new Map<string, string>()
    const map = new Map<string, string>()
    for (const layer of graphData.layers) {
      for (const nid of layer.nodeIds) {
        map.set(nid, layer.id)
      }
    }
    return map
  }, [graphData])

  // Selected node object
  const selectedNode = useMemo(() => {
    if (!graphData || !selectedNodeId) return null
    return graphData.nodes.find((n) => n.id === selectedNodeId) || null
  }, [graphData, selectedNodeId])

  // Inbound and outbound connections for selected node
  const connections = useMemo(() => {
    if (!graphData || !selectedNodeId) return { inbound: [], outbound: [] }
    const inbound = graphData.edges
      .filter((e) => e.target === selectedNodeId)
      .map((e) => ({
        edge: e,
        node: graphData.nodes.find((n) => n.id === e.source)
      }))
      .filter((c) => c.node)

    const outbound = graphData.edges
      .filter((e) => e.source === selectedNodeId)
      .map((e) => ({
        edge: e,
        node: graphData.nodes.find((n) => n.id === e.target)
      }))
      .filter((c) => c.node)

    return { inbound, outbound }
  }, [graphData, selectedNodeId])

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (!graphData) return []
    return graphData.nodes.filter((node) => {
      const matchesSearch =
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.filePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const layerId = nodeLayerMap.get(node.id) || ''
      const matchesLayer = selectedLayerId === 'all' || layerId === selectedLayerId

      return matchesSearch && matchesLayer
    })
  }, [graphData, searchQuery, selectedLayerId, nodeLayerMap])

  // Active tour step
  const activeTourStep = useMemo(() => {
    if (!graphData || !graphData.tour || graphData.tour.length === 0) return null
    return graphData.tour[activeTourIndex] || null
  }, [graphData, activeTourIndex])

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas text-primary-text flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-sm uppercase tracking-widest text-secondary-text">
            Initializing Architecture Knowledge Graph...
          </p>
        </div>
      </div>
    )
  }

  if (!graphData) {
    return (
      <div className="min-h-screen bg-canvas text-primary-text flex items-center justify-center pt-24">
        <div className="text-center max-w-md p-8 border border-border-subtle bg-surface rounded-2xl">
          <Info className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Knowledge Graph Not Loaded</h2>
          <p className="text-sm text-secondary-text mb-6">
            Ensure that <code>.ua/knowledge-graph.json</code> exists and is accessible.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 bg-accent text-white rounded-full font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-primary-text pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Telemetry */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-subtle shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Understand-Anything v{graphData.version}
              </span>
              <span className="text-secondary-text/40">/</span>
              <span className="font-mono text-xs text-secondary-text">Live Architecture Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-text flex items-center gap-3">
              {graphData.project.name}
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20">
                KNOWLEDGE GRAPH
              </span>
            </h1>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-canvas border border-border-subtle flex items-center gap-2">
              <Code2 className="w-4 h-4 text-accent" />
              <span>{graphData.nodes.length} Nodes</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-canvas border border-border-subtle flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-500" />
              <span>{graphData.edges.length} Edges</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-canvas border border-border-subtle flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>{graphData.layers.length} Layers</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-canvas border border-border-subtle flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-500" />
              <span>{graphData.tour.length} Tour Steps</span>
            </div>
          </div>
        </div>

        {/* View Controls & Tab Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface border border-border-subtle">
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'graph'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-secondary-text hover:text-primary-text'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Network Graph
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'layers'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-secondary-text hover:text-primary-text'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Architectural Layers
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                activeTab === 'tour'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-secondary-text hover:text-primary-text'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Guided Tour ({activeTourIndex + 1}/{graphData.tour.length})
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-secondary-text absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes, symbols, files..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface border border-border-subtle text-xs font-mono focus:outline-none focus:border-accent text-primary-text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary-text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={selectedLayerId}
              onChange={(e) => setSelectedLayerId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface border border-border-subtle text-xs font-mono text-secondary-text focus:outline-none focus:border-accent"
            >
              <option value="all">All Layers ({graphData.layers.length})</option>
              {graphData.layers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'graph' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual Node Cloud Canvas */}
            <div className="lg:col-span-8 bg-surface border border-border-subtle rounded-2xl p-6 min-h-[580px] flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-subtle">
                <span className="font-mono text-xs uppercase tracking-wider text-secondary-text flex items-center gap-2">
                  <Network className="w-3.5 h-3.5 text-accent" />
                  Topology Map ({filteredNodes.length} visible entities)
                </span>
                <span className="font-mono text-[11px] text-secondary-text">
                  Click any node to inspect dependencies
                </span>
              </div>

              {/* Node Chips Canvas */}
              <div className="flex-1 flex flex-wrap gap-2.5 content-start overflow-y-auto max-h-[500px] pr-2">
                {filteredNodes.map((node) => {
                  const layerId = nodeLayerMap.get(node.id) || 'layer:build-config'
                  const color = LAYER_COLORS[layerId] || LAYER_COLORS['layer:build-config']
                  const isSelected = selectedNodeId === node.id

                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`group relative text-left px-3 py-2 rounded-xl border transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-accent/15 border-accent shadow-md scale-102 ring-2 ring-accent/30'
                          : `${color.bg} ${color.border} hover:border-accent/60 hover:scale-101`
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-accent animate-ping' : ''}`} style={{ backgroundColor: color.glow }} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-semibold text-primary-text group-hover:text-accent transition-colors">
                            {node.name}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-canvas/80 text-secondary-text uppercase">
                            {node.type}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-secondary-text truncate max-w-[200px]">
                          {node.filePath}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Canvas Bottom Legend */}
              <div className="mt-4 pt-4 border-t border-border-subtle flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary-text">
                  Layer Legend:
                </span>
                {graphData.layers.map((layer) => {
                  const color = LAYER_COLORS[layer.id] || LAYER_COLORS['layer:build-config']
                  return (
                    <button
                      key={layer.id}
                      onClick={() => setSelectedLayerId(selectedLayerId === layer.id ? 'all' : layer.id)}
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[10px] border transition-all ${
                        selectedLayerId === layer.id ? 'border-accent bg-accent/10 font-bold' : 'border-border-subtle'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.glow }} />
                      <span className="text-secondary-text">{layer.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Inspector Sidebar */}
            <div className="lg:col-span-4 bg-surface border border-border-subtle rounded-2xl p-6 flex flex-col justify-between">
              {selectedNode ? (
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4 pb-3 border-b border-border-subtle">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold border border-accent/20">
                        {selectedNode.type}
                      </span>
                      <h3 className="text-lg font-bold text-primary-text mt-1.5 break-all">
                        {selectedNode.name}
                      </h3>
                      <p className="font-mono text-xs text-secondary-text break-all mt-0.5">
                        {selectedNode.filePath}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-5">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-secondary-text mb-1.5">
                      Entity Summary
                    </h4>
                    <p className="text-sm text-primary-text/90 leading-relaxed bg-canvas p-3 rounded-xl border border-border-subtle">
                      {selectedNode.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-5">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-secondary-text mb-2">
                      Tags & Metadata
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNode.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-canvas border border-border-subtle text-secondary-text"
                        >
                          #{t}
                        </span>
                      ))}
                      {selectedNode.complexity && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          complexity: {selectedNode.complexity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dependencies & Inbound/Outbound Edges */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-secondary-text mb-2 flex items-center justify-between">
                        <span>Imports & Dependencies ({connections.outbound.length})</span>
                      </h4>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {connections.outbound.length === 0 ? (
                          <p className="font-mono text-xs text-secondary-text/60 italic">No outgoing dependencies</p>
                        ) : (
                          connections.outbound.map(({ edge, node }) => (
                            <button
                              key={edge.target}
                              onClick={() => setSelectedNodeId(edge.target)}
                              className="w-full text-left p-2 rounded-lg bg-canvas hover:bg-accent/10 border border-border-subtle hover:border-accent/30 text-xs flex items-center justify-between group transition-colors"
                            >
                              <div className="truncate">
                                <span className="font-mono text-[10px] text-accent uppercase font-bold mr-1.5">
                                  {edge.type}
                                </span>
                                <span className="font-mono font-medium text-primary-text group-hover:text-accent">
                                  {node?.name}
                                </span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-secondary-text group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-secondary-text mb-2 flex items-center justify-between">
                        <span>Imported / Called By ({connections.inbound.length})</span>
                      </h4>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {connections.inbound.length === 0 ? (
                          <p className="font-mono text-xs text-secondary-text/60 italic">No inbound callers</p>
                        ) : (
                          connections.inbound.map(({ edge, node }) => (
                            <button
                              key={edge.source}
                              onClick={() => setSelectedNodeId(edge.source)}
                              className="w-full text-left p-2 rounded-lg bg-canvas hover:bg-accent/10 border border-border-subtle hover:border-accent/30 text-xs flex items-center justify-between group transition-colors"
                            >
                              <div className="truncate">
                                <span className="font-mono text-[10px] text-cyan-500 uppercase font-bold mr-1.5">
                                  {edge.type}
                                </span>
                                <span className="font-mono font-medium text-primary-text group-hover:text-accent">
                                  {node?.name}
                                </span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-secondary-text group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <Info className="w-8 h-8 text-secondary-text/40 mb-3" />
                  <p className="font-mono text-xs text-secondary-text">Select a node to inspect architecture</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Architectural Layers View */}
        {activeTab === 'layers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphData.layers.map((layer) => {
              const color = LAYER_COLORS[layer.id] || LAYER_COLORS['layer:build-config']
              const layerNodes = graphData.nodes.filter((n) => layer.nodeIds.includes(n.id))

              return (
                <div
                  key={layer.id}
                  className="bg-surface border border-border-subtle rounded-2xl p-6 flex flex-col justify-between hover:border-accent/40 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-3 h-3 rounded-full ${color.bg}`} style={{ backgroundColor: color.glow }} />
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-canvas border border-border-subtle text-secondary-text">
                        {layerNodes.length} nodes
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary-text mb-1">{layer.name}</h3>
                    <p className="text-xs text-secondary-text mb-4 leading-relaxed">{layer.description}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border-subtle">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-secondary-text block mb-2">
                      Constituent Files:
                    </span>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {layerNodes.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            setSelectedNodeId(n.id)
                            setActiveTab('graph')
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg bg-canvas hover:bg-accent/10 border border-border-subtle text-[11px] font-mono text-primary-text truncate block hover:text-accent transition-colors"
                        >
                          {n.filePath}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Guided Tour Player */}
        {activeTab === 'tour' && activeTourStep && (
          <div className="bg-surface border border-border-subtle rounded-3xl p-8 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-xs font-bold border border-accent/20">
                  STEP {activeTourStep.order} OF {graphData.tour.length}
                </span>
                <span className="font-mono text-xs text-secondary-text uppercase tracking-wider">
                  Interactive Architectural Walkthrough
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeTourIndex === 0}
                  onClick={() => setActiveTourIndex((prev) => Math.max(0, prev - 1))}
                  className="p-2 rounded-xl border border-border-subtle bg-canvas hover:bg-surface disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={activeTourIndex === graphData.tour.length - 1}
                  onClick={() => setActiveTourIndex((prev) => Math.min(graphData.tour.length - 1, prev + 1))}
                  className="p-2 rounded-xl border border-border-subtle bg-canvas hover:bg-surface disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-text mb-3">
                {activeTourStep.title}
              </h2>
              <p className="text-base text-secondary-text leading-relaxed">
                {activeTourStep.description}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-canvas border border-border-subtle mb-8">
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent mb-3 font-semibold flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Key Architectural Files for this Step:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTourStep.nodeIds.map((nid) => {
                  const n = graphData.nodes.find((node) => node.id === nid)
                  return (
                    <button
                      key={nid}
                      onClick={() => {
                        setSelectedNodeId(nid)
                        setActiveTab('graph')
                      }}
                      className="p-3 rounded-xl bg-surface border border-border-subtle hover:border-accent text-left group transition-all flex items-start justify-between"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-primary-text group-hover:text-accent">
                          {n?.name || nid}
                        </div>
                        <p className="font-mono text-[10px] text-secondary-text truncate max-w-[240px]">
                          {n?.filePath || nid}
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-secondary-text group-hover:text-accent mt-0.5" />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
              <span className="font-mono text-xs text-secondary-text">
                Progress: {Math.round(((activeTourIndex + 1) / graphData.tour.length) * 100)}% Completed
              </span>
              <div className="flex items-center gap-3">
                {activeTourIndex < graphData.tour.length - 1 ? (
                  <button
                    onClick={() => setActiveTourIndex((prev) => prev + 1)}
                    className="px-6 py-2.5 rounded-full bg-accent text-white font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                  >
                    Next Step ({activeTourIndex + 2})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('graph')}
                    className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                  >
                    Tour Complete · Explore Graph
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
