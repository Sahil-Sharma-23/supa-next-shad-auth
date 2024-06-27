import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegistrationEmailSentPage() {
  return (
    <div className="container min-h-screen w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/email.svg"
          alt="Image"
          width="1080"
          height="721"
          className="h-full max-w-xs object-cover dark:brightness-[0.7]"
        />

        <div className="text-center space-y-3 mb-6">
          <h1 className="text-3xl font-bold">
            📧✨ Verification Email Sent! ✨📧
          </h1>
          <p className="text-muted-foreground">
            Click the link we sent to your inbox and verify your email address
            now!
          </p>
          <p className="text-muted-foreground">💌 Let's get you started! 💌</p>
        </div>

        <Link href={"/"}>
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}
