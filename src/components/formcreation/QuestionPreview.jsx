export default function QuestionPreview({ question }) {

  switch (question.type) {

    case "SHORT_TEXT":
      return (
        <input
          disabled
          type={
            question.subtype === "NUMBER"
              ? "number"
              : "text"
          }
          placeholder={
            question.placeholder ||
            "Short answer"
          }
          className="
            w-full
            border-b
            border-slate-300
            py-2
            text-sm
            bg-transparent
          "
        />
      );

    case "PARAGRAPH":
      return (
        <textarea
          disabled
          rows={3}
          placeholder={
            question.placeholder ||
            "Long answer"
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

    case "RADIO":
      return (
        <div className="space-y-2">
          {question.options?.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 text-sm"
            >
              <input type="radio" disabled />
              {option.text}
            </label>
          ))}
        </div>
      );

    case "CHECKBOX":
      return (
        <div className="space-y-2">
          {question.options?.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 text-sm"
            >
              <input type="checkbox" disabled />
              {option.text}
            </label>
          ))}
        </div>
      );

    case "DROPDOWN":
      return (
        <select
          disabled
          className="
            w-full
            border
            rounded-lg
            p-2
            text-sm
          "
        >
          <option>Select an option</option>

          {question.options?.map((option) => (
            <option key={option.id}>
              {option.text}
            </option>
          ))}

        </select>
      );

    case "DATE":
      return (
        <input
          disabled
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

}
