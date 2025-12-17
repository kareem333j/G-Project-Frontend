// app/auth/verification-code/components/VerificationInputs.tsx
"use client";
import { motion } from "framer-motion";

interface VerificationInputsProps {
    code: string[];
    onChange: (index: number, value: string) => void;
    onKeyDown: (index: number, e: React.KeyboardEvent) => void;
}

const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" as const }
    },
};

export function VerificationInputs({ code, onChange, onKeyDown }: VerificationInputsProps) {
    return (
        <motion.div
            variants={fadeUp}
            className="w-full max-w-[380px]"
        >
            <div className="flex justify-between gap-2 mb-6">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => onChange(index, e.target.value)}
                        onKeyDown={(e) => onKeyDown(index, e)}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-2 
                       border-bluelight-1/40 rounded-xl text-bluelight-1 
                       text-center text-xl font-bold focus:border-bluelight-2 
                       outline-none transition-all duration-300"
                        aria-label={`Digit ${index + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
}
