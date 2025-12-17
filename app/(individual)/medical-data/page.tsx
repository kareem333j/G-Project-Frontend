"use client";
import { motion } from "framer-motion";
import Title from "@/components/custom/Title";
import SubTitle from "@/components/custom/SubTitle";
import MainButton from "@/components/custom/MainButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MedicalDataForm = () => {
    const [formData, setFormData] = useState({
        age: "",
        bloodPressure: "",
        bloodSugar: "",
        bmi: "",
        additionalInfo: "",
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.age || parseFloat(formData.age) <= 0 || parseFloat(formData.age) > 150) {
            newErrors.age = "Please enter a valid age (1-150)";
        }
        
        if (!formData.bloodPressure || !/^\d+\/\d+\s*(mmHg)?$/i.test(formData.bloodPressure.trim())) {
            newErrors.bloodPressure = "Please enter blood pressure in format: 120/80 mmHg";
        }
        
        if (!formData.bloodSugar || parseFloat(formData.bloodSugar) <= 0 || parseFloat(formData.bloodSugar) > 1000) {
            newErrors.bloodSugar = "Please enter a valid blood sugar level (mg/dL)";
        }
        
        if (!formData.bmi || parseFloat(formData.bmi) <= 0 || parseFloat(formData.bmi) > 100) {
            newErrors.bmi = "Please enter a valid BMI (1-100)";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePredict = async () => {
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push("/results");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.age && formData.bloodPressure && formData.bloodSugar && formData.bmi && Object.keys(errors).length === 0;

    return (
        <div className="min-h-screen bg-cover bg-center py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                {/* Theme Toggle - إما تمسح السطر ده أو تستورد الكومبوننت */}
                {/* <div className="flex justify-end mb-6">
          <ThemeToggleDefault />
        </div> */}

                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-bluelight-1 mb-3 sm:mb-4 px-2">
                        AI Disease Progression Predictor
                    </Title>
                    <SubTitle className="text-base sm:text-lg md:text-xl text-bluelight-1/70 px-2">
                        Enter Patient Information
                    </SubTitle>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 sm:space-y-8"
                >
                    {/* Required Information Section */}
                    <div className="space-y-4 sm:space-y-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-2">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Age */}
                            <div>
                                <label className="text-bluelight-1 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 block font-medium">Age <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    placeholder="Enter age"
                                    value={formData.age}
                                    onChange={(e) => handleChange("age", e.target.value)}
                                    className={`w-full bg-transparent border-2 ${errors.age ? 'border-red-500 dark:border-red-400' : 'border-bluelight-1/40'} rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 md:py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-sm sm:text-base md:text-lg`}
                                    aria-invalid={!!errors.age}
                                    aria-describedby={errors.age ? "age-error" : undefined}
                                />
                                {errors.age && (
                                    <p id="age-error" className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
                                        {errors.age}
                                    </p>
                                )}
                            </div>

                            {/* Blood Pressure */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">Blood Pressure <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g., 120/80 mmHg"
                                    value={formData.bloodPressure}
                                    onChange={(e) => handleChange("bloodPressure", e.target.value)}
                                    className={`w-full bg-transparent border-2 ${errors.bloodPressure ? 'border-red-500 dark:border-red-400' : 'border-bluelight-1/40'} rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg`}
                                    aria-invalid={!!errors.bloodPressure}
                                    aria-describedby={errors.bloodPressure ? "bloodPressure-error" : undefined}
                                />
                                {errors.bloodPressure && (
                                    <p id="bloodPressure-error" className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
                                        {errors.bloodPressure}
                                    </p>
                                )}
                            </div>

                            {/* Blood Sugar */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">Blood Sugar <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    placeholder="mg/dL"
                                    value={formData.bloodSugar}
                                    onChange={(e) => handleChange("bloodSugar", e.target.value)}
                                    className={`w-full bg-transparent border-2 ${errors.bloodSugar ? 'border-red-500 dark:border-red-400' : 'border-bluelight-1/40'} rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg`}
                                    aria-invalid={!!errors.bloodSugar}
                                    aria-describedby={errors.bloodSugar ? "bloodSugar-error" : undefined}
                                />
                                {errors.bloodSugar && (
                                    <p id="bloodSugar-error" className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
                                        {errors.bloodSugar}
                                    </p>
                                )}
                            </div>

                            {/* BMI */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">BMI <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="Enter BMI"
                                    value={formData.bmi}
                                    onChange={(e) => handleChange("bmi", e.target.value)}
                                    className={`w-full bg-transparent border-2 ${errors.bmi ? 'border-red-500 dark:border-red-400' : 'border-bluelight-1/40'} rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg`}
                                    aria-invalid={!!errors.bmi}
                                    aria-describedby={errors.bmi ? "bmi-error" : undefined}
                                />
                                {errors.bmi && (
                                    <p id="bmi-error" className="text-red-500 dark:text-red-400 text-sm mt-1" role="alert">
                                        {errors.bmi}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-bluelight-1/30 my-8"></div>

                    {/* Optional Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-2">
                            Additional Information (Optional)
                        </h3>

                        {/* Additional Info Textarea */}
                        <div>
                            <label className="text-bluelight-1 text-lg mb-3 block font-medium">More Information</label>
                            <textarea
                                placeholder="Enter any additional health information, symptoms, or notes..."
                                value={formData.additionalInfo}
                                onChange={(e) => handleChange("additionalInfo", e.target.value)}
                                rows={4}
                                className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg resize-none"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="text-bluelight-1 text-sm sm:text-base md:text-lg mb-2 sm:mb-3 block font-medium">Upload File (Optional)</label>
                            <div className="border-2 border-bluelight-1/40 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 text-center hover:border-bluelight-2 transition-all duration-300">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className="text-bluelight-2 hover:text-bluelight-1 transition-all duration-300 text-lg">
                                        {selectedFile ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-2xl">📄</span>
                                                <span>{selectedFile.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-2xl">📁</span>
                                                <span>Click to upload medical file</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-bluelight-1/60 text-sm mt-2">
                                        Supported formats: PDF, JPG, PNG, DOC (Max 10MB)
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Predict Button */}
                    <div className="pt-6 sm:pt-8">
                        <MainButton
                            onClick={handlePredict}
                            disabled={!isFormValid || isSubmitting}
                            className={`w-full text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 border transition-all duration-300 ${isFormValid && !isSubmitting
                                ? "bg-bluelight-2 hover:bg-transparent"
                                : "bg-bluelight-2/50 cursor-not-allowed opacity-60"
                                }`}
                            background={isFormValid && !isSubmitting ? "bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full" : ""}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Predict"
                            )}
                        </MainButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MedicalDataForm;