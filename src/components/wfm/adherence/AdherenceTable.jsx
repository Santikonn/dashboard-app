import { ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";

/* =====================================================
   COLORS
===================================================== */
const getPctColor = (value) => {
  if (value === null || value === undefined) return "bg-gray-100 text-gray-700";

  const pct = Number(value);

  if (pct >= 0.91) return "bg-green-100 text-green-700";
  if (pct >= 0.75) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const getAlertColor = (base, value) => {
  const isZeroBase =
    base === "00:00" || base === "0:00" || base === "0" || base === 0;

  const hasValue =
    value &&
    value !== "00:00" &&
    value !== "0:00" &&
    value !== "0";

  if (isZeroBase && hasValue) {
    return "text-orange-600 font-bold";
  }

  return "";
};

const PercentBadge = ({ value }) => {
  const num = Number(value);

  const isEmpty =
    value === null ||
    value === undefined ||
    value === "" ||
    value === "-" ||
    value === "null" ||
    Number.isNaN(num);

  if (isEmpty) {
    return (
      <span
        className="
          inline-flex items-center justify-center
          min-w-[52px]
          px-2 py-1
          rounded-md
          text-[9px] sm:text-[10px]
          font-semibold
          whitespace-nowrap
          bg-gray-100 text-gray-500
        "
      >
        -
      </span>
    );
  }

  const pct = Math.round(num * 100);

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-[52px]
        px-2 py-1
        rounded-md
        text-[9px] sm:text-[10px]
        font-semibold
        whitespace-nowrap
        ${getPctColor(num)}
      `}
    >
      {pct}%
    </span>
  );
};

/* =====================================================
   COMPONENT
===================================================== */
const AdherenceTable = ({ data = [] }) => {
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (leader) => {
    setOpenRows((prev) => ({
      ...prev,
      [leader]: !prev[leader],
    }));
  };

  const groupedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    if (data.length > 0 && Array.isArray(data[0]?.agents)) {
      return data.map((item) => ({
        leader: item.leader || "Unknown",
        rows: item.agents || [],
      }));
    }

    const groups = {};

    data.forEach((row) => {
      const leader = row?.leader || "Unknown";

      if (!groups[leader]) groups[leader] = [];
      groups[leader].push(row);
    });

    return Object.entries(groups).map(([leader, rows]) => ({
      leader,
      rows,
    }));
  }, [data]);

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="max-h-[650px] overflow-auto scrollbar-none">

        <table className="w-full min-w-[1750px] text-[9px] sm:text-[10px] text-center border-separate border-spacing-0">

          {/* =====================================================
              HEADER
          ===================================================== */}
          <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10">
            <tr className="border-b">
              <th className="p-3 text-left font-semibold">Leader/Agent</th>

              <th className="px-3 py-3 font-semibold">ID Weyi</th>
              <th className="px-3 py-3 font-semibold">ID IEX</th>
              <th className="px-3 py-3 font-semibold">Breaks</th>

              <th className="px-3 py-3 font-bold text-gray-900">Adh %</th>
              <th className="px-3 py-3 font-semibold">Adh Base</th>
              <th className="px-3 py-3 font-semibold">In Adh</th>

              <th className="px-3 py-3 font-bold text-gray-900">OT Adh %</th>
              <th className="px-3 py-3 font-semibold">OT Base</th>
              <th className="px-3 py-3 font-semibold">OT In</th>

              <th className="px-3 py-3 font-bold text-gray-900">Conf %</th>
              <th className="px-3 py-3 font-semibold">Conf Base</th>
              <th className="px-3 py-3 font-semibold">Conf In</th>

              <th className="px-3 py-3 font-bold text-gray-900">OT Conf %</th>
              <th className="px-3 py-3 font-semibold">OT Conf Base</th>
              <th className="px-3 py-3 font-semibold">OT Conf In</th>
            </tr>
          </thead>

          {/* =====================================================
              BODY
          ===================================================== */}
          <tbody>
            {groupedData.map((group) => (
              <React.Fragment key={group.leader}>

                {/* LEADER ROW */}
                <tr
                  onClick={() => toggleRow(group.leader)}
                  className="
                    border-t
                    bg-slate-50
                    hover:bg-slate-100
                    cursor-pointer
                    transition
                    select-none
                  "
                >
                  <td
                    className="p-3 text-left font-semibold text-slate-700"
                  >
                    <div className="flex items-center gap-2">

                      <ChevronRight
                        className={`
                          w-4 h-4 shrink-0 transition-transform duration-200
                          ${
                            openRows[group.leader]
                              ? "rotate-90 text-slate-700"
                              : "text-slate-400"
                          }
                        `}
                      />

                      <span className="truncate max-w-[300px]">
                        {group.leader}
                      </span>

                      <span className="text-slate-400 text-[10px]">
                        ({group.rows.filter((row) => row.level?.toLowerCase().trim() === 'agent').length})
                      </span>
                    </div>
                  </td>

                  {/* IDS */}
                  <td className="px-1"></td>
                  <td className="px-1"></td>

                  {/* BREAKS */}
                  <td className="px-1 font-medium"></td>

                  {/* ADHERENCE */}
                  <td className="px-1"><PercentBadge value={group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.adherence_pct} /></td>
                  <td className="px-1">{group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.adhe_base || "00:00"}</td>
                  <td className={`px-1 ${getAlertColor(
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.adhe_base,
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.in_adhe
                  )}`}>
                    {group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.in_adhe || "00:00"}
                  </td>

                  {/* OT ADHERENCE */}
                  <td className="px-1"><PercentBadge value={group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.adherence_ot_pct} /></td>
                  <td className="px-1">{group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.adh_ot_base || "00:00"}</td>
                  <td className={`px-1 ${getAlertColor(
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.adh_ot_base,
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.in_adhe_ot
                  )}`}>
                    {group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.in_adhe_ot || "00:00"}
                  </td>

                  {/* CONFORMANCE */}
                  <td className="px-1"><PercentBadge value={group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conformance_pct} /></td>
                  <td className="px-1">{group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_base || "00:00"}</td>
                  <td className={`px-1 ${getAlertColor(
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_base,
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_in
                  )}`}>
                    {group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_in || "00:00"}
                  </td>

                  {/* OT CONFORMANCE */}
                  <td className="px-1"><PercentBadge value={group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conformance_ot_pct} /></td>
                  <td className="px-1">{group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_ot_base || "00:00"}</td>
                  <td className={`px-1 ${getAlertColor(
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_ot_base,
                    group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_ot_in
                  )}`}>
                    {group.rows.find((row) => row.level?.toLowerCase().trim() === 'leader')?.conf_ot_in || "00:00"}
                  </td>
                </tr>

                {/* DETAIL ROWS */}
                {openRows[group.leader] &&
                  group.rows.filter((row) => row.level?.toLowerCase().trim() === 'agent')
                  .map((row, i) => (
                    <tr
                      key={`${group.leader}-${i}`}
                      className="
                        border-t
                        hover:bg-slate-50
                        transition
                      "
                    >
                      {/* AGENT */}
                      <td className="pl-10 pr-2 text-left text-slate-700 whitespace-nowrap font-medium">
                        {row.agent_name || "-"}
                      </td>

                      {/* IDS */}
                      <td className="px-1">{row.voice_id || "-"}</td>
                      <td className="px-1">{row.agent_id || "-"}</td>

                      {/* BREAKS */}
                      <td className="px-1 font-medium">
                        {row.break_count ?? 0}
                      </td>

                      {/* ADHERENCE */}
                      <td className="px-1">
                        <PercentBadge value={row.adherence_pct} />
                      </td>
                      <td className="px-1">{row.adhe_base || "00:00"}</td>
                      <td className={`px-1 ${getAlertColor(row.adhe_base, row.in_adhe)}`}>
                        {row.in_adhe || "00:00"}
                      </td>

                      {/* OT ADHERENCE */}
                      <td className="px-1">
                        <PercentBadge value={row.adherence_ot_pct} />
                      </td>
                      <td className="px-1">{row.adh_ot_base || "00:00"}</td>
                      <td className={`px-1 ${getAlertColor(row.adh_ot_base, row.in_adhe_ot)}`}>
                        {row.in_adhe_ot || "00:00"}
                      </td>

                      {/* CONFORMANCE */}
                      <td className="px-1">
                        <PercentBadge value={row.conformance_pct} />
                      </td>
                      <td className="px-1">{row.conf_base || "00:00"}</td>
                      <td className={`px-1 ${getAlertColor(row.conf_base, row.conf_in)}`}>
                        {row.conf_in || "00:00"}
                      </td>

                      {/* OT CONFORMANCE */}
                      <td className="px-1">
                        <PercentBadge value={row.conformance_ot_pct} />
                      </td>
                      <td className="px-1">
                        {row.conf_ot_base || "00:00"}
                      </td>
                      <td className={`px-1 ${getAlertColor(row.conf_ot_base, row.conf_ot_in)}`}>
                        {row.conf_ot_in || "00:00"}
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

export default AdherenceTable;