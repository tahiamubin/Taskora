import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const FinalCTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-[#111111] px-8 py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-slate-400/15 via-slate-500/5 to-transparent" />
          <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-56 rounded-full bg-blue-600/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-px top-[38%] h-[26%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          <div className="pointer-events-none absolute -right-px top-[38%] h-[26%] w-px bg-gradient-to-b from-transparent via-blue-500/70 to-transparent" />

          <div className="relative">
            <p className="font-mono text-sm text-white/40">
              <span className="text-blue-500">$</span> codetrail init
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/70" />
            </p>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
              Start building your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
                coding journey
              </span>{" "}
              today.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              Track your progress, join the community and level up with every
              line of code.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-95 sm:w-auto"
              >
                Get Started
                <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/signin"
                className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-medium text-white/80 transition-all duration-300 hover:bg-white/[0.1] hover:text-white sm:w-auto"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;