import {
  Eye,
  Save,
  Rocket,
  Pencil, 
  ArrowLeft
} from "lucide-react";

export default function FormHeader({
  form,
  setForm,
  mode,
  setMode,
  onSave,
  saving,
  saveButtonLabel,
  onBack
}) {

  const totalSections = form.sections.length;

  const totalQuestions =
    form.sections.reduce(
      (acc, section) =>
        acc + section.questions.length,
      0
    );

  const totalPoints =
    form.sections.reduce(
      (acc, section) =>
        acc +
        (
          section.hasScore
            ? Number(section.maxScore || 0)
            : 0
        ),
      0
    );

  return (

    <div className="bg-white border rounded-2xl shadow-sm p-5">

      <div className="flex flex-col gap-5">

        {/* BACK */}

        {onBack && (

          <button

            onClick={onBack}

            className="
              w-fit
              flex
              items-center
              gap-2

              text-sm

              text-slate-500
              hover:text-blue-600

              transition
            "

          >

            <ArrowLeft size={16} />

            Forms

          </button>

        )}

        {/* HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <input
            value={form.title}
            onChange={(e)=>
              setForm(prev=>({
                ...prev,
                title:e.target.value
              }))
            }
            placeholder="Untitled Form"
            className="
              flex-1
              min-w-[260px]
              text-2xl
              font-semibold
              bg-transparent
              border-b
              border-transparent
              focus:border-slate-300
              outline-none
              pb-1
            "
          />

          <div className="flex flex-wrap items-center gap-2">

            <button
              onClick={()=>
                setMode(
                  mode==="edit"
                    ? "preview"
                    : "edit"
                )
              }
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                border
                bg-white
                hover:bg-slate-50
                transition
              "
            >

              {
                mode==="edit"

                  ? <Eye size={18}/>

                  : <Pencil size={18}/>

              }

              {

                mode==="edit"

                  ? "Preview"

                  : "Edit"

              }

            </button>

            <button
              onClick={onSave}
              disabled={saving}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-slate-900
                text-white
                hover:bg-slate-800
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "
            >

              <Save size={18}/>

              {saving
              ? "Saving..."
              : saveButtonLabel}

            </button>

            <button
              disabled
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                border
                opacity-50
                cursor-not-allowed
              "
            >

              <Rocket size={18}/>

              Publish

            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="flex flex-wrap gap-3">

          <div
            className="
              px-4
              py-2
              rounded-full
              bg-slate-100
              text-sm
              font-medium
              text-slate-700
            "
          >
            Sections {totalSections}
          </div>

          <div
            className="
              px-4
              py-2
              rounded-full
              bg-slate-100
              text-sm
              font-medium
              text-slate-700
            "
          >
            Questions {totalQuestions}
          </div>

          <div
            className="
              px-4
              py-2
              rounded-full
              bg-blue-50
              text-sm
              font-medium
              text-blue-700"
            >
            Points {totalPoints}
          </div>

        </div>

      </div>

    </div>

  );

}