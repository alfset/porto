import Image from 'next/image'
import { GithubUser } from '@/lib/github'

interface HeroProps {
  user: GithubUser | null
}

export default function Hero({ user }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-end pb-16 pt-32 px-6 md:px-12 max-w-[1400px] mx-auto"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-20 md:mb-32">
        <div className="text-[10px] tracking-[0.25em] uppercase text-[#9A9690] leading-loose max-w-[200px]">
          <p>Web3 Fullstack</p>
          <p>Developer &</p>
          <p>Validator Operator</p>
        </div>

        {/* Avatar */}
        {user?.avatar_url && (
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 border border-[#0A0A0A]/20 overflow-hidden">
              <Image
                src={user.avatar_url}
                alt={user.name || user.login}
                width={80}
                height={80}
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-600 rounded-full border-2 border-[#F7F5F0]" />
          </div>
        )}
      </div>

      {/* Main heading */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-4">
          — Indonesia, 🇮🇩
        </p>
        <h1
          className="text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.9] tracking-tight text-[#0A0A0A]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Alfino
          <br />
          <em className="not-italic text-[#3D3B38]">Setiawan</em>
        </h1>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-[#0A0A0A]/10 pt-8">
        <p
          className="text-[11px] md:text-xs leading-relaxed text-[#3D3B38] max-w-sm"
          style={{ fontFamily: 'DM Mono, monospace' }}
        >
          Building and securing decentralized applications.
          <br />
          Smart contracts · dApps · Validator infrastructure.
        </p>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12">
          {[
            { val: user?.public_repos ?? '—', label: 'Repos' },
            { val: user?.followers ?? '—', label: 'Followers' },
            { val: user?.following ?? '—', label: 'Following' },
          ].map((s) => (
            <div key={s.label} className="text-right">
              <div
                className="text-2xl md:text-3xl font-bold text-[#0A0A0A] leading-none"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {s.val}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#9A9690] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <a
            href="#projects"
            className="px-5 py-3 bg-[#0A0A0A] text-[#F7F5F0] text-[10px] tracking-[0.2em] uppercase hover:bg-[#3D3B38] transition-colors"
          >
            View Work
          </a>
          <a
            href="https://github.com/alfset"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-[#0A0A0A]/20 text-[10px] tracking-[0.2em] uppercase hover:border-[#0A0A0A] transition-colors text-[#3D3B38] hover:text-[#0A0A0A]"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
