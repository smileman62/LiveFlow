import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SocialLoginButtons from "../components/shared/SocialLoginButtons";
import { useAuth } from "../contexts/useAuth";

function safeReturnPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/service";
  return next;
}

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToService(displayName: string) {
    login({ displayName });
    const target = safeReturnPath(searchParams.get("next"));
    navigate(target, { replace: true });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: 실제 인증 API 연동 — 현재는 버튼만으로 세션 로그인(목업)
    const trimmed = email.trim();
    const displayName = trimmed
      ? trimmed.includes("@")
        ? trimmed.split("@")[0] || "회원"
        : trimmed
      : "회원";
    goToService(displayName);
  }

  return (
    <div
      className="login-page-bg flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-10 sm:px-6 sm:py-12"
      style={{
        background:
          "linear-gradient(135deg, #fdfbfb 0%, #eef0f7 45%, #e8eaf6 100%)",
      }}
    >
      <div className="w-full max-w-[420px] shrink-0">
        <div
          className="rounded-2xl border border-gray-300 bg-white px-8 py-10 font-sans antialiased sm:px-10 sm:py-12"
          style={{
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h1 className="mb-8 text-center text-xl font-bold leading-snug tracking-tight text-slate-900 sm:mb-10 sm:text-2xl">
            Live Flow 로그인
          </h1>

          <form
            className="flex flex-col gap-3"
            noValidate
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="login-email" className="sr-only">
                이메일
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input w-full rounded-lg border border-slate-200 bg-white px-5 py-4 text-base leading-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/15"
                placeholder="이메일 (비워두면 목업 로그인)"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="sr-only">
                비밀번호
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input w-full rounded-lg border border-slate-200 bg-white px-5 py-4 text-base leading-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/15"
                placeholder="비밀번호 (목업에서는 무시)"
              />
            </div>
            <button
              type="submit"
              className="login-submit mt-1 min-h-[52px] w-full cursor-pointer rounded-lg border-0 bg-[#0f172a] px-5 py-4 text-base font-semibold leading-none text-white shadow-sm transition hover:bg-[#1e293b] active:bg-[#0c1222]"
            >
              로그인
            </button>
          </form>

          <SocialLoginButtons onTempLogin={() => goToService("회원")} />
        </div>

        <p className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-slate-500 transition hover:text-slate-800"
          >
            홈으로
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
