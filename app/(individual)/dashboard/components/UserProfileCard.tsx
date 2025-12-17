// app/(individual)/dashboard/components/UserProfileCard.tsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUserType } from "@/context/UserTypeContext";
import { Patient } from "../../lib/types"

interface UserProfileCardProps {
    patient: Patient;
}

export default function UserProfileCard({ patient }: UserProfileCardProps) {
    const router = useRouter();
    const { logout } = useUserType();

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            logout();
            router.push('/');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6"
        >
            <div className="space-y-4">
                {/* User Avatar & Info */}
                <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-bluelight-1 to-bluelight-2 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                        {patient.initials}
                    </div>
                    <h2 className="text-xl font-bold text-bluelight-1">{patient.name}</h2>
                    <div className="text-sm text-bluelight-1/70 mt-1">
                        Age: {patient.age} • {patient.gender}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => router.push('/medical-data')}
                        className="w-full py-3 px-4 bg-bluelight-2 text-white rounded-lg hover:bg-bluelight-1 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span className="text-lg">➕</span>
                        <span className="font-medium">New Analysis</span>
                    </button>
                    
                    <button
                        onClick={() => router.push('/settings')}
                        className="w-full py-3 px-4 border-2 border-bluelight-1/40 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span className="text-lg">⚙️</span>
                        <span className="font-medium">Settings</span>
                    </button>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 px-4 border-2 border-red-500/40 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span className="text-lg">🚪</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}