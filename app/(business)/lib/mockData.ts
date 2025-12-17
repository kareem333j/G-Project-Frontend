// ==========================================
// lib/mockData.ts
// Complete Mock Data for All Dashboard Pages
// Backend: Replace these with real API calls
// ==========================================

// ==========================================
// TYPES
// ==========================================
export type RiskLevel = "High" | "Medium" | "Low";
export type Gender = "Male" | "Female";

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: Gender;
    risk: RiskLevel;
    lastVisit: string;
    email: string;
    phone: string;
    address: string;
}

export interface PatientDetails extends Patient {
    medicalHistory: string[];
    riskFactors: Array<{ name: string; value: number; unit: string }>;
    predictions: Array<{ date: string; risk: number; confidence: number }>;
    medications: string[];
    allergies: string[];
    notes: string;
}

export interface BusinessStats {
    totalPatients: number;
    highRiskPatients: number;
    mediumRiskPatients: number;
    lowRiskPatients: number;
    predictionAccuracy: number;
    newPatientsThisMonth: number;
    averageAge: number;
}

export interface DiseaseProgressionPoint {
    month: string;
    patients: number;
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
}

export interface RiskFactor {
    name: string;
    value: number;
    category: string;
}

export interface Report {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
    downloadUrl: string;
}

export interface AnalyticsTrend {
    month: string;
    totalPatients: number;
    highRisk: number;
    predictions: number;
    accuracy: number;
}

export interface AIExplanation {
    patientId: string;
    factors: Array<{
        factor: string;
        impact: number;
        explanation: string;
        recommendation: string;
    }>;
    overallRisk: number;
    confidence: number;
}

export interface UploadedFile {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    status: "Processing" | "Completed" | "Failed";
    records: number;
}

export interface Settings {
    notifications: {
        email: boolean;
        sms: boolean;
        highRiskAlerts: boolean;
    };
    dataRetention: {
        keepDataFor: number;
        autoDelete: boolean;
    };
    apiSettings: {
        predictionModel: string;
        updateFrequency: string;
    };
}

// ==========================================
// MOCK PATIENTS DATA
// ==========================================
export const MOCK_PATIENTS: Patient[] = [
    {
        id: "p001",
        name: "Ahmed Ali Hassan",
        age: 54,
        gender: "Male",
        risk: "High",
        lastVisit: "2025-11-15",
        email: "ahmed.ali@email.com",
        phone: "+20 123 456 7890",
        address: "Cairo, Egypt"
    },
    {
        id: "p002",
        name: "Mona Salah Ibrahim",
        age: 46,
        gender: "Female",
        risk: "Medium",
        lastVisit: "2025-10-20",
        email: "mona.salah@email.com",
        phone: "+20 123 456 7891",
        address: "Alexandria, Egypt"
    },
    {
        id: "p003",
        name: "Youssef Hamdy Mohamed",
        age: 32,
        gender: "Male",
        risk: "Low",
        lastVisit: "2025-09-02",
        email: "youssef.h@email.com",
        phone: "+20 123 456 7892",
        address: "Giza, Egypt"
    },
    {
        id: "p004",
        name: "Sara Fathy Mahmoud",
        age: 67,
        gender: "Female",
        risk: "High",
        lastVisit: "2025-11-01",
        email: "sara.fathy@email.com",
        phone: "+20 123 456 7893",
        address: "Cairo, Egypt"
    }
];

// ==========================================
// MOCK PATIENT DETAILS
// ==========================================
export const MOCK_PATIENT_DETAILS: Record<string, PatientDetails> = {
    p001: {
        ...MOCK_PATIENTS[0],
        medicalHistory: [
            "Type 2 Diabetes Mellitus (Diagnosed 2020)",
            "Hypertension (Diagnosed 2018)",
            "Hyperlipidemia (Diagnosed 2019)",
            "Family history of cardiovascular disease",
        ],
        riskFactors: [
            { name: "Fasting Blood Glucose", value: 185, unit: "mg/dL" },
            { name: "BMI", value: 32.4, unit: "kg/m²" },
            { name: "Systolic Blood Pressure", value: 148, unit: "mmHg" },
            { name: "HbA1c", value: 8.2, unit: "%" },
        ],
        predictions: [
            { date: "2025-12", risk: 78, confidence: 89 },
            { date: "2026-01", risk: 82, confidence: 86 },
            { date: "2026-02", risk: 85, confidence: 84 },
        ],
        medications: [
            "Metformin 1000mg - Twice daily",
            "Atorvastatin 40mg - Once daily",
            "Lisinopril 10mg - Once daily",
        ],
        allergies: ["Penicillin", "Sulfa drugs"],
        notes: "Patient shows good compliance with medication. Recommend lifestyle modifications.",
    }
};

