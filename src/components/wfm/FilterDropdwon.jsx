import { useState, useRef, useEffect } from "react";

const FilterDropdown = ({ label, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

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
    <div className="relative min-w-[192px]" ref={ref}>
      <label className="text-xs text-slate-500 mb-1 block">{label}</label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full border rounded-xl px-3 py-2 text-xs text-left bg-slate-50"
      >
        {selected.length ? selected.join(", ") : "All"}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow p-2 max-h-60 overflow-auto text-xs">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 p-1 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;