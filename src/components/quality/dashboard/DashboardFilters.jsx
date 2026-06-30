export default function DashboardFilters() {

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                shadow-sm
                p-6
            "
        >

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                <select className="border rounded-xl px-4 py-3">
                    <option>Last 30 Days</option>
                </select>

                <select className="border rounded-xl px-4 py-3">
                    <option>Campaign</option>
                </select>

                <select className="border rounded-xl px-4 py-3">
                    <option>Evaluator</option>
                </select>

                <select className="border rounded-xl px-4 py-3">
                    <option>Team Leader</option>
                </select>

                <select className="border rounded-xl px-4 py-3">
                    <option>QA Form</option>
                </select>

            </div>

        </div>

    );

}