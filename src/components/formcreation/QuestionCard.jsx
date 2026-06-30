import { Trash2, Copy } from "lucide-react";
import QuestionPreview from "./QuestionPreview";
import QuestionOptions from "./QuestionOptions";

export default function QuestionCard({
  question,
  sectionId,
  form,
  setForm,
  maxAvailable
}) {

  const section = form.sections.find(
    s => s.id === sectionId
  );

  const isChoiceQuestion = [
    "RADIO",
    "CHECKBOX",
    "DROPDOWN"
  ].includes(question.type);

  const isTextQuestion = [
    "SHORT_TEXT",
    "PARAGRAPH"
  ].includes(question.type);

  const isDateQuestion =
    question.type === "DATE";

  const maxAllowed =
    (Number(question.maxScore || 0)) +
    (Number(maxAvailable || 0));

  const updateQuestion = (updates) => {

    // Si cambia el tipo de pregunta
    if (
      updates.type &&
      updates.type !== question.type
    ) {

      const choiceTypes = [
        "RADIO",
        "CHECKBOX",
        "DROPDOWN"
      ];

      if (!choiceTypes.includes(updates.type)) {

        updates.options = [];

        updates.hasScore = false;

        updates.maxScore = null;

        updates.allowsNA = false;

        updates.isCritical = false;

      }

      if (
        updates.type === "SHORT_TEXT"
      ) {

        updates.subtype =
          updates.subtype || "TEXT";

      }
      else {

        updates.subtype = null;

      }

      if (
        choiceTypes.includes(updates.type) &&
        question.options.length === 0
      ) {

        updates.options = [
          {
            id: crypto.randomUUID(),
            text: "Option 1",
            score: "",
            isNA: false,
            isFailOption: false,
            displayOrder: 1
          }
        ];

      }

    }

    // Si cambia el score de la pregunta
    // actualizamos automáticamente el N/A

    if (
      updates.hasScore &&
      updates.allowsNA &&
      updates.options
    ) {

      updates.options =
        updates.options.map(option =>

          option.isNA
            ? {
                ...option,
                score:
                  updates.maxScore
              }
            : option

        );

    }

    // Si activa Allow N/A

    if (
      updates.allowsNA &&
      !question.allowsNA
    ) {

      updates.options = [

        ...(updates.options || []),

        {

          id: crypto.randomUUID(),

          text: "N/A",

          score:
            updates.hasScore
              ? updates.maxScore
              : "",

          isNA: true,

          isFailOption: false,

          system: true,

          displayOrder:
            (updates.options?.length || 0) + 1

        }

      ];

    }

    // Si desactiva Allow N/A

    if (
      !updates.allowsNA &&
      question.allowsNA
    ) {

      updates.options =
        updates.options.filter(
          option => !option.isNA
        );

    }

    setForm(prev => ({

      ...prev,

      sections:
        prev.sections.map(section =>

          section.id === sectionId

            ? {

                ...section,

                questions:
                  section.questions.map(q =>

                    q.id === question.id
                      ? updates
                      : q

                  )

              }

            : section

        )

    }));

  };

    const duplicateQuestion = () => {

    const copy = structuredClone(question);

    copy.id = crypto.randomUUID();

    copy.title = question.title
      ? `${question.title} (Copy)`
      : "";

    setForm(prev => ({

      ...prev,

      sections: prev.sections.map(section =>

        section.id === sectionId

          ? {

              ...section,

              questions: section.questions.flatMap(q =>

                q.id === question.id
                  ? [q, copy]
                  : [q]

              )

            }

          : section

      )

    }));

  };

  const deleteQuestion = () => {

    setForm(prev => ({

      ...prev,

      sections: prev.sections.map(section =>

        section.id === sectionId

          ? {

              ...section,

              questions: section.questions.filter(
                q => q.id !== question.id
              )

            }

          : section

      )

    }));

  };

  return (

  <div className="border rounded-xl bg-white p-4 space-y-4">

    {/* QUESTION */}

    <input

      value={question.title}

      placeholder="Question"

      onChange={(e)=>

        updateQuestion({

          ...question,

          title:e.target.value

        })

      }

      className="
        w-full
        border-b
        border-transparent
        focus:border-slate-300
        pb-2
        text-base
        font-medium
        outline-none
      "

    />

    {/* SETTINGS */}

    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6 items-center">

      {/* TYPE */}

      <select

        value={question.type}

        onChange={(e)=>

          updateQuestion({

            ...question,

            type:e.target.value

          })

        }

        className="
          border
          rounded-lg
          px-3
          py-2
          text-sm
        "

      >

        <option value="SHORT_TEXT">
          Short Text
        </option>

        <option value="PARAGRAPH">
          Paragraph
        </option>

        <option value="RADIO">
          Radio
        </option>

        <option value="CHECKBOX">
          Checkbox
        </option>

        <option value="DROPDOWN">
          Dropdown
        </option>

        <option value="DATE">
          Date
        </option>

      </select>

      {/* SUBTYPE */}

      {question.type==="SHORT_TEXT" && (

        <select

          value={question.subtype || "TEXT"}

          onChange={(e)=>

            updateQuestion({

              ...question,

              subtype:e.target.value

            })

          }

          className="
            border
            rounded-lg
            px-3
            py-2
            text-sm
          "

        >

          <option value="TEXT">
            Alphanumeric
          </option>

          <option value="NUMBER">
            Number
          </option>

          <option value="EMAIL">
            Email
          </option>

          <option value="PHONE">
            Phone
          </option>

          <option value="URL">
            URL
          </option>

        </select>

      )}

      {/* PLACEHOLDER */}

      {["SHORT_TEXT","PARAGRAPH"].includes(question.type) && (

        <input

          value={question.placeholder || ""}

          placeholder="Placeholder"

          onChange={(e)=>

            updateQuestion({

              ...question,

              placeholder:e.target.value

            })

          }

          className="
            flex-1
            min-w-[220px]
            border
            rounded-lg
            px-3
            py-2
            text-sm
          "

        />

      )}

      {/* SCORE */}

      {isChoiceQuestion && (

        <label className="flex items-center gap-2 text-sm">

          <input

            type="checkbox"

            checked={question.hasScore || false}

            onChange={(e)=>

              updateQuestion({

                ...question,

                hasScore:e.target.checked,

                maxScore:e.target.checked
                  ? question.maxScore
                  : null

              })

            }

          />

          Score

        </label>

      )}

      {isChoiceQuestion && question.hasScore && (

        <input

          type="number"
          min="0"
          max={maxAllowed}
          value={question.maxScore ?? ""}
          placeholder="Pts"

          onChange={(e)=>
            updateQuestion({
              ...question,
              maxScore:
                e.target.value === ""
                  ? null
                  : Math.min(
                      Number(e.target.value),
                      maxAllowed
                  )
            })

          }

          className="
            w-20
            border
            rounded-lg
            px-2
            py-2
            text-sm
          "

        />

      )}

      {question.hasScore && (

        <div className="text-xs text-slate-500">
          Available: {maxAllowed}
        </div>

      )}

      {/* N/A */}

      {isChoiceQuestion && (

        <label className="flex items-center gap-2 text-sm">

          <input

            type="checkbox"
            checked={question.allowsNA || false}
            
            onChange={(e)=>
              updateQuestion({
                ...question,
                allowsNA:e.target.checked
              })
            }

          />

          N/A

        </label>

      )}

      {/* CRITICAL */}

      {isChoiceQuestion && (

        <label className="flex items-center gap-2 text-sm">

          <input

            type="checkbox"

            checked={question.isCritical || false}

            onChange={(e)=>

              updateQuestion({

                ...question,

                isCritical:e.target.checked

              })

            }

          />

          Critical

        </label>

      )}

    </div>      

      {/* OPTIONS */}

      {isChoiceQuestion && (

        <QuestionOptions
          question={question}
          onUpdate={updateQuestion}
        />

      )}

      {/* FOOTER */}

      <div className="flex items-center justify-between border-t pt-4">

        <div className="flex items-center gap-2">

          <button
            onClick={duplicateQuestion}
            title="Duplicate Question"
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              transition
            "
          >
            <Copy size={16}/>
          </button>

          <button
            onClick={deleteQuestion}
            title="Delete Question"
            className="
              p-2
              rounded-lg
              text-slate-500
              hover:text-red-600
              hover:bg-red-50
              transition
            "
          >
            <Trash2 size={16}/>
          </button>        

        </div>
      </div>

    </div>

  );

}