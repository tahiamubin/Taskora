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
      <div className="flex min-h-screen items-center justify-center bg-[#070707] p-6">
        <div className="rounded-3xl border border-white/10 bg-[#111111]/80 p-10 text-center backdrop-blur-xl">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-white/40">
            // error
          </p>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Entry not found
          </h2>
          <p className="mb-4 text-sm text-white/50">
            This help entry may have been deleted or never existed.
          </p>
          <Link
            href="/help-board"
            className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
          >
            Back to Help Board
          </Link>
        </div>
      </div>
    );
  }

  return <HelpDetails help={item} />;
};

export default HelpDetailsPage;