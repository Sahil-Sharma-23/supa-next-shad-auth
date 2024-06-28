import Image from "next/image";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/Icons";
import SignupForm from "@/components/auth/SignupForm";

export default function SingUpPage() {
  return (
    <div className="w-full lg:grid lg:grid-cols-8 min-h-screen">
      <div className="flex items-center justify-center py-12 col-span-5">
        <div className="mx-auto grid max-w-lg w-full gap-6 px-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold text-left">
              🌟 Ready to Be Awesome?
            </h1>
            <p className="text-balance text-muted-foreground text-left">
              Create Your Account and Dive In 🌟
            </p>
          </div>
          <Button variant={"outline"} className="space-x-2">
            <GoogleLogo />
            <span>Continue with google</span>
          </Button>
          <Separator />

          <SignupForm />

          <div className="text-center text-sm space-y-2">
            Already have an account?&nbsp;
            <Link
              href="/auth/login"
              className="hover:text-muted-foreground hover:underline duration-300 transition-all"
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
