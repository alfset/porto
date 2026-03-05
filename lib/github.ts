export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  public_gists: number
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  topics: string[]
  updated_at: string
  pushed_at: string
  fork: boolean
  homepage: string | null
  open_issues_count: number
  visibility: string
}

export interface GithubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  payload: {
    commits?: Array<{ message: string; sha: string }>
    ref?: string
    ref_type?: string
    action?: string
    pull_request?: { title: string }
    issue?: { title: string }
  }
  created_at: string
}

const GH_BASE = 'https://api.github.com'
const USERNAME = 'alfset'

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
}

export async function getUser(): Promise<GithubUser> {
  const res = await fetch(`${GH_BASE}/users/${USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function getRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GH_BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`,
    { headers, next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('Failed to fetch repos')
  const all: GithubRepo[] = await res.json()
  return all
    .filter((r) => !r.fork)
    .sort(
      (a, b) =>
        b.stargazers_count + b.forks_count - (a.stargazers_count + a.forks_count)
    )
}


export function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const LANG_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Solidity: '#363636',
  Shell: '#4EAA25',
  HTML: '#E34C26',
  CSS: '#1572B6',
  'C++': '#F34B7D',
  C: '#555555',
  Vue: '#4FC08D',
  Dockerfile: '#384D54',
}

// Known active repos from your contribution history
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
]

export interface CommitActivity {
  repo: string
  sha: string
  message: string
  date: string
  url: string
}

export async function getEvents(): Promise<GithubEvent[]> {
  const allEvents: GithubEvent[] = []
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setFullYear(threeMonthsAgo.getFullYear() - 3)

  // Paginate through all available public events (max ~300)
  for (let page = 1; page <= 10; page++) {
    try {
      const res = await fetch(
        `${GH_BASE}/users/${USERNAME}/events/public?per_page=100&page=${page}`,
        { headers, next: { revalidate: 300 } }
      )
      if (!res.ok) break
      const batch: GithubEvent[] = await res.json()
      if (!batch.length) break

      const filtered = batch.filter(
        (e) => new Date(e.created_at) >= threeMonthsAgo
      )
      allEvents.push(...filtered)

      const oldest = new Date(batch[batch.length - 1].created_at)
      if (oldest < threeMonthsAgo) break
    } catch { break }
  }

  return allEvents
}

export async function getRecentCommits(): Promise<CommitActivity[]> {
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  const since = threeMonthsAgo.toISOString()

  const results = await Promise.allSettled(
    ACTIVE_REPOS.map(async (repo) => {
      const res = await fetch(
        `${GH_BASE}/repos/${repo}/commits?author=${USERNAME}&since=${since}&per_page=20`,
        { headers, next: { revalidate: 600 } }
      )
      if (!res.ok) return []
      const commits = await res.json()
      if (!Array.isArray(commits)) return []
      return commits.map((c: { sha: string; commit: { message: string; author: { date: string } }; html_url: string }) => ({
        repo,
        sha: c.sha.slice(0, 7),
        message: c.commit.message.split('\n')[0],
        date: c.commit.author.date,
        url: c.html_url,
      })) as CommitActivity[]
    })
  )

  return results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}