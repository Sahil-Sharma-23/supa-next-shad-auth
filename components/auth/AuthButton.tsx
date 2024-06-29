import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Button } from "../ui/button";
import { logoutAction } from "@/server/actions/auth";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user ? (
        <form action={logoutAction}>
          <Button type="submit" variant={"outline"}>
            Logout
          </Button>
        </form>
      ) : (
        <Button variant={"outline"}>Not logged in!</Button>
      )}
    </>
  );
}
