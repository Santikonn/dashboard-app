import React from "react";
import { rawMaturityData } from "../../../data/maturityData";

function Gauge({ label, value, color }) {
  const radius = 35;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius;

  const strokeDashoffset = circumference * (1 - value / 100);

  return (
    <div className="flex flex-col items-center text-center">
      <svg width="90" height="55" viewBox="0 0 90 55">
        
        {/* Fondo */}
        <path
          d={`
            M 10 45
            A ${normalizedRadius} ${normalizedRadius} 0 0 1 80 45
          `}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />

        {/* Progreso */}
        <path
          d={`
            M 10 45
            A ${normalizedRadius} ${normalizedRadius} 0 0 1 80 45
          `}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>

      <div className="text-sm font-medium mt-2">{label}</div>
      <div className="text-lg font-semibold">{value.toFixed(2)} %</div>
    </div>
  );
}

function ProgressBar({ progress }) {
  return (
    <div className="w-32 h-3 bg-gray-300 rounded-full overflow-hidden">
      <div className="h-full bg-green-600" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default function MainMaturity() {
  // 1️⃣ Agrupamos los datos planos por área
  const areas = Object.values(
    rawMaturityData.reduce((acc, row) => {
      if (!acc[row.area]) acc[row.area] = { label: row.area, categories: [] };
      acc[row.area].categories.push({
        category: row.category,
        score: row.score,
        summary: row.summary,
      });
      return acc;
    }, {})
  );

  // 2️⃣ Calculamos valores por área para gauges
  const gauges = areas.map((area) => {
    const value = area.categories.reduce((sum, c) => sum + c.score, 0) / area.categories.length;

    let color = "red";
    if (value >= 70) color = "green";
    else if (value >= 40) color = "yellow";

    const colorMap = { red: "#ef4444", yellow: "#facc15", green: "#22c55e" };
    return { label: area.label, value, color: colorMap[color] };
  });

  // 3️⃣ Calculamos el Average Maturity
  const averageMaturity = gauges.reduce((sum, g) => sum + g.value, 0) / gauges.length;

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      {/* Header */}
      <div className="relative flex items-center mb-6">
        <img
          src="/LogoKonnectCX.png"
          alt="Konnectcx"
          className="h-16 mr-4"
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">Maturity Assessment</h1>
      </div>

      {/* Average Maturity + Gauges */}
      <div className="flex items-center space-x-8 mb-6">
        <div className="text-center">
          <div className="text-xl font-semibold mb-1">Average Maturity</div>
          <div className="text-4xl font-bold">{averageMaturity.toFixed(2)} %</div>
        </div>

        <div className="flex space-x-6">
          {gauges.map(({ label, value, color }) => (
            <Gauge key={label} label={label} value={value} color={color} />
          ))}
        </div>
      </div>

      {/* Tabla de categorías por área */}
      <div className="overflow-x-auto rounded border border-gray-300 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap cursor-pointer">Category</th>
              <th className="px-4 py-2 whitespace-nowrap">Score</th>
              <th className="px-4 py-2 whitespace-nowrap">Progress</th>
              <th className="px-4 py-2 whitespace-nowrap">Summary</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) =>
              area.categories.map((cat) => (
                <tr key={cat.category} className="border-b last:border-0">
                  <td className="px-4 py-2">{cat.category}</td>
                  <td className="px-4 py-2">{cat.score.toFixed(2)} %</td>
                  <td className="px-4 py-2">
                    <ProgressBar progress={cat.score} />
                  </td>
                  <td className="px-4 py-2 max-w-xl">{cat.summary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}