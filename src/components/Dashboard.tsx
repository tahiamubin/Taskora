"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import type { IconType } from "react-icons";
import { FaCode } from "react-icons/fa";
import {
  FiAward,
  FiBarChart2,
  FiBell,
  FiBookOpen,
  FiCode,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiShield,
  FiSliders,
  FiUsers,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { authClient } from "@/src/lib/auth-client";



type Role = "student" | "admin";

type NavLink = {
  icon: IconType;
  label: string;
  href: string;
};

type SessionData = ReturnType<typeof authClient.useSession>["data"];
type SessionUser = NonNullable<SessionData>["user"] & { role?: string };



// Student navigation links
const studentNavLinks: NavLink[] = [
  { icon: FiGrid, label: "Overview", href: "/dashboard/student" },
  { icon: FiCode, label: "Problem Log", href: "/dashboard/student/problems" },
  { icon: FiBookOpen, label: "Interview Prep", href: "/dashboard/student/interview-prep" },
  { icon: FiAward, label: "Contest Points", href: "/dashboard/student/contests" },
  { icon: FiBarChart2, label: "Leaderboard", href: "/dashboard/student/leaderboard" },
  { icon: FiHelpCircle, label: "Ask for Help", href: "/dashboard/student/help" },
];



const adminNavLinks: NavLink[] = [
  { icon: FiGrid, label: "Overview", href: "/dashboard/admin" },
  { icon: FiUsers, label: "User Management", href: "/dashboard/admin/users" },
  { icon: FiShield, label: "Moderation", href: "/dashboard/admin/moderation" },
  { icon: FiSliders, label: "Points & Contests", href: "/dashboard/admin/points-contests" },
  { icon: FiMessageSquare, label: "Communication", href: "/dashboard/admin/communication" },
];

// Map roles to their respective nav links
const navLinksMap: Record<Role, NavLink[]> = {
  student: studentNavLinks,
  admin: adminNavLinks,
};


function isLinkActive(
  pathname: string,
  href: string,
  overviewHref: string,
): boolean {
  if (href === overviewHref) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}


function Brand({ subtitle }: { subtitle: string }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white">
        <FaCode className="h-4 w-4" />
      </div>
      <div>
        <p className="text-base font-semibold tracking-tight text-white">
          CodeTrail
        </p>
        <p className="font-mono text-[10px] text-blue-400">{subtitle}</p>
      </div>
    </Link>
  );
}


type NavListProps = {
  role: Role;
  onNavigate?: () => void;
};


function NavList({ role, onNavigate }: NavListProps) {
  const pathname = usePathname();

  const navItems = navLinksMap[role];
  const overviewHref = `/dashboard/${role}`;

  return (
    <nav className="flex flex-col gap-1 p-3">
      {/* Role Badge */}
      <div className="mb-3 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
        <HiSparkles className="h-3 w-3 text-blue-400" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
          {role} dashboard
        </span>
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = isLinkActive(pathname, item.href, overviewHref);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            // CHANGED: added `group` — the original icon used `group-hover`
            // but the link never had the `group` class, so it did nothing.
            className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-all duration-300 ease-out ${
              isActive
                ? "bg-white/[0.1] text-white shadow-[inset_-1px_0_0_rgba(59,130,246,0.6)]"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon
              className={`size-5 transition-all duration-300 ${
                isActive
                  ? "scale-110 text-blue-400"
                  : "text-white/40 group-hover:text-white"
              }`}
            />
            <span className="font-medium">{item.label}</span>
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}


function UserCard({ user, onNavigate }: { user?: SessionUser; onNavigate?: () => void }) {
  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
    onNavigate?.();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mt-auto space-y-2 border-t border-white/10 p-3">
      <div className="flex items-center gap-3 rounded-3xl border border-white/5 bg-black/50 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-300">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {user?.name ?? "Loading..."}
          </p>
          <p className="truncate text-xs text-white/40">{user?.email}</p>
        </div>
      </div>

      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
      >
        <FiHome className="size-5 text-white/40" />
        <span className="font-medium">Back to site</span>
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm text-red-400 transition-all duration-300 hover:bg-red-500/10"
      >
        <FiLogOut className="size-5" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

type DashboardProps = {
  children: ReactNode;
};

// Main Dashboard Component
export function Dashboard({ children }: DashboardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;

  const roleFromPath: Role = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : "student";
  const role: Role = isPending
    ? roleFromPath
    : user?.role === "admin"
      ? "admin"
      : "student";

  return (
    <div className="flex h-screen bg-[#070707]">
      {/* lg+: persistent sidebar, no button */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#0c0c0c] lg:flex">
        <div className="border-b border-white/10 px-4 py-4">
          <Brand subtitle="// dashboard" />
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavList role={role} />
        </div>
        <UserCard user={user} />
      </aside>

      {/* sm/md: topbar with menu button + drawer */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0c0c0c] px-4 py-3 lg:hidden">
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              onPress={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-full text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <FiMenu className="size-5" />
            </Button>
            <span className="text-sm font-semibold tracking-tight text-white">
              CodeTrail
            </span>
          </div>
      
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label="Notifications"
            className="rounded-full text-white/60 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white"
          >
            <FiBell className="size-4" />
          </Button>
        </header>


        <Drawer
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          placement="left"
          className="lg:hidden"
          classNames={{
            backdrop: "bg-black/80 backdrop-blur-sm",
            base: "bg-[#0c0c0c] border-r border-white/10",
          }}
        >
          <Drawer.Content className="bg-[#0c0c0c]">
            <Drawer.Header className="border-b border-white/10">
              <Brand subtitle="// navigation" />
            </Drawer.Header>
            <Drawer.Body className="flex flex-col p-0">
              <NavList role={role} onNavigate={() => setIsOpen(false)} />
              <UserCard user={user} onNavigate={() => setIsOpen(false)} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>

        {/* Main content */}
        {/* CHANGED: background now uses the site's dark base plus a soft blue
            glow in the corner instead of the black → zinc gradient. */}
        <main className="flex-1 overflow-auto bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_50%)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;