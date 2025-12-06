// app/auth/verification-code/components/ResendCode.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" as const }
    },
};

export function ResendCode() {
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResend = () => {
        setTimer(60);
        setCanResend(false);
        // Add resend logic here
        console.log("Resending code...");
    };

    return (
        <motion.div
            variants={fadeUp}
            className="text-sm text-center text-bluelight-1/70"
        >
            {canResend ? (
                <>
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResend}
                        className="text-bluelight-2 hover:underline transition-all duration-300 font-medium"
                    >
                        Resend Code
                    </button>
                </>
            ) : (
                <>
                    Resend code in{" "}
                    <span className="text-bluelight-2 font-semibold">{timer}s</span>
                </>
            )}
        </motion.div>
    );
}