function ServiceOverviewPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900">개요</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        라이브 커머스 요약과 핵심 지표를 한눈에 확인하는 영역입니다.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['실시간 매출', '시청자', '전환율'].map((title) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">—</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceOverviewPage
