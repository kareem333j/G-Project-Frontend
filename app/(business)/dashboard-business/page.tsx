// app/business/dashboard-business/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const StatsCard = dynamic(() => import("../components/StatsCard"), { ssr: true });
const DiseaseProgressionChart = dynamic(() => import("../components/charts/DiseaseProgressionChart"), { ssr: false });
const RiskFactorBar = dynamic(() => import("../components/RiskFactorBar"), { ssr: true });
const RiskFactorsPie = dynamic(() => import("../components/charts/RiskFactorsPie"), { ssr: false });
const AccuracyCircle = dynamic(() => import("../components/AccuracyCircle"), { ssr: false });
const GenerateReportButton = dynamic(() => import("../components/GenerateReportButton"), { ssr: true });

import { getBusinessStats, getDiseaseProgression, getRiskFactors } from "../lib/api";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DashboardBusinessPage() {
    const [stats, setStats] = useState<any>(null);
    const [progression, setProgression] = useState<any[]>([]);
    const [riskFactors, setRiskFactors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [generatingReport, setGeneratingReport] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const [s, p, r] = await Promise.all([
                    getBusinessStats(),
                    getDiseaseProgression(),
                    getRiskFactors()
                ]);
                if (!mounted) return;
                setStats(s);
                setProgression(p);
                setRiskFactors(r);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const handleGenerateReport = () => {
        setGeneratingReport(true);
        setTimeout(() => {
            alert("PDF report generation for dashboard statistics will be implemented by Backend");
            setGeneratingReport(false);
        }, 1500);
    };

    return (
        <div className="w-full space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-bluelight-1 mb-2">Dashboard</h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Total patients"
                    value={loading ? "—" : stats?.totalPatients ?? "—"}
                    color="bluelight"
                />
                <StatsCard
                    title="High risk"
                    value={loading ? "—" : stats?.highRiskPatients ?? "—"}
                    color="red"
                />
                <StatsCard
                    title="Medium risk"
                    value={loading ? "—" : stats?.mediumRiskPatients ?? "—"}
                    color="yellow"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">Disease Progression</h3>
                    <div className="h-48">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-bluelight-1/60">Loading chart...</div>
                            </div>
                        ) : (
                            <DiseaseProgressionChart data={progression} />
                        )}
                    </div>
                </div>

                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">Risk Factors</h3>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center h-48">
                                <div className="text-bluelight-1/60">Loading risk factors...</div>
                            </div>
                        ) : (
                            riskFactors.map((f, i) => (
                                <RiskFactorBar
                                    key={f.name}
                                    name={f.name}
                                    value={f.value}
                                    colorIndex={i}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">Prediction Accuracy</h3>
                    <div className="flex flex-col items-center justify-center h-48">
                        {loading ? (
                            <div className="text-bluelight-1/60">Loading accuracy...</div>
                        ) : (
                            <>
                                <AccuracyCircle value={stats?.predictionAccuracy ?? 0} />
                                <div className="text-center text-bluelight-1/80 mt-2">
                                    <div className="font-semibold">AI Model Accuracy</div>
                                    <div className="text-sm">Performance Metric</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-6 text-center text-bluelight-1">
                        Risk Factors Distribution
                    </h3>
                    <div className="h-64">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-bluelight-1/60">Loading pie chart...</div>
                            </div>
                        ) : (
                            <RiskFactorsPie data={riskFactors} />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <GenerateReportButton
                    onClick={handleGenerateReport}
                    loading={generatingReport}
                    disabled={loading}
                />
            </div>
        </div>
    );
}