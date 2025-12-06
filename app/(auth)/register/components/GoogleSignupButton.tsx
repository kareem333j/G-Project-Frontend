// app/auth/register/components/GoogleSignupButton.tsx
"use client";
import { motion } from "framer-motion";
import MainButton from "@/components/custom/MainButton";

const fadeUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" as const }
    },
};

export function GoogleSignupButton() {
    const handleGoogleSignup = () => {
        console.log("Google signup clicked");
        // Add Google OAuth logic here
    };

    return (
        <motion.div variants={fadeUp}>
            <MainButton
                onClick={handleGoogleSignup}
                className="w-full border text-[1rem] sm:text-[1.1rem] 
                   px-7 py-3.5 backdrop-blur-sm bg-bluelight-2/10 
                   transition-all duration-300"
                classHover="bg-bluelight-2 w-full h-full top-full group-hover:top-0"
            >
                <span className="flex items-center justify-center gap-4">
                    <img
                        src="https://www.google.com/favicon.ico"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign up with Google
                </span>
            </MainButton>
        </motion.div>
    );
}