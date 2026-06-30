export default function EvaluationStats() {

    const cards = [

        {
            title: "Total",
            value: 0
        },

        {
            title: "Completed",
            value: 0
        },

        {
            title: "In Progress",
            value: 0
        },

        {
            title: "Average Score",
            value: "--"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {

                cards.map(card => (

                    <div

                        key={card.title}

                        className="
                            bg-white
                            border
                            rounded-2xl
                            p-5
                            shadow-sm
                        "

                    >

                        <div className="text-sm text-slate-500">

                            {card.title}

                        </div>

                        <div className="text-2xl font-bold mt-2">

                            {card.value}

                        </div>

                    </div>

                ))

            }

        </div>

    );

}