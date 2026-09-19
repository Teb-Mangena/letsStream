import { ShipWheelIcon } from "lucide-react";

function PageLoader({ label = "Loading" }) {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-80 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="relative flex flex-col items-center">
        {/* Brand mark */}
        <div className="relative grid size-16 place-items-center rounded-3xl border border-white/10 bg-white/[0.02]">
          <ShipWheelIcon
            className="size-6 text-lime-300 animate-spin"
            strokeWidth={1.75}
            style={{ animationDuration: "2s" }}
          />
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-lime-300 ring-2 ring-neutral-950 animate-pulse" />
        </div>

        {/* Wordmark */}
        <span className="mt-6 text-lg font-black tracking-tighter">
          lets<span className="text-lime-300">Stream</span>
        </span>

        {/* Label */}
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {label}
          <span className="ml-1 animate-pulse">…</span>
        </p>
      </div>
    </div>
  );
}

export default PageLoader;