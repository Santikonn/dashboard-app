import { useEffect, useState } from "react";
import FilterDropdown from "../FilterDropdwon";

/* =========================
   HELPERS FECHA
========================= */
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function get7DaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
}

const AdheSumFilters = ({ onChange }) => {
  const [startDate, setStartDate] = useState(get7DaysAgo());
  const [endDate, setEndDate] = useState(getToday());

  const [rawData, setRawData] = useState([]);

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);

  const [filters, setFilters] = useState({
    leaders: [],
    agents: []
  });

  // 🔥 fallback seguro
  const safeOnChange = onChange || (() => {});

  /* =========================
     FETCH DATA
  ========================= */
  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence?sp=adherence_summary&start_date=${startDate}&end_date=${endDate}`
      );

      const json = await res.json();
      const data = json.items || [];

      setRawData(data);

      // 🔥 leaders únicos SOLO de agentes
      const leaders = [
        ...new Set(
          data
            .filter(d => d.level === "agent")
            .map(d => d.leader || "Unknown")
        )
      ].sort();

      setLeaderOptions(leaders);

      safeOnChange({ data });

    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     INIT / FETCH
  ========================= */
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  /* =========================
     REBUILD AGENTS
  ========================= */
  useEffect(() => {
    let filtered = rawData.filter(d => d.level === "agent");

    if (filters.leaders.length > 0) {
      filtered = filtered.filter(row =>
        filters.leaders.includes(row.leader || "Unknown")
      );
    }

    const agents = [
      ...new Set(
        filtered
          .map(d => d.agent_name)
          .filter(Boolean)
      )
    ].sort();

    setAgentOptions(agents);

  }, [filters.leaders, rawData]);

  /* =========================
     APPLY FILTERS
  ========================= */
  useEffect(() => {
    let filtered = rawData;

    if (filters.leaders.length > 0) {
      filtered = filtered.filter(row =>
        filters.leaders.includes(row.leader || "Unknown")
      );
    }

    if (filters.agents.length > 0) {
      filtered = filtered.filter(row =>
        filters.agents.includes(row.agent_name)
      );
    }

    safeOnChange({ data: filtered });

  }, [filters, rawData]);

  /* =========================
     DATE HANDLERS
  ========================= */
  const handleStartDateChange = (e) => {
    const newStart = e.target.value;

    setStartDate(newStart);

    // 🔥 evitar start > end
    if (newStart > endDate) {
      setEndDate(newStart);
    }

    setFilters({ leaders: [], agents: [] });
  };

  const handleEndDateChange = (e) => {
    const newEnd = e.target.value;

    // 🔥 bloquear end < start
    if (newEnd < startDate) {
      setEndDate(startDate);
      return;
    }

    setEndDate(newEnd);

    setFilters({ leaders: [], agents: [] });
  };

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">

        {/* START DATE */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Start Date
          </label>

          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full h-[36px] px-3 border rounded-lg text-sm"
          />
        </div>

        {/* END DATE */}
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            End Date
          </label>

          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={handleEndDateChange}
            className="w-full h-[36px] px-3 border rounded-lg text-sm"
          />
        </div>

        {/* LEADER */}
        <div className="[&>div]:w-full">
          <FilterDropdown
            label="Leader"
            options={leaderOptions}
            selected={filters.leaders}
            onChange={(val) =>
              setFilters(prev => ({
                ...prev,
                leaders: val,
                agents: [] // reset agentes
              }))
            }
          />
        </div>

        {/* AGENT */}
        <div className="[&>div]:w-full">
          <FilterDropdown
            label="Agent"
            options={agentOptions}
            selected={filters.agents}
            onChange={(val) =>
              setFilters(prev => ({
                ...prev,
                agents: val
              }))
            }
          />
        </div>

      </div>
    </div>
  );
};

export default AdheSumFilters;