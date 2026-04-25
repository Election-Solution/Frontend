'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { mockIncidents, getByStatus, Incident, IncidentStatus } from '@/lib/mockData'
import { SeverityBadge, TypeBadge } from '@/components/Badges'
import {
  Shield, AlertTriangle, MapPin, Clock, X, Image as ImageIcon,
  Send, Bell, CheckCircle, Eye, BarChart3, Users, Zap
} from 'lucide-react'

const columns: { id: IncidentStatus; label: string; borderColor: string; headerBg: string; headerText: string }[] = [
  { id: 'new', label: 'New Alerts', borderColor: 'border-ng-red', headerBg: 'bg-ng-red', headerText: 'text-white' },
  { id: 'verifying', label: 'Verifying', borderColor: 'border-ng-yellow', headerBg: 'bg-ng-yellow', headerText: 'text-ng-dark' },
  { id: 'dispatched', label: 'Intervention Dispatched', borderColor: 'border-blue-500', headerBg: 'bg-blue-500', headerText: 'text-white' },
  { id: 'resolved', label: 'Resolved', borderColor: 'border-ng-green', headerBg: 'bg-ng-green', headerText: 'text-white' },
]

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
}

function KanbanCard({ incident, onClick }: { incident: Incident; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border-2 border-ng-dark shadow-brutal-sm p-4 kanban-card-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <SeverityBadge severity={incident.severity} size="sm" />
        <span className="text-[10px] font-body text-gray-400 flex items-center gap-1">
          <Clock size={10} />
          {formatTime(incident.reportedAt)}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-2">
        <MapPin size={11} className="text-ng-green flex-shrink-0" />
        <span className="font-display text-xs font-700 text-ng-dark truncate">
          {incident.ward} · {incident.lga}
        </span>
      </div>

      <p className="font-body text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
        {incident.summary}
      </p>

      <div className="flex items-center justify-between">
        <TypeBadge type={incident.type} label={incident.typeLabel} />
        <div className="flex items-center gap-2">
          {incident.hasMedia && (
            <span title="Has media" className="text-gray-400">
              <ImageIcon size={12} />
            </span>
          )}
          <span className="font-body text-[10px] text-gray-400">{incident.id}</span>
        </div>
      </div>
    </div>
  )
}

