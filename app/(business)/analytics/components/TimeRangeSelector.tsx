// app/(business)/analytics/components/TimeRangeSelector.tsx
"use client";

import React from "react";

interface TimeRangeSelectorProps {
    timeRange: "1" | "3" | "6";
    onTimeRangeChange: (range: "1" | "3" | "6") => void;
}

export default function TimeRangeSelector({
    timeRange,
    onTimeRangeChange
}: TimeRangeSelectorProps) {
    const timeRanges = [
        { value: "1" as const, label: "Last Month" },
        { value: "3" as const, label: "Last 3 Months" },
        { value: "6" as const, label: "Last 6 Months" },
    ];

    return (
        <div className="flex gap-2">
            {timeRanges.map((range) => (
                <button
                    key={range.value}
                    onClick={() => onTimeRangeChange(range.value)}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${timeRange === range.value
                            ? "bg-bluelight-2 text-white shadow-md"
                            : "bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10"
                        }`}
                >
                    {range.label}
                </button>
            ))}
        </div>
    );
}