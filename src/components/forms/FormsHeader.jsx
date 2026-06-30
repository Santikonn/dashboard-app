import { Plus } from "lucide-react";

export default function FormsHeader({ onCreate }) {

  return (

    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
            "
          >
            QA Forms
          </h1>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Create, edit and publish evaluation forms.
          </p>

        </div>

        <button

          onClick={onCreate}

          className="
            flex
            items-center
            gap-2

            px-5
            py-3

            rounded-xl

            bg-blue-600
            hover:bg-blue-700

            text-white
            font-medium

            transition
          "

        >

          <Plus size={10} />

          New Form

        </button>

      </div>

    </div>

  );

}