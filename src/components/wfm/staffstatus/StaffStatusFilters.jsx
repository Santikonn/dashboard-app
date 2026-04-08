import { useEffect, useState } from "react";
import FilterDropdown from "../FilterDropdwon";

const StaffStatusFilters = ({ onChange }) => {

  function getDefaultDate() {
    const now = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
        })
    );

    const cutoff = new Date();
    cutoff.setHours(0, 30, 0, 0);

    if (now < cutoff) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday.toISOString().slice(0, 10);
    }

    return now.toISOString().slice(0, 10);
  }

  const [date, setDate] = useState(getDefaultDate());

  const [rawData, setRawData] = useState([]);
  const [leaderOptions, setLeaderOptions] = useState([]);

  const [filters, setFilters] = useState({
    leader: [],
  });

  // 🔥 FETCH
  const fetchData = async (selectedDate) => {
    try {
      const res = await fetch(
        `https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence?sp=staff_status&date=${selectedDate}`
      );

      const json = await res.json();
      const data = json.items || [];

      setRawData(data);

      const uniqueLeaders = [
        ...new Set(data.map((d) => d.leader || "Unknown"))
      ];

      setLeaderOptions(uniqueLeaders);

      onChange({ data });

    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 INIT
  useEffect(() => {
    fetchData(date);
  }, []);

  // 🔥 FILTROS
  useEffect(() => {
    let filtered = [...rawData];

    if (filters.leader.length > 0) {
      filtered = filtered.filter((row) =>
        filters.leader.includes(row.leader || "Unknown")
      );
    }

    onChange({ data: filtered });

  }, [filters, rawData]);

  // 🔥 DATE CHANGE
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setFilters({ leader: [] }); // reset filtros
    fetchData(newDate);
  };

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">

        <div className="w-full">
            <label className="text-[10px] md:text-xs text-slate-500 mb-1 block">
                Date
            </label>

            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="
                w-full
                h-[36px]
                border
                rounded-xl
                px-3
                text-[11px] md:text-sm
                bg-slate-50
                hover:bg-white
                focus:bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-slate-300
                transition
                "
            />
        </div>

        {/* LEADER */}
        <div className="w-full [&>div]:w-full">
          <FilterDropdown
          label="Leader"
          options={leaderOptions}
          selected={filters.leader}
          onChange={(val) =>
              setFilters((prev) => ({
              ...prev,
              leader: val,
              }))
          }
            />
        </div>

      </div>
    </div>
  );
};

export default StaffStatusFilters;