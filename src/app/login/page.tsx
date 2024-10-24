import Link from "next/link";

import { LoginForm } from "@/components/login-form";

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative grid h-[800px] flex-col items-center justify-center lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              {"Don't have an account?"}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign Up Now
              </Link>
            </p>
            <p className="absolute inset-x-0 bottom-0 px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
