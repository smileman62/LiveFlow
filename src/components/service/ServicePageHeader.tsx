import type { ReactNode } from 'react'

type ServicePageHeaderProps = {
  title: string
  /** 제목 옆(우측)에 표시할 메타·배지 등. 없으면 유틸리티 아이콘만 제목과 함께 정렬됩니다. */
  meta?: ReactNode
  /** 기본: 알림·도움말·더보기 */
  showUtilities?: boolean
}

function IconBell() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3.75 3.75 0 11-5.714 0"
      />
    </svg>
  )
}

function IconHelp() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  )
}

function IconDots() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  )
}

function HeaderUtilities() {
  return (
    <div className="flex items-center gap-1 text-slate-400">
      <button
        type="button"
        className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="알림"
      >
        <IconBell />
      </button>
      <button
        type="button"
        className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="도움말"
      >
        <IconHelp />
      </button>
      <button
        type="button"
        className="rounded-lg p-2 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="더보기"
      >
        <IconDots />
      </button>
    </div>
  )
}

/**
 * 서비스 영역 공통 상단 헤더(라이브 대시보드와 동일한 틀).
 * 사이드바 오른쪽 콘텐츠 열 최상단에 둡니다.
 */
export default function ServicePageHeader({ title, meta, showUtilities = true }: ServicePageHeaderProps) {
  return (
    <header className="shrink-0 border-b border-slate-200/80 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 shrink-0">
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">{title}</h1>
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-3 sm:gap-4">
          {meta}
          {showUtilities && <HeaderUtilities />}
        </div>
      </div>
    </header>
  )
}

export type LiveBroadcastStatusMetaProps = {
  viewers: number
  broadcastElapsed: string
}

/** 라이브 방송 분석 대시보드용: LIVE · 시청자 · 방송 시간 · 방송 상태 */
export function LiveBroadcastStatusMeta({ viewers, broadcastElapsed }: LiveBroadcastStatusMetaProps) {
  return (
    <>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        LIVE
      </span>
      <span className="text-sm text-slate-600">
        시청자 <span className="font-semibold text-slate-900">{viewers.toLocaleString()}</span>명
      </span>
      <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
      <span className="text-sm text-slate-600">
        방송 시간{' '}
        <span className="font-mono font-semibold text-slate-900">{broadcastElapsed}</span>
      </span>
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-100">
        방송 상태 [양호]
      </span>
    </>
  )
}
