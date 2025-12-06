// app/(individual)/dashboard/components/UserProfileCard.tsx
"use client";
import { motion } from "framer-motion";
import { Patient } from "../../lib/types"
interface UserProfileCardProps {
    patient: Patient;
}

export default function UserProfileCard({ patient }: UserProfileCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6"
        >
            <div className="space-y-6">
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



                {/* Settings Button */}
                <button
                    onClick={() => window.location.href = '/settings'}
                    className="w-full py-3 px-4 bg-bluelight-2 text-white rounded-lg hover:bg-bluelight-1 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                >
                    <span className="text-lg">⚙️</span>
                    <span className="font-medium">Settings & Preferences</span>
                </button>
            </div>
        </motion.div>
    );
}