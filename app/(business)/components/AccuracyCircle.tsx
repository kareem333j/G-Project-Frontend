// app/(business)/dashboard-business/components/AccuracyCircle.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

type Props = {
    value?: number; // expected 0..100
    size?: number;  // px, default 128 (32 -> 128 svg viewBox scaling)
    strokeColor?: string;
    strokeWidth?: number;
};

export default function AccuracyCircle({
    value = 0,
    size = 128,
    strokeColor = "#4A90E2",
    strokeWidth = 8,
}: Props) {
    // حالة للتحكم في ما إذا تم التركيب (client-side)
    const [isMounted, setIsMounted] = useState(false);

    // حساب القيم فقط بعد التركيب على الكلينت
    const [display, setDisplay] = useState(0);
    const [dash, setDash] = useState(0);
    const [targetOffset, setTargetOffset] = useState(0);

    // animation controls
    const controls = useAnimation();

    useEffect(() => {
        setIsMounted(true);

        // احسب القيم بعد التركيب على الكلينت
        const calculatedDisplay = Math.round(Math.max(0, Math.min(100, Number(value || 0))));
        const radius = 45;
        const calculatedDash = 2 * Math.PI * radius;
        const calculatedOffset = calculatedDash - (calculatedDash * calculatedDisplay) / 100;

        setDisplay(calculatedDisplay);
        setDash(calculatedDash);
        setTargetOffset(calculatedOffset);
    }, [value]);

    useEffect(() => {
        if (!isMounted) return;

        // ابدأ التحريك بعد التركيب
        controls.start({
            strokeDashoffset: targetOffset,
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        });
    }, [isMounted, targetOffset, controls]);

    // عرض هيكل عظمي أثناء الهدراشن
    if (!isMounted) {
        return (
            <div
                style={{ width: size, height: size }}
                className="relative mb-4 bg-gray-100 rounded-full animate-pulse"
            />
        );
    }

    const ariaLabel = `Accuracy ${display} percent`;

    return (
        <div style={{ width: size, height: size }} className="relative mb-4">
            <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                role="img"
                aria-label={ariaLabel}
            >
                {/* background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    opacity={0.14}
                />

                {/* animated progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    // ابدأ من القيمة الكاملة (صفر تقدم)
                    initial={{ strokeDashoffset: dash }} // 100% مخفي (الدائرة كاملة)
                    animate={{ strokeDashoffset: targetOffset }} // يتحرك للقيمة المطلوبة
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                    transform="rotate(-90 50 50)"
                />

                {/* text in the middle */}
                <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="20"
                    fontWeight="700"
                    fill={strokeColor}
                >
                    {display}%
                </text>
            </svg>
        </div>
    );
}