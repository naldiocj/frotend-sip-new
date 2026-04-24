import {
  LoginForm,
  LoginFormSkeleton,
} from "@/components/form/login-form/form-login";
import HeroLogin from "@/components/form/login-form/hero-login";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <HeroLogin />

      <div className="flex items-center justify-center px-4 py-8 md:py-12">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
