import { useState } from "react";
import React from "react";
import StatusBadge from "./StatusBadge";
import { ChevronRight } from "lucide-react";

const WFMTable = ({ data }) => {
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (index) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm scrollbar-none max-h-96 overflow-y-auto">
      <table className="w-full text-xs text-center">
        
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-3 text-left">Leader</th>
            <th>Expected</th>
            <th>Correct</th>
            <th>Wrong</th>
            <th>Compliance %</th>
            <th>Severity</th>
            <th>Connected</th>
            <th>Absent</th>
            <th>Lunch/Break</th>
            <th>Class/Training</th>
            <th>Other</th>
            <th>Expected Bucket</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <React.Fragment key={row.leader || i}>
              
              {/* 🔹 FILA PRINCIPAL */}
              <tr
                className="border-t hover:bg-slate-50 cursor-pointer"
                onClick={() => toggleRow(i)}
              >
                <td className="p-3 text-left flex items-center gap-2">
                  
                  {/* ICONO */}
                  <ChevronRight
                    className={`
                      w-4 h-4 transition-transform duration-200
                      ${openRows[i] ? "rotate-90 text-slate-800" : "text-slate-400"}
                    `}
                  />

                  {row.leader}
                </td>

                <td>{row.expected}</td>
                <td>{row.correct}</td>
                <td>{row.wrong}</td>
                <td className="text-yellow-600 font-medium">
                  {row.compliance}%
                </td>
                <td>
                  <StatusBadge status={row.severity} isLeader />
                </td>
                <td>{row.connected}</td>
                <td>{row.absent}</td>
                <td>{row.LunchBreak}</td>
                <td>{row.ClassTraining}</td>
                <td>{row.other}</td>
                <td>-</td>
              </tr>

              {/* 🔥 FILAS HIJAS */}
              {openRows[i] &&
                row.agents.map((agent, j) => (
                  <tr
                    key={`${row.leader}-${agent.id || j}`}
                    className="bg-slate-50 text-slate-600 text-[9px]"
                  >
                    {/* NOMBRE */}
                    <td className="pl-10 text-left">
                      {agent.name}
                    </td>

                    <td></td>
                    <td>{agent.correct}</td>
                    <td>{agent.wrong}</td>
                    <td>{agent.compliance}%</td>

                    <td>
                      <StatusBadge status={agent.severity} />
                    </td>

                    <td>{agent.connected}</td>
                    <td>{agent.absent}</td>
                    <td>{agent.LunchBreak}</td>
                    <td>{agent.ClassTraining}</td>
                    <td>{agent.other}</td>

                    <td>{agent.bucket}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WFMTable;