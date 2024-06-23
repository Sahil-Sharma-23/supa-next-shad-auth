import Image from "next/image";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/server/actions/auth";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/Icons";
import SubmitButton from "@/components/SubmitButton";
import PasswordInput from "@/components/PasswordInput";

export default function SingUpPage() {
  return (
    <div className="w-full lg:grid lg:grid-cols-8 min-h-screen">
      <div className="flex items-center justify-center py-12 col-span-5">
        <div className="mx-auto grid max-w-lg w-full gap-6 px-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold text-left">
              Create your account
            </h1>
            <p className="text-balance text-muted-foreground text-left">
              Enter your email and create a strong password to Sign up.
            </p>
          </div>
          <Button variant={"outline"} className="space-x-2">
            <GoogleLogo />
            <span>Continue with google</span>
          </Button>
          <Separator />
          <form action={signUpAction} className="grid gap-4">
            <div className="flex w-full gap-2">
              <div className="flex-1 grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Jane"
                  required
                />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <SubmitButton title="Sign Up" />
          </form>
          <div className="text-center text-sm space-y-2">
            Already have an account?&nbsp;
            <Link
              href="/auth/login"
              className="hover:text-muted-foreground duration-300 transition-all"
            >
              Login here!
            </Link>
            <p>
              By Signing up, you agree to our&nbsp;
              <Link
                href={"/public/terms-of-use"}
                className="underline duration-300 transition-all hover:text-muted-foreground"
              >
                Terms of Use
              </Link>
              &nbsp;and&nbsp;
              <Link
                href={"/public/privacy-policy"}
                className="underline duration-300 transition-all hover:text-muted-foreground"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block col-span-3">
        <Image
          src="/dark-pattern.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
