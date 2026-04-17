function SocialLoginButtons() {
  return (
    <div className="mt-8">
      <div className="relative mb-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" aria-hidden />
        <span className="shrink-0 text-xs font-medium text-slate-500">
          또는 소셜 계정으로
        </span>
        <span className="h-px flex-1 bg-slate-200" aria-hidden />
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-5">
        <button
          type="button"
          aria-label="카카오로 로그인"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] shadow-sm transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          onClick={() => {
            // TODO: 카카오 OAuth
          }}
        >
          <KakaoIcon className="h-7 w-7" />
        </button>

        <button
          type="button"
          aria-label="네이버로 로그인"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#03C75A] text-white shadow-sm transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#03C75A]"
          onClick={() => {
            // TODO: 네이버 OAuth
          }}
        >
          <NaverIcon className="h-6 w-6" />
        </button>

        <button
          type="button"
          aria-label="Google로 로그인"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          onClick={() => {
            // TODO: Google OAuth
          }}
        >
          <GoogleIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 3C6.48 3 2 6.37 2 10.11c0 2.29 1.53 4.3 3.82 5.38l-.92 3.35a.42.42 0 0 0 .56.43l3.77-2c1.09.3 2.26.46 3.53.46 5.52 0 10-3.37 10-7.11S17.52 3 12 3z"
      />
    </svg>
  )
}

function NaverIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M16.273 12.868V5H19.5v14h-3.227l-6.046-7.432V19H6.5V5h3.227l6.546 7.868z"
      />
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export default SocialLoginButtons
