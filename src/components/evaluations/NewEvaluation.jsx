import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getPublishedForms } from "../../api/formsApi";

export default function NewEvaluation({
    onBack
}) {

    const [forms, setForms] = useState([]);
    const [formId, setFormId] = useState("");
    const [agent, setAgent] = useState("");
    const [interactionId, setInteractionId] = useState("");
    const [evaluationDate, setEvaluationDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [comments, setComments] = useState("");

    useEffect(() => {
        async function loadForms() {
            try {
                const result = await getPublishedForms();
                setForms(result.forms);
            }
            catch (ex) {
                console.error(ex);
            }
        }
        loadForms();
    }, []);

    return (

        <div className="space-y-8">
            <button
                onClick={onBack}
                className="
                    flex
                    items-center
                    gap-2
                    text-slate-600
                    hover:text-slate-900
                "
            >

                <ArrowLeft size={18} />
                Evaluations
            </button>

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    New Evaluation
                </h1>

                <p className="text-slate-500 mt-2">
                    Select the information required to start the evaluation.
                </p>

            </div>

            <div
                className="
                    bg-white
                    rounded-2xl
                    border
                    shadow-sm
                    p-8
                    w-full
                "
            >

                <h2 className="text-xl font-semibold mb-6">
                    Evaluation Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            QA Form
                        </label>

                        <select
                            value={formId}
                            onChange={(e)=>setFormId(e.target.value)}
                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                        >

                            <option value="">
                                Select a form
                            </option>
                            {
                                forms.map(form => (
                                    <option
                                        key={form.public_id}
                                        value={form.public_id}
                                    >
                                        {form.name} (v{form.version_number})
                                    </option>
                                ))
                            }

                        </select>

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Agent

                        </label>

                        <select

                            value={agent}

                            onChange={(e)=>setAgent(e.target.value)}

                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "

                        >

                            <option value="">

                                Select an agent

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Interaction ID

                        </label>

                        <input

                            value={interactionId}

                            onChange={(e)=>setInteractionId(e.target.value)}

                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "

                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Evaluation Date

                        </label>

                        <input

                            type="date"

                            value={evaluationDate}

                            onChange={(e)=>setEvaluationDate(e.target.value)}

                            className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                            "

                        />

                    </div>

                </div>

                <div className="flex justify-end mt-8">

                    <button

                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            font-medium
                        "

                    >

                        Start Evaluation

                    </button>

                </div>

            </div>

        </div>

    );

}