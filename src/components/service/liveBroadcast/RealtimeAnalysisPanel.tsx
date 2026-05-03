import { useEffect, useMemo, useState, type ReactNode } from "react";

export type ChatMessage = {
  id: string;
  user: string;
  initials: string;
  avatarClass: string;
  time: string;
  text: string;
};

type SubPanelTab = "keywords" | "ai";

type RealtimeAnalysisPanelProps = {
  messages: ChatMessage[];
  participantCount: number;
  input: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
};

const TOP_FIVE = [
  { rank: 1, word: "가방", count: 428 },
  { rank: 2, word: "예뻐요", count: 312 },
  { rank: 3, word: "가격", count: 198 },
  { rank: 4, word: "배송", count: 156 },
  { rank: 5, word: "할인", count: 134 },
];

function IconEmoji() {
  return (
    <svg
      className="h-5 w-5 text-slate-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.25 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
      />
    </svg>
  );
}

function IconSend() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
}

function TabButton({
  label,
  active,
  onClick,
  compact,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "shrink-0 rounded-md font-medium transition",
        compact
          ? "px-2.5 py-1.5 text-xs leading-tight"
          : "rounded-lg px-3 py-2 text-xs md:text-sm",
        active
          ? "bg-indigo-500 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function PinIcon({ tone }: { tone: "rose" | "sky" }) {
  const cls =
    tone === "rose" ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600";
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-lg ${cls}`}
    >
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    </span>
  );
}

function BulbIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
      <svg
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    </span>
  );
}

function InsightRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 text-base leading-relaxed text-slate-700">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export default function RealtimeAnalysisPanel({
  messages,
  participantCount,
  input,
  onInputChange,
  onSend,
}: RealtimeAnalysisPanelProps) {
  const [subTab, setSubTab] = useState<SubPanelTab>("keywords");
  const [autoRotate, setAutoRotate] = useState(false);
  const [autoSeconds, setAutoSeconds] = useState(30);

  const sortedKeywords = useMemo(() => TOP_FIVE, []);

  useEffect(() => {
    if (!autoRotate) return;
    const intervalMs = Math.max(1, autoSeconds) * 1000;
    const id = window.setInterval(() => {
      setSubTab((t) => (t === "keywords" ? "ai" : "keywords"));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [autoRotate, autoSeconds]);

  return (
    <section className="flex h-200 min-w-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-md ring-1 ring-slate-900/5 md:min-h-[420px]">
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <span className="text-[15px] font-semibold text-slate-900">
            실시간 채팅
          </span>
          <span className="text-[13px] text-slate-500">
            참여자 {participantCount.toLocaleString()}명
          </span>
        </div>
        <div className="min-h-0 h-70 space-y-3 overflow-y-auto px-4 py-3">
          {messages.map((m) => (
            <div key={m.id} className="flex gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white ${m.avatarClass}`}
              >
                {m.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[15px] font-semibold text-slate-900">
                    {m.user}
                  </span>
                  <span className="text-xs text-slate-400">{m.time}</span>
                </div>
                <p className="mt-0.5 text-[15px] leading-relaxed text-slate-700">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 p-3">
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="메시지를 입력하세요..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="button"
            className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="이모지"
          >
            <IconEmoji />
          </button>
          <button
            type="button"
            onClick={onSend}
            className="rounded-xl bg-indigo-500 p-2.5 text-white shadow-sm transition hover:bg-indigo-600"
            aria-label="전송"
          >
            <IconSend />
          </button>
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-200 bg-slate-50/50">
        <div className="flex min-w-0 flex-nowrap items-center justify-between gap-2 border-b border-slate-100 px-2 py-1.5">
          <div className="flex min-w-0 flex-nowrap items-center gap-1.5">
            <TabButton
              compact
              label="실시간 상위 키워드"
              active={subTab === "keywords"}
              onClick={() => setSubTab("keywords")}
            />
            <TabButton
              compact
              label="AI 인사이트"
              active={subTab === "ai"}
              onClick={() => setSubTab("ai")}
            />
          </div>
          <label className="flex shrink-0 cursor-pointer flex-nowrap items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <input
              type="number"
              min={1}
              max={999}
              value={autoSeconds}
              onChange={(e) => {
                const next = Number(e.target.value);
                setAutoSeconds(Number.isFinite(next) ? Math.max(1, next) : 1);
              }}
              className="h-6 w-11 rounded border border-slate-200 bg-white px-1 text-center text-xs font-semibold tabular-nums text-slate-700 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-500/25"
              aria-label="자동 전환 초"
            />
            <span className="whitespace-nowrap">초 자동 전환</span>
            <button
              type="button"
              role="switch"
              aria-checked={autoRotate}
              onClick={() => setAutoRotate((v) => !v)}
              className={[
                "relative h-4 w-7 shrink-0 rounded-full transition",
                autoRotate ? "bg-indigo-500" : "bg-slate-300",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow transition",
                  autoRotate ? "translate-x-3" : "translate-x-0",
                ].join(" ")}
              />
            </button>
          </label>
        </div>

        <div className="overflow-y-auto p-4">
          {subTab === "keywords" && (
            <div className="flex flex-col gap-2">
              {sortedKeywords.map((k) => (
                <div
                  key={k.word}
                  className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-white px-4 py-3 shadow-sm ring-1 ring-indigo-50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold tabular-nums text-indigo-600">
                      {k.rank}
                    </span>
                    <span className="min-w-0 truncate text-[15px] font-semibold text-slate-950">
                      {k.word}
                    </span>
                  </div>
                  <span className="shrink-0 tabular-nums text-sm font-semibold text-indigo-600">
                    {k.count}회
                  </span>
                </div>
              ))}
            </div>
          )}

          {subTab === "ai" && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">
                  AI 인사이트
                </h3>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold tracking-wide text-emerald-800">
                  NEW
                </span>
              </div>
              <ul className="space-y-2.5">
                <InsightRow icon={<PinIcon tone="rose" />}>
                  ‘가방’ 키워드 급증 구간입니다. 각도·소재를 짧게 보여주면 체류
                  시간이 늘어날 수 있어요.
                </InsightRow>
                <InsightRow icon={<BulbIcon />}>
                  채팅 긍정 비율이 높습니다. 한정 수량·타임딜을 자연스럽게
                  언급해 전환을 끌어올려 보세요.
                </InsightRow>
                <InsightRow icon={<PinIcon tone="sky" />}>
                  배송 문의가 늘고 있습니다. 고정 댓글에 배송·교환 안내 링크를
                  추가하는 것을 권장합니다.
                </InsightRow>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
