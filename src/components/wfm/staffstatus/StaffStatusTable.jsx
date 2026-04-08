import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

const StatusBadge = ({ status }) => {
  const styles = {
    "On Time": "bg-green-100 text-green-700",
    "Late": "bg-yellow-100 text-yellow-700",
    "Early Log": "bg-orange-100 text-orange-700",
    "Over Time": "bg-purple-100 text-purple-700",
    "Absent": "bg-red-100 text-red-700",
    "Check Sch": "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-[9px] sm:text-[10px] font-medium whitespace-nowrap ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "-"}
    </span>
  );
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
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden scrollbar-none">

      {/* 🔥 SCROLL CONTAINER */}
      <div className="max-h-[600px] overflow-auto scrollbar-none">

        <table className="w-full min-w-[1100px] text-[11px] sm:text-[12px] text-center">

          {/* 🔥 HEADER */}
          <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Leader</th>
              <th>ID Weyi</th>
              <th>ID IEX</th>
              <th>Sch IN</th>
              <th>Sch OUT</th>
              <th>Length</th>
              <th>Actual IN</th>
              <th>Actual OUT</th>
              <th>Status IN</th>
              <th>Status OUT</th>
              <th>IN Diff</th>
              <th>OUT Diff</th>
              <th>Total Log</th>
              <th>Comments</th>
            </tr>
          </thead>

          <tbody>
            {data.map((leader, i) => (
              <React.Fragment key={leader.leader || i}>

                {/* 🔹 LEADER ROW */}
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
                  <td className="p-3 text-left font-semibold flex items-center gap-2">

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
                  </td>

                  <td colSpan={13}></td>
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

                      <td className="text-[9px] sm:text-[10px] text-slate-500 max-w-[200px] truncate">
                        {row.off_comments || "-"}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default StaffStatusTable;