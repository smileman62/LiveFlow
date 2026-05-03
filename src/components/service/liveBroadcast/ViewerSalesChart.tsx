/** 시청자(좌축 최대 2K) · 매출 우축 최대 20M */
const VIEWERS_RAW = [450, 620, 890, 1020, 1280, 1450, 1620, 1780, 1920]
const SALES_RAW_M = [2.2, 3.8, 5.1, 7.5, 10.2, 12.8, 15.4, 17.9, 19.2]

const LABELS = [
  '11:10',
  '11:20',
  '11:30',
  '11:40',
  '11:50',
  '12:00',
  '12:10',
  '12:20',
  '12:30',
]

const V_MAX = 2000
const S_MAX_M = 20

const LEFT_TICKS = [0, 500, 1000, 1500, 2000]
const RIGHT_TICKS_M = [0, 5, 10, 15, 20]

function formatLeftTick(v: number) {
  if (v >= 1000) return `${v / 1000}K`
  return String(v)
}

function formatRightTick(m: number) {
  if (m === 0) return '0'
  return `${m}M`
}

function buildSeriesPath(
  values: number[],
  maxVal: number,
  width: number,
  padL: number,
  padR: number,
  padT: number,
  plotH: number,
) {
  const innerW = width - padL - padR
  const n = values.length
  return values
    .map((v, i) => {
      const x = padL + (innerW * i) / Math.max(1, n - 1)
      const y = padT + plotH * (1 - v / maxVal)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')
}

function buildAreaUnderViewers(
  values: number[],
  maxVal: number,
  width: number,
  padL: number,
  padR: number,
  padT: number,
  plotH: number,
  padB: number,
  fullH: number,
) {
  const line = buildSeriesPath(values, maxVal, width, padL, padR, padT, plotH)
  const innerW = width - padL - padR
  const lastX = padL + innerW
  const bottom = fullH - padB
  return `${line} L ${lastX.toFixed(1)} ${bottom} L ${padL} ${bottom} Z`
}

export default function ViewerSalesChart() {
  const w = 720
  const h = 248
  const padL = 52
  const padR = 56
  const padT = 18
  const padB = 36
  const plotH = h - padT - padB

  const pathV = buildSeriesPath(VIEWERS_RAW, V_MAX, w, padL, padR, padT, plotH)
  const pathS = buildSeriesPath(
    SALES_RAW_M.map((m) => m * 1_000_000),
    S_MAX_M * 1_000_000,
    w,
    padL,
    padR,
    padT,
    plotH,
  )
  const areaV = buildAreaUnderViewers(VIEWERS_RAW, V_MAX, w, padL, padR, padT, plotH, padB, h)

  const innerW = w - padL - padR
  const n = VIEWERS_RAW.length
  const nowIdx = n - 1
  const nowX = padL + (innerW * nowIdx) / Math.max(1, n - 1)

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col rounded-xl border border-slate-200/80 bg-white p-4 shadow-md ring-1 ring-slate-900/5 md:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900 md:text-base">실시간 시청자 &amp; 매출 추이</h2>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-indigo-500" />
            시청자 수
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-emerald-500" />
            매출 (원)
          </span>
        </div>
      </div>
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-auto w-full min-w-[300px] text-slate-400"
          role="img"
          aria-label="실시간 시청자와 매출 추이 차트"
        >
          <defs>
            <linearGradient id="fillViewers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {LEFT_TICKS.map((tick) => {
            const y = padT + plotH * (1 - tick / V_MAX)
            return (
              <g key={`g-${tick}`}>
                <line
                  x1={padL}
                  y1={y}
                  x2={w - padR}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.14}
                  strokeDasharray="4 4"
                />
                <text x={padL - 8} y={y + 4} textAnchor="end" className="fill-slate-500 text-[9px]">
                  {formatLeftTick(tick)}
                </text>
              </g>
            )
          })}

          {RIGHT_TICKS_M.map((tick) => {
            const y = padT + plotH * (1 - tick / S_MAX_M)
            return (
              <text key={`r-${tick}`} x={w - padR + 8} y={y + 4} textAnchor="start" className="fill-slate-500 text-[9px]">
                {formatRightTick(tick)}
              </text>
            )
          })}

          <line
            x1={nowX}
            y1={padT}
            x2={nowX}
            y2={h - padB}
            stroke="#a5b4fc"
            strokeWidth={1.25}
            strokeDasharray="5 5"
          />
          <text x={nowX} y={padT - 4} textAnchor="middle" className="fill-indigo-500 text-[9px] font-semibold">
            지금
          </text>

          <path d={areaV} fill="url(#fillViewers)" />
          <path d={pathV} fill="none" stroke="#6366f1" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathS} fill="none" stroke="#10b981" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" />

          {VIEWERS_RAW.map((v, i) => {
            const x = padL + (innerW * i) / Math.max(1, n - 1)
            const y = padT + plotH * (1 - v / V_MAX)
            const isLast = i === nowIdx
            return (
              <circle
                key={`v-${i}`}
                cx={x}
                cy={y}
                r={isLast ? 5.5 : 4}
                fill="white"
                stroke="#6366f1"
                strokeWidth={isLast ? 2.5 : 2}
              />
            )
          })}

          {SALES_RAW_M.map((m, i) => {
            const x = padL + (innerW * i) / Math.max(1, n - 1)
            const y = padT + plotH * (1 - m / S_MAX_M)
            const isLast = i === nowIdx
            return (
              <circle
                key={`s-${i}`}
                cx={x}
                cy={y}
                r={isLast ? 5.5 : 4}
                fill="white"
                stroke="#10b981"
                strokeWidth={isLast ? 2.5 : 2}
              />
            )
          })}

          {LABELS.map((label, i) => {
            const x = padL + (innerW * i) / Math.max(1, n - 1)
            return (
              <text key={label} x={x} y={h - 10} textAnchor="middle" className="fill-slate-500 text-[9px]">
                {label}
              </text>
            )
          })}
        </svg>
      </div>
    </section>
  )
}
