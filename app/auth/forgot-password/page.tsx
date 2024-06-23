import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordAction } from "@/server/actions/auth";
import { Separator } from "@/components/ui/separator";

export default function ForgotPasswordPage() {
  return (
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
              Reset your password
            </h1>
            <p className="text-balance text-left text-muted-foreground">
              Enter your email to continue.
            </p>
          </div>
          <Separator />
          <form action={resetPasswordAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
          <div className="text-center text-sm">
            Remember your password?&nbsp;
            <Link
              href="/auth/signup"
              className="hover:text-muted-foreground duration-300 transition-all"
            >
              Login here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
