const FINDINGS = [
  {
    id: 'xgr-bls-rogue-key',
    project: 'XGR Network',
    repository: 'xgr-network/xgr-node',
    repositoryUrl: 'https://github.com/xgr-network/xgr-node',
    title: 'BLS rogue key forgery in validator consensus',
    severity: 'Critical',
    status: 'Public advisory',
    date: 'Published November 5, 2026',
    dateTime: '2026-11-05',
    summary:
      'Missing proof of possession during validator BLS key registration lets a staked validator register a rogue key. A signature from the attacker can then be accepted as a seal attributed to multiple validators, undermining consensus authentication.',
    evidence: [
      { label: 'Advisory', value: 'GHSA-rhv3-x676-72g9' },
      { label: 'Affected versions', value: '≤ v3.4.3' },
      { label: 'Researcher credit', value: 'alfset · Reporter' },
    ],
    details: [
      {
        label: 'Root cause',
        text: 'StakingV2 accepts BLS keys without verifying ownership of the corresponding secret. The consensus verifier later aggregates these keys.',
      },
      {
        label: 'Validation',
        text: 'Registration reproduced on an isolated four-node devnet. A separate harness using the real seal verifier accepted a forged two-signer seal; a normal-key control was rejected.',
      },
    ],
    sourceUrl:
      'https://github.com/xgr-network/xgr-node/security/advisories/GHSA-rhv3-x676-72g9',
    sourceLabel: 'Read public advisory',
  },
  {
    id: 'abey-fee-accounting',
    project: 'ABEY Chain',
    repository: 'AbeyFoundation/go-abey',
    repositoryUrl: 'https://github.com/AbeyFoundation/go-abey',
    title: 'Unauthorized supply inflation through reverted transaction fees',
    severity: 'Critical · reported',
    status: 'Privately reported',
    date: 'Reported August 31, 2026',
    dateTime: '2026-08-31',
    summary:
      'Reported a fee-accounting mismatch where a reverted transaction rolls back the sender’s custom-fee debit while block finalization still credits that fee to committee coinbases, increasing native ABEY supply without a matching debit.',
    evidence: [
      { label: 'Reported revision', value: 'main @ b74a6e8 · v3.4.9' },
      { label: 'Reported devnet result', value: '+90,000 ABEY net supply' },
      { label: 'Reproduction scope', value: 'Isolated four-node devnet' },
    ],
    details: [
      {
        label: 'Root cause',
        text: 'The sender debit in EVM.Call belongs to a reversible state snapshot. ApplyTransaction accumulates the custom fee outside that snapshot, and finalizeFastGas distributes it even after a revert.',
      },
      {
        label: 'Validation in my report',
        text: 'A reverted transaction (receipt status 0x0) increased the combined attacker and committee balances by exactly 90,000 ABEY. All four devnet nodes agreed; the sender paid ordinary gas only.',
      },
      {
        label: 'Disclosure',
        text: 'Submitted privately to the project on August 31, 2026, with a follow-up correcting the repository to AbeyFoundation/go-abey at b74a6e8. Severity and reproduction results are from my report.',
      },
    ],
    sourceUrl: 'https://github.com/AbeyFoundation/go-abey/commit/b74a6e8',
    sourceLabel: 'View reported revision',
  },
]

export default function SecurityFindings() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="scroll-mt-20 border-y border-[#0A0A0A]/10 bg-[#F0EEE9] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#3D3B38]">
              — Security Research
            </p>
            <h2
              id="security-heading"
              className="text-4xl font-bold text-[#0A0A0A] md:text-5xl"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Security
              <br />
              <em>Findings</em>
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-[#3D3B38]">
            Selected blockchain security research across consensus verification,
            EVM execution, and native-token accounting. Public advisories and
            summaries of privately submitted reports.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {FINDINGS.map((finding) => (
            <article
              key={finding.id}
              aria-labelledby={`${finding.id}-title`}
              className="flex min-w-0 flex-col border border-[#0A0A0A]/15 bg-[#F7F5F0] p-6 md:p-8"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <span className="border border-[#991B1B]/25 bg-[#991B1B]/5 px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#991B1B]">
                  {finding.severity}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#3D3B38]">
                  {finding.status}
                </span>
              </div>

              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#3D3B38]">
                {finding.project}
              </p>
              <h3
                id={`${finding.id}-title`}
                className="mb-4 text-2xl font-bold leading-tight text-[#0A0A0A]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {finding.title}
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-[#3D3B38]">
                {finding.summary}
              </p>

              <dl className="mb-6 border-y border-[#0A0A0A]/10 py-4">
                {finding.evidence.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 gap-1 py-2 text-[11px] sm:grid-cols-2 sm:gap-4"
                  >
                    <dt className="text-[#3D3B38]">{item.label}</dt>
                    <dd className="break-words font-medium text-[#0A0A0A]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <details className="mb-6 text-xs text-[#3D3B38]">
                <summary className="cursor-pointer py-2 underline decoration-[#0A0A0A]/25 underline-offset-4 hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                  Research notes &amp; validation
                </summary>
                <div className="mt-4 space-y-4 leading-relaxed">
                  {finding.details.map((detail) => (
                    <div key={detail.label}>
                      <h4 className="mb-1 font-medium text-[#0A0A0A]">{detail.label}</h4>
                      <p>{detail.text}</p>
                    </div>
                  ))}
                </div>
              </details>

              <div className="mt-auto border-t border-[#0A0A0A]/10 pt-5">
                <time dateTime={finding.dateTime} className="mb-4 block text-[10px] text-[#3D3B38]">
                  {finding.date}
                </time>
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <a
                    href={finding.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-wider underline underline-offset-4 hover:text-[#3D3B38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {finding.sourceLabel} ↗
                  </a>
                  <a
                    href={finding.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-[10px] text-[#3D3B38] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {finding.repository} ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
