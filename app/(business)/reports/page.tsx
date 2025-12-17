// app/business/reports/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getReports, generateBusinessReport, downloadReport } from "../lib/api";

export default function ReportsPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [genLoading, setGenLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const r = await getReports();
                if (!mounted) return;
                setReports(r);
            } catch (err) { console.error(err); }
            finally { if (mounted) setLoading(false); }
        })();
        return () => { mounted = false; };
    }, []);

    const handleGenerate = async () => {
        setGenLoading(true);
        try {
            const res = await generateBusinessReport();
            alert("Generated (mock): " + res.reportId);
        } catch (err) {
            console.error(err);
            alert("Generate failed");
        } finally { setGenLoading(false); }
    };

    return (
        <div className="w-full space-y-6">
            <h1 className="text-3xl font-bold text-bluelight-1">Reports</h1>
            <div className="bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>Available reports</div>
                    <button onClick={handleGenerate} className="px-4 py-2 bg-bluelight-2 text-white rounded-lg">{genLoading ? "Generating..." : "Generate Report (PDF)"}</button>
                </div>

                {loading ? <div className="py-8 text-center text-bluelight-1/60">Loading reports...</div> : (
                    <div className="space-y-3">
                        {reports.map(r => (
                            <div key={r.id} className="flex items-center justify-between border p-3 rounded-md">
                                <div>
                                    <div className="font-semibold text-bluelight-1">{r.name}</div>
                                    <div className="text-sm text-bluelight-1/80">{r.type} • {r.date} • {r.size}</div>
                                </div>
                                <div className="flex gap-2">
                                    <a href={r.downloadUrl} className="px-3 py-1 border rounded-lg">Download</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
