// app/auth/reset-password/components/ResetPasswordForm.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "../../shared/FormInput";
import { PasswordStrength } from "./PasswordStrength";
import { PasswordRequirements } from "./PasswordRequirements";

const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" as const }
    },
};

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    },
};

export function ResetPasswordForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [touched, setTouched] = useState({
        newPassword: false,
        confirmPassword: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // ✅ إضافة حالة للنجاح

    const validatePassword = (password: string) => {
        const requirements = {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        if (!password) return "Password is required";
        if (!requirements.minLength) return "At least 8 characters";
        if (!requirements.hasUpperCase) return "One uppercase letter";
        if (!requirements.hasLowerCase) return "One lowercase letter";
        if (!requirements.hasNumber) return "One number";
        if (!requirements.hasSpecialChar) return "One special character";
        return "";
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (!confirmPassword) return "Please confirm your password";
        if (confirmPassword !== formData.newPassword) return "Passwords do not match";
        return "";
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        if (touched[field as keyof typeof touched]) {
            if (field === "newPassword") {
                setErrors(prev => ({
                    ...prev,
                    newPassword: validatePassword(value),
                    confirmPassword: validateConfirmPassword(formData.confirmPassword)
                }));
            } else if (field === "confirmPassword") {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: validateConfirmPassword(value)
                }));
            }
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        if (field === "newPassword") {
            setErrors(prev => ({
                ...prev,
                newPassword: validatePassword(formData.newPassword),
                confirmPassword: validateConfirmPassword(formData.confirmPassword)
            }));
        } else if (field === "confirmPassword") {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(formData.confirmPassword)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ newPassword: true, confirmPassword: true });

        const newPasswordError = validatePassword(formData.newPassword);
        const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);

        setErrors({
            newPassword: newPasswordError,
            confirmPassword: confirmPasswordError
        });

        if (!newPasswordError && !confirmPasswordError) {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log("Password reset successful");
                sessionStorage.removeItem('resetPasswordEmail');

                // ✅ عرض رسالة النجاح أولاً
                setShowSuccess(true);

                // ✅ الانتظار 2 ثانية لرؤية الرسالة قبل التوجيه
                await new Promise(resolve => setTimeout(resolve, 2000));

                // ✅ التوجيه بعد عرض الرسالة
                router.push('./');
            } catch (error) {
                console.error("Reset failed:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const isFormValid = !errors.newPassword && !errors.confirmPassword &&
        formData.newPassword && formData.confirmPassword;

    return (
        <motion.form
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-5 w-full max-w-[380px] mt-2"
        >
            {/* ✅ رسالة النجاح */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">Password Changed Successfully!</span>
                    </div>
                    <p className="text-sm">Redirecting to Home page...</p>
                </motion.div>
            )}

            <motion.div variants={fadeUp} className="w-full">
                <input
                    type="password"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                    onBlur={() => handleBlur("newPassword")}
                    disabled={isLoading || showSuccess}
                    className={`w-full bg-transparent border rounded-xl px-4 py-3.5 text-bluelight-1 
                     focus:outline-none transition-all duration-300
                     placeholder:text-bluelight-1/60 text-base
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${errors.newPassword && touched.newPassword
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-bluelight-1/40 focus:border-bluelight-2'}`}
                />
                <PasswordStrength password={formData.newPassword} />
                {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500 text-xs text-left mt-1 flex items-center gap-1">
                        <span>⚠</span>
                        {errors.newPassword}
                    </div>
                )}
            </motion.div>

            <motion.div variants={fadeUp} className="w-full">
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                    disabled={isLoading || showSuccess} // ✅ تعطيل الحقول عند النجاح
                    className={`w-full bg-transparent border rounded-xl px-4 py-3.5 text-bluelight-1 
                     focus:outline-none transition-all duration-300
                     placeholder:text-bluelight-1/60 text-base
                     disabled:opacity-50 disabled:cursor-not-allowed
                     ${errors.confirmPassword && touched.confirmPassword
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-bluelight-1/40 focus:border-bluelight-2'}`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-xs text-left mt-1 flex items-center gap-1">
                        <span>⚠</span>
                        {errors.confirmPassword}
                    </div>
                )}
            </motion.div>

            <PasswordRequirements password={formData.newPassword} />

            <motion.div variants={fadeUp}>
                <button
                    type="submit"
                    disabled={!isFormValid || isLoading || showSuccess} // ✅ تعطيل الزر عند النجاح
                    className="w-full text-[1rem] sm:text-[1.1rem] 
                  px-7 py-3.5 border-2 border-bluelight-2
                  bg-gradient-to-r from-bluelight-2 to-bluelight-1
                  hover:from-bluelight-1 hover:to-bluelight-2
                  text-white font-medium
                  rounded-xl transition-all duration-100
                  hover:scale-[1.02] active:scale-[0.98]
                  shadow-lg hover:shadow-xl
                  relative overflow-hidden group
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:scale-100"
                >
                    <div className="absolute bg-gradient-to-r from-bluelight-2 to-bluelight-1 
                        w-full h-full bottom-0 group-hover:bottom-full 
                        transition-all duration-300" />

                    <span className="relative z-10">
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Resetting...
                            </span>
                        ) : showSuccess ? '✅ Success!' : 'Reset Password'}
                    </span>
                </button>
            </motion.div>

            <motion.div variants={fadeUp} className="text-sm text-center text-bluelight-1/70">
                <a href="/auth/login" className="text-bluelight-2 hover:underline transition-all duration-300">
                    Back to Login
                </a>
            </motion.div>
        </motion.form>
    );
}