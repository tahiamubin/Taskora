import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FaGem, FaMedal } from "react-icons/fa";
import {
  FiAlertTriangle,
  FiArrowDown,
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiEyeOff,
  FiFile,
  FiHeart,
  FiLock,
  FiMessageSquare,
  FiMinusCircle,
  FiShield,
  FiSlash,
  FiStar,
  FiUser,
  FiXCircle,
  FiZap,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Rules | CodeTrail",
  description:
    "Community rules, points, levels, moderation and privacy on CodeTrail.",
};

/* ----------------------------- Data ----------------------------- */

const sections: { id: string; label: string }[] = [
  { id: "community", label: "Community" },
  { id: "points", label: "Points" },
  { id: "levels", label: "Levels" },
  { id: "moderation", label: "Moderation" },
  { id: "help-board", label: "Help Board" },
  { id: "privacy", label: "Privacy" },
];

const communityRules: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <FiSlash className="h-5 w-5" />,
    title: "No fake achievements",
    desc: "Don't post fake solved problems, contest results, or achievements.",
  },
  {
    icon: <FiXCircle className="h-5 w-5" />,
    title: "No spam or advertising",
    desc: "Don't post unrelated links or promotional content.",
  },
  {
    icon: <FiHeart className="h-5 w-5" />,
    title: "Be respectful",
    desc: "No harassment, hate, or disrespect in answers or comments.",
  },
  {
    icon: <FiBookOpen className="h-5 w-5" />,
    title: "Respect copyright",
    desc: "Don't share copyrighted material or leaked contest problems and solutions during live contests.",
  },
  {
    icon: <FiShield className="h-5 w-5" />,
    title: "Don't abuse the system",
    desc: "No manipulation of points, votes, or multiple accounts.",
  },
];

const problemPoints: { label: string; pts: number }[] = [
  { label: "Easy problem", pts: 1 },
  { label: "Medium problem", pts: 3 },
  { label: "Hard problem", pts: 5 },
  { label: "First failed, then solved (bonus)", pts: 2 },
  { label: "Solution notes of 100+ characters", pts: 1 },
];

const activityPoints: { label: string; pts: number }[] = [
  { label: "Contest participation", pts: 5 },
  { label: "Accepted help answer", pts: 5 },
  { label: "Monthly goal completed", pts: 10 },
];

type Level = {
  name: string;
  min: number;
  gradient: string;
  text: string;
  glow: string;
  diamond?: boolean;
};

const levels: Level[] = [
  { name: "Bronze", min: 0, gradient: "from-amber-700 to-orange-400", text: "text-orange-300", glow: "rgba(251,146,60,0.35)" },
  { name: "Silver", min: 200, gradient: "from-slate-400 to-slate-200", text: "text-slate-200", glow: "rgba(203,213,225,0.3)" },
  { name: "Gold", min: 600, gradient: "from-yellow-500 to-amber-300", text: "text-yellow-300", glow: "rgba(250,204,21,0.35)" },
  { name: "Platinum", min: 1500, gradient: "from-cyan-400 to-sky-200", text: "text-cyan-200", glow: "rgba(103,232,249,0.35)" },
  { name: "Diamond", min: 3000, gradient: "from-blue-500 to-violet-400", text: "text-blue-300", glow: "rgba(96,165,250,0.45)", diamond: true },
];

const consequences: { icon: ReactNode; title: string; desc: string }[] = [
  { icon: <FiAlertTriangle className="h-6 w-6" />, title: "Warning", desc: "You are told what broke the rules." },
  { icon: <FiEyeOff className="h-6 w-6" />, title: "Content hidden or removed", desc: "The post is taken down." },
  { icon: <FiMinusCircle className="h-6 w-6" />, title: "Points revoked", desc: "Unfairly earned points are removed." },
  { icon: <FiLock className="h-6 w-6" />, title: "Account blocked", desc: "Access to the account is blocked." },
];

const helpBoardRules: string[] = [
  "Explain what you tried.",
  "Include the problem link when relevant.",
  "Don't post spam.",
  "Don't share leaked contest solutions.",
  "Keep answers respectful.",
  "Don't manipulate upvotes.",
];

const privacyRules: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <FiLock className="h-5 w-5" />,
    title: "Private by default",
    desc: "Your problems and attachments are private unless you decide otherwise.",
  },
  {
    icon: <FiUser className="h-5 w-5" />,
    title: "Limited public info",
    desc: "Other users only see your public profile and leaderboard information.",
  },
  {
    icon: <FiFile className="h-5 w-5" />,
    title: "Owner-only attachments",
    desc: "Attachments can only be accessed by the person who uploaded them.",
  },
];

/* --------------------------- Local components --------------------------- */

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

const Section = ({ id, eyebrow, title, intro, children }: SectionProps) => (
  <section id={id} className="scroll-mt-28">
    <div className="mb-8">
      <p className="font-mono text-xs text-white/40">
        <span className="text-blue-500">//</span> {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">
          {intro}
        </p>
      )}
    </div>
    {children}
  </section>
);

const Card = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`relative overflow-hidden rounded-[36px] border-2 border-white/10 bg-[#111111] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-8 ${className}`}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-400/10 to-transparent" />
    <div className="pointer-events-none absolute -left-16 top-1/3 h-40 w-32 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
    <div className="relative">{children}</div>
  </div>
);

const IconBubble = ({ children }: { children: ReactNode }) => (
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-blue-500">
    {children}
  </div>
);

