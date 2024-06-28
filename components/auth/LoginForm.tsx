"use client";

import React, { useState } from "react";
import { loginAction } from "@/server/actions/auth";
import { useRouter } from "next13-progressbar";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ServerActionReponse } from "@/types";
import HookFormPasswordInput from "./HookFormPasswordInput";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormType) {
    setIsFormLoading(true); // Set form state to loading
    const signupResponse: ServerActionReponse = await loginAction(values);
    console.log("Sign up response: ", signupResponse); // DEBUG
    if (signupResponse.statusCode === 200) {
      router.replace("/");
    } else {
      setMessage(signupResponse.message);
    }
    setIsFormLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="flex-1 grid gap-2">
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <HookFormPasswordInput form={form} includeForgotPasswordLink />
          {message ? <p className="text-red-600">{message}</p> : null}
          <SubmitButton loading={isFormLoading} buttonTitle="Login" />
        </form>
      </Form>
    </>
  );
}
