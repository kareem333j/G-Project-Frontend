// app/auth/register/page.tsx
"use client";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { RegisterForm } from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthContainer>
      <AuthHeader subtitle="Create Account" />
      <RegisterForm />
    </AuthContainer>
  );
}