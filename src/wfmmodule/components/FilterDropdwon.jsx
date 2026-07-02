import { useState, useRef, useEffect } from "react";

const FilterDropdown = ({ label, options, selected = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // 🔥 Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full sm:w-[180px] md:w-[200px]"
    >
      {/* LABEL */}
      <label className="text-[10px] md:text-xs text-slate-500 mb-1 block">
        {label}
      </label>

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          h-[36px]
          border
          rounded-xl
          px-3
          text-[11px] md:text-xs
          text-left
          bg-slate-50
          hover:bg-white
          transition
          flex items-center
          overflow-hidden
        "
      >
        <span className="block truncate">
          {selected.length === 0
            ? "All"
            : selected.length <= 2
            ? selected.join(", ")
            : `${selected.slice(0, 2).join(", ")} +${selected.length - 2}`}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute 
            z-[999] 
            mt-2 
            w-full 
            bg-white 
            border 
            rounded-xl 
            shadow-lg
            p-2 
            max-h-60 
            overflow-y-auto
            text-xs
          "
        >
          {options.length === 0 && (
            <div className="text-slate-400 text-center py-2">
              No options
            </div>
          )}

          {options.map((opt) => (
            <label
              key={opt}
              className="
                flex items-center gap-2 
                p-1 
                text-xs md:text-sm 
                hover:bg-slate-100 
                rounded 
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              <span className="truncate">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;