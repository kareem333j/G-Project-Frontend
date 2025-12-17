"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";
import ThemeToggleDefault from "@/components/custom/ThemeToggleDefault";
import { InstitutionForm } from "./components/InstitutionForm";

export default function InstitutionRegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        businessType: "",
        expectedPatients: "",
        employees: ""
    });

    const handleContinue = () => {
        if (!formData.name || !formData.businessType || !formData.expectedPatients || !formData.employees) {
            alert("Please fill all required fields");
            return;
        }

        const params = new URLSearchParams({
            type: "institution",
            name: formData.name,
            businessType: formData.businessType,
            expectedPatients: formData.expectedPatients,
            employees: formData.employees
        });

        router.push(`/register?${params.toString()}`);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-bluelight-1/5 to-bluelight-2/10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full max-w-[520px]
                   p-8 sm:p-10 relative flex flex-col 
                   gap-8 sm:gap-9 items-center justify-center
                   rounded-[28px] sm:rounded-[32px]
                   shadow-[-1px_-3px_62px_11px_var(--color-bluelight-shade)]
                   text-center min-h-[600px]
                   bg-white/80 dark:bg-gray-900/80 
                   backdrop-blur-sm border border-bluelight-1/20"
            >
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10">
                    <ThemeToggleDefault
                        className="text-bluelight-1 hover:text-bluelight-2 transition-colors"
                    />
                </div>

                <button
                    onClick={() => router.back()}
                    className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10
                   text-bluelight-1/80 hover:text-bluelight-1
                   transition-all duration-300
                   flex items-center gap-2 text-sm sm:text-base
                   hover:scale-105 active:scale-95"
                >
                    <span className="text-lg">←</span>
                    <span className="hidden sm:inline">Back</span>
                </button>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full mt-6 sm:mt-8"
                >
                    <Title className="text-[1.8rem] sm:text-[2.1rem] md:text-[2.4rem] 
                           text-bluelight-1 leading-tight">
                        Institution Information
                    </Title>
                    <SubTitle className="text-[1.1rem] sm:text-[1.3rem] text-bluelight-1/70">
                        Complete your organization details
                    </SubTitle>
                </motion.div>

                <InstitutionForm
                    formData={formData}
                    setFormData={setFormData}
                    handleContinue={handleContinue}
                />
            </motion.div>
        </div>
    );
}