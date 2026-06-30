import {
  MoreVertical,
  FileText,
  Layers,
  HelpCircle
} from "lucide-react";

import DropdownMenu from "../common/DropdownMenu";
import FormActionsMenu from "./FormActionsMenu";
import { getBuilder } from "../../api/builderApi";

export default function FormRow({
  form,
  onEdit,
  onDuplicate,
  onPublish,
  onCreateDraft,
  onHistory
}) {

  const statusColor = {

    Draft:
      "bg-amber-100 text-amber-700",

    Published:
      "bg-emerald-100 text-emerald-700",

    Disabled:
      "bg-slate-200 text-slate-600"

  };

  return (

    <div
      className="
        bg-white
        border
        rounded-2xl
        shadow-sm

        p-5

        hover:shadow-md
        transition
      "
    >

      <div className="flex justify-between gap-6">

        <div className="flex-1">

          <div className="flex items-center gap-3">

            <FileText
              size={20}
              className="text-blue-600"
            />

            <h3
              className="
                text-lg
                font-semibold
                text-slate-800
              "
            >
              {form.name}
            </h3>

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-medium
                ${statusColor[form.status]}
              `}
            >
              {form.status}
            </span>

          </div>

          <div
            className="
              flex
              flex-wrap
              gap-6

              mt-4

              text-sm
              text-slate-500
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <Layers size={16} />

              Version {form.version}

            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              📁 {form.sections} Sections

            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <HelpCircle size={16} />
              {form.questions} Questions

            </div>

            <div>

              Updated {form.updated}

            </div>

          </div>

        </div>

        <DropdownMenu

            trigger={

                <button

                    className="
                        p-2
                        rounded-lg
                        hover:bg-slate-100
                        transition
                    "

                >

                    <MoreVertical size={18} />

                </button>

            }

        >

            {({ close }) => (

                <FormActionsMenu

                  status={form.statusCode}
                  close={close}

                  onEdit={() => {
                      onEdit(form.publicId);
                  }}

                  onView={() => {
                      onEdit(form.publicId);
                  }}

                  onDuplicate={() => {
                      onDuplicate(form.publicId);
                  }}

                  onPublish={() => {
                      onPublish(form.publicId);
                  }}

                  onCreateDraft={() => {
                      onCreateDraft(form.publicId);
                  }}

                  onDisable={() => {

                      console.log(
                          "Disable",
                          form.id
                      );

                  }}

                  onHistory={() =>
                      onHistory(
                        form.publicId,
                        form.name
                      )
                  }

              />

            )}

        </DropdownMenu>

      </div>

    </div>

  );

}