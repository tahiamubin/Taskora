"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  // Single scroll source of truth — drives both the progress bar and the
  // "scrolled" backdrop state, instead of a spring plus a separate listener.
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Close the mobile menu on navigation, and lock body scroll while it's open.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 bg-black text-white transition-all duration-300 ${
        scrolled ? "py-3 backdrop-blur-md bg-black/80 border-b border-white/10" : "py-5"
      }`}
    >
      {/* Scroll progress — the one persistent motion element, and it's
          meaningful (tells the reader how far down the page they are). */}
      

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* ============ LOGO / BRAND ============ */}
        <Link href="/" className="relative group inline-block">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Taskora
          </span>
          <span
            className="absolute inset-0 -z-10 blur-xl bg-white/0 group-hover:bg-white/20
                       transition-colors duration-300"
          />
        </Link>

        {/* ============ DESKTOP LINKS ============ */}
        <ul
          className="hidden md:flex items-center gap-2 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = hovered === link.name;

            return (
              <li key={link.name} onMouseEnter={() => setHovered(link.name)} className="relative">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="relative block px-4 py-2 text-sm tracking-wide rounded-full
                             focus-visible:outline focus-visible:outline-2
                             focus-visible:outline-white/60"
                >
                  {/* Hover pill — the single orchestrated interaction moment */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        layoutId="navHover"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  <span
                    className={`relative z-10 inline-block ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* Underline: reacts to active/hover state, no idle animation */}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[1.5px] overflow-hidden rounded-full">
                    <motion.span
                      className="absolute inset-0 bg-white"
                      initial={false}
                      animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originX: 0 }}
                    />
                  </span>
                </Link>
              </li>
            );
          })}

          {/* ============ CTA BUTTON ============ */}
          <li className="ml-2">
            <Link
              href="/contact"
              className="relative inline-block px-5 py-2 rounded-full text-sm tracking-wide
                         border border-white/20 overflow-hidden group
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
            >
              <span
                className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0
                           transition-transform duration-300"
              />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Get started
              </span>
            </Link>
          </li>
        </ul>

        {/* ============ MOBILE MENU BUTTON ============ */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 rounded"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-white origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            className="block w-6 h-[2px] bg-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-white origin-center"
          />
        </button>
      </div>

      {/* ============ MOBILE MENU ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className="relative block text-lg tracking-wide py-3"
                    >
                      <span className={isActive ? "text-white" : "text-gray-300"}>
                        {link.name}
                      </span>
                      {isActive && (
                        <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-12 bg-white" />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="mt-3">
                <Link
                  href="/contact"
                  className="block w-full text-center px-5 py-3 rounded-full text-sm tracking-wide
                             border border-white/20 hover:bg-white hover:text-black transition-colors"
                >
                  Get started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}