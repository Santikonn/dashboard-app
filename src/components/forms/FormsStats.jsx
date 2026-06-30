import {
    FileText,
    FilePenLine,
    CircleCheckBig,
    Ban
} from "lucide-react";

export default function FormsStats({

    forms,

    selectedStatus,

    onSelectStatus

}) {

    const total = forms.length;

    const draft =
        forms.filter(
            f => f.status === "Draft"
        ).length;

    const published =
        forms.filter(
            f => f.status === "Published"
        ).length;

    const disabled =
        forms.filter(
            f => f.status === "Disabled"
        ).length;

    const cards = [

        {

            title: "Total Forms",
            value: total,
            status: null,
            icon: FileText,
            iconColor:
                "text-slate-600",
            activeClass:
                "bg-slate-100 border-slate-300",
            hoverClass:
                "hover:bg-slate-50"
        },

        {
            title: "Draft",
            value: draft,
            status: "Draft",
            icon: FilePenLine,
            iconColor:
                "text-amber-600",
            activeClass:
                "bg-amber-50 border-amber-300",
            hoverClass:
                "hover:bg-amber-50"
        },

        {
            title: "Published",
            value: published,
            status: "Published",
            icon: CircleCheckBig,
            iconColor:
                "text-emerald-600",
            activeClass:
                "bg-emerald-50 border-emerald-300",
            hoverClass:
                "hover:bg-emerald-50"
        },

        {
            title: "Disabled",
            value: disabled,
            status: "Disabled",
            icon: Ban,
            iconColor:
                "text-red-600",
            activeClass:
                "bg-red-50 border-red-300",
            hoverClass:
                "hover:bg-red-50"
        }

    ];

    return (

        <div
            className="
                grid
                gap-4
                grid-cols-4
                xl:grid-cols-4
            "
        >

            {

                cards.map(card => {
                    const Icon = card.icon;
                    const active =
                        selectedStatus === card.status ||
                        (
                            selectedStatus === null &&
                            card.status === null
                        );

                    return (

                        <button

                            key={card.title}
                            onClick={() =>
                                onSelectStatus(card.status)
                            }
                            className={`
                                rounded-2xl
                                border
                                p-4
                                text-left
                                shadow-sm
                                transition-all
                                duration-200
                                hover:shadow-md

                                ${card.hoverClass}

                                ${
                                    active
                                    ? card.activeClass
                                    : "bg-white border-slate-200"
                                }
                            `}
                        >

                            <div
                                className="
                                    flex
                                    justify-between
                                    items-center
                                "
                            >

                                <span
                                    className="
                                        text-sm
                                        font-medium
                                        text-slate-500
                                    "
                                >

                                    {card.title}

                                </span>

                                <Icon

                                    size={20}
                                    className={card.iconColor}

                                />

                            </div>

                            <div
                                className="
                                    mt-3
                                    text-3xl
                                    font-bold
                                    text-slate-800
                                "
                            >

                                {card.value}

                            </div>

                        </button>

                    );

                })

            }

        </div>

    );

}