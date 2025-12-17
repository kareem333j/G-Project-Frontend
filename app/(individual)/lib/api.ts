// app/(individual)/lib/api.ts
import {
    MOCK_RESULTS_DATA,
    MOCK_DASHBOARD_DATA,
    MOCK_PATIENT,
    MOCK_VITALS,
    MOCK_PREDICTION,
    MOCK_ANALYSIS,
    MOCK_RECOMMENDATIONS,
    MOCK_HEALTH_TREND,
    MOCK_RISK_FACTORS,
    MOCK_ACTIVITIES
} from './mockData';

import {
    ResultsPageData,
    DashboardData,
    Patient,
    VitalSign,
    PredictionResult,
    HealthTrendPoint,
    RiskFactor,
    ActivityItem,
    AnalysisItem
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ============ دالة مساعدة للـ API calls ============
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        if (API_BASE_URL && API_BASE_URL !== 'http://localhost:3000') {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return data as T;
        }

        // Fallback to mock data if no real API URL
        console.log(`[Mock API] Using mock data for: ${endpoint}`);
        return getMockData<T>(endpoint);
    } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        console.log(`[Mock API] Fallback to mock data for: ${endpoint}`);
        return getMockData<T>(endpoint);
    }
}

// ============ دالة للحصول على البيانات التجريبية ============
function getMockData<T>(endpoint: string): T {
    switch (endpoint) {
        // صفحة النتائج
        case '/api/results':
        case '/api/results/data':
            return MOCK_RESULTS_DATA as T;

        case '/api/results/vitals':
            return MOCK_VITALS.slice(0, 4) as T;

        case '/api/results/prediction':
            return MOCK_PREDICTION as T;

        case '/api/results/analysis':
            return MOCK_ANALYSIS as T;

        case '/api/results/recommendations':
            return MOCK_RECOMMENDATIONS as T;

        // صفحة الداشبورد
        case '/api/dashboard':
        case '/api/dashboard/data':
            return MOCK_DASHBOARD_DATA as T;

        case '/api/dashboard/vitals':
            return MOCK_VITALS as T;

        case '/api/dashboard/health-trend':
            return MOCK_HEALTH_TREND as T;

        case '/api/dashboard/risk-factors':
            return MOCK_RISK_FACTORS as T;

        case '/api/dashboard/activities':
            return MOCK_ACTIVITIES as T;

        case '/api/dashboard/prediction':
            return MOCK_DASHBOARD_DATA.prediction as T;

        // بيانات المريض
        case '/api/patient':
        case '/api/user/profile':
            return MOCK_PATIENT as T;

        // جميع البيانات
        case '/api/all':
            return {
                patient: MOCK_PATIENT,
                results: MOCK_RESULTS_DATA,
                dashboard: MOCK_DASHBOARD_DATA
            } as T;

        default:
            console.warn(`No mock data for endpoint: ${endpoint}, returning empty object`);
            return {} as T;
    }
}

// ============ API functions ============
export const api = {
    // ============ Results Page API ============
    getResultsData: (): Promise<ResultsPageData> =>
        fetchAPI<ResultsPageData>('/api/results'),

    getVitalSigns: (): Promise<VitalSign[]> =>
        fetchAPI<VitalSign[]>('/api/results/vitals'),

    getPrediction: (): Promise<PredictionResult> =>
        fetchAPI<PredictionResult>('/api/results/prediction'),

    getAnalysis: (): Promise<AnalysisItem[]> =>
        fetchAPI<AnalysisItem[]>('/api/results/analysis'),

    getRecommendations: (): Promise<AnalysisItem[]> =>
        fetchAPI<AnalysisItem[]>('/api/results/recommendations'),

    // ============ Dashboard Page API ============
    getDashboardData: (): Promise<DashboardData> =>
        fetchAPI<DashboardData>('/api/dashboard'),

    getDashboardVitals: (): Promise<VitalSign[]> =>
        fetchAPI<VitalSign[]>('/api/dashboard/vitals'),

    getHealthTrend: (): Promise<HealthTrendPoint[]> =>
        fetchAPI<HealthTrendPoint[]>('/api/dashboard/health-trend'),

    getRiskFactors: (): Promise<RiskFactor[]> =>
        fetchAPI<RiskFactor[]>('/api/dashboard/risk-factors'),

    getActivities: (): Promise<ActivityItem[]> =>
        fetchAPI<ActivityItem[]>('/api/dashboard/activities'),

    getDashboardPrediction: (): Promise<PredictionResult> =>
        fetchAPI<PredictionResult>('/api/dashboard/prediction'),

    // ============ Patient Data API ============
    getPatientData: (): Promise<Patient> =>
        fetchAPI<Patient>('/api/patient'),

    // ============ Update/Submit API ============
    updateProfile: (data: Partial<Patient>): Promise<{ success: boolean; message: string }> =>
        fetchAPI('/api/profile/update', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

    submitHealthData: (data: any): Promise<{ success: boolean; prediction?: PredictionResult }> =>
        fetchAPI('/api/health/submit', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

    generateReport: (userId: string): Promise<{ success: boolean; url?: string; message?: string }> =>
        fetchAPI('/api/reports/generate', {
            method: 'POST',
            body: JSON.stringify({ userId })
        }),

    // ============ Utility Functions ============
    simulateLoading: (delay = 800): Promise<void> =>
        new Promise(resolve => setTimeout(resolve, delay)),

    // دالة للحصول على جميع البيانات مرة واحدة
    getAllData: () => fetchAPI('/api/all')
};

// ============ Export default ============
export default api;