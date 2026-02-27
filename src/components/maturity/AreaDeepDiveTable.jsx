import React from "react";
import { areaDeepDiveData } from "../../data/areaDeepDiveData";

export default function AreaDeepDiveTable({ selectedArea }) {

  if (selectedArea === "Main") return null;

  const areaMap = {
    Quality: 1,
    Training: 2,
    Workforce: 3,
    Recruitment: 4
  };

  const areaColors = {
    Quality: "#3b82f6",
    Training: "#3b82f6",
    Workforce: "#3b82f6",
    Recruitment: "#3b82f6"
  };

  const idArea = areaMap[selectedArea];
  const borderColor = areaColors[selectedArea] || "#94a3b8";

  const data = areaDeepDiveData.filter(
    item => item.idArea === idArea
  );

  return (
    <div className="mt-10">

      {/* Header */}
      <div
        className="px-6 py-2 rounded-t-lg text-white font-semibold"
        style={{
          backgroundColor: borderColor,
          opacity: 0.85
        }}
      >
        Key Takeaways
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-lg shadow-md overflow-y-auto scrollbar-none max-h-80">

        <table className="w-full border-collapse">
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-2 text-xs text-gray-700 leading-relaxed">
                  {row.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}