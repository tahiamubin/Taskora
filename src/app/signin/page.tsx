"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

type SignInValues = {
  email: string;
  password: string;
}

const socialProviders = [
  { name: "Facebook", icon: FaFacebookF },
  { name: "Google", icon: FaGoogle },
  { name: "Apple", icon: FaApple },
] as const;

const inputClass =
  "h-14 w-full rounded-full border border-blue-500/30 bg-[#0e0f12] pl-12 pr-12 text-base text-white " +
  "placeholder:text-white/40 outline-none transition-colors " +
  "hover:border-blue-500/50 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20";

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as unknown as SignInValues;

    setLoading(true);
    try {
      // Better Auth client call goes here, for example:
      // await authClient.signIn.email({ email: values.email, password: values.password });
      console.log(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#141414] to-transparent" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16">
        <div
          className={`relative w-full max-w-[520px] overflow-hidden rounded-[2.75rem] border border-white/10 bg-gradient-to-b from-[#2b2e35] via-[#17181b] to-[#101010] px-6 pb-12 pt-16 shadow-2xl transition-all duration-700 ease-out sm:px-10 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="pointer-events-none absolute -left-28 top-1/3 h-80 w-52 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-1/3 h-72 w-40 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 -top-24 h-56 w-[90%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h1 className="text-center text-5xl font-medium tracking-tight text-white">
              Log in
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-center text-base leading-relaxed text-white/60">
              Log in to your account and continue tracking your problems,
              contests, and progress where you left off.
            </p>

            <Form onSubmit={onSubmit} className="mt-12 w-full space-y-4">
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="sr-only">Email</Label>
                <div className="relative">
                  <FiMail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-white/40"
                  />
                  <Input
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <FieldError className="mt-1 pl-5 text-sm text-red-400" />
              </TextField>

              <TextField
                isRequired
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full"
              >
                <Label className="sr-only">Password</Label>
                <div className="relative">
                  <FiLock
                    aria-hidden="true"
                    className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-white/40"
                  />
                  <Input
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-blue-500 transition-colors hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-full"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <FieldError className="mt-1 pl-5 text-sm text-red-400" />
              </TextField>

              <Button
                type="submit"
                isDisabled={loading}
                className="mt-6 h-16 w-full rounded-full bg-[#1f2126] text-xl font-medium text-white transition-all duration-200 hover:bg-[#282b32] active:scale-[0.98]"
              >
                {loading ? "Logging in…" : "Log in"}
              </Button>
            </Form>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {socialProviders.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  type="button"
                  className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/5 bg-[#151619] text-sm text-white/60 transition-colors hover:bg-[#1c1d21] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  <Icon aria-hidden="true" className="text-base" />
                  <span className="hidden sm:inline">{name}</span>
                  <span className="sr-only sm:hidden">{name}</span>
                </button>
              ))}
            </div>

            <p className="mt-7 text-center text-sm text-white/60">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 underline underline-offset-4 hover:text-blue-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}