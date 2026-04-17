import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div
      className="login-page-bg flex min-h-0 flex-1 flex-col items-center justify-center px-5 py-10 sm:px-6 sm:py-12"
      style={{
        background:
          'linear-gradient(135deg, #fdfbfb 0%, #eef0f7 45%, #e8eaf6 100%)',
      }}
    >
      <div className="w-full max-w-[420px] shrink-0 text-center">
        <div
          className="rounded-2xl border border-gray-300 bg-white px-8 py-12 font-sans antialiased sm:px-10"
          style={{
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h1 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
            회원가입
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            회원가입 폼은 준비 중입니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/login"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#0f172a] px-6 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
            >
              로그인으로
            </Link>
            <Link
              to="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              홈으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
