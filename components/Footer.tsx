export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[#0A0A0A]/10 bg-[#F7F5F0] px-6 md:px-12 py-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-[#0A0A0A]/8">
          <span
            className="text-2xl font-bold text-[#0A0A0A]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            alfset<span className="text-[#9A9690]">.</span>
          </span>
          <nav className="flex flex-wrap gap-6">
            {[
              { l: 'About', h: '#about' },
              { l: 'Stack', h: '#stack' },
              { l: 'Experience', h: '#experience' },
              { l: 'Work', h: '#work' },
              { l: 'Projects', h: '#projects' },
              { l: 'Contact', h: '#contact' },
            ].map((s) => (
              <a
                key={s.l}
                href={s.h}
                className="text-[10px] tracking-[0.2em] uppercase text-[#9A9690] hover:text-[#0A0A0A] transition-colors"
              >
                {s.l}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#9A9690] tracking-widest">
            © {year} Alfino Setiawan · Web3 Developer & Validator Operator · Indonesia 🇮🇩
          </p>
          <div className="flex gap-5">
            {[
              { l: 'GitHub', h: 'https://github.com/alfset' },
              { l: 'Twitter', h: 'https://twitter.com/Alfcomunitynode' },
              { l: 'LinkedIn', h: 'https://linkedin.com/in/alfino-setiawan' },
              { l: 'Whatsapp', h: 'https://api.whatsapp.com/send/?phone=+6288235502347&text&type=phone_number&app_absent=0' },
            ].map((s) => (
              <a
                key={s.l}
                href={s.h}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase text-[#9A9690] hover:text-[#0A0A0A] transition-colors"
              >
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
