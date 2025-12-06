// RiskFactorsPie.tsx
"use client";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function RiskFactorsPie({ data = [] }: { data?: any[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie data={data} dataKey="value" outerRadius={80} labelLine={false} label={(entry: any) => `${entry.name}: ${entry.value}%`}>
                    {data.map((d: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
