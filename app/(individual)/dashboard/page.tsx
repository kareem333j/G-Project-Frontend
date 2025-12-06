"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Title from "@/components/custom/Title";
// استخدم المسار النسبي البسيط
import { api } from "../lib/api";
import { DashboardData } from "../lib/types";
import UserProfileCard from "./components/UserProfileCard";
import VitalSignsPanel from "./components/VitalSignsPanel";
import HealthTrendChart from "./components/HealthTrendChart";
import CircularProgress from "./components/CircularProgress";
import RiskFactorsChart from "./components/RiskFactorsChart";
import GenerateReportButton from "../../(business)/components/GenerateReportButton";


const DashboardPage = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [generatingReport, setGeneratingReport] = useState(false);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                await api.simulateLoading(1200);
                const dashboardData = await api.getDashboardData();
                setData(dashboardData);
            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const handleGenerateReport = async () => {
        if (!data) return;

        try {
            setGeneratingReport(true);
            const result = await api.generateReport(data.patient.id);

            if (result.success) {
                alert("Report generated successfully!");
            } else {
                alert("Report generation will be implemented by Backend");
            }
        } catch (error) {
            console.error("Error generating report:", error);
            alert("Failed to generate report");
        } finally {
            setGeneratingReport(false);
        }
    };

    if (isLoading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="flex flex-col items-center gap-4">
                    {/* Spinner */}
                    <div className="h-14 w-14 border-4 border-bluelight-1/30 border-t-bluelight-1 rounded-full animate-spin" />

                    {/* Text */}
                    <p className="text-bluelight-1 text-lg font-medium tracking-wide">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <Title className="text-3xl md:text-4xl font-bold text-bluelight-1">
                        Patient Dashboard - {data.patient.name}
                    </Title>
                    <p className="text-bluelight-1/70 mt-2">Last updated: {data.lastUpdated}</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <UserProfileCard patient={data.patient} />
                    </div>

                    <div className="flex-1 space-y-8">
                        <VitalSignsPanel vitals={data.vitals} />
                        <div className="border-t border-bluelight-1/30 my-8"></div>
                        <HealthTrendChart data={data.healthTrend} />

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <CircularProgress prediction={data.prediction} />
                            <RiskFactorsChart factors={data.riskFactors} />
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold text-bluelight-1 mb-6">Risk Factors</h3>
                            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.riskFactors.map((factor, index) => (
                                        <div key={index} className="border border-bluelight-1/30 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-bluelight-1">{factor.name}</h4>
                                                <span className="text-bluelight-1 font-bold">{factor.value}%</span>
                                            </div>
                                            <p className="text-sm text-bluelight-1/70">{factor.description}</p>
                                            <div className="mt-3">
                                                <div className="h-2 bg-bluelight-1/20 rounded-full overflow-hidden">
                                                    <div className="h-full rounded-full bg-bluelight-1" style={{ width: `${factor.value}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-bluelight-1/30 my-8"></div>

                        {/* Generate Report Button */}
                        <div className="flex justify-center pt-4">
                            <GenerateReportButton
                                onClick={handleGenerateReport}
                                loading={generatingReport}
                                disabled={!data}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;