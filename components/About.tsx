const skills = [
  { cat: 'Smart Contracts', items: ['Solidity', 'Hardhat', 'Foundry', 'OpenZeppelin'] },
  { cat: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { cat: 'Backend', items: ['Node.js', 'Go', 'REST APIs', 'GraphQL'] },
  { cat: 'Infra', items: ['Docker', 'Linux', 'Nginx', 'Systemd'] },
  { cat: 'Validator', items: ['Cosmos SDK', 'EVM Chains', 'Tendermint', 'IBC'] },
  { cat: 'Web3', items: ['ethers.js', 'wagmi', 'IPFS', 'The Graph'] },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        {/* Left */}
        <div className="md:col-span-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-6">
            — 01 / About
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#0A0A0A]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Who I
            <br />
            <em>Am</em>
          </h2>

          <div className="space-y-5 text-[12px] leading-[1.9] text-[#3D3B38]">
            <p>
              Hi, I&apos;m <strong className="text-[#0A0A0A] font-medium">Alfino Setiawan</strong> — 
              known online as <strong className="text-[#0A0A0A] font-medium">alfset</strong> and{' '}
              <strong className="text-[#0A0A0A] font-medium">alfcomunitynode</strong>. A Web3 
              fullstack developer and validator operator based in Indonesia.
            </p>
            <p>
              I specialize in building decentralized applications from the ground up — smart 
              contract architecture to production-ready frontends — while also operating 
              validator infrastructure on multiple blockchain networks.
            </p>
            <p>
              Currently passionate about: secure smart contract development, scalable 
              dApp architecture, and maintaining reliable validator nodes across the 
              Cosmos ecosystem and EVM-compatible chains.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {[
              { text: 'Smart contract development' },
              { text: 'Fullstack dApp development' },
              { text: 'Validator operations for Blockchain Networks' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-[11px] text-[#3D3B38]">
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Skills grid */}
        <div className="md:col-span-7">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-6">
            — Stack & Tools
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#0A0A0A]/8">
            {skills.map((skill) => (
              <div
                key={skill.cat}
                className="bg-[#F7F5F0] p-5 hover:bg-[#0A0A0A] hover:text-[#F7F5F0] transition-colors duration-200 group"
              >
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#9A9690] group-hover:text-[#F7F5F0]/50 mb-3">
                  {skill.cat}
                </p>
                <ul className="space-y-1">
                  {skill.items.map((item) => (
                    <li key={item} className="text-[11px] text-[#3D3B38] group-hover:text-[#F7F5F0]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