// ==========================================
// MOCK BUSINESS STATS
// ==========================================
export const MOCK_BUSINESS_STATS: BusinessStats = {
    totalPatients: 120,
    highRiskPatients: 24,
    mediumRiskPatients: 48,
    lowRiskPatients: 48,
    predictionAccuracy: 87,
    newPatientsThisMonth: 8,
    averageAge: 48.5,
};

// ==========================================
// MOCK DISEASE PROGRESSION
// ==========================================
export const MOCK_DISEASE_PROGRESSION: DiseaseProgressionPoint[] = [
    { month: "Jan", patients: 110, highRisk: 28, mediumRisk: 45, lowRisk: 37 },
    { month: "Feb", patients: 112, highRisk: 26, mediumRisk: 46, lowRisk: 40 },
    { month: "Mar", patients: 115, highRisk: 25, mediumRisk: 47, lowRisk: 43 },
    { month: "Apr", patients: 116, highRisk: 24, mediumRisk: 48, lowRisk: 44 },
    { month: "May", patients: 118, highRisk: 24, mediumRisk: 48, lowRisk: 46 },
    { month: "Jun", patients: 120, highRisk: 24, mediumRisk: 48, lowRisk: 48 },
];

// ==========================================
// MOCK RISK FACTORS
// ==========================================
export const MOCK_RISK_FACTORS: RiskFactor[] = [
    { name: "Blood Glucose Levels", value: 35, category: "Metabolic" },
    { name: "BMI (Body Mass Index)", value: 25, category: "Physical" },
    { name: "Blood Pressure", value: 20, category: "Cardiovascular" },
    { name: "Age Factor", value: 20, category: "Demographic" },
];

// ==========================================
// MOCK REPORTS
// ==========================================
export const MOCK_REPORTS: Report[] = [
    {
        id: "r001",
        name: "Monthly Report - November 2025",
        type: "Monthly Summary",
        date: "2025-11-30",
        size: "2.4 MB",
        downloadUrl: "/reports/monthly-nov-2025.pdf",
    },
    {
        id: "r002",
        name: "Patient Risk Analysis Report",
        type: "Risk Analysis",
        date: "2025-11-25",
        size: "1.8 MB",
        downloadUrl: "/reports/risk-analysis-nov.pdf",
    },
    {
        id: "r003",
        name: "Quarterly Statistics Q4 2025",
        type: "Quarterly Report",
        date: "2025-11-20",
        size: "3.2 MB",
        downloadUrl: "/reports/q4-2025.pdf",
    }
];

// ==========================================
// MOCK ANALYTICS TRENDS
// ==========================================
export const MOCK_ANALYTICS_TRENDS: AnalyticsTrend[] = [
    { month: "Jan", totalPatients: 110, highRisk: 28, predictions: 450, accuracy: 84 },
    { month: "Feb", totalPatients: 112, highRisk: 26, predictions: 468, accuracy: 85 },
    { month: "Mar", totalPatients: 115, highRisk: 25, predictions: 482, accuracy: 86 },
    { month: "Apr", totalPatients: 116, highRisk: 24, predictions: 495, accuracy: 86 },
    { month: "May", totalPatients: 118, highRisk: 24, predictions: 510, accuracy: 87 },
    { month: "Jun", totalPatients: 120, highRisk: 24, predictions: 528, accuracy: 87 },
];

// ==========================================
// MOCK AI EXPLANATIONS
// ==========================================
export const MOCK_AI_EXPLANATIONS: Record<string, AIExplanation> = {
    p001: {
        patientId: "p001",
        factors: [
            {
                factor: "Blood Glucose Levels",
                impact: 0.35,
                explanation: "Consistently elevated glucose levels indicate poor diabetes control",
                recommendation: "Adjust medication dosage and implement strict diet control"
            },
            {
                factor: "BMI",
                impact: 0.25,
                explanation: "High BMI contributes to insulin resistance",
                recommendation: "Weight reduction program with nutritionist consultation"
            },
            {
                factor: "Blood Pressure",
                impact: 0.20,
                explanation: "Hypertension increases cardiovascular risk",
                recommendation: "Monitor BP regularly and consider medication adjustment"
            }
        ],
        overallRisk: 78,
        confidence: 89
    }
};

