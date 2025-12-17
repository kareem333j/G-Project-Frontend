// types/index.ts
export type UserType = 'individual' | 'doctor' | 'institution';

export interface BaseFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DoctorExtraData {
  doctorName: string;
  specialty: string;
  expectedPatients: number;
  isAffiliated: boolean;
  institutionId?: string;
}

export interface InstitutionExtraData {
  institutionName: string;
  businessType: string;
  expectedPatients: number;
  employees: string;
}

export interface IndividualExtraData {
  fullName: string;
  age?: number;
  gender?: string;
}

export interface RegisterData {
  userType: UserType;
  formData: BaseFormData;
  doctorData: DoctorExtraData;
  institutionData: InstitutionExtraData;
  individualData: IndividualExtraData;
  isLoading: boolean;
  errors: Record<string, string>;
}

export interface RegisterContextType {
  state: RegisterData;
  setUserType: (type: UserType) => void;
  updateFormData: (data: Partial<BaseFormData>) => void;
  updateDoctorData: (data: Partial<DoctorExtraData>) => void;
  updateInstitutionData: (data: Partial<InstitutionExtraData>) => void;
  updateIndividualData: (data: Partial<IndividualExtraData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (field: string, message: string) => void;
  clearErrors: () => void;
  submitRegistration: () => Promise<void>;
}