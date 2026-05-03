const SEGMENTS = [
  { label: '긍정', pct: 72, color: '#22c55e' },
  { label: '중립', pct: 20, color: '#fbbf24' },
  { label: '부정', pct: 8, color: '#ef4444' },
] as const

function conicGradient() {
  let acc = 0
  const parts = SEGMENTS.map((s) => {
    const start = acc
    acc += s.pct
    return `${s.color} ${(start / 100) * 360}deg ${(acc / 100) * 360}deg`
  })
  return `conic-gradient(${parts.join(', ')})`
}

export default function SentimentAnalysisCard() {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5 md:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">감정 분석</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        <div className="relative h-36 w-36 shrink-0">
          <div
            className="absolute inset-0 rounded-full shadow-inner ring-1 ring-slate-100"
            style={{ background: conicGradient() }}
          />
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-white ring-1 ring-slate-50">
            <svg className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
          </div>
        </div>
        <ul className="flex w-full max-w-[200px] flex-col gap-2 text-sm">
          {SEGMENTS.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
              <span className="font-semibold tabular-nums text-slate-900">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
