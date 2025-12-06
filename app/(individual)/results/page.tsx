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
        if (data) {
            localStorage.setItem('resultsData', JSON.stringify(data));
        }
        router.push("/dashboard");
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <Title className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] text-bluelight-1 mb-4">
                        AI Disease Progression Predictor
                    </Title>
                    <SubTitle className="text-[1.3rem] text-bluelight-1/70">
                        Prediction Results - {data.patient.name}
                    </SubTitle>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-12">
                    <VitalSignsGrid vitals={data.vitals} />
                    <div className="border-t border-bluelight-1/30 my-8"></div>
                    <PredictionDisplay prediction={data.prediction} />
                    <div className="border-t border-bluelight-1/30 my-8"></div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                        <AnalysisSection title="Health Analysis" items={data.analysis} type="analysis" />
                        <AnalysisSection title="Recommendations" items={data.recommendations} type="recommendations" />
                    </div>

                    <div className="flex justify-center pt-8">
                        <MainButton
                            onClick={handleAnalyze}
                            className="text-[1.3rem] md:text-[1.5rem] px-16 py-6 border transition-all duration-300 bg-bluelight-2 hover:bg-transparent hover:scale-105"
                        >
                            Analyze Dashboard
                        </MainButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ResultsPage;