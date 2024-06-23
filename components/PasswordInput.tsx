"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        id="password"
        type={`${showPassword ? "text" : "password"}`}
        name="password"
        placeholder="Password"
        required
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
  );
}
