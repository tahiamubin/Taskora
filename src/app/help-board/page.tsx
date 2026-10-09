import { getHelp } from '@/src/lib/api/help';
import HelpCard from '@/src/components/HelpCard';
import type { Help } from '@/src/lib/types/help';

const HelpPage = async () => {
  const help: Help[] = await getHelp();
  //console.log(help);

  return (
    <div className="min-h-screen bg-[#070707] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Help &amp; Debug Log</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse debugging problems shared by the community.
          </p>
        </div>

        {!help || help.length === 0 ? (
          <div className="bg-[#111111] border border-white/10 rounded-xl p-10 text-center">
            <p className="text-gray-400 text-sm">
              No help entries yet. Be the first to post one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {help.map((item) => (
              <HelpCard key={item._id} help={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;