import React from "react";
import { areaInsightsData } from "../../data/areaInsightsData";

export default function AreaInsights({ selectedArea }) {

  if (selectedArea === "Main") return null;

  const insights = areaInsightsData.filter(
    item => item.area === selectedArea
  );

  const areaColors = {
    Quality: "#3b82f6",
    Training: "#3b82f6",
    Workforce: "#3b82f6",
    Recruitment: "#3b82f6"
  };

  const borderColor = areaColors[selectedArea] || "#94a3b8";

  return (
    <div className="mt-10">
      
      {/* Header pastel */}
      <div
        className="px-6 py-3 rounded-t-lg text-white font-semibold"
        style={{
          backgroundColor: borderColor,
          opacity: 0.85
        }}
      >
        Key Takeaways
      </div>

      {/* Cards */}
      <div className="bg-white rounded-b-lg p-6 shadow-md grid md:grid-cols-4 gap-6 overflow-y-auto scrollbar-none max-h-80">

        {insights.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md border-2"
            style={{
              borderLeft: `6px solid ${borderColor}`
            }}
          >
            <h3 className="font-semibold text-sm mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              {item.comment}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}