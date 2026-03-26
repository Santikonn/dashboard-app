import Sidebar from "./sidebar";
import { useState } from "react";
import MaturityDashboard from "../../pages/MaturityDashboard";
import WfmDashboard from "../../pages/wfmDashboard";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true); // 🔥 estado único global
  const [activeItem, setActiveItem] = useState("maturity");

  return (
    <div className="min-h-screen bg-background">
      
      {/* 🔥 SIDEBAR CONTROLADO */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* 🔥 CONTENIDO QUE SE AJUSTA */}
      <div
        className={`
          flex flex-col min-h-screen
          transition-all duration-300 ease-in-out
          ${collapsed ? "ml-[72px]" : "ml-[256px]"}
        `}
      >
        <main className="p-3 sm:p-6">
          {activeItem === "maturity" && <MaturityDashboard />}
          {activeItem === "workforce" && <WfmDashboard />}
        </main>
      </div>
    </div>
  );
}