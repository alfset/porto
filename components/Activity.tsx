'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { GithubEvent, GithubUser, CommitActivity, timeAgo } from '@/lib/github'

interface ActivityProps {
  events: GithubEvent[]
  user: GithubUser | null
}

const EVENT_LABELS: Record<string, string> = {
  PushEvent: 'pushed to',
  CreateEvent: 'created',
  WatchEvent: 'starred',
  ForkEvent: 'forked',
  IssuesEvent: 'issue in',
  PullRequestEvent: 'PR in',
  IssueCommentEvent: 'commented on',
  DeleteEvent: 'deleted in',
  ReleaseEvent: 'released',
  PublicEvent: 'made public',
  MemberEvent: 'member event in',
  CommitCommentEvent: 'commented on',
}

const EVENT_COLOR: Record<string, string> = {
  PushEvent: '#0A0A0A',
  CreateEvent: '#059669',
  WatchEvent: '#D97706',
  ForkEvent: '#7C3AED',
  PullRequestEvent: '#2563EB',
  commit: '#0A0A0A',
}

// Unified feed item
interface FeedItem {
  id: string
  type: string
  repo: string
  repoFull: string
  label: string
  detail: string | null
  date: string
  url: string
  dotColor: string
}

function eventsToFeed(events: GithubEvent[]): FeedItem[] {
  return events.map((e) => ({
    id: e.id,
    type: e.type,
    repo: e.repo.name.split('/')[1] || e.repo.name,
    repoFull: e.repo.name,
    label: EVENT_LABELS[e.type] ?? e.type.replace('Event', ''),
    detail: e.payload.commits?.[0]?.message?.split('\n')[0] ?? null,
    date: e.created_at,
    url: `https://github.com/${e.repo.name}`,
    dotColor: EVENT_COLOR[e.type] ?? '#9A9690',
  }))
}

function commitsToFeed(commits: CommitActivity[]): FeedItem[] {
  return commits.map((c) => ({
    id: `commit-${c.sha}-${c.repo}`,
    type: 'commit',
    repo: c.repo.split('/')[1] || c.repo,
    repoFull: c.repo,
    label: 'committed to',
    detail: c.message,
    date: c.date,
    url: c.url,
    dotColor: '#0A0A0A',
  }))
}

