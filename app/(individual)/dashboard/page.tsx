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
        let mounted = true;
        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                await api.simulateLoading(1200);
                const dashboardData = await api.getDashboardData();
                if (mounted) {
                    setData(dashboardData);
                }
            } catch (error) {
                console.error("Error loading dashboard:", error);
                if (mounted) {
                    // Keep loading state false to show error UI
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadDashboardData();
        return () => {
            mounted = false;
        };
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

    if (isLoading) {
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

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md px-4"
                >
                    <Title className="text-2xl md:text-3xl text-bluelight-1 mb-4">
                        Unable to Load Dashboard
                    </Title>
                    <p className="text-bluelight-1/70 mb-6">
                        There was an error loading your dashboard data. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-bluelight-2 text-white rounded-lg hover:bg-bluelight-1 transition-colors"
                    >
                        Refresh Page
                    </button>
                </motion.div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-cover bg-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-6 md:mb-8">
                    <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-bluelight-1">
                        Patient Dashboard - {data.patient.name}
                    </Title>
                    <p className="text-xs sm:text-sm md:text-base text-bluelight-1/70 mt-1 sm:mt-2">Last updated: {data.lastUpdated}</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <UserProfileCard patient={data.patient} />
                    </div>

                    <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
                        <VitalSignsPanel vitals={data.vitals} />
                        <div className="border-t border-bluelight-1/30 my-8"></div>
                        <HealthTrendChart data={data.healthTrend} />

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <CircularProgress prediction={data.prediction} />
                            <RiskFactorsChart factors={data.riskFactors} />
                        </div>

                        <div className="mt-4 sm:mt-6 md:mt-8">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-bluelight-1 mb-4 sm:mb-6">Risk Factors</h3>
                            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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