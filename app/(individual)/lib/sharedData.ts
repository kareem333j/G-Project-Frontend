// app/(individual)/lib/shared.ts

// ============ دوال مساعدة للأنواع ============
export const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
        case 'High': return {
            bg: 'bg-red-500/10',
            text: 'text-red-500',
            border: 'border-red-500/30',
            gradient: 'from-red-500/20 to-red-600/10'
        };
        case 'Medium': return {
            bg: 'bg-yellow-500/10',
            text: 'text-yellow-500',
            border: 'border-yellow-500/30',
            gradient: 'from-yellow-500/20 to-yellow-600/10'
        };
        case 'Low': return {
            bg: 'bg-green-500/10',
            text: 'text-green-500',
            border: 'border-green-500/30',
            gradient: 'from-green-500/20 to-green-600/10'
        };
        default: return {
            bg: 'bg-gray-500/10',
            text: 'text-gray-500',
            border: 'border-gray-500/30',
            gradient: 'from-gray-500/20 to-gray-600/10'
        };
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case 'high': return 'text-red-500';
        case 'low': return 'text-yellow-500';
        case 'normal': return 'text-green-500';
        default: return 'text-gray-500';
    }
};

export const getStatusBadge = (status: string) => {
    switch (status) {
        case 'high': return { text: 'High', color: 'bg-red-100 text-red-800' };
        case 'low': return { text: 'Low', color: 'bg-yellow-100 text-yellow-800' };
        case 'normal': return { text: 'Normal', color: 'bg-green-100 text-green-800' };
        default: return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
};

// ============ دوال تنسيق البيانات ============
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

export const formatVitalValue = (vital: { value: string | number; unit: string }): string => {
    return `${vital.value} ${vital.unit}`;
};

// ============ ثوابت التطبيق ============
export const APP_CONFIG = {
    colors: {
        primary: '#0EB2B1', // bluelight-1
        secondary: '#4A90E2', // bluelight-2
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6'
    },
    chart: {
        colors: ['#0EB2B1', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#10B981'],
        config: {
            cartesianGrid: {
                strokeDasharray: '3 3',
                stroke: '#0EB2B1',
                opacity: 0.3,
            },
            axis: {
                stroke: '#0EB2B1',
                fontSize: 12,
                fill: '#0EB2B1',
            },
            tooltip: {
                contentStyle: {
                    backgroundColor: 'rgba(14, 178, 177, 0.95)',
                    border: '1px solid #0EB2B1',
                    borderRadius: '8px',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                },
            },
        }
    },
    thresholds: {
        highRisk: 70,
        mediumRisk: 40,
        lowRisk: 0
    }
};

// ============ دوال التحقق ============
export const isValidPatientData = (data: any): boolean => {
    return data &&
        data.id &&
        data.name &&
        data.age &&
        data.risk;
};

export const isValidVitalSign = (vital: any): boolean => {
    return vital &&
        vital.id &&
        vital.name &&
        vital.value !== undefined &&
        vital.unit &&
        vital.status;
};

// ============ دوال محاكاة ============
export const simulateAPIResponse = <T>(data: T, delay = 500): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

// ============ دوال localStorage ============
export const storage = {
    set: (key: string, value: any): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    get: (key: string): any => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    remove: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },

    clear: (): void => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};