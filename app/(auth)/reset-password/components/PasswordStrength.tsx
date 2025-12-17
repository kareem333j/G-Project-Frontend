// app/auth/reset-password/components/PasswordStrength.tsx
"use client";

interface PasswordStrengthProps {
    password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, color: "bg-gray-300", label: "" };

        const requirements = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        ];

        const metRequirements = requirements.filter(Boolean).length;
        const strength = (metRequirements / requirements.length) * 100;

        if (strength <= 40) return { strength, color: "bg-red-500", label: "Weak" };
        if (strength <= 70) return { strength, color: "bg-yellow-500", label: "Medium" };
        return { strength, color: "bg-green-500", label: "Strong" };
    };

    const { strength, color, label } = getPasswordStrength(password);

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-300 ${color}`}
                    style={{ width: `${strength}%` }}
                />
            </div>
            <div className="text-xs text-bluelight-1/60 mt-1 text-left">
                Password strength: {label}
            </div>
        </div>
    );
}