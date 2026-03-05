'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#0A0A0A]/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl font-bold tracking-tight text-[#0A0A0A]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          alfset<span className="text-[#9A9690]">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11px] tracking-[0.2em] uppercase text-[#3D3B38] hover:text-[#0A0A0A] transition-colors font-mono"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Status pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[#0A0A0A]/15 text-[10px] tracking-widest uppercase text-[#3D3B38]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          Open to Collaborate
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-[#0A0A0A] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-[#0A0A0A] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#0A0A0A] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#0A0A0A]/10 bg-[#F7F5F0]/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.2em] uppercase text-[#3D3B38] hover:text-[#0A0A0A] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
