import { Plus } from "lucide-react";

export default function EvaluationHeader({
    onCreate
}) {

    return (

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Evaluations

                </h1>

                <p className="text-slate-500 mt-2">

                    Manage quality evaluations.

                </p>

            </div>

            <button

                onClick={onCreate}

                className="
                    flex
                    items-center
                    gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    transition
                "

            >

                <Plus size={18} />

                New Evaluation

            </button>

        </div>

    );

}