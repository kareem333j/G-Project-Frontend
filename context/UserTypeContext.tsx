// /context/UserTypeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// تعريف نوعين فقط
export type UserType = 'individual' | 'business';

// نوع البيانات المخزنة
interface UserDetails {
    id?: string;
    email?: string;
    name?: string;
    businessName?: string;
    role?: string;
    [key: string]: any;
}

// نوع Context
interface UserTypeContextType {
    userType: UserType;
    setUserType: (type: UserType) => void;
    userDetails: UserDetails | null;
    setUserDetails: (details: UserDetails | null) => void;
    isAuthenticated: boolean;
    login: (type: UserType, credentials: { email: string; password: string }) => Promise<void>;
    register: (type: UserType, data: any) => Promise<void>;
    logout: () => void;
}

// القيمة الافتراضية
const defaultContext: UserTypeContextType = {
    userType: 'individual',
    setUserType: () => { },
    userDetails: null,
    setUserDetails: () => { },
    isAuthenticated: false,
    login: async () => { },
    register: async () => { },
    logout: () => { }
};

// إنشاء Context
const UserTypeContext = createContext<UserTypeContextType>(defaultContext);

// Props للموفر
interface UserTypeProviderProps {
    children: ReactNode;
}

// الموفر الرئيسي
export function UserTypeProvider({ children }: UserTypeProviderProps) {
    const [userType, setUserType] = useState<UserType>('individual');
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // استعادة حالة المستخدم من localStorage عند التحميل
    useEffect(() => {
        const loadUserData = () => {
            try {
                const savedType = localStorage.getItem('userType') as UserType;
                const savedDetails = localStorage.getItem('userDetails');
                const savedAuth = localStorage.getItem('isAuthenticated');

                if (savedType) {
                    setUserType(savedType);
                }
                if (savedDetails) {
                    setUserDetails(JSON.parse(savedDetails));
                }
                if (savedAuth === 'true') {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    // وظيفة تسجيل الدخول
    const login = async (type: UserType, credentials: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            // محاكاة API call
            console.log(`Logging in as ${type}`, credentials);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // بيانات وهمية للاختبار
            const mockUserDetails: UserDetails = {
                id: Math.random().toString(36).substring(7),
                email: credentials.email,
                name: type === 'individual' ? 'John Doe' : 'MedCorp Inc.',
                businessName: type === 'business' ? 'MedCorp Inc.' : undefined,
                role: type,
                createdAt: new Date().toISOString()
            };

            // تحديث الحالة
            setUserType(type);
            setUserDetails(mockUserDetails);
            setIsAuthenticated(true);

            // حفظ في localStorage
            localStorage.setItem('userType', type);
            localStorage.setItem('userDetails', JSON.stringify(mockUserDetails));
            localStorage.setItem('isAuthenticated', 'true');

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // وظيفة التسجيل
    const register = async (type: UserType, data: any) => {
        setIsLoading(true);
        try {
            // محاكاة API call للتسجيل
            console.log(`Registering as ${type}`, data);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // بيانات وهمية بعد التسجيل
            const newUserDetails: UserDetails = {
                id: Math.random().toString(36).substring(7),
                email: data.email,
                name: type === 'individual' ? data.name || 'New User' : data.businessName || 'New Business',
                businessName: type === 'business' ? data.businessName : undefined,
                role: type,
                createdAt: new Date().toISOString(),
                ...data
            };

            // تحديث الحالة
            setUserType(type);
            setUserDetails(newUserDetails);
            setIsAuthenticated(true);

            // حفظ في localStorage
            localStorage.setItem('userType', type);
            localStorage.setItem('userDetails', JSON.stringify(newUserDetails));
            localStorage.setItem('isAuthenticated', 'true');

        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // وظيفة تسجيل الخروج
    const logout = () => {
        setUserType('individual');
        setUserDetails(null);
        setIsAuthenticated(false);

        // حذف من localStorage
        localStorage.removeItem('userType');
        localStorage.removeItem('userDetails');
        localStorage.removeItem('isAuthenticated');
    };

    // القيمة التي يتم تمريرها
    const contextValue: UserTypeContextType = {
        userType,
        setUserType,
        userDetails,
        setUserDetails,
        isAuthenticated,
        login,
        register,
        logout
    };

    // إرجاع الموفر
    return (
        <UserTypeContext.Provider value={contextValue}>
            {children}
        </UserTypeContext.Provider>
    );
}

// هوك لاستخدام Context
export function useUserType() {
    const context = useContext(UserTypeContext);

    if (context === undefined) {
        throw new Error('useUserType must be used within a UserTypeProvider');
    }

    return context;
}

// تصدير الـ Context نفسه إذا احتجته
export default UserTypeContext;