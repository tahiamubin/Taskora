"use client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { useEffect, useState, type FormEvent } from "react";

import { FcGoogle } from "react-icons/fc";

type SignUpValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as SignUpValues;
    console.log(user);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Gradient accents */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1
              className={`mt-5 text-4xl font-bold uppercase leading-[1.1] tracking-tight text-white transition-all duration-700 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Create Account
            </h1>

            <p
              className={`mt-3 text-base font-medium text-white/60 transition-all duration-700 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Know what your team is working on
            </p>
          </div>

          {/* Form */}
          <div
            className={`rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-700 ease-out sm:p-8 ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Form onSubmit={onSubmit}>
              <Fieldset className="w-full">
                <Fieldset.Legend className="text-lg font-bold uppercase text-white">
                  Signup
                </Fieldset.Legend>

                <Description className="pt-2 pb-6 text-white/40">
                  Create your account
                </Description>

                <Fieldset.Group className="w-full space-y-5">
                  {/* Name */}
                  <TextField isRequired name="name" className="w-full">
                    <Label className="mb-2 text-sm font-medium text-white">
                      Name
                    </Label>

                    <Input
                      placeholder="John Doe"
                      className="h-12 w-full rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
                    />

                    <FieldError className="mt-1 text-sm text-red-400" />
                  </TextField>

                  {/* Email */}
                  <TextField
                    isRequired
                    name="email"
                    type="email"
                    className="w-full"
                  >
                    <Label className="mb-2 text-sm font-medium text-white">
                      Email
                    </Label>

                    <Input
                      placeholder="john@example.com"
                      className="h-12 w-full rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
                    />

                    <FieldError className="mt-1 text-sm text-red-400" />
                  </TextField>

                  {/* Password */}
                  <TextField
                    isRequired
                    name="password"
                    type="password"
                    className="w-full"
                  >
                    <Label className="mb-2 text-sm font-medium text-white">
                      Password
                    </Label>

                    <Input
                      placeholder="Password"
                      className="h-12 w-full rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/40"
                    />

                    <FieldError className="mt-1 text-sm text-red-400" />
                  </TextField>
                </Fieldset.Group>

                {/* Signup Button */}
                <Button
                  type="submit"
                  className="
                    mt-6
                    h-14
                    w-full
                    rounded-2xl
                    bg-white
                    font-bold
                    uppercase
                    tracking-wide
                    text-black
                    transition-all duration-300
                    hover:scale-[1.02]
                    hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
                    active:scale-95
                  "
                >
                  Signup
                </Button>

                {/* Divider + Google */}
                <div className="mt-5">
                  <div className="relative flex items-center gap-4 py-2">
                    <div className="flex-1 border-t border-white/10" />

                    <span className="text-xs font-medium uppercase tracking-wider text-white/30">
                      Or
                    </span>

                    <div className="flex-1 border-t border-white/10" />
                  </div>

                  <Button
                    type="button"
                    className="
                      mt-3
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-white
                      font-medium
                      text-black
                      transition-all duration-300
                      hover:scale-[1.02]
                      active:scale-95
                    "
                  >
                    <FcGoogle className="h-5 w-5" />
                    Sign Up with Google
                  </Button>
                </div>
              </Fieldset>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}