import QuestionCard from "./QuestionCard";
import { Trash2, Plus } from "lucide-react";

export default function SectionCard({
  section,
  form,
  setForm
}) {

  const usedPoints = section.questions.reduce(

    (acc, question) =>

      acc +

      (
        question.hasScore
          ? Number(question.maxScore || 0)
          : 0
      ),

    0

  );

  const availablePoints = Math.max(

    0,

    Number(section.maxScore || 0) - usedPoints

  );

  const exceeded =
    usedPoints >
    Number(section.maxScore || 0);

  const updateSection = (updates) => {

    // Si la sección pierde Score,
    // todas las preguntas también.

    if (

      !updates.hasScore &&
      section.hasScore

    ) {

      updates.questions =
        updates.questions.map(question => ({

          ...question,

          hasScore:false,

          maxScore:null,

          allowsNA:false,

          isCritical:false,

          options:
            question.options.map(option => ({

              ...option,

              score:"",

              isFailOption:false

            }))

        }));

    }

    setForm(prev => ({

      ...prev,

      sections:
        prev.sections.map(s=>

          s.id===section.id
            ? updates
            : s

        )

    }));

  };

  const addQuestion = () => {

    const question = {

      id:crypto.randomUUID(),

      title:"",

      type:"SHORT_TEXT",

      subtype:"TEXT",

      placeholder:"",

      hasScore:false,

      maxScore:null,

      allowsNA:false,

      isCritical:false,

      options:[]

    };

    updateSection({

      ...section,

      questions:[
        ...section.questions,
        question
      ]

    });

  };

  const deleteSection = () => {

    if(form.sections.length===1)
      return;

    setForm(prev=>({

      ...prev,

      sections:
        prev.sections.filter(
          s=>s.id!==section.id
        )

    }));

  };

  return (

  <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

    {/* HEADER */}

    <div className="border-b bg-slate-50 p-4">

      <div className="flex flex-wrap items-center gap-3">

        {/* SECTION NAME */}

        <input

          value={section.title}

          placeholder="Section Name"

          onChange={(e)=>

            updateSection({

              ...section,

              title:e.target.value

            })

          }

          className="
            flex-1
            min-w-[260px]
            bg-transparent
            text-lg
            font-semibold
            border-b
            border-transparent
            focus:border-slate-300
            outline-none
            pb-1
          "

        />

        {/* SCORE */}

        <label className="flex items-center gap-2 text-sm">

          <input

            type="checkbox"

            checked={section.hasScore || false}

            onChange={(e)=>

              updateSection({

                ...section,

                hasScore:e.target.checked,

                maxScore:
                  e.target.checked
                    ? section.maxScore
                    : null

              })

            }

          />

          Score

        </label>

        {/* MAX SCORE */}

        {section.hasScore && (

          <input

            type="number"

            min="0"

            value={section.maxScore ?? ""}

            placeholder="Pts"

            onChange={(e)=>

              updateSection({

                ...section,

                maxScore:
                  e.target.value===""

                    ? null

                    : Number(e.target.value)

              })

            }

            className="
              w-24
              border
              rounded-lg
              px-3
              py-2
              text-sm
            "

          />

        )}

        {/* USED */}

        {section.hasScore && (

          <span

            className={`
              px-3
              py-2
              rounded-full
              text-xs
              font-medium

              ${
                exceeded

                  ? "bg-red-100 text-red-700"

                  : usedPoints===Number(section.maxScore||0)

                    ? "bg-green-100 text-green-700"

                    : "bg-blue-100 text-blue-700"

              }

            `}

          >

            {usedPoints} / {section.maxScore || 0}

          </span>

        )}

        {/* DELETE */}

        <button

          disabled={form.sections.length===1}

          onClick={deleteSection}

          className="
            p-2
            rounded-lg
            hover:bg-red-50
            hover:text-red-600
            disabled:opacity-30
            disabled:cursor-not-allowed
          "

        >

          <Trash2 size={17}/>

        </button>

      </div>

    </div>

          {/* QUESTIONS */}

      <div className="p-4 space-y-4">

        {section.questions.map((question) => (

          <QuestionCard
            key={question.id}
            question={question}
            sectionId={section.id}
            form={form}
            setForm={setForm}
            maxAvailable={availablePoints}
          />

        ))}

      </div>

      {/* FOOTER */}

      <div className="border-t bg-slate-50 px-4 py-3">

        <button
          onClick={addQuestion}
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-700
            hover:text-slate-900
            transition
          "
        >
          <Plus size={10} />
          Add Question
        </button>

      </div>

    </div>

  );

}