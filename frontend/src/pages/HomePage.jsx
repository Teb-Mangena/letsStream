import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  ArrowUpRight,
} from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { getLanguageFlag } from "../lib/languageFlag";

/* ── Section heading ────────────────────────────── */

function SectionHeader({ num, label, count, action }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] text-white/25 tabular-nums">
          {num}
        </span>
        <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          {label}
        </h2>
        {count != null && (
          <span className="font-mono text-[10px] tabular-nums text-lime-300/80">
            {String(count).padStart(2, "0")}
          </span>
        )}
      </div>
      {action}
    </div>
  );
}

/* ── Page ───────────────────────────────────────── */

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  // ✅ Derived during render — no effect, no cascading render
  const outgoingRequestIds = new Set(
    outgoingFriendReqs.map((req) => req.recipient?._id).filter(Boolean)
  );

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      {/* grid texture */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 space-y-16">
        {/* ── Editorial header ─────────────────── */}
        <header>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Your space
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9]">
            Speak.{" "}
            <span className="italic font-serif text-lime-300">Together.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
            Your friends, your partners, your next conversation — all in one
            place.
          </p>
        </header>

        {/* ══ Friends section ════════════════════ */}
        <section>
          <SectionHeader
            num="01"
            label="Your friends"
            count={friends.length > 0 ? friends.length : null}
            action={
              <Link
                to="/notifications"
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2 text-xs font-medium text-white/60 transition-colors hover:border-lime-300/40 hover:text-lime-300"
              >
                <UsersIcon className="size-3.5" />
                <span>Friend requests</span>
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            }
          />

          {loadingFriends ? (
            <div className="flex items-center justify-center py-16 gap-3">
              <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Loading
              </span>
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </section>

        {/* ══ Recommended users ══════════════════ */}
        <section>
          <SectionHeader
            num="02"
            label="Meet new learners"
            count={recommendedUsers.length > 0 ? recommendedUsers.length : null}
          />

          <p className="mb-8 -mt-2 max-w-md text-sm leading-relaxed text-white/40">
            Discover perfect language exchange partners based on your profile.
          </p>

          {loadingUsers ? (
            <div className="flex items-center justify-center py-16 gap-3">
              <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Loading
              </span>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                Empty
              </p>
              <h3 className="mt-3 text-xl font-bold tracking-tight">
                No recommendations{" "}
                <span className="italic font-serif text-lime-300">yet.</span>
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Check back later for new language partners.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestIds.has(user._id);

                return (
                  <article
                    key={user._id}
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.03]"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <div className="size-14 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] grid place-items-center">
                          {user.profilePic ? (
                            <img
                              src={user.profilePic}
                              alt={user.fullName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <span className="font-mono text-xs text-white/40">
                              {user.fullName?.[0]?.toUpperCase() ?? "?"}
                            </span>
                          )}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold tracking-tight">
                          {user.fullName}
                        </h3>
                        {user.location && (
                          <p className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                            <MapPinIcon className="size-3" />
                            {user.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mt-5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                          Native
                        </span>
                        <span className="flex items-center gap-2 text-xs font-medium text-white/70">
                          <span>{getLanguageFlag(user.nativeLanguage)}</span>
                          {capitialize(user.nativeLanguage)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300/60">
                          Learning
                        </span>
                        <span className="flex items-center gap-2 text-xs font-medium text-lime-300">
                          <span>
                            {getLanguageFlag(user.learningLanguage)}
                          </span>
                          {capitialize(user.learningLanguage)}
                        </span>
                      </div>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                      <p className="mt-5 line-clamp-2 text-xs leading-relaxed text-white/40">
                        {user.bio}
                      </p>
                    )}

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() => sendRequestMutation(user._id)}
                      disabled={hasRequestBeenSent || isPending}
                      className={`group/btn mt-5 flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition-colors ${hasRequestBeenSent
                        ? "border border-white/10 bg-white/[0.02] text-white/40 cursor-not-allowed"
                        : "border border-lime-300/30 bg-lime-300/[0.06] text-lime-300 hover:border-lime-300/60 hover:bg-lime-300 hover:text-neutral-950 disabled:opacity-40"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-3.5" />
                            Request sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-3.5" />
                            Send request
                          </>
                        )}
                      </span>
                      {!hasRequestBeenSent && (
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      )}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;