"use client";

import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

import { authClient } from "../lib/auth-client";

type SessionData = ReturnType<typeof authClient.useSession>["data"];
type SessionUser = NonNullable<SessionData>["user"] & { role?: string };

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/help-board", label: "Help Board" },
  { href: "/rules", label: "Rules" },
];

const pillButton =
  "inline-flex h-10 items-center justify-center rounded-full bg-white/[0.08] px-6 text-sm font-medium text-white " +
  "transition-all duration-300 hover:bg-white/[0.14] active:scale-95";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user as SessionUser | undefined;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
  };

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const avatar = (size: "sm" | "md") => (
    <Avatar size={size} className="ring-2 ring-blue-500/30">
      <Avatar.Image
        referrerPolicy="no-referrer"
        alt={user?.name}
        src={user?.image ?? undefined}
      />
      <Avatar.Fallback className="bg-blue-500/20 text-blue-400">
        {user?.name?.charAt(0) || "U"}
      </Avatar.Fallback>
    </Avatar>
  );

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 ">
      <nav className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]/85 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Glows */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-slate-400/10 to-transparent" />
        <div className="pointer-events-none absolute -left-16 top-0 h-24 w-40 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-px top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

        <div className="relative flex h-16 items-center justify-between px-5 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white transition-all duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-400">
              <FaCode className="h-4 w-4" />
            </div>
            <p className="text-lg font-semibold tracking-tight text-white">
              CodeTrail
            </p>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/5 bg-black/50 p-1 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex h-9 items-center rounded-full px-5 text-sm font-medium transition-all duration-300 ${
                    isActive(href)
                      ? "bg-white/[0.1] text-white shadow-[inset_-1px_0_0_rgba(59,130,246,0.6)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side (desktop) */}
          {!user ? (
            <div className="hidden items-center gap-5 md:flex">
              <Link
                href="/signin"
                className="text-sm font-medium text-white/60 transition-colors duration-300 hover:text-white"
              >
                Log in
              </Link>
              <Link href="/signup" className={pillButton}>
                Sign up
              </Link>
            </div>
          ) : (
            <div className="hidden items-center md:flex">
              <Dropdown>
                <Dropdown.Trigger className="cursor-pointer rounded-full transition-transform duration-300 hover:scale-105">
                  {avatar("sm")}
                </Dropdown.Trigger>
                <Dropdown.Popover className="rounded-3xl border border-white/10 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="px-4 pb-2 pt-4">
                    <div className="flex items-center gap-3">
                      {avatar("md")}
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-white/40">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu
                    onAction={(key) => {
                      if (key === "logout") handleSignOut();
                    }}
                    className="p-2"
                  >
                    <Dropdown.Item
                      id="dashboard"
                      textValue="Dashboard"
                      className="rounded-full text-white/60 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
                    >
                      <Link
                        className="flex items-center gap-3"
                        href={`/dashboard/${user.role}`}
                      >
                        <MdDashboard className="h-5 w-5 text-blue-500" />
                        <Label className="font-medium">Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      className="rounded-full text-red-400 transition-all duration-300 hover:bg-red-500/10"
                    >
                      <div className="flex items-center gap-3">
                        <BiLogOut className="h-5 w-5" />
                        <Label className="font-medium">Logout</Label>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-white/70 transition-all duration-300 hover:bg-white/[0.14] hover:text-white md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="relative border-t border-white/10 md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex h-12 items-center rounded-full px-5 text-sm font-medium transition-all duration-300 ${
                      isActive(href)
                        ? "bg-white/[0.1] text-white shadow-[inset_-1px_0_0_rgba(59,130,246,0.6)]"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              <li className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-4">
                {!user ? (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex h-12 items-center rounded-full border border-white/5 bg-white/[0.03] px-5 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/[0.08] hover:text-white"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className={`${pillButton} h-12 w-full`}
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/dashboard/${user.role}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex h-12 items-center gap-3 rounded-full px-5 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/5 hover:text-white"
                    >
                      <MdDashboard className="h-5 w-5 text-blue-500" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex h-12 w-full items-center gap-3 rounded-full px-5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/10"
                    >
                      <BiLogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;