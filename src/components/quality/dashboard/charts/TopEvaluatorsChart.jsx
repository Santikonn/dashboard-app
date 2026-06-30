import {

    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip

} from "recharts";

import { evaluators } from "../../../../data/dashboardDummy";

export default function TopEvaluatorsChart() {

    return (

        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-lg font-semibold mb-4">

                Top Evaluators

            </h2>

            <ResponsiveContainer width="100%" height={280}>

                <BarChart
                    layout="vertical"
                    data={evaluators}
                >

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis type="number"/>

                    <YAxis
                        dataKey="name"
                        type="category"
                    />

                    <Tooltip/>

                    <Bar
                        dataKey="evaluations"
                        radius={[0,6,6,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}