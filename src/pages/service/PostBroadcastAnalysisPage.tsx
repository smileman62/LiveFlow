function PostBroadcastAnalysisPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between bg-[#006064] px-4 py-2.5 text-white">
          <span className="text-sm font-medium">Live Flow | 방송 후 성과 분석</span>
          <span className="text-[11px] opacity-70">2026.03.21 오후 2시 방송</span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-x border-b border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
          <Kpi num="₩847,000" numColor="text-[#1A3C6E]" label="총 매출" diff="▲ 23% vs 지난 방송" up />
          <Kpi num="43건" numColor="text-[#006064]" label="주문 건수" diff="▲ 8건 증가" up />
          <Kpi num="3.4%" numColor="text-[#E8530A]" label="전환율" diff="▲ 1.1%p 향상" up />
          <Kpi num="28분" numColor="text-slate-700" label="평균 시청 시간" diff="▼ 3분 감소" down />
        </div>

        <div className="border-x border-b border-slate-200 p-3.5">
          <h2 className="mb-2.5 text-[13px] font-medium text-slate-900">시간대별 전환율 분석</h2>

          <TimeBar label="14:00" w="35%" bg="bg-sky-200" val="1.2%" valDark />
          <TimeBar
            label="14:10"
            w="90%"
            bg="bg-[#1A3C6E]"
            val="4.8%"
            coupon
          />
          <TimeBar label="14:20" w="65%" bg="bg-blue-500" val="3.1%" />
          <TimeBar label="14:30" w="45%" bg="bg-sky-300" val="2.1%" valDark />
          <TimeBar label="14:40" w="55%" bg="bg-blue-500" val="2.6%" />
          <TimeBar label="14:50" w="38%" bg="bg-sky-200" val="1.4%" valDark />

          <p className="mb-4 text-[11px] text-slate-500">
            14:10 쿠폰 발행 직후 전환율 4.8% — 방송 중 최고치 기록
          </p>

          <h2 className="mb-2.5 text-[13px] font-medium text-slate-900">
            AI 성과 인사이트 & 다음 방송 전략 제안
          </h2>

          <div className="mb-2.5 rounded-md border-l-[3px] border-emerald-500 bg-emerald-50 p-3">
            <p className="mb-1 text-xs font-medium text-emerald-800">
              잘 된 점 — 쿠폰 타이밍이 효과적이었습니다
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              14시 10분 쿠폰 발행 시 전환율이 4.8%로 방송 평균(3.4%) 대비 41% 높았습니다. 다음
              방송에서도 동일 타이밍 유지를 추천합니다.
            </p>
          </div>

          <div className="mb-2.5 rounded-md border-l-[3px] border-sky-500 bg-sky-50 p-3">
            <p className="mb-1 text-xs font-medium text-sky-900">
              개선 포인트 — 14시 30분 이후 이탈 방지 필요
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              14시 30분부터 시청자가 평균 18% 이탈했습니다. 해당 시간대에 2차 쿠폰 또는 깜짝 경품
              이벤트를 추가하면 이탈을 줄일 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.alert('다음 방송 전략 상세는 추후 GPT 연동 예정입니다.')}
            className="mt-1 w-full cursor-pointer rounded-lg bg-[#1A3C6E] py-2.5 text-[13px] text-white hover:opacity-95"
          >
            다음 방송 전략 전체 보기 ↗
          </button>
        </div>
      </div>
    </div>
  )
}

function Kpi({
  num,
  numColor,
  label,
  diff,
  up,
  down,
}: {
  num: string
  numColor: string
  label: string
  diff: string
  up?: boolean
  down?: boolean
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-2.5 text-center">
      <div className={`text-lg font-medium ${numColor}`}>{num}</div>
      <div className="mt-0.5 text-[11px] text-slate-500">{label}</div>
      <div
        className={`mt-0.5 text-[11px] ${up ? 'text-emerald-600' : down ? 'text-red-600' : ''}`}
      >
        {diff}
      </div>
    </div>
  )
}

function TimeBar({
  label,
  w,
  bg,
  val,
  valDark,
  coupon,
}: {
  label: string
  w: string
  bg: string
  val: string
  valDark?: boolean
  coupon?: boolean
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="w-[50px] shrink-0 text-right text-[11px] text-slate-500">{label}</span>
      <div className="relative min-w-0 flex-1">
        <div className="h-6 overflow-hidden rounded bg-slate-100">
          <div
            className={`flex h-full items-center justify-end pr-1.5 ${bg}`}
            style={{ width: w }}
          >
            <span
              className={`text-[11px] font-medium ${valDark ? 'text-[#0C447C]' : 'text-white'}`}
            >
              {val}
            </span>
          </div>
        </div>
        {coupon && (
          <span className="pointer-events-none absolute top-0.5 right-1 text-[10px] text-white/80">
            쿠폰 발행
          </span>
        )}
      </div>
    </div>
  )
}

export default PostBroadcastAnalysisPage
