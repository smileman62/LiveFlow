import { useState, type ReactNode } from 'react'

type Period = 'week' | 'month' | '3month'

const PERIOD_DATA: Record<
  Period,
  { sales: string; salesDiff: string; orders: string; ordersDiff: string; cvr: string; cvrDiff: string }
> = {
  week: {
    sales: '₩3,847,000',
    salesDiff: '▲ 23% vs 지난 주',
    orders: '187건',
    ordersDiff: '▲ 34건 증가',
    cvr: '3.2%',
    cvrDiff: '▲ 0.8%p 향상',
  },
  month: {
    sales: '₩14,230,000',
    salesDiff: '▲ 31% vs 지난 달',
    orders: '682건',
    ordersDiff: '▲ 128건 증가',
    cvr: '3.5%',
    cvrDiff: '▲ 1.1%p 향상',
  },
  '3month': {
    sales: '₩38,750,000',
    salesDiff: '▲ 18% vs 이전 3개월',
    orders: '1,847건',
    ordersDiff: '▲ 284건 증가',
    cvr: '3.1%',
    cvrDiff: '▲ 0.4%p 향상',
  },
}

function SalesDashboardPage() {
  const [period, setPeriod] = useState<Period>('week')
  const d = PERIOD_DATA[period]

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1A3C6E] px-4 py-2.5 text-white">
          <span className="text-sm font-medium">Live Flow | 멀티채널 판매 대시보드</span>
          <div className="flex gap-1.5">
            {(
              [
                ['week', '주간'],
                ['month', '월간'],
                ['3month', '3개월'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPeriod(key)}
                className={`cursor-pointer rounded-full border px-2.5 py-0.5 text-[11px] ${
                  period === key
                    ? 'border-white bg-white text-[#1A3C6E]'
                    : 'border-white/40 bg-transparent text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-x border-b border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
          <Kpi label="전체 매출 합산" num={d.sales} diff={d.salesDiff} diffUp />
          <Kpi label="총 주문 건수" num={d.orders} diff={d.ordersDiff} diffUp />
          <Kpi label="평균 전환율" num={d.cvr} diff={d.cvrDiff} diffUp />
          <Kpi
            label="활성 플랫폼"
            num="4개"
            diff="네이버·카카오·그립·쿠팡"
            muted
          />
        </div>

        <div className="grid grid-cols-1 gap-3.5 border-x border-b border-slate-200 p-3.5 md:grid-cols-2">
          <Card title="플랫폼별 매출 비교">
            <PfBar label="네이버" badgeClass="bg-emerald-50 text-emerald-900" w="82%" barBg="bg-emerald-800" val="₩1,920,000" sub="89건" />
            <PfBar label="카카오" badgeClass="bg-yellow-50 text-yellow-900" w="54%" barBg="bg-amber-600" val="₩1,050,000" sub="51건" />
            <PfBar label="그립" badgeClass="bg-sky-50 text-sky-900" w="32%" barBg="bg-blue-800" val="₩620,000" sub="29건" />
            <PfBar label="쿠팡" badgeClass="bg-pink-50 text-pink-900" w="14%" barBg="bg-pink-800" val="₩257,000" sub="18건" />
          </Card>

          <Card title="플랫폼별 전환율">
            <PfBar label="카카오" badgeClass="bg-yellow-50 text-yellow-900" w="90%" barBg="bg-amber-600" val="4.1%" sub="▲ 최고" subClass="text-emerald-600" />
            <PfBar label="네이버" badgeClass="bg-emerald-50 text-emerald-900" w="72%" barBg="bg-emerald-800" val="3.4%" sub="▲ 0.6%" subClass="text-emerald-600" />
            <PfBar label="그립" badgeClass="bg-sky-50 text-sky-900" w="54%" barBg="bg-blue-800" val="2.8%" sub="유지" subClass="text-slate-500" />
            <PfBar label="쿠팡" badgeClass="bg-pink-50 text-pink-900" w="38%" barBg="bg-pink-800" val="1.9%" sub="▼ 0.3%" subClass="text-red-600" />
          </Card>

          <Card title="최근 방송 성과">
            <BcRow date="03.21 오후2시" name="감귤 착즙 주스" sales="₩847,000" cvr="3.4%" cvrUp />
            <BcRow date="03.19 오후3시" name="한라봉 주스 세트" sales="₩612,000" cvr="2.9%" cvrUp />
            <BcRow date="03.17 오후2시" name="청귤 원액" sales="₩1,140,000" cvr="4.1%" cvrUp />
            <BcRow date="03.14 오후4시" name="감귤 착즙 주스" sales="₩523,000" cvr="2.3%" cvrDown />
            <BcRow date="03.12 오후2시" name="제주 레몬즙" sales="₩725,000" cvr="3.1%" cvrUp last />
          </Card>

          <Card title="상품별 매출 순위 (주간)">
            <ItemRow rank={1} name="감귤 착즙 주스" pf="네이버" pfClass="bg-emerald-50 text-emerald-900" sales="₩1,380,000" diff="▲ 41%" diffUp />
            <ItemRow rank={2} name="청귤 원액" pf="카카오" pfClass="bg-yellow-50 text-yellow-900" sales="₩920,000" diff="▲ 18%" diffUp />
            <ItemRow rank={3} name="한라봉 주스 세트" pf="네이버" pfClass="bg-emerald-50 text-emerald-900" sales="₩780,000" diff="▲ 9%" diffUp />
            <ItemRow rank={4} name="제주 레몬즙" pf="그립" pfClass="bg-sky-50 text-sky-900" sales="₩497,000" diff="▼ 5%" diffDown />
            <ItemRow rank={5} name="감귤청" pf="쿠팡" pfClass="bg-pink-50 text-pink-900" sales="₩270,000" diff="신규" diffMuted last />
          </Card>

          <div className="rounded-lg border border-slate-200 md:col-span-2">
            <div className="border-b border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-800">
              AI 데이터 인사이트
            </div>
            <div className="space-y-1.5 p-3.5">
              <Insight good>
                카카오쇼핑라이브 전환율이 4.1%로 전 플랫폼 중 가장 높습니다. 카카오 방송 빈도를
                주 1회에서 2회로 늘리는 것을 추천합니다.
              </Insight>
              <Insight warn>
                쿠팡라이브 전환율이 1.9%로 평균 대비 낮습니다. 쿠팡 전용 쿠폰 또는 번들 상품
                구성을 검토해 보세요.
              </Insight>
              <Insight>
                오후 2시 방송이 오후 3~4시 대비 평균 23% 높은 매출을 기록하고 있습니다. 현재 방송
                시간대 유지를 추천합니다.
              </Insight>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Kpi({
  label,
  num,
  diff,
  diffUp,
  muted,
}: {
  label: string
  num: string
  diff: string
  diffUp?: boolean
  muted?: boolean
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2.5">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="text-xl font-medium text-slate-900">{num}</div>
      <div
        className={`mt-0.5 text-[11px] ${muted ? 'text-slate-500' : diffUp ? 'text-emerald-600' : ''}`}
      >
        {diff}
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-800">
        {title}
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  )
}

function PfBar({
  label,
  badgeClass,
  w,
  barBg,
  val,
  sub,
  subClass = 'text-slate-500',
}: {
  label: string
  badgeClass: string
  w: string
  barBg: string
  val: string
  sub: string
  subClass?: string
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2.5 last:mb-0">
      <span className={`w-16 shrink-0 rounded-lg px-2 py-0.5 text-center text-[11px] font-medium ${badgeClass}`}>
        {label}
      </span>
      <div className="h-[18px] min-w-0 flex-1 overflow-hidden rounded bg-slate-100">
        <div className={`h-full rounded ${barBg}`} style={{ width: w }} />
      </div>
      <span className="min-w-[72px] text-right text-xs font-medium text-slate-900">{val}</span>
      <span className={`min-w-10 text-right text-[11px] ${subClass}`}>{sub}</span>
    </div>
  )
}

function BcRow({
  date,
  name,
  sales,
  cvr,
  cvrUp,
  cvrDown,
  last,
}: {
  date: string
  name: string
  sales: string
  cvr: string
  cvrUp?: boolean
  cvrDown?: boolean
  last?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2 py-1.5 text-xs ${last ? '' : 'border-b border-slate-200'}`}
    >
      <span className="min-w-[80px] text-[11px] text-slate-500">{date}</span>
      <span className="min-w-0 flex-1 text-slate-800">{name}</span>
      <span className="min-w-[72px] text-right font-medium text-[#1A3C6E]">{sales}</span>
      <span
        className={`min-w-10 text-right text-[11px] ${cvrUp ? 'text-emerald-600' : cvrDown ? 'text-red-600' : ''}`}
      >
        {cvr}
      </span>
    </div>
  )
}

function ItemRow({
  rank,
  name,
  pf,
  pfClass,
  sales,
  diff,
  diffUp,
  diffDown,
  diffMuted,
  last,
}: {
  rank: number
  name: string
  pf: string
  pfClass: string
  sales: string
  diff: string
  diffUp?: boolean
  diffDown?: boolean
  diffMuted?: boolean
  last?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-between py-1.5 text-xs ${last ? '' : 'border-b border-slate-200'}`}
    >
      <span className="w-5 text-[11px] text-slate-400">{rank}</span>
      <span className="min-w-0 flex-1 text-slate-800">
        {name}
        <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${pfClass}`}>{pf}</span>
      </span>
      <span className="min-w-[72px] text-right font-medium text-[#1A3C6E]">{sales}</span>
      <span
        className={`min-w-[50px] text-right text-[11px] ${diffUp ? 'text-emerald-600' : diffDown ? 'text-red-600' : diffMuted ? 'text-slate-500' : ''}`}
      >
        {diff}
      </span>
    </div>
  )
}

function Insight({
  children,
  good,
  warn,
}: {
  children: ReactNode
  good?: boolean
  warn?: boolean
}) {
  const cls = good
    ? 'bg-emerald-50 text-emerald-900'
    : warn
      ? 'bg-amber-50 text-amber-900'
      : 'bg-sky-50 text-sky-900'
  return <div className={`rounded-md p-2 text-xs ${cls}`}>{children}</div>
}

export default SalesDashboardPage
