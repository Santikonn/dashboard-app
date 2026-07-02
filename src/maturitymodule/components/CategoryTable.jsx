import React, { useState, useMemo } from "react";
import ProgressBar from "./ProgressBar";

export default function CategoryTable({ categories }) {

  const [sortOrder, setSortOrder] = useState("desc");

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) =>
      sortOrder === "asc"
        ? a.score - b.score
        : b.score - a.score
    );
  }, [categories, sortOrder]);

  const toggleSort = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="overflow-y-auto scrollbar-none max-h-80 rounded border border-gray-300 bg-white shadow-sm">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-blue-700 text-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2">Category</th>

            <th
              className="px-4 py-2 cursor-pointer whitespace-nowrap"
              onClick={toggleSort}
            >
              Score {sortOrder === "asc" ? "▲" : "▼"}
            </th>

            <th className="px-4 py-2">Progress</th>
            <th className="px-4 py-2">Summary</th>
          </tr>
        </thead>

        <tbody>
          {sortedCategories.map((cat) => (
            <tr key={cat.category} className="border-b last:border-0">
              <td className="px-4 py-2">{cat.category}</td>

              <td className="px-4 py-2 whitespace-nowrap">
                {cat.score.toFixed(2)} %
              </td>

              <td className="px-4 py-2">
                <ProgressBar progress={cat.score} />
              </td>

              <td className="px-4 py-2 max-w-xl">
                {cat.summary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}