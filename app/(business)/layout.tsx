// app/business/layout.tsx
"use client";

import React from "react";
import Sidebar from "./components/Sidebar";

type Props = {
    children: React.ReactNode;
};

export default function BusinessLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-cover bg-center py-8 px-4">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pt-16 lg:pt-0">

                {/* Sidebar: ثابت على lg+، drawer على mobile */}
                <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-8" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}