export default function Activity({ events, user }: ActivityProps) {
  const [commits, setCommits] = useState<CommitActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch commits client-side from known active repos
    const ACTIVE_REPOS = [
      'alfset/celo-miniPay',
      'alfset/learnRust',
      'alfset/reward',
      'alfset/stacks-tic-tac-toe',
      'alfset/CoFinance-RWA',
      'alfset/cardano-template-and-ecosystem-moni',
      'alfset/x402',
      'Comunity-Node/X402For',
      'Surabaya-Blockchain-Alliance/DecentGigs',
      'Surabaya-Blockchain-Alliance/Surabaya-Blockchain-Alliance',
      'Surabaya-Blockchain-Alliance/Bakcend-Surabaya-Blockchain-Aliance',
    ]

    const since = new Date()
    since.setFullYear(since.getFullYear() - 3)

    Promise.allSettled(
      ACTIVE_REPOS.map((repo) =>
        fetch(
          `https://api.github.com/repos/${repo}/commits?author=alfset&since=${since.toISOString()}&per_page=100`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        )
          .then((r) => r.ok ? r.json() : [])
          .then((data) =>
            Array.isArray(data)
              ? data.map((c: { sha: string; commit: { message: string; author: { date: string } }; html_url: string }) => ({
                  repo,
                  sha: c.sha?.slice(0, 7) ?? '',
                  message: c.commit?.message?.split('\n')[0] ?? '',
                  date: c.commit?.author?.date ?? '',
                  url: c.html_url ?? `https://github.com/${repo}`,
                }))
              : []
          )
          .catch(() => [])
      )
    ).then((results) => {
      const all = results
        .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
        .filter((c) => c.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setCommits(all)
      setLoading(false)
    })
  }, [])

  // Merge events + commits, deduplicate, sort by date
  const eventFeed = eventsToFeed(events)
  const commitFeed = commitsToFeed(commits)

  const seen = new Set<string>()
  const merged: FeedItem[] = [...eventFeed, ...commitFeed]
    .filter((item) => {
      // Deduplicate: skip commit items if a PushEvent already covers same repo+date
      const key = `${item.repoFull}-${item.date.slice(0, 10)}-${item.type === 'commit' ? 'commit' : item.type}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section id="activity" className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        {/* Left */}
        <div className="md:col-span-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690] mb-6">
            — Activity
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight text-[#0A0A0A] mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            GitHub
            <br />
            <em>Activity</em>
          </h2>

          {/* Profile card */}
          {user && (
            <div className="border border-[#0A0A0A]/10 p-6 bg-white">
              <div className="flex items-center gap-4 mb-5">
                {user.avatar_url && (
                  <Image
                    src={user.avatar_url}
                    alt={user.name || user.login}
                    width={48}
                    height={48}
                    className="grayscale border border-[#0A0A0A]/10"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-[#0A0A0A]">{user.name || user.login}</p>
                  <p className="text-[10px] text-[#9A9690]">@{user.login}</p>
                </div>
              </div>
              {user.bio && (
                <p className="text-[11px] text-[#3D3B38] leading-relaxed mb-4">{user.bio}</p>
              )}
              <div className="grid grid-cols-3 gap-px bg-[#0A0A0A]/8 mt-4">
                {[
                  { v: user.public_repos, l: 'Repos' },
                  { v: user.followers, l: 'Followers' },
                  { v: user.following, l: 'Following' },
                ].map((s) => (
                  <div key={s.l} className="bg-[#F7F5F0] py-3 text-center">
                    <div
                      className="text-lg font-bold text-[#0A0A0A]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {s.v}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-[#9A9690]">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[10px] text-[#9A9690]">
                Member since {new Date(user.created_at).getFullYear()}
              </div>
            </div>
          )}

          {/* Contribution snake */}
          <div className="mt-8 border border-[#0A0A0A]/10 bg-white overflow-hidden">
            <div className="px-5 pt-4 pb-2">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#9A9690]">
                Contribution Activity
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/Platane/snk/raw/output/github-contribution-grid-snake.svg"
              alt="GitHub contribution snake animation"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right — Events feed */}
        <div className="md:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#9A9690]">
                Live Event Feed
              </p>
              {!loading && (
                <p className="text-[9px] text-[#9A9690] mt-1">
                  {merged.length} activities · last 3 months
                </p>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-[9px] text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
              {loading ? 'Loading...' : 'Live'}
            </span>
          </div>

          {loading && (
            <div className="border border-[#0A0A0A]/10 bg-white divide-y divide-[#0A0A0A]/8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-2 h-2 rounded-full bg-[#E8E6E1] shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 bg-[#E8E6E1] rounded w-3/4 animate-pulse" />
                    <div className="h-2 bg-[#E8E6E1] rounded w-1/2 animate-pulse" />
                  </div>
                  <div className="h-2 bg-[#E8E6E1] rounded w-12 animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {!loading && merged.length > 0 && (
            <div className="divide-y divide-[#0A0A0A]/8 border border-[#0A0A0A]/10 bg-white max-h-[600px] overflow-y-auto">
              {merged.map((item, i) => (
                <div
                  key={item.id + i}
                  className="flex items-start gap-4 px-6 py-4 hover:bg-[#F7F5F0] transition-colors"
                >
                  <div className="mt-1.5 shrink-0">
                    <span
                      className="block w-2 h-2 rounded-full"
                      style={{ background: item.dotColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#3D3B38] leading-relaxed">
                      <span className="text-[#9A9690]">{item.label} </span>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#0A0A0A] hover:underline"
                      >
                        {item.repo}
                      </a>

                      {item.repoFull.includes('/') && !item.repoFull.startsWith('alfset/') && (
                        <span className="text-[#9A9690] ml-1">
                          ({item.repoFull.split('/')[0]})
                        </span>
                      )}
                    </p>
                    {item.detail && (
                      <p className="text-[10px] text-[#9A9690] mt-0.5 truncate">
                        {item.detail}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-[#9A9690] shrink-0 mt-0.5 tabular-nums whitespace-nowrap">
                    {timeAgo(item.date)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {!loading && merged.length === 0 && (
            <div className="border border-[#0A0A0A]/10 p-10 text-center">
              <p className="text-[11px] text-[#9A9690]">
                Could not load activity.{' '}
                <a
                  href="https://github.com/alfset"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A0A0A] underline"
                >
                  View on GitHub ↗
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}