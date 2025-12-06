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
    const router = useRouter();

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handlePredict = () => {
        // هنا هتتعامل مع البيانات وتروح لصفحة النتائج
        console.log("Form Data:", formData);
        console.log("Selected File:", selectedFile);
        router.push("/individual/results");
    };

    const isFormValid = formData.age && formData.bloodPressure && formData.bloodSugar && formData.bmi;

    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Theme Toggle - إما تمسح السطر ده أو تستورد الكومبوننت */}
                {/* <div className="flex justify-end mb-6">
          <ThemeToggleDefault />
        </div> */}

                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <Title className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] text-bluelight-1 mb-4">
                        AI Disease Progression Predictor
                    </Title>
                    <SubTitle className="text-[1.3rem] text-bluelight-1/70">
                        Enter Patient Information
                    </SubTitle>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Required Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-bluelight-1 border-b border-bluelight-1/30 pb-2">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Age */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">Age</label>
                                <input
                                    type="number"
                                    placeholder="Enter age"
                                    value={formData.age}
                                    onChange={(e) => handleChange("age", e.target.value)}
                                    className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg"
                                />
                            </div>

                            {/* Blood Pressure */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">Blood Pressure</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 120/80 mmHg"
                                    value={formData.bloodPressure}
                                    onChange={(e) => handleChange("bloodPressure", e.target.value)}
                                    className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg"
                                />
                            </div>

                            {/* Blood Sugar */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">Blood Sugar</label>
                                <input
                                    type="number"
                                    placeholder="mg/dL"
                                    value={formData.bloodSugar}
                                    onChange={(e) => handleChange("bloodSugar", e.target.value)}
                                    className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg"
                                />
                            </div>

                            {/* BMI */}
                            <div>
                                <label className="text-bluelight-1 text-lg mb-3 block font-medium">BMI</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="Enter BMI"
                                    value={formData.bmi}
                                    onChange={(e) => handleChange("bmi", e.target.value)}
                                    className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-xl px-4 py-4 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300 text-lg"
                                />
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
                            <label className="text-bluelight-1 text-lg mb-3 block font-medium">Upload File (Optional)</label>
                            <div className="border-2 border-bluelight-1/40 border-dashed rounded-xl p-6 text-center hover:border-bluelight-2 transition-all duration-300">
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
                    <div className="pt-8">
                        <MainButton
                            href={isFormValid ? "/results" : undefined}
                            onClick={handlePredict}
                            className={`w-full text-[1.1rem] md:text-[1.3rem] px-12 py-5 border transition-all duration-300 ${isFormValid
                                ? "bg-bluelight-2 hover:bg-transparent"
                                : "bg-bluelight-2/50 cursor-not-allowed"
                                }`}
                            background={isFormValid ? "bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full" : ""}
                        >
                            Predict
                        </MainButton>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MedicalDataForm;