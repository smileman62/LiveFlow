import { useCallback, useEffect, useMemo, useState } from 'react'
import ServicePageHeader, {
  LiveBroadcastStatusMeta,
} from '../../components/service/ServicePageHeader'
import KeyMetricsCards from '../../components/service/liveBroadcast/KeyMetricsCards'
import KeyProductPerformanceCard from '../../components/service/liveBroadcast/KeyProductPerformanceCard'
import LiveVideoPanel from '../../components/service/liveBroadcast/LiveVideoPanel'
import RealtimeAnalysisPanel, { type ChatMessage } from '../../components/service/liveBroadcast/RealtimeAnalysisPanel'
import SentimentAnalysisCard from '../../components/service/liveBroadcast/SentimentAnalysisCard'
import ViewerInflowCard from '../../components/service/liveBroadcast/ViewerInflowCard'
import ViewerReactionStrip from '../../components/service/liveBroadcast/ViewerReactionStrip'
import ViewerSalesChart from '../../components/service/liveBroadcast/ViewerSalesChart'

const VOICE_SNIPPETS = [
  '지금 보여드리는 가방은 실제 착용감이 가볍고, 내부 수납이 넉넉해서 데일리로 좋아요.',
  '채팅에서 가격 문의가 많이 올라오고 있어요. 혜택 구간을 짧게 정리해서 안내해 주세요.',
  '“예뻐요” 반응이 이어지고 있습니다. 컬러 옵션을 한 번 더 비교해 보여주면 좋겠어요.',
]

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: '1',
    user: '뷰티러버',
    initials: '뷰',
    avatarClass: 'bg-pink-500',
    time: '12:28:01',
    text: '이 가방 실물 색상이랑 비슷한가요?',
  },
  {
    id: '2',
    user: '쇼핑요정',
    initials: '쇼',
    avatarClass: 'bg-violet-500',
    time: '12:28:04',
    text: '스트랩 길이 조절 되나요?',
  },
  {
    id: '3',
    user: '직장인88',
    initials: '직',
    avatarClass: 'bg-sky-500',
    time: '12:28:09',
    text: '노트북 13인치 들어가요?',
  },
  {
    id: '4',
    user: '귀차니즘',
    initials: '귀',
    avatarClass: 'bg-amber-500',
    time: '12:28:12',
    text: '오늘 방송 한정 할인 맞죠? 바로 살게요!',
  },
]

function formatElapsed(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

function nowTimeString() {
  const d = new Date()
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}

export default function MultiChannelPage() {
  const [viewers, setViewers] = useState(1234)
  const [elapsed, setElapsed] = useState(5025)
  const [voiceIdx, setVoiceIdx] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT)
  const [input, setInput] = useState('')

  const voiceTranscript = VOICE_SNIPPETS[voiceIdx % VOICE_SNIPPETS.length]

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed((t) => t + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setVoiceIdx((i) => i + 1)
    }, 6000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setViewers((v) => Math.max(800, v + Math.floor(Math.random() * 9 - 4)))
    }, 3000)
    return () => window.clearInterval(id)
  }, [])

  const participantCount = useMemo(() => viewers, [viewers])

  const sendMsg = useCallback(() => {
    const t = input.trim()
    if (!t) return
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        user: '셀러',
        initials: '셀',
        avatarClass: 'bg-indigo-600',
        time: nowTimeString(),
        text: t,
      },
    ])
    setInput('')
  }, [input])

  return (
    <div className="flex min-h-dvh flex-col bg-[#f9fafb]">
      <ServicePageHeader
        title="라이브 방송 분석 대시보드"
        meta={
          <LiveBroadcastStatusMeta
            viewers={viewers}
            broadcastElapsed={formatElapsed(elapsed)}
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1600px] space-y-5 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(280px,360px)] lg:items-stretch">
          <LiveVideoPanel viewers={viewers} voiceTranscript={voiceTranscript} />
          <RealtimeAnalysisPanel
            messages={messages}
            participantCount={participantCount}
            input={input}
            onInputChange={setInput}
            onSend={sendMsg}
          />
        </div>
        <div className="flex min-h-0 flex-col gap-5">
          <div className="flex min-h-0 flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-5">
            <div className="min-w-0 flex-1">
              <ViewerSalesChart />
            </div>
            <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[min(280px,100%)] xl:w-[300px]">
              <ViewerInflowCard />
              <KeyMetricsCards />
            </aside>
          </div>
          <ViewerReactionStrip />
          <div className="grid min-h-0 gap-5 md:grid-cols-2">
            <SentimentAnalysisCard />
            <KeyProductPerformanceCard />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
