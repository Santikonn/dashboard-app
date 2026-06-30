import { Search, ArrowUpDown, X } from "lucide-react";

export default function FormsFilters({
  search,
  setSearch,
  sort,
  setSort,
  onClear
}) {

  return (

    <div
      className="
        bg-white
        border
        rounded-2xl
        shadow-sm
        p-4
        flex
        flex-col
        lg:flex-row
        gap-4
        lg:items-center
        lg:justify-between
      "
    >

      {/* SEARCH */}

      <div
        className="
          relative
          flex-1
        "
      >

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="Search forms..."

          className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-xl
            border
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          gap-3
        "
      >

        <div className="relative">

          <ArrowUpDown
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <select

            value={sort}
            onChange={(e)=>
              setSort(e.target.value)
            }
            className="
              pl-9
              pr-10
              py-3
              rounded-xl
              border
              outline-none
              bg-white
            "
          >

            <option value="updated">
              Last Updated
            </option>

            <option value="az">
              Name (A-Z)
            </option>

            <option value="za">
              Name (Z-A)
            </option>

            <option value="version">
              Version
            </option>

          </select>

        </div>

        <button

          onClick={onClear}

          className="
            flex
            items-center
            gap-2
            px-4
            rounded-xl
            border
            hover:bg-slate-100
            transition
          "
        >

          <X size={16} />
          Clear
        </button>

      </div>

    </div>

  );

}