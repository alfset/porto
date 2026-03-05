'use client'
import { useEffect, useRef, useState } from 'react'

const STACK = [
  {
    cat: 'Blockchain & Web3',
    color: '#0A0A0A',
    items: [
      { name: 'Solidity', level: 90, desc: 'Smart contract language' },
      { name: 'Hardhat', level: 85, desc: 'EVM dev framework' },
      { name: 'Foundry',  level: 80, desc: 'Rust-based EVM toolkit' },
      { name: 'ethers.js',  level: 88, desc: 'Ethereum JS library' },
      { name: 'Aiken', level: 72, desc: 'Cardano smart contract lang' },
      { name: 'Haskell', level: 65, desc: 'Functional programming' },
    ],
  },
  {
    cat: 'Frontend',
    color: '#1a1a1a',
    items: [
      { name: 'Next.js',  level: 92, desc: 'React meta-framework' },
      { name: 'React',  level: 90, desc: 'UI component library' },
      { name: 'TypeScript',level: 88, desc: 'Typed JavaScript' },
      { name: 'Tailwind',  level: 92, desc: 'Utility CSS framework' },
      { name: 'Three.js',  level: 72, desc: '3D WebGL library' },
      { name: 'Framer',  level: 78, desc: 'Motion & animation' },
    ],
  },
  {
    cat: 'Backend & Infra',
    color: '#2a2a2a',
    items: [
      { name: 'Node.js', level: 85, desc: 'JS runtime' },
      { name: 'Go',  level: 75, desc: 'Systems language' },
      { name: 'Docker', level: 88, desc: 'Containerization' },
      { name: 'Nginx',  level: 82, desc: 'Web server / proxy' },
      { name: 'Python',  level: 80, desc: 'Scripting & automation' },
      { name: 'Rust',  level: 75, desc: 'Systems & Solana programs' },
    ],
  },
  {
    cat: 'Validator & DevOps',
    color: '#3a3a3a',
    items: [
      { name: 'Cosmos SDK',  level: 88, desc: 'Blockchain framework' },
      { name: 'Tendermint', level: 85, desc: 'BFT consensus engine' },
      { name: 'IBC', level: 80, desc: 'Inter-blockchain comm.' },
      { name: 'Systemd',  level: 85, desc: 'Linux service mgmt' },
      { name: 'Prometheus', level: 78, desc: 'Metrics & monitoring' },
      { name: 'Grafana', level: 75, desc: 'Observability dashboard' },
    ],
  },
]

function SkillBar({ level, delay = 0 }: { level: number; delay?: number }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div ref={ref} className="h-px bg-[#0A0A0A]/10 overflow-hidden">
      <div
        className="h-full bg-[#0A0A0A] transition-all duration-[1200ms] ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

function CategoryPanel({ cat, delay }: { cat: typeof STACK[0]; delay: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="border border-[#0A0A0A]/10 bg-white/50 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Category header */}
      <div className="bg-[#0A0A0A] px-5 py-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#F7F5F0]/70">
          {cat.cat}
        </span>
        <span className="text-[10px] text-[#F7F5F0]/30">{cat.items.length} tools</span>
      </div>

      {/* Items */}
      <div className="divide-y divide-[#0A0A0A]/6">
        {cat.items.map((item, i) => (
          <div
            key={item.name}
            className="group px-5 py-3.5 hover:bg-[#0A0A0A] hover:text-[#F7F5F0] transition-colors duration-200 cursor-default"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium text-[#0A0A0A] group-hover:text-[#F7F5F0] flex-1">
                {item.name}
              </span>
              <span className="text-[9px] text-[#9A9690] group-hover:text-[#F7F5F0]/40 tabular-nums">
                {item.level}%
              </span>
            </div>
            <div className="ml-9">
              <div className="h-px bg-[#0A0A0A]/8 group-hover:bg-[#F7F5F0]/10 overflow-hidden mb-1">
                <div
                  className="h-full bg-[#0A0A0A] group-hover:bg-[#F7F5F0] transition-all duration-[1000ms] ease-out"
                  style={{ width: visible ? `${item.level}%` : '0%', transitionDelay: `${delay + i * 80}ms` }}
                />
              </div>
              <p className="text-[9px] text-[#9A9690] group-hover:text-[#F7F5F0]/40">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="stack" className="py-24 md:py-36 bg-[#F0EEE9] border-y border-[#0A0A0A]/8">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-4">— 02 / Tech Stack</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0A0A0A]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Tools &<br />
              <em>Technologies</em>
            </h2>
          </div>
          <p className="text-[11px] text-[#9A9690] max-w-xs leading-relaxed">
            A full-spectrum toolkit spanning smart contracts, frontend development, backend infrastructure, and validator operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[#0A0A0A]/8">
          {STACK.map((cat, i) => (
            <CategoryPanel key={cat.cat} cat={cat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
