import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/server/actions/auth";
import { GoogleLogo } from "@/components/Icons";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
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
            <h1 className="text-5xl font-bold text-left">Hi there👋</h1>
            <p className="text-balance text-left text-muted-foreground">
              Enter your email and password to continue.
            </p>
          </div>
          <Button variant={"outline"} className="space-x-2">
            <GoogleLogo />
            <span>Continue with google</span>
          </Button>
          <Separator />
          <LoginForm />
          <div className="text-center text-sm">
            Already have an account?&nbsp;
            <Link
              href="/auth/signup"
              className="hover:text-muted-foreground duration-300 transition-all"
            >
              Sign up here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
