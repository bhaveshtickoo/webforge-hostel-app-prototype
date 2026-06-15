"use client";

import React, { Suspense } from "react";
import StudentPortal from "@/components/StudentPortal";
import { useHostelHub } from "@/context/HostelHubContext";
import { useSearchParams } from "next/navigation";

function StudentPageContent() {
  const { triggerScan, scanState } = useHostelHub();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <StudentPortal
      onGeneratePass={triggerScan}
      scanState={scanState}
      activeTab={activeTab}
    />
  );
}

export default function StudentPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-slate-100 flex items-center justify-center text-sm font-semibold text-gray-500">Loading Student Portal...</div>}>
      <StudentPageContent />
    </Suspense>
  );
}
