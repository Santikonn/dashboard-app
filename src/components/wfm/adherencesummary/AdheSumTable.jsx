import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";

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
const AdheSumTable = ({
  data = [],
  metric = "adh"
}) => {

  /* 🔥 DETECTAR TIPO */
  const isAgentView = useMemo(() => {
    return data.length > 0 && "agent_name" in data[0];
  }, [data]);

  const entityKey = isAgentView ? "agent_name" : "leader";
  const entityLabel = isAgentView ? "Agent" : "Leader";

  /* 🔥 DATA BASE */
  const tableData = useMemo(() => {
    return data.filter(d => d[entityKey]);
  }, [data, entityKey]);

  /* 🔥 FECHAS */
  const dates = useMemo(() => {
    return [...new Set(tableData.map((d) => d.date))].sort();
  }, [tableData]);  

  /* 🔥 CALC SAFE */
  const calc = (num, den) => {
    const n = Number(num);
    const d = Number(den);

    if (!d || d === 0 || isNaN(d)) return null;
    if (isNaN(n)) return null;

    return n / d;
  };

  /* 🔥 GROUP */
  const entities = useMemo(() => {
    const map = {};

    tableData.forEach((row) => {
      const key = row[entityKey];

      if (!map[key]) {
        map[key] = {
          name: key,
          rows: {},
        };
      }

      map[key].rows[row.date] = row;
    });

    const arr = Object.values(map);

    return arr.sort((a, b) => {

      const totalA = {
        adhe_sec: 0,
        in_adhe_sec: 0,
        adh_ot_sec: 0,
        in_adhe_ot_sec: 0,
        conf_in_sec: 0,
        conf_ot_sec: 0,
      };

      const totalB = {
        adhe_sec: 0,
        in_adhe_sec: 0,
        adh_ot_sec: 0,
        in_adhe_ot_sec: 0,
        conf_in_sec: 0,
        conf_ot_sec: 0,
      };

      dates.forEach((d) => {

        const ra = a.rows[d];
        const rb = b.rows[d];

        if (ra) {
          totalA.adhe_sec += Number(ra.adhe_sec) || 0;
          totalA.in_adhe_sec += Number(ra.in_adhe_sec) || 0;

          totalA.adh_ot_sec += Number(ra.adh_ot_sec) || 0;
          totalA.in_adhe_ot_sec += Number(ra.in_adhe_ot_sec) || 0;

          totalA.conf_in_sec += Number(ra.conf_in_sec) || 0;
          totalA.conf_ot_sec += Number(ra.conf_ot_sec) || 0;
        }

        if (rb) {
          totalB.adhe_sec += Number(rb.adhe_sec) || 0;
          totalB.in_adhe_sec += Number(rb.in_adhe_sec) || 0;

          totalB.adh_ot_sec += Number(rb.adh_ot_sec) || 0;
          totalB.in_adhe_ot_sec += Number(rb.in_adhe_ot_sec) || 0;

          totalB.conf_in_sec += Number(rb.conf_in_sec) || 0;
          totalB.conf_ot_sec += Number(rb.conf_ot_sec) || 0;
        }
      });

      let valA = 0;
      let valB = 0;

      if (metric === "adh") {
        valA = calc(totalA.in_adhe_sec, totalA.adhe_sec) || 0;
        valB = calc(totalB.in_adhe_sec, totalB.adhe_sec) || 0;
      }

      if (metric === "adh_ot") {
        valA = calc(totalA.in_adhe_ot_sec, totalA.adh_ot_sec) || 0;
        valB = calc(totalB.in_adhe_ot_sec, totalB.adh_ot_sec) || 0;
      }

      if (metric === "conf") {
        valA = calc(totalA.conf_in_sec, totalA.adhe_sec) || 0;
        valB = calc(totalB.conf_in_sec, totalB.adhe_sec) || 0;
      }

      if (metric === "conf_ot") {
        valA = calc(totalA.conf_ot_sec, totalA.adh_ot_sec) || 0;
        valB = calc(totalB.conf_ot_sec, totalB.adh_ot_sec) || 0;
      }

      return valA - valB;
    });

  }, [tableData, entityKey, dates, metric]);

  const exportExcel = () => {

    const rows = [];

    entities.forEach((entity) => {

      const total = {
        adhe_sec: 0,
        in_adhe_sec: 0,
        adh_ot_sec: 0,
        in_adhe_ot_sec: 0,
        conf_in_sec: 0,
        conf_ot_sec: 0,
      };

      dates.forEach((d) => {

        const r = entity.rows[d];

        if (!r) return;

        total.adhe_sec += Number(r.adhe_sec) || 0;
        total.in_adhe_sec += Number(r.in_adhe_sec) || 0;

        total.adh_ot_sec += Number(r.adh_ot_sec) || 0;
        total.in_adhe_ot_sec += Number(r.in_adhe_ot_sec) || 0;

        total.conf_in_sec += Number(r.conf_in_sec) || 0;
        total.conf_ot_sec += Number(r.conf_ot_sec) || 0;
      });

      const baseRow = {
        [entityLabel]: entity.name,
      };

      dates.forEach((d) => {

        const r = entity.rows[d];

        let val = null;

        if (metric === "adh") {
          val = r
            ? calc(r.in_adhe_sec, r.adhe_sec)
            : null;
        }

        if (metric === "adh_ot") {
          val = r
            ? calc(r.in_adhe_ot_sec, r.adh_ot_sec)
            : null;
        }

        if (metric === "conf") {
          val = r
            ? calc(r.conf_in_sec, r.adhe_sec)
            : null;
        }

        if (metric === "conf_ot") {
          val = r
            ? calc(r.conf_ot_sec, r.adh_ot_sec)
            : null;
        }

        baseRow[d] =
          val === null
            ? ""
            : `${Math.round(val * 100)}%`;
      });

      let totalVal = null;

      if (metric === "adh") {
        totalVal = calc(
          total.in_adhe_sec,
          total.adhe_sec
        );
      }

      if (metric === "adh_ot") {
        totalVal = calc(
          total.in_adhe_ot_sec,
          total.adh_ot_sec
        );
      }

      if (metric === "conf") {
        totalVal = calc(
          total.conf_in_sec,
          total.adhe_sec
        );
      }

      if (metric === "conf_ot") {
        totalVal = calc(
          total.conf_ot_sec,
          total.adh_ot_sec
        );
      }

      baseRow["Total"] =
        totalVal === null
          ? ""
          : `${Math.round(totalVal * 100)}%`;

      rows.push(baseRow);
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Adherence"
    );

    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(
      blob,
      `adherence_${metric}.xlsx`
    );
  };

  if (!tableData.length) return null;

  return (
    <div className="relative bg-white border rounded-2xl shadow-sm overflow-hidden">

      {/* FLOATING DOWNLOAD BUTTON */}
      <button
        onClick={exportExcel}
        title="Download Excel"
        className="
          absolute top-2 right-2 z-50

          h-4 w-4
          flex items-center justify-center

          rounded-full

          bg-slate-800
          hover:bg-slate-900

          text-white

          shadow-lg
          hover:shadow-xl

          transition-all
          duration-200

          hover:scale-105
        "
      >
        <Download size={8} />
      </button>
      
      <div className="max-h-[650px] overflow-x-auto overflow-y-auto scrollbar-none">

        <table
          className="w-full text-[10px] text-center border-separate border-spacing-0"
        >

          {/* HEADER */}
          <thead className="bg-slate-50 text-slate-500 sticky top-0 z-20">
            <tr className="border-b">

              <th className="w-[220px] min-w-[220px] max-w-[220px] p-2 text-left font-semibold sticky left-0 bg-slate-50 z-30">
                {entityLabel} / Metric
              </th>

              {dates.map((d) => (
                <th
                  key={d}
                  className="min-w-[70px] px-2 py-2 font-semibold whitespace-nowrap"
                >
                  {d}
                </th>
              ))}

              <th className="min-w-[70px] px-2 py-2 font-bold text-gray-900">
                Total
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {entities.map((entity, idx) => {

              const total = {
                adhe_sec: 0,
                in_adhe_sec: 0,
                adh_ot_sec: 0,
                in_adhe_ot_sec: 0,
                conf_in_sec: 0,
                conf_ot_sec: 0,
              };

              dates.forEach((d) => {
                const r = entity.rows[d];
                if (!r) return;

                total.adhe_sec += Number(r.adhe_sec) || 0;
                total.in_adhe_sec += Number(r.in_adhe_sec) || 0;
                total.adh_ot_sec += Number(r.adh_ot_sec) || 0;
                total.in_adhe_ot_sec += Number(r.in_adhe_ot_sec) || 0;
                total.conf_in_sec += Number(r.conf_in_sec) || 0;
                total.conf_ot_sec += Number(r.conf_ot_sec) || 0;
              });

              return (
                <tr
                  key={idx}
                  className="border-b hover:bg-slate-50"
                >
                  {/* NOMBRE */}
                  <td className="p-2 text-left font-semibold sticky left-0 bg-white z-10">
                    {entity.name || "-"}
                  </td>

                  {/* =========================================
                      ADHERENCE
                  ========================================= */}
                  {metric === "adh" && (
                    <>
                      {dates.map((d) => {
                        const r = entity.rows[d];

                        const val = r
                          ? calc(r.in_adhe_sec, r.adhe_sec)
                          : null;

                        return (
                          <td key={d}>
                            <PercentBadge value={val} />
                          </td>
                        );
                      })}

                      <td>
                        <PercentBadge
                          value={calc(
                            total.in_adhe_sec,
                            total.adhe_sec
                          )}
                        />
                      </td>
                    </>
                  )}

                  {/* =========================================
                      ADHERENCE OT
                  ========================================= */}
                  {metric === "adh_ot" && (
                    <>
                      {dates.map((d) => {
                        const r = entity.rows[d];

                        const val = r
                          ? calc(r.in_adhe_ot_sec, r.adh_ot_sec)
                          : null;

                        return (
                          <td key={d}>
                            <PercentBadge value={val} />
                          </td>
                        );
                      })}

                      <td>
                        <PercentBadge
                          value={calc(
                            total.in_adhe_ot_sec,
                            total.adh_ot_sec
                          )}
                        />
                      </td>
                    </>
                  )}

                  {/* =========================================
                      CONFORMANCE
                  ========================================= */}
                  {metric === "conf" && (
                    <>
                      {dates.map((d) => {
                        const r = entity.rows[d];

                        const val = r
                          ? calc(r.conf_in_sec, r.adhe_sec)
                          : null;

                        return (
                          <td key={d}>
                            <PercentBadge value={val} />
                          </td>
                        );
                      })}

                      <td>
                        <PercentBadge
                          value={calc(
                            total.conf_in_sec,
                            total.adhe_sec
                          )}
                        />
                      </td>
                    </>
                  )}

                  {/* =========================================
                      CONFORMANCE OT
                  ========================================= */}
                  {metric === "conf_ot" && (
                    <>
                      {dates.map((d) => {
                        const r = entity.rows[d];

                        const val = r
                          ? calc(r.conf_ot_sec, r.adh_ot_sec)
                          : null;

                        return (
                          <td key={d}>
                            <PercentBadge value={val} />
                          </td>
                        );
                      })}

                      <td>
                        <PercentBadge
                          value={calc(
                            total.conf_ot_sec,
                            total.adh_ot_sec
                          )}
                        />
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdheSumTable;
