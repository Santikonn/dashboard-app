import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { evaluations } from "../../../../data/dashboardDummy";

export default function EvaluationsChart() {

    return (

        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-lg font-semibold mb-4">

                Evaluations by Month

            </h2>

            <ResponsiveContainer width="100%" height={280}>

                <BarChart data={evaluations}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis dataKey="month"/>

                    <YAxis/>

                    <Tooltip/>

                    <Bar
                        dataKey="total"
                        radius={[6,6,0,0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}