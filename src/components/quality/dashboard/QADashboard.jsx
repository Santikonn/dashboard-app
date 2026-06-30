import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardFilters from "./DashboardFilters";
import DashboardTable from "./DashboardTable";

export default function QADashboard() {

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    QA Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    Monitor quality performance across evaluators, agents and campaigns.
                </p>

            </div>

            <DashboardFilters />

            <DashboardCards />

            <DashboardCharts />

            <DashboardTable />

        </div>

    );

}