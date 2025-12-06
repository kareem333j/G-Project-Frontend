// app/(business)/analytics/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import AnalyticsHeader from "./components/AnalyticsHeader";
import PatientSelector, { Patient } from "./components/PatientSelector";
import TimeRangeSelector from "./components/TimeRangeSelector";
import VitalSignsGrid from "./components/VitalSignsGrid";
import HealthTrendChart from "./components/HealthTrendChart";
import RiskGauge from "./components/RiskGauge";
import RiskFactors from "./components/RiskFactors";
import GenerateReportButton from "../components/GenerateReportButton";
import {
    getAllPatients,
    getPatientAnalytics,
    type PatientAnalyticsData,
    type Patient as ApiPatient
} from "../lib/api";

type TimeRange = "1" | "3" | "6";

export default function AnalyticsPage() {
    const [selectedPatient, setSelectedPatient] = useState<string>("p001");
    const [timeRange, setTimeRange] = useState<TimeRange>("6");
    const [data, setData] = useState<PatientAnalyticsData | null>(null);
    const [patients, setPatients] = useState<ApiPatient[]>([]);
    const [loading, setLoading] = useState(true);
    const [generatingReport, setGeneratingReport] = useState(false);

    useEffect(() => {
        // تحميل قائمة المرضى
        const loadPatients = async () => {
            try {
                const patientsData = await getAllPatients();
                setPatients(patientsData);
            } catch (err) {
                console.error("Failed to load patients:", err);
            }
        };

        loadPatients();
    }, []);

    useEffect(() => {
        let mounted = true;

        async function loadAnalytics() {
            if (!selectedPatient) return;

            setLoading(true);
            try {
                // استخدام API الحقيقي
                const patientData = await getPatientAnalytics(selectedPatient);

                if (!mounted) return;

                if (!patientData) {
                    console.warn(`No analytics data found for patient ${selectedPatient}`);
                    return;
                }

                // تصفية البيانات حسب الفترة الزمنية
                const filteredData = {
                    ...patientData,
                    healthTrend: patientData.healthTrend.slice(-parseInt(timeRange))
                };

                setData(filteredData);
            } catch (err) {
                console.error("Failed to load analytics:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadAnalytics();

        return () => { mounted = false; };
    }, [selectedPatient, timeRange]);

    const handleGenerateReport = () => {
        if (!data) return;

        setGeneratingReport(true);
        setTimeout(() => {
            alert(`Report generation for ${data.patientName} will be implemented by Backend`);
            setGeneratingReport(false);
        }, 1500);
    };

    // تحويل ApiPatient إلى Patient للنوع المطلوب
    const formattedPatients: Patient[] = patients.map(patient => ({
        id: patient.id,
        name: patient.name,
        risk: patient.risk
    }));

    if (loading || !data) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-bluelight-1 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <AnalyticsHeader title="Analytics Dashboard">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <PatientSelector
                            patients={formattedPatients}
                            selectedPatient={selectedPatient}
                            onPatientChange={setSelectedPatient}
                        />
                    </div>
                    <div className="sm:w-64">
                        <label className="block text-sm font-medium text-bluelight-1/70 mb-2">
                            Time Range
                        </label>
                        <TimeRangeSelector
                            timeRange={timeRange}
                            onTimeRangeChange={setTimeRange}
                        />
                    </div>
                </div>
            </AnalyticsHeader>

            {/* Vital Signs */}
            <div>
                <h2 className="text-xl font-semibold text-bluelight-1 mb-4">
                    Current Vital Signs
                </h2>
                <VitalSignsGrid vitalSigns={data.vitalSigns} />
            </div>

            {/* Health Trend & Risk Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-bluelight-1 mb-4">
                        Health Trend - Last {timeRange} Month{timeRange !== "1" ? "s" : ""}
                    </h3>
                    <HealthTrendChart
                        data={data.healthTrend}
                        timeRange={timeRange}
                    />
                </div>

                <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6 backdrop-blur-sm flex flex-col items-center justify-center">
                    <RiskGauge
                        value={data.futureRisk.value}
                        status={data.futureRisk.status}
                    />
                </div>
            </div>

            {/* Risk Factors */}
            <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-bluelight-1 mb-6">
                    Top Factors Influencing Prediction
                </h3>
                <RiskFactors riskFactors={data.riskFactors} />

                <div className="mt-6 pt-4 border-t border-bluelight-1/30 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-bluelight-1/70">Low</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-xs text-bluelight-1/70">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs text-bluelight-1/70">High</span>
                    </div>
                </div>
            </div>

            {/* Generate Report Button */}
            <div className="flex justify-center pt-4">
                <GenerateReportButton
                    onClick={handleGenerateReport}
                    loading={generatingReport}
                    disabled={!data}
                />
            </div>
        </div>
    );
}