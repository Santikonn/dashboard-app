const API_URL = import.meta.env.VITE_API_URL;

export const FormActions = {

  GET_ALL: "get_forms",
  GET: "get_form",
  GET_VERSIONS: "get_form_versions",
  CREATE: "create_form",
  UPDATE: "update_form",
  DISABLE: "disable_form",
  GET_PUBLISHED: "get_published_forms",

};

async function execute(action, data = {}) {
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

/* ----------------------------- */

export async function getForms() {
  return execute(
    FormActions.GET_ALL

  );
}

export async function getForm(publicId) {
  return execute(
    FormActions.GET,

    {
      public_id: publicId
    }

  );
}

export async function createForm(name, description) {
  return execute(
    FormActions.CREATE,

    {
      name,
      description
    }

  );
}

export async function updateForm(publicId, name, description) {
  return execute(
    FormActions.UPDATE,

    {
      public_id: publicId,
      name,
      description
    }

  );
}

export async function disableForm(publicId) {
  return execute(
    FormActions.DISABLE,

    {
      public_id: publicId
    }

  );
}

export async function getFormVersions(publicId) {
  return execute(
    FormActions.GET_VERSIONS,

    {
      public_id: publicId
    }

  );
}

export async function getPublishedForms() {
    return execute(
        FormActions.GET_PUBLISHED
    );
}