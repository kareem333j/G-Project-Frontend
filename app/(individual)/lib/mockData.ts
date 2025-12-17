// app/(individual)/lib/mockData.ts
import {
    Patient,
    VitalSign,
    PredictionResult,
    ResultsPageData,
    DashboardData,
    HealthTrendPoint,
    RiskFactor,
    ActivityItem,
    AnalysisItem
} from './types';

// ============ بيانات المريض الأساسية ============
const MOCK_PATIENT: Patient = {
    id: 'p001',
    name: 'Ahmed Mohamed',
    initials: 'AM',
    age: 45,
    gender: 'male',
    risk: 'High',
    lastVisit: '2024-02-15',
    nextAppointment: '2024-03-20 10:30 AM',
    doctor: 'Dr. Sarah Johnson',
    email: 'ahmed.mohamed@example.com',
    phone: '+20 123 456 7890'
};

// ============ بيانات العلامات الحيوية ============
const MOCK_VITALS: VitalSign[] = [
    { id: '1', name: 'Heart Rate', value: 72, unit: 'bpm', status: 'normal', description: 'Normal Range', trend: 'stable' },
    { id: '2', name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', description: 'Normal Range', trend: 'stable' },
    { id: '3', name: 'Glucose Level', value: 115, unit: 'mg/dL', status: 'high', description: 'Above Normal', trend: 'up' },
    { id: '4', name: 'Blood Sugar', value: 115, unit: 'mg/L', status: 'high', description: 'Above Normal', trend: 'up' },
    { id: '5', name: 'Temperature', value: 36.8, unit: '°C', status: 'normal', description: 'Normal Range', trend: 'stable' },
    { id: '6', name: 'Oxygen Saturation', value: 96, unit: '%', status: 'normal', description: 'Normal Range', trend: 'stable' }
];

// ============ بيانات التنبؤ ============
const MOCK_PREDICTION: PredictionResult = {
    percentage: 71,
    riskLevel: 'High',
    message: 'High risk of disease progression in the next 3 months',
    additionalInfo: 'Immediate medical consultation and lifestyle changes are strongly recommended',
    confidence: 92,
    timeframe: '3 months'
};

// ============ بيانات التحليل ============
const MOCK_ANALYSIS: AnalysisItem[] = [
    { text: 'Elevated glucose levels indicating pre-diabetic condition', color: 'red' },
    { text: 'High risk of developing type 2 diabetes', color: 'red' },
    { text: 'Potential cardiovascular complications', color: 'red' },
    { text: 'Immediate lifestyle changes recommended', color: 'red' }
];

// ============ بيانات التوصيات ============
const MOCK_RECOMMENDATIONS: AnalysisItem[] = [
    { text: 'Consult with healthcare specialist immediately', color: 'green' },
    { text: 'Implement balanced diet with reduced carbohydrates', color: 'green' },
    { text: 'Regular physical activity (30 min daily)', color: 'green' },
    { text: 'Monitor blood sugar levels regularly', color: 'green' }
];

// ============ بيانات صفحة النتائج الكاملة ============
const MOCK_RESULTS_DATA: ResultsPageData = {
    patient: MOCK_PATIENT,
    vitals: MOCK_VITALS.slice(0, 4), // أول 4 علامات فقط للنتائج
    prediction: MOCK_PREDICTION,
    analysis: MOCK_ANALYSIS,
    recommendations: MOCK_RECOMMENDATIONS,
    lastUpdated: '2024-02-20 14:30'
};

// ============ بيانات الاتجاه الصحي ============
const MOCK_HEALTH_TREND: HealthTrendPoint[] = [
    { id: '1', month: 'Jan', risk: 65, healthScore: 70, visits: 2 },
    { id: '2', month: 'Feb', risk: 70, healthScore: 65, visits: 1 },
    { id: '3', month: 'Mar', risk: 58, healthScore: 75, visits: 3 },
    { id: '4', month: 'Apr', risk: 62, healthScore: 72, visits: 2 },
    { id: '5', month: 'May', risk: 55, healthScore: 78, visits: 1 },
    { id: '6', month: 'Jun', risk: 55, healthScore: 78, visits: 2 }
];

// ============ بيانات عوامل المخاطر ============
const MOCK_RISK_FACTORS: RiskFactor[] = [
    { id: '1', name: 'Diet & Nutrition', value: 35, impact: 'high', description: 'High carbohydrate intake' },
    { id: '2', name: 'Physical Activity', value: 25, impact: 'medium', description: 'Insufficient exercise' },
    { id: '3', name: 'Medication Adherence', value: 20, impact: 'medium', description: 'Missed doses occasionally' },
    { id: '4', name: 'Stress Levels', value: 20, impact: 'high', description: 'Work-related stress' },
    { id: '5', name: 'Sleep Quality', value: 15, impact: 'low', description: 'Irregular sleep patterns' },
    { id: '6', name: 'Smoking/Alcohol', value: 10, impact: 'low', description: 'Occasional social smoking' }
];

// ============ بيانات الأنشطة الحديثة ============
const MOCK_ACTIVITIES: ActivityItem[] = [
    {
        id: '1',
        type: 'measurement',
        title: 'Blood Pressure Check',
        description: 'Home monitoring - 140/90 mmHg',
        date: '2024-02-20',
        status: 'completed'
    },
    {
        id: '2',
        type: 'appointment',
        title: 'Cardiologist Visit',
        description: 'Follow-up consultation with Dr. Johnson',
        date: '2024-02-15',
        status: 'completed'
    },
    {
        id: '3',
        type: 'analysis',
        title: 'Risk Prediction Update',
        description: 'AI model updated risk assessment',
        date: '2024-02-18',
        status: 'completed'
    },
    {
        id: '4',
        type: 'appointment',
        title: 'Lab Tests',
        description: 'Blood work and glucose test',
        date: '2024-03-05',
        status: 'upcoming'
    }
];

// ============ بيانات تنبؤ الداشبورد ============
const MOCK_DASHBOARD_PREDICTION: PredictionResult = {
    percentage: 55,
    riskLevel: 'Medium',
    message: 'Moderate risk of disease progression in the next 6 months',
    additionalInfo: 'Continue monitoring and follow recommended lifestyle changes',
    confidence: 85,
    timeframe: '6 months'
};

// ============ بيانات صفحة الداشبورد الكاملة ============
const MOCK_DASHBOARD_DATA: DashboardData = {
    patient: MOCK_PATIENT,
    vitals: MOCK_VITALS,
    healthTrend: MOCK_HEALTH_TREND,
    riskFactors: MOCK_RISK_FACTORS,
    prediction: MOCK_DASHBOARD_PREDICTION,
    recentActivities: MOCK_ACTIVITIES,
    lastUpdated: '2024-02-20 14:30'
};

// ============ تصدير جميع البيانات ============
export {
    MOCK_PATIENT,
    MOCK_VITALS,
    MOCK_PREDICTION,
    MOCK_ANALYSIS,
    MOCK_RECOMMENDATIONS,
    MOCK_RESULTS_DATA,
    MOCK_HEALTH_TREND,
    MOCK_RISK_FACTORS,
    MOCK_ACTIVITIES,
    MOCK_DASHBOARD_DATA
};

// ============ لا تضيف أي export إضافي هنا ============