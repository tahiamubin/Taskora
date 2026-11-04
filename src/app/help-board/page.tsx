import { getHelp } from '@/src/lib/api/help';
import HelpCard from '@/src/components/HelpCard';
import type { Help } from '@/src/lib/types/help';

const HelpPage = async () => {
  const help: Help[] = await getHelp();
  console.log(help);

  return (
    <div className="relative min-h-screen bg-[#070707] p-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl animate-pulse [animation-duration:6s]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700 ease-out fill-mode-both">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/50 backdrop-blur-md mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            community support
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Help &amp; Debug{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              Log
            </span>
          </h1>
          <p className="text-sm text-white/50 mt-2 max-w-lg">
            Browse debugging problems shared by the community.
          </p>
        </div>

        {!help || help.length === 0 ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] backdrop-blur-xl p-12 text-center animate-in fade-in zoom-in-95 duration-700 ease-out delay-150 fill-mode-both">
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-2xl" />
            <p className="relative font-mono text-sm text-white/40">
              <span className="text-blue-500">$</span> no entries found
            </p>
            <p className="relative text-gray-400 text-sm mt-2">
              No help entries yet. Be the first to post one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {help.map((item, index) => (
              <div
                key={item._id}
                className="animate-in fade-in slide-in-from-bottom-6 duration-600 ease-out fill-mode-both transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <HelpCard help={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;