function DetailPanel({ incident, onClose }: { incident: Incident; onClose: () => void }) {
  const [actionSent, setActionSent] = useState<string | null>(null)

  const handleAction = (action: string) => {
    setActionSent(action)
    setTimeout(() => setActionSent(null), 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-ng-dark bg-opacity-60" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-lg bg-white border-l-2 border-ng-dark overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-ng-dark px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SeverityBadge severity={incident.severity} />
              <span className="font-body text-xs text-gray-400">{incident.id}</span>
            </div>
            <h2 className="font-display text-lg font-800 text-ng-dark leading-tight">
              {incident.ward}, {incident.lga}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-ng-dark p-2 hover:bg-ng-dark hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Location info */}
          <div className="bg-gray-50 border-2 border-ng-dark p-4">
            <p className="font-display text-xs font-700 uppercase tracking-wider text-gray-500 mb-3">Location Details</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'State', value: incident.state },
                { label: 'LGA', value: incident.lga },
                { label: 'Ward', value: incident.ward },
                { label: 'Polling Unit', value: incident.pu },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="font-body text-xs text-gray-400 block">{label}</span>
                  <span className="font-display font-700 text-ng-dark">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Type & time */}
          <div className="flex items-center gap-3 flex-wrap">
            <TypeBadge type={incident.type} label={incident.typeLabel} />
            <span className="font-body text-xs text-gray-400 flex items-center gap-1">
              <Clock size={11} />
              Reported at {formatTime(incident.reportedAt)}
            </span>
            <span className="font-body text-xs text-gray-400 flex items-center gap-1">
              <Users size={11} />
              By: {incident.reportedBy}
            </span>
          </div>

          {/* AI Summary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-ng-yellow" />
              <p className="font-display text-xs font-700 uppercase tracking-wider text-ng-dark">AI-Generated Summary</p>
            </div>
            <div className="bg-ng-dark border-2 border-ng-dark p-4">
              <p className="font-body text-sm text-white leading-relaxed">{incident.summary}</p>
            </div>
          </div>

          {/* Raw description */}
          <div>
            <p className="font-display text-xs font-700 uppercase tracking-wider text-gray-500 mb-3">Raw Report</p>
            <div className="border-2 border-ng-dark p-4 bg-white">
              <p className="font-body text-sm text-ng-dark leading-relaxed">{incident.description}</p>
            </div>
          </div>

          {/* Media */}
          {incident.hasMedia ? (
            <div>
              <p className="font-display text-xs font-700 uppercase tracking-wider text-gray-500 mb-3">Attached Media</p>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map(i => (
                  <div
                    key={i}
                    className="aspect-video bg-gray-100 border-2 border-ng-dark flex items-center justify-center"
                  >
                    <div className="text-center">
                      <ImageIcon size={20} className="text-gray-400 mx-auto mb-1" />
                      <span className="font-body text-[10px] text-gray-400">evidence_{i}.jpg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 p-4 text-center">
              <ImageIcon size={20} className="text-gray-300 mx-auto mb-1" />
              <p className="font-body text-xs text-gray-400">No media attached</p>
            </div>
          )}

          {/* Coordinates */}
          <div className="flex items-center gap-2 text-xs font-body text-gray-400">
            <MapPin size={12} />
            <span>GPS: {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="sticky bottom-0 bg-white border-t-2 border-ng-dark p-5 space-y-3">
          {actionSent && (
            <div className="bg-ng-green border-2 border-ng-dark p-3 flex items-center gap-2">
              <CheckCircle size={14} className="text-white" />
              <span className="font-display text-xs font-700 text-white">
                {actionSent === 'security' ? 'Alert forwarded to Security Forces' : 'Electoral Officer notified'}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAction('security')}
              className="flex items-center justify-center gap-2 bg-ng-red text-white font-display font-700 text-xs py-4 border-2 border-ng-dark shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all"
            >
              <Send size={14} />
              Forward to Security
            </button>
            <button
              onClick={() => handleAction('electoral')}
              className="flex items-center justify-center gap-2 bg-ng-yellow text-ng-dark font-display font-700 text-xs py-4 border-2 border-ng-dark shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all"
            >
              <Bell size={14} />
              Alert Electoral Officer
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-ng-green text-white font-display font-700 text-xs py-3 border-2 border-ng-dark shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal transition-all"
          >
            <CheckCircle size={14} />
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)

  const totalNew = getByStatus('new').length
  const totalCritical = mockIncidents.filter(i => i.severity === 'critical').length

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      {/* Command center header */}
      <div className="bg-ng-dark border-b-2 border-ng-dark">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Shield size={20} className="text-ng-green" />
              <h1 className="font-display text-2xl font-800 text-white">Command Center: Admin Triage</h1>
            </div>
            <p className="font-body text-gray-400 text-sm">
              Live election incident management · {mockIncidents.length} total incidents
            </p>
          </div>

          {/* Header stats */}
          <div className="flex items-center gap-3 flex-wrap">
            {[
              { icon: AlertTriangle, label: 'New Alerts', value: totalNew, bg: 'bg-ng-red' },
              { icon: Zap, label: 'Critical', value: totalCritical, bg: 'bg-ng-yellow' },
              { icon: Eye, label: 'Monitoring', value: '847 PUs', bg: 'bg-blue-600' },
              { icon: BarChart3, label: 'Uptime', value: '99.9%', bg: 'bg-ng-green' },
            ].map(({ icon: Icon, label, value, bg }) => (
              <div key={label} className={`${bg} border-2 border-white px-4 py-2 flex items-center gap-2`}>
                <Icon size={14} className="text-white" />
                <div>
                  <div className="font-display font-800 text-sm text-white leading-none">{value}</div>
                  <div className="font-body text-[10px] text-white opacity-70">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban board */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 overflow-x-auto">
        <div className="flex gap-5 min-w-max md:min-w-0 md:grid md:grid-cols-4">
          {columns.map(col => {
            const cards = getByStatus(col.id)
            return (
              <div
                key={col.id}
                className={`flex flex-col w-72 md:w-auto border-2 ${col.borderColor} bg-white shadow-brutal`}
              >
                {/* Column header */}
                <div className={`${col.headerBg} ${col.headerText} border-b-2 ${col.borderColor} px-4 py-3 flex items-center justify-between`}>
                  <span className="font-display text-sm font-800 uppercase tracking-wider">{col.label}</span>
                  <span className={`${col.headerBg === 'bg-ng-yellow' ? 'bg-ng-dark text-white' : 'bg-white text-ng-dark'} font-display font-800 text-xs w-6 h-6 flex items-center justify-center border-2 ${col.headerBg === 'bg-ng-yellow' ? 'border-ng-dark' : 'border-' + col.borderColor.replace('border-', '')}`}>
                    {cards.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 p-3 space-y-3 min-h-[200px]">
                  {cards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-24 opacity-40">
                      <CheckCircle size={20} className="text-gray-300 mb-2" />
                      <p className="font-body text-xs text-gray-400">No incidents</p>
                    </div>
                  ) : (
                    cards.map(incident => (
                      <KanbanCard
                        key={incident.id}
                        incident={incident}
                        onClick={() => setSelectedIncident(incident)}
                      />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      {selectedIncident && (
        <DetailPanel
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  )
}
