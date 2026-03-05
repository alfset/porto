'use client'
import { useEffect, useRef, useState } from 'react'

const WORKS = [
  {
    id: '01',
    title: 'ComunityNode Platform',
    subtitle: 'Validator Infrastructure & Community Hub',
    year: '2022',
    category: 'Web3 Infrastructure',
    status: 'Live',
    liveUrl: 'https://comunitynode.my.id',
    ghUrl: 'https://github.com/alfset',
    desc: 'Full-stack platform for the ComunityNode validator service. Real-time validator status, uptime monitoring, staking guides, and community resources for delegators across 15+ Cosmos ecosystem chains.',
    outcomes: ['99.9% uptime', '15+ chains', '500+ community'],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Cosmos SDK', 'Prometheus'],
  },
  {
    id: '02',
    title: 'Physica Finance',
    subtitle: 'DeFi Lending & Borrowing Protocol',
    year: '2021',
    category: 'DeFi Protocol',
    status: 'Live',
    liveUrl: 'https://physica.finance',
    ghUrl: 'https://github.com/alfset',
    desc: 'EVM-based algorithmic money market with variable interest rates, over-collateralized lending, liquidation protection, and a full React frontend. Won Web3 Indonesia Hackathon 2022.',
    outcomes: ['Hackathon Winner', 'EVM Mainnet', 'Audited Contracts'],
    stack: ['Solidity', 'Hardhat', 'React', 'ethers.js', 'The Graph'],
  },
  {
    id: '03',
    title: 'NFT Launchpad',
    subtitle: 'ERC-721/1155 Minting Platform',
    year: '2022',
    category: 'NFT / Web3',
    status: 'Completed',
    liveUrl: null,
    ghUrl: 'https://github.com/alfset',
    desc: 'End-to-end NFT marketplace with custom ERC-721/1155 contracts, IPFS metadata, on-chain royalties, and Next.js storefront with real-time bid tracking and Metamask/WalletConnect integration.',
    outcomes: ['ERC-721 & 1155', 'IPFS metadata', 'On-chain royalties'],
    stack: ['Solidity', 'Next.js', 'wagmi', 'IPFS', 'OpenZeppelin'],
  },
  {
    id: '04',
    title: 'Validator Monitoring Suite',
    subtitle: 'DevOps & Observability Toolkit',
    year: '2022',
    category: 'Open Source',
    status: 'Open Source',
    liveUrl: null,
    ghUrl: 'https://github.com/alfset',
    desc: 'Custom monitoring and alerting toolkit for Cosmos validator operators. Tracks block signing, jailing risk, voting power, and peer connectivity — with Telegram bot alerts and Grafana dashboards.',
    outcomes: ['Real-time alerts', 'Multi-chain', 'Gitcoin Funded'],
    stack: ['Go', 'Prometheus', 'Grafana', 'Telegram API', 'Systemd'],
  },
  {
    id: '05',
    title: 'Cross-chain IBC Bridge UI',
    subtitle: 'Inter-Blockchain Transfer Interface',
    year: '2023',
    category: 'Cross-chain',
    status: 'Completed',
    liveUrl: null,
    ghUrl: 'https://github.com/alfset',
    desc: 'User-friendly frontend for IBC token transfers across Cosmos chains. Features chain discovery, fee estimation, transaction tracking, and wallet support for Keplr and Leap wallets.',
    outcomes: ['10+ Cosmos chains', 'Keplr + Leap', 'DoraHacks Top 5'],
    stack: ['React', 'CosmJS', 'Keplr API', 'TypeScript', 'Tailwind'],
  },
  {
    id: '06',
    title: 'DAO Governance Portal',
    subtitle: 'On-chain Voting & Treasury Management',
    year: '2023',
    category: 'DAO / Governance',
    status: 'Completed',
    liveUrl: null,
    ghUrl: 'https://github.com/alfset',
    desc: 'Decentralized governance portal with proposal creation, token-weighted quorum, Snapshot off-chain voting, and on-chain execution via Gnosis Safe multisig. Built on Governor Bravo framework.',
    outcomes: ['Token-weighted voting', 'Gnosis Safe', 'Snapshot integration'],
    stack: ['Solidity', 'Next.js', 'wagmi', 'Snapshot', 'Gnosis Safe'],
  },
]

function WorkCard({ work, index }: { work: { id: string; title: string; subtitle: string; year: string; category: string; status: string; liveUrl: string | null; ghUrl: string; desc: string; outcomes: string[]; stack: string[] }; index: number }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
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
      className="group border border-[#0A0A0A]/10 bg-white overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${(index % 3) * 100}ms, transform 0.6s ease ${(index % 3) * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top bar */}
      <div
        className="h-1 transition-all duration-500"
        style={{ background: hovered ? '#0A0A0A' : '#E8E6E1' }}
      />

      <div className="p-6 md:p-7">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#9A9690]">{work.id}</span>
              <span className="w-px h-3 bg-[#0A0A0A]/15" />
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#9A9690]">{work.category}</span>
            </div>
            <h3
              className="text-lg font-bold text-[#0A0A0A] leading-tight group-hover:text-[#3D3B38] transition-colors"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {work.title}
            </h3>
            <p className="text-[11px] text-[#9A9690] mt-0.5">{work.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <span
              className="inline-flex items-center gap-1.5 text-[9px] tracking-widest uppercase px-2.5 py-1 border"
              style={{
                borderColor: work.status === 'Live' ? '#059669' : '#0A0A0A20',
                color: work.status === 'Live' ? '#059669' : '#9A9690',
              }}
            >
              {work.status === 'Live' && <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />}
              {work.status}
            </span>
            <p className="text-[9px] text-[#9A9690] mt-1">{work.year}</p>
          </div>
        </div>

        <p className="text-[11px] text-[#3D3B38] leading-relaxed mb-5">{work.desc}</p>

        {/* Outcomes */}
        <div className="grid grid-cols-3 gap-2 mb-5 p-3 bg-[#F7F5F0] border border-[#0A0A0A]/6">
          {work.outcomes.map((o) => (
            <div key={o} className="text-center">
              <p className="text-[9px] text-[#3D3B38] leading-snug">{o}</p>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {work.stack.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 text-[9px] tracking-wider uppercase border border-[#0A0A0A]/10 text-[#9A9690] group-hover:border-[#0A0A0A]/20 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-[#0A0A0A]/8">
          {work.liveUrl && (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#0A0A0A] hover:text-[#3D3B38] transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              Live Site ↗
            </a>
          )}
          <a
            href={work.ghUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#9A9690] hover:text-[#0A0A0A] transition-colors ml-auto"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SampleWork() {
  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-4">— 04 / Sample Work</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0A0A0A]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Case
            <br />
            <em>Studies</em>
          </h2>
        </div>
        <a
          href="https://github.com/alfset"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.2em] uppercase text-[#3D3B38] hover:text-[#0A0A0A] border-b border-[#3D3B38]/30 hover:border-[#0A0A0A] pb-0.5 transition-colors self-start md:self-auto"
        >
          All on GitHub ↗
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#0A0A0A]/8">
        {WORKS.map((w, i) => (
          <WorkCard key={w.id} work={w} index={i} />
        ))}
      </div>
    </section>
  )
}