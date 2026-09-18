import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 text-center">
      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* glow */}
      <div className="pointer-events-none absolute top-1/3 size-64 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="relative">
        {/* Icon frame */}
        <div className="relative mx-auto grid size-20 place-items-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <BellIcon
            className="size-7 text-white/25"
            strokeWidth={1.5}
          />
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950" />
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Empty
        </p>

        <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tighter text-white">
          Nothing here{" "}
          <span className="italic font-serif text-lime-300">yet.</span>
        </h3>

        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/40">
          When you receive friend requests or messages, they'll show up
          right here.
        </p>
      </div>
    </div>
  );
}

export default NoNotificationsFound;