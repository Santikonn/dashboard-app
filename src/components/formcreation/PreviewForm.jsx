export default function PreviewForm({
  form
}) {

  const totalPoints =
    form.sections.reduce(
      (acc, section) =>
        acc +
        (
          section.hasScore
            ? Number(section.weight || 0)
            : 0
        ),
      0
    );

  const renderField = (question) => {

    switch (question.type) {

      case "short_text":
        return (
          <input
            type={
              question.subType === "phone"
                ? "tel"
                : question.subType || "text"
            }
            placeholder={
              question.placeholder ||
              "Your answer"
            }
            className="
              w-full
              border
              rounded-lg
              p-2
              text-sm
            "
          />
        );

      case "paragraph":
        return (
          <textarea
            rows={4}
            placeholder={
              question.placeholder ||
              "Your answer"
            }
            className="
              w-full
              border
              rounded-lg
              p-2
              text-sm
            "
          />
        );

      case "radio":
        return (
          <div className="space-y-2">
            {(question.options || []).map(
              (option, index) => (
                <label
                  key={index}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                  "
                >
                  <input type="radio" />
                  {option}
                </label>
              )
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {(question.options || []).map(
              (option, index) => (
                <label
                  key={index}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                  "
                >
                  <input type="checkbox" />
                  {option}
                </label>
              )
            )}
          </div>
        );

      case "dropdown":
        return (
          <select
            className="
              w-full
              border
              rounded-lg
              p-2
              text-sm
            "
          >
            <option>
              Select an option
            </option>

            {(question.options || []).map(
              (option, index) => (
                <option key={index}>
                  {option}
                </option>
              )
            )}
          </select>
        );

      case "date":
        return (
          <input
            type="date"
            className="
              w-full
              border
              rounded-lg
              p-2
              text-sm
            "
          />
        );

      default:
        return null;
    }
  };

  return (

    <div className="space-y-4">

      {/* TOTAL SCORE */}

      {totalPoints > 0 && (

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-2xl
            p-4
          "
        >
          <div className="text-sm text-blue-700">
            Total Score
          </div>

          <div className="text-2xl font-bold text-blue-900">
            {totalPoints} pts
          </div>
        </div>

      )}

      {form.sections.map(section => (

        <div
          key={section.id}
          className="
            bg-white
            border
            rounded-2xl
            p-5
            shadow-sm
          "
        >

          {/* SECTION HEADER */}

          <div className="flex justify-between items-center mb-4">

            <h2 className="font-semibold text-slate-800">

              {section.title ||
                "Untitled Section"}

            </h2>

            {section.hasScore && (

              <div
                className="
                  px-2 py-1
                  rounded-lg
                  bg-green-50
                  text-green-700
                  text-xs
                  font-medium
                "
              >
                {section.weight || 0} pts
              </div>

            )}

          </div>

          {section.questions.map(question => (

            <div
              key={question.id}
              className="
                mb-6
                pb-4
                border-b
                last:border-b-0
              "
            >

              <div className="flex justify-between gap-3 mb-2">

                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >

                  {question.title ||
                    "Untitled Question"}

                  {question.required && (
                    <span className="text-red-500 ml-1">
                      *
                    </span>
                  )}

                </label>

                {question.hasScore && (

                  <div
                    className="
                      shrink-0
                      px-2 py-1
                      rounded-lg
                      bg-blue-50
                      text-blue-700
                      text-xs
                      font-medium
                    "
                  >
                    {question.weight || 0} pts
                  </div>

                )}

              </div>

              {renderField(question)}

            </div>

          ))}

        </div>

      ))}

    </div>

  );
}