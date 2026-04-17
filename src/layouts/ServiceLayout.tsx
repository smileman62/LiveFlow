import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const navItems = [
  { to: "/service", label: "방송 준비", end: true },
  { to: "/service/multi-channel", label: "통합 채팅", end: false },
  { to: "/service/sales-dashboard", label: "판매 대시보드", end: false },
  { to: "/service/post-analysis", label: "방송 후 분석", end: false },
] as const;

function ServiceLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] flex-1 bg-slate-50">
      <aside className="fixed top-16 left-0 z-40 flex h-[calc(100dvh-4rem)] w-56 flex-col border-r border-slate-200 bg-white">
        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-3">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="shrink-0 border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            로그아웃
          </button>
        </div>
      </aside>
      <div className="ml-56 min-h-[calc(100dvh-4rem)] min-w-0 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default ServiceLayout;
