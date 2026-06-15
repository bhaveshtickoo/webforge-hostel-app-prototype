"use client";

import React from "react";
import WardenPanel from "@/components/WardenPanel";
import { useHostelHub } from "@/context/HostelHubContext";

export default function WardenPage() {
  const { stats, logEntries } = useHostelHub();

  return (
    <WardenPanel
      stats={stats}
      logEntries={logEntries}
    />
  );
}
