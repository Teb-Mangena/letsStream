import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { GREETINGS } from "../constants/styles";
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

function Field({ label, trailing, ...props }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2.5">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/2 px-4 py-3.5 transition-colors focus-within:border-lime-300/50 focus-within:bg-white/4">
        <input
          {...props}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20"
        />
        {trailing}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const [showPw, setShowPw] = useState(false);
  const { signupMutation } = useAuth();
  const { mutate: registerUser, isPending } = signupMutation;
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  function handleSignup(e) {
    e.preventDefault();

    registerUser(registerForm);
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col overflow-hidden">
      {/* keyframes */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)]" />

      {/* top marquee */}
      <div className="relative border-b border-white/10">
        <Marquee />
      </div>

      {/* main */}
      <main className="relative flex-1 grid lg:grid-cols-2">
        {/* ── Left · editorial ─────────────────── */}
        <section className="relative flex flex-col justify-between border-b border-white/10 lg:border-b-0 lg:border-r px-8 py-12 lg:px-14 lg:py-16">
          {/* lime glow */}
          <div className="pointer-events-none absolute -left-20 top-1/3 size-80 rounded-full bg-lime-300/10 blur-3xl" />

          <Link
            to="/"
            className="relative text-xl font-black tracking-tighter"
          >
            lets<span className="text-lime-300">Stream</span>
          </Link>

          <div className="relative my-12">
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85]">
              Learn a
              <br />
              language
              <br />
              <span className="italic font-serif text-lime-300">live.</span>
            </h1>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/40">
              Get paired with native speakers in under a minute. Talk, swap,
              and level up — together.
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

        {/* ── Right · form ─────────────────────── */}
        <section className="relative flex items-center px-8 py-12 lg:px-14 lg:py-16">
          <div className="w-full max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Sign up
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-white/40">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-lime-300 hover:underline font-medium"
              >
                Log in
              </Link>
            </p>

            <form
              onSubmit={handleSignup}
              className="mt-10 space-y-6"
              noValidate
            >
              <Field
                label="Full name"
                name="fullName"
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
                value={registerForm.fullName}
                onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
              <Field
                label="Password"
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="grid size-6 place-items-center text-white/30 hover:text-white transition-colors"
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                }
              />

              <button
                type="submit"
                disabled={isPending}
                className="group mt-2 flex w-full items-center justify-between rounded-xl bg-lime-300 px-6 py-4 font-semibold text-neutral-950 transition-colors hover:bg-lime-200"
              >
                <span>{isPending ? "Registering..." : "Create account"}</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <p className="font-mono text-[10px] leading-relaxed text-white/25">
                By continuing you agree to our terms & privacy policy.
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