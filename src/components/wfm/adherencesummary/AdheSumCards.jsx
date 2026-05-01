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

  const totals = useMemo(() => {
    if (!data.length) return null;

    const onlyAgents = data.filter(d => d.level === "agent");

    const sum = (key) =>
      onlyAgents.reduce((acc, row) => acc + (Number(row[key]) || 0), 0);

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
  }, [data]);

  if (!totals) return null;

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