// app/(business)/analytics/components/VitalSignsGrid.tsx
"use client";

import React from "react";
import { Heart, Droplet, Activity, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface VitalSign {
    value: number | string;
    unit: string;
    status: "normal" | "warning" | "danger";
}

interface VitalSignsGridProps {
    vitalSigns: {
        heartRate: VitalSign;
        glucose: VitalSign;
        bloodPressure: VitalSign;
        bloodSugar: VitalSign;
    };
}

export default function VitalSignsGrid({ vitalSigns }: VitalSignsGridProps) {
    const vitalCards = [
        {
            key: "heartRate",
            icon: Heart,
            title: "Heart Rate",
            value: vitalSigns.heartRate.value,
            unit: vitalSigns.heartRate.unit,
            status: vitalSigns.heartRate.status,
        },
        {
            key: "glucose",
            icon: Droplet,
            title: "Glucose Level",
            value: vitalSigns.glucose.value,
            unit: vitalSigns.glucose.unit,
            status: vitalSigns.glucose.status,
        },
        {
            key: "bloodPressure",
            icon: Activity,
            title: "Blood Pressure",
            value: vitalSigns.bloodPressure.value,
            unit: vitalSigns.bloodPressure.unit,
            status: vitalSigns.bloodPressure.status,
        },
        {
            key: "bloodSugar",
            icon: TrendingUp,
            title: "Blood Sugar",
            value: vitalSigns.bloodSugar.value,
            unit: vitalSigns.bloodSugar.unit,
            status: vitalSigns.bloodSugar.status,
        },
    ];

    const statusColors = {
        normal: "text-green-600",
        warning: "text-yellow-600",
        danger: "text-red-600",
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitalCards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={card.key}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-4 backdrop-blur-sm"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-bluelight-1/10 rounded-lg">
                                <Icon className="text-bluelight-1" size={24} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-bluelight-1/70">{card.title}</p>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-2xl font-bold ${statusColors[card.status]}`}>
                                    {card.value}
                                </span>
                                <span className="text-sm text-bluelight-1/60">{card.unit}</span>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}