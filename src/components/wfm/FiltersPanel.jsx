import FilterDropdown from "./FilterDropdwon";
import { RotateCcw } from "lucide-react";

const FiltersPanel = ({ filters, setFilters, options }) => {

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      leader: [],
      agent: [],
      actual: [],
      expected: [],
    });
  };

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">
      
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-4 
          xl:grid-cols-5
          gap-4
          items-end
        "
      >

        <FilterDropdown
          label="Leader"
          options={options.leader}
          selected={filters.leader}
          onChange={(val) => updateFilter("leader", val)}
        />

        <FilterDropdown
          label="Agent"
          options={options.agent}
          selected={filters.agent}
          onChange={(val) => updateFilter("agent", val)}
        />

        <FilterDropdown
          label="Actual State"
          options={options.actual}
          selected={filters.actual}
          onChange={(val) => updateFilter("actual", val)}
        />

        <FilterDropdown
          label="Expected State"
          options={options.expected}
          selected={filters.expected}
          onChange={(val) => updateFilter("expected", val)}
        />

        {/* RESET */}
        <button
          onClick={resetFilters}
          className="
            w-full
            h-[36px]
            flex items-center justify-center gap-2
            text-xs
            bg-slate-100
            hover:bg-slate-200
            rounded-xl
            transition
            md:col-span-2
            lg:col-span-1
          "
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

      </div>
    </div>
  );
};

export default FiltersPanel;