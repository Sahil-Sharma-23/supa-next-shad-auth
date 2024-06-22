"use client";

import React, { useActionState } from "react";
import { signupAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction);

  return (
    <>
      <form action={action}>
        <Input name="firstName" placeholder="Jane" />
        {state?.errors.firstName && <p>{state.errors.firstName}</p>}
        <Input name="lastName" placeholder="Doe" />
        {state?.errors.lastName && <p>{state.errors.lastName}</p>}
        <Input name="email" placeholder="you@example.com" />
        {state?.errors.email && <p>{state.errors.email}</p>}
        <Input name="password" placeholder="*********" />
        {state?.errors.password && <p>{state.errors.password}</p>}

        <Button disabled={pending}>
          {pending ? (
            <>
              Sign Up
              <LoaderCircle className="animate-spin" />
            </>
          ) : (
            <>Sign Up</>
          )}
        </Button>
      </form>
    </>
  );
}
