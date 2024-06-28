import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "../ui/button";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Button variant={"outline"}>{user ? "Logout" : "Login"}</Button>;
}
