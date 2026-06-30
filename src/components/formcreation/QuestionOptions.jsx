import { Plus, Trash2 } from "lucide-react";
import { useRef } from "react";

export default function QuestionOptions({
  question,
  onUpdate
}) {

    const lastInputRef = useRef(null);
    const updateOption = (index, changes) => {

    const options = [...question.options];

    options[index] = {
      ...options[index],
      ...changes
    };

    onUpdate({
      ...question,
      options
    });

  };

  const addOption = () => {

    const normalOptions =
      question.options.filter(o => !o.isNA);

    const naOption =
      question.options.find(o => o.isNA);

    const newOptions = [

      ...normalOptions,

      {

        id: crypto.randomUUID(),
        text: `Option ${normalOptions.length + 1}`,
        score: "",
        isNA: false,
        isFailOption: false,
        displayOrder:
          normalOptions.length + 1

      }

    ];

    if (naOption)
      newOptions.push({

          ...naOption,

          displayOrder: newOptions.length + 1

      });

    onUpdate({
      ...question,
      options: newOptions
    });

    setTimeout(() => {
      lastInputRef.current?.focus();
    },50);

  };

  const deleteOption = (index) => {

    const option =
      question.options[index];

    if(option.isNA)
      return;

    onUpdate({

      ...question,

      options:
        question.options
          .filter((_,i)=>i!==index)
          .map((o,i)=>({

            ...o,

            displayOrder:i+1

          }))

    });

  };

    return (

    <div className="space-y-2">

      {question.options.map((option,index)=>(

        <div
          key={option.id}
          className="
            flex
            items-center
            gap-3
            rounded-lg
            border
            p-2
            bg-white
          "
        >

          {/* RADIO / CHECKBOX / DROPDOWN ICON */}

          <div className="w-5 flex justify-center">

            {question.type==="RADIO" && (
              <input
                type="radio"
                disabled
              />
            )}

            {question.type==="CHECKBOX" && (
              <input
                type="checkbox"
                disabled
              />
            )}

            {question.type==="DROPDOWN" && (
              <span className="text-slate-400">
                •
              </span>
            )}

          </div>

          {/* OPTION */}

          <input

            ref={
                index === question.options.length - 1
                    ? lastInputRef
                    : null
            }

            value={option.text}
            disabled={option.isNA}

            onChange={(e)=>
              updateOption(index,{
                text:e.target.value
              })
            }

            onKeyDown={(e)=>{
                if(e.key==="Enter"){
                    e.preventDefault();
                    addOption();
                }
            }}

            className="
              flex-1
              border-b
              border-transparent
              focus:border-slate-300
              outline-none
              py-1
              text-sm
              disabled:bg-transparent
              disabled:text-slate-500
            "

          />

          {/* SCORE */}

          {question.hasScore && (

            <input

                type="number"
                min="0"
                max={question.maxScore || 0}
                value={option.score ?? ""}
                disabled={option.system}
                placeholder="Pts"
                onChange={(e)=>{

                    const value =
                    e.target.value === ""
                        ? ""
                        : Math.min(
                            Number(e.target.value),
                            Number(question.maxScore || 0)
                        );

                    updateOption(index,{
                    score:value
                    });

                }}

                className="
                    w-20
                    border
                    rounded-lg
                    px-2
                    py-1
                    text-sm
                "

                />

          )}

          {/* AUTO FAIL */}

          {question.isCritical && !option.isNA && (

            <label
                title="Selecting this option automatically fails the evaluation."
                className="flex items-center gap-2 text-sm"
            >

              <input

                type="checkbox"

                checked={option.isFailOption}

                onChange={(e)=>{

                  const options=
                    question.options.map((o,i)=>({

                      ...o,

                      isFailOption:
                        i===index
                          ? e.target.checked
                          : false

                    }));

                  onUpdate({

                    ...question,

                    options

                  });

                }}

              />

              Auto Fail

            </label>

          )}

          {/* DELETE */}

          {!option.isNA && (

            <button

              onClick={()=>deleteOption(index)}

              className="
                p-2
                rounded-lg
                hover:bg-red-50
                text-slate-500
                hover:text-red-600
              "

            >

              <Trash2 size={16}/>

            </button>

          )}

          {option.isNA && (

            <span
                title="The N/A option is mandatory and cannot be edited or removed."
                className="
                text-lg
                text-slate-400
                cursor-default
                "
            >
                🔒
            </span>

          )}

        </div>

      ))}

      <button

        onClick={addOption}

        className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"

      >

        <Plus size={10}/>

        Add Option

      </button>

    </div>

  );

}