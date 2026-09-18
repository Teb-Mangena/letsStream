import { Link } from "react-router";
import {
  MapPin,
  Mail,
  Calendar,
  Pencil,
  Users,
  ArrowUpRight,
  Settings,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getLanguageFlag } from "../lib/languageFlag";

/* ── Helpers ─────────────────────────────────────── */

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/* ── Data row ────────────────────────────────────── */

function Row({ icon: Icon, label, value, accent = false }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-white/[0.06] last:border-0">
      <Icon
        className={`size-4 shrink-0 ${accent ? "text-lime-300" : "text-white/30"
          }`}
        strokeWidth={1.75}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 w-24 shrink-0">
        {label}
      </span>
      <span
        className={`text-sm font-medium truncate ${accent ? "text-lime-300" : "text-white/80"
          }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Page ────────────────────────────────────────── */

function ProfilePage() {
  const { checkAuthQuery } = useAuth();
  const { data, isLoading } = checkAuthQuery;
  const user = data?.user;

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-neutral-950 text-white flex items-center justify-center gap-3">
        <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Loading profile
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Not signed in
        </p>
      </div>
    );
  }

  const friendCount = user.friends?.length ?? 0;

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      {/* grid texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* ── Header ────────────────────────────── */}
        <header className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Profile
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tighter leading-[0.9]">
              That's{" "}
              <span className="italic font-serif text-lime-300">you.</span>
            </h1>
          </div>

          <Link
            to="/settings"
            className="group hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs font-medium text-white/60 transition-colors hover:border-lime-300/40 hover:text-lime-300"
          >
            <Settings className="size-3.5" />
            <span>Settings</span>
          </Link>
        </header>

        <div className="grid lg:grid-cols-[20rem_1fr] gap-6">
          {/* ══ Identity card ═════════════════════ */}
          <aside className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-lime-300/10 blur-3xl" />

              <div className="relative">
                {/* Avatar */}
                <div className="relative inline-block">
                  <div className="size-24 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] grid place-items-center">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.fullName}
                        className="size-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-2xl text-white/40">
                        {user.fullName?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 size-3.5 rounded-full bg-lime-300 ring-4 ring-neutral-950" />
                </div>

                {/* Name + bio */}
                <h2 className="mt-5 text-2xl font-black tracking-tighter leading-tight">
                  {user.fullName}
                </h2>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                  @{user.fullName?.toLowerCase().replace(/\s+/g, "") ?? "user"}
                </p>

                {user.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    {user.bio}
                  </p>
                )}

                {/* Edit button */}
                <Link
                  to="/onboarding"
                  className="group/btn mt-5 flex w-full items-center justify-between rounded-xl border border-lime-300/30 bg-lime-300/[0.06] px-4 py-2.5 text-xs font-semibold text-lime-300 transition-colors hover:border-lime-300/60 hover:bg-lime-300 hover:text-neutral-950"
                >
                  <span className="flex items-center gap-2">
                    <Pencil className="size-3.5" />
                    Edit profile
                  </span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Friend count mini-card */}
            <Link
              to="/friends"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20"
            >
              <div className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.02]">
                <Users className="size-4 text-lime-300" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xl font-black tracking-tighter tabular-nums leading-none">
                  {friendCount}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {friendCount === 1 ? "Friend" : "Friends"}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-white/20 transition-all duration-300 group-hover:text-lime-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </aside>

          {/* ══ Details ════════════════════════════ */}
          <main className="space-y-6">
            {/* Languages */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-white/25 tabular-nums">
                  01
                </span>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Languages
                </h3>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {/* Native */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    Native
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    {getLanguageFlag(user.nativeLanguage, "h-4")}
                    <span className="text-base font-semibold tracking-tight">
                      {user.nativeLanguage ?? "—"}
                    </span>
                  </div>
                </div>

                {/* Learning */}
                <div className="rounded-2xl border border-lime-300/30 bg-lime-300/[0.04] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300/60">
                    Learning
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    {getLanguageFlag(user.learningLanguage, "h-4")}
                    <span className="text-base font-semibold tracking-tight text-lime-300">
                      {user.learningLanguage ?? "—"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Account details */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-white/25 tabular-nums">
                  02
                </span>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Account
                </h3>
              </div>

              <div className="mt-4">
                <Row icon={Mail} label="Email" value={user.email ?? "—"} />
                <Row
                  icon={MapPin}
                  label="Location"
                  value={user.location ?? "—"}
                />
                <Row
                  icon={Calendar}
                  label="Joined"
                  value={formatDate(user.createdAt)}
                />
                <Row
                  icon={Sparkles}
                  label="Status"
                  value={user.isBoarded ? "Onboarded" : "Setup pending"}
                  accent={user.isBoarded}
                />
              </div>
            </section>

            {/* Mobile settings link */}
            <Link
              to="/settings"
              className="sm:hidden flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs font-medium text-white/60"
            >
              <span className="flex items-center gap-2">
                <Settings className="size-3.5" />
                Settings
              </span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;