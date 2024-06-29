import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Separator } from "@/components/ui/separator";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

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
              Reset Your Password 🔒
            </h1>
            <p className="text-balance text-left text-muted-foreground">
              🚀 Get Back on Track in No Time!
            </p>
          </div>
          <Separator />
          <ForgotPasswordForm />
          <div className="text-center text-sm">
            Remember your password?&nbsp;
            <Link
              href="/auth/login"
              className="hover:text-muted-foreground hover:underline duration-300 transition-all"
            >
              Login here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
