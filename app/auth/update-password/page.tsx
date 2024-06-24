import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordAction } from "@/server/actions/auth";
import { Separator } from "@/components/ui/separator";
import PasswordInput from "@/components/PasswordInput";
import SubmitButton from "@/components/SubmitButton";

export default function UpdatePasswordPage() {
  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-8 min-h-screen">
        <div className="hidden bg-muted lg:block col-span-3">
          <Image
            src="/light-pattern.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>

        <div className="flex items-center justify-center py-12 col-span-5">
          <div className="mx-auto grid max-w-lg w-full gap-6 px-4">
            <div className="grid gap-2 text-center">
              <h1 className="text-4xl font-bold text-left">
                Create new password
              </h1>
              <p className="text-balance text-left text-muted-foreground">
                Keep your password handy next time.
              </p>
            </div>
            <Separator />
            <form action={resetPasswordAction} className="grid gap-4">
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
              <SubmitButton title="Update Password" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
