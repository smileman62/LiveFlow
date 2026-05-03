export default function KeyMetricsCards() {
  return (
    <div className="flex w-full flex-col gap-4">
      <article className="flex flex-col justify-start rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5">
        <p className="text-xs font-medium text-slate-500">판매 전환율</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          3.45%
        </p>
        <p className="mt-2 text-xs font-medium text-emerald-600">▲ 0.8%p</p>
      </article>
      <article className="flex flex-col justify-start rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5">
        <p className="text-xs font-medium text-slate-500">평균 시청 시간</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          08:24
        </p>
        <p className="mt-2 text-xs font-medium text-emerald-600">▲ 1:12</p>
      </article>
    </div>
  )
}
