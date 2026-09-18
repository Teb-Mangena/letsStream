import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
// import ThemeSelector from "./ThemeSelector";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { pathname } = useLocation();
  const isChatPage = pathname?.startsWith("/chat");

  const { logoutMutation, checkAuthQuery } = useAuth();
  const { mutate: logoutUser, isPending: isLoggingOut } = logoutMutation;
  const authUser = checkAuthQuery.data?.user;

  return (
    <nav className="sticky top-0 z-30 h-16 bg-neutral-950/80 backdrop-blur-md text-white border-b border-white/10">
      <div className="h-full flex items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* ── Logo · chat only ─────────────────── */}
        {isChatPage && (
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 lg:hidden"
          >
            <span className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-lime-300">
              <ShipWheelIcon className="size-4" />
            </span>
            <span className="text-base font-black tracking-tighter">
              lets<span className="text-lime-300">Stream</span>
            </span>
          </Link>
        )}

        {/* ── Right cluster ────────────────────── */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Live status pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              1,284 live
            </span>
          </div>

          {/* Notifications */}
          <Link
            to="/notifications"
            className="group relative grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:text-white hover:border-white/20"
            aria-label="Notifications"
          >
            <BellIcon className="size-[18px]" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-lime-300" />
          </Link>

          {/* Theme */}
          {/* <div className="grid place-items-center [&_*]:!text-white/60 [&_*:hover]:!text-white">
            <ThemeSelector />
          </div> */}

          {/* Divider */}
          <span className="hidden sm:block h-6 w-px bg-white/10 mx-1" />

          {/* User chip */}
          <Link
            to="/profile"
            className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-1 pr-3 transition-colors hover:border-white/20"
          >
            <div className="relative shrink-0">
              <div className="size-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] grid place-items-center">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="User avatar"
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-[11px] text-white/50">
                    {authUser?.fullName?.[0]?.toUpperCase() ?? "?"}
                  </span>
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
            </div>

            <span className="hidden sm:block max-w-[10rem] truncate text-sm font-medium tracking-tight text-white/80 group-hover:text-white">
              {authUser?.fullName ?? "Guest"}
            </span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={() => logoutUser()}
            disabled={isLoggingOut}
            className="group grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:text-red-400 hover:border-red-400/30 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Log out"
          >
            <LogOutIcon className="size-[18px]" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;