"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-bluelight-1 border-t-transparent rounded-full"
            />
            <p className="text-bluelight-1/70 text-lg">Loading prediction results...</p>
        </div>
    );
}