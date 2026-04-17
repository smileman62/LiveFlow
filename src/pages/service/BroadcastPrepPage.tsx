import { useState } from 'react'

const TABS = ['방송 대본', 'FAQ', '체크리스트', '공지문'] as const

function BroadcastPrepPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  function generate() {
    setShowResult(false)
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setShowResult(true)
      setActiveTab(0)
    }, 1800)
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-[680px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2.5 bg-[#1A3C6E] px-5 py-3 text-white">
          <span className="text-[15px] font-medium">Live Flow</span>
          <span className="text-[13px] opacity-70">| 방송 준비 자동화</span>
        </div>

        <div className="border-t-0 p-5">
          <section className="mb-5">
            <span className="mb-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-900">
              필수 입력
            </span>
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="상품명" defaultValue="제주 감귤 착즙 주스" />
              <Field label="판매 가격" defaultValue="19,900원" />
            </div>
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SelectField
                label="카테고리"
                options={[
                  '식품·음료',
                  '뷰티·화장품',
                  '패션·의류',
                  '건강기능식품',
                  '생활용품',
                ]}
              />
              <SelectField
                label="방송 플랫폼"
                options={[
                  '네이버 쇼핑라이브',
                  '카카오쇼핑라이브',
                  '그립',
                  '유튜브',
                ]}
              />
            </div>
          </section>

          <section className="mb-5">
            <span className="mb-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              선택 입력 (품질 향상)
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field label="타깃 고객" defaultValue="30~40대 여성" />
              <Field label="방송 시간" defaultValue="오후 2시" />
              <Field label="프로모션" defaultValue="선착순 100개" />
            </div>
          </section>

          <button
            type="button"
            onClick={generate}
            className="mt-1 w-full cursor-pointer rounded-lg bg-[#E8530A] py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            AI 방송 준비물 자동 생성
          </button>

          {loading && (
            <div className="mt-4 py-5 text-center text-[13px] text-slate-500">
              <p>GPT가 방송 준비물을 생성하고 있습니다...</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-3/4 animate-pulse rounded-full bg-[#E8530A]" />
              </div>
            </div>
          )}

          {showResult && (
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <div className="flex border-b border-slate-200 bg-slate-50">
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`cursor-pointer border-b-2 px-3.5 py-2 text-xs ${
                      activeTab === i
                        ? 'border-[#1A3C6E] font-medium text-[#1A3C6E]'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-3.5 text-[13px] leading-relaxed text-slate-800">
                {activeTab === 0 && <TabScript />}
                {activeTab === 1 && <TabFaq />}
                {activeTab === 2 && <TabChecklist />}
                {activeTab === 3 && <TabNotice />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  defaultValue,
}: {
  label: string
  defaultValue: string
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-slate-500">{label}</div>
      <input
        defaultValue={defaultValue}
        className="box-border w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
      />
    </div>
  )
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-slate-500">{label}</div>
      <select
        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm box-border bg-white"
        defaultValue={options[0]}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

function TabScript() {
  return (
    <>
      <p className="mb-2 text-[11px] font-medium text-slate-500">오프닝 멘트</p>
      <div className="rounded-lg border-l-[3px] border-[#1A3C6E] bg-slate-50 p-3 text-[13px] leading-relaxed">
        &quot;안녕하세요 여러분~ 오늘은 제가 직접 제주도에서 공수해온 감귤 착즙 주스를 가지고
        왔어요! 첨가물 없이 감귤 100%만 담았는데요, 지금 선착순 100개 한정으로 특가에
        드립니다. 절대 후회 없으실 거예요!&quot;
      </div>
      <p className="mb-2 mt-3 text-[11px] font-medium text-slate-500">클로징 멘트</p>
      <div className="rounded-lg border-l-[3px] border-[#1A3C6E] bg-slate-50 p-3 text-[13px] leading-relaxed">
        &quot;구매해주신 분들 정말 감사해요! 리뷰 남겨주시면 다음 방송 때 더 좋은 혜택으로
        찾아올게요. 오늘도 함께해주셔서 감사합니다~&quot;
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-800">
        개인화 추천 — 오후 2시 방송에서 &apos;산지 직송&apos; 멘트 포함 시 평균 시청 지속 23%
        향상
      </div>
    </>
  )
}

function TabFaq() {
  const items = [
    {
      q: '배송은 얼마나 걸려요?',
      a: '주문 후 1~2일 내 출고, 산지 직송으로 3일 안에 받아보실 수 있습니다.',
    },
    {
      q: '당도는 어느 정도인가요?',
      a: '브릭스 12 이상 선별 제품만 사용합니다. 단맛이 강한 편이에요.',
    },
    {
      q: '교환·환불 가능한가요?',
      a: '수령 후 7일 이내 제품 이상 시 100% 교환·환불 가능합니다.',
    },
    {
      q: '첨가물이 들어있나요?',
      a: '감귤 원액 100%입니다. 보존료·착색료·감미료 일절 미사용합니다.',
    },
  ]
  return (
    <>
      <p className="mb-2 text-[11px] font-medium text-slate-500">
        예상 질문·답변 (자동 생성)
      </p>
      <ul className="divide-y divide-slate-200">
        {items.map(({ q, a }) => (
          <li key={q} className="py-2.5">
            <div className="mb-1 text-xs font-medium text-[#1A3C6E]">Q. {q}</div>
            <div className="text-[13px]">A. {a}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

function TabChecklist() {
  const items = [
    '상품 재고 수량 최종 확인 (100개)',
    '조명·카메라 세팅 완료',
    '네이버 쇼핑라이브 방송 예약 등록',
    '오후 2시 쿠폰 발행 준비',
    '상품 썸네일 이미지 등록',
    '비상 연락망 확인',
    '대본 출력 및 숙지',
  ]
  return (
    <>
      <p className="mb-2 text-[11px] font-medium text-slate-500">방송 당일 체크리스트</p>
      <ul className="space-y-0">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-center gap-2 border-b border-slate-200 py-1.5 text-[13px] last:border-0"
          >
            <span className="h-4 w-4 shrink-0 rounded border border-slate-300" />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-2.5 text-xs text-emerald-800">
        오후 2시 방송 — 14시 10분 쿠폰 발행 시 전환율 최고 (과거 데이터 기반)
      </div>
    </>
  )
}

function TabNotice() {
  return (
    <>
      <p className="mb-2 text-[11px] font-medium text-slate-500">플랫폼별 방송 공지문</p>
      <div className="mb-3 rounded-lg border-l-[3px] border-[#1A3C6E] bg-slate-50 p-3">
        <div className="mb-1.5 text-[11px] font-medium text-[#1A3C6E]">
          네이버 쇼핑라이브
        </div>
        <p className="text-[13px] leading-relaxed">
          [오늘 오후 2시] 제주 감귤 착즙 주스 라이브 선착순 100개 한정! 방송 중 쿠폰 증정 —
          첨가물 ZERO 감귤 100%
        </p>
      </div>
      <p className="mb-2 text-[11px] font-medium text-slate-500">키워드 태그 (자동 추출)</p>
      <div className="flex flex-wrap gap-1">
        {['제주감귤', '착즙주스', '무첨가', '산지직송', '한정특가', '라이브쇼핑'].map(
          (tag) => (
            <span
              key={tag}
              className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] text-sky-800"
            >
              {tag}
            </span>
          ),
        )}
      </div>
    </>
  )
}

export default BroadcastPrepPage
