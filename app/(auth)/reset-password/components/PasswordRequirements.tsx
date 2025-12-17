// app/auth/reset-password/components/PasswordRequirements.tsx
"use client";
import { motion } from "framer-motion";

interface PasswordRequirementsProps {
    password: string;
}

const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" as const }
    },
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
    const requirements = [
        { text: "At least 8 characters", met: password.length >= 8 },
        { text: "One uppercase letter", met: /[A-Z]/.test(password) },
        { text: "One lowercase letter", met: /[a-z]/.test(password) },
        { text: "One number", met: /[0-9]/.test(password) },
        { text: "One special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
    ];

    return (
        <motion.div
            variants={fadeUp}
            className="text-xs text-bluelight-1/60 text-left bg-bluelight-2/10 p-4 rounded-lg border border-bluelight-1/20"
        >
            <p className="font-semibold mb-2 text-bluelight-1">Password requirements:</p>
            <ul className="space-y-1">
                {requirements.map((req, index) => (
                    <li
                        key={index}
                        className={`flex items-center gap-2 transition-colors duration-200 ${req.met ? 'text-green-500' : 'text-bluelight-1/60'
                            }`}
                    >
                        <span className="text-sm">{req.met ? '✓' : '○'}</span>
                        {req.text}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}