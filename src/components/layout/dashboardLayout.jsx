import Sidebar from "./sidebar";
import Header from "../header/header";
import { useState } from "react";
import MaturityDashboard from "../../pages/MaturityDashboard";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("maturity");
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className={`flex flex-col min-h-screen transition-all duration-300 ${
        collapsed ? "ml-[72px]" : "ml-[256px]"}`}>
        <Header />
        <main className="p-6">
          {activeItem === "maturity" &&  <MaturityDashboard />}
        </main>
      </div>
    </div>
  );
}