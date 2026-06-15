"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, 
  KeyRound, 
  Zap, 
  UtensilsCrossed, 
  MessageSquare, 
  BellRing, 
  CalendarDays, 
  Settings, 
  LogOut,
  Home,
  UserCheck
} from "lucide-react";

interface SidebarProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
}

function SidebarContent({ viewMode, setViewMode }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine active tab based on current URL path and query parameters
  let activeTab = "dashboard";
  if (pathname === "/terminal") {
    activeTab = "gatepass";
  } else if (pathname === "/warden") {
    activeTab = "wardenpanel";
  } else if (pathname === "/student") {
    activeTab = searchParams.get("tab") || "dashboard";
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "/student?tab=dashboard", icon: LayoutDashboard },
    { id: "gatepass", label: "Gate Pass", href: "/terminal", icon: KeyRound },
    { id: "electricity", label: "Electricity", href: "/student?tab=electricity", icon: Zap },
    { id: "mess", label: "Mess", href: "/student?tab=mess", icon: UtensilsCrossed },
    { id: "complaints", label: "Complaints", href: "/student?tab=complaints", icon: MessageSquare, badge: 2 },
    { id: "notices", label: "Notices", href: "/student?tab=notices", icon: BellRing, badge: 5 },
    { id: "events", label: "Events", href: "/student?tab=events", icon: CalendarDays },
    { id: "settings", label: "Settings", href: "/student?tab=settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#111827] text-white flex flex-col justify-between h-screen sticky top-0 p-4 border-r border-[#1f2937] z-20 shrink-0">
      <div className="flex flex-col gap-6">
        {/* App Title & Brand */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="p-2 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">HostelHub</h1>
            <p className="text-xs text-gray-400 font-medium">Student Portal</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-[#1f2937]/50 border border-[#374151]/50 rounded-xl p-3.5 flex items-center gap-3.5 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-gray-100 truncate">Aryan Rao</h2>
            <p className="text-xs text-gray-400 font-medium truncate">CS · 3rd Year</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? "bg-[#2563eb] text-white shadow-lg shadow-blue-500/10" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-[#1f2937]/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4.5 w-4.5 transition-transform duration-200 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive 
                      ? "bg-white text-blue-600" 
                      : "bg-red-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          {/* Warden Link in Sidebar for quick toggling */}
          <Link
            href="/warden"
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
              activeTab === "wardenpanel" 
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/10" 
                : "text-gray-400 hover:text-gray-200 hover:bg-[#1f2937]/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <UserCheck className={`h-4.5 w-4.5 transition-transform duration-200 ${
                activeTab === "wardenpanel" ? "scale-110" : "group-hover:scale-105"
              }`} />
              <span>Warden Panel</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* View Selector & Logout */}
      <div className="flex flex-col gap-4 pt-4 border-t border-[#1f2937]">
        {/* Quick View Switcher for Hackathon Demo */}
        <div className="bg-[#1f2937]/30 border border-[#374151]/30 rounded-xl p-1.5 flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-semibold px-2 uppercase tracking-wider">Demo Layout</span>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            <button
              onClick={() => setViewMode("split")}
              className={`py-1 rounded font-medium transition ${
                viewMode === "split" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-[#1f2937]/50"
              }`}
            >
              All Columns
            </button>
            <button
              onClick={() => setViewMode("student")}
              className={`py-1 rounded font-medium transition ${
                viewMode === "student" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-[#1f2937]/50"
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => setViewMode("terminal")}
              className={`py-1 rounded font-medium transition ${
                viewMode === "terminal" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-[#1f2937]/50"
              }`}
            >
              AI Terminal
            </button>
            <button
              onClick={() => setViewMode("warden")}
              className={`py-1 rounded font-medium transition ${
                viewMode === "warden" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-[#1f2937]/50"
              }`}
            >
              Warden Panel
            </button>
          </div>
        </div>

        <button 
          onClick={() => alert("Logging out...")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition duration-200"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={<div className="w-64 bg-[#111827] h-screen shrink-0" />}>
      <SidebarContent {...props} />
    </Suspense>
  );
}
