import React, { useState, useMemo, useEffect } from "react";
import { rawMaturityData } from "../data/maturityData";
import AreaTabs from "../components/maturity/AreaTabs";
import CategoryTable from "../components/maturity/CategoryTable";
import DashboardGauges from "../components/maturity/DashboardGauges";
import ProgressBar from "../components/maturity/ProgressBar";
import AreaInsights from "../components/maturity/AreaInsights";
import AreaDeepDiveTable from "../components/maturity/AreaDeepDiveTable";

export default function MaturityDashboard() {

  // 1️⃣ Estado para saber qué área está seleccionada
  const [selectedArea, setSelectedArea] = useState("Main");

  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setSelectedCategories([]);
  }, [selectedArea]);

  // 2️⃣ Generar lista de áreas dinámicamente
  const areaList = useMemo(() => {
    const areas = [...new Set(rawMaturityData.map(d => d.area))];
    return ["Main", ...areas];
  }, []);

  // 3️⃣ Filtrar data según selección
  const filteredData = useMemo(() => {
    if (selectedArea === "Main") return rawMaturityData;
    return rawMaturityData.filter(d => d.area === selectedArea);
  }, [selectedArea]);

  const categoriesForArea = useMemo(() => {
    if (selectedArea === "Main") return [];

    return [...new Set(filteredData.map(d => d.category))];
  }, [filteredData, selectedArea]);

  // 4️⃣ Convertir a categorías planas
  const categories = useMemo(() => {
    let data = filteredData;

    if (selectedCategories.length > 0) {
        data = data.filter(d => 
        selectedCategories.includes(d.category)
        );
    }

    return data.map(row => ({
        category: row.category,
        score: row.score,
        summary: row.summary,
    }));
  }, [filteredData, selectedCategories]);

  const averageMaturity = useMemo(() => {
  if (!filteredData.length) return 0;

  return (
    filteredData.reduce((sum, item) => sum + item.score, 0) /
    filteredData.length
  );
  }, [filteredData]);

  const dashboardTitle =
  selectedArea === "Main"
    ? "Maturity Assessment"
    : `${selectedArea} Assessment`;

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">

      {/* Tabs superiores */}
      <AreaTabs
        areaList={areaList}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />

      <div className="relative flex items-center mb-6">
        <img
            src="/LogoKonnectCX.png"
            alt="Konnectcx"
            className="h-16 mr-4"
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">
            {dashboardTitle}
        </h1>
      </div>

      {/* Gauges dinámicos */}
      <DashboardGauges 
        data={filteredData}
        isMain={selectedArea === "Main"}
        averageMaturity={averageMaturity}
        categories={categoriesForArea}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Tabla */}
      <CategoryTable categories={categories} />

      <AreaInsights selectedArea={selectedArea} />

      <AreaDeepDiveTable selectedArea={selectedArea} />

    </div>
  );
}