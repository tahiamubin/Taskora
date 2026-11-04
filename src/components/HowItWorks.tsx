"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiBookOpen,
  FiTerminal,
  FiTrendingUp,
} from "react-icons/fi";

type Step = {
  num: string;
  label: string;
  title: string;
  icon: ReactNode;
};

const steps: Step[] = [
  {
    num: "01",
    label: "Track",
    title: "Log your coding activity",
    icon: <FiActivity className="h-6 w-6" />,
  },
  {
    num: "02",
    label: "Practice",
    title: "Prepare for interviews",
    icon: <FiBookOpen className="h-6 w-6" />,
  },
  {
    num: "03",
    label: "Improve",
    title: "Monitor your growth",
    icon: <FiTrendingUp className="h-6 w-6" />,
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60"
          >
            <FiTerminal className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> how it works
            </span>
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            className="mt-6 text-3xl font-medium tracking-tight text-white sm:text-5xl"
          >
            How CodeTrail{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              works
            </span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Three simple steps. Start in minutes.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className="relative"
            >
              <div className="relative h-full overflow-hidden rounded-[36px] border-2 border-white/10 bg-[#111111] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-400/10 to-transparent" />
                <div className="pointer-events-none absolute -left-16 top-1/3 h-40 w-32 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.08] text-blue-500">
                      {s.icon}
                    </div>
                    <span className="font-mono text-4xl font-semibold text-white/10">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-medium tracking-tight text-white">
                    {s.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {s.title}
                  </p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                  className="absolute -right-6 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-blue-500 md:flex"
                >
                  <FiArrowRight className="h-5 w-5" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;