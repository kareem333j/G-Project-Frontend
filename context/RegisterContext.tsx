"use client";
import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  UserType,
  RegisterData,
  RegisterContextType,
  BaseFormData,
  DoctorExtraData,
  InstitutionExtraData,
  IndividualExtraData
} from '../app/(auth)/types';

const initialState: RegisterData = {
  userType: 'individual',
  formData: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  doctorData: {
    doctorName: '',
    specialty: '',
    expectedPatients: 0,
    isAffiliated: false
  },
  institutionData: {
    institutionName: '',
    businessType: '',
    expectedPatients: 0,
    employees: ''
  },
  individualData: {
    fullName: ''
  },
  isLoading: false,
  errors: {}
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister must be used within RegisterProvider');
  }
  return context;
};

interface RegisterProviderProps {
  children: ReactNode;
}

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<RegisterData>(() => {
    // تهيئة البيانات من URL إذا وجدت
    const typeFromUrl = searchParams?.get('type') as UserType;
    const initialUserType = typeFromUrl || 'individual';

    if (typeFromUrl === 'doctor') {
      return {
        ...initialState,
        userType: 'doctor',
        doctorData: {
          ...initialState.doctorData,
          doctorName: searchParams?.get('name') || '',
          specialty: searchParams?.get('businessType') || '',
          expectedPatients: parseInt(searchParams?.get('expectedPatients') || '0'),
          isAffiliated: searchParams?.get('affiliated') === 'yes',
          institutionId: searchParams?.get('institutionId') || ''
        }
      };
    }

    if (typeFromUrl === 'institution') {
      return {
        ...initialState,
        userType: 'institution',
        institutionData: {
          ...initialState.institutionData,
          institutionName: searchParams?.get('name') || '',
          businessType: searchParams?.get('businessType') || '',
          expectedPatients: parseInt(searchParams?.get('expectedPatients') || '0'),
          employees: searchParams?.get('employees') || ''
        }
      };
    }

    return { ...initialState, userType: initialUserType };
  });

  // دوال تحديث الحالة
  const setUserType = (type: UserType) => {
    setState(prev => ({ ...prev, userType: type }));
  };

  const updateFormData = (data: Partial<BaseFormData>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...data }
    }));
  };

  const updateDoctorData = (data: Partial<DoctorExtraData>) => {
    setState(prev => ({
      ...prev,
      doctorData: { ...prev.doctorData, ...data }
    }));
  };

  const updateInstitutionData = (data: Partial<InstitutionExtraData>) => {
    setState(prev => ({
      ...prev,
      institutionData: { ...prev.institutionData, ...data }
    }));
  };

  const updateIndividualData = (data: Partial<IndividualExtraData>) => {
    setState(prev => ({
      ...prev,
      individualData: { ...prev.individualData, ...data }
    }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setError = (field: string, message: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: message }
    }));
  };

  const clearErrors = () => {
    setState(prev => ({ ...prev, errors: {} }));
  };

  // التحقق من البيانات
  const validateForm = (): boolean => {
    clearErrors();
    let isValid = true;

    // التحقق من البيانات الأساسية
    if (!state.formData.username.trim()) {
      setError('username', 'Username is required');
      isValid = false;
    }

    if (!state.formData.email.trim()) {
      setError('email', 'Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.formData.email)) {
      setError('email', 'Email is invalid');
      isValid = false;
    }

    if (!state.formData.password) {
      setError('password', 'Password is required');
      isValid = false;
    } else if (state.formData.password.length < 6) {
      setError('password', 'Password must be at least 6 characters');
      isValid = false;
    }

    if (state.formData.password !== state.formData.confirmPassword) {
      setError('confirmPassword', 'Passwords do not match');
      isValid = false;
    }

    // التحقق من البيانات الخاصة بكل نوع
    switch (state.userType) {
      case 'doctor':
        if (!state.doctorData.doctorName.trim()) {
          setError('doctorName', 'Doctor name is required');
          isValid = false;
        }
        if (!state.doctorData.specialty) {
          setError('specialty', 'Specialty is required');
          isValid = false;
        }
        if (state.doctorData.isAffiliated && !state.doctorData.institutionId) {
          setError('institutionId', 'Institution ID is required');
          isValid = false;
        }
        break;

      case 'institution':
        if (!state.institutionData.institutionName.trim()) {
          setError('institutionName', 'Institution name is required');
          isValid = false;
        }
        if (!state.institutionData.businessType) {
          setError('businessType', 'Business type is required');
          isValid = false;
        }
        if (!state.institutionData.employees) {
          setError('employees', 'Number of employees is required');
          isValid = false;
        }
        break;

      case 'individual':
        if (!state.individualData.fullName.trim()) {
          setError('fullName', 'Full name is required');
          isValid = false;
        }
        break;
    }

    return isValid;
  };

  // إرسال البيانات
  const submitRegistration = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // تحضير البيانات للإرسال
      const registrationData = {
        userType: state.userType,
        account: {
          username: state.formData.username,
          email: state.formData.email,
          password: state.formData.password
        },
        profile: (() => {
          switch (state.userType) {
            case 'doctor':
              return {
                ...state.doctorData,
                registrationDate: new Date().toISOString()
              };
            case 'institution':
              return {
                ...state.institutionData,
                registrationDate: new Date().toISOString()
              };
            case 'individual':
              return {
                ...state.individualData,
                registrationDate: new Date().toISOString()
              };
          }
        })(),
        metadata: {
          source: 'web-registration',
          timestamp: new Date().toISOString()
        }
      };

      // TODO: استبدل هذا بـ API call حقيقي
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registrationData)
      // });

      await new Promise(resolve => setTimeout(resolve, 1500)); // محاكاة API

      // نجاح التسجيل
      let successMessage = '';
      let redirectPath = '';

      switch (state.userType) {
        case 'doctor':
          successMessage = `Welcome Dr. ${state.doctorData.doctorName}!`;
          redirectPath = '/dashboard-doctor';
          break;
        case 'institution':
          successMessage = `Welcome ${state.institutionData.institutionName}!`;
          redirectPath = '/dashboard-institution';
          break;
        case 'individual':
          successMessage = `Welcome ${state.individualData.fullName}!`;
          redirectPath = '/dashboard';
          break;
      }

      alert(successMessage);
      router.push(redirectPath);

    } catch (error) {
      setError('general', 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: RegisterContextType = {
    state,
    setUserType,
    updateFormData,
    updateDoctorData,
    updateInstitutionData,
    updateIndividualData,
    setLoading,
    setError,
    clearErrors,
    submitRegistration
  };

  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
};