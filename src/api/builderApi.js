const API_URL = import.meta.env.VITE_API_URL;

export const BuilderActions = {
  SAVE: "save_builder",
  GET: "get_builder",
  UPDATE: "update_builder",
  PUBLISH: "publish_builder",
  CREATE_DRAFT: "create_draft",
};

function mapOption(option, index) {
  return {
    text: option.text,
    score:
      option.score === "" || option.score == null
        ? null
        : Number(option.score),
    isNA: option.isNA ?? false,
    isFailOption: option.isFailOption ?? false,
    displayOrder: index + 1
  };
}

function mapQuestion(question) {
  return {
    title: question.title,
    type: question.type,
    subtype: question.subtype ?? null,
    placeholder: question.placeholder || "",

    allowsNA: question.allowsNA ?? false,

    hasScore: question.hasScore ?? false,

    maxScore:
      question.maxScore === "" ||
      question.maxScore == null
        ? null
        : Number(question.maxScore),

    isCritical: question.isCritical ?? false,

    options: (question.options || []).map(mapOption)
  };
}

function mapSection(section) {
  return {
    title: section.title,

    hasScore: section.hasScore ?? false,

    maxScore:
      section.maxScore === "" ||
      section.maxScore == null
        ? null
        : Number(section.maxScore),

    questions:
      (section.questions || []).map(mapQuestion)
  };
}

async function execute(action, data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      version: 1,
      action,
      data

    })
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {

    throw new Error(
      result.message || "Unexpected error."
    );

  }
  return result;
}

export async function saveBuilder(form) {
  return execute(
    BuilderActions.SAVE,

    {
      publicId: form.publicId ?? null,
      name: form.title,
      description: form.description ?? null,
      sections:
        (form.sections || []).map(mapSection)
    }

  );
}

/* ---------- PREPARED FOR NEXT STEPS ---------- */

export async function getBuilder(publicId) {
  return execute(
    BuilderActions.GET,

    {
      public_id: publicId
    }

  );
}

export async function updateBuilder(formId, form) {
  return execute(
    BuilderActions.UPDATE,

    {
      formId,
      name: form.title,
      sections:
        (form.sections || []).map(mapSection)
    }

  );
}

export async function publishBuilder(publicId) {
  return execute(
    BuilderActions.PUBLISH,

    {
      publicId
    }

  );
}

export async function createDraft(publicId) {
  return execute(
    BuilderActions.CREATE_DRAFT,

    {
      publicId
    }

  );
}