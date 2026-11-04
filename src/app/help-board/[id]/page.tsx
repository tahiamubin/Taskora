import { getHelp } from "@/src/lib/api/help";
import HelpDetails from "@/src/components/HelpDetails";
import Link from "next/link";
import type { Help } from "@/src/lib/types/help";

interface PageProps {
  params: Promise<{ id: string }>;
}

const HelpDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const help: Help[] = await getHelp();
  const item = help?.find((h) => h._id === id);

  if (!item) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] p-6">
        {/* Dynamic Grid Background (Vercel style) */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        
        {/* Deep Red Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px] animate-pulse [animation-duration:5s]" />

        {/* Modern Card Shell */}
        <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A0A0A]/80 p-10 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500 ease-out fill-mode-both">
          
          {/* Top Highlight Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          
          {/* Inner subtle glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-red-500/5 to-transparent" />

          <div className="relative flex flex-col items-center">
            {/* The "Terminal Error" Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-[#111] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_30px_rgba(239,68,68,0.15)]">
              <span className="font-mono text-2xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                ERR
              </span>
            </div>

            {/* Typography */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              404 Not Found
            </div>
            
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Entry not found
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              This help entry may have been deleted, moved, or never existed in the database.
            </p>

            {/* Action Button */}
            <Link
              href="/help-board"
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200 active:scale-[0.98]"
            >
              <svg 
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Help Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <HelpDetails help={item} />;
};

export default HelpDetailsPage;