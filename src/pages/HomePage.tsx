import { useEffect, useRef, useState } from "react";

function HomePage() {
  const partners = [
    {
      name: "NAVER",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Naver_Logotype.svg",
    },
    {
      name: "COUPANG",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Coupang_logo.svg",
    },
    {
      name: "KAKAO",
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kakao_CI_yellow.svg",
    },
    {
      name: "11ST",
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/11st_logo.svg",
    },
    {
      name: "GMARKET",
      src: "https://upload.wikimedia.org/wikipedia/commons/8/83/Gmarket_logo.svg",
    },
    {
      name: "SSG",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/5b/SSG.COM_logo.svg",
    },
    {
      name: "AUCTION",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Auction_logo.svg",
    },
  ];

  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(dashboardRef);

  return (
    <div className="bg-linear-to-b from-white to-gray-100 text-gray-900">
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="absolute inset-0 bg-linear-to-r from-blue-100 via-purple-100 to-pink-100 opacity-40 blur-3xl" />

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

      <section className="overflow-hidden py-20">
        <h2 className="mb-10 text-center text-2xl font-semibold text-gray-600">
          함께하는 파트너
        </h2>
        <div className="relative w-full">
          <div className="animate-scroll flex w-max items-center gap-14 whitespace-nowrap">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex h-20 min-w-[180px] items-center justify-center rounded-2xl bg-white px-6 shadow-md"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-10 object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
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

      <footer className="py-10 text-center text-gray-400">
        © 2026 Live Flow
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
