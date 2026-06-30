import {
  Pencil,
  Copy,
  Rocket,
  Ban,
  History
} from "lucide-react";
import { FORM_STATUS } from "../../constants/formStatus";

export default function FormActionsMenu({
  status,
  close,
  onEdit,
  onDuplicate,
  onPublish,
  onDisable,
  onHistory,
  onCreateDraft,
  onView
}) {

  function handle(action) {

    action?.();
    close();

  }

  const Item = ({
    icon: Icon,
    label,
    onClick,
    danger = false
  }) => (

    <button

      onClick={() => handle(onClick)}

      className={`
        w-full
        flex
        items-center
        gap-3
        px-3
        py-2
        rounded-lg
        text-sm
        transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-slate-700 hover:bg-slate-100"
        }
      `}
    >

      <Icon size={16} />

      {label}

    </button>

  );

  return (

    <div className="space-y-1">

    {
      status === FORM_STATUS.DRAFT
        ? (
            <>
            <Item
                icon={Pencil}
                label="Edit"
                onClick={onEdit}
            />

            <Item
                icon={Copy}
                label="Duplicate"
                onClick={onDuplicate}
            />

            <Item
                icon={Rocket}
                label="Publish"
                onClick={onPublish}
            />

            <Item
                icon={Ban}
                label="Disable"
                onClick={onDisable}
                danger
            />
            </>
        )
        : (
            <>
            <Item
                icon={Pencil}
                label="View"
                onClick={onView}
            />

            <Item
                icon={Copy}
                label="Duplicate"
                onClick={onDuplicate}
            />

            <Item
                icon={Rocket}
                label="Create Draft"
                onClick={onCreateDraft}
            />
            </>
        )
    }

    <hr className="my-2" />

    <Item
        icon={History}
        label="Version History"
        onClick={onHistory}
    />

    </div>

  );

}