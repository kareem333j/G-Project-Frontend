"use client";
import { motion } from "framer-motion";
import MainButton from "@/components/custom/MainButton";

// تعريف الأنواع داخلياً
interface InstitutionFormData {
    name: string;
    businessType: string;
    expectedPatients: string;
    employees: string;
}

interface InstitutionFormProps {
    formData: InstitutionFormData;
    setFormData: React.Dispatch<React.SetStateAction<InstitutionFormData>>;
    handleContinue: () => void;
}

export function InstitutionForm({ formData, setFormData, handleContinue }: InstitutionFormProps) {
    const businessTypes = [
        { value: "hospital", label: "Hospital" },
        { value: "clinic", label: "Clinic" },
        { value: "pharmacy", label: "Pharmacy" },
        { value: "lab", label: "Medical Laboratory" },
        { value: "research", label: "Research Center" },
        { value: "other", label: "Other" }
    ];

    const employeeOptions = [
        { value: "0-1", label: "0-1 employees" },
        { value: "2-5", label: "2-5 employees" },
        { value: "5-10", label: "5-10 employees" },
        { value: "more-than-10", label: "More than 10" }
    ];

    const customSelectStyles = {
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233b82f6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 1rem center' as const,
        backgroundRepeat: 'no-repeat' as const,
        backgroundSize: '1.5em 1.5em',
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-[420px] space-y-6 "
        >
            {/* Institution Name */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-bluelight-1/90 mb-1 text-left">
                        Institution Name *
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter institution name"
                        className="w-full bg-white/50 dark:bg-gray-800/50 
                            border-2 border-bluelight-1/30 
                            rounded-2xl px-5 py-4 text-bluelight-1 
                            focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                            outline-none transition-all duration-300
                            placeholder:text-bluelight-1/50
                            text-base hover:border-bluelight-1/50"
                        required
                    />
                </div>
            </motion.div>

            {/* Business Type */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-bluelight-1/90 mb-1 text-left">
                        Business Type *
                    </label>
                    <div className="relative">
                        <select
                            value={formData.businessType}
                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                            className="w-full bg-white dark:bg-gray-800 
                                border-2 border-bluelight-1/40 
                                rounded-2xl px-5 py-4 text-gray-800 dark:text-gray-200
                                focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                                outline-none transition-all duration-300
                                hover:border-bluelight-1/60
                                cursor-pointer
                                text-base font-medium
                                shadow-sm hover:shadow-md
                                appearance-none"
                            style={customSelectStyles}
                            required
                        >
                            <option value="" disabled className="text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800">
                                Select institution type
                            </option>
                            {businessTypes.map((type) => (
                                <option
                                    key={type.value}
                                    value={type.value}
                                    className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 py-2"
                                >
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Expected Patients */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-bluelight-1/90 mb-1 text-left">
                        Expected Monthly Patients *
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={formData.expectedPatients}
                        onChange={(e) => setFormData({ ...formData, expectedPatients: e.target.value })}
                        placeholder="e.g., 1000"
                        className="w-full bg-white/50 dark:bg-gray-800/50 
                            border-2 border-bluelight-1/30 
                            rounded-2xl px-5 py-4 text-bluelight-1 
                            focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                            outline-none transition-all duration-300
                            placeholder:text-bluelight-1/50
                            text-base hover:border-bluelight-1/50"
                        required
                    />
                </div>
            </motion.div>

            {/* Number of Employees */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
            >
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-bluelight-1/90 mb-1 text-left">
                        Number of Employees *
                    </label>
                    <div className="relative">
                        <select
                            value={formData.employees}
                            onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                            className="w-full bg-white dark:bg-gray-800 
                                border-2 border-bluelight-1/40 
                                rounded-2xl px-5 py-4 text-gray-800 dark:text-gray-200
                                focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                                outline-none transition-all duration-300
                                hover:border-bluelight-1/60
                                cursor-pointer
                                text-base font-medium
                                shadow-sm hover:shadow-md
                                appearance-none"
                            style={customSelectStyles}
                            required
                        >
                            <option value="" disabled className="text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800">
                                Select employee count
                            </option>
                            {employeeOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 py-2"
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Continue Button */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="pt-4"
            >
                <MainButton
                    onClick={handleContinue}
                    className="w-full text-[1.05rem] sm:text-[1.15rem] 
                        px-8 py-4 border-2 border-bluelight-2 
                        bg-gradient-to-r from-bluelight-2 to-bluelight-1
                        hover:from-bluelight-1 hover:to-bluelight-2
                        text-white font-semibold
                        rounded-2xl transition-all duration-300
                        hover:scale-[1.02] active:scale-[0.98]
                        shadow-lg hover:shadow-xl"
                    background="bg-gradient-to-r from-bluelight-2 to-bluelight-1 
                        w-full h-full bottom-0 group-hover:bottom-full"
                >
                    <span className="flex items-center justify-center gap-3">
                        <span>Continue to Registration</span>
                        <span className="text-lg">→</span>
                    </span>
                </MainButton>


            </motion.div>
        </motion.div>
    );
}