import { useState } from 'react'

/** `public/liveVideo.gif` — Vite에서 루트 경로로 제공 */
const LIVE_VIDEO_SRC = '/liveVideo.gif'
type LiveVideoPanelProps = {
  viewers: number
  voiceTranscript: string
}

function IconPlay() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

function IconVolume() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    </svg>
  )
}

function IconFullscreen() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  )
}

function IconEye() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function IconMic() {
  return (
    <svg className="h-4 w-4 shrink-0 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 1.5v-6a6 6 0 00-12 0v6"
      />
    </svg>
  )
}

export default function LiveVideoPanel({ viewers, voiceTranscript }: LiveVideoPanelProps) {
  const [playing, setPlaying] = useState(true)

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-black shadow-md ring-1 ring-black/5">
      <div className="grid aspect-video w-full place-items-center bg-slate-900">
        <div className="relative inline-block max-h-full max-w-full justify-self-center">
          <img
            src={LIVE_VIDEO_SRC}
            alt="라이브 방송 화면"
            className="block max-h-full max-w-full h-auto w-auto object-contain object-center opacity-95"
            width={400}
            height={225}
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              LIVE
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <IconEye />
              {viewers.toLocaleString()}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 space-y-0">
            <div className="mx-3 mb-2 rounded-lg bg-black/65 px-3 py-2 text-xs text-white/95 backdrop-blur-md">
              <div className="mb-1 flex items-center gap-2 font-medium text-indigo-200">
                <IconMic />
                음성 분석
              </div>
              <p className="leading-relaxed text-violet-100">{voiceTranscript}</p>
            </div>

            <div className="flex items-center gap-3 bg-black/70 px-3 py-2.5 text-white backdrop-blur-md">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="rounded-lg p-1.5 hover:bg-white/10"
                aria-label={playing ? '일시정지' : '재생'}
              >
                {playing ? <IconPause /> : <IconPlay />}
              </button>
              <button type="button" className="rounded-lg p-1.5 hover:bg-white/10" aria-label="볼륨">
                <IconVolume />
              </button>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[72%] rounded-full bg-red-500" />
                </div>
                <span className="shrink-0 text-[10px] font-semibold text-red-400">LIVE</span>
              </div>
              <button type="button" className="rounded-lg p-1.5 hover:bg-white/10" aria-label="전체화면">
                <IconFullscreen />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
