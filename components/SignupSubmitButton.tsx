"use client";

import React from "react";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SignupSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending ? (
        <>
          <Loader className="animate-spin" />
          Sign Up
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
  );
}
