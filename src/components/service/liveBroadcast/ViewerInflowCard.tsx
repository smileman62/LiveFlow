const SEGMENTS = [
  { label: '라이브 중', pct: 45, color: '#1e3a8a' },
  { label: '알림', pct: 25, color: '#3b82f6' },
  { label: '검색', pct: 20, color: '#14b8a6' },
  { label: '공유', pct: 10, color: '#8b5cf6' },
] as const

const TOTAL_INFLOW = 1234

function conicGradient() {
  let acc = 0
  const parts = SEGMENTS.map((s) => {
    const start = acc
    acc += s.pct
    return `${s.color} ${(start / 100) * 360}deg ${(acc / 100) * 360}deg`
  })
  return `conic-gradient(${parts.join(', ')})`
}

export default function ViewerInflowCard() {
  return (
    <section className="flex flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5 md:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">시청자 유입 경로</h3>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-40 w-40 shrink-0">
          <div
            className="absolute inset-0 rounded-full shadow-inner ring-1 ring-slate-100"
            style={{ background: conicGradient() }}
          />
          <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white px-2 text-center ring-1 ring-slate-50">
            <p className="text-[10px] font-medium text-slate-500">총 유입</p>
            <p className="text-xl font-bold tabular-nums text-slate-900">{TOTAL_INFLOW.toLocaleString()}</p>
          </div>
        </div>
        <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
          {SEGMENTS.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-1">
              <span className="flex min-w-0 items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="truncate">{s.label}</span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums text-slate-900">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
