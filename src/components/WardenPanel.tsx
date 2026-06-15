"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  AlertOctagon, 
  XCircle,
  AlertTriangle,
  Info,
  SlidersHorizontal,
  Download,
  Eye,
  RefreshCw,
  Search,
  ChevronDown
} from "lucide-react";

export interface LogEntry {
  id: string;
  name: string;
  room: string;
  block: string;
  gate: string;
  time: string;
  confidence: number;
  status: "Approved" | "Flagged" | "Denied";
}

interface WardenPanelProps {
  stats: {
    totalToday: number;
    approved: number;
    flagged: number;
    denied: number;
  };
  logEntries: LogEntry[];
}

export default function WardenPanel({ stats, logEntries }: WardenPanelProps) {
  const [activeTab, setActiveTab] = useState<"LIVE" | "All" | "Approved" | "Flagged" | "Denied">("LIVE");
  const [refreshTime, setRefreshTime] = useState("12:27:57 am");
  const [searchQuery, setSearchQuery] = useState("");

  // Update Refresh Time Clock
  useEffect(() => {
    const updateRefresh = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hrsStr = String(hours).padStart(2, "0");
      setRefreshTime(`${hrsStr}:${minutes}:${seconds} ${ampm}`);
    };

    updateRefresh();
    // Simulate updating every 5 seconds as if refreshed in real-time
    const interval = setInterval(updateRefresh, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter Log Entries
  const filteredEntries = logEntries.filter((entry) => {
    // Search query filter
    const matchesSearch = 
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.room.includes(searchQuery);

    if (!matchesSearch) return false;

    // Tab filter
    if (activeTab === "LIVE") return true; // Live shows all recent events
    if (activeTab === "All") return true;
    return entry.status === activeTab;
  });

  return (
    <div className="flex-[1.5] bg-[#f8fafc] flex flex-col h-screen overflow-y-auto border-r border-gray-200/80 text-gray-800 shrink-0">
      
      {/* Dark Header Banner */}
      <header className="bg-[#161e2d] text-white px-6 py-5 flex items-center justify-between shadow-md sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 absolute"></span>
            <h2 className="text-lg font-bold tracking-tight">Warden Control Panel</h2>
          </div>
          <p className="text-xs text-gray-400 font-semibold mt-0.5 tracking-wide uppercase">
            AI Gate Monitoring · HostelHub v2.4.1
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh Clock */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-1.5 flex items-center gap-2 font-medium">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Live Refreshed</span>
            <span className="text-xs font-mono text-blue-400">{refreshTime}</span>
          </div>
          {/* Wardens Count */}
          <div className="bg-blue-600/25 border border-blue-500/30 rounded-xl px-3.5 py-1.5 text-xs font-bold text-blue-300">
            2 wardens online
          </div>
        </div>
      </header>

      {/* Panel Dashboard Content */}
      <div className="p-6 flex flex-col gap-6">
        
        {/* Statistics Cards Row */}
        <section className="grid grid-cols-4 gap-4">
          {/* Total Today */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
            <div>
              <span className="text-3xl font-extrabold text-gray-800 tracking-tight">{stats.totalToday}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Total Today</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+12 last hour</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>

          {/* Approved */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
            <div>
              <span className="text-3xl font-extrabold text-emerald-600 tracking-tight">{stats.approved}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Approved</h3>
              <span className="text-[10px] font-bold text-gray-500 block mt-1">last 30 min</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>

          {/* Flagged */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
            <div>
              <span className="text-3xl font-extrabold text-amber-500 tracking-tight">{stats.flagged}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Flagged</h3>
              <span className="text-[10px] font-bold text-amber-600 block mt-1">review needed</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-500">
              <AlertOctagon className="h-5 w-5" />
            </div>
          </div>

          {/* Denied */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 flex items-center justify-between">
            <div>
              <span className="text-3xl font-extrabold text-red-500 tracking-tight">{stats.denied}</span>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Denied</h3>
              <span className="text-[10px] font-bold text-red-600 block mt-1">access blocked</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-red-50 text-red-500">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="flex flex-col gap-3">
          {/* Critical Occupancy Alert */}
          <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4 flex gap-4">
            <div className="p-2.5 bg-red-500 text-white rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm shadow-red-500/10">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-red-950">Occupancy Alert: Mess Hall at 90% Capacity</h4>
                <span className="text-[9px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded uppercase tracking-wider">
                  Critical
                </span>
              </div>
              <p className="text-xs text-red-900/80 font-medium mt-1">
                Current: 270 / 300 seats. Advise staggered entry.
              </p>
              {/* Progress bar */}
              <div className="mt-3.5">
                <div className="w-full h-1.5 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "90%" }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-red-900/60 mt-1">
                  <span>270 / 300 seats</span>
                  <span>90% full</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Night Roll-Call */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 flex gap-4">
            <div className="p-2.5 bg-amber-500 text-white rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/10">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-amber-950">Night Roll-Call: 4 students not yet returned</h4>
                <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase tracking-wider">
                  Warning
                </span>
              </div>
              <p className="text-xs text-amber-900/80 font-medium mt-1.5 leading-relaxed">
                Rooms <span className="font-bold">311-B, 507-D, 601-E, 724-F</span> unaccounted. Gate checkout deadline exceeded by 45 mins.
              </p>
            </div>
          </div>

          {/* Info AI Engine */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-4 flex gap-4">
            <div className="p-2.5 bg-blue-500 text-white rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/10">
              <Info className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-blue-950">AI Engine: Model updated to v2.4.1</h4>
                <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">
                  Info
                </span>
              </div>
              <p className="text-xs text-blue-900/80 font-medium mt-1">
                Improved low light facial recognition accuracy +8.3%. System latency reduced by 14ms.
              </p>
            </div>
          </div>
        </section>

        {/* Live Gate Entry Log Section */}
        <section className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm">
          {/* Section Header */}
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-800">Live Gate Entry Log</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 w-44"
                  />
                </div>
                <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 transition" title="Filter Settings">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => alert("Exporting logs to CSV...")}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 transition" 
                  title="Export Data"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-gray-100 gap-1.5 text-xs font-semibold text-gray-500 pb-0.5">
              {(["LIVE", "All", "Approved", "Flagged", "Denied"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 border-b-2 font-bold transition-all relative ${
                    activeTab === tab 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent hover:text-gray-700 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {tab === "LIVE" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping"></span>
                    )}
                    <span>{tab}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[9px] bg-gray-50/50">
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Room</th>
                  <th className="py-2.5 px-3">Block</th>
                  <th className="py-2.5 px-3">Gate</th>
                  <th className="py-2.5 px-3 text-right">Conf.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => (
                    <tr 
                      key={entry.id + entry.time} 
                      className="hover:bg-gray-50/50 transition duration-150 font-medium"
                    >
                      <td className="py-3 px-3 text-gray-400 font-mono text-[10px]">{entry.id}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            entry.status === "Approved" ? "bg-emerald-500" :
                            entry.status === "Flagged" ? "bg-amber-500" : "bg-red-500"
                          }`}></span>
                          <span className="font-bold text-gray-800">{entry.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-700">{entry.room}</td>
                      <td className="py-3 px-3 text-gray-700">{entry.block}</td>
                      <td className="py-3 px-3 text-gray-500">{entry.gate}</td>
                      <td className="py-3 px-3 text-right font-mono text-[11px]">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          entry.status === "Approved" ? "bg-emerald-50 text-emerald-700" :
                          entry.status === "Flagged" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                        }`}>
                          {entry.confidence}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400 font-medium">
                      No recent logs found matching the filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
