import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

/* 🔥 STATUS STYLES */
const statusStyles = {
  "On Time": "bg-green-100 text-green-700",
  "Late": "bg-yellow-100 text-yellow-700",
  "Early Log": "bg-orange-100 text-orange-700",
  "Over Time": "bg-purple-100 text-purple-700",
  "Absent": "bg-red-100 text-red-700",
  "Check Sch": "bg-slate-200 text-slate-700",
};

/* 🔥 BADGE */
const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded-md text-[9px] sm:text-[10px] font-medium whitespace-nowrap ${
        statusStyles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "-"}
    </span>
  );
};

/* 🔥 COUNT + % + ORDEN */
const getStatusSummary = (agents) => {
  const counts = {};
  const total = agents.length || 1;

  agents.forEach((agent) => {
    const status = agent.status_in || "Unknown";
    counts[status] = (counts[status] || 0) + 1;
  });

  const summary = Object.entries(counts).map(([status, count]) => ({
    status,
    count,
    percent: Math.round((count / total) * 100),
  }));

  return summary.sort((a, b) => b.count - a.count);
};

const StaffStatusTable = ({ data }) => {
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (index) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

      <div className="max-h-[600px] overflow-auto scrollbar-none">

        <table className="w-full min-w-[1100px] text-[9px] sm:text-[10px] text-center">

          {/* 🔥 HEADER */}
          <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Leader</th>
              <th className="px-2">ID Weyi</th>
              <th className="px-2">ID IEX</th>
              <th className="px-2">Sch IN</th>
              <th className="px-2">Sch OUT</th>
              <th className="px-2">Length</th>
              <th className="px-2">Actual IN</th>
              <th className="px-2">Actual OUT</th>
              <th className="px-2">Status IN</th>
              <th className="px-2">Status OUT</th>
              <th className="px-2">IN Diff</th>
              <th className="px-2">OUT Diff</th>
              <th className="px-2">Total Log</th>
              <th className="px-2">Observations</th>
            </tr>
          </thead>

          <tbody>
            {data.map((leader, i) => {
              const statusSummary = getStatusSummary(leader.agents);

              return (
                <React.Fragment key={leader.leader || i}>

                  {/* 🔹 LEADER ROW FULL WIDTH */}
                  <tr
                    onClick={() => toggleRow(i)}
                    className="
                      border-t
                      bg-slate-50
                      hover:bg-slate-100
                      cursor-pointer
                      transition
                    "
                  >
                    {/* 🔥 AQUÍ EL COLSPAN */}
                    <td colSpan={14} className="p-3 text-left font-semibold">

                      <div className="flex items-center gap-2">

                        <ChevronRight
                          className={`
                            w-4 h-4 transition-transform duration-200 shrink-0
                            ${openRows[i] ? "rotate-90 text-slate-800" : "text-slate-400"}
                          `}
                        />

                        <span className="truncate">
                          {leader.leader || "Unknown"}
                        </span>

                        <span className="ml-2 text-slate-400">
                          ({leader.agents.length})
                        </span>

                        {/* 🔥 STATUS SUMMARY */}
                        <div className="flex gap-1 ml-2">
                          {statusSummary.map(({ status, count, percent }) => (
                            <span
                              key={status}
                              className={`px-2 py-1 rounded-md text-[9px] sm:text-[10px] font-medium whitespace-nowrap ${
                                statusStyles[status] || "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {status}: {percent}% ({count})
                            </span>
                          ))}
                        </div>

                      </div>

                    </td>
                  </tr>

                  {/* 🔥 AGENTS */}
                  {openRows[i] &&
                    leader.agents.map((row, j) => (
                      <tr
                        key={`${leader.leader}-${j}`}
                        className="
                          border-t
                          hover:bg-slate-50
                          transition
                        "
                      >
                        <td className="pl-10 py-2 text-left text-slate-700 truncate">
                          {row.agent_name}
                        </td>

                        <td>{row.voice_id}</td>
                        <td>{row.agent_id || "-"}</td>

                        <td>{row.sch_in || "Off"}</td>
                        <td>{row.sch_out || "Off"}</td>
                        <td>{row.length || "-"}</td>

                        <td>{row.actual_in || "-"}</td>
                        <td>{row.actual_out || "-"}</td>

                        <td>
                          <StatusBadge status={row.status_in} />
                        </td>

                        <td>
                          <StatusBadge status={row.status_off} />
                        </td>

                        <td className="text-slate-600">
                          {row.in_diff || "-"}
                        </td>

                        <td className="text-slate-600">
                          {row.end_diff || "-"}
                        </td>

                        <td className="font-medium">
                          {row.total_log || "-"}
                        </td>

                        <td className="text-[9px] text-slate-500 max-w-[200px] whitespace-normal break-words">
                          {row.off_comments || "-"}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default StaffStatusTable;