import ScoreTrendChart from "./charts/ScoreTrendChart";
import EvaluationsChart from "./charts/EvaluationsChart";
import ScoreDistributionChart from "./charts/ScoreDistributionChart";
import TopEvaluatorsChart from "./charts/TopEvaluatorsChart";

export default function DashboardCharts() {

    return (

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2">

                <ScoreTrendChart/>

            </div>

            <ScoreDistributionChart/>

            <div className="xl:col-span-2">

                <EvaluationsChart/>

            </div>

            <TopEvaluatorsChart/>

        </div>

    );

}