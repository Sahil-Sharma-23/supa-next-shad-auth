"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { SignupFormSchema, SignupFormType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { signUpAction } from "@/server/actions/auth";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormType) {
    setIsFormLoading(true); // Set form state to loading

    const signupResponse = await signUpAction(values);
    console.log("Sign up response: ", signupResponse); // DEBUG
    setIsFormLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="flex w-full gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <div className="flex-1 grid gap-2">
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <div className="flex-1 grid gap-2">
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={`${showPassword ? "text" : "password"}`}
                      {...field}
                    />
                    <span className="absolute top-0 right-1">
                      {showPassword ? (
                        <Button
                          type="button"
                          size={"icon"}
                          variant={"ghost"}
                          className="rounded-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Eye className="opacity-80" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          size={"icon"}
                          variant={"ghost"}
                          className="rounded-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <EyeOff className="opacity-80" />
                        </Button>
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isFormLoading}>
            {isFormLoading ? (
              <span className="flex gap-2">
                <LoaderCircle className="animate-spin" />
                <span>Getting Started...</span>
              </span>
            ) : (
              <span>Get Started</span>
            )}
          </Button>
        </form>
      </Form>

      {/* <form action={onSubmit} className="grid gap-4">
        <div className="flex w-full gap-2">
          <div className="flex-1 grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Jane"
              required
            />
          </div>
          <div className="flex-1 grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        <SubmitButton title="Sign Up" />
      </form> */}
    </>
  );
}
