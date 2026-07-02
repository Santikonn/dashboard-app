import Gauge from "./Gauge";

export default function DashboardGauges({ 
  data, 
  isMain = false, 
  averageMaturity = 0,
  categories = [],
  selectedCategories = [],
  setSelectedCategories = () => {}
}) {

  const areas = Object.values(
    data.reduce((acc, row) => {
      if (!acc[row.area]) acc[row.area] = { label: row.area, scores: [] };
      acc[row.area].scores.push(row.score);
      return acc;
    }, {})
  );

  const gauges = areas.map(area => {
    const avg =
      area.scores.reduce((sum, s) => sum + s, 0) /
      area.scores.length;

    let color = "#ef4444";
    if (avg >= 70) color = "#22c55e";
    else if (avg >= 40) color = "#facc15";

    return { label: area.label, value: avg, color };
  });

  return (
    <div className="justify-center flex items-center gap-8 mb-6">

      {/* KPI solo si es Main */}
      {isMain && (
        <div className="w-52 text-center border-r pr-8">
          <div className="text-xl font-semibold mb-1">
            Average Maturity
          </div>
          <div className="text-4xl font-bold">
            {averageMaturity.toFixed(2)} %
          </div>
        </div>
      )}
      
      {/* Gauges normales */}
      <div className="flex gap-0 mb-6 overflow-x-auto">
        {gauges.map(g => (
            <Gauge
            key={g.label}
            label={g.label}
            value={g.value}
            color={g.color}
            />
        ))}  
      </div>

      {/* Si NO es Main → Botones de categorías */}
      {!isMain && categories.length > 0 && (
        <div className="flex flex-wrap gap-3 border-l border-slate-200 pl-8 max-w-2xl">

            {categories.map(cat => {
            const isSelected = selectedCategories.includes(cat);

            return (
                <button
                key={cat}
                onClick={() => {
                    if (isSelected) {
                    setSelectedCategories(prev =>
                        prev.filter(c => c !== cat)
                    );
                    } else {
                    setSelectedCategories(prev => [...prev, cat]);
                    }
                }}
                className={`
                    px-4 py-2 rounded-full text-[10px] font-medium transition
                    ${isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"}
                `}
                >
                {cat}
                </button>
            );
            })}

        </div>
      )}    

    </div>
  );
}