const cards = [

    {
        title: "Average Score",
        value: "92%"
    },

    {
        title: "Evaluations",
        value: "1,248"
    },

    {
        title: "Critical Fails",
        value: "17"
    },

    {
        title: "Pending Reviews",
        value: "24"
    }

];

export default function DashboardCards() {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map(card=>(

                    <div

                        key={card.title}

                        className="
                            bg-white
                            rounded-2xl
                            border
                            shadow-sm
                            p-6
                        "

                    >

                        <p className="text-slate-500 text-sm">

                            {card.title}

                        </p>

                        <h2 className="text-4xl font-bold mt-3">

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </div>

    );

}