'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Incident } from '@/lib/mockData'

interface Props {
  incidents: Incident[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function FlyToSelected({ incidents, selectedId }: { incidents: Incident[]; selectedId: string | null }) {
  const map = useMap()
  useEffect(() => {
    if (!selectedId) return
    const inc = incidents.find(i => i.id === selectedId)
    if (inc) {
      map.flyTo([inc.lat, inc.lng], 12, { duration: 1.2 })
    }
  }, [selectedId, incidents, map])
  return null
}

function getColor(incident: Incident) {
  if (incident.status === 'resolved') return '#008751'
  if (incident.severity === 'critical') return '#E53935'
  if (incident.severity === 'moderate') return '#FFC107'
  return '#64B5F6'
}

export default function MapComponent({ incidents, selectedId, onSelect }: Props) {
  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToSelected incidents={incidents} selectedId={selectedId} />

      {incidents.map(incident => {
        const color = getColor(incident)
        const isSelected = selectedId === incident.id
        const radius = incident.severity === 'critical' ? 18 : incident.severity === 'moderate' ? 14 : 10

        return (
          <CircleMarker
            key={incident.id}
            center={[incident.lat, incident.lng]}
            radius={isSelected ? radius + 4 : radius}
            pathOptions={{
              color: '#1A1A1A',
              weight: isSelected ? 3 : 2,
              fillColor: color,
              fillOpacity: isSelected ? 0.95 : 0.75,
            }}
            eventHandlers={{
              click: () => onSelect(incident.id),
            }}
          >
            <Popup>
              <div style={{ fontFamily: 'DM Sans, sans-serif', minWidth: '200px' }}>
                <div style={{
                  background: color,
                  color: incident.severity === 'moderate' ? '#1A1A1A' : 'white',
                  fontWeight: 700,
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 8px',
                  marginBottom: '8px',
                }}>
                  {incident.typeLabel} · {incident.severity.toUpperCase()}
                </div>
                <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>
                  {incident.ward}, {incident.lga}
                </strong>
                <span style={{ fontSize: '11px', color: '#666' }}>{incident.state}</span>
                <p style={{ fontSize: '12px', marginTop: '8px', color: '#333', lineHeight: 1.5 }}>
                  {incident.summary}
                </p>
                <div style={{
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid #eee',
                  fontSize: '11px',
                  color: '#888',
                }}>
                  {incident.id} · {new Date(incident.reportedAt).toLocaleTimeString()}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
