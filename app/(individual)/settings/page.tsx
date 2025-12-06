// app/settings/page.tsx
"use client";
import { motion } from "framer-motion";
import MainButton from "@/components/custom/MainButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
    const router = useRouter();

    const [settings, setSettings] = useState({
        notifications: true,
        emailUpdates: false,
        darkMode: true,
        language: 'english',
        timezone: 'UTC+2',
        dataSharing: false
    });

    const [userInfo, setUserInfo] = useState({
        name: 'User Name',
        email: 'user@example.com',
        phone: '+1234567890',
        birthDate: '1990-01-01'
    });

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleUserInfoChange = (key: string, value: string) => {
        setUserInfo(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveSettings = () => {
        console.log('Saving settings:', settings);
        console.log('Saving user info:', userInfo);
        // هنا بتكون عملية الحفظ الفعلية
        alert('Settings saved successfully!');
    };

    const handleReset = () => {
        setSettings({
            notifications: true,
            emailUpdates: false,
            darkMode: true,
            language: 'english',
            timezone: 'UTC+2',
            dataSharing: false
        });
        setUserInfo({
            name: 'User Name',
            email: 'user@example.com',
            phone: '+1234567890',
            birthDate: '1990-01-01'
        });
    };

    return (
        <div className="min-h-screen bg-cover bg-center">
            <div className="w-full flex">


                {/* Main Content */}
                <div className="flex-1 py-8 px-8 min-w-0">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-bluelight-1 mb-2 text-center ">
                            Settings
                        </h1>
                        <p className="text-bluelight-1/70 text-center">Manage your account settings and preferences</p>
                    </motion.div>

                    {/* Settings Sections */}
                    <div className="space-y-8">

                        {/* Personal Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-bluelight-1 mb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-bluelight-1 text-sm font-medium mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={userInfo.name}
                                        onChange={(e) => handleUserInfoChange('name', e.target.value)}
                                        className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-bluelight-1 text-sm font-medium mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={userInfo.email}
                                        onChange={(e) => handleUserInfoChange('email', e.target.value)}
                                        className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-bluelight-1 text-sm font-medium mb-2 block">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={userInfo.phone}
                                        onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                                        className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-bluelight-1 text-sm font-medium mb-2 block">Birth Date</label>
                                    <input
                                        type="date"
                                        value={userInfo.birthDate}
                                        onChange={(e) => handleUserInfoChange('birthDate', e.target.value)}
                                        className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Notification Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-bluelight-1 mb-4">Notification Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-bluelight-1 font-semibold">Push Notifications</h3>
                                        <p className="text-bluelight-1/70 text-sm">Receive notifications about your health status</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.notifications}
                                            onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-bluelight-1/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bluelight-2"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-bluelight-1 font-semibold">Email Updates</h3>
                                        <p className="text-bluelight-1/70 text-sm">Receive weekly health reports via email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.emailUpdates}
                                            onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-bluelight-1/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bluelight-2"></div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>

                        {/* Preferences */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-bluelight-1 mb-4">Preferences</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-bluelight-1 text-sm font-medium mb-2 block">Language</label>
                                    <select
                                        value={settings.language}
                                        onChange={(e) => handleSettingChange('language', e.target.value)}
                                        className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
                                    >
                                        <option value="english">English</option>
                                        <option value="arabic">Arabic</option>
                                        <option value="spanish">Spanish</option>
                                        <option value="french">French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-bluelight-1 text-sm font-medium mb-2 block">Timezone</label>
                                    <select
                                        value={settings.timezone}
                                        onChange={(e) => handleSettingChange('timezone', e.target.value)}
                                        className="w-full bg-transparent border-2 border-bluelight-1/40 rounded-lg px-4 py-2 text-bluelight-1 focus:border-bluelight-2 outline-none transition-all duration-300"
                                    >
                                        <option value="UTC+2">UTC+2 (Cairo)</option>
                                        <option value="UTC+0">UTC+0 (London)</option>
                                        <option value="UTC-5">UTC-5 (New York)</option>
                                        <option value="UTC+8">UTC+8 (Singapore)</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Privacy Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-transparent border-2 border-bluelight-1/40 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-bluelight-1 mb-4">Privacy & Data</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-bluelight-1 font-semibold">Data Sharing</h3>
                                        <p className="text-bluelight-1/70 text-sm">Allow anonymous data for research purposes</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.dataSharing}
                                            onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-bluelight-1/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bluelight-2"></div>
                                    </label>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex gap-4 justify-end mt-8 "
                    >
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 border-2 border-bluelight-1/40 text-bluelight-1 rounded-lg hover:bg-bluelight-1/10 transition-all duration-300"
                        >
                            Reset to Default
                        </button>
                        <MainButton
                            onClick={handleSaveSettings}
                            className="px-6 py-3 border transition-all duration-300 bg-bluelight-2 hover:bg-transparent ts"
                            background="bg-bluelight-2 w-full h-full bottom-0 group-hover:bottom-full"
                        >
                            Save Settings
                        </MainButton>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;