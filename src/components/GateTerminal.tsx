"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Camera, 
  Wifi, 
  CheckCircle2, 
  Video,
  VideoOff,
  UserCheck,
  QrCode,
  RotateCcw,
  RefreshCw
} from "lucide-react";

interface GateTerminalProps {
  scanState: string;
  setScanState: (state: string) => void;
  onScanComplete: () => void;
}

export default function GateTerminal({ scanState, setScanState, onScanComplete }: GateTerminalProps) {
  const [cameraMode, setCameraMode] = useState<"live" | "simulated">("simulated");
  const [clockTime, setClockTime] = useState("01:34:43 pm");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanText, setScanText] = useState("Position face in frame");
  const [qrCodeVal, setQrCodeVal] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Time Clock Updater
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hrsStr = String(hours).padStart(2, "0");
      setClockTime(`${hrsStr}:${minutes}:${seconds} ${ampm}`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // WebRTC Live Video Stream Handler
  useEffect(() => {
    if (cameraMode === "live") {
      navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access error:", err);
          alert("Camera access denied or unavailable. Switching to simulation mode.");
          setCameraMode("simulated");
        });
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [cameraMode]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // 3-Second Scan Sequence Logic
  useEffect(() => {
    if (scanState === "scanning") {
      setScanProgress(0);
      setScanText("Locating face...");
      
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + 1; // Increment by 1 every 30ms -> 3000ms total (3 seconds)
          
          // Dynamic Scan Text Updates
          if (next > 85) {
            setScanText("Authorizing gate access...");
          } else if (next > 60) {
            setScanText("Verifying credentials database...");
          } else if (next > 35) {
            setScanText("Matching biometric signature...");
          } else if (next > 10) {
            setScanText("Analyzing facial geometry...");
          }
          
          return next;
        });
      }, 30); // 30ms * 100 = 3000ms (3 seconds)

      return () => clearInterval(interval);
    }
  }, [scanState]);

  // Handle Scan Finish Transition
  useEffect(() => {
    if (scanState === "scanning" && scanProgress === 100) {
      const delay = setTimeout(() => {
        setScanState("success");
        setQrCodeVal(`HOSTELHUB-GP-${Math.floor(100000 + Math.random() * 900000)}`);
        onScanComplete();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [scanProgress, scanState, setScanState, onScanComplete]);

  return (
    <div className="flex-1 bg-[#f1f5f9] flex flex-col h-screen overflow-y-auto p-6 border-r border-gray-200/80 text-gray-800">
      
      {/* Header Area */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/10">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1e293b] leading-tight">AI Facial Recognition</h2>
            <p className="text-[11px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">Gate Pass Verification</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 absolute"></span>
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">Camera Ready</span>
          </div>
          
          {/* Mode Switcher */}
          <button
            onClick={() => setCameraMode(cameraMode === "live" ? "simulated" : "live")}
            className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition"
            title={cameraMode === "live" ? "Switch to Simulated Camera" : "Use Real Webcam"}
          >
            {cameraMode === "live" ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* User Context Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
            AR
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700">Aryan Rao</h3>
            <p className="text-xs font-semibold text-gray-400">Room 402 · Block C</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold bg-blue-50/50 border border-blue-100 rounded-lg px-2.5 py-1">
          <Wifi className="h-3.5 w-3.5 animate-pulse" />
          <span>Live Feed</span>
        </div>
      </div>

      {/* Viewfinder Area */}
      <div className="flex-1 bg-[#0c1424] rounded-3xl overflow-hidden relative shadow-lg border border-[#1e293b] flex flex-col justify-between p-6 aspect-[3/4]">
        
        {/* Sub grid backing */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Viewfinder Top Bar */}
        <div className="flex justify-between items-center text-xs font-semibold text-gray-300 z-10">
          <div className="flex items-center gap-2 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="tracking-widest uppercase">REC</span>
          </div>
          <div className="bg-black/40 px-2.5 py-1 rounded-md border border-white/5 font-mono">
            {clockTime}
          </div>
        </div>

        {/* Scanning Viewport / Camera Stream */}
        <div className="absolute inset-0 flex items-center justify-center p-8 z-0">
          {cameraMode === "live" ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover rounded-2xl opacity-75"
            />
          ) : (
            /* Simulated Graphic */
            <div className="relative w-full h-full max-w-[280px] max-h-[280px] rounded-full border border-dashed border-blue-500/20 flex items-center justify-center">
              {scanState === "idle" && (
                <div className="text-center p-4">
                  <Camera className="h-12 w-12 text-blue-500/30 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs text-blue-500/40 font-semibold uppercase tracking-wider">Awaiting Scan Request</p>
                </div>
              )}
              {scanState === "scanning" && (
                <div className="h-44 w-44 rounded-full border border-blue-500/30 flex items-center justify-center animate-pulse">
                  <div className="h-32 w-32 rounded-full border border-dashed border-blue-500/40 flex items-center justify-center">
                    <UserCheck className="h-10 w-10 text-blue-400" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prominent Boundary Box (Turns Blue on Active, Green on Success) */}
          {scanState !== "idle" && (
            <div className={`absolute w-[240px] h-[240px] border-2 rounded-3xl transition-all duration-500 ease-in-out pointer-events-none flex items-center justify-center ${
              scanState === "success" 
                ? "border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.3)] bg-emerald-500/5" 
                : "border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
            }`}>
              {/* Corner brackets */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-xl -mt-[2px] -ml-[2px] transition-colors duration-500 ${
                scanState === "success" ? "border-emerald-400" : "border-blue-400"
              }`}></div>
              <div className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-xl -mt-[2px] -mr-[2px] transition-colors duration-500 ${
                scanState === "success" ? "border-emerald-400" : "border-blue-400"
              }`}></div>
              <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-xl -mb-[2px] -ml-[2px] transition-colors duration-500 ${
                scanState === "success" ? "border-emerald-400" : "border-blue-400"
              }`}></div>
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-xl -mb-[2px] -mr-[2px] transition-colors duration-500 ${
                scanState === "success" ? "border-emerald-400" : "border-blue-400"
              }`}></div>

              {/* Scanning Bar (only when scanning) */}
              {scanState === "scanning" && (
                <div 
                  className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg shadow-blue-500/40 pointer-events-none transition-all duration-75"
                  style={{ top: `${scanProgress}%` }}
                ></div>
              )}

              {/* Verified Checkmark Overlay (only when success) */}
              {scanState === "success" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl animate-scale backdrop-blur-[1px]">
                  <div className="bg-emerald-500 text-white rounded-full p-3 shadow-lg shadow-emerald-500/20 mb-2">
                    <CheckCircle2 className="h-10 w-10 animate-bounce" />
                  </div>
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                    VERIFIED
                  </span>
                  <span className="text-[9px] text-gray-300 font-mono mt-2">{qrCodeVal}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Viewfinder Bottom Status Bar */}
        <div className="w-full flex flex-col gap-2 z-10">
          {scanState === "scanning" && (
            <div className="w-full flex flex-col gap-1 bg-black/40 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-blue-200">
                <span>SCANNING FACE PROFILE</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
              </div>
            </div>
          )}

          <div className="w-full bg-black/40 py-2.5 px-4 rounded-xl border border-white/5 text-center">
            <span className={`text-xs font-semibold tracking-wide ${
              scanState === "scanning" ? "text-blue-400 font-bold" : 
              scanState === "success" ? "text-emerald-400 font-bold animate-pulse" : "text-gray-400"
            }`}>
              {scanState === "scanning" ? scanText : 
               scanState === "success" ? "Gate Access Cleared" : "Awaiting Face Identity"}
            </span>
          </div>
        </div>

      </div>
      
      {/* Simulation Reset/Trigger Buttons */}
      <div className="mt-4 flex gap-2">
        {scanState === "idle" ? (
          <button
            onClick={() => setScanState("scanning")}
            className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 transition flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Force Demo Scan</span>
          </button>
        ) : (
          <button
            onClick={() => {
              stopCamera();
              setScanState("idle");
            }}
            className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Scanner</span>
          </button>
        )}
      </div>
    </div>
  );
}
