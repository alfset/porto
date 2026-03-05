'use client'
import { useState } from 'react'

const CREDENTIALS = [
  { label: 'Years in Web3', value: '4+' },
  { label: 'Chains Validated', value: '15+' },
  { label: 'Smart Contracts Deployed', value: '30+' },
  { label: 'Open Source Repos', value: '20+' },
  { label: 'Uptime Record', value: '99.9%' },
]

export default function CVDownload() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    // Trigger download of CV PDF
    const a = document.createElement('a')
    a.href = '/cv-alfino-setiawan.pdf'
    a.download = 'CV-Alfino-Setiawan-Web3-Developer.pdf'
    a.click()
    setTimeout(() => setDownloading(false), 2000)
  }

  return (
    <section className="bg-[#0A0A0A] text-[#F7F5F0] py-20 md:py-28 overflow-hidden">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#F7F5F0]/8 mb-16 md:mb-24">
          {CREDENTIALS.map((c) => (
            <div key={c.label} className="bg-[#0A0A0A] px-6 py-6 text-center hover:bg-[#1a1a1a] transition-colors">
              <div
                className="text-3xl md:text-4xl font-bold text-[#F7F5F0] mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {c.value}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#F7F5F0]/40">{c.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F7F5F0]/30 mb-5">
              — Credentials
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold leading-[0.9] text-[#F7F5F0] mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Download
              <br />
              <em className="text-[#F7F5F0]/50">My CV</em>
            </h2>
            <p className="text-[12px] leading-relaxed text-[#F7F5F0]/50 max-w-md">
              Full résumé including professional background, technical expertise, 
              certifications, and project portfolio. Available as PDF.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4">
            {/* CV preview card */}
            <div className="border border-[#F7F5F0]/10 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F7F5F0]/20 to-transparent" />
              <div className="flex items-start gap-4">
                {/* PDF icon */}
                <div className="w-12 h-14 bg-[#F7F5F0]/8 border border-[#F7F5F0]/10 flex items-center justify-center shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="text-[#F7F5F0]/60">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#F7F5F0] mb-0.5">
                    CV-Alfino-Setiawan.pdf
                  </p>
                  <p className="text-[10px] text-[#F7F5F0]/40">Web3 Developer · Validator Operator</p>
                  <p className="text-[10px] text-[#F7F5F0]/30 mt-1">Updated 2024</p>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-[#F7F5F0]/8 space-y-2">
                {['Experience & Timeline', 'Tech Stack & Skills', 'Project Portfolio', 'Validator History', 'Community Contributions'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[10px] text-[#F7F5F0]/40">
                    <span className="w-1 h-1 rounded-full bg-[#F7F5F0]/20" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="group flex items-center justify-center gap-3 w-full py-4 bg-[#F7F5F0] text-[#0A0A0A] text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-[#E8E6E1] transition-colors disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
                  </svg>
                  Preparing...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download CV (PDF)
                </>
              )}
            </button>

            <div className="flex gap-3">
              <a
                href="https://linkedin.com/in/alfino-setiawan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-[#F7F5F0]/10 text-[9px] tracking-widest uppercase text-[#F7F5F0]/50 hover:border-[#F7F5F0]/30 hover:text-[#F7F5F0] transition-colors text-center"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/alfset"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-[#F7F5F0]/10 text-[9px] tracking-widest uppercase text-[#F7F5F0]/50 hover:border-[#F7F5F0]/30 hover:text-[#F7F5F0] transition-colors text-center"
              >
                GitHub ↗
              </a>
              <a
                href="https://comunitynode.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-[#F7F5F0]/10 text-[9px] tracking-widest uppercase text-[#F7F5F0]/50 hover:border-[#F7F5F0]/30 hover:text-[#F7F5F0] transition-colors text-center"
              >
                Website ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
