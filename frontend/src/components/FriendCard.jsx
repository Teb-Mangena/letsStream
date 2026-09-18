import { Link } from "react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getLanguageFlag } from "../lib/languageFlag";

const FriendCard = ({ friend }) => {
  return (
    <article className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.03]">
      {/* ── Header ─────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="size-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] grid place-items-center">
            {friend.profilePic ? (
              <img
                src={friend.profilePic}
                alt={friend.fullName}
                className="size-full object-cover"
              />
            ) : (
              <span className="font-mono text-xs text-white/40">
                {friend.fullName?.[0]?.toUpperCase() ?? "?"}
              </span>
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
        </div>

        <h3 className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight">
          {friend.fullName ?? "Unknown"}
        </h3>
      </div>

      {/* ── Languages ──────────────────────────── */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Native
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-white/70">
            {getLanguageFlag(friend.nativeLanguage)}
            {friend.nativeLanguage ?? "—"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300/60">
            Learning
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-lime-300">
            {getLanguageFlag(friend.learningLanguage)}
            {friend.learningLanguage ?? "—"}
          </span>
        </div>
      </div>

      {/* ── Action ─────────────────────────────── */}
      <Link
        to={`/chat/${friend._id}`}
        className="group/btn mt-5 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-semibold text-white/70 transition-colors hover:border-lime-300/40 hover:bg-lime-300 hover:text-neutral-950"
      >
        <span className="flex items-center gap-2">
          <MessageCircle className="size-3.5" />
          Message
        </span>
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </Link>
    </article>
  );
};

export default FriendCard;