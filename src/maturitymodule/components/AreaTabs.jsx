export default function AreaTabs({ areaList, selectedArea, setSelectedArea }) {
  return (
    <div className="flex space-x-6 mb-6 border-b">
      {areaList.map(area => (
        <button
          key={area}
          onClick={() => setSelectedArea(area)}
          className={`pb-2 text-sm font-medium transition ${
            selectedArea === area
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          {area}
        </button>
      ))}
    </div>
  );
}