import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type Platform = 'naver' | 'youtube' | 'kakao'
type MsgType = 'auto' | 'buy' | 'normal'

type Msg = {
  pf: Platform
  user: string
  text: string
  type: MsgType
  auto?: string
  buy?: string
}

const INITIAL_MSGS: Msg[] = [
  {
    pf: 'naver',
    user: '감귤팬',
    text: '배송 얼마나 걸려요?',
    auto: '자동응답: 주문 후 1~2일 내 출고, 3일 안에 받아보실 수 있습니다.',
    type: 'auto',
  },
  {
    pf: 'youtube',
    user: 'viewer_82',
    text: '이거 진짜 맛있어 보이는데 살까요?',
    buy: '구매 신호 감지 — 쿠폰 메시지 발송 추천',
    type: 'buy',
  },
  {
    pf: 'kakao',
    user: '도토리맘',
    text: '첨가물 없는 거 맞죠?',
    type: 'normal',
  },
  {
    pf: 'naver',
    user: '건강지킴이',
    text: '교환은 어떻게 하나요?',
    auto: '자동응답: 수령 후 7일 이내 제품 이상 시 100% 교환 가능합니다.',
    type: 'auto',
  },
  {
    pf: 'youtube',
    user: 'juice_lover',
    text: '100개 한정이면 빨리 사야겠다!!',
    buy: '구매 신호 감지 — 긴급성 강조 멘트 추천',
    type: 'buy',
  },
  {
    pf: 'naver',
    user: '제주사랑',
    text: '당도는 어떤가요?',
    type: 'normal',
  },
  {
    pf: 'kakao',
    user: '다이어터22',
    text: '칼로리가 어떻게 되나요?',
    type: 'normal',
  },
  {
    pf: 'naver',
    user: '선물용구매',
    text: '선물포장 되나요?',
    type: 'normal',
  },
]

type Filter = 'all' | Platform | 'buy'

const PF_LABEL: Record<Platform, string> = {
  naver: '네이버',
  youtube: '유튜브',
  kakao: '카카오',
}

