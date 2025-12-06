// app/(business)/analytics/components/RiskGauge.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface RiskGaugeProps {
    value: number;
    status: string;
}

export default function RiskGauge({ value, status }: RiskGaugeProps) {
    const getColor = (val: number) => {
        if (val < 30) return "#10B981";
        if (val < 60) return "#F59E0B";
        return "#EF4444";
    };

    const color = getColor(value);

    return (
        <div className="relative w-full max-w-xs mx-auto">
            <svg className="w-full h-auto" viewBox="0 0 200 120">
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#4A90E2"
                    strokeWidth="12"
                    opacity="0.2"
                />
                <motion.path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * value) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.text
                    x="100"
                    y="85"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {value}%
                </motion.text>
            </svg>

            <div className="text-center mt-2">
                <p className="text-lg font-semibold text-bluelight-1">Future Risk</p>
                <p className="text-sm text-bluelight-1/70">{status}</p>
            </div>
        </div>
    );
}