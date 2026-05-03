function IconHeart() {
  return (
    <svg className="h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.003-.003.001a.75.75 0 01-.704 0l-.003-.001z" />
    </svg>
  )
}

function IconChat() {
  return (
    <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )
}

function IconShare() {
  return (
    <svg className="h-5 w-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z"
      />
    </svg>
  )
}

function IconBag() {
  return (
    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
      />
    </svg>
  )
}

const ITEMS = [
  { Icon: IconHeart, label: '좋아요', value: '1,234', diff: '▲ 18.3%' },
  { Icon: IconChat, label: '채팅 수', value: '856', diff: '▲ 11.2%' },
  { Icon: IconShare, label: '공유 수', value: '342', diff: '▲ 9.8%' },
  { Icon: IconBag, label: '상품 클릭', value: '1,025', diff: '▲ 16.7%' },
] as const

export default function ViewerReactionStrip() {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5 md:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">시청자 반응</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ITEMS.map(({ label, value, diff, Icon }) => (
          <div
            key={label}
            className="flex flex-col rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-3 text-center shadow-sm"
          >
            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
              <Icon />
            </div>
            <p className="text-[11px] font-medium text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-bold tabular-nums text-slate-900">{value}</p>
            <p className="mt-0.5 text-xs font-medium text-emerald-600">{diff}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
