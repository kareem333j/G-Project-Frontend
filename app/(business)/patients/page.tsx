// app/business/patients/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { getAllPatients } from "../lib/api";

type Patient = { id: string; name: string; age: number; risk: "High" | "Medium" | "Low"; lastVisit: string };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: EASE } } };

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const list = await getAllPatients();
                if (!mounted) return;
                setPatients(list as any);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const filtered = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="w-full space-y-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <h1 className="text-3xl font-bold text-bluelight-1 mb-2">Patients</h1>
                <p className="text-bluelight-1/70 text-sm">Manage patient records and risk assessments</p>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-3 text-bluelight-1/60" size={16} />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search patients..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-bluelight-1/40 bg-white/80 dark:bg-transparent text-bluelight-1 placeholder:text-bluelight-1/60 focus:border-bluelight-2 transition" />
                </div>

                <div className="flex gap-3">
                    <button onClick={() => alert("CSV export will be implemented by backend")} className="px-4 py-3 rounded-xl border border-bluelight-1/40 text-bluelight-1 hover:bg-[#0eb2b1]/10 transition">Export CSV</button>
                </div>
            </div>

            <div className="bg-white/80 dark:bg-transparent border-2 border-bluelight-1/40 rounded-2xl p-4">
                {loading ? (
                    <div className="py-12 text-center text-bluelight-1/60">Loading patients...</div>
                ) : filtered.length === 0 ? (
                    <div className="py-12 text-center text-bluelight-1/60">No patients found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-left">
                            <thead>
                                <tr className="text-sm text-bluelight-1/70">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Age</th>
                                    <th className="px-4 py-3">Risk</th>
                                    <th className="px-4 py-3">Last visit</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id} className="border-t border-bluelight-1/30">
                                        <td className="px-4 py-3 text-bluelight-1">{p.name}</td>
                                        <td className="px-4 py-3 text-bluelight-1/80">{p.age}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${p.risk === "High" ? "bg-red-100 text-red-700" : p.risk === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                                                {p.risk}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-bluelight-1/80">{p.lastVisit}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Link href={`analytics`} className="px-3 py-1 border rounded-lg text-sm text-bluelight-1 hover:bg-[#0eb2b1]/10 transition">View</Link>
                                                <button className="px-3 py-1 border rounded-lg text-sm text-bluelight-1 hover:bg-[#0eb2b1]/10 transition" onClick={() => alert("Edit patient (mock)")}>Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
