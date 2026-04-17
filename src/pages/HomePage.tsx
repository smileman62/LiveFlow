import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PARTNER_NAMES = [
  "네이버",
  "쿠팡",
  "카카오",
  "11번가",
  "G마켓",
  "SSG",
  "옥션",
] as const;

function HomePage() {

  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(dashboardRef);

  return (
    <div className="flex w-full min-h-[calc(100dvh-4rem)] flex-col bg-linear-to-b from-blue-100 via-purple-100 to-pink-100 text-gray-900">
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <h1 className="relative mb-6 text-5xl leading-tight font-extrabold text-gray-900 md:text-6xl">
          라이브 커머스 데이터를
          <br />
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            수익으로 바꾸는 인프라
          </span>
        </h1>

        <p className="relative mb-10 text-lg text-gray-600 md:text-xl">
          실시간 데이터 분석 + AI 전략 자동화
          <br />
          Live Flow 하나로 끝내세요
        </p>

        <div className="relative flex justify-center gap-4">
          <button
            type="button"
            className="rounded-2xl bg-slate-900 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-slate-800 md:px-10 md:text-lg"
          >
            시작하기
          </button>
          <button
            type="button"
            className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-medium text-slate-800 hover:bg-slate-50 md:px-10 md:text-lg"
          >
            데모 보기
          </button>
        </div>

        <div
          ref={dashboardRef}
          className="mx-auto mt-20 max-w-5xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">실시간 매출</p>
              <p className="text-2xl font-bold">
                {isVisible ? (
                  <RollingNumber value={12450000} prefix="₩" />
                ) : (
                  "₩0"
                )}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">전환율</p>
              <p className="text-2xl font-bold">
                {isVisible ? <RollingNumber value={18} suffix="%" /> : "0%"}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">시청자</p>
              <p className="text-2xl font-bold">
                {isVisible ? <RollingNumber value={8942} suffix="명" /> : "0명"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-600">
          함께하는 파트너
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm text-gray-500">
          주요 커머스·라이브 플랫폼과 연동해 하나의 대시보드에서 관리할 수 있습니다.
        </p>
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {PARTNER_NAMES.map((name) => (
            <span
              key={name}
              className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="py-28 text-center">
        <h2 className="mb-6 text-4xl font-bold">지금 바로 시작하세요</h2>
        <button
          type="button"
          className="rounded-2xl bg-slate-900 px-12 py-5 text-lg font-medium text-white shadow-xl hover:bg-slate-800"
        >
          시작하기
        </button>
      </section>

      <footer className="mt-auto border-t border-slate-200/80 bg-white/40 px-6 py-12 backdrop-blur-sm">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-slate-900">Live Flow</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              라이브 커머스 데이터를 수익으로 바꾸는 인프라. 실시간 분석과 AI 자동화를 한곳에서.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              서비스
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/login" className="hover:text-slate-900">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-slate-900">
                  회원가입
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              문의
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <span className="text-slate-500">이메일 (준비 중)</span>
              </li>
              <li>
                <span className="text-slate-500">사업자 정보 (준비 중)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-8 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Live Flow. All rights reserved.</p>
          <div className="flex gap-6">
            <button type="button" className="hover:text-slate-800">
              이용약관
            </button>
            <button type="button" className="hover:text-slate-800">
              개인정보처리방침
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

type RollingNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
};

function RollingNumber({
  value,
  prefix = "",
  suffix = "",
}: RollingNumberProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let current = 0;
    const intervalId = window.setInterval(() => {
      current += Math.ceil((value - current) * 0.15);
      if (current >= value) {
        window.clearInterval(intervalId);
        setDisplay(value);
        return;
      }
      setDisplay(current);
    }, 50);

    return () => window.clearInterval(intervalId);
  }, [value]);

  return (
    <span>
      {prefix}
      {Math.floor(display).toLocaleString()}
      {suffix}
    </span>
  );
}

function useInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}

export default HomePage;