const PointRow = ({ label, pts }: { label: string; pts: number }) => (
  <li className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/50 px-4 py-3">
    <span className="text-sm text-white/70">{label}</span>
    <span className="shrink-0 rounded-full bg-blue-500/15 px-3 py-1 font-mono text-sm text-blue-300">
      +{pts}
    </span>
  </li>
);

/* ------------------------------- Page ------------------------------- */

export default function RulesPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[#070707] px-4 pb-24 pt-16 sm:px-8 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-[40%] h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiShield className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">$</span> cat rules.md
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-medium tracking-tight text-white sm:text-6xl">
            Community{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              rules
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            A few simple rules keep CodeTrail fair, helpful and safe for every
            student.
          </p>

          <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 transition-all duration-300 hover:bg-white/[0.1] hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="mt-20 space-y-24">
          {/* 1. Community rules */}
          <Section
            id="community"
            eyebrow="community rules"
            title="The core rules"
            intro="Follow these everywhere on CodeTrail."
          >
            <Card>
              <ul className="divide-y divide-white/5">
                {communityRules.map((r, i) => (
                  <li
                    key={r.title}
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <IconBubble>{r.icon}</IconBubble>
                    <div>
                      <p className="text-base font-medium text-white">
                        <span className="mr-2 font-mono text-sm text-white/30">
                          0{i + 1}
                        </span>
                        {r.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">
                        {r.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </Section>

          {/* 2. Points */}
          <Section
            id="points"
            eyebrow="points rules"
            title="How points work"
            intro="Earn points for real progress and real help."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <div className="mb-5 flex items-center gap-3">
                  <IconBubble>
                    <FiZap className="h-5 w-5" />
                  </IconBubble>
                  <h3 className="text-lg font-medium text-white">Problems</h3>
                </div>
                <ul className="space-y-2">
                  {problemPoints.map((p) => (
                    <PointRow key={p.label} {...p} />
                  ))}
                </ul>
              </Card>

              <Card>
                <div className="mb-5 flex items-center gap-3">
                  <IconBubble>
                    <FiStar className="h-5 w-5" />
                  </IconBubble>
                  <h3 className="text-lg font-medium text-white">
                    Contests &amp; community
                  </h3>
                </div>
                <ul className="space-y-2">
                  {activityPoints.map((p) => (
                    <PointRow key={p.label} {...p} />
                  ))}
                </ul>
              </Card>
            </div>
          </Section>

          {/* 3. Levels */}
          <Section
            id="levels"
            eyebrow="level system"
            title="From Bronze to Diamond"
            intro="Your total points decide your level."
          >
            <Card>
              <div className="mx-auto flex max-w-sm flex-col items-center">
                {levels.map((l, i) => {
                  const Icon = l.diamond ? FaGem : FaMedal;
                  return (
                    <div key={l.name} className="flex w-full flex-col items-center">
                      <div className="flex w-full items-center gap-4 rounded-3xl border border-white/5 bg-black/50 p-4">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${l.gradient}`}
                          style={{ boxShadow: `0 0 30px ${l.glow}` }}
                        >
                          <Icon className="h-6 w-6 text-black/70" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-base font-semibold ${l.text}`}>
                            {l.name}
                          </p>
                          <p className="font-mono text-xs text-white/40">
                            {l.min === 0
                              ? "starting level"
                              : `${l.min.toLocaleString("en-US")}+ points`}
                          </p>
                        </div>
                        <span className="font-mono text-lg text-white/70">
                          {l.min.toLocaleString("en-US")}
                        </span>
                      </div>
                      {i < levels.length - 1 && (
                        <FiArrowDown className="my-2 h-5 w-5 text-blue-500/60" />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </Section>

          {/* 4. Moderation */}
          <Section
            id="moderation"
            eyebrow="moderation & consequences"
            title="When rules are broken"
            intro="Depending on how serious the violation is, one or more of these can happen."
          >
            <div className="grid gap-4 md:grid-cols-4">
              {consequences.map((c, i) => (
                <div key={c.title} className="relative">
                  <div className="h-full rounded-[28px] border-2 border-white/10 bg-[#111111] p-6 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] text-blue-500">
                      {c.icon}
                    </div>
                    <p className="mt-5 font-mono text-xs text-white/30">
                      step 0{i + 1}
                    </p>
                    <p className="mt-1 text-base font-medium text-white">
                      {c.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {c.desc}
                    </p>
                  </div>
                  {i < consequences.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-blue-500 md:flex">
                      <FiArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* 5. Help board rules */}
          <Section
            id="help-board"
            eyebrow="help board rules"
            title="Asking and answering"
            intro="Good questions and respectful answers help everyone learn."
          >
            <Card>
              <div className="mb-5 flex items-center gap-3">
                <IconBubble>
                  <FiMessageSquare className="h-5 w-5" />
                </IconBubble>
                <h3 className="text-lg font-medium text-white">
                  Help Board checklist
                </h3>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {helpBoardRules.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/50 px-4 py-3 text-sm text-white/70"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                      <FiCheck className="h-3.5 w-3.5" />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </Section>

          {/* 6. Privacy */}
          <Section
            id="privacy"
            eyebrow="privacy rules"
            title="Your data stays yours"
            intro="Your work is private unless you choose to share it."
          >
            <div className="grid gap-6 md:grid-cols-3">
              {privacyRules.map((p) => (
                <Card key={p.title} className="!p-6">
                  <IconBubble>{p.icon}</IconBubble>
                  <p className="mt-5 text-base font-medium text-white">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    {p.desc}
                  </p>
                </Card>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}