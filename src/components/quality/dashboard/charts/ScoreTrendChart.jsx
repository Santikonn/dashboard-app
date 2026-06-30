import {

    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid

} from "recharts";

import { scoreTrend } from "../../../../data/dashboardDummy";

export default function ScoreTrendChart() {

    return (

        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="font-semibold text-lg mb-4">

                Average QA Score

            </h2>

            <ResponsiveContainer
                width="100%"
                height={280}
            >

                <LineChart data={scoreTrend}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line

                        type="monotone"

                        dataKey="score"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}