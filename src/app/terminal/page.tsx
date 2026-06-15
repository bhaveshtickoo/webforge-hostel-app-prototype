"use client";

import React from "react";
import GateTerminal from "@/components/GateTerminal";
import { useHostelHub } from "@/context/HostelHubContext";

export default function TerminalPage() {
  const { scanState, setScanState, completeScan } = useHostelHub();

  return (
    <GateTerminal
      scanState={scanState}
      setScanState={setScanState}
      onScanComplete={completeScan}
    />
  );
}
