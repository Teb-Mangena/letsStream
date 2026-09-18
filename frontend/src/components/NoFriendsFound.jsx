import { UsersIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 size-64 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="relative">
        {/* Icon frame */}
        <div className="relative mx-auto grid size-20 place-items-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <UsersIcon className="size-7 text-white/25" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Empty
        </p>

        <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tighter text-white">
          No friends{" "}
          <span className="italic font-serif text-lime-300">yet.</span>
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/40">
          Connect with language partners below to start practicing together.
        </p>
      </div>
    </div>
  );
};

export default NoFriendsFound;