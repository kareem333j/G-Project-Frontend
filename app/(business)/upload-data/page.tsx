// app/(business)/upload-data/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getUploadedFiles, deleteUploadedFile, uploadFile } from "../lib/api";
import type { UploadedFile } from "../lib/api";
import UploadOptions from "./components/UploadOptions";
import SinglePatientForm from "./components/SinglePatientForm";
import FileUploadSection from "./components/FileUploadSection";
import AnalysisResult from "./components/AnalysisResult";
import { Activity, FileText } from "lucide-react";

type UploadOption = "single" | "batch";

interface PatientFormData {
    age: string;
    weight: string;
    sleepHours: string;
    bloodPressure: string;
    bloodSugar: string;
    bmi: string;
    additionalInfo: string;
}

interface AnalysisData {
    status: string;
    riskLevel: number;
    advice: string[];
}

export default function UploadDataPage() {
    const [selectedOption, setSelectedOption] = useState<UploadOption>("single");
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);

    // تحميل قائمة الملفات المرفوعة
    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        setLoading(true);
        try {
            const data = await getUploadedFiles();
            setFiles(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // معالجة تحليل بيانات مريض واحد
    const handleSinglePatientSubmit = async (data: PatientFormData, file?: File) => {
        setAnalyzing(true);
        try {
            // محاكاة API call للتحليل
            await new Promise(resolve => setTimeout(resolve, 2000));

            // بيانات وهمية للنتيجة (ستستبدل بـ API حقيقي)
            const mockResult: AnalysisData = {
                status: "Stable",
                riskLevel: 35,
                advice: [
                    "Maintain balanced diet and regular exercise",
                    "Monitor blood sugar levels weekly",
                    "Get 7-8 hours of sleep daily",
                    "Schedule follow-up appointment in 3 months",
                    "Consider reducing stress through meditation or yoga"
                ]
            };

            setAnalysisResult(mockResult);
        } catch (err) {
            console.error("Analysis failed:", err);
            alert("Analysis failed. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    // معالجة رفع ملف
    const handleFileUpload = async (file: File) => {
        setUploading(true);
        try {
            const success = await uploadFile(file);
            if (success) {
                alert("File uploaded successfully!");
                await loadFiles(); // تحديث قائمة الملفات
            } else {
                alert("Upload failed. Please try again.");
            }
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const success = await deleteUploadedFile(id);
        if (success) {
            setFiles(prev => prev.filter(f => f.id !== id));
        }
    };

    const resetAnalysis = () => {
        setAnalysisResult(null);
    };

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-bluelight-1 mb-2">Patient Health Analysis</h1>
                <p className="text-bluelight-1/60">
                    Upload patient data for AI-powered health risk analysis
                </p>
            </div>

            {/* إذا كانت هناك نتيجة تحليل، اعرضها */}
            {analysisResult ? (
                <AnalysisResult
                    status={analysisResult.status}
                    riskLevel={analysisResult.riskLevel}
                    advice={analysisResult.advice}
                    onNewAnalysis={resetAnalysis}
                />
            ) : (
                <>
                    {/* خيارات الرفع */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-bluelight-1">Select Analysis Type</h2>
                        <UploadOptions
                            selectedOption={selectedOption}
                            onOptionSelect={setSelectedOption}
                        />
                    </div>

                    {/* نموذج المريض الفردي */}
                    {selectedOption === "single" && (
                        <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="text-bluelight-1" size={24} />
                                <h2 className="text-xl font-semibold text-bluelight-1">
                                    Enter Patient Data
                                </h2>
                            </div>
                            <SinglePatientForm
                                onSubmit={handleSinglePatientSubmit}
                                loading={analyzing}
                            />
                        </div>
                    )}

                    {/* رفع ملف */}
                    {selectedOption === "batch" && (
                        <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="text-bluelight-1" size={24} />
                                <h2 className="text-xl font-semibold text-bluelight-1">
                                    Upload Patients Data File
                                </h2>
                            </div>
                            <FileUploadSection
                                onUpload={handleFileUpload}
                                loading={uploading}
                            />
                        </div>
                    )}


                </>
            )}
        </div>
    );
}