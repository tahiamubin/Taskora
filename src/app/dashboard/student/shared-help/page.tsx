// student -- shared help

import { getHelpById } from "@/src/lib/api/help";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

import type { Help } from "@/src/lib/types/help";
import MyHelpCard from "@/src/components/MyHelpCard";

interface HelpWithUser extends Help {
  userId: string;
}

const MyHelpPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;

  const userHelp: HelpWithUser[] = await getHelpById(userId as string);

  return (
    <div className=" px-4 py-10 sm:px-6">
      <div className=" flex w-full flex-col gap-6">
        {/* Page header */}
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
            // my help
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Your Shared Help
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Problems you have posted to the community board.
          </p>
        </div>

        {/* List */}
        {!userHelp || userHelp.length === 0 ? (
          <div className="w-full rounded-2xl  p-8 text-center shadow-xl">
            <p className="font-mono text-xs text-white/40">
              no help posted yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userHelp.map((item) => (
              <MyHelpCard key={item._id} help={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHelpPage;
