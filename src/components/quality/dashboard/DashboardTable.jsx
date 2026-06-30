import { MoreVertical } from "lucide-react";
import { recentEvaluations } from "../../../data/evaluationsDummy";

export default function DashboardTable() {

    const badge = {

        Completed:"bg-green-100 text-green-700",

        Pending:"bg-yellow-100 text-yellow-700",

        Failed:"bg-red-100 text-red-700"

    };

    return (

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

            <div className="p-6 border-b">

                <h2 className="text-xl font-semibold">

                    Recent Evaluations

                </h2>

            </div>

            <table className="w-full">

                <thead>

                    <tr className="bg-slate-50">

                        <th className="text-left p-4">Agent</th>

                        <th className="text-left p-4">Evaluator</th>

                        <th className="text-left p-4">QA Form</th>

                        <th className="text-left p-4">Score</th>

                        <th className="text-left p-4">Status</th>

                        <th className="text-left p-4">Date</th>

                        <th className="p-4"></th>

                    </tr>

                </thead>

                <tbody>

                {

                    recentEvaluations.map(row=>(

                        <tr
                            key={row.id}
                            className="border-t hover:bg-slate-50 transition"
                        >

                            <td className="p-4 font-medium">

                                {row.agent}

                            </td>

                            <td className="p-4">

                                {row.evaluator}

                            </td>

                            <td className="p-4">

                                {row.form}

                            </td>

                            <td className="p-4">

                                <div className="flex items-center gap-3">

                                    <div className="w-28 h-2 bg-slate-200 rounded-full">

                                        <div

                                            className="bg-blue-600 h-2 rounded-full"

                                            style={{

                                                width:`${row.score}%`

                                            }}

                                        />

                                    </div>

                                    <span>

                                        {row.score}%

                                    </span>

                                </div>

                            </td>

                            <td className="p-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${badge[row.status]}`}
                                >

                                    {row.status}

                                </span>

                            </td>

                            <td className="p-4">

                                {row.date}

                            </td>

                            <td className="p-4">

                                <button>

                                    <MoreVertical size={18}/>

                                </button>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}