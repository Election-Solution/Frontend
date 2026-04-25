'use client'

import { tickerMessages } from '@/lib/mockData'

export default function LiveTicker() {
  const repeated = [...tickerMessages, ...tickerMessages]

  return (
    <div className="w-full bg-ng-dark border-t-2 border-b-2 border-ng-dark overflow-hidden py-3">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 bg-ng-green px-4 py-1 z-10">
          <span className="text-white font-display text-xs font-800 uppercase tracking-widest">
            Live Feed
          </span>
        </div>
        <div className="overflow-hidden flex-1 relative">
          <div className="ticker-content flex gap-16">
            {repeated.map((msg, i) => (
              <span key={i} className="text-white font-body text-sm whitespace-nowrap opacity-90">
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
