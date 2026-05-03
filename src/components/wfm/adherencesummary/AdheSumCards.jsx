import { useMemo } from "react";
import KPICard from "../KPICard";

/* =========================
   HELPERS
========================= */
const formatPct = (value) => {
  if (!value || isNaN(value)) return "-";
  return `${Math.round(value * 100)}%`;
};

const getVariant = (v) => {
  if (!v) return "default";
  if (v >= 0.9) return "success";
  if (v >= 0.75) return "warning";
  return "danger";
};

const AdheSummaryCards = ({ data = [] }) => {

  /* =========================
     BASE DATA (CLAVE 🔥)
  ========================= */
  const baseData = useMemo(() => {
    if (!data.length) return [];

    // 👉 Si viene de SP2 (agents)
    if (data[0]?.level) {
      return data.filter(d => d.level === "agent");
    }

    // 👉 Si viene de SP1 (leaders)
    return data;
  }, [data]);

  /* =========================
     CALCULOS
  ========================= */
  const totals = useMemo(() => {
    if (!baseData.length) return null;

    const sum = (key) =>
      baseData.reduce((acc, row) => acc + (Number(row[key]) || 0), 0);

    const adhe_sec = sum("adhe_sec");
    const in_adhe_sec = sum("in_adhe_sec");
    const adh_ot_sec = sum("adh_ot_sec");
    const in_adhe_ot_sec = sum("in_adhe_ot_sec");
    const conf_in_sec = sum("conf_in_sec");
    const conf_ot_sec = sum("conf_ot_sec");

    return {
      adherence: adhe_sec ? in_adhe_sec / adhe_sec : null,
      adherence_ot: adh_ot_sec ? in_adhe_ot_sec / adh_ot_sec : null,
      conformance: adhe_sec ? conf_in_sec / adhe_sec : null,
      conformance_ot: adh_ot_sec ? conf_ot_sec / adh_ot_sec : null,
    };
  }, [baseData]);

  if (!totals) return null;

  /* =========================
     UI
  ========================= */
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

      <KPICard
        title="Adherence %"
        value={formatPct(totals.adherence)}
        variant={getVariant(totals.adherence)}
      />

      <KPICard
        title="OT Adherence %"
        value={formatPct(totals.adherence_ot)}
        variant={getVariant(totals.adherence_ot)}
      />

      <KPICard
        title="Conformance %"
        value={formatPct(totals.conformance)}
        variant={getVariant(totals.conformance)}
      />

      <KPICard
        title="OT Conformance %"
        value={formatPct(totals.conformance_ot)}
        variant={getVariant(totals.conformance_ot)}
      />

    </div>
  );
};

export default AdheSummaryCards;