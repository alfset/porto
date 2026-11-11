const FINDINGS = [
  {
    id: 'xgr-bls-rogue-key',
    project: 'XGR Network',
    title: 'BLS rogue key forgery',
    severity: 'Critical',
    status: 'Public advisory',
    date: 'Nov 5, 2026',
    dateTime: '2026-11-05',
    summary: 'A rogue validator key lets one signer impersonate multiple validators.',
    reference: 'GHSA-rhv3-x676-72g9',
    sourceUrl:
      'https://github.com/xgr-network/xgr-node/security/advisories/GHSA-rhv3-x676-72g9',
    sourceLabel: 'Advisory',
  },
  {
    id: 'abey-fee-accounting',
    project: 'ABEY Chain',
    title: 'Supply inflation on reverted transactions',
    severity: 'Critical · reported',
    status: 'Private report',
    date: 'Aug 31, 2026',
    dateTime: '2026-08-31',
    summary: 'Reverted custom fees still reach committee coinbases, creating unbacked ABEY.',
    reference: 'AbeyFoundation/go-abey · b74a6e8',
    sourceUrl: 'https://github.com/AbeyFoundation/go-abey/commit/b74a6e8',
    sourceLabel: 'Source code',
  },
]

export default function SecurityFindings() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="scroll-mt-20 border-y border-[#0A0A0A]/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2
          id="security-heading"
          className="mb-8 text-3xl font-bold text-[#0A0A0A] md:text-4xl"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Findings
        </h2>

        <div className="border-t border-[#0A0A0A]/15">
          {FINDINGS.map((finding) => (
            <article
              key={finding.id}
              aria-labelledby={finding.id + '-title'}
              className="grid gap-4 border-b border-[#0A0A0A]/15 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
            >
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
                  <span className="font-medium text-[#0A0A0A]">{finding.project}</span>
                  <span className="text-[#991B1B]">{finding.severity}</span>
                  <span className="text-[#3D3B38]">{finding.status}</span>
                </div>
                <h3
                  id={finding.id + '-title'}
                  className="mb-2 text-xl font-bold leading-snug text-[#0A0A0A] md:text-2xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {finding.title}
                </h3>
                <p className="max-w-2xl text-xs leading-relaxed text-[#3D3B38]">
                  {finding.summary}
                </p>
                <p className="mt-3 break-words text-[11px] text-[#3D3B38]">
                  {finding.reference}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 text-[11px] md:flex-col md:items-end md:justify-start md:gap-3 md:pt-1">
                <time dateTime={finding.dateTime} className="text-[#3D3B38]">
                  {finding.date}
                </time>
                <a
                  href={finding.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={finding.project + ': ' + finding.sourceLabel}
                  className="underline decoration-[#0A0A0A]/25 underline-offset-4 hover:text-[#3D3B38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {finding.sourceLabel} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
