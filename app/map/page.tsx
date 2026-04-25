'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import { mockIncidents } from '@/lib/mockData'
import { SeverityBadge, TypeBadge } from '@/components/Badges'
import { MapPin, AlertTriangle, Clock, Filter } from 'lucide-react'
import { useState } from 'react'

// Dynamic import to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 border-2 border-ng-dark flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-ng-dark border-t-ng-green rounded-full animate-spin mb-3" />
        <p className="font-display text-sm font-700 text-ng-dark">Loading map...</p>
      </div>
    </div>
  ),
})

type FilterType = 'all' | 'critical' | 'security' | 'logistics'

export default function MapPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = mockIncidents.filter(i => {
    if (filter === 'all') return true
    if (filter === 'critical') return i.severity === 'critical'
    if (filter === 'security') return i.type === 'security'
    if (filter === 'logistics') return i.type === 'logistics' || i.type === 'materials'
    return true
  })

  const selected = mockIncidents.find(i => i.id === selectedId)

  const stats = {
    total: mockIncidents.length,
    critical: mockIncidents.filter(i => i.severity === 'critical').length,
    resolved: mockIncidents.filter(i => i.status === 'resolved').length,
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Page header */}
      <div className="border-b-2 border-ng-dark px-4 sm:px-6 py-4 bg-white">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-800 text-ng-dark flex items-center gap-3">
              <MapPin size={22} className="text-ng-green" />
              Live Incident Heatmap
            </h1>
            <p className="font-body text-gray-500 text-sm mt-0.5">
              Showing {filtered.length} of {stats.total} incidents · Updated in real-time
            </p>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { label: 'Total', value: stats.total, color: 'bg-ng-dark text-white' },
              { label: 'Critical', value: stats.critical, color: 'bg-ng-red text-white' },
              { label: 'Resolved', value: stats.resolved, color: 'bg-ng-green text-white' },
            ].map(s => (
              <div key={s.label} className={`${s.color} border-2 border-ng-dark px-3 py-1.5 flex items-center gap-2`}>
                <span className="font-display font-800 text-sm">{s.value}</span>
                <span className="font-body text-xs opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b-2 border-ng-dark px-4 sm:px-6 py-3 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto flex items-center gap-3 flex-wrap">
          <Filter size={14} className="text-gray-500" />
          <span className="font-display text-xs font-700 uppercase tracking-wider text-gray-500">Filter:</span>
          {([
            { id: 'all', label: 'All Incidents' },
            { id: 'critical', label: '⚡ Critical Only' },
            { id: 'security', label: '🚨 Security' },
            { id: 'logistics', label: '📦 Logistics' },
          ] as { id: FilterType; label: string }[]).map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 text-xs font-display font-700 border-2 transition-all duration-150
                ${filter === f.id
                  ? 'bg-ng-dark text-white border-ng-dark shadow-brutal-sm'
                  : 'bg-white border-ng-dark text-ng-dark hover:bg-ng-dark hover:text-white'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map + sidebar layout */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Map */}
        <div className="flex-1 relative">
          <MapComponent
            incidents={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white border-2 border-ng-dark shadow-brutal p-3 z-[1000]">
            <p className="font-display text-xs font-800 uppercase tracking-wider text-ng-dark mb-2">Legend</p>
            <div className="space-y-1.5">
              {[
                { color: 'bg-ng-red', label: 'Security / Critical' },
                { color: 'bg-ng-yellow', label: 'Logistics / Moderate' },
                { color: 'bg-ng-green', label: 'Resolved / Safe' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${l.color} border border-ng-dark`} />
                  <span className="font-body text-xs text-ng-dark">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l-2 border-ng-dark bg-white flex flex-col overflow-hidden">
          <div className="border-b-2 border-ng-dark px-4 py-3">
            <h2 className="font-display text-sm font-800 uppercase tracking-wider text-ng-dark">
              Recent Alerts
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map(incident => (
              <button
                key={incident.id}
                onClick={() => setSelectedId(selectedId === incident.id ? null : incident.id)}
                className={`w-full text-left px-4 py-4 border-b-2 border-ng-dark transition-all duration-150
                  ${selectedId === incident.id ? 'bg-ng-dark' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <SeverityBadge severity={incident.severity} size="sm" />
                  <span className={`text-[10px] font-body flex items-center gap-1 ${selectedId === incident.id ? 'text-gray-400' : 'text-gray-400'}`}>
                    <Clock size={10} />
                    {new Date(incident.reportedAt).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin size={11} className={`flex-shrink-0 ${selectedId === incident.id ? 'text-ng-green' : 'text-ng-green'}`} />
                  <span className={`font-display text-xs font-700 ${selectedId === incident.id ? 'text-white' : 'text-ng-dark'}`}>
                    {incident.ward}, {incident.lga}
                  </span>
                </div>
                <p className={`font-body text-xs leading-relaxed line-clamp-2 ${selectedId === incident.id ? 'text-gray-300' : 'text-gray-500'}`}>
                  {incident.summary}
                </p>
                <div className="mt-2">
                  <TypeBadge type={incident.type} label={incident.typeLabel} />
                </div>
              </button>
            ))}
          </div>

          {/* Add report CTA */}
          <div className="border-t-2 border-ng-dark p-4">
            <a
              href="/report"
              className="w-full flex items-center justify-center gap-2 bg-ng-green text-white font-display font-700 text-xs py-3 border-2 border-ng-dark shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all"
            >
              <AlertTriangle size={14} />
              Report an Incident
            </a>
          </div>
        </div>
      </div>

      {/* Detail panel when selected (mobile) */}
      {selected && (
        <div className="md:hidden border-t-2 border-ng-dark bg-white p-4">
          <h3 className="font-display font-700 text-sm text-ng-dark mb-2">{selected.ward}, {selected.lga}, {selected.state}</h3>
          <p className="font-body text-xs text-gray-600 line-clamp-3">{selected.summary}</p>
        </div>
      )}
    </div>
  )
}
