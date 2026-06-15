"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Sparkles, 
  ChevronRight, 
  Home as HomeIcon, 
  Zap, 
  Utensils, 
  ShieldCheck,
  CheckCircle,
  Clock,
  Plus,
  HelpCircle,
  User,
  Volume2,
  Calendar,
  Lock,
  ChevronDown,
  MessageSquare,
  Settings
} from "lucide-react";

interface StudentPortalProps {
  onGeneratePass: () => void;
  scanState: string;
  activeTab: string;
}

export default function StudentPortal({ onGeneratePass, scanState, activeTab }: StudentPortalProps) {
  const [currentDate, setCurrentDate] = useState("Sat, 13 June");
  const [sliderVal, setSliderVal] = useState(0);

  // Form states
  const [complaintText, setComplaintText] = useState("");
  const [complaints, setComplaints] = useState([
    { id: "TKT-8432", title: "Wi-Fi router in Block C corridor offline", date: "12 June", status: "In Progress" },
    { id: "TKT-8310", title: "Water leakage in Room 402 washroom", date: "10 June", status: "Resolved" }
  ]);

  useEffect(() => {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "June", 
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    setCurrentDate(`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`);
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSliderVal(val);
    if (val >= 90) {
      onGeneratePass();
      setTimeout(() => setSliderVal(0), 1000);
    }
  };

  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    const newTkt = {
      id: `TKT-${Math.floor(8400 + Math.random() * 99)}`,
      title: complaintText,
      date: "Today",
      status: "Submitted"
    };
    setComplaints([newTkt, ...complaints]);
    setComplaintText("");
  };

  // Render the correct tab content
  const renderContent = () => {
    switch (activeTab) {
      case "electricity":
        return (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              <span>Electricity Bill & Usage</span>
            </h3>

            {/* Bill Summary */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Current Cycle (June)</span>
              <div className="flex justify-between items-end mt-2">
                <div>
                  <span className="text-3xl font-extrabold text-gray-800">₹3,420</span>
                  <span className="text-xs text-gray-500 font-medium ml-2">for 195 units</span>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                  PAID
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs font-semibold text-gray-500">
                <span>Payment Mode: NetBanking</span>
                <span>Date: 10 June 2026</span>
              </div>
            </div>

            {/* Usage Breakdown */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-700 mb-3.5">Device Breakdown</h4>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Air Conditioner", units: "120 kWh", pct: "61%", color: "bg-blue-500" },
                  { name: "Lights & Fans", units: "45 kWh", pct: "23%", color: "bg-amber-500" },
                  { name: "Personal Laptop / Devices", units: "30 kWh", pct: "16%", color: "bg-emerald-500" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-semibold text-gray-600">
                      <span>{item.name}</span>
                      <span>{item.units} ({item.pct})</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: item.pct, backgroundColor: item.color === 'bg-blue-500' ? '#3b82f6' : item.color === 'bg-amber-500' ? '#f59e0b' : '#10b981' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "mess":
        return (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-amber-500" />
              <span>Mess Menu & Status</span>
            </h3>

            {/* Live Capacity */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Live Mess Hall Occupancy</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-extrabold text-gray-800">270 / 300</span>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded">
                  90% Occupied
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Queue wait time is currently ~12 minutes. Staggered entry recommended.
              </p>
            </div>

            {/* Menu Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-700 mb-3.5">Today's Menu (Sat)</h4>
              <div className="flex flex-col gap-4">
                {[
                  { type: "Breakfast", menu: "Idli, Vada, Sambar, Coconut Chutney, Tea / Coffee", time: "7:30 AM - 9:30 AM" },
                  { type: "Lunch", menu: "Roti, Dal Fry, Paneer Makhani, Jeera Rice, Curd, Salad", time: "12:30 PM - 2:30 PM" },
                  { type: "Dinner", menu: "Aloo Gobi, Roti, Plain Rice, Dal, Kheer (Dessert)", time: "7:30 PM - 9:30 PM" }
                ].map((meal, i) => (
                  <div key={i} className="flex gap-3 items-start border-l-2 border-amber-500 pl-3.5">
                    <div className="flex-1">
                      <span className="text-xs font-bold text-amber-600 block">{meal.type}</span>
                      <p className="text-xs text-gray-700 font-semibold mt-0.5 leading-relaxed">{meal.menu}</p>
                      <span className="text-[10px] text-gray-400 font-bold block mt-1">{meal.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "complaints":
        return (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-red-500" />
              <span>Complaints & Support</span>
            </h3>

            {/* Add Complaint Form */}
            <form onSubmit={handleAddComplaint} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">File a new complaint</h4>
              <textarea
                placeholder="Describe your issue (e.g. Wi-Fi connection, geyser failure, plumbing)..."
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 resize-none font-medium text-gray-700"
              ></textarea>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 px-4 text-xs font-bold transition flex items-center justify-center gap-1.5 self-end"
              >
                <Plus className="h-4 w-4" />
                <span>Submit Ticket</span>
              </button>
            </form>

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-700 mb-3.5">Recent Tickets</h4>
              <div className="flex flex-col gap-3">
                {complaints.map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50/50 transition duration-150">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400 font-bold">{item.id}</span>
                        <span className="text-[10px] text-gray-400 font-medium">· {item.date}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-700 truncate mt-1">{item.title}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ml-3 ${
                      item.status === "Resolved" ? "bg-emerald-100 text-emerald-700" :
                      item.status === "In Progress" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "notices":
        return (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              <span>Campus Notices</span>
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { title: "Hostel Curfew Extension", desc: "Curfew extended to 11:30 PM on Friday and Saturday nights starting this week.", date: "12 June", priority: "High" },
                { title: "Geyser Maintenance - Block C", desc: "Hot water geysers in Block C will be shut down for maintenance on 15 June from 10:00 AM to 2:00 PM.", date: "11 June", priority: "Normal" },
                { title: "Inter-Block Volleyball Tournament", desc: "Registrations are open for the volleyball championship. Sign up at the warden office.", date: "10 June", priority: "Low" },
                { title: "Wifi Upgrade Notice", desc: "Corridor routers in all blocks are being upgraded to Wi-Fi 6 for faster connectivity.", date: "08 June", priority: "Normal" }
              ].map((notice, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-gray-400 font-bold">{notice.date}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      notice.priority === 'High' ? 'bg-red-50 text-red-700' : 
                      notice.priority === 'Normal' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700'
                    }`}>{notice.priority}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-700 mt-1.5">{notice.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">{notice.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "events":
        return (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <span>Upcoming Events</span>
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { name: "Hostel Cultural Night 2026", desc: "Annual music, dance, and DJ night in the central quadrangle. Dinner will be served outdoors.", date: "June 20", time: "7:00 PM onwards" },
                { name: "Industry Career Session", desc: "Interactive panel with tech leaders on software engineering roadmaps and internships.", date: "June 25", time: "4:00 PM - 6:00 PM" }
              ].map((ev, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition duration-200 flex gap-4">
                  <div className="bg-indigo-50 text-indigo-700 rounded-xl p-3 flex flex-col items-center justify-center min-w-[70px] shrink-0">
                    <span className="text-xs font-bold uppercase">{ev.date.split(" ")[0]}</span>
                    <span className="text-lg font-extrabold leading-none mt-1">{ev.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-700">{ev.name}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{ev.desc}</p>
                    <span className="text-[10px] text-indigo-600 font-bold block mt-2">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Settings className="h-5 w-5 text-slate-500" />
              <span>Settings</span>
            </h3>

            {/* Profile Settings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h4 className="text-sm font-bold text-gray-700">Student Profile Summary</h4>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  AR
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-800">Aryan Rao</h5>
                  <p className="text-xs font-semibold text-gray-500">Registration: #2023CSB704</p>
                  <p className="text-xs font-semibold text-gray-400">Hostel Resident Since: August 2023</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3.5">
              <h4 className="text-sm font-bold text-gray-700 mb-1">Alert Preferences</h4>
              
              {[
                { name: "Gate Pass Notifications", desc: "Notify when gate pass is scanned or verified.", checked: true },
                { name: "Mess Hall Capacity Alerts", desc: "Notify when the mess hall reaches critical occupancy.", checked: true },
                { name: "Bill Payment Reminders", desc: "Send reminders 3 days before utility bill due date.", checked: false }
              ].map((pref, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-bold text-gray-700 block">{pref.name}</span>
                    <span className="text-[10px] text-gray-500 font-semibold block mt-0.5">{pref.desc}</span>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={pref.checked}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer mt-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default: // "dashboard"
        return (
          <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
            {/* AI Powered Generate Gate Pass Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 border border-blue-500/20 flex flex-col justify-between aspect-[3/4]">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-52 h-52 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-44 h-44 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-1.5 self-start px-3 py-1 bg-white/15 rounded-full backdrop-blur-md border border-white/10 text-xs font-semibold">
                <Sparkles className="h-3 w-3 animate-pulse text-blue-200" />
                <span className="tracking-wide">AI-POWERED</span>
              </div>

              <div className="my-6">
                <h3 className="text-3xl font-extrabold tracking-tight leading-tight mb-3">
                  Generate <br />Your Gate Pass
                </h3>
                <p className="text-sm text-blue-100/90 leading-relaxed font-medium">
                  Instant QR-coded pass with AI identity verification. Valid for 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                {scanState === "idle" && (
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md flex items-center justify-between relative">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderVal} 
                      onChange={handleSliderChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
                    />
                    <div className="flex items-center justify-between w-full">
                      <div 
                        className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-md transition-all duration-150 pointer-events-none"
                        style={{ transform: `translateX(${sliderVal * 2.8}px)` }}
                      >
                        <ChevronRight className="h-5 w-5 font-bold animate-pulse" />
                      </div>
                      <span className="text-xs font-bold tracking-wider select-none text-blue-100 uppercase pr-4">
                        {sliderVal > 10 ? "Hold and drag..." : "Swipe to Verification"}
                      </span>
                    </div>
                  </div>
                )}

                {scanState === "scanning" && (
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5 backdrop-blur-md flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin shrink-0"></div>
                    <span className="text-sm font-semibold tracking-wide text-blue-100">
                      AI scanner initiated... Face the terminal camera
                    </span>
                  </div>
                )}

                {scanState === "success" && (
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-3.5 backdrop-blur-md flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 animate-bounce" />
                    <span className="text-sm font-semibold text-emerald-100">
                      Identity Verified! Pass generated successfully.
                    </span>
                  </div>
                )}
                
                <button 
                  onClick={onGeneratePass}
                  disabled={scanState === "scanning"}
                  className="text-xs text-blue-100/70 hover:text-white transition underline font-medium self-center mt-1 outline-none"
                >
                  Or click here to generate instantly
                </button>
              </div>
            </div>

            {/* Quick Access Status Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between aspect-square hover:shadow-md transition duration-200">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <HomeIcon className="h-5 w-5" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">YOUR ROOM</span>
                  <span className="text-lg font-bold text-gray-700 block leading-tight">402</span>
                  <span className="text-[10px] font-semibold text-gray-500 block">Block C</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between aspect-square hover:shadow-md transition duration-200">
                <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Zap className="h-5 w-5" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">ELECT BILL</span>
                  <span className="text-lg font-bold text-gray-700 block leading-tight">₹3,420</span>
                  <span className="text-[10px] font-semibold text-emerald-600 block">Paid</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-between aspect-square hover:shadow-md transition duration-200">
                <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Utensils className="h-5 w-5" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">MESS STATUS</span>
                  <span className="text-lg font-bold text-gray-700 block leading-tight">Active</span>
                  <span className="text-[10px] font-semibold text-amber-600 block">3 Meals left</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#f1f5f9] flex flex-col h-screen overflow-y-auto p-6 text-gray-800">
      {/* Header Row */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1e293b] tracking-tight">
            {activeTab === "dashboard" ? "Dashboard" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-0.5">Welcome back, Aryan</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-right">
            <span className="text-sm font-semibold text-gray-700 block leading-none">{currentDate}</span>
          </div>
          <div className="relative cursor-pointer group">
            <div className="p-1.5 rounded-lg hover:bg-gray-100 transition duration-150">
              <Bell className="h-5 w-5 text-gray-600 group-hover:rotate-12 transition duration-200" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 bg-red-500 rounded-full border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
              5
            </span>
          </div>
        </div>
      </header>

      {/* Dynamic Tab Content */}
      <div className="flex-1 max-w-md mx-auto w-full">
        {renderContent()}
      </div>
    </div>
  );
}
