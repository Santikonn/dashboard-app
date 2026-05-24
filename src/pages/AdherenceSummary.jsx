import { useState, useMemo } from "react";
import AdheSumFilters from "../components/wfm/adherencesummary/AdheSumFilters";
import AdheSummaryCards from "../components/wfm/adherencesummary/AdheSumCards";
import AdheSumTable from "../components/wfm/adherencesummary/AdheSumTable";

const AdherenceSummary = () => {
  const [data, setData] = useState([]);
  const [metric, setMetric] = useState("adh");

  const totals = useMemo(() => {

    const sum = (key) =>
      data.reduce(
        (acc, row) => acc + (Number(row[key]) || 0),
        0
      );

    const adhe_sec = sum("adhe_sec");
    const in_adhe_sec = sum("in_adhe_sec");

    const adh_ot_sec = sum("adh_ot_sec");
    const in_adhe_ot_sec = sum("in_adhe_ot_sec");

    const conf_in_sec = sum("conf_in_sec");
    const conf_ot_sec = sum("conf_ot_sec");

    return {
      adherence: adhe_sec
        ? in_adhe_sec / adhe_sec
        : null,

      adherence_ot: adh_ot_sec
        ? in_adhe_ot_sec / adh_ot_sec
        : null,

      conformance: adhe_sec
        ? conf_in_sec / adhe_sec
        : null,

      conformance_ot: adh_ot_sec
        ? conf_ot_sec / adh_ot_sec
        : null,
    };

  }, [data]);

  return (
    <div className="bg-slate-50 min-h-screen px-2 sm:px-4 py-3">
      <div className="max-w-7xl mx-auto space-y-4">

        {/* HEADER */}
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
            Adherence Summary
          </h1>
        </div>

        {/* FILTROS */}
        <AdheSumFilters
          onChange={({ data }) => {
            setData(data);
          }}
        />

        <AdheSummaryCards
          data={data}
          metric={metric}
          setMetric={setMetric}
        />
        <AdheSumTable
          data={data}
          metric={metric}
          totals={totals}
        />

      </div>
    </div>
  );
};

export default AdherenceSummary;