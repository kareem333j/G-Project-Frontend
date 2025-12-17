// app/(auth)/login/components/LoginForm.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FormInput } from "../../shared/FormInput";
import { AuthDivider } from "../../shared/AuthDivider";
import { fadeUp } from "../../shared/motion-variants";
import { useUserType, type UserType } from "@/context/UserTypeContext";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useUserType();

    // استخراج userType من query parameters
    const userTypeFromQuery = searchParams.get('userType') as UserType | null;

    useEffect(() => {
        // إذا كان هناك userType في الـ query، نستخدمه
        if (userTypeFromQuery) {
            console.log("User type from query:", userTypeFromQuery);
        }
    }, [userTypeFromQuery]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // تحديد نوع المستخدم:
            // 1. إذا جاء من query parameter نستخدمه
            // 2. إذا لم يأتي نحدده من البريد الإلكتروني
            let userType: UserType = 'individual';

            if (userTypeFromQuery) {
                userType = userTypeFromQuery;
            } else if (email.includes('@hospital.') || email.includes('@clinic.') || email.includes('@medical.')) {
                userType = 'business';
            }

            // استخدام الـ context للـ login
            await login(userType, { email, password });

            // توجيه بناءً على نوع المستخدم
            if (userType === 'business') {
                router.push('/dashboard-business');
            } else {
                router.push('/medical-data');
            }

        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterClick = () => {
        // عند الضغط على Register، توجيه مباشر إلى register-business
        router.push('/register-business');
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 sm:gap-6 w-full max-w-[380px] mt-2"
        >
            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm"
                    role="alert"
                    aria-live="polite"
                >
                    {error}
                </motion.div>
            )}

            {/* لا يوجد اختيار لنوع المستخدم هنا - صفحة login عادية */}

            {/* Email Input */}
            <motion.div variants={fadeUp}>
                <FormInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    disabled={isLoading}
                    required
                    autoComplete="email"
                />
            </motion.div>

            {/* Password Input */}
            <motion.div variants={fadeUp}>
                <FormInput
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    disabled={isLoading}
                    required
                    autoComplete="current-password"
                />
            </motion.div>

            {/* Forgot Password Link */}
            <motion.div variants={fadeUp} className="text-right">
                <Link
                    href="./forgot-password"
                    className="text-sm text-bluelight-2 hover:underline transition-all duration-300"
                >
                    Forgot Password?
                </Link>
            </motion.div>

            {/* Login Button */}
            <motion.div variants={fadeUp}>
                <button
                    type="submit"
                    disabled={!email || !password || isLoading}
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
                        {isLoading ? 'Logging in...' : 'Login'}
                    </span>
                </button>
            </motion.div>

            {/* Divider */}
            <AuthDivider />

            {/* Register Links */}
            <motion.div variants={fadeUp} className="space-y-3">
                <p className="text-sm text-center text-bluelight-1/70">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={handleRegisterClick}
                        className="text-bluelight-2 hover:underline transition-all duration-300"
                    >
                        Register your Business
                    </button>
                </p>

                {/* إذا أردت إضافة خيار للتسجيل كفرد */}
                <p className="text-sm text-center text-bluelight-1/70">
                    Want to register as individual?{" "}
                    <Link
                        href="./register"
                        className="text-bluelight-2 hover:underline transition-all duration-300"
                    >
                        Register as Individual
                    </Link>
                </p>
            </motion.div>
        </motion.form>
    );
}