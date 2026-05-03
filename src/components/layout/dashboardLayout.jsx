import Sidebar from "./sidebar";
import { useState } from "react";
import MaturityDashboard from "../../pages/MaturityDashboard";
import WfmDashboard from "../../pages/wfmDashboard";
import StaffStatus from "../../pages/StaffStatus";
import Adherence from "../../pages/Adherence";
import AdherenceSummary from "../../pages/AdherenceSummary";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true); // 🔥 estado único global
  const [activeItem, setActiveItem] = useState("wfm-realtime"); // 🔥 estado para controlar qué dashboard mostrar
  const renderContent = () => {
    switch (activeItem) {
      // case "maturity":
      //   return <MaturityDashboard />;

      case "wfm-realtime":
        return <WfmDashboard />;
      
      case "wfm-staff-status":
        return <StaffStatus />;

      case "wfm-adherence":
        return <Adherence />;

      case "wfm-adherence-summary":
        return <AdherenceSummary />;
    }
  };

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
          {renderContent()}
          {/* {activeItem === "maturity" && <MaturityDashboard />} */}
          {/* {activeItem === "workforce" && <WfmDashboard />} */}
        </main>
      </div>
    </div>
  );
}