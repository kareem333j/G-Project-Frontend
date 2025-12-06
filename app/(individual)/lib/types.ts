// app/(individual)/lib/types.ts

// ============ أنواع أساسية ============
export type RiskLevel = 'High' | 'Medium' | 'Low';
export type HealthStatus = 'normal' | 'high' | 'low';
export type ActivityStatus = 'completed' | 'upcoming' | 'missed';
export type TrendDirection = 'up' | 'down' | 'stable';

// ============ أنواع المريض ============
export interface Patient {
    id: string;
    name: string;
    initials: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    risk: RiskLevel;
    lastVisit: string;
    nextAppointment?: string;
    doctor: string;
    email?: string;
    phone?: string;
}

// ============ أنواع العلامات الحيوية ============
export interface VitalSign {
    id: string;
    name: string;
    value: string | number;
    unit: string;
    status: HealthStatus;
    description?: string;
    trend?: TrendDirection;
}

// ============ أنواع التنبؤ ============
export interface PredictionResult {
    percentage: number;
    riskLevel: RiskLevel;
    message: string;
    additionalInfo: string;
    confidence?: number;
    timeframe?: string;
}

// ============ أنواع التحليل والتوصيات ============
export interface AnalysisItem {
    text: string;
    color: 'red' | 'green' | 'yellow' | 'blue';
    icon?: string;
}

// ============ أنواع صفحة النتائج ============
export interface ResultsPageData {
    patient: Patient;
    vitals: VitalSign[];
    prediction: PredictionResult;
    analysis: AnalysisItem[];
    recommendations: AnalysisItem[];
    lastUpdated: string;
}

// ============ أنواع الاتجاه الصحي ============
export interface HealthTrendPoint {
    id: string;
    month: string;
    risk: number;
    healthScore: number;
    visits: number;
}

// ============ أنواع عوامل المخاطر ============
export interface RiskFactor {
    id: string;
    name: string;
    value: number;
    impact: 'high' | 'medium' | 'low';
    description: string;
}

// ============ أنواع الأنشطة ============
export interface ActivityItem {
    id: string;
    type: 'measurement' | 'appointment' | 'medication' | 'analysis';
    title: string;
    description: string;
    date: string;
    status: ActivityStatus;
}

// ============ أنواع صفحة الداشبورد ============
export interface DashboardData {
    patient: Patient;
    vitals: VitalSign[];
    healthTrend: HealthTrendPoint[];
    riskFactors: RiskFactor[];
    prediction: PredictionResult;
    recentActivities: ActivityItem[];
    lastUpdated: string;
}

// ============ أنواع إعدادات الرسم البياني ============
export interface ChartConfig {
    cartesianGrid: {
        strokeDasharray: string;
        stroke: string;
        opacity: number;
    };
    axis: {
        stroke: string;
        fontSize: number;
        fill?: string;
    };
    tooltip: {
        contentStyle: {
            backgroundColor: string;
            border: string;
            borderRadius: string;
            color: string;
            backdropFilter?: string;
        };
    };
}

// ============ ثوابت الألوان ============
export const CHART_COLORS = ['#0EB2B1', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'];
export const RISK_COLORS = {
    High: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' },
    Medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/30' },
    Low: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' }
};