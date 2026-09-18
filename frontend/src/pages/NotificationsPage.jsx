import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ClockIcon,
  MessageSquareIcon,
  ArrowUpRight,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";

/* ── Section heading ────────────────────────────── */

function SectionHeader({ num, label, count, tone = "lime" }) {
  return (
    <div className="flex items-baseline justify-between mb-5">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] text-white/25 tabular-nums">
          {num}
        </span>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          {label}
        </h2>
      </div>
      {count > 0 && (
        <span
          className={`font-mono text-[10px] tabular-nums ${tone === "lime" ? "text-lime-300/80" : "text-white/40"
            }`}
        >
          {String(count).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const totalIncoming = incomingRequests.length;
  const totalAccepted = acceptedRequests.length;
  const isEmpty = totalIncoming === 0 && totalAccepted === 0;

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      {/* grid texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* ── Header ────────────────────────────── */}
        <header className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Inbox
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tighter leading-[0.9]">
            What's{" "}
            <span className="italic font-serif text-lime-300">new.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
            Friend requests, new connections, and updates from your partners.
          </p>
        </header>

        {/* ── Loading ───────────────────────────── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24 gap-3">
            <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Loading
            </span>
          </div>
        ) : isEmpty ? (
          <NoNotificationsFound />
        ) : (
          <div className="space-y-12">
            {/* ── Incoming friend requests ───────── */}
            {totalIncoming > 0 && (
              <section>
                <SectionHeader
                  num="01"
                  label="Friend requests"
                  count={totalIncoming}
                />

                <ul className="space-y-3">
                  {incomingRequests.map((request) => (
                    <li
                      key={request._id}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                          <div className="size-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] grid place-items-center">
                            {request.sender?.profilePic ? (
                              <img
                                src={request.sender.profilePic}
                                alt={request.sender.fullName}
                                className="size-full object-cover"
                              />
                            ) : (
                              <span className="font-mono text-xs text-white/40">
                                {request.sender?.fullName?.[0]?.toUpperCase() ??
                                  "?"}
                              </span>
                            )}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold tracking-tight truncate">
                            {request.sender?.fullName ?? "Unknown"}
                          </h3>
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                            <span className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                                Native
                              </span>
                              <span className="text-white/70">
                                {request.sender?.nativeLanguage ?? "—"}
                              </span>
                            </span>
                            <span className="text-white/15">/</span>
                            <span className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-lime-300/60">
                                Learning
                              </span>
                              <span className="text-lime-300/90 font-medium">
                                {request.sender?.learningLanguage ?? "—"}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Accept */}
                        <button
                          type="button"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                          className="group/btn flex shrink-0 items-center gap-2 rounded-xl border border-lime-300/30 bg-lime-300/[0.06] px-4 py-2 text-xs font-semibold text-lime-300 transition-colors hover:border-lime-300/60 hover:bg-lime-300 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-lime-300/30 disabled:hover:bg-lime-300/[0.06] disabled:hover:text-lime-300"
                        >
                          <span>Accept</span>
                          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ── Accepted / new connections ─────── */}
            {totalAccepted > 0 && (
              <section>
                <SectionHeader
                  num={totalIncoming > 0 ? "02" : "01"}
                  label="New connections"
                  count={totalAccepted}
                  tone="muted"
                />

                <ul className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <li
                      key={notification._id}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div className="size-11 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] grid place-items-center">
                          {notification.recipient?.profilePic ? (
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <span className="font-mono text-[11px] text-white/40">
                              {notification.recipient?.fullName?.[0]?.toUpperCase() ??
                                "?"}
                            </span>
                          )}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold tracking-tight truncate">
                          {notification.recipient?.fullName ?? "Unknown"}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/50">
                          Accepted your friend request — say hi 👋
                        </p>
                        <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                          <ClockIcon className="size-3" />
                          Recently
                        </p>
                      </div>

                      {/* Badge */}
                      <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-lime-300/30 bg-lime-300/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-lime-300">
                        <MessageSquareIcon className="size-3" />
                        New friend
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;