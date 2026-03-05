const contacts = [
  {
    platform: 'Email',
    value: 'alfcomunitynode',
    href: 'mailto:alfcomunitynode@gmail.com',
    display: 'alfcomunitynode@gmail.com',
  },
  {
    platform: 'GitHub',
    value: 'alfset',
    href: 'https://github.com/alfset',
    display: 'github.com/alfset',
  },
  {
    platform: 'Twitter',
    value: '@Alfcomunitynode',
    href: 'https://twitter.com/Alfcomunitynode',
    display: 'twitter.com/Alfcomunitynode',
  },
  {
    platform: 'LinkedIn',
    value: 'Alfino Setiawan',
    href: 'https://linkedin.com/in/alfino-setiawan',
    display: 'linkedin.com/in/alfino-setiawan',
  },
  {
    platform: 'Whatsapp',
    value: 'comunitynode.my.id',
    href: 'https://api.whatsapp.com/send/?phone=+6288235502347&text=Hi+Alfino%2C+I+saw+your+CV+and+would+like+to+connect+about+a+work+opportunity.&type=phone_number&app_absent=0',
    display: 'text me on WhatsApp',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-[#0A0A0A] text-[#F7F5F0]"
    >
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left */}
          <div className="md:col-span-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#F7F5F0]/30 mb-6">
              — 04 / Contact
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold leading-tight text-[#F7F5F0] mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Let&apos;s
              <br />
              <em className="text-[#F7F5F0]/50">Connect</em>
            </h2>
            <p className="text-[12px] leading-relaxed text-[#F7F5F0]/50 max-w-xs">
              Open to collaborating on Web3 projects, validator infrastructure,
              smart contract audits, and fullstack dApp development.
            </p>
          </div>

          {/* Right — contact list */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="divide-y divide-[#F7F5F0]/8">
              {contacts.map((c) => (
                <a
                  key={c.platform}
                  href={c.href}
                  target={c.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-5 hover:pl-3 transition-all duration-200"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-[#F7F5F0]/30 w-20 shrink-0">
                      {c.platform}
                    </span>
                    <span className="text-sm text-[#F7F5F0] group-hover:text-white transition-colors">
                      {c.display}
                    </span>
                  </div>
                  <span className="text-[#F7F5F0]/20 group-hover:text-[#F7F5F0] transition-colors text-xs">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
