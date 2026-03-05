const items = [
  'Smart Contracts',
  'Validator Operations',
  'dApp Development',
  'Blockchain Infrastructure',
  'Web3 Fullstack',
  'Solidity',
  'Node Operations',
  'DeFi Protocols',
  'Open Source',
  'Indonesia 🇮🇩',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="border-y border-[#0A0A0A]/10 bg-[#0A0A0A] overflow-hidden py-3.5 select-none">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-[10px] tracking-[0.3em] uppercase text-[#F7F5F0]/70 whitespace-nowrap"
          >
            {item}
            <span className="text-[#F7F5F0]/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
