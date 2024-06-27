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
import { Button } from "../ui/button";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { ServerActionReponse } from "@/types";
import { updatePasswordFormSchema, UpdatePasswordFormType } from "@/lib/schema";

export default function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Password"
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

          <Button type="submit" disabled={isFormLoading}>
            {isFormLoading ? (
              <span className="flex gap-2">
                <LoaderCircle className="animate-spin" />
                <span>Update Password</span>
              </span>
            ) : (
              <span>Update Password</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
