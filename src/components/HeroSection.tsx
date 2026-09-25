"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Clock,
  MoreHorizontal,
  Search,
  LayoutDashboard,
  ListChecks,
  Users,
  Settings,
  Bell,
} from "lucide-react";

const columns = [
  {
    title: "To do",
    tasks: [
      { name: "Design onboarding flow", tag: "Design", due: "Fri", avatar: "MJ", color: "bg-violet-500" },
      { name: "Write API docs for v2", tag: "Docs", due: "Mon", avatar: "AS", color: "bg-blue-500" },
    ],
  },
  {
    title: "In progress",
    tasks: [
      { name: "Rebuild notifications service", tag: "Backend", due: "Today", avatar: "RK", color: "bg-orange-500" },
      { name: "QA pass on billing", tag: "QA", due: "Tomorrow", avatar: "TL", color: "bg-emerald-500" },
      { name: "Landing page copy", tag: "Marketing", due: "Wed", avatar: "MJ", color: "bg-violet-500" },
    ],
  },
  {
    title: "Done",
    tasks: [
      { name: "Set up CI pipeline", tag: "DevOps", due: "Done", avatar: "AS", color: "bg-blue-500" },
      { name: "User interviews round 2", tag: "Research", due: "Done", avatar: "RK", color: "bg-orange-500" },
    ],
  },
];

const activity = [
  { who: "Riya K.", what: "moved Billing QA to In progress", time: "2m ago" },
  { who: "Alex S.", what: "commented on API docs v2", time: "18m ago" },
  { who: "Maya J.", what: "completed User interviews round 2", time: "1h ago" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-black text-white pt-36 pb-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]"
        >
          Know what your team is working on.
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto"
        >
          Assign tasks, track progress, manage deadlines, and understand project
          activity — all from one workspace.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black
                       text-sm font-medium hover:bg-gray-200 transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
          >
            Get started
            <span aria-hidden="true">→</span>
          </Link>
          
        </motion.div>
      </div>

      {/* ============ DASHBOARD PREVIEW ============ */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto mt-20"
      >
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0d0d0d]">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="ml-4 text-xs text-gray-500">app.taskora.com/projects/redesign</span>
          </div>

          <div className="flex text-left">
            {/* Sidebar */}
            <div className="hidden md:flex w-52 shrink-0 flex-col gap-1 border-r border-white/10 p-4">
              <div className="text-sm font-semibold text-white mb-4">Taskora</div>
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: ListChecks, label: "Tasks", active: false },
                { icon: Users, label: "Team", active: false },
                { icon: Settings, label: "Settings", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm ${
                    item.active ? "bg-white/10 text-white" : "text-gray-400"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <div>
                  <div className="text-sm font-semibold text-white">Product Redesign</div>
                  <div className="text-xs text-gray-500">8 members · 12 tasks</div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/10 text-xs text-gray-400">
                    <Search className="w-3.5 h-3.5" />
                    Search
                  </div>
                  <Bell className="w-4 h-4 text-gray-500" />
                  <div className="flex -space-x-2">
                    {["MJ", "AS", "RK"].map((initials) => (
                      <div
                        key={initials}
                        className="w-6 h-6 rounded-full bg-white/10 border border-black text-[10px]
                                   flex items-center justify-center text-gray-300"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Board + activity */}
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
                  {columns.map((col) => (
                    <div key={col.title} className="min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-gray-400">
                          {col.title} · {col.tasks.length}
                        </span>
                        <MoreHorizontal className="w-3.5 h-3.5 text-gray-600" />
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {col.tasks.map((task) => (
                          <div
                            key={task.name}
                            className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs text-gray-200 leading-snug">{task.name}</span>
                              {col.title === "Done" ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400">
                                {task.tag}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-[10px] text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  {task.due}
                                </span>
                                <div
                                  className={`w-5 h-5 rounded-full ${task.color} text-[9px] text-white
                                              flex items-center justify-center`}
                                >
                                  {task.avatar}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity feed */}
                <div className="hidden lg:block w-64 shrink-0 border-l border-white/10 p-5">
                  <div className="text-xs font-medium text-gray-400 mb-3">Recent activity</div>
                  <div className="flex flex-col gap-4">
                    {activity.map((item) => (
                      <div key={item.what} className="text-xs">
                        <span className="text-gray-200">{item.who}</span>{" "}
                        <span className="text-gray-500">{item.what}</span>
                        <div className="text-[10px] text-gray-600 mt-0.5">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}