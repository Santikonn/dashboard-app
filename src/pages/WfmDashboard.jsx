import { useEffect, useState, useMemo } from "react";
import KPICard from "../components/wfm/KPICard";
import FiltersPanel from "../components/wfm/FiltersPanel";
import WFMTable from "../components/wfm/WFMTable";
import { buildLeaders, buildKPIs } from "../data/wfmUtils";

const WfmDashboard = () => {
  const [agents, setAgents] = useState([]);

  const [filters, setFilters] = useState({
    leader: [],
    agent: [],
    actual: [],
    expected: [],
  });

  // 🔥 FETCH
  useEffect(() => {
    fetch("https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence?sp=wfm")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.items || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔥 FILTRADO
  const filteredAgents = useMemo(() => {
    return agents.filter((a) => {
      if (filters.leader.length && !filters.leader.includes(a.leader || "Unknown")) return false;
      if (filters.agent.length && !filters.agent.includes(a.agent_name || "Unknown")) return false;
      if (filters.actual.length && !filters.actual.includes(a.real_status || "Unknown")) return false;
      if (filters.expected.length && !filters.expected.includes(a.scheduled_activity || "Unknown")) return false;
      return true;
    });
  }, [agents, filters]);

  // 🔥 DATA
  const leaders = useMemo(() => buildLeaders(filteredAgents), [filteredAgents]);
  const kpis = useMemo(() => buildKPIs(filteredAgents), [filteredAgents]);

  // 🔥 LAST UPDATE
  const lastUpdate = useMemo(() => {
    if (!agents.length) return null;

    const maxDate = agents.reduce((max, a) =>
      a.date > max ? a.date : max,
      agents[0].date
    );

    const sameDate = agents.filter((a) => a.date === maxDate);

    const maxSegment = sameDate.reduce((max, a) =>
      a.segment_end > max ? a.segment_end : max,
      sameDate[0].segment_end
    );

    return {
      date: maxDate,
      time: maxSegment,
    };
  }, [agents]);

  // 🔥 OPTIONS
  const unique = (arr) =>
    [...new Set(arr.map((v) => v || "Unknown"))].sort();

  const options = useMemo(() => {
    return {
      leader: unique(agents.map((a) => a.leader)),
      agent: unique(agents.map((a) => a.agent_name)),
      actual: unique(agents.map((a) => a.real_status)),
      expected: unique(agents.map((a) => a.scheduled_activity)),
    };
  }, [agents]);

  return (
    <div className="bg-slate-50 min-h-screen px-2 sm:px-4 py-3">
      
      <div className="max-w-7xl mx-auto space-y-4">

        {/* 🔥 HEADER RESPONSIVE CORRECTO */}
        <div className="flex flex-col items-center gap-2 text-center relative">

          {/* 🔹 MOBILE → logos arriba */}
          <div className="flex w-full justify-between items-center sm:hidden">
            <img src="/LogoKonnectCX.png" alt="Konnectcx" className="h-8" />
            <img src="/LogoElevate.png" alt="Elevate" className="h-6" />
          </div>

          {/* 🔹 DESKTOP → logos a los lados */}
          <div className="hidden sm:flex w-full items-center justify-between absolute top-0 left-0 px-2">
            <img src="/LogoKonnectCX.png" alt="Konnectcx" className="h-10 md:h-12" />
            <img src="/LogoElevate.png" alt="Elevate" className="h-8 md:h-10" />
          </div>

          {/* 🔹 TITLE */}
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">
            Real Time Report
          </h1>

          {/* 🔹 LAST UPDATE */}
          {lastUpdate && (
            <p className="text-[10px] sm:text-xs text-slate-500">
              LAST UPDATE - {lastUpdate.date} {lastUpdate.time} EST
            </p>
          )}
        </div>

        {/* 🔥 CONTENT */}
        <div className="space-y-4">

          {/* FILTROS */}
          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            options={options}
          />

          {/* 🔥 KPI RESPONSIVE PRO */}
          {kpis && (
            <div className="
              grid 
              grid-cols-2 
              sm:grid-cols-3 
              md:grid-cols-4 
              lg:grid-cols-7 
              gap-3
            ">
              <KPICard title="Expected Agents" value={kpis.expected} />
              <KPICard title="Compliance" value={kpis.compliance} />
              <KPICard title="On Call" value={kpis.connected} variant="success" />
              <KPICard title="Absent" value={kpis.absent} variant="danger" />
              <KPICard title="Lunch/Break" value={kpis.LunchBreak} variant="warning" />
              <KPICard title="Training" value={kpis.ClassTraining} />
              <KPICard title="Other" value={kpis.other} />
            </div>
          )}

          {/* TABLA */}
          <WFMTable data={leaders} />

        </div>
      </div>
    </div>
  );
};

export default WfmDashboard;