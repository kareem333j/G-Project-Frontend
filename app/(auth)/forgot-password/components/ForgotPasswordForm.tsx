// app/auth/forgot-password/components/ForgotPasswordForm.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "../../shared/FormInput";
import { fadeUp } from "../../shared/motion-variants";
import MainButton from "@/components/custom/MainButton";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            sessionStorage.setItem('resetPasswordEmail', email);
            router.push('./verification-code');
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:gap-6 w-full max-w-[380px] mt-2"
        >
            <motion.div variants={fadeUp}>
                <FormInput
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    autoComplete="email"
                />
            </motion.div>

            <motion.div variants={fadeUp}>
                <MainButton
                    type="submit"
                    disabled={!email || isLoading}
                    className={`w-full text-[1rem] sm:text-[1.1rem] 
                     px-7 py-3.5 border transition-all duration-300
                     ${email && !isLoading
                            ? 'bg-bluelight-2 hover:bg-transparent'
                            : 'bg-bluelight-2/50 cursor-not-allowed'}`}
                    background={email && !isLoading ? "bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full" : ""}
                >
                    {isLoading ? 'Sending...' : 'Send Verification Code'}
                </MainButton>
            </motion.div>

            <motion.div variants={fadeUp} className="text-sm text-center text-bluelight-1/70">
                Remember your password?{" "}
                <a href="./login" className="text-bluelight-2 hover:underline transition-all duration-300">
                    Back to Login
                </a>
            </motion.div>
        </motion.form>
    );
}
