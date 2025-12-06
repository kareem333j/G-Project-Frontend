"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLabel } from "../../../shared/FormLabel";
import { SpecialtySelect } from "./SpecialtySelect";
import MainButton from "@/components/custom/MainButton";

// تعريف variants بشكل صحيح
const fadeUpVariant = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export function DoctorForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    expectedPatients: "",
    isAffiliated: false,
    institutionId: ""
  });


  const handleContinue = async () => {
    if (!formData.name || !formData.specialty || !formData.expectedPatients) {
      alert("Please fill all required fields");
      return;
    }


    if (formData.isAffiliated && !formData.institutionId) {
      alert("Please enter institution ID");
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        type: "doctor",
        name: formData.name,
        specialty: formData.specialty,
        expectedPatients: formData.expectedPatients,
        affiliated: formData.isAffiliated ? "yes" : "no",
        ...(formData.isAffiliated && { institutionId: formData.institutionId })
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      router.push(`/register?${params.toString()}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" as const, delay: 0.2 }}
      className="w-full max-w-[420px] space-y-6 mt-4"
    >
      {/* Doctor Name */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        <div className="space-y-2">
          <FormLabel required>Doctor Name</FormLabel>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            disabled={isLoading}
            className="w-full bg-white/50 dark:bg-gray-800/50 
                       border-2 border-bluelight-1/30 
                       rounded-2xl px-5 py-4 text-bluelight-1 
                       focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                       outline-none transition-all duration-300
                       placeholder:text-bluelight-1/50
                       text-base hover:border-bluelight-1/50
                       disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>
      </motion.div>

      {/* Specialty */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-2">
          <FormLabel required>Specialty</FormLabel>
          <SpecialtySelect
            value={formData.specialty}
            onChange={(value) => setFormData({ ...formData, specialty: value })}
            disabled={isLoading}
          />
        </div>
      </motion.div>

      {/* Expected Patients */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-2">
          <FormLabel required>Expected Monthly Patients</FormLabel>
          <input
            type="number"
            min="1"
            value={formData.expectedPatients}
            onChange={(e) => setFormData({ ...formData, expectedPatients: e.target.value })}
            placeholder="e.g., 100"
            disabled={isLoading}
            className="w-full bg-white/50 dark:bg-gray-800/50 
                       border-2 border-bluelight-1/30 
                       rounded-2xl px-5 py-4 text-bluelight-1 
                       focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                       outline-none transition-all duration-300
                       placeholder:text-bluelight-1/50
                       text-base hover:border-bluelight-1/50
                       disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>
      </motion.div>

      {/* Affiliation */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-2">
          <FormLabel>Are you affiliated with an institution?</FormLabel>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isAffiliated: true })}
              disabled={isLoading}
              className={`flex-1 py-3.5 rounded-xl border-2 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${formData.isAffiliated
                  ? "bg-bluelight-2/20 border-bluelight-2 text-bluelight-1 font-medium"
                  : "border-bluelight-1/30 text-bluelight-1/70 hover:border-bluelight-1/50"}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isAffiliated: false, institutionId: "" })}
              disabled={isLoading}
              className={`flex-1 py-3.5 rounded-xl border-2 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${!formData.isAffiliated
                  ? "bg-bluelight-2/20 border-bluelight-2 text-bluelight-1 font-medium"
                  : "border-bluelight-1/30 text-bluelight-1/70 hover:border-bluelight-1/50"}`}
            >
              No
            </button>
          </div>
        </div>
      </motion.div>

      {/* Institution ID */}
      {formData.isAffiliated && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="space-y-2">
            <FormLabel required>Institution ID</FormLabel>
            <input
              type="text"
              value={formData.institutionId}
              onChange={(e) => setFormData({ ...formData, institutionId: e.target.value })}
              placeholder="Enter institution ID"
              disabled={isLoading}
              className="w-full bg-white/50 dark:bg-gray-800/50 
                         border-2 border-bluelight-1/30 
                         rounded-2xl px-5 py-4 text-bluelight-1 
                         focus:border-bluelight-2 focus:ring-2 focus:ring-bluelight-2/30 
                         outline-none transition-all duration-300
                         placeholder:text-bluelight-1/50
                         text-base hover:border-bluelight-1/50
                         disabled:opacity-50 disabled:cursor-not-allowed"
              required={formData.isAffiliated}
            />
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="pt-4"
      >
        <MainButton
          onClick={handleContinue}
          className={`w-full text-[1.05rem] sm:text-[1.15rem] 
              px-8 py-4 border-2 border-bluelight-2 
              bg-gradient-to-r from-bluelight-2 to-bluelight-1
              hover:from-bluelight-1 hover:to-bluelight-2
              text-white font-semibold
              rounded-2xl transition-all duration-300
              hover:scale-[1.02] active:scale-[0.98]
              shadow-lg hover:shadow-xl
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          background="bg-gradient-to-r from-bluelight-2 to-bluelight-1 
              w-full h-full bottom-0 group-hover:bottom-full"
        >
          <span className="flex items-center justify-center gap-3">
            <span>{isLoading ? 'Processing...' : 'Continue to Registration'}</span>
            {!isLoading && <span className="text-lg">→</span>}
          </span>
        </MainButton>
      </motion.div>
    </motion.div>
  );
}