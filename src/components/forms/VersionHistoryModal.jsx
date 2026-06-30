import { X, History } from "lucide-react";

const statusColors = {

    DRAFT:
        "bg-amber-100 text-amber-700",

    PUBLISHED:
        "bg-emerald-100 text-emerald-700",

    ARCHIVED:
        "bg-slate-200 text-slate-700"

};

export default function VersionHistoryModal({

    open,
    onClose,
    formName,
    versions

}) {

    if (!open) return null;

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-black/40
                flex
                items-center
                justify-center
                p-4
            "
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    w-full
                    max-w-2xl
                    max-h-[80vh]
                    overflow-hidden
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-4
                        border-b
                    "
                >

                    <div className="flex items-center gap-3">

                        <History className="text-blue-600" />

                        <div>

                            <h2 className="text-lg font-semibold">

                                Version History

                            </h2>

                            <p className="text-sm text-slate-500">

                                {formName}

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                            p-2
                            rounded-lg
                            hover:bg-slate-100
                        "

                    >

                        <X size={18} />

                    </button>

                </div>

                <div
                    className="
                        p-6
                        space-y-4
                        overflow-y-auto
                        max-h-[60vh]
                    "
                >

                    {

                        versions.map(version => (

                            <div

                                key={version.form_version_id}

                                className="
                                    border
                                    rounded-xl
                                    p-4
                                    flex
                                    justify-between
                                    items-center
                                "

                            >

                                <div>

                                    <div className="font-semibold">

                                        Version {version.version_number}

                                    </div>

                                    <div className="text-sm text-slate-500 mt-1">

                                        Updated {new Date(
                                            version.updated_at
                                        ).toLocaleString()}

                                    </div>

                                </div>

                                <span

                                    className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-medium
                                        ${statusColors[
                                            version.status_code
                                        ]}
                                    `}

                                >

                                    {version.status}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}