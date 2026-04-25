'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/report', label: 'Report Incident' },
  { href: '/map', label: 'Live Map' },
  { href: '/admin', label: 'Command Center' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-ng-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-ng-green border-2 border-ng-dark shadow-brutal-sm flex items-center justify-center group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-brutal transition-all duration-150">
            <Shield size={18} className="text-white" />
          </div>
          <span className="font-display font-800 text-xl text-ng-dark tracking-tight">
            Watch<span className="text-ng-green">Dog</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-display font-600 border-2 transition-all duration-150
                  ${active
                    ? 'bg-ng-dark text-white border-ng-dark'
                    : 'border-transparent text-ng-dark hover:border-ng-dark hover:bg-ng-dark hover:text-white'
                  }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Live badge */}
        <div className="hidden md:flex items-center gap-2 bg-ng-red border-2 border-ng-dark px-3 py-1.5 shadow-brutal-sm">
          <span className="pulse-dot w-2 h-2 rounded-full bg-white inline-block" />
          <span className="text-white font-display text-xs font-700 uppercase tracking-wider">Live</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden border-2 border-ng-dark p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-ng-dark bg-white">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-4 font-display font-600 border-b-2 border-ng-dark text-sm
                ${pathname === link.href ? 'bg-ng-dark text-white' : 'text-ng-dark hover:bg-gray-50'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
