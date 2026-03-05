import { GithubRepo, LANG_COLORS, timeAgo } from '@/lib/github'

interface ProjectsProps {
  repos: GithubRepo[]
}

// Featured / pinned projects (manually curated from alfset's known work)
const FEATURED = [
  {
    name: 'comunitynode-website',
    title: 'ComunityNode',
    desc: 'Main validator node community website. Providing infrastructure services and guides for running blockchain validators across multiple networks.',
    tags: ['Validator', 'Web3', 'Infrastructure'],
    link: 'https://comunitynode.my.id',
    gh: 'https://github.com/alfset',
    live: true,
  },
  {
    name: 'smart-contract',
    title: 'Smart Contracts',
    desc: 'Collection of production-ready Solidity smart contracts for DeFi protocols, NFT systems, and governance mechanisms.',
    tags: ['Solidity', 'DeFi', 'EVM'],
    link: null,
    gh: 'https://github.com/alfset',
    live: false,
  },
  {
    name: 'validator-tools',
    title: 'Validator Tools',
    desc: 'Automated tooling and scripts for managing Cosmos SDK validator nodes — monitoring, alerts, and maintenance automation.',
    tags: ['Go', 'Shell', 'Cosmos'],
    link: null,
    gh: 'https://github.com/alfset',
    live: false,
  },
]

function LangDot({ lang }: { lang: string | null }) {
  if (!lang) return null
  const color = LANG_COLORS[lang] ?? '#9A9690'
  return (
    <span className="flex items-center gap-1.5 text-[10px] text-[#3D3B38]">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      {lang}
    </span>
  )
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-[#F7F5F0] border border-[#0A0A0A]/10 p-6 hover:border-[#0A0A0A]/40 hover:bg-white transition-all duration-200 card-border-sweep"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3
          className="text-sm font-medium text-[#0A0A0A] group-hover:underline leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {repo.name}
        </h3>
        <span className="text-[10px] text-[#9A9690] shrink-0 mt-0.5">↗</span>
      </div>

      <p className="text-[11px] text-[#3D3B38] leading-relaxed mb-4 line-clamp-2">
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[9px] tracking-wider uppercase border border-[#0A0A0A]/10 text-[#9A9690]"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto">
        <LangDot lang={repo.language} />
        <div className="flex items-center gap-3 text-[10px] text-[#9A9690]">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <StarIcon /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <ForkIcon /> {repo.forks_count}
            </span>
          )}
          <span>{timeAgo(repo.updated_at)}</span>
        </div>
      </div>
    </a>
  )
}

function FeaturedCard({ project }: { project: typeof FEATURED[0] }) {
  return (
    <div className="group bg-[#0A0A0A] text-[#F7F5F0] p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden">
      {/* Live badge */}
      {project.live && (
        <span className="absolute top-6 right-6 flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Live
        </span>
      )}

      <div>
        <p className="text-[9px] tracking-[0.25em] uppercase text-[#F7F5F0]/40 mb-4">
          Featured Project
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold mb-4 text-[#F7F5F0]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {project.title}
        </h3>
        <p className="text-[11px] text-[#F7F5F0]/60 leading-relaxed">
          {project.desc}
        </p>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[9px] tracking-widest uppercase border border-[#F7F5F0]/15 text-[#F7F5F0]/50"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.live && project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase text-[#F7F5F0] underline underline-offset-2 hover:text-[#F7F5F0]/70 transition-colors"
            >
              Visit ↗
            </a>
          )}
          <a
            href={project.gh}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest uppercase text-[#F7F5F0]/50 hover:text-[#F7F5F0] transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects({ repos }: ProjectsProps) {
  const topRepos = repos.slice(0, 9)

  return (
    <section id="projects" className="py-24 md:py-36 bg-[#F0EEE9] border-y border-[#0A0A0A]/8">
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-4">
              — 02 / Projects
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0A0A0A]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Selected
              <br />
              <em>Work</em>
            </h2>
          </div>
          <a
            href="https://github.com/alfset?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] uppercase text-[#3D3B38] hover:text-[#0A0A0A] border-b border-[#3D3B38]/30 hover:border-[#0A0A0A] pb-0.5 transition-colors self-start md:self-auto"
          >
            All repositories ↗
          </a>
        </div>

        {/* Featured projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0A0A0A]/8 mb-px">
          {FEATURED.map((p) => (
            <FeaturedCard key={p.name} project={p} />
          ))}
        </div>

        {/* Live repos from GitHub */}
        {topRepos.length > 0 && (
          <>
            <div className="mt-12 mb-6 flex items-center gap-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#9A9690]">
                GitHub Repositories
              </p>
              <div className="flex-1 h-px bg-[#0A0A0A]/10" />
              <span className="text-[10px] text-[#9A9690]">{topRepos.length} repos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A0A0A]/8">
              {topRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </>
        )}

        {topRepos.length === 0 && (
          <div className="mt-12 text-center py-16 text-[#9A9690] text-xs">
            <p>Could not load repositories.</p>
            <a
              href="https://github.com/alfset"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A0A0A] underline mt-2 inline-block"
            >
              View on GitHub ↗
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function StarIcon() {
  return (
    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 5C7 3.9 6.1 3 5 3s-2 .9-2 2 .9 2 2 2c.74 0 1.38-.4 1.73-1H8v9.27A2 2 0 0 0 7 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.57-.23-1.08-.6-1.46V9h2.27A2 2 0 0 0 12 10c1.1 0 2-.9 2-2s-.9-2-2-2a2 2 0 0 0-1.73 1H8.27A1.99 1.99 0 0 0 7 5z" />
    </svg>
  )
}
