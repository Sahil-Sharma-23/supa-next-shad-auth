import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="space-x-4">
        <Link href={"/auth/login"}>
          <Button>Login</Button>
        </Link>
        <Link href={"/auth/signup"}>
          <Button>Sign Up</Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
