"use client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";

import { useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
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

                  {/* Role */}
                  <Select isRequired name="role" placeholder="Select one">
                    <Label className="mb-2 text-sm font-medium text-white">
                      Signup As
                    </Label>

                    <Select.Trigger
                      className="
                        h-12 w-full
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                        px-4
                        text-white
                        transition-all duration-200
                        hover:border-white/20
                        hover:bg-white/10
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white/10
                        data-[focused]:border-white/30
                      "
                    >
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover
                      className="
                        mt-2
                        min-w-[200px]
                        overflow-hidden
                        rounded-xl
                        border border-white/10
                        bg-black/95
                        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                        backdrop-blur-xl
                      "
                    >
                      <ListBox className="p-1.5">
                        <ListBox.Item
                          id="manager"
                          textValue="manager"
                          className="
                            flex cursor-pointer items-center
                            rounded-lg
                            px-3 py-2.5
                            text-sm text-white
                            transition-colors duration-150
                            hover:bg-white/10
                            focus:bg-white/10
                            data-[selected]:bg-white/10
                            data-[selected]:text-white
                          "
                        >
                          Admin
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item
                          id="employee"
                          textValue="employee"
                          className="
                            flex cursor-pointer items-center
                            rounded-lg
                            px-3 py-2.5
                            text-sm text-white
                            transition-colors duration-150
                            hover:bg-white/10
                            focus:bg-white/10
                            data-[selected]:bg-white/10
                            data-[selected]:text-white
                          "
                        >
                          Employee
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
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