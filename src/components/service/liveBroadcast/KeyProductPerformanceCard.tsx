export default function KeyProductPerformanceCard() {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5 md:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">주요 상품 성과</h3>
      <div className="flex gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-amber-100 to-stone-200 ring-1 ring-slate-200" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">클래식 미니 백</p>
          <p className="mt-0.5 text-sm font-medium text-indigo-600">₩89,000</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
        <div>
          <p className="text-[10px] text-slate-500">조회수</p>
          <p className="mt-0.5 text-sm font-bold tabular-nums text-slate-900">3,245</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500">장바구니</p>
          <p className="mt-0.5 text-sm font-bold tabular-nums text-slate-900">512</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500">구매 전환율</p>
          <p className="mt-0.5 text-sm font-bold tabular-nums text-emerald-600">4.21%</p>
        </div>
      </div>
    </section>
  )
}
