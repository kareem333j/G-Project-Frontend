// app/(business)/analytics/components/RiskFactors.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface RiskFactor {
    title: string;
    impact: "Low" | "Medium" | "High";
    value: number;
}

interface RiskFactorsProps {
    riskFactors: RiskFactor[];
}

export default function RiskFactors({ riskFactors }: RiskFactorsProps) {
    const impactColors = {
        Low: "bg-green-500",
        Medium: "bg-yellow-500",
        High: "bg-red-500",
    };

    const impactTextColors = {
        Low: "text-green-600",
        Medium: "text-yellow-600",
        High: "text-red-600",
    };

    return (
        <div className="space-y-5">
            {riskFactors.map((factor, index) => (
                <div key={factor.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-bluelight-1">
                            {factor.title}
                        </span>
                        <span className={`text-xs font-semibold ${impactTextColors[factor.impact]}`}>
                            {factor.impact} Impact
                        </span>
                    </div>
                    <div className="w-full h-2 bg-bluelight-1/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${factor.value}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full ${impactColors[factor.impact]}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}