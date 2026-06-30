import { useEffect, useState } from "react";
import { toast } from "sonner";
import FormHeader from "./FormHeader";
import SectionCard from "./SectionCard";
import PreviewForm from "./PreviewForm";
import { saveBuilder, getBuilder } from "../../api/builderApi";

export default function FormBuilder({
  collapsed,
  mode: builderMode,
  publicId,
  onBack,
  onSaved
}) {

  const [mode, setMode] = useState("edit");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    title: "",
    sections: [

      {

        id: crypto.randomUUID(),
        title: "",
        hasScore: false,
        maxScore: null,
        questions: []

      }

    ]

  });

  function prepareDuplicateForm(form) {

      return {
          ...form,
          publicId: null,
          code: null,
          title: `Copy of ${form.title}`,
          sections: form.sections.map(section => ({
              ...section,
              id: crypto.randomUUID(),
              questions: section.questions.map(question => ({
                  ...question,
                  id: crypto.randomUUID(),
                  options: question.options.map(option => ({
                      ...option,
                      id: crypto.randomUUID()
                  }))
              }))
          }))
      };
  }

  useEffect(() => {

    if (
        (builderMode !== "edit" &&
        builderMode !== "duplicate")
        || !publicId
    )
        return;

    async function loadForm() {

      try {

        setLoading(true);
        const result = await getBuilder(publicId);
        if (builderMode === "duplicate") {
            const duplicatedForm = prepareDuplicateForm(
                result.form
            );
            setForm(duplicatedForm);
        }
        else {
            setForm(result.form);
        }
      }

      catch (error) {
        toast.error(error.message);
      }

      finally {
        setLoading(false);
      }
    }
    loadForm();
  }, [builderMode, publicId]);

  const addSection = () => {
    setForm(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {

          id: crypto.randomUUID(),
          title: "",
          hasScore: false,
          maxScore: null,
          questions: []

        }
      ]
    }));

  };

  const handleSave = async () => {

    if (!form.title.trim()) {
      toast.error("Please enter a form name.");
      return;
    }

    for (const section of form.sections) {
      if (!section.title.trim()) {
        toast.error("Every section must have a name.");
        return;
      }

      if (section.questions.length === 0) {
        toast.error(
          `Section "${section.title}" must contain at least one question.`
        );
        return;
      }

      for (const question of section.questions) {
        if (!question.title.trim()) {
          toast.error(
            `Every question in "${section.title}" must have a title.`
          );
          return;
        }
      }
    }

    try {
      setSaving(true);
      await saveBuilder(form);
      toast.success("Form saved successfully!");
      onSaved?.();
    }

    catch (error) {
      toast.error(error.message);
    }

    finally {
      setSaving(false);
    }
  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="text-lg font-semibold">

            Loading form...

          </div>
          <div className="text-sm text-slate-500 mt-2">

            Please wait.

          </div>
        </div>
      </div>

    );

  }

  const saveButtonLabel =
  builderMode === "edit"
    ? "Update Draft"
    : builderMode === "duplicate"
      ? "Save Copy"
      : "Save Draft";

  // console.log({
  //     builderMode,
  //     publicId
  // });

  return (

    <div className="w-full p-2 sm:p-4 lg:p-6">

      <FormHeader
        form={form}
        setForm={setForm}
        mode={mode}
        setMode={setMode}

        onSave={handleSave}
        saving={saving}

        saveButtonLabel={saveButtonLabel}
        onBack={onBack}
      />

      <div className="space-y-4 mt-4">

        {

          mode === "edit"
            ? (
              form.sections.map(section => (
                <SectionCard
                  key={section.id}
                  section={section}
                  form={form}
                  setForm={setForm}
                />
              ))
            )

            : (
              <PreviewForm
                form={form}
              />
            )
        }

      </div>

      {
        mode === "edit" && (
          <button
            onClick={addSection}
            className="
              mt-4
              w-full
              bg-slate-900
              text-white
              rounded-xl
              py-3
              hover:bg-slate-800
              transition
              text-sm
              font-medium
            "
          >

            + Add Section

          </button>
        )
      }

    </div>

  );

}