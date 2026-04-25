import { IncidentSeverity, IncidentType } from '@/lib/mockData'

interface SeverityBadgeProps {
  severity: IncidentSeverity
  size?: 'sm' | 'md'
}

export function SeverityBadge({ severity, size = 'md' }: SeverityBadgeProps) {
  const config = {
    critical: { bg: 'bg-ng-red', text: 'text-white', label: '⚡ Critical' },
    moderate: { bg: 'bg-ng-yellow', text: 'text-ng-dark', label: '⚠ Moderate' },
    low: { bg: 'bg-gray-200', text: 'text-ng-dark', label: '● Low' },
  }
  const c = config[severity]
  const sz = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'

  return (
    <span className={`${c.bg} ${c.text} ${sz} font-display font-700 uppercase tracking-wider border border-ng-dark inline-block`}>
      {c.label}
    </span>
  )
}

interface TypeBadgeProps {
  type: IncidentType
  label: string
}

export function TypeBadge({ type, label }: TypeBadgeProps) {
  const config = {
    security: 'border-ng-red text-ng-red',
    suppression: 'border-ng-red text-ng-red',
    materials: 'border-ng-yellow text-amber-700',
    logistics: 'border-blue-400 text-blue-700',
  }

  return (
    <span className={`border-2 ${config[type]} text-[10px] font-display font-700 uppercase tracking-wider px-2 py-0.5`}>
      {label}
    </span>
  )
}
