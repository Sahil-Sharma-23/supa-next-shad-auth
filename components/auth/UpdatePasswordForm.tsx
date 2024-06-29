"use client";

import React, { useState } from "react";
import { updatePassword } from "@/server/actions/auth";
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
import { updatePasswordFormSchema, UpdatePasswordFormType } from "@/lib/schema";
import HookFormPasswordInput from "./HookFormPasswordInput";
import SubmitButton from "./SubmitButton";

export default function UpdatePasswordForm() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<UpdatePasswordFormType>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: UpdatePasswordFormType) {
    setIsFormLoading(true); // Set form state to loading
    const updatePasswordResponse: ServerActionReponse = await updatePassword(
      values
    );
    console.log("Sign up response: ", updatePasswordResponse); // DEBUG
    if (updatePasswordResponse.statusCode === 200) {
      router.replace("/");
    } else {
      setMessage(updatePasswordResponse.message);
    }
    setIsFormLoading(false);
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <HookFormPasswordInput form={form} />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <div className="flex-1 grid gap-2">
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          {message ? <p className="text-red-600">{message}</p> : null}

          <SubmitButton loading={isFormLoading} buttonTitle="Update Password" />
        </form>
      </Form>
    </>
  );
}
