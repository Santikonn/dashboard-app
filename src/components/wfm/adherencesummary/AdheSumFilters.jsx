import { useEffect, useState } from "react";
import FilterDropdownPro from "../FilterDropDownValues";
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

  // 🔥 DATA SEPARADA
  const [leaderData, setLeaderData] = useState([]);
  const [agentData, setAgentData] = useState([]);

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);

  const [filters, setFilters] = useState({
    leaders: [],
    agents: []
  });

  const safeOnChange = onChange || (() => {});
  const hasLeaders = filters.leaders?.length > 0;

  /* =========================
     FETCH LEADERS (SP 1)
  ========================= */
  const fetchLeaders = async () => {
    try {
      const res = await fetch(
        `https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence?sp=adherence_leader&start_date=${startDate}&end_date=${endDate}`
      );

      const json = await res.json();
      const data = json.items || [];

      setLeaderData(data);

      const grouped = {};

      data.forEach(d => {
        const leader = d.leader;

        if (!grouped[leader]) {
          grouped[leader] = {
            adhe_sec: 0,
            in_adhe_sec: 0
          };
        }

        grouped[leader].adhe_sec += Number(d.adhe_sec || 0);
        grouped[leader].in_adhe_sec += Number(d.in_adhe_sec || 0);
      });

      const leaders = Object.entries(grouped)
        .map(([leader, vals]) => {

          const adherence =
            vals.adhe_sec === 0
              ? null
              : vals.in_adhe_sec / vals.adhe_sec;

          return {
            name: leader,
            adherence
          };
        })

        // 🔥 ordenar menor → mayor, null al final
        .sort((a, b) => {
          if (a.adherence === null) return 1;
          if (b.adherence === null) return -1;
          return a.adherence - b.adherence;
        })

        // 🔥 formato final para dropdown
        .map(d => {
          const pct =
            d.adherence === null
              ? "N/A"
              : `${(d.adherence * 100).toFixed(1)}%`;

          return {
            label: `${d.name} - ${pct}`,
            value: d.name
          };
        });

      setLeaderOptions(leaders);

      // 🔥 limpiar agentes siempre que se recargan fechas
      setAgentData([]);
      setAgentOptions([]);

      safeOnChange({ data });

    } catch (err) {
      console.error("Error fetching leaders:", err);
    }
  };

  /* =========================
     FETCH AGENTES (SP 2)
  ========================= */
  const fetchAgents = async (leadersSelected) => {
    if (!leadersSelected || leadersSelected.length === 0) return;

    try {
      const leadersParam = leadersSelected
        .map(l => l.trim())
        .join(",");

      const res = await fetch(
        `https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence?sp=adherence_summary&start_date=${startDate}&end_date=${endDate}&leaders=${leadersParam}`
      );

      const json = await res.json();
      const data = json.items || [];

      setAgentData(data);

      const agents = [
        ...new Set(
          data.map(d => d.agent_name).filter(Boolean)
        )
      ].sort();

      setAgentOptions(agents);

    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  /* =========================
     EFFECT: FECHAS
  ========================= */
  useEffect(() => {
    fetchLeaders();
    setFilters({ leaders: [], agents: [] });
  }, [startDate, endDate]);

  /* =========================
     EFFECT: LEADERS
  ========================= */
  useEffect(() => {
    if (hasLeaders) {
      fetchAgents(filters.leaders);
    } else {
      // 🔥 limpieza crítica
      setAgentData([]);
      setAgentOptions([]);
    }
  }, [filters.leaders]);

  /* =========================
     APPLY FILTERS
  ========================= */
  useEffect(() => {
    let data = [];

    if (hasLeaders) {
      // 🔥 SOLO usa agentData si hay leaders
      data = agentData;

      if (filters.agents.length > 0) {
        data = data.filter(row =>
          filters.agents.includes(row.agent_name)
        );
      }

    } else {
      // 🔥 fallback seguro
      data = leaderData;
    }

    safeOnChange({ data });

  }, [filters, leaderData, agentData]);

  /* =========================
     HANDLERS FECHA
  ========================= */
  const handleStartDateChange = (e) => {
    const newStart = e.target.value;

    setStartDate(newStart);

    if (newStart > endDate) {
      setEndDate(newStart);
    }

    setFilters({ leaders: [], agents: [] });
  };

  const handleEndDateChange = (e) => {
    const newEnd = e.target.value;

    if (newEnd < startDate) {
      setEndDate(startDate);
      return;
    }

    setEndDate(newEnd);

    setFilters({ leaders: [], agents: [] });
  };

  /* =========================
     UI
  ========================= */
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
          <FilterDropdownPro
            label="Leader"
            options={leaderOptions}
            selected={filters.leaders}
            onChange={(val) =>
              setFilters(prev => ({
                ...prev,
                leaders: val,
                agents: []
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