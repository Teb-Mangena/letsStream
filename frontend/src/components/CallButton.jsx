import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button
      type="button"
      onClick={handleVideoCall}
      aria-label="Start video call"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-lime-300 py-3 pl-4 pr-5 text-sm font-semibold text-neutral-950 shadow-lg shadow-lime-300/20 transition-all hover:bg-lime-200 hover:shadow-lime-300/40 active:scale-[0.98]"
    >
      <span className="relative grid size-6 place-items-center">
        <VideoIcon className="size-5" strokeWidth={2.25} />
      </span>
      <span className="hidden sm:inline">Video call</span>
    </button>
  );
}

export default CallButton;