import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

import { distribution } from "../../../../data/dashboardDummy";

const COLORS = [
    "#2563eb",
    "#38bdf8",
    "#fbbf24",
    "#ef4444"
];

export default function ScoreDistributionChart() {

    return (

        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-lg font-semibold mb-4">

                Score Distribution

            </h2>

            <ResponsiveContainer width="100%" height={280}>

                <PieChart>

                    <Pie
                        data={distribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={100}
                    >

                        {

                            distribution.map((_,index)=>(

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}