// ==========================================
// MOCK UPLOADED FILES
// ==========================================
export const MOCK_UPLOADED_FILES: UploadedFile[] = [
    {
        id: "f001",
        name: "patient_data_november.csv",
        type: "CSV",
        size: "2.1 MB",
        uploadDate: "2025-11-20",
        status: "Completed",
        records: 150
    },
    {
        id: "f002",
        name: "lab_results_october.xlsx",
        type: "Excel",
        size: "3.4 MB",
        uploadDate: "2025-11-18",
        status: "Processing",
        records: 89
    },
    {
        id: "f003",
        name: "medical_history_september.csv",
        type: "CSV",
        size: "1.8 MB",
        uploadDate: "2025-11-15",
        status: "Completed",
        records: 203
    }
];

// ==========================================
// MOCK SETTINGS
// ==========================================
export const MOCK_SETTINGS: Settings = {
    notifications: {
        email: true,
        sms: false,
        highRiskAlerts: true
    },
    dataRetention: {
        keepDataFor: 365,
        autoDelete: true
    },
    apiSettings: {
        predictionModel: "v2.1",
        updateFrequency: "daily"
    }
};

// ==========================================
// HELPER FUNCTIONS FOR ALL PAGES
// ==========================================

/**
 * Simulate API delay
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ==========================================
// DASHBOARD PAGE API FUNCTIONS
// ==========================================

export const getBusinessStats = async (): Promise<BusinessStats> => {
    await delay(500);
    return MOCK_BUSINESS_STATS;
};

export const getDiseaseProgression = async (): Promise<DiseaseProgressionPoint[]> => {
    await delay(500);
    return MOCK_DISEASE_PROGRESSION;
};

export const getRiskFactors = async (): Promise<RiskFactor[]> => {
    await delay(500);
    return MOCK_RISK_FACTORS;
};

// ==========================================
// PATIENTS PAGE API FUNCTIONS
// ==========================================

export const getAllPatients = async (searchQuery?: string, riskFilter?: string): Promise<Patient[]> => {
    await delay(500);

    let filteredPatients = MOCK_PATIENTS;

    if (searchQuery) {
        filteredPatients = filteredPatients.filter(patient =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (riskFilter && riskFilter !== 'All') {
        filteredPatients = filteredPatients.filter(patient => patient.risk === riskFilter);
    }

    return filteredPatients;
};

export const getPatientById = async (id: string): Promise<PatientDetails | null> => {
    await delay(500);
    return MOCK_PATIENT_DETAILS[id] || null;
};

export const getPatientsStats = async () => {
    await delay(200);
    return {
        total: MOCK_PATIENTS.length,
        highRisk: MOCK_PATIENTS.filter(p => p.risk === 'High').length,
        mediumRisk: MOCK_PATIENTS.filter(p => p.risk === 'Medium').length,
        lowRisk: MOCK_PATIENTS.filter(p => p.risk === 'Low').length,
    };
};

export const exportPatientsCSV = async (): Promise<string> => {
    await delay(800);

    const headers = ['ID', 'Name', 'Age', 'Gender', 'Risk Level', 'Last Visit', 'Email', 'Phone', 'Address'];
    const csvData = MOCK_PATIENTS.map(patient => [
        patient.id,
        patient.name,
        patient.age.toString(),
        patient.gender,
        patient.risk,
        patient.lastVisit,
        patient.email,
        patient.phone,
        patient.address
    ]);

    const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

    return csvContent;
};

// ==========================================
// ANALYTICS PAGE API FUNCTIONS
// ==========================================

export const getAnalyticsTrends = async (): Promise<AnalyticsTrend[]> => {
    await delay(600);
    return MOCK_ANALYTICS_TRENDS;
};

export const getPatientInsights = async () => {
    await delay(500);
    return {
        averageAge: MOCK_BUSINESS_STATS.averageAge,
        riskDistribution: {
            high: MOCK_BUSINESS_STATS.highRiskPatients,
            medium: MOCK_BUSINESS_STATS.mediumRiskPatients,
            low: MOCK_BUSINESS_STATS.lowRiskPatients
        },
        monthlyGrowth: 4.2
    };
};

// ==========================================
// AI EXPLANATIONS PAGE API FUNCTIONS
// ==========================================

export const getAIExplanation = async (patientId: string): Promise<AIExplanation | null> => {
    await delay(600);
    return MOCK_AI_EXPLANATIONS[patientId] || null;
};

export const getModelInsights = async () => {
    await delay(500);
    return {
        accuracy: MOCK_BUSINESS_STATS.predictionAccuracy,
        features: MOCK_RISK_FACTORS,
        modelVersion: "v2.1",
        lastUpdated: "2025-11-20"
    };
};

// ==========================================
// UPLOAD DATA PAGE API FUNCTIONS
// ==========================================

export const getUploadedFiles = async (): Promise<UploadedFile[]> => {
    await delay(500);
    return MOCK_UPLOADED_FILES;
};

export const uploadFile = async (file: File): Promise<{ success: boolean; fileId?: string; error?: string }> => {
    await delay(2000);

    // Simulate file upload
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        return { success: false, error: "File size too large" };
    }

    return {
        success: true,
        fileId: `f${Date.now()}`
    };
};

export const deleteUploadedFile = async (fileId: string): Promise<{ success: boolean }> => {
    await delay(500);
    return { success: true };
};

// ==========================================
// REPORTS PAGE API FUNCTIONS
// ==========================================

export const getReports = async (): Promise<Report[]> => {
    await delay(500);
    return MOCK_REPORTS;
};

export const generateBusinessReport = async (): Promise<{ reportId: string; downloadUrl: string }> => {
    await delay(2000);
    return {
        reportId: `rep${Date.now()}`,
        downloadUrl: "/reports/generated-report.pdf"
    };
};

export const downloadReport = async (reportId: string): Promise<Blob> => {
    await delay(1000);
    // Simulate PDF download
    return new Blob(["Mock PDF content"], { type: 'application/pdf' });
};

// ==========================================
// SETTINGS PAGE API FUNCTIONS
// ==========================================

export const getSettings = async (): Promise<Settings> => {
    await delay(400);
    return MOCK_SETTINGS;
};

export const updateSettings = async (settings: Partial<Settings>): Promise<{ success: boolean }> => {
    await delay(800);
    // In real app, this would update in database
    return { success: true };
};
// ==========================================
// ANALYTICS PAGE SPECIFIC DATA
// ==========================================

export interface PatientVitalSigns {
    heartRate: { value: number | string; unit: string; status: "normal" | "warning" | "danger" };
    glucose: { value: number | string; unit: string; status: "normal" | "warning" | "danger" };
    bloodPressure: { value: number | string; unit: string; status: "normal" | "warning" | "danger" };
    bloodSugar: { value: number | string; unit: string; status: "normal" | "warning" | "danger" };
}

export interface PatientAnalyticsData {
    patientId: string;
    patientName: string;
    vitalSigns: PatientVitalSigns;
    healthTrend: Array<{ month: string; glucose: number; bloodPressure: number }>;
    futureRisk: { value: number; status: string };
    riskFactors: Array<{ title: string; impact: "Low" | "Medium" | "High"; value: number }>;
}

// Mock data for analytics
export const MOCK_PATIENT_ANALYTICS: Record<string, PatientAnalyticsData> = {
    p001: {
        patientId: "p001",
        patientName: "Ahmed Ali Hassan",
        vitalSigns: {
            heartRate: { value: 78, unit: "bpm", status: "warning" },
            glucose: { value: 185, unit: "mg/dL", status: "danger" },
            bloodPressure: { value: "148/92", unit: "mmHg", status: "danger" },
            bloodSugar: { value: 185, unit: "mg/dL", status: "danger" },
        },
        healthTrend: [
            { month: "Jan", glucose: 170, bloodPressure: 142 },
            { month: "Feb", glucose: 175, bloodPressure: 144 },
            { month: "Mar", glucose: 180, bloodPressure: 145 },
            { month: "Apr", glucose: 182, bloodPressure: 146 },
            { month: "May", glucose: 183, bloodPressure: 147 },
            { month: "Jun", glucose: 185, bloodPressure: 148 },
        ],
        futureRisk: { value: 78, status: "High Risk - Action Required" },
        riskFactors: [
            { title: "Diet", impact: "High", value: 85 },
            { title: "Exercise", impact: "High", value: 80 },
            { title: "Medication Adherence", impact: "Medium", value: 65 },
            { title: "Stress Level", impact: "High", value: 75 },
        ],
    },
    p002: {
        patientId: "p002",
        patientName: "Mona Salah Ibrahim",
        vitalSigns: {
            heartRate: { value: 74, unit: "bpm", status: "normal" },
            glucose: { value: 118, unit: "mg/dL", status: "warning" },
            bloodPressure: { value: "132/85", unit: "mmHg", status: "warning" },
            bloodSugar: { value: 118, unit: "mg/dL", status: "warning" },
        },
        healthTrend: [
            { month: "Jan", glucose: 125, bloodPressure: 138 },
            { month: "Feb", glucose: 122, bloodPressure: 136 },
            { month: "Mar", glucose: 120, bloodPressure: 134 },
            { month: "Apr", glucose: 119, bloodPressure: 133 },
            { month: "May", glucose: 118, bloodPressure: 132 },
            { month: "Jun", glucose: 118, bloodPressure: 132 },
        ],
        futureRisk: { value: 52, status: "Moderate - Monitoring Required" },
        riskFactors: [
            { title: "Diet", impact: "Medium", value: 60 },
            { title: "Exercise", impact: "Medium", value: 55 },
            { title: "Medication Adherence", impact: "Low", value: 30 },
            { title: "Stress Level", impact: "Medium", value: 50 },
        ],
    },
    p003: {
        patientId: "p003",
        patientName: "Youssef Hamdy Mohamed",
        vitalSigns: {
            heartRate: { value: 68, unit: "bpm", status: "normal" },
            glucose: { value: 95, unit: "mg/dL", status: "normal" },
            bloodPressure: { value: "118/76", unit: "mmHg", status: "normal" },
            bloodSugar: { value: 95, unit: "mg/dL", status: "normal" },
        },
        healthTrend: [
            { month: "Jan", glucose: 92, bloodPressure: 116 },
            { month: "Feb", glucose: 93, bloodPressure: 117 },
            { month: "Mar", glucose: 94, bloodPressure: 117 },
            { month: "Apr", glucose: 94, bloodPressure: 118 },
            { month: "May", glucose: 95, bloodPressure: 118 },
            { month: "Jun", glucose: 95, bloodPressure: 118 },
        ],
        futureRisk: { value: 15, status: "Low Risk - Continue Current Lifestyle" },
        riskFactors: [
            { title: "Diet", impact: "Low", value: 20 },
            { title: "Exercise", impact: "Low", value: 15 },
            { title: "Medication Adherence", impact: "Low", value: 0 },
            { title: "Stress Level", impact: "Low", value: 25 },
        ],
    },
    p004: {
        patientId: "p004",
        patientName: "Sara Fathy Mahmoud",
        vitalSigns: {
            heartRate: { value: 82, unit: "bpm", status: "warning" },
            glucose: { value: 195, unit: "mg/dL", status: "danger" },
            bloodPressure: { value: "152/95", unit: "mmHg", status: "danger" },
            bloodSugar: { value: 195, unit: "mg/dL", status: "danger" },
        },
        healthTrend: [
            { month: "Jan", glucose: 180, bloodPressure: 145 },
            { month: "Feb", glucose: 185, bloodPressure: 147 },
            { month: "Mar", glucose: 188, bloodPressure: 149 },
            { month: "Apr", glucose: 190, bloodPressure: 150 },
            { month: "May", glucose: 192, bloodPressure: 151 },
            { month: "Jun", glucose: 195, bloodPressure: 152 },
        ],
        futureRisk: { value: 82, status: "Critical - Immediate Attention" },
        riskFactors: [
            { title: "Diet", impact: "High", value: 90 },
            { title: "Exercise", impact: "High", value: 85 },
            { title: "Meditation Adherence", impact: "High", value: 70 },
            { title: "Stress Level", impact: "High", value: 80 },
        ],
    },
    p005: {
        patientId: "p005",
        patientName: "Nour Hassan Ahmed",
        vitalSigns: {
            heartRate: { value: 70, unit: "bpm", status: "normal" },
            glucose: { value: 112, unit: "mg/dL", status: "normal" },
            bloodPressure: { value: "125/82", unit: "mmHg", status: "normal" },
            bloodSugar: { value: 112, unit: "mg/dL", status: "normal" },
        },
        healthTrend: [
            { month: "Jan", glucose: 118, bloodPressure: 130 },
            { month: "Feb", glucose: 116, bloodPressure: 128 },
            { month: "Mar", glucose: 114, bloodPressure: 127 },
            { month: "Apr", glucose: 113, bloodPressure: 126 },
            { month: "May", glucose: 112, bloodPressure: 125 },
            { month: "Jun", glucose: 112, bloodPressure: 125 },
        ],
        futureRisk: { value: 48, status: "Stable - Good Progress" },
        riskFactors: [
            { title: "Diet", impact: "Medium", value: 55 },
            { title: "Exercise", impact: "Low", value: 40 },
            { title: "Medication Adherence", impact: "Low", value: 25 },
            { title: "Stress Level", impact: "Medium", value: 45 },
        ],
    },
};

// API function for analytics
export const getPatientAnalytics = async (patientId: string): Promise<PatientAnalyticsData | null> => {
    await delay(500);
    return MOCK_PATIENT_ANALYTICS[patientId] || null;
};