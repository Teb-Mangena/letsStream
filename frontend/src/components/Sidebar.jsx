import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const NAV = [
  { to: "/", num: "01", label: "Home", icon: HomeIcon },
  { to: "/friends", num: "02", label: "Friends", icon: UsersIcon },
  { to: "/notifications", num: "03", label: "Notifications", icon: BellIcon },
];

const Sidebar = () => {
  const { checkAuthQuery } = useAuth();
  const authUser = checkAuthQuery.data?.user;
  const { pathname } = useLocation();

  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen sticky top-0 bg-neutral-950 text-white border-r border-white/10">
      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* ── Brand ─────────────────────────────────── */}
      <div className="relative border-b border-white/10 px-6 py-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-lime-300 transition-colors group-hover:border-lime-300/40">
            <ShipWheelIcon className="size-4" />
          </span>
          <span className="text-lg font-black tracking-tighter">
            lets<span className="text-lime-300">Stream</span>
          </span>
        </Link>
      </div>

      {/* ── Nav ───────────────────────────────────── */}
      <nav className="relative flex-1 px-3 py-6">
        <p className="px-3 mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Menu
        </p>

        <ul className="space-y-1">
          {NAV.map(({ to, num, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${active
                      ? "bg-lime-300/[0.06] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                    }`}
                >
                  {/* active bar */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full transition-all ${active ? "bg-lime-300 opacity-100" : "opacity-0"
                      }`}
                  />

                  <Icon
                    className={`size-[18px] shrink-0 transition-colors ${active
                        ? "text-lime-300"
                        : "text-white/40 group-hover:text-white/70"
                      }`}
                  />

                  <span className="flex-1 text-sm font-medium">{label}</span>

                  <span
                    className={`font-mono text-[10px] tabular-nums transition-colors ${active ? "text-lime-300/70" : "text-white/20"
                      }`}
                  >
                    {num}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* live activity card */}
        <div className="mt-8 mx-1 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Live now
            </span>
          </div>
          <p className="mt-3 text-2xl font-black tracking-tighter tabular-nums">
            1,284
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/40">
            conversations happening right now
          </p>
        </div>
      </nav>

      {/* ── User ──────────────────────────────────── */}
      <div className="relative border-t border-white/10 p-4">
        <Link
          to="/profile"
          className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.03]"
        >
          <div className="relative shrink-0">
            <div className="size-10 overflow-hidden rounded-full border border-white/10 bg-white/[0.02] grid place-items-center">
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt="User avatar"
                  className="size-full object-cover"
                />
              ) : (
                <span className="font-mono text-xs text-white/40">
                  {authUser?.fullName?.[0]?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight">
              {authUser?.fullName ?? "Guest"}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300/70">
              Online
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;