import { useEffect, useState, useMemo } from "react";
import KPICard from "../components/wfm/KPICard";
import FiltersPanel from "../components/wfm/FiltersPanel";
import WFMTable from "../components/wfm/WFMTable";
import { buildLeaders, buildKPIs } from "../data/wfmUtils";

const WfmDashboard = () => {
  const [agents, setAgents] = useState([]);

  // 🔥 FILTROS MULTISELECT
  const [filters, setFilters] = useState({
    leader: [],
    agent: [],
    actual: [],
    expected: [],
  });

  // 🔥 FETCH DATA (solo una vez)
  useEffect(() => {
    fetch("https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence")
      .then((res) => res.json())
      .then((data) => {
        const agentsData = data.items || [];
        setAgents(agentsData);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔥 FILTRADO
  const filteredAgents = useMemo(() => {
    return agents.filter((a) => {
      if (
        filters.leader.length &&
        !filters.leader.includes(a.leader || "Unknown")
      ) return false;

      if (
        filters.agent.length &&
        !filters.agent.includes(a.agent_name || "Unknown")
      ) return false;

      if (
        filters.actual.length &&
        !filters.actual.includes(a.real_status || "Unknown")
      ) return false;

      if (
        filters.expected.length &&
        !filters.expected.includes(a.scheduled_activity || "Unknown")
      ) return false;

      return true;
    });
  }, [agents, filters]);

  // 🔥 BUILD DATA
  const leaders = useMemo(() => buildLeaders(filteredAgents), [filteredAgents]);
  const kpis = useMemo(() => buildKPIs(filteredAgents), [filteredAgents]);

  // 🔥 LAST UPDATE (date + segment_end)
  const lastUpdate = useMemo(() => {
    if (!agents.length) return null;

    const maxDate = agents.reduce((max, a) => {
      return a.date > max ? a.date : max;
    }, agents[0].date);

    const sameDate = agents.filter((a) => a.date === maxDate);

    const maxSegment = sameDate.reduce((max, a) => {
      return a.segment_end > max ? a.segment_end : max;
    }, sameDate[0].segment_end);

    return {
      date: maxDate,
      time: maxSegment,
    };
  }, [agents]);

  // 🔥 UNIQUE HELPER
  const unique = (arr) =>
    [...new Set(arr.map((v) => v || "Unknown"))].sort();

  // 🔥 OPCIONES (SIEMPRE DESDE DATA ORIGINAL)
  const options = useMemo(() => {
    return {
      leader: unique(agents.map((a) => a.leader)),
      agent: unique(agents.map((a) => a.agent_name)),
      actual: unique(agents.map((a) => a.real_status)),
      expected: unique(agents.map((a) => a.scheduled_activity)),
    };
  }, [agents]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* 🔥 HEADER */}
        <div className="relative flex flex-col items-center mb-4">

          {/* LOGO IZQ */}
          <img
            src="/LogoKonnectCX.png"
            alt="Konnectcx"
            className="h-12 absolute left-0"
          />

          {/* LOGO DER */}
          <img
            src="/LogoElevate.png"
            alt="Elevate"
            className="h-10 absolute right-0"
          />

          {/* TITULO */}
          <h1 className="text-3xl font-bold">
            Real Time Report
          </h1>

          {/* 🔥 LAST UPDATE */}
          {lastUpdate && (
            <p className="text-xs text-slate-500 mt-1">
              LAST UPDATE - {lastUpdate.date} {lastUpdate.time} EST
            </p>
          )}
        </div>

        <div className="space-y-4">

          {/* 🔥 FILTROS */}
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            options={options}
          />

          {/* 🔥 KPI CARDS */}
          {kpis && (
            <div className="grid grid-cols-6 gap-4">
              <KPICard title="Expected Agents" value={kpis.expected} />
              <KPICard title="On Call" value={kpis.connected} variant="success" />
              <KPICard title="Absent" value={kpis.absent} variant="danger" />
              <KPICard title="Lunch/Break" value={kpis.LunchBreak} variant="warning" />
              <KPICard title="Training" value={kpis.ClassTraining} />
              <KPICard title="Other" value={kpis.other} />
            </div>
          )}

          {/* 🔥 TABLA */}
          <WFMTable data={leaders} />

        </div>
      </div>
    </div>
  );
};

export default WfmDashboard;