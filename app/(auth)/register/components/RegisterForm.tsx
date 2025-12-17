// app/auth/register/components/RegisterForm.tsx
"use client";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { FormInput } from "../../shared/FormInput";
import { AuthDivider } from "../../shared/AuthDivider";
import { GoogleSignupButton } from "./GoogleSignupButton";
import MainButton from "@/components/custom/MainButton";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    },
};

const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" as const }
    },
};

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert(`Welcome ${formData.username}! Your account has been created successfully!`);
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            setErrors({
                general: 'Registration failed. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formFields = [
        { name: 'username' as keyof FormData, type: 'text', placeholder: 'Username', autoComplete: 'username' },
        { name: 'email' as keyof FormData, type: 'email', placeholder: 'Email Address', autoComplete: 'email' },
        { name: 'password' as keyof FormData, type: 'password', placeholder: 'Password', autoComplete: 'new-password' },
        { name: 'confirmPassword' as keyof FormData, type: 'password', placeholder: 'Confirm Password', autoComplete: 'new-password' }
    ];

    return (
        <motion.form
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-5 w-full max-w-[380px] mt-2"
            noValidate
        >
            {errors.general && (
                <motion.div
                    variants={fadeUp}
                    className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                >
                    {errors.general}
                </motion.div>
            )}

            {formFields.map((field) => (
                <FormInput
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={isLoading}
                    error={errors[field.name]}
                    touched={true}
                    showPasswordToggle={field.type === 'password'}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(prev => !prev)}
                    autoComplete={field.autoComplete}
                />
            ))}

            <motion.div variants={fadeUp}>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-[1rem] sm:text-[1.1rem] 
            px-7 py-3.5 border bg-bluelight-2 
            hover:bg-transparent transition-all duration-300
            rounded-xl disabled:opacity-50 disabled:cursor-not-allowed
            font-medium text-black dark:text-white"
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </motion.div>

            <AuthDivider />

            <GoogleSignupButton />

            <motion.div variants={fadeUp} className="text-sm text-center text-bluelight-1/70">
                Already have an account?{" "}
                <a href="./login?userType=individual" className="text-bluelight-2 hover:underline transition-all duration-300 font-medium">
                    Login
                </a>

            </motion.div>
        </motion.form>
    );
}
