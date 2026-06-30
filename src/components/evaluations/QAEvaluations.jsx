import EvaluationHeader from "./EvaluationHeader";
import EvaluationStats from "./EvaluationStats";
import EvaluationFilters from "./EvaluationFilters";
import EvaluationTable from "./EvaluationTable";

export default function QAEvaluations({

    onCreate

}) {

    return (

        <div className="space-y-6">

            <EvaluationHeader
                onCreate={onCreate}
            />

            <EvaluationStats />

            <EvaluationFilters />

            <EvaluationTable />

        </div>

    );

}