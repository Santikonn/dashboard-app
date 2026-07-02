import { useState, useMemo } from "react";
import AdherenceFilters from "../components/adherence/AdherenceFilters";
import AdherenceTable from "../components/adherence/AdherenceTable";

const Adherence = () => {
  const [data, setData] = useState([]);
  const [leaders, setLeaders] = useState([]); // 🔥 NUEVO
  const [selectedLeader, setSelectedLeader] = useState("");

  const filteredData = useMemo(() => {
    if (!selectedLeader) return data;

    return data.filter(
        (row) => (row.leader || "Unknown") === selectedLeader
    );
    }, [data, selectedLeader]);

  // 🔥 AGRUPAR DATA PLANA → POR LEADER
  const groupedData = useMemo(() => {
    const map = {};

    filteredData.forEach((row) => {
      const leader = row.leader;

      if (!map[leader]) {
        map[leader] = {
          leader,
          agents: [],
        };
      }

      map[leader].agents.push(row);
    });

    return Object.values(map);
  }, [filteredData]);

  return (
    <div className="bg-slate-50 min-h-screen px-2 sm:px-4 py-3">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* 🔥 HEADER */}
        <div className="flex flex-col items-center gap-2 text-center relative">

          <div className="flex w-full justify-between items-center sm:hidden">
            <img src="/LogoKonnectCX.png" className="h-8" />
            <img src="/LogoElevate.png" className="h-6" />
          </div>

          <div className="hidden sm:flex w-full items-center justify-between absolute top-0 left-0 px-2">
            <img src="/LogoKonnectCX.png" className="h-10 md:h-12" />
            <img src="/LogoElevate.png" className="h-8 md:h-10" />
          </div>

          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">
            Adherence
          </h1>
        </div>

        {/* 🔥 FILTROS */}
        <AdherenceFilters
          leaders={leaders} // 🔥 PASAR LEADERS AL FILTRO
          onChange={({ data }) => {
            setData(data);

            const uniqueLeaders = [
                ...new Set(
                    data.map((row) => row.leader)
                ),
            ].sort();

            setLeaders(uniqueLeaders);
          }}
        />

        {/* 🔥 TABLA */}
        <AdherenceTable data={groupedData} />

      </div>
    </div>
  );
};

export default Adherence;