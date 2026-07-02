import { ChevronRight, MessageSquarePlus, X } from "lucide-react";
import React, { useState } from "react";

/* 🔥 STATUS STYLES */
const statusStyles = {
  "On Time": "bg-green-100 text-green-700",
  "Late": "bg-yellow-100 text-yellow-700",
  "Early Log": "bg-orange-100 text-orange-700",
  "Over Time": "bg-purple-100 text-purple-700",
  "Absent": "bg-red-100 text-red-700",
  "Unauthorized": "bg-slate-200 text-slate-700",
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
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);

  const toggleRow = (index) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openCommentModal = (row) => {
    setSelectedAgent(row);
    setSelectedComment("");
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAgent(null);
    setShowModal(false);
  };

  const saveComment = async () => {

    if (!selectedComment) return;

    try {

      setLoadingSave(true);

      const url = `https://pyntfkpxq0.execute-api.us-east-2.amazonaws.com/adherence
                  ?sp=update_staff_comment
                  &date=${selectedAgent.staff_date}
                  &voice_id=${selectedAgent.voice_id}
                  &block_id=${selectedAgent.block_id}
                  &comment=${encodeURIComponent(selectedComment)}`;

      const response = await fetch(
        url.replace(/\s/g, "")
      );

      const result = await response.json();

      if (result.ok) {

        selectedAgent.comments = selectedComment;

        setShowModal(false);
        setSelectedAgent(null);

      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSave(false);
    }
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
              <th className="px-2">Comments</th>
            </tr>
          </thead>

          <tbody>
            {data.map((leader, i) => {
              const statusSummary = getStatusSummary(leader.agents);
              const missingComments = leader.agents.filter(
                (a) => a.status_in === "Absent" && !a.comments
              ).length;

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
                    <td colSpan={15} className="p-3 text-left font-semibold">

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

                        {missingComments > 0 && (
                          <div
                            className="
                              ml-2
                              flex items-center gap-1
                              px-2 py-1
                              rounded-md
                              bg-red-100
                              text-red-700
                              text-[9px]
                              sm:text-[10px]
                              font-semibold
                              animate-pulse
                            "
                          >
                            🚩 {missingComments}
                          </div>
                        )}

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
                        <td className="pl-2 py-2 text-left text-slate-700">

                          <div className="flex items-center gap-2">

                            <button
                              disabled={
                                row.status_in !== "Absent" || !!row.comments
                              }
                              onClick={(e) => {
                                e.stopPropagation();

                                if (
                                  row.status_in === "Absent" &&
                                  !row.comments
                                ) {
                                  openCommentModal(row);
                                }
                              }}
                              className={`
                                p-1 rounded-md transition shrink-0
                                ${
                                  row.status_in === "Absent" && !row.comments
                                    ? "bg-red-100 hover:bg-red-200 text-red-700 cursor-pointer"
                                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                                }
                              `}
                            >
                              <MessageSquarePlus className="w-3 h-3" />
                            </button>

                            <span className="truncate">
                              {row.agent_name}
                            </span>

                          </div>

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

                        <td className="text-[9px] text-slate-500 max-w-[200px] whitespace-normal break-words">
                          {row.comments || "-"}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>

        </table>
      </div>

      {showModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-800">
                Add Comment
              </h2>

              <button
                onClick={closeModal}
                className="p-1 rounded hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">

              <div>
                <span className="font-semibold">Agent:</span>{" "}
                {selectedAgent.agent_name}
              </div>

              <div>
                <span className="font-semibold">Voice ID:</span>{" "}
                {selectedAgent.voice_id}
              </div>

              <div>
                <span className="font-semibold">Schedule:</span>{" "}
                {selectedAgent.sch_in} - {selectedAgent.sch_out}
              </div>

              <div>
                <span className="font-semibold">Status:</span>{" "}
                {selectedAgent.status_in}
              </div>

            </div>

            <div className="mt-5">
              <select
                value={selectedComment}
                onChange={(e) => setSelectedComment(e.target.value)}
                className="w-full border rounded-lg p-2 text-xs"
              >
                <option value="">Select comment</option>
                <option>NCNS</option>
                <option>Medical Leave - Sick</option>
                <option>Tech issues - PC</option>
                <option>Tech Issues - Users/tools</option>
                <option>Bereavement</option>
                <option>ATT</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={closeModal}
                className="px-3 py-2 rounded-lg border text-xs hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={saveComment}
                disabled={!selectedComment || loadingSave}
                className="
                  px-3 py-2 rounded-lg
                  bg-slate-900 text-white text-xs
                  hover:bg-slate-700
                  disabled:opacity-50
                "
              >
                {loadingSave ? "Saving..." : "Save"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default StaffStatusTable;