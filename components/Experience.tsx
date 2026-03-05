'use client'
import { useEffect, useRef, useState } from 'react'

const EXPERIENCE = [
  {
    role: 'Validator Operator and Node Infrastructure',
    org: 'ComunityNode',
    orgUrl: 'https://comunitynode.my.id',
    period: '2022 — Present',
    type: 'Full-time',
    location: 'Remote · Indonesia',
    desc: 'Operating and maintaining validator nodes across multiple Cosmos SDK-based blockchain networks. Responsible for 99.9%+ uptime, monitoring infrastructure, and community education around validator operations.',
    highlights: [
      'Operated validators on 15+ Cosmos ecosystem chains',
      'Built monitoring dashboards with Prometheus & Grafana',
      'Automated node management with custom shell scripts and Go tooling',
      'Maintained <0.1% downtime across all managed validators',
      'Published open-source guides and tutorials for node operators',
    ],
    tags: ['Cosmos SDK', 'Tendermint', 'IBC', 'Prometheus', 'Go', 'Linux'],
  },
  {
    role: 'Web3 Fullstack Developer',
    org: 'Freelance / Open Source',
    orgUrl: 'https://github.com/alfset',
    period: '2021 — Present',
    type: 'Freelance',
    location: 'Remote · Worldwide',
    desc: 'Designing and developing decentralized applications for Web3 clients. Full project lifecycle ownership — from smart contract architecture through frontend delivery and deployment.',
    highlights: [
      'Built DeFi protocol interfaces with React, Next.js, and wagmi',
      'Developed and audited Solidity smart contracts for EVM chains',
      'Integrated on-chain data via The Graph subgraphs',
      'Delivered NFT minting platforms with IPFS metadata storage',
      'Contributed to multiple open-source Web3 projects',
    ],
    tags: ['Solidity', 'Next.js', 'ethers.js', 'The Graph', 'IPFS', 'TypeScript'],
  },
  {
    role: 'Blockchain Developer',
    org: 'Personal Projects & Community',
    orgUrl: 'https://github.com/alfset',
    period: '2020 — 2021',
    type: 'Self-directed',
    location: 'Indonesia',
    desc: 'Deep dive into blockchain fundamentals — exploring EVM internals, writing first smart contracts, and building foundational Web3 tooling. Active contributor to Indonesian Web3 developer communities.',
    highlights: [
      'Deployed first mainnet smart contracts on Ethereum',
      'Studied Cosmos whitepaper and began validator setup',
      'Built blockchain explorer integrations and wallet adapters',
      'Mentored junior developers in Web3 fundamentals',
    ],
    tags: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat', 'IPFS'],
  },
]

function TimelineItem({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(index === 0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const isFirst = index === 0

  return (
    <div
      ref={ref}
      className="grid grid-cols-12 gap-6 md:gap-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
      }}
    >
      {/* Left col — period */}
      <div className="col-span-12 md:col-span-3 pt-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#9A9690] mb-1">{exp.period}</p>
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#0A0A0A]/40">{exp.type}</p>
        <p className="text-[10px] text-[#9A9690] mt-1">{exp.location}</p>
      </div>

      {/* Timeline line — visible only md+ */}
      <div className="hidden md:flex col-span-1 flex-col items-center">
        <div
          className="w-2.5 h-2.5 rounded-full border-2 border-[#0A0A0A] mt-1 shrink-0 transition-colors duration-500"
          style={{ background: visible ? '#0A0A0A' : 'transparent' }}
        />
        {index < EXPERIENCE.length - 1 && (
          <div className="flex-1 w-px bg-[#0A0A0A]/15 mt-2" />
        )}
      </div>

      {/* Right col — content */}
      <div className="col-span-12 md:col-span-8 pb-12 md:pb-16">
        <button
          className="w-full text-left group"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className="text-xl md:text-2xl font-bold text-[#0A0A0A] leading-tight mb-1 group-hover:text-[#3D3B38] transition-colors"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {exp.role}
              </h3>
              <a
                href={exp.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wider text-[#9A9690] hover:text-[#0A0A0A] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {exp.org} ↗
              </a>
            </div>
            <span
              className="shrink-0 w-6 h-6 border border-[#0A0A0A]/15 flex items-center justify-center text-[#9A9690] mt-1 transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </div>
        </button>

        {/* Expandable content */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: expanded ? '600px' : '0px', opacity: expanded ? 1 : 0 }}
        >
          <p className="text-[12px] text-[#3D3B38] leading-relaxed mt-4 mb-5">{exp.desc}</p>

          <ul className="space-y-2 mb-5">
            {exp.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[11px] text-[#3D3B38]"
                style={{
                  opacity: expanded ? 1 : 0,
                  transform: expanded ? 'none' : 'translateX(-8px)',
                  transition: `opacity 0.4s ease ${i * 60 + 200}ms, transform 0.4s ease ${i * 60 + 200}ms`,
                }}
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#0A0A0A]/40 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[9px] tracking-widest uppercase border border-[#0A0A0A]/12 text-[#3D3B38] bg-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {!expanded && (
          <p className="text-[11px] text-[#9A9690] mt-3 truncate">{exp.desc.slice(0, 80)}...</p>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-4">— 03 / Experience</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0A0A0A]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Work
            <br />
            <em>Timeline</em>
          </h2>
        </div>
        <p className="text-[11px] text-[#9A9690] max-w-xs leading-relaxed">
          Years of hands-on experience across the full Web3 stack — from DeFi protocols to live validator infrastructure.
        </p>
      </div>

      <div>
        {EXPERIENCE.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
