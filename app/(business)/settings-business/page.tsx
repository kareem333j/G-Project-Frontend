"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Save, Trash2, Settings as SettingsIcon, Bell, MessageSquare, Activity } from "lucide-react";

import Notifications from "./components/Notifications";
import ContactForm from "./components/ContactForm";

type NotificationsState = {
    email: boolean;
    sms: boolean;
    highRiskAlerts: boolean;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

export default function SettingsPage() {
    const [notifications, setNotifications] = useState<NotificationsState>({
        email: true,
        sms: false,
        highRiskAlerts: true,
    });

    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const saved = localStorage.getItem('business_notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setNotifications(parsed);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }, []);

    const toggleNotification = (key: keyof NotificationsState) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
        setDirty(true);
    };

    const reset = () => {
        if (confirm('Are you sure you want to reset all settings to default values?')) {
            setNotifications({ email: true, sms: false, highRiskAlerts: true });
            setDirty(true);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('business_notifications');
            }
        }
    };

    const save = async () => {
        if (!dirty) return;

        setSaving(true);
        try {
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('business_notifications', JSON.stringify(notifications));
            }
            await new Promise((r) => setTimeout(r, 800));
            setDirty(false);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            successMsg.textContent = 'Settings saved successfully!';
            document.body.appendChild(successMsg);
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        } catch (err) {
            console.error(err);
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    const handleSendMessage = async (payload: { name: string; email: string; message: string }) => {
        const subj = encodeURIComponent("Dashboard Feedback / Support");
        const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
        window.location.href = `mailto:devs@yourcompany.com?subject=${subj}&body=${body}`;
    };

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-bluelight-1 mb-2">Settings</h1>
                <p className="text-bluelight-1/60">
                    Manage notifications and contact the development team
                </p>
            </div>

            {/* Content Grid - Stacked Vertically */}
            <div className="space-y-6">
                {/* Notifications Card */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-bluelight-1" size={24} />
                        <h2 className="text-xl font-semibold text-bluelight-1">
                            Notifications
                        </h2>
                    </div>
                    <Notifications
                        notifications={notifications}
                        onToggle={toggleNotification}
                    />
                </div>

                {/* Contact Form Card */}
                <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="text-bluelight-1" size={24} />
                        <h2 className="text-xl font-semibold text-bluelight-1">
                            Contact Support
                        </h2>
                    </div>
                    <ContactForm onSend={handleSendMessage} />
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-bluelight-1/30">
                <button
                    onClick={reset}
                    disabled={!dirty}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${dirty
                            ? 'border-2 border-bluelight-1/40 text-bluelight-1 hover:bg-bluelight-1/10 active:scale-95'
                            : 'border-2 border-bluelight-1/20 text-bluelight-1/40 cursor-not-allowed'
                        }`}
                >
                    <Trash2 size={16} />
                    Reset
                </button>

                <button
                    onClick={save}
                    disabled={!dirty || saving}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all font-medium ${dirty && !saving
                            ? "bg-bluelight-2 text-white hover:bg-bluelight-1 active:scale-95"
                            : "bg-bluelight-2/50 text-white/70 cursor-not-allowed"
                        }`}
                >
                    {saving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Save Settings
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}