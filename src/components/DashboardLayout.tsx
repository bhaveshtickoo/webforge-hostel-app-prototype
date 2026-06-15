"use client";

import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import { useHostelHub } from "@/context/HostelHubContext";
import StudentPortal from "./StudentPortal";
import GateTerminal from "./GateTerminal";
import WardenPanel from "./WardenPanel";
import { useSearchParams } from "next/navigation";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { 
    viewMode, 
    setViewMode, 
    scanState, 
    setScanState, 
    stats, 
    logEntries, 
    triggerScan, 
    completeScan 
  } = useHostelHub();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 font-sans">
      {/* Persistent Sidebar */}
      <Sidebar viewMode={viewMode} setViewMode={setViewMode} />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden bg-slate-100">
        {viewMode === "split" ? (
          <div className="flex w-full h-full divide-x divide-gray-200">
            {/* Student Dashboard panel */}
            <StudentPortal 
              onGeneratePass={triggerScan} 
              scanState={scanState} 
              activeTab={activeTab}
            />

            {/* AI Face Recognition Gate Pass verification panel */}
            <GateTerminal 
              scanState={scanState}
              setScanState={setScanState}
              onScanComplete={completeScan}
            />

            {/* Warden Monitoring dashboard panel */}
            <WardenPanel 
              stats={stats} 
              logEntries={logEntries} 
            />
          </div>
        ) : (
          /* Individual page view */
          children
        )}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-slate-100 flex items-center justify-center text-sm font-semibold text-gray-500">Loading Dashboard...</div>}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
