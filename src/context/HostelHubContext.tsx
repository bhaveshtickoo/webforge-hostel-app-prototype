"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

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

interface HostelHubContextType {
  scanState: string;
  setScanState: (state: string) => void;
  stats: {
    totalToday: number;
    approved: number;
    flagged: number;
    denied: number;
  };
  setStats: React.Dispatch<React.SetStateAction<{
    totalToday: number;
    approved: number;
    flagged: number;
    denied: number;
  }>>;
  logEntries: LogEntry[];
  setLogEntries: React.Dispatch<React.SetStateAction<LogEntry[]>>;
  viewMode: string;
  setViewMode: (mode: string) => void;
  triggerScan: () => void;
  completeScan: () => void;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "GP-94212",
    name: "Kabir Sharma",
    room: "102",
    block: "A",
    gate: "Main Gate 1",
    time: "12:25:30 am",
    confidence: 98.4,
    status: "Approved"
  },
  {
    id: "GP-94211",
    name: "Aditya Varma",
    room: "205",
    block: "B",
    gate: "East Gate 2",
    time: "12:18:15 am",
    confidence: 82.1,
    status: "Flagged"
  },
  {
    id: "GP-94210",
    name: "Rohan Malhotra",
    room: "304",
    block: "C",
    gate: "Main Gate 1",
    time: "12:12:00 am",
    confidence: 94.7,
    status: "Denied"
  },
  {
    id: "GP-94209",
    name: "Vikram Singh",
    room: "411",
    block: "D",
    gate: "Main Gate 1",
    time: "11:58:45 pm",
    confidence: 97.9,
    status: "Approved"
  },
  {
    id: "GP-94208",
    name: "Neil Gupta",
    room: "512",
    block: "A",
    gate: "East Gate 2",
    time: "11:45:10 pm",
    confidence: 99.1,
    status: "Approved"
  }
];

const HostelHubContext = createContext<HostelHubContextType | undefined>(undefined);

export function HostelHubProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [scanState, setScanState] = useState("idle");
  const [viewMode, setViewMode] = useState("split");
  const [stats, setStats] = useState({
    totalToday: 847,
    approved: 13,
    flagged: 7,
    denied: 0
  });
  const [logEntries, setLogEntries] = useState<LogEntry[]>(INITIAL_LOGS);

  const triggerScan = () => {
    setScanState("scanning");
    router.push("/terminal");
  };

  const completeScan = () => {
    // 1. Update stats
    setStats((prev) => ({
      ...prev,
      totalToday: prev.totalToday + 1,
      approved: prev.approved + 1
    }));

    // 2. Add log entry
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeStr = `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;

    const newLog: LogEntry = {
      id: `GP-${Math.floor(94000 + Math.random() * 999)}`,
      name: "Aryan Rao",
      room: "402",
      block: "C",
      gate: "Main Gate 1",
      time: timeStr,
      confidence: parseFloat((99.0 + Math.random() * 0.9).toFixed(1)),
      status: "Approved"
    };

    setLogEntries((prev) => [newLog, ...prev]);
  };

  return (
    <HostelHubContext.Provider
      value={{
        scanState,
        setScanState,
        stats,
        setStats,
        logEntries,
        setLogEntries,
        viewMode,
        setViewMode,
        triggerScan,
        completeScan
      }}
    >
      {children}
    </HostelHubContext.Provider>
  );
}

export function useHostelHub() {
  const context = useContext(HostelHubContext);
  if (!context) {
    throw new Error("useHostelHub must be used within a HostelHubProvider");
  }
  return context;
}
