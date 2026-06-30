import FormRow from "./FormRow";

export default function FormsTable({
  forms,
  onEdit,
  onDuplicate,
  onPublish,
  onCreateDraft,
  onHistory
}) {

  if (!forms.length) {

    return (

      <div
        className="
          bg-white
          border
          rounded-2xl
          shadow-sm

          py-20

          text-center
        "
      >

        <h3
          className="
            text-xl
            font-semibold
            text-slate-700
          "
        >
          No forms found
        </h3>

        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Create your first evaluation form.
        </p>

      </div>

    );

  }

  return (
    <div className="space-y-4">
      {
        forms.map(form => (
          <FormRow
            key={form.id}
            form={form}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onPublish={onPublish}
            onCreateDraft={onCreateDraft}
            onHistory={onHistory}
          />
        ))
      }
    </div>
  );
}