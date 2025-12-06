// app/auth/verification-code/page.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContainer from "../shared/AuthContainer";
import { AuthHeader } from "../shared/AuthHeader";
import { VerificationInputs } from "./components/VerificationInputs";
import { ResendCode } from "./components/ResendCode";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export default function VerificationCodePage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('resetPasswordEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
    } else {
      router.push('/auth/forgot-password');
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyClick = async () => {
    if (!isCodeComplete || isLoading) return;

    setIsLoading(true);
    try {
      const verificationCode = code.join('');
      console.log("Verifying code:", verificationCode);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      router.push('../reset-password');
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== "");

  return (
    <AuthContainer minHeight="550px">
      <AuthHeader subtitle="Verification Code" />

      <motion.div
        variants={fadeUp}
        className="text-bluelight-1/80 text-sm sm:text-base text-center max-w-[400px]"
      >
        We sent a 6-digit verification code to your email
        <br />
        <span className="text-bluelight-2 font-semibold break-all">
          {userEmail || "Loading..."}
        </span>
      </motion.div>

      <VerificationInputs
        code={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <motion.div className="flex flex-col gap-5 sm:gap-6 w-full max-w-[380px]">
        <motion.div variants={fadeUp}>
          {/* ✅ زر Verify مع نفس تأثيرات الأزرار الأخرى */}
          <button
            type="button"
            onClick={handleVerifyClick}
            disabled={!isCodeComplete || isLoading}
            className="w-full text-[1rem] sm:text-[1.1rem] 
                       px-7 py-3.5 border-2 border-bluelight-2
                       bg-gradient-to-r from-bluelight-2 to-bluelight-1
                       hover:from-bluelight-1 hover:to-bluelight-2
                       text-white font-medium
                       rounded-xl transition-all duration-300
                       hover:scale-[1.02] active:scale-[0.98]
                       shadow-lg hover:shadow-xl
                       relative overflow-hidden group
                       disabled:opacity-50 disabled:cursor-not-allowed
                       disabled:hover:scale-100"
          >
            <div className="absolute bg-gradient-to-r from-bluelight-2 to-bluelight-1 
                            w-full h-full bottom-0 group-hover:bottom-full 
                            transition-all duration-300" />

            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading && (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </span>
          </button>
        </motion.div>

        <ResendCode />

        <motion.div variants={fadeUp} className="text-sm text-center text-bluelight-1/70">
          <a href="./login" className="text-bluelight-2 hover:underline transition-all duration-300">
            Back to Login
          </a>
        </motion.div>
      </motion.div>
    </AuthContainer>
  );
}