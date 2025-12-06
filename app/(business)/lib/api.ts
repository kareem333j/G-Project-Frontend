// lib/api.ts
export {
    getBusinessStats,
    getDiseaseProgression,
    getRiskFactors,
    getAllPatients,
    getPatientById,
    getPatientsStats,
    exportPatientsCSV,
    getAnalyticsTrends,
    getAIExplanation,
    getUploadedFiles,
    getReports,
    generateBusinessReport,
    getSettings,
    updateSettings,
    downloadReport,
    getModelInsights,
    getPatientAnalytics,
    MOCK_PATIENT_ANALYTICS
} from './mockData';

// lib/mockData.ts
export async function deleteUploadedFile(id: string): Promise<boolean> {
    // محاكاة حذف ملف
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Deleted file with id: ${id}`);
    return true;
}

export async function uploadFile(file: File): Promise<boolean> {
    // محاكاة رفع ملف
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Uploaded file: ${file.name}`);
    return true;
}
// Export types
export type {
    Patient,
    BusinessStats,
    DiseaseProgressionPoint,
    RiskFactor,
    AnalyticsTrend,
    AIExplanation,
    UploadedFile,
    Report,
    Settings,
    RiskLevel,
    Gender,
    PatientAnalyticsData,
    PatientVitalSigns
} from './mockData';