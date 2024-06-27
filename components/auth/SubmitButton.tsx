"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  title: string;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" />
          {props.title}
        </>
      ) : (
        <span>{props.title}</span>
      )}
    </Button>
  );
}
