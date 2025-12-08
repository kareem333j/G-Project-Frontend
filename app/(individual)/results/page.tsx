"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";
import MainButton from "@/components/custom/MainButton";
// استخدم المسار النسبي البسيط
import { api } from "../lib/api";
import { ResultsPageData } from "../lib/types";
import VitalSignsGrid from "./components/VitalSignsGrid";
import PredictionDisplay from "./components/PredictionDisplay";
import AnalysisSection from "./components/AnalysisSection";
import LoadingSpinner from "./components/LoadingSpinner";

const ResultsPage = () => {
    const router = useRouter();
    const [data, setData] = useState<ResultsPageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadResultsData = async () => {
            try {
                setLoading(true);
                await api.simulateLoading(1000);
                const resultsData = await api.getResultsData();
                setData(resultsData);
            } catch (error) {
                console.error("Error loading results:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResultsData();
    }, []);

    const handleAnalyze = () => {
        if (data && typeof window !== 'undefined') {
            localStorage.setItem('resultsData', JSON.stringify(data));
        }
        router.push("/dashboard");
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-cover bg-center py-8 px-4 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <Title className="text-[2rem] sm:text-[2.5rem] text-bluelight-1 mb-4">
                        No Data Available
                    </Title>
                    <SubTitle className="text-[1.1rem] text-bluelight-1/70 mb-6">
                        Unable to load results. Please try again later.
                    </SubTitle>
                    <MainButton
                        onClick={() => router.push("/dashboard")}
                        className="text-[1.1rem] md:text-[1.3rem] px-12 py-4"
                    >
                        Go Back to Medical Data
                    </MainButton>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Navigation Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center justify-between"
                >
                    <button
                        onClick={() => router.push("/medical-data")}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-bluelight-1/40 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-all duration-300"
                        aria-label="Back to medical data"
                    >
                        <span>←</span>
                        <span className="hidden sm:inline">Back to Medical Data</span>
                        <span className="sm:hidden">Back</span>
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-bluelight-1/40 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-all duration-300"
                        aria-label="Go to home"
                    >
                        <span>🏠</span>
                        <span className="hidden sm:inline">Home</span>
                    </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
                    <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-bluelight-1 mb-3 sm:mb-4 px-2">
                        AI Disease Progression Predictor
                    </Title>
                    <SubTitle className="text-base sm:text-lg md:text-xl text-bluelight-1/70 px-2">
                        Prediction Results - {data.patient.name}
                    </SubTitle>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8 sm:space-y-12">
                    <VitalSignsGrid vitals={data.vitals} />
                    <div className="border-t border-bluelight-1/30 my-8"></div>
                    <PredictionDisplay prediction={data.prediction} />
                    <div className="border-t border-bluelight-1/30 my-8"></div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                        <AnalysisSection title="Health Analysis" items={data.analysis} type="analysis" />
                        <AnalysisSection title="Recommendations" items={data.recommendations} type="recommendations" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8">
                        <MainButton
                            onClick={() => router.push("/medical-data")}
                            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10 transition-all duration-300 w-full sm:w-auto"
                        >
                            New Analysis
                        </MainButton>

                        <MainButton
                            onClick={handleAnalyze}
                            className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border transition-all duration-300 bg-bluelight-2 hover:bg-transparent hover:scale-105 w-full sm:w-auto"
                        >
                            View Full Dashboard
                        </MainButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ResultsPage;