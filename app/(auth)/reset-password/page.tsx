// app/auth/reset-password/page.tsx
"use client";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthContainer minHeight="600px">
      <AuthHeader
        subtitle="Reset Password"
        description="Create a new strong password for your account"
      />
      <ResetPasswordForm />
    </AuthContainer>
  );
}