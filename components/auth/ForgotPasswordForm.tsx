"use client";

import React, { useState } from "react";
import { forgotPasswordAction } from "@/server/actions/auth";
import { forgotPasswordFormSchema, ForgotPasswordFormType } from "@/lib/schema";
import { useRouter } from "next13-progressbar";
import { useForm } from "react-hook-form";
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
import SubmitButton from "./SubmitButton";

export default function ForgotPasswordForm() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormType) {
    setIsFormLoading(true); // Set form state to loading
    const forgotPasswordResponse: ServerActionReponse =
      await forgotPasswordAction(values);
    console.log("Forgot password response: ", forgotPasswordResponse); // DEBUG
    if (forgotPasswordResponse.statusCode === 200) {
      router.replace("/");
    } else {
      setMessage(forgotPasswordResponse.message);
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          {message ? <p className="text-red-600">{message}</p> : null}

          <SubmitButton loading={isFormLoading} buttonTitle="Send Reset Link" />
        </form>
      </Form>
    </>
  );
}
