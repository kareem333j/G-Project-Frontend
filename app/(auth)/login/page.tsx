// /app/(auth)/login/page.tsx
"use client";
import { motion } from "framer-motion";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { LoginForm } from "./components/LoginForm";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { containerVariants } from "../shared/motion-variants";

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

      {/* Login Form */}
      <LoginForm />
    </AuthContainer>
  );
}