import React, { useMemo } from "react";

/* =====================================================
   COLORS
===================================================== */
const getPctColor = (value) => {
  if (value === null || value === undefined)
    return "bg-gray-100 text-gray-700";

  const pct = Number(value);

  if (pct >= 0.91) return "bg-green-100 text-green-700";
  if (pct >= 0.75) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const PercentBadge = ({ value }) => {
  const num = Number(value);

  const isEmpty =
    value === null ||
    value === undefined ||
    value === "" ||
    Number.isNaN(num) ||
    !Number.isFinite(num);

  if (isEmpty) {
    return (
      <span className="inline-flex items-center justify-center min-w-[52px] px-2 py-1 rounded-md text-[9px] sm:text-[10px] font-semibold bg-gray-100 text-gray-500">
        -
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-[52px]
        px-2 py-1
        rounded-md
        text-[9px] sm:text-[10px]
        font-semibold
        ${getPctColor(num)}
      `}
    >
      {Math.round(num * 100)}%
    </span>
  );
};

/* =====================================================
   COMPONENT
===================================================== */
const AdheSumTable = ({ data = [] }) => {

  /* 🔥 DETECTAR SI ES SP2 */
  const hasAgentData = useMemo(() => {
    return data.length > 0 && "agent_name" in data[0];
  }, [data]);

  /* 🔥 SOLO AGENTES */
  const agentData = useMemo(() => {
    return data.filter(d => d.agent_name);
  }, [data]);

  /* 🔥 FECHAS */
  const dates = useMemo(() => {
    return [...new Set(agentData.map((d) => d.date))].sort();
  }, [agentData]);

  /* 🔥 WIDTH DINÁMICO */
  const FIRST_COL_WIDTH = 220;
  const COL_WIDTH = 90;

  const tableWidth = useMemo(() => {
    return `${Math.max(
      FIRST_COL_WIDTH + (dates.length + 1) * COL_WIDTH,
      1280
    )}px`;
  }, [dates]);

  /* 🔥 GROUP POR AGENTE */
  const agents = useMemo(() => {
    const map = {};

    agentData.forEach((row) => {
      const key = row.agent_name;

      if (!map[key]) {
        map[key] = {
          agent_name: row.agent_name,
          rows: {},
        };
      }

      map[key].rows[row.date] = row;
    });

    return Object.values(map);
  }, [agentData]);

  /* 🔥 CALC SAFE */
  const calc = (num, den) => {
    const n = Number(num);
    const d = Number(den);

    if (!d || d === 0 || isNaN(d)) return null;
    if (isNaN(n)) return null;

    return n / d;
  };

  /* 🔥 AQUÍ SI VALIDAS */
  if (!hasAgentData) return null;

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

      <div className="max-h-[650px] overflow-x-auto overflow-y-auto scrollbar-none">

        <table
          style={{ minWidth: tableWidth }}
          className="table-fixed text-[10px] text-center border-separate border-spacing-0"
        >

          {/* HEADER */}
          <thead className="bg-slate-50 text-slate-500 sticky top-0 z-20">
            <tr className="border-b">

              <th className="w-[200px] min-w-[200px] max-w-[200px] p-2 text-left font-semibold sticky left-0 bg-slate-50 z-30">
                Agent / Metric
              </th>

              {dates.map((d) => (
                <th key={d} className="px-2 py-2 font-semibold whitespace-nowrap">
                  {d}
                </th>
              ))}

              <th className="px-2 py-2 font-bold text-gray-900">
                Total
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {agents.map((agent, idx) => {

              const total = {
                adhe_sec: 0,
                in_adhe_sec: 0,
                adh_ot_sec: 0,
                in_adhe_ot_sec: 0,
                conf_in_sec: 0,
                conf_ot_sec: 0,
              };

              dates.forEach((d) => {
                const r = agent.rows[d];
                if (!r) return;

                total.adhe_sec += Number(r.adhe_sec) || 0;
                total.in_adhe_sec += Number(r.in_adhe_sec) || 0;
                total.adh_ot_sec += Number(r.adh_ot_sec) || 0;
                total.in_adhe_ot_sec += Number(r.in_adhe_ot_sec) || 0;
                total.conf_in_sec += Number(r.conf_in_sec) || 0;
                total.conf_ot_sec += Number(r.conf_ot_sec) || 0;
              });

              return (
                <React.Fragment key={idx}>

                  {/* AGENT HEADER */}
                  <tr className="bg-gray-50">
                    <td className="p-2 text-left font-bold text-gray-700 sticky left-0 z-10">
                      {agent.agent_name || "-"}
                    </td>
                    <td colSpan={dates.length + 1}></td>
                  </tr>

                  {/* ADHERENCE */}
                  <tr className="border-t hover:bg-slate-50">
                    <td className="pl-6 text-left sticky left-0 bg-white z-10">
                      Adherence %
                    </td>

                    {dates.map((d) => {
                      const r = agent.rows[d];
                      const val = r ? calc(r.in_adhe_sec, r.adhe_sec) : null;
                      return <td key={d}><PercentBadge value={val} /></td>;
                    })}

                    <td>
                      <PercentBadge value={calc(total.in_adhe_sec, total.adhe_sec)} />
                    </td>
                  </tr>

                  {/* ADHERENCE OT */}
                  <tr className="border-t hover:bg-slate-50">
                    <td className="pl-6 text-left sticky left-0 bg-white z-10">
                      Adherence OT %
                    </td>

                    {dates.map((d) => {
                      const r = agent.rows[d];
                      const val = r ? calc(r.in_adhe_ot_sec, r.adh_ot_sec) : null;
                      return <td key={d}><PercentBadge value={val} /></td>;
                    })}

                    <td>
                      <PercentBadge value={calc(total.in_adhe_ot_sec, total.adh_ot_sec)} />
                    </td>
                  </tr>

                  {/* CONFORMANCE */}
                  <tr className="border-t hover:bg-slate-50">
                    <td className="pl-6 text-left sticky left-0 bg-white z-10">
                      Conformance %
                    </td>

                    {dates.map((d) => {
                      const r = agent.rows[d];
                      const val = r ? calc(r.conf_in_sec, r.adhe_sec) : null;
                      return <td key={d}><PercentBadge value={val} /></td>;
                    })}

                    <td>
                      <PercentBadge value={calc(total.conf_in_sec, total.adhe_sec)} />
                    </td>
                  </tr>

                  {/* CONFORMANCE OT */}
                  <tr className="border-t border-b hover:bg-slate-50">
                    <td className="pl-6 text-left sticky left-0 bg-white z-10">
                      Conformance OT %
                    </td>

                    {dates.map((d) => {
                      const r = agent.rows[d];
                      const val = r ? calc(r.conf_ot_sec, r.adh_ot_sec) : null;
                      return <td key={d}><PercentBadge value={val} /></td>;
                    })}

                    <td>
                      <PercentBadge value={calc(total.conf_ot_sec, total.adh_ot_sec)} />
                    </td>
                  </tr>

                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdheSumTable;