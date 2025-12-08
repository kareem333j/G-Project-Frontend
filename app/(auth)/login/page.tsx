// /app/(auth)/login/page.tsx
"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { LoginForm } from "./components/LoginForm";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { containerVariants } from "../shared/motion-variants";

function LoginFormFallback() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-[380px] mt-2">
      <div className="h-12 bg-bluelight-1/10 rounded-xl animate-pulse" />
      <div className="h-12 bg-bluelight-1/10 rounded-xl animate-pulse" />
      <div className="h-12 bg-bluelight-1/10 rounded-xl animate-pulse" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthContainer>
      {/* Theme Toggle */}

      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AuthHeader
          title="AI Disease Progression Predictor"
          subtitle="Login"
        />
      </motion.div>

      {/* Login Form with Suspense */}
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthContainer>
  );
}