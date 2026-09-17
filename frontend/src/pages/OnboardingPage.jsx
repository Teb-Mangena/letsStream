import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowUpRight,
  Upload,
  User,
  X,
  Check,
} from "lucide-react";
import { GREETINGS, LANGUAGES } from "../constants/styles";
import { useAuth } from "../hooks/useAuth";

function Marquee({ reverse = false }) {
  const items = [...GREETINGS, ...GREETINGS];
  return (
    <div className="overflow-hidden py-5">
      <div
        className="flex gap-12 whitespace-nowrap w-max"
        style={{
          animation: `marquee 60s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {items.map((g, i) => (
          <span
            key={i}
            className="text-sm font-medium text-white/25 select-none"
          >
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}

function Field({ label, hint, trailing, ...props }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {label}
        </label>
        {hint && (
          <span className="font-mono text-[10px] text-white/20">{hint}</span>
        )}
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-colors focus-within:border-lime-300/50 focus-within:bg-white/[0.04]">
        <input
          {...props}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
        />
        {trailing}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const [preview, setPreview] = useState(null)
  const [nativeLang, setNativeLang] = useState("Sepedi");
  const [learningLang, setLearningLang] = useState("English");
  const fileRef = useRef(null);
  const { checkAuthQuery, onboardingMutation } = useAuth();
  const { mutate: onboardUser, isPending } = onboardingMutation;
  const { data } = checkAuthQuery;
  const authUser = data.user;

  const [userDetails, setUserDetails] = useState({
    fullName: authUser.fullName || "",
    bio: authUser.bio || "",
    nativeLanguage: authUser.nativeLanguage || "",
    learningLanguage: authUser.learningLanguage || "",
    location: authUser.location || ""
  })

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleOnboard = (e) => {
    e.preventDefault();

    onboardUser(userDetails);
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* top marquee */}
      <div className="relative border-b border-white/10">
        <Marquee />
      </div>

      <main className="relative flex-1 grid lg:grid-cols-2">
        {/* ── Left · profile poster ─────────────── */}
        <section className="relative flex flex-col justify-between border-b border-white/10 lg:border-b-0 lg:border-r px-8 py-12 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -left-20 top-1/4 size-80 rounded-full bg-lime-300/10 blur-3xl" />

          <Link to="/" className="relative text-xl font-black tracking-tighter">
            lets<span className="text-lime-300">Stream</span>
          </Link>

          <div className="relative my-10">
            {/* Avatar frame */}
            <div className="relative inline-block">
              <div className="size-40 lg:size-48 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden grid place-items-center">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="Profile preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <User className="size-16 text-white/15" strokeWidth={1.25} />
                )}
              </div>

              {/* Upload / clear buttons */}
              <div className="absolute -bottom-3 -right-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="grid size-11 place-items-center rounded-full bg-lime-300 text-neutral-950 shadow-lg transition-colors hover:bg-lime-200"
                  aria-label="Upload photo"
                >
                  <Upload className="size-4" />
                </button>
                {preview && (
                  <button
                    type="button"
                    onClick={clearFile}
                    className="grid size-11 place-items-center rounded-full bg-neutral-900 border border-white/15 text-white/60 transition-colors hover:text-white"
                    aria-label="Remove photo"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
            </div>

            {/* Headline */}
            <h1 className="mt-10 text-5xl sm:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.85]">
              Show up
              <br />
              as
              <br />
              <span className="italic font-serif text-lime-300">yourself.</span>
            </h1>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/40">
              A photo and a short bio help partners find you faster. You can
              change all of this later.
            </p>
          </div>

          <div className="relative flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-lime-300 animate-pulse" />
              1,284 live now
            </span>
            <span>60+ languages</span>
          </div>
        </section>

        {/* ── Right · onboarding form ───────────── */}
        <section className="relative flex items-center px-8 py-12 lg:px-14 lg:py-16">
          <div className="w-full max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Set up · Step 01 / 01
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Tell us about you
            </h2>
            <p className="mt-2 text-sm text-white/40">
              We'll use this to match you with the right partners.
            </p>

            <form
              onSubmit={handleOnboard}
              className="mt-10 space-y-6"
              noValidate
            >
              <Field
                label="Full name"
                name="fullName"
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
                value={userDetails.fullName}
                onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
              />

              {/* Bio */}
              <div>
                <div className="flex items-baseline justify-between mb-2.5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Bio
                  </label>
                  <span className="font-mono text-[10px] text-white/20">
                    120 max
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 transition-colors focus-within:border-lime-300/50 focus-within:bg-white/[0.04]">
                  <textarea
                    name="bio"
                    rows={3}
                    maxLength={120}
                    placeholder="Tell partners what you're into…"
                    value={userDetails.bio}
                    onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                    className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                  />
                </div>
              </div>

              {/* Native language — combo box */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2.5">
                  Native language
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/2 px-4 py-3.5 transition-colors focus-within:border-lime-300/50 focus-within:bg-white/4">
                  <input
                    list="native-langs"
                    name="nativeLanguage"
                    value={userDetails.nativeLanguage}
                    onChange={(e) => setUserDetails({ ...userDetails, nativeLanguage: e.target.value })}
                    placeholder="Pick or type…"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                  />
                  <datalist id="native-langs">
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.name} />
                    ))}
                  </datalist>
                  {nativeLang && (
                    <Check className="size-4 shrink-0 text-lime-300" />
                  )}
                </div>
              </div>

              {/* Learning language — combo box */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2.5">
                  Learning language
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-lime-300/30 bg-lime-300/[0.03] px-4 py-3.5 transition-colors focus-within:border-lime-300/70 focus-within:bg-lime-300/[0.06]">
                  <input
                    list="learning-langs"
                    name="learningLanguage"
                    value={userDetails.learningLanguage}
                    onChange={(e) => setUserDetails({ ...userDetails, learningLanguage: e.target.value })}
                    placeholder="Pick or type…"
                    className="w-full bg-transparent text-sm font-medium text-lime-300 outline-none placeholder:text-lime-300/30"
                  />
                  <datalist id="learning-langs">
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.name} />
                    ))}
                  </datalist>
                  {learningLang && (
                    <Check className="size-4 shrink-0 text-lime-300" />
                  )}
                </div>
              </div>

              <Field
                label="Location"
                name="location"
                type="text"
                value={userDetails.location}
                onChange={(e) => setUserDetails({ ...userDetails, location: e.target.value })}
                placeholder="City, Country"
                autoComplete="country-name"
              />

              <button
                type="submit"
                disabled={isPending}
                className="group mt-2 flex w-full items-center justify-between rounded-xl bg-lime-300 px-6 py-4 font-semibold text-neutral-950 transition-colors hover:bg-lime-200"
              >
                <span>{isPending ? "Completing..." : "Complete profile"}</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <p className="font-mono text-[10px] leading-relaxed text-white/25">
                You can edit everything later from your profile.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* bottom marquee */}
      <div className="relative border-t border-white/10">
        <Marquee reverse />
      </div>
    </div>
  );
}