function MultiChannelPage() {
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MSGS)
  const [filter, setFilter] = useState<Filter>('all')
  const [input, setInput] = useState('')
  const [viewers, setViewers] = useState(1247)
  const [orderCount, setOrderCount] = useState(23)

  const filtered = useMemo(() => {
    return msgs.filter((m) => {
      if (filter === 'all') return true
      if (filter === 'buy') return m.type === 'buy'
      return m.pf === filter
    })
  }, [msgs, filter])

  const chatCount = msgs.length
  const cvr = viewers > 0 ? ((orderCount / viewers) * 100).toFixed(1) : '0.0'

  const sendMsg = useCallback(() => {
    const t = input.trim()
    if (!t) return
    setMsgs((prev) => [
      ...prev,
      { pf: 'naver', user: '셀러', text: `[전체발송] ${t}`, type: 'normal' },
    ])
    setInput('')
    setViewers((v) => v + Math.floor(Math.random() * 10 - 3))
  }, [input])

  const sendCoupon = useCallback(() => {
    setMsgs((prev) => [
      ...prev,
      {
        pf: 'naver',
        user: 'Live Flow',
        text: '지금 쿠폰 코드 LIVE10 입력하시면 10% 추가 할인!',
        type: 'normal',
      },
    ])
    window.alert('전체 채널에 쿠폰 메시지가 발송되었습니다!')
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setViewers((v) => Math.max(100, v + Math.floor(Math.random() * 10 - 3)))
      setOrderCount((o) => (Math.random() > 0.6 ? o + 1 : o))
    }, 3000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between bg-[#1A3C6E] px-4 py-2.5 text-white">
          <span className="text-sm font-medium">Live Flow | 멀티채널 통합 관리</span>
          <span className="flex items-center gap-1 rounded-full bg-[#E8530A] px-2 py-0.5 text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE 방송 중
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 border-x border-b border-slate-200 bg-slate-50 p-3 sm:grid-cols-4">
          <Stat num={viewers.toLocaleString()} label="실시간 시청자" />
          <Stat num={String(chatCount)} label="누적 채팅 수" />
          <Stat num={String(orderCount)} label="주문 건수" />
          <Stat num={`${cvr}%`} label="전환율" />
        </div>

        <div className="grid grid-cols-1 border-x border-b border-slate-200 md:grid-cols-[1fr_280px]">
          <div className="border-b border-slate-200 md:border-r md:border-b-0">
            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 p-2.5">
              <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>
                전체
              </FilterBtn>
              <FilterBtn active={filter === 'naver'} onClick={() => setFilter('naver')}>
                네이버
              </FilterBtn>
              <FilterBtn active={filter === 'youtube'} onClick={() => setFilter('youtube')}>
                유튜브
              </FilterBtn>
              <FilterBtn active={filter === 'kakao'} onClick={() => setFilter('kakao')}>
                카카오
              </FilterBtn>
              <FilterBtn active={filter === 'buy'} onClick={() => setFilter('buy')}>
                구매신호
              </FilterBtn>
            </div>
            <div className="h-[220px] overflow-y-auto p-2.5 text-xs">
              {filtered.map((m, i) => (
                <div key={`${m.user}-${i}`} className="mb-2.5">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <PlatformBadge pf={m.pf} />
                    <span className="text-[11px] font-medium">{m.user}</span>
                  </div>
                  <p className="leading-snug text-slate-800">{m.text}</p>
                  {m.auto && (
                    <div className="mt-1 rounded-md bg-sky-50 px-2 py-1.5 text-[11px] text-sky-900">
                      AI 자동응답 {m.auto}
                    </div>
                  )}
                  {m.buy && (
                    <div className="mt-1 rounded-md bg-amber-50 px-2 py-1.5 text-[11px] text-amber-900">
                      구매신호 {m.buy}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-200 p-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                placeholder="전체 채널에 메시지 전송..."
                className="min-w-0 flex-1 rounded-md border border-slate-200 px-2 py-1.5 text-xs"
              />
              <button
                type="button"
                onClick={sendMsg}
                className="shrink-0 rounded-md bg-[#1A3C6E] px-3.5 py-1.5 text-xs text-white"
              >
                전송
              </button>
            </div>
          </div>

          <div className="p-3">
            <p className="mb-2 text-xs font-medium text-slate-500">실시간 알림</p>
            <div className="mb-2 rounded-md bg-amber-50 p-2 text-xs text-amber-900">
              구매 신호 3건 감지 — 쿠폰 발행을 추천합니다
            </div>
            <div className="mb-2 rounded-md bg-sky-50 p-2 text-xs text-sky-900">
              배송 문의 5건 자동 응답 완료
            </div>
            <button
              type="button"
              onClick={sendCoupon}
              className="mt-2 w-full rounded-md bg-[#E8530A] py-2 text-xs text-white"
            >
              지금 쿠폰 발행하기
            </button>
            <div className="mt-3.5">
              <p className="mb-2 text-xs font-medium text-slate-500">자동 응답 현황</p>
              <div className="text-xs leading-8 text-slate-600">
                배송 문의 → <span className="text-emerald-600">자동 응답</span>
                <br />
                교환·환불 → <span className="text-emerald-600">자동 응답</span>
                <br />
                재고 문의 → <span className="text-emerald-600">자동 응답</span>
                <br />
                기타 문의 → <span className="text-amber-700">셀러 직접 응답</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-2.5 text-center">
      <div className="text-xl font-medium text-[#1A3C6E]">{num}</div>
      <div className="mt-0.5 text-[11px] text-slate-500">{label}</div>
    </div>
  )
}

function FilterBtn({
  children,
  active,
  onClick,
}: {
  children: ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-2.5 py-1 text-[11px] ${
        active
          ? 'border-[#1A3C6E] bg-[#1A3C6E] text-white'
          : 'border-slate-200 bg-white text-slate-600'
      }`}
    >
      {children}
    </button>
  )
}

function PlatformBadge({ pf }: { pf: Platform }) {
  const cls =
    pf === 'naver'
      ? 'bg-emerald-50 text-emerald-900'
      : pf === 'youtube'
        ? 'bg-red-50 text-red-900'
        : 'bg-yellow-50 text-yellow-900'
  return (
    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>
      {PF_LABEL[pf]}
    </span>
  )
}

export default MultiChannelPage
