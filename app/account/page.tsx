import { createClient } from "@/utils/supabase/server";
import AccountForm from "./account-form/page";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
