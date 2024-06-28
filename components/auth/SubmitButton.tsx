import React from "react";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

type SubmitButtonProps = {
  loading: boolean;
  buttonTitle: string;
};

export default function SubmitButton({
  loading,
  buttonTitle,
}: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? (
        <span className="flex gap-2">
          <LoaderCircle className="animate-spin" />
          <span>{buttonTitle}</span>
        </span>
      ) : (
        <span>{buttonTitle}</span>
      )}
    </Button>
  );
}
