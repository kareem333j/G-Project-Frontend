// app/auth/forgot-password/page.tsx
"use client";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthContainer minHeight="500px">
      <AuthHeader
        subtitle="Find Your Account"
        description="Please enter your email address to search for your account."
      />
      <ForgotPasswordForm />
    </AuthContainer>
